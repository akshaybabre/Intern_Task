import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Zyon Admin</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Terms
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-600">© 2025 Zyon Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;