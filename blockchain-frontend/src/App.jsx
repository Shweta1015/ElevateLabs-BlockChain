import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Mine from './pages/Mine';
import Chain from './pages/Chain';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOTP from './pages/auth/VerifyOTP';
import ResetPassword from './pages/auth/ResetPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-400">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        </div>
      );
    }
    
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-400">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        </div>
      );
    }
    
    return !isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#2c2e34',
            color: '#fff',
            border: '1px solid #494e58',
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login setIsAuthenticated={setIsAuthenticated} />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/verify-otp" element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        } />
        <Route path="/reset-password" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Transactions />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/mine" element={
          <ProtectedRoute>
            <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Mine />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/chain" element={
          <ProtectedRoute>
            <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Chain />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;