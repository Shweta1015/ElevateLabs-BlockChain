import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/dashboard/StatsCard';
import RecentBlocks from '../components/dashboard/RecentBlocks';
import PendingTransactions from '../components/dashboard/PendingTransactions';
import QuickMine from '../components/dashboard/QuickMine';
import { blockchainService } from '../services/api';
import { 
  HiCube, 
  HiClock, 
  HiCurrencyDollar,
  HiChip 
} from 'react-icons/hi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    chainLength: 0,
    pendingTxCount: 0,
    lastBlock: null,
    difficulty: 4
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const [chain, pending] = await Promise.all([
        blockchainService.getChain(),
        blockchainService.getPendingTransactions()
      ]);
      
      setStats({
        chainLength: chain.length,
        pendingTxCount: pending.length,
        lastBlock: chain[chain.length - 1],
        difficulty: 4
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Blockchain Dashboard
        </h1>
        <p className="text-gray-400">
          Monitor and manage your blockchain network in real-time
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Chain Length"
          value={stats.chainLength}
          icon={HiCube}
          color="purple"
          loading={loading}
        />
        <StatsCard
          title="Pending Transactions"
          value={stats.pendingTxCount}
          icon={HiClock}
          color="pink"
          loading={loading}
        />
        <StatsCard
          title="Last Block"
          value={stats.lastBlock ? `#${stats.lastBlock.index}` : 'Genesis'}
          icon={HiCurrencyDollar}
          color="blue"
          loading={loading}
        />
        <StatsCard
          title="Difficulty"
          value={stats.difficulty}
          icon={HiChip}
          color="green"
          loading={loading}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <RecentBlocks />
          <PendingTransactions />
        </motion.div>
        <motion.div variants={itemVariants}>
          <QuickMine onMineComplete={fetchStats} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;