import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSparkles, HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const email = sessionStorage.getItem('resetEmail');
    if (!email) {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);
      
      // Focus last filled input or last input
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);

    try {
      const email = sessionStorage.getItem('resetEmail');
      await authService.verifyOTP(email, otpString);
      
      // Store OTP for reset password
      sessionStorage.setItem('verifiedOTP', otpString);
      
      toast.success('OTP verified successfully!');
      navigate('/reset-password');
    } catch (error) {
      toast.error(error.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const email = sessionStorage.getItem('resetEmail');
      await authService.sendOTP(email);
      toast.success('New OTP sent to your email!');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
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
            <p className="text-gray-400">Verify your identity</p>
          </div>

          {/* OTP Verification Card */}
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
            <p className="text-gray-400 mb-6">
              We've sent a 6-digit OTP to your registered email address.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-xl font-bold bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Didn't receive OTP? Resend
                </button>
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
                {loading ? 'Verifying...' : 'Verify OTP'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;