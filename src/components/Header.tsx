import React from 'react';
import { Baby, Bell, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { baby } = useApp();

  return (
    <header className="bg-gradient-to-r from-pink-100 to-blue-100 px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Baby className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{title}</h1>
            {baby && (
              <p className="text-sm text-gray-600">
                {baby.name} • {Math.floor((Date.now() - new Date(baby.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24))} days old
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-white/50 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/50 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;