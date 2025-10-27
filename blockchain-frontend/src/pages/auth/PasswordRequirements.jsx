import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiCheckCircle, 
  HiXCircle, 
  HiX,
  HiShieldCheck,
  HiLockClosed
} from 'react-icons/hi';

const PasswordRequirements = ({ validation, onClose }) => {
  const requirements = [
    { 
      key: 'minLength', 
      label: 'At least 8 characters',
      icon: '📏'
    },
    { 
      key: 'hasUpperCase', 
      label: 'At least one uppercase letter (A-Z)',
      icon: '🔠'
    },
    { 
      key: 'hasLowerCase', 
      label: 'At least one lowercase letter (a-z)',
      icon: '🔡'
    },
    { 
      key: 'hasDigit', 
      label: 'At least one digit (0-9)',
      icon: '🔢'
    },
    { 
      key: 'hasSpecialChar', 
      label: 'At least one special character (!@#$%...)',
      icon: '✨'
    }
  ];

  const allValid = Object.values(validation).every(v => v);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-900/95 rounded-2xl p-6 max-w-md w-full border border-purple-500/20 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <HiShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Password Requirements</h3>
            </div>
            <p className="text-sm text-gray-400">
              Create a strong password to secure your blockchain account
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <HiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Requirements List */}
        <div className="space-y-3 mb-4">
          {requirements.map((req) => (
            <motion.div
              key={req.key}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                validation[req.key] 
                  ? 'bg-green-500/10 border border-green-500/20' 
                  : 'bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              <span className="text-xl">{req.icon}</span>
              <span className={`flex-1 text-sm ${
                validation[req.key] ? 'text-green-400' : 'text-gray-400'
              }`}>
                {req.label}
              </span>
              {validation[req.key] ? (
                <HiCheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <HiXCircle className="w-5 h-5 text-gray-500" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Password Strength Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Password Strength</span>
            <span className={`text-sm font-semibold ${
              allValid ? 'text-green-400' : 
              Object.values(validation).filter(v => v).length >= 3 ? 'text-yellow-400' : 
              'text-red-400'
            }`}>
              {allValid ? 'Strong' : 
               Object.values(validation).filter(v => v).length >= 3 ? 'Medium' : 
               'Weak'}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full ${
                allValid ? 'bg-gradient-to-r from-green-500 to-green-400' :
                Object.values(validation).filter(v => v).length >= 3 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                'bg-gradient-to-r from-red-500 to-red-400'
              }`}
              initial={{ width: 0 }}
              animate={{ 
                width: `${(Object.values(validation).filter(v => v).length / 5) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Tips */}
        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <HiLockClosed className="w-5 h-5 text-purple-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-purple-400 font-semibold mb-1">
                Security Tip
              </p>
              <p className="text-xs text-gray-400">
                Use a unique password that you haven't used elsewhere. Consider using a passphrase with random words for better security.
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
        >
          Got it!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PasswordRequirements;