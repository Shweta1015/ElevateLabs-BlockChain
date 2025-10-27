import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiArrowLeft, HiSparkles } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.sendOTP(email);
      
      // Store email for OTP verification
      sessionStorage.setItem('resetEmail', email);
      
      toast.success('OTP sent to your email!');
      navigate('/verify-otp');
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="bg-dark-950/90 min-h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <HiSparkles className="w-10 h-10 text-purple-400" />
              <h1 className="text-3xl font-bold gradient-text">BlockSim</h1>
            </div>
            <p className="text-gray-400">Reset your password</p>
          </div>

          {/* Forgot Password Card */}
          <div className="glass-effect rounded-2xl p-8">
            {/* Back to Login */}
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors mb-6"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span>Back to Login</span>
            </Link>

            <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
            <p className="text-gray-400 mb-6">
              Enter your registered email address and we'll send you an OTP to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Enter your registered email"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;