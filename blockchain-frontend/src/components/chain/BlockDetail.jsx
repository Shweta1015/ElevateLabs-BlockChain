import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCube, HiFingerPrint } from 'react-icons/hi';

const BlockDetail = ({ block, onClose }) => {
  if (!block) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <HiCube className="text-purple-400" />
              <span>Block #{block.index}</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-800/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center space-x-1">
                <HiFingerPrint className="w-4 h-4" />
                <span>Block Information</span>
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Hash</p>
                  <p className="font-mono text-sm text-purple-400 break-all">
                    {block.hash}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Previous Hash</p>
                  <p className="font-mono text-sm text-pink-400 break-all">
                    {block.previousHash || 'None (Genesis Block)'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Nonce</p>
                    <p className="text-sm">{block.nonce}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timestamp</p>
                    <p className="text-sm">
                      {new Date(block.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Transactions ({block.transactions.length})
              </h3>
              <div className="space-y-2">
                {block.transactions.length === 0 ? (
                  <p className="text-gray-500 text-sm">No transactions in this block</p>
                ) : (
                  block.transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="bg-dark-900/50 rounded-lg p-3 text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">
                            From: <span className="text-purple-400 font-mono">
                              {tx.sender || 'System'}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            To: <span className="text-pink-400 font-mono">
                              {tx.recipient}
                            </span>
                          </p>
                        </div>
                        <p className="text-green-400 font-semibold">
                          {tx.amount} coins
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlockDetail;