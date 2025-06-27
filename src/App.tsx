import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import HealthTracker from './components/HealthTracker';
import LocalServices from './components/LocalServices';
import NutritionGuide from './components/NutritionGuide';
import Emergency from './components/Emergency';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Baby Care Dashboard';
      case 'chat': return 'AI Care Assistant';
      case 'tracker': return 'Health Tracker';
      case 'services': return 'Local Services';
      case 'nutrition': return 'Nutrition Guide';
      case 'emergency': return 'Emergency Help';
      case 'profile': return 'Profile';
      default: return 'Baby Care App';
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'chat': return <ChatAssistant />;
      case 'tracker': return <HealthTracker />;
      case 'services': return <LocalServices />;
      case 'nutrition': return <NutritionGuide />;
      case 'emergency': return <Emergency />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header title={getPageTitle()} />
        <main className="pt-20">
          {renderCurrentPage()}
        </main>
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </AppProvider>
  );
};

export default App;