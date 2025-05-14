
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@admin.com' && password === 'admin123') {
        localStorage.setItem('userType', 'admin');
        // Dispatch custom event to trigger navbar update
        window.dispatchEvent(new Event('userChange'));
        toast.success("Welcome back, Admin!");
        navigate('/admin');
      } else if (email && password) {
        localStorage.setItem('userType', 'user');
        // Dispatch custom event to trigger navbar update
        window.dispatchEvent(new Event('userChange'));
        toast.success("Login successful!");
        navigate('/user-dashboard');
      } else {
        toast.error("Please enter valid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-admin-dark p-8 rounded-xl shadow-lg border border-admin-primary/30 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
            Welcome Back
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-admin-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-admin-primary/50"
                placeholder="Enter your email"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Use admin@admin.com / admin123 for admin access
                <br/> Use any email/any password</p>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-admin-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-admin-primary/50"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-admin-primary to-admin-accent text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-admin-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
