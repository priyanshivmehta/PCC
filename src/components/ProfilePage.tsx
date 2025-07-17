import React, { useState } from 'react';
import { 
  User, 
  Baby, 
  Settings, 
  Globe, 
  Bell,
  Calendar,
  MapPin,
  Phone,
  Edit3,
  Save,
  Camera
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { User as UserType, Baby as BabyType } from '../types';

const PRIMARY_COLOR = '#8e3b30'; // Deep reddish brown
const PRIMARY_BG_LIGHT = '#f3e5e1'; // Light background tint
const PRIMARY_BG_LIGHTER = '#f9f5f4'; // Even lighter tint

const ProfilePage: React.FC = () => {
  const { user, setUser, baby, setBaby, currentLanguage, setCurrentLanguage } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'mother' | 'baby'>('mother');

  const [motherForm, setMotherForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    state: user?.location.state || '',
    district: user?.location.district || '',
    pincode: user?.location.pincode || ''
  });

  const [babyForm, setBabyForm] = useState({
    name: baby?.name || '',
    dateOfBirth: baby?.dateOfBirth ? new Date(baby.dateOfBirth).toISOString().split('T')[0] : '',
    gender: baby?.gender || 'male' as 'male' | 'female',
    pregnancyWeek: baby?.pregnancyWeek || ''
  });

  const languages = [
    { code: 'english', label: 'English', native: 'English' },
    { code: 'hindi', label: 'Hindi', native: 'हिंदी' },
    { code: 'regional', label: 'Regional', native: 'Regional Language' }
  ];

  const handleSaveProfile = () => {
    const updatedUser: UserType = {
      id: user?.id || Date.now().toString(),
      name: motherForm.name,
      phone: motherForm.phone,
      language: currentLanguage as any,
      location: {
        state: motherForm.state,
        district: motherForm.district,
        pincode: motherForm.pincode
      }
    };

    setUser(updatedUser);

    if (babyForm.name && babyForm.dateOfBirth) {
      const birthDate = new Date(babyForm.dateOfBirth);
      const ageInMonths = Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      
      let currentStage: BabyType['currentStage'] = 'newborn';
      if (ageInMonths >= 24) currentStage = 'toddler';
      else if (ageInMonths >= 12) currentStage = 'infant';

      const updatedBaby: BabyType = {
        id: baby?.id || Date.now().toString(),
        name: babyForm.name,
        dateOfBirth: new Date(babyForm.dateOfBirth),
        gender: babyForm.gender,
        currentStage,
        pregnancyWeek: babyForm.pregnancyWeek ? parseInt(String(babyForm.pregnancyWeek)) : undefined
      };

      setBaby(updatedBaby);
    }

    setIsEditing(false);
  };

  const calculateAge = (birthDate: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days old`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} months old`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months old`;
    }
  };

  return (
    <div className="pt-10 px-4 space-y-6">
      {/* Header */}
      <div
        className="rounded-xl p-6 border"
        style={{ background: `linear-gradient(to right, ${PRIMARY_BG_LIGHTER}, ${PRIMARY_BG_LIGHT})`, borderColor: PRIMARY_COLOR }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <User className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
              </div>
              <button
                title="camera"
                className="absolute -bottom-1 -right-1"
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  color: 'white',
                  padding: '0.25rem',
                  borderRadius: '9999px',
                }}
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Set up your profile'}</h2>
              <p className="text-gray-600">Manage your account and baby's information</p>
            </div>
          </div>
          
          <button
            onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
            className="px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            style={{
              backgroundColor: PRIMARY_COLOR,
              color: 'white',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#6c2f25')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = PRIMARY_COLOR)}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Save' : 'Edit'}</span>
          </button>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('mother')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'mother'
              ? `bg-white shadow-sm text-[${PRIMARY_COLOR}]`
              : 'text-gray-600 hover:text-gray-800'
          }`}
          style={activeTab === 'mother' ? { color: PRIMARY_COLOR } : {}}
        >
          <User className="w-4 h-4" style={activeTab === 'mother' ? { color: PRIMARY_COLOR } : undefined} />
          <span>Mother Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('baby')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'baby'
              ? `bg-white shadow-sm text-[${PRIMARY_COLOR}]`
              : 'text-gray-600 hover:text-gray-800'
          }`}
          style={activeTab === 'baby' ? { color: PRIMARY_COLOR } : {}}
        >
          <Baby className="w-4 h-4" style={activeTab === 'baby' ? { color: PRIMARY_COLOR } : undefined} />
          <span>Baby Profile</span>
        </button>
      </div>

      {/* Mother Profile */}
      {activeTab === 'mother' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <span>Personal Information</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={motherForm.name}
                    onChange={(e) => setMotherForm({ ...motherForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-800">{user?.name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={motherForm.phone}
                    onChange={(e) => setMotherForm({ ...motherForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-800 flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user?.phone || 'Not set'}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <span>Location</span>
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={motherForm.state}
                      onChange={(e) => setMotherForm({ ...motherForm, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                      placeholder="State"
                    />
                  ) : (
                    <p className="text-gray-800">{user?.location.state || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={motherForm.district}
                      onChange={(e) => setMotherForm({ ...motherForm, district: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                      placeholder="District"
                    />
                  ) : (
                    <p className="text-gray-800">{user?.location.district || 'Not set'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={motherForm.pincode}
                    onChange={(e) => setMotherForm({ ...motherForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                    placeholder="Pincode"
                  />
                ) : (
                  <p className="text-gray-800">{user?.location.pincode || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Baby Profile */}
      {activeTab === 'baby' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Baby className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <span>Baby Information</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baby's Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={babyForm.name}
                    onChange={(e) => setBabyForm({ ...babyForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                    placeholder="Enter baby's name"
                  />
                ) : (
                  <p className="text-gray-800">{baby?.name || 'Not set'}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  {isEditing ? (
                    <input
                      title="dob"
                      type="date"
                      value={babyForm.dateOfBirth}
                      onChange={(e) => setBabyForm({ ...babyForm, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                    />
                  ) : (
                    <p className="text-gray-800 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {baby?.dateOfBirth
                          ? new Date(baby.dateOfBirth).toLocaleDateString()
                          : 'Not set'}
                      </span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      title="gender"
                      value={babyForm.gender}
                      onChange={(e) => setBabyForm({ ...babyForm, gender: e.target.value as 'male' | 'female' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px ${PRIMARY_COLOR}50` }}
                    >
                      <option value="male">Boy</option>
                      <option value="female">Girl</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">
                      {baby?.gender === 'male'
                        ? 'Boy'
                        : baby?.gender === 'female'
                        ? 'Girl'
                        : 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {baby?.dateOfBirth && (
                <div
                  className="p-3 rounded-lg border"
                  style={{ backgroundColor: '#f9f5f4', borderColor: 'rgba(142,59,48,0.25)' }}
                >
                  <p className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>
                    Current Age
                  </p>
                  <p className="text-sm" style={{ color: PRIMARY_COLOR }}>
                    {calculateAge(new Date(baby.dateOfBirth))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5" style={{ color: 'rgba(0,0,0,0.6)' }} />
          <span>App Settings</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
            <div className="space-y-2">
              {languages.map((lang) => (
                <label key={lang.code} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="language"
                    value={lang.code}
                    checked={currentLanguage === lang.code}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="text-[rgb(142,59,48)] focus:ring-[rgb(142,59,48)]"
                  />
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800">{lang.label}</span>
                    <span className="text-sm text-gray-500">({lang.native})</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-600">Get reminders for vaccinations and checkups</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                title="bell"
                type="checkbox"
                className="sr-only peer"
                defaultChecked
              />
              <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgba(142,59,48,0.3)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(142,59,48)]"
              ></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: PRIMARY_BG_LIGHTER, borderColor: 'rgba(142,59,48,0.15)', color: 'rgba(0,0,0,0.65)' }}
      >
        <h3 className="font-semibold mb-3" style={{ color: PRIMARY_COLOR }}>
          Data & Privacy
        </h3>
        <div className="space-y-2 text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>
          <p>• Your data is stored locally on your device</p>
          <p>• We don't share personal information with third parties</p>
          <p>• Medical advice provided is for informational purposes only</p>
          <p>• Always consult healthcare professionals for medical decisions</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
