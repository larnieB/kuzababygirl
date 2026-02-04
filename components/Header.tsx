
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
  onLogin?: (data: any) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onLogin }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-pink-100 sticky top-0 z-50 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-wine w-10 h-10 rounded-full flex items-center justify-center text-white font-serif text-xl italic">K</div>
          <span className="text-2xl font-serif font-bold text-wine">kuzaBabygirl</span>
        </Link>

        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          {user && (
            <Link 
              to="/dashboard" 
              className={`${isActive('/dashboard') ? 'text-wine font-bold border-b-2 border-wine' : 'hover:text-wine'} transition pb-1`}
            >
              Dashboard
            </Link>
          )}
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'text-wine font-bold border-b-2 border-wine' : 'hover:text-wine'} transition pb-1`}
          >
            About
          </Link>
          <Link 
            to="/challenges" 
            className={`${isActive('/challenges') ? 'text-wine font-bold border-b-2 border-wine' : 'hover:text-wine'} transition pb-1`}
          >
            Challenges
          </Link>
          <Link 
            to="/education" 
            className={`${isActive('/education') ? 'text-wine font-bold border-b-2 border-wine' : 'hover:text-wine'} transition pb-1`}
          >
            Education Hub
          </Link>
        </div>

        <div>
          {user ? (
            <div className="flex items-center space-x-4">
               <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-500">Wallet</p>
                <p className="font-bold text-wine">{user.balance.toLocaleString()} sh</p>
              </div>
              <button 
                onClick={onLogout}
                className="bg-wine text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-90 transition text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onLogin?.({})}
              className="bg-wine text-white px-8 py-2 rounded-full font-medium hover:bg-opacity-90 shadow-md transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
