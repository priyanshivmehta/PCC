import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  MessageCircle,
  Calendar,
  MapPin,
  Utensils,
  AlertTriangle,
  User
} from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'text-pink-600' },
    { path: '/chat', icon: MessageCircle, label: 'Ask AI', color: 'text-pink-600' },
    { path: '/tracker', icon: Calendar, label: 'Health', color: 'text-pink-600' },
    { path: '/services', icon: MapPin, label: 'Services', color: 'text-pink-600' },
    { path: '/nutrition', icon: Utensils, label: 'Nutrition', color: 'text-pink-600' },
    { path: '/emergency', icon: AlertTriangle, label: 'Emergency', color: 'text-pink-600' },
    { path: '/profile', icon: User, label: 'Profile', color: 'text-pink-600' },
  ];

  return (
    <nav
      className={`${
        isHome
          ? 'absolute top-0 left-0 right-0'
          : 'relative'
      } z-50 px-4 py-2 border-b backdrop-blur-md shadow-md ${
        isHome ? 'bg-transparent border-pink-200' : 'bg-white border-pink-100'
      } font-sans`}
    >
      <div className="flex justify-around items-center max-w-5xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-3 py-1 rounded-md transition-all duration-200 ${
                isActive
                  ? isHome
                    ? 'text-pink-200 '
                    : 'bg-pink-100 text-pink-700'
                  : isHome
                  ? 'text-white hover:text-pink-200'
                  : 'text-pink-600 hover:text-pink-800'
              } font-sans`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium font-sans">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
