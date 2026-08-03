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
        toast.success(`Authenticated as Authorized Admin (${cleanEmail})`);
        return true;
      }

      // Find registered user
      const existingUser = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);

      if (!existingUser) {
        toast.error('Account not registered! Please sign up first.');
        return false;
      }

      if (existingUser.password && existingUser.password !== cleanPassword) {
        toast.error('Incorrect password. Please check your credentials.');
        return false;
      }

      setUser(existingUser);
      setToken('jwt-' + Date.now());
      localStorage.setItem('borrowbridge_token', 'jwt-' + Date.now());
      toast.success(`Welcome back, ${existingUser.name}!`);
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

      // Check if already registered
      const alreadyExists = registeredUsers.some(u => u.email.toLowerCase() === cleanEmail);
      if (alreadyExists) {
        toast.error('An account with this email already exists! Please log in.');
        return false;
      }

      const isAdmin = isAdminEmail(cleanEmail);
      const newUser = {
        id: 'usr-' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        phone: userData.phone || 'Not specified',
        role: isAdmin ? 'Admin' : (userData.role || 'Both'),
        avatar: null,
        location: 'Not specified',
        joined: 'August 2026',
        verified: true,
        rating: null,
        reviews: []
      };

      setRegisteredUsers(prev => [...prev, newUser]);
      setUser(newUser);
      setToken('jwt-' + Date.now());
      localStorage.setItem('borrowbridge_token', 'jwt-' + Date.now());
      toast.success('Account created successfully!');
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

  const isUserAdmin = isAdminEmail(user?.email);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      loginAsAdminEmail,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: isUserAdmin,
      allowedAdminEmails: ALLOWED_ADMIN_EMAILS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
