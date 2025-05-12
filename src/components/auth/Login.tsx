
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
              <p className="text-xs text-gray-500 mt-1">Use admin@admin.com / admin123 for admin access</p>
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
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <button 
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg border border-white/10 transition-colors"
              onClick={() => toast.info("Google login not implemented in this demo")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.5l3.1-3C17.1 1.6 14.7 0 12 0 7.3 0 3.2 2.7 1.2 6.9l3.5 2.7C5.8 6.8 8.7 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.5c0-.9-.1-1.8-.2-2.5H12v4.8h6.4c-.3 1.5-1.1 2.7-2.3 3.5v2.9h3.7c2.2-2 3.5-4.9 3.5-8.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M5 15.1c-.4-.7-.6-1.4-.6-2.1s.2-1.4.6-2.1L1.5 8.3C.6 9.5 0 11.1 0 13s.6 3.5 1.5 4.7l3.5-2.6z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.1 0 5.8-1 7.8-2.8l-3.7-2.9c-1 .7-2.4 1.1-4.1 1.1-3.3 0-6.2-1.8-7.3-4.6L1.2 17.5C3.2 21.3 7.3 24 12 24z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
