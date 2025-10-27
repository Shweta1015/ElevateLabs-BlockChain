import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiSparkles, HiCube, HiChip } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';
import BlockchainBackground from './BlockchainBackground';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', formData.email);
      const response = await authService.login(formData);
      console.log('Login successful, response:', response);

      // Check if we got a valid response
    if (response && response.token) {
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/');
    } else {
      throw new Error('Invalid response from server');
    }
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', response.user.name);
      
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Blockchain Background */}
      <BlockchainBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-dark-900/95 to-indigo-900/90" />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Floating Blockchain Icons */}
          <div className="absolute -top-20 -left-20 text-purple-500/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiCube className="w-32 h-32" />
            </motion.div>
          </div>
          <div className="absolute -bottom-20 -right-20 text-pink-500/20">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <HiChip className="w-32 h-32" />
            </motion.div>
          </div>

          {/* Logo with Animation */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center items-center space-x-3 mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <HiSparkles className="w-12 h-12 text-purple-400" />
              </motion.div>
              <h1 className="text-4xl font-bold">
                <span className="gradient-text">Block</span>
                <span className="text-white">Sim</span>
              </h1>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300"
            >
              Enter the Blockchain Universe
            </motion.p>
          </motion.div>

          {/* Login Card with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 border border-purple-500/20 shadow-2xl"
          >
            {/* Animated Header */}
            <div className="flex items-center space-x-2 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
              />
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input with Animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200"
                    placeholder="satoshi@blockchain.com"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-purple-600/0 group-focus-within:from-purple-600/10 group-focus-within:via-pink-600/10 group-focus-within:to-purple-600/10 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Password Input with Animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-purple-600/0 group-focus-within:from-purple-600/10 group-focus-within:via-pink-600/10 group-focus-within:to-purple-600/10 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Forgot Password Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end"
              >
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 group"
                >
                  <span>Forgot password?</span>
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>

              {/* Submit Button with Gradient Animation */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`relative w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 overflow-hidden ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:shadow-lg hover:shadow-purple-500/25'
                }`}
              >
                {/* Animated Background */}
                {!loading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <HiCube className="w-5 h-5" />
                      <span>Enter Blockchain</span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Signup Link with Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                New to the blockchain?{' '}
                <Link
                  to="/signup"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors group inline-flex items-center space-x-1"
                >
                  <span>Create Account</span>
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </motion.span>
                </Link>
              </p>
            </motion.div>

            {/* Blockchain Network Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 pt-6 border-t border-dark-700/50"
            >
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Blockchain Network Active</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;