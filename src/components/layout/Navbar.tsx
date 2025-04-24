import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-teal-600">ContentAI</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/blogs"
                className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Blogs
              </Link>
              <Link
                to="/create"
                className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Create
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/analytics"
                  className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Analytics
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <span className="sr-only">Open user menu</span>
                  {user?.avatarUrl ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatarUrl}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="ml-2 text-gray-700">{user?.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </button>
              </div>
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/blogs"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/create"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/analytics"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {user?.avatarUrl ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:text-teal-700 flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;