import React from 'react';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Utensils, 
  AlertTriangle, 
  User
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home', color: 'text-blue-600' },
    { id: 'chat', icon: MessageCircle, label: 'Ask AI', color: 'text-green-600' },
    { id: 'tracker', icon: Calendar, label: 'Health', color: 'text-purple-600' },
    { id: 'services', icon: MapPin, label: 'Services', color: 'text-indigo-600' },
    { id: 'nutrition', icon: Utensils, label: 'Nutrition', color: 'text-orange-600' },
    { id: 'emergency', icon: AlertTriangle, label: 'Emergency', color: 'text-red-600' },
    { id: 'profile', icon: User, label: 'Profile', color: 'text-gray-600' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? `${item.color} bg-blue-50 scale-105` 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;