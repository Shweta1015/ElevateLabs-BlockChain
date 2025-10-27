import React from 'react';
import { motion } from 'framer-motion';
import { HiCube, HiClock, HiCollection } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';

const BlockCard = ({ block, onClick }) => {
  const isGenesis = block.index === 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      className="glass-effect rounded-xl p-6 cursor-pointer hover:glow transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            isGenesis 
              ? 'bg-gradient-to-br from-yellow-500 to-orange-600' 
              : 'bg-gradient-to-br from-purple-500 to-pink-600'
          }`}>
            <HiCube className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {isGenesis ? 'Genesis Block' : `Block #${block.index}`}
            </h3>
            <p className="text-xs text-gray-500">
              {block.timestamp 
                ? formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })
                : 'Unknown time'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">Hash</p>
          <p className="font-mono text-xs text-purple-400 break-all">
            {block.hash 
              ? `${block.hash.substring(0, 24)}...`
              : 'No hash available'}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Previous Hash</p>
          <p className="font-mono text-xs text-pink-400 break-all">
            {block.previousHash 
              ? `${block.previousHash.substring(0, 24)}...` 
              : 'None'}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dark-700/50">
          <div className="flex items-center space-x-1">
            <HiCollection className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {block.transactions && Array.isArray(block.transactions) 
                ? `${block.transactions.length} txs`
                : '0 txs'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <HiClock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              Nonce: {block.nonce || 0}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlockCard;