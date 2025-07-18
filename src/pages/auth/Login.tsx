import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 pt-20">
      <div className="max-w-md mx-auto px-4 py-8 lg:py-12">
        <motion.div
          className="bg-white shadow-2xl border border-stone-200 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <motion.div
              className="text-center mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-16 w-16 sm:h-18 sm:w-18 lg:h-20 lg:w-20 mx-auto mb-4 lg:mb-6"
              />
              <h1 className="text-2xl lg:text-3xl font-light text-amber-900 tracking-[0.1em] uppercase">
                Welcome Back
              </h1>
              <p className="text-stone-600 mt-2 tracking-[0.05em]">
                Sign in to your account
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 lg:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white text-sm lg:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 lg:pl-10 pr-10 lg:pr-12 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white text-sm lg:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 lg:right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-amber-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} className="lg:w-[18px] lg:h-[18px]" /> : <Eye size={16} className="lg:w-[18px] lg:h-[18px]" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-900 border-stone-300 focus:ring-amber-900"
                  />
                  <span className="ml-2 text-sm text-stone-600 tracking-[0.02em]">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-amber-900 hover:text-amber-700 transition-colors tracking-[0.02em]"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-900 text-white py-2.5 lg:py-3 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </motion.button>
            </motion.form>

            <motion.div
              className="mt-6 lg:mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-stone-600 text-sm tracking-[0.02em]">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-amber-900 hover:text-amber-700 transition-colors font-medium"
                >
                  Create one
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 lg:mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-stone-500 text-sm tracking-[0.02em]">
            Demo: Use any email/password to login
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;