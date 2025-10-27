import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const TxCard = ({ transaction }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50 hover:border-purple-500/30 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">From</p>
              <p className="font-mono text-sm text-purple-400">
                {transaction.sender || 'System (Mining Reward)'}
              </p>
            </div>
            <HiArrowRight className="text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">To</p>
              <p className="font-mono text-sm text-pink-400">
                {transaction.recipient}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 text-right">
          <p className="text-2xl font-bold text-green-400">
            {transaction.amount}
          </p>
          <p className="text-xs text-gray-500">coins</p>
        </div>
      </div>
      {transaction.timestamp && (
        <div className="mt-3 pt-3 border-t border-dark-700/50">
          <p className="text-xs text-gray-500">
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TxCard;