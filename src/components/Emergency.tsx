import React, { useState } from 'react';
import { Phone, AlertTriangle, Guitar as Hospital, Clock, MapPin, Heart, Thermometer, Zap, Info, ChevronRight, Shield } from 'lucide-react';

const Emergency: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const emergencyNumbers = [
    {
      name: 'National Emergency',
      number: '112',
      description: 'Single emergency number for all services',
      icon: Shield,
      color: 'bg-red-600'
    },
    {
      name: 'Medical Emergency',
      number: '102',
      description: 'Free ambulance service',
      icon: Hospital,
      color: 'bg-blue-600'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      description: '24/7 child protection services',
      icon: Heart,
      color: 'bg-pink-600'
    },
    {
      name: 'Women Helpline',
      number: '181',
      description: 'Support for women in distress',
      icon: Phone,
      color: 'bg-purple-600'
    }
  ];

  const emergencySymptoms = [
    {
      category: 'Breathing Issues',
      icon: Zap,
      color: 'bg-red-500',
      symptoms: [
        'Difficulty breathing or rapid breathing',
        'Blue lips or face (cyanosis)',
        'Wheezing or gasping sounds',
        'Chest retractions while breathing'
      ],
      action: 'Call 102 immediately and rush to nearest hospital'
    },
    {
      category: 'High Fever',
      icon: Thermometer,
      color: 'bg-orange-500',
      symptoms: [
        'Temperature above 100.4°F (38°C) in newborns',
        'Temperature above 104°F (40°C) in older babies',
        'Fever with severe lethargy',
        'Fever with difficulty feeding'
      ],
      action: 'Contact pediatrician immediately. Cool the baby and monitor closely'
    },
    {
      category: 'Severe Symptoms',
      icon: AlertTriangle,
      color: 'bg-red-600',
      symptoms: [
        'Unconsciousness or extreme lethargy',
        'Severe vomiting or diarrhea with dehydration',
        'Persistent crying for over 3 hours',
        'Signs of severe pain or distress'
      ],
      action: 'Emergency medical attention required - Call 102'
    },
    {
      category: 'Injury/Accidents',
      icon: Hospital,
      color: 'bg-purple-500',
      symptoms: [
        'Head injury or fall from height',
        'Severe cuts or bleeding',
        'Burns or scalds',
        'Suspected fractures'
      ],
      action: 'Do not move the baby. Call emergency services immediately'
    }
  ];

  const firstAidTips = [
    {
      title: 'Choking',
      steps: [
        'For babies under 1 year: Hold face down on your forearm',
        'Give 5 back blows between shoulder blades',
        'Turn baby over and give 5 chest compressions',
        'Call 102 if object not dislodged'
      ]
    },
    {
      title: 'Fever Management',
      steps: [
        'Remove excess clothing and blankets',
        'Use tepid sponging (lukewarm water)',
        'Ensure adequate hydration',
        'Give prescribed medication as per doctor\'s advice'
      ]
    },
    {
      title: 'Minor Cuts',
      steps: [
        'Clean your hands thoroughly',
        'Stop bleeding with clean cloth pressure',
        'Clean wound with clean water',
        'Apply bandage and monitor for infection signs'
      ]
    }
  ];

  const handleCall = (number: string) => {
    if (typeof window !== 'undefined' && window.location.href.includes('tel:')) {
      window.location.href = `tel:${number}`;
    } else {
      // For demo purposes, show alert
      alert(`Calling ${number}...`);
    }
  };

  return (
    <div className="pb-20 px-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Emergency & Medical Help</h2>
        </div>
        <p className="text-gray-600">Quick access to emergency services and first aid guidance</p>
      </div>

      {/* Emergency Numbers */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Emergency Contacts</h3>
        <div className="grid grid-cols-1 gap-3">
          {emergencyNumbers.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${contact.color} p-2 rounded-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(contact.number)}
                    className={`${contact.color} text-white px-6 py-2 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity`}
                  >
                    {contact.number}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Symptoms */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">When to Seek Emergency Help</h3>
        <div className="space-y-3">
          {emergencySymptoms.map((emergency, index) => {
            const Icon = emergency.icon;
            const isSelected = selectedCategory === emergency.category;
            
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setSelectedCategory(isSelected ? '' : emergency.category)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${emergency.color} p-2 rounded-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800">{emergency.category}</h4>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                    isSelected ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {isSelected && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="space-y-3 mt-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Symptoms to watch for:</p>
                        <ul className="space-y-1">
                          {emergency.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <p className="text-sm font-medium text-red-800 mb-1">Immediate Action:</p>
                        <p className="text-sm text-red-700">{emergency.action}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* First Aid Tips */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Basic First Aid</h3>
        <div className="space-y-3">
          {firstAidTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-blue-100 p-1 rounded">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">{tip.title}</h4>
              </div>
              
              <ol className="space-y-2">
                {tip.steps.map((step, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-2">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">Remember</p>
            <p className="text-sm text-amber-700">
              In any emergency, trust your instincts. If you feel something is seriously wrong with your baby, 
              don't hesitate to seek immediate medical attention. It's always better to be safe.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access to Nearby Hospitals */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Nearby Hospitals</h4>
              <p className="text-sm text-gray-600">Find emergency care near you</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Locate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emergency;