import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiHome, 
  HiCurrencyDollar, 
  HiCube, 
  HiCollection,
  HiSparkles,
  HiLogin,
  HiLogout,
  HiUser
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  const navItems = [
    { path: '/', icon: HiHome, label: 'Dashboard' },
    { path: '/transactions', icon: HiCurrencyDollar, label: 'Transactions' },
    { path: '/mine', icon: HiCube, label: 'Mine' },
    { path: '/chain', icon: HiCollection, label: 'Blockchain' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="bg-dark-950/90 min-h-screen">
        {/* Header */}
        <header className="glass-effect border-b border-dark-700/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HiSparkles className="w-8 h-8 text-purple-400" />
                <h1 className="text-2xl font-bold gradient-text">
                  BlockSim
                </h1>
              </div>
              
              <nav className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="relative px-4 py-2 rounded-lg transition-all duration-200"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="navbar"
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30"
                          />
                        )}
                        <span className={`relative flex items-center space-x-2 ${
                          isActive ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
                        }`}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* User Section */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-purple-600/20 rounded-lg">
                        <HiUser className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-200">
                          {userName || 'User'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {userEmail || 'user@blockchain.com'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors group"
                    >
                      <HiLogout className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 ml-6 pl-6 border-l border-gray-700 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors"
                  >
                    <HiLogin className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-dark-700/50 py-4">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2024 BlockSim - Blockchain Simulation Platform</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;