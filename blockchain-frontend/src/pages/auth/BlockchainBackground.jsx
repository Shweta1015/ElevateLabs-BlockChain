import React from 'react';
import { motion } from 'framer-motion';

const BlockchainBackground = () => {
  // Generate random positions for blockchain nodes
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 20 + Math.random() * 10
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-purple-500"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Blockchain Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-24 h-24"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative w-full h-full">
            {/* Blockchain Node */}
            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-lg transform rotate-45">
              <div className="absolute inset-2 border border-purple-400/20 rounded-lg" />
              <div className="absolute inset-4 bg-purple-500/5 rounded-lg" />
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line
                x1="50%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="url(#gradient)"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="100%"
                stroke="url(#gradient)"
                strokeWidth="1"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Animated Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default BlockchainBackground;