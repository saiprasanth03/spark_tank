import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ALLOWED_ADMIN_EMAILS, isAdminEmail } from '../data/adminEmails';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('borrowbridge_user');
    if (!savedUser) return null;
    try {
      const parsed = JSON.parse(savedUser);
      if (parsed?.id === 'usr-demo' || parsed?.email === 'alex.morgan@example.com') {
        localStorage.removeItem('borrowbridge_user');
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('borrowbridge_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [token, setToken] = useState(() => localStorage.getItem('borrowbridge_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('borrowbridge_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('borrowbridge_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('borrowbridge_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync users with MongoDB Atlas Cloud on startup
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setRegisteredUsers(prev => {
            const dbEmails = new Set(res.data.map(u => u.email?.toLowerCase()));
            const localOnly = prev.filter(p => !dbEmails.has(p.email?.toLowerCase()));
            return [...res.data, ...localOnly];
          });
        }
      })
      .catch(() => {});
  }, []);

  const login = async (email, password) => {
    try {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      if (!cleanEmail || !cleanPassword) {
        toast.error('Please enter both email and password');
        return false;
      }

      // Check if Admin
      const isAdmin = isAdminEmail(cleanEmail);
      if (isAdmin) {
        const adminUser = {
          id: 'usr-admin-' + Date.now(),
          name: `Admin (${cleanEmail.split('@')[0]})`,
          email: cleanEmail,
          phone: 'Not specified',
          role: 'Admin',
          avatar: null,
          location: 'Vishnu Institute Campus',
          joined: 'August 2026',
          verified: true,
          rating: null,
          reviews: []
        };
        setUser(adminUser);
        setToken('jwt-admin-' + Date.now());
        localStorage.setItem('borrowbridge_token', 'jwt-admin-' + Date.now());

        // Sync admin user to MongoDB
        fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminUser)
        }).catch(() => {});

        toast.success(`Authenticated as Authorized Admin (${cleanEmail})`);
        return true;
      }

      // 1. Try to find user from live MongoDB Atlas backend
      let matchedUser = null;
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            matchedUser = json.data.find(u => u.email?.toLowerCase() === cleanEmail);
            setRegisteredUsers(json.data);
          }
        }
      } catch (err) {
        // Fallback to local cache if network error
      }

      // 2. If not found in live query, check local cache
      if (!matchedUser) {
        matchedUser = registeredUsers.find(u => u.email?.toLowerCase() === cleanEmail);
      }

      if (!matchedUser) {
        toast.error('Account not registered! Please sign up first.');
        return false;
      }

      if (matchedUser.password && matchedUser.password !== cleanPassword) {
        toast.error('Incorrect password. Please check your credentials.');
        return false;
      }

      setUser(matchedUser);
      setToken('jwt-' + Date.now());
      localStorage.setItem('borrowbridge_token', 'jwt-' + Date.now());

      toast.success(`Welcome back, ${matchedUser.name}!`);
      return true;
    } catch (err) {
      toast.error('Failed to log in');
      return false;
    }
  };

  const loginAsAdminEmail = (adminEmail) => {
    login(adminEmail, 'admin123');
  };

  const register = async (userData) => {
    try {
      const cleanEmail = (userData.email || '').trim().toLowerCase();
      const cleanPassword = (userData.password || '').trim();
      const cleanName = (userData.name || '').trim();

      if (!cleanEmail || !cleanName || !cleanPassword) {
        toast.error('Please complete all required fields');
        return false;
      }

      // Check if already registered in MongoDB Atlas
      let existingInDb = false;
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            existingInDb = json.data.some(u => u.email?.toLowerCase() === cleanEmail);
          }
        }
      } catch (e) {}

      if (existingInDb || registeredUsers.some(u => u.email?.toLowerCase() === cleanEmail)) {
        toast.error('An account with this email already exists! Please log in.');
        return false;
      }

      const isAdmin = isAdminEmail(cleanEmail);
      const newUser = {
        id: 'usr-' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        phone: userData.phone || '+91 98765 43210',
        role: isAdmin ? 'Admin' : (userData.role || 'Both'),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        location: userData.location || 'Bhimavaram, AP',
        joined: 'August 2026',
        verified: true,
        rating: 5.0,
        reviews: []
      };

      // Direct synchronous POST to MongoDB Atlas
      try {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });
      } catch (err) {
        console.warn('MongoDB user sync warning:', err);
      }

      setRegisteredUsers(prev => [...prev.filter(u => u.email?.toLowerCase() !== cleanEmail), newUser]);
      setUser(newUser);
      setToken('jwt-' + Date.now());
      localStorage.setItem('borrowbridge_token', 'jwt-' + Date.now());

      toast.success('🎉 Account created successfully!');
      return true;
    } catch (err) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('borrowbridge_user');
    localStorage.removeItem('borrowbridge_token');
    toast.success('Logged out');
  };

  const updateUserRole = (newRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));

    // Update in MongoDB Atlas
    fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, role: newRole })
    }).catch(() => {});

    toast.success(`Account role updated to ${newRole}!`);
  };

  const isUserAdmin = isAdminEmail(user?.email);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      loginAsAdminEmail,
      register,
      logout,
      updateUserRole,
      isAuthenticated: !!user,
      isAdmin: isUserAdmin,
      allowedAdminEmails: ALLOWED_ADMIN_EMAILS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
