import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`glass-effect rounded-xl p-6 ${hover ? 'hover:glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;