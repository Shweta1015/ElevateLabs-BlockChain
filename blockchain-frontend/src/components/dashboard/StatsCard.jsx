import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

const StatsCard = ({ title, value, icon: Icon, color, loading }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-700',
    pink: 'from-pink-500 to-pink-700',
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
  };

  return (
    <Card hover={false}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <motion.p 
            className="text-3xl font-bold mt-1"
            key={value}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {loading ? '...' : value}
          </motion.p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;