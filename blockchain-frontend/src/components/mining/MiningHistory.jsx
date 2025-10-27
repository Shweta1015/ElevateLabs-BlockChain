import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { formatDistanceToNow } from 'date-fns';
import { HiClock, HiCube } from 'react-icons/hi';

const MiningHistory = ({ history }) => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <HiClock className="text-pink-400 w-6 h-6" />
        <h2 className="text-xl font-semibold">Mining History</h2>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No mining history yet
          </div>
        ) : (
          history.map((block, index) => (
            <motion.div
              key={block.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <HiCube className="text-purple-400 w-4 h-4" />
                    <span className="font-semibold text-purple-400">
                      Block #{block.index}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Hash: {block.hash.substring(0, 20)}...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Nonce: {block.nonce} | Difficulty: {block.difficulty || 4}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-400 font-semibold">
                    +100 coins
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};

export default MiningHistory;