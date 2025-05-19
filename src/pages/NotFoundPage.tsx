import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <Link to="/products" className="btn btn-outline flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;