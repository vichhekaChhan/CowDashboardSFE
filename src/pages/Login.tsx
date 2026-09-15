import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

export function Login({ onLogin, onNavigateRegister }: { onLogin: () => void, onNavigateRegister: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }
    
    setIsSubmitting(true);
    // TODO: Actual API Call
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(rememberMe);
    }, 1000);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your CowFit account">
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 text-sm border border-red-100">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            id="email" 
            type="email" 
            required
            disabled={isSubmitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f76e8] focus:border-[#5f76e8] text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500" 
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <button type="button" className="text-sm text-[#5f76e8] hover:text-[#5f76e8]/80 font-medium">Forgot password?</button>
          </div>
          <div className="relative">
            <input 
              id="password" 
              type={showPassword ? "text" : "password"}
              required
              disabled={isSubmitting}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f76e8] focus:border-[#5f76e8] text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <input id="remember" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#5f76e8] focus:ring-[#5f76e8] cursor-pointer" />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">Remember me</label>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !email || !password}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#5f76e8] hover:bg-[#5f76e8]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f76e8] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? <><Loader2 size={18} className="animate-spin mr-2" /> Signing in...</> : "Sign In"}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button type="button" onClick={onNavigateRegister} className="font-medium text-[#5f76e8] hover:text-[#5f76e8]/80 transition-colors">
          Sign up
        </button>
      </p>
    </AuthLayout>
  );
}