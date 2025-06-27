import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Weight, 
  Ruler, 
  Shield, 
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { HealthRecord, Vaccination } from '../types';

const HealthTracker: React.FC = () => {
  const { baby, healthRecords, setHealthRecords, vaccinations, setVaccinations } = useApp();
  const [activeTab, setActiveTab] = useState<'records' | 'vaccinations'>('records');
  const [showAddRecord, setShowAddRecord] = useState(false);

  const [newRecord, setNewRecord] = useState({
    weight: '',
    height: '',
    headCircumference: '',
    milestones: '',
    notes: ''
  });

  const defaultVaccinations: Vaccination[] = [
    {
      id: '1',
      name: 'BCG',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false
    },
    {
      id: '2',
      name: 'OPV-1',
      dueDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
      completed: false
    },
    {
      id: '3',
      name: 'DPT-1',
      dueDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
      completed: false
    },
    {
      id: '4',
      name: 'OPV-2',
      dueDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
      completed: false
    },
    {
      id: '5',
      name: 'DPT-2',
      dueDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
      completed: false
    }
  ];

  // Initialize vaccinations if empty
  React.useEffect(() => {
    if (vaccinations.length === 0 && baby) {
      setVaccinations(defaultVaccinations);
    }
  }, [baby, vaccinations.length, setVaccinations]);

  const handleAddRecord = () => {
    if (!newRecord.weight || !newRecord.height) return;

    const record: HealthRecord = {
      id: Date.now().toString(),
      date: new Date(),
      weight: parseFloat(newRecord.weight),
      height: parseFloat(newRecord.height),
      headCircumference: newRecord.headCircumference ? parseFloat(newRecord.headCircumference) : undefined,
      milestones: newRecord.milestones.split(',').map(m => m.trim()).filter(m => m),
      notes: newRecord.notes
    };

    setHealthRecords([...healthRecords, record]);
    setNewRecord({ weight: '', height: '', headCircumference: '', milestones: '', notes: '' });
    setShowAddRecord(false);
  };

  const markVaccinationComplete = (id: string) => {
    setVaccinations(vaccinations.map(v => 
      v.id === id ? { ...v, completed: true, completedDate: new Date() } : v
    ));
  };

  const getVaccinationStatus = (vaccination: Vaccination) => {
    if (vaccination.completed) return 'completed';
    if (new Date(vaccination.dueDate) < new Date()) return 'overdue';
    if (new Date(vaccination.dueDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000) return 'due-soon';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'due-soon': return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'overdue': return AlertCircle;
      case 'due-soon': return Clock;
      default: return Calendar;
    }
  };

  return (
    <div className="pb-20 px-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Health Tracker</h2>
        <p className="text-gray-600">Monitor your baby's growth and vaccination schedule</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'records'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Growth Records
        </button>
        <button
          onClick={() => setActiveTab('vaccinations')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'vaccinations'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Vaccinations
        </button>
      </div>

      {activeTab === 'records' && (
        <div className="space-y-4">
          {/* Add Record Button */}
          <button
            onClick={() => setShowAddRecord(!showAddRecord)}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Health Record</span>
          </button>

          {/* Add Record Form */}
          {showAddRecord && (
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">New Health Record</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newRecord.weight}
                      onChange={(e) => setNewRecord({...newRecord, weight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newRecord.height}
                      onChange={(e) => setNewRecord({...newRecord, height: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Head Circumference (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecord.headCircumference}
                    onChange={(e) => setNewRecord({...newRecord, headCircumference: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="35"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Milestones (comma separated)</label>
                  <input
                    type="text"
                    value={newRecord.milestones}
                    onChange={(e) => setNewRecord({...newRecord, milestones: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Smiling, holding head up"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Any additional notes..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddRecord}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Save Record
                  </button>
                  <button
                    onClick={() => setShowAddRecord(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Health Records List */}
          <div className="space-y-3">
            {healthRecords.length > 0 ? (
              healthRecords.slice().reverse().map((record) => (
                <div key={record.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">
                      {record.date.toLocaleDateString()}
                    </h4>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="bg-blue-100 p-2 rounded-lg mb-1 mx-auto w-fit">
                        <Weight className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-600">Weight</p>
                      <p className="font-semibold text-sm">{record.weight} kg</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 p-2 rounded-lg mb-1 mx-auto w-fit">
                        <Ruler className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Height</p>
                      <p className="font-semibold text-sm">{record.height} cm</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 p-2 rounded-lg mb-1 mx-auto w-fit">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-600">Head Circ.</p>
                      <p className="font-semibold text-sm">{record.headCircumference || 'N/A'} cm</p>
                    </div>
                  </div>

                  {record.milestones.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Milestones:</p>
                      <div className="flex flex-wrap gap-1">
                        {record.milestones.map((milestone, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {milestone}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{record.notes}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No health records yet</p>
                <p className="text-sm text-gray-500 mt-1">Add your first record to start tracking</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'vaccinations' && (
        <div className="space-y-4">
          {vaccinations.map((vaccination) => {
            const status = getVaccinationStatus(vaccination);
            const StatusIcon = getStatusIcon(status);
            
            return (
              <div key={vaccination.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{vaccination.name}</h4>
                      <p className="text-sm text-gray-600">
                        {status === 'completed' 
                          ? `Completed on ${vaccination.completedDate?.toLocaleDateString()}`
                          : `Due: ${new Date(vaccination.dueDate).toLocaleDateString()}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded-full ${getStatusColor(status)}`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    {!vaccination.completed && (
                      <button
                        onClick={() => markVaccinationComplete(vaccination.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HealthTracker;