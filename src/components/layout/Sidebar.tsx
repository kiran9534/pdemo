import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, BarChart, Settings, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-slate-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-white">ContentAI</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              <Link
                to="/dashboard"
                className={`${
                  isActive('/dashboard')
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5 text-slate-400" aria-hidden="true" />
                Dashboard
              </Link>
              <Link
                to="/blogs"
                className={`${
                  isActive('/blogs')
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <FileText className="mr-3 h-5 w-5 text-slate-400" aria-hidden="true" />
                Blogs
              </Link>
              <Link
                to="/create"
                className={`${
                  isActive('/create')
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <PlusCircle className="mr-3 h-5 w-5 text-slate-400" aria-hidden="true" />
                Create New
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/analytics"
                    className={`${
                      isActive('/analytics')
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <BarChart className="mr-3 h-5 w-5 text-slate-400" aria-hidden="true" />
                    Analytics
                  </Link>
                  <Link
                    to="/users"
                    className={`${
                      isActive('/users')
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Users className="mr-3 h-5 w-5 text-slate-400" aria-hidden="true" />
                    Users
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-slate-700 p-4">
            <Link to="/settings" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
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
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs font-medium text-slate-300 group-hover:text-slate-200">
                    {user?.role === 'admin' ? 'Admin' : 'Content Creator'}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;