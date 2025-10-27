import React from 'react';
import { motion } from 'framer-motion';
import BlockCard from './BlockCard';

const BlockList = ({ blocks, loading, onBlockClick }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
          />
          <span>Loading blockchain...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blocks.map((block, index) => (
        <motion.div
          key={block.index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <BlockCard 
            block={block}
            onClick={() => onBlockClick(block)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BlockList;