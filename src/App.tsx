
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import Feedback from "./components/Feedback";
import About from "./components/About";
import Contact from "./components/Contact";

const queryClient = new QueryClient();

// Protected route component with improved redirect handling
const ProtectedRoute = ({ children, allowedUserType }: { children: React.ReactNode, allowedUserType?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState<string | null>(localStorage.getItem('userType'));
  
  useEffect(() => {
    // Check on mount and whenever location changes
    const checkAuth = () => {
      const currentUserType = localStorage.getItem('userType');
      setUserType(currentUserType);
      
      if (!currentUserType) {
        navigate('/login', { replace: true, state: { from: location } });
        return;
      }
      
      if (allowedUserType && currentUserType !== allowedUserType) {
        navigate(currentUserType === 'admin' ? '/admin' : '/user-dashboard', { replace: true });
        return;
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const handleUserChange = () => {
      checkAuth();
    };
    
    window.addEventListener('userChange', handleUserChange);
    return () => {
      window.removeEventListener('userChange', handleUserChange);
    };
  }, [navigate, allowedUserType, location]);
  
  if (!userType) {
    return null;
  }
  
  if (allowedUserType && userType !== allowedUserType) {
    return null;
  }
  
  return <>{children}</>;
};

// Layout component to handle footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/admin' || location.pathname === '/user-dashboard';
  
  return (
    <>
      {children}
      {!isDashboardPage && <Footer />}
    </>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setIsAuthenticated(!!userType);

    const handleUserChange = () => {
      setIsAuthenticated(!!localStorage.getItem('userType'));
    };

    window.addEventListener('userChange', handleUserChange);
    
    // Check for auth state changes
    const authCheckInterval = setInterval(() => {
      const currentUserType = localStorage.getItem('userType');
      if (!!currentUserType !== isAuthenticated) {
        setIsAuthenticated(!!currentUserType);
      }
    }, 1000);

    return () => {
      window.removeEventListener('userChange', handleUserChange);
      clearInterval(authCheckInterval);
    };
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to={localStorage.getItem('userType') === 'admin' ? '/admin' : '/user-dashboard'} /> : <Login />
              } />
              <Route path="/signup" element={
                isAuthenticated ? <Navigate to="/user-dashboard" /> : <Signup />
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedUserType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-dashboard" 
                element={
                  <ProtectedRoute allowedUserType="user">
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
