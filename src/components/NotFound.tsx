
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-admin-primary mb-4">404</h1>
        <div className="mb-8 text-white">
          <p className="text-2xl mb-2">Page Not Found</p>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link 
          to="/" 
          className="bg-admin-primary hover:bg-admin-accent text-black font-medium px-8 py-3 rounded-lg transition-colors inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
