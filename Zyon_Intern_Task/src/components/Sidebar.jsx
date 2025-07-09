import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Home
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none w-64 border-r border-gray-200`}>

        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Zyon Admin</span>
        </div>

        <div className="mt-8 px-4 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
