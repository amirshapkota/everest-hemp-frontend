import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 pt-20">
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          className="bg-white shadow-2xl border border-stone-200 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="/public/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-18 w-18 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-6"
              />
              <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em] uppercase">
                Reset Password
              </h1>
              <p className="text-stone-600 mt-2 tracking-[0.05em]">
                {isSubmitted 
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to receive reset instructions'
                }
              </p>
            </motion.div>

            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-900 text-white py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail size={32} className="text-green-600" />
                </div>
                <p className="text-stone-600 leading-relaxed">
                  We've sent password reset instructions to <strong>{email}</strong>. 
                  Please check your email and follow the link to reset your password.
                </p>
                <p className="text-sm text-stone-500">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-amber-900 hover:text-amber-700 transition-colors"
                  >
                    try again
                  </button>
                </p>
              </motion.div>
            )}

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors text-sm tracking-[0.02em]"
              >
                <ArrowLeft size={16} />
                <span>Back to Sign In</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;