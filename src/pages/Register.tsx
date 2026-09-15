import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

export function Register({ onRegister, onNavigateLogin }: { onRegister: () => void, onNavigateLogin: () => void }) {
  const [formData, setFormData] = useState({ fullName: '', farmName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 0) score += 1;
    if (pass.length >= 8) score += 1;
    if (/d/.test(pass)) score += 1;
    return score; // 0, 1 (weak), 2 (medium), 3 (strong)
  };
  
  const strength = calculatePasswordStrength(formData.password);
  
  const isFormValid = formData.fullName && formData.farmName && formData.email && formData.password.length >= 8 && /d/.test(formData.password) && formData.password === formData.confirmPassword && acceptedTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.fullName || !formData.farmName || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (formData.password.length < 8 || !/\d/.test(formData.password)) {
      setError('Password must be at least 8 characters and contain a number.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!acceptedTerms) {
      setError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }
    
    setIsSubmitting(true);
    // TODO: Actual API Call
    setTimeout(() => {
      setIsSubmitting(false);
      onRegister();
    }, 1000);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start managing your herd with CowFit">
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 text-sm border border-red-100">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            id="fullName" 
            type="text" 
            required
            disabled={isSubmitting}
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f76e8] focus:border-[#5f76e8] text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500" 
          />
        </div>

        <div>
          <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
          <input 
            id="farmName" 
            type="text" 
            required
            disabled={isSubmitting}
            value={formData.farmName}
            onChange={(e) => setFormData({...formData, farmName: e.target.value})}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f76e8] focus:border-[#5f76e8] text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500" 
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            id="email" 
            type="email" 
            required
            disabled={isSubmitting}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f76e8] focus:border-[#5f76e8] text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500" 
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input 
              id="password" 
              type={showPassword ? "text" : "password"}
              required
              disabled={isSubmitting}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f76e8] focus:border-[#5f76e8] text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {/* Strength Indicator */}
          <div className="mt-2 flex gap-1 h-1.5">
            <div className={`flex-1 rounded-full transition-colors ${strength >= 1 ? (strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-amber-400' : 'bg-green-500') : 'bg-gray-200'}`}></div>
            <div className={`flex-1 rounded-full transition-colors ${strength >= 2 ? (strength === 2 ? 'bg-amber-400' : 'bg-green-500') : 'bg-gray-200'}`}></div>
            <div className={`flex-1 rounded-full transition-colors ${strength >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Min. 8 characters and 1 number.</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input 
              id="confirmPassword" 
              type={showPassword ? "text" : "password"}
              required
              disabled={isSubmitting}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className={`w-full px-4 py-2.5 border ${formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#5f76e8]'} rounded-lg focus:ring-2 text-sm outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500`} 
            />
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
          )}
        </div>
        
        <div className="flex items-start mt-2">
          <input id="terms" type="checkbox" required checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-[#5f76e8] focus:ring-[#5f76e8] cursor-pointer" />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
            I agree to the <a href="#" className="text-[#5f76e8] hover:underline">Terms of Service</a> and <a href="#" className="text-[#5f76e8] hover:underline">Privacy Policy</a>
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-2.5 px-4 mt-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#5f76e8] hover:bg-[#5f76e8]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f76e8] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? <><Loader2 size={18} className="animate-spin mr-2" /> Creating Account...</> : "Create Account"}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button type="button" onClick={onNavigateLogin} className="font-medium text-[#5f76e8] hover:text-[#5f76e8]/80 transition-colors">
          Sign in
        </button>
      </p>
    </AuthLayout>
  );
}