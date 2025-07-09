import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Shield, User, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Zyon Admin</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Docs
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;