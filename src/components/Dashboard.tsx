import React from 'react';
import { 
  Calendar, 
  Heart, 
  AlertTriangle, 
  TrendingUp,
  Baby,
  Shield,
  Utensils,
  Clock
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Dashboard: React.FC = () => {
  const { baby, user, vaccinations, healthRecords } = useApp();

  const upcomingVaccinations = vaccinations.filter(v => !v.completed && new Date(v.dueDate) > new Date()).slice(0, 3);
  const recentRecord = healthRecords[healthRecords.length - 1];

  const quickActions = [
    {
      icon: Calendar,
      title: 'Next Checkup',
      subtitle: 'Due in 3 days',
      color: 'bg-blue-500',
      urgent: false
    },
    {
      icon: Shield,
      title: 'Vaccination Due',
      subtitle: 'DPT-3 scheduled',
      color: 'bg-green-500',
      urgent: true
    },
    {
      icon: Utensils,
      title: 'Feeding Time',
      subtitle: 'Next meal in 1 hour',
      color: 'bg-orange-500',
      urgent: false
    },
    {
      icon: Heart,
      title: 'Growth Check',
      subtitle: 'Weekly measurement',
      color: 'bg-pink-500',
      urgent: false
    }
  ];

  const healthInsights = [
    {
      metric: 'Weight',
      value: recentRecord ? `${recentRecord.weight} kg` : 'Not recorded',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      metric: 'Height',
      value: recentRecord ? `${recentRecord.height} cm` : 'Not recorded',
      trend: 'up',
      color: 'text-blue-600'
    },
    {
      metric: 'Milestones',
      value: `${recentRecord?.milestones.length || 0} achieved`,
      trend: 'up',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="pb-20 px-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 border border-pink-100">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Baby className="w-8 h-8 text-pink-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Good morning, {user?.name || 'Parent'}!
            </h2>
            <p className="text-gray-600">
              {baby ? `${baby.name} is growing beautifully` : 'Set up your baby profile to get started'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative ${
                  action.urgent ? 'ring-2 ring-red-100' : ''
                }`}
              >
                {action.urgent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
                <div className={`${action.color} p-2 rounded-lg w-fit mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">{action.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{action.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Insights */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Health Insights</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            {healthInsights.map((insight, index) => (
              <div key={index} className="text-center">
                <div className={`${insight.color} flex items-center justify-center mb-2`}>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-600">{insight.metric}</p>
                <p className="font-semibold text-sm text-gray-800">{insight.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
        <div className="space-y-2">
          {upcomingVaccinations.length > 0 ? (
            upcomingVaccinations.map((vaccination) => (
              <div key={vaccination.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{vaccination.name}</h4>
                  <p className="text-sm text-gray-600">
                    Due: {new Date(vaccination.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-gray-600">No upcoming vaccinations</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Card */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">Emergency Helpline</h4>
            <p className="text-sm text-gray-600">24/7 medical assistance available</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Call 102
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;