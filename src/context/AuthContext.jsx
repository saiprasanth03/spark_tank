import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ALLOWED_ADMIN_EMAILS, isAdminEmail } from '../data/adminEmails';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('borrowbridge_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 'usr-demo',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      role: 'Both',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      location: 'San Francisco, CA',
      joined: 'August 2026',
      verified: true
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('borrowbridge_token') || 'demo-jwt-token');

  useEffect(() => {
    if (user) {
      localStorage.setItem('borrowbridge_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('borrowbridge_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const isAdmin = isAdminEmail(email);
      const mockUser = {
        id: 'usr-' + Date.now(),
        name: isAdmin ? `Admin ${email.split('@')[0].toUpperCase()}` : email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 98765 43210',
        role: isAdmin ? 'Admin' : 'Both',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        location: isAdmin ? 'Vishnu Institute of Technology' : 'San Francisco, CA',
        joined: 'August 2026',
        verified: true
      };
      setUser(mockUser);
      setToken('jwt-' + Date.now());
      localStorage.setItem('borrowbridge_token', 'jwt-' + Date.now());
      
      if (isAdmin) {
        toast.success(`Logged in as Authorized Admin (${email})!`);
      } else {
        toast.success(`Welcome back, ${mockUser.name}!`);
      }
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
      const isAdmin = isAdminEmail(userData.email);
      const newUser = {
        id: 'usr-' + Date.now(),
        name: userData.name || 'New User',
        email: userData.email || 'user@example.com',
        phone: userData.phone || '+1 (555) 000-0000',
        role: isAdmin ? 'Admin' : (userData.role || 'Both'),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        location: 'San Francisco, CA',
        joined: 'August 2026',
        verified: true
      };
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
