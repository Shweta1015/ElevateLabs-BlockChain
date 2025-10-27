import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { blockchainService } from '../../services/api';
import toast from 'react-hot-toast';
import { HiCube, HiLightningBolt } from 'react-icons/hi';

const MinerPanel = ({ onMineComplete }) => {
  const [minerAddress, setMinerAddress] = useState('miner1');
  const [mining, setMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, {
      time: new Date().toLocaleTimeString(),
      message
    }].slice(-5));
  };

  const handleMine = async () => {
    if (!minerAddress) {
      toast.error('Please enter a miner address');
      return;
    }

    setMining(true);
    setProgress(0);
    setLogs([]);
    addLog('Starting mining process...');

    // Simulate mining progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 500);

    try {
      addLog('Collecting pending transactions...');
      const pending = await blockchainService.getPendingTransactions();
      addLog(`Found ${pending.length} pending transactions`);
      
      addLog('Computing proof of work...');
      const result = await blockchainService.mineBlock(minerAddress);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      addLog(`Block #${result.index} mined successfully!`);
      addLog(`Nonce: ${result.nonce}, Hash: ${result.hash.substring(0, 10)}...`);
      
      toast.success(`Block #${result.index} mined! Reward: 100 coins`);
      
      if (onMineComplete) onMineComplete();
      
      setTimeout(() => {
        setProgress(0);
        setMining(false);
      }, 2000);
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      setMining(false);
      addLog(`Mining failed: ${error.message}`);
      toast.error('Mining failed: ' + error.message);
    }
  };

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <HiCube className="text-purple-400 w-6 h-6" />
        <h2 className="text-xl font-semibold">Mining Panel</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Miner Address
          </label>
          <input
            type="text"
            value={minerAddress}
            onChange={(e) => setMinerAddress(e.target.value)}
            disabled={mining}
            className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-50"
            placeholder="Enter your miner address"
          />
        </div>

        <motion.button
          whileHover={!mining ? { scale: 1.02 } : {}}
          whileTap={!mining ? { scale: 0.98 } : {}}
          onClick={handleMine}
          disabled={mining}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            mining
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {mining ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <HiCube className="w-5 h-5" />
              </motion.div>
              <span>Mining in Progress...</span>
            </>
          ) : (
            <>
              <HiLightningBolt className="w-5 h-5" />
              <span>Start Mining</span>
            </>
          )}
        </motion.button>

        {/* Progress Bar */}
        {mining && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-purple-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Mining Logs */}
        {logs.length > 0 && (
          <div className="bg-dark-900/50 rounded-lg p-3 space-y-1 max-h-40 overflow-y-auto">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono"
              >
                <span className="text-gray-500">[{log.time}]</span>{' '}
                <span className="text-gray-300">{log.message}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MinerPanel;