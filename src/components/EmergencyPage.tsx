import React, { useState } from 'react';
import {
  Phone,
  AlertTriangle,
  Plus,
  Clock,
  MapPin,
  Heart,
  Thermometer,
  Zap,
  Info,
  ChevronRight,
  Shield
} from 'lucide-react';

const EmergencyPage: React.FC = () => {
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
      icon: Plus,
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
        'Difficulty breathing',
        'Blue lips or face',
        'Wheezing or gasping',
        'Chest retractions'
      ],
      action: 'Call 102 immediately & go to hospital'
    },
    {
      category: 'High Fever',
      icon: Thermometer,
      color: 'bg-orange-500',
      symptoms: [
        'Temp > 100.4°F (38°C) in newborns',
        'Temp > 104°F (40°C) in older babies',
        'Severe lethargy',
        'Difficulty feeding'
      ],
      action: 'Contact pediatrician – cool baby & monitor'
    },
    {
      category: 'Severe Symptoms',
      icon: AlertTriangle,
      color: 'bg-red-600',
      symptoms: [
        'Unconsciousness',
        'Severe vomiting/diarrhea',
        'Persistent crying >3 hrs',
        'Signs of severe pain'
      ],
      action: 'Emergency attention required – Call 102'
    },
    {
      category: 'Injury/Accidents',
      icon: Plus,
      color: 'bg-purple-500',
      symptoms: [
        'Head injury',
        'Severe cuts/bleeding',
        'Burns',
        'Suspected fractures'
      ],
      action: 'Do not move the baby. Call emergency services'
    }
  ];

  const firstAidTips = [
    {
      title: 'Choking',
      steps: [
        'Hold face down on forearm',
        '5 back blows',
        '5 chest compressions',
        'Call 102 if object remains'
      ]
    },
    {
      title: 'Fever Management',
      steps: [
        'Remove excess clothing',
        'Use tepid sponge',
        'Ensure hydration',
        'Give meds as doctor advised'
      ]
    },
    {
      title: 'Minor Cuts',
      steps: [
        'Clean hands thoroughly',
        'Press clean cloth on wound',
        'Wash with clean water',
        'Bandage & watch for infection'
      ]
    }
  ];

  const handleCall = (number: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <div className="pb-8 px-4 space-y-6 bg-[#fdfbf7]">
      
      {/* Hero/Header Section */}
      <div
        className="relative w-full mx-auto rounded-3xl overflow-hidden min-h-[580px] flex items-end mt-12 mb-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(165, 42, 42, 0.7), rgba(165, 42, 42, 0.7)), url(https://plus.unsplash.com/premium_photo-1664476541563-ab0ea7020026?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="pl-24 pt-6 md:pl-32 md:pt-8 text-left w-full relative"
          style={{ top: "-150px" }}
        >
          {/* White line from left to heading */}
          <div className="absolute left-0 top-20 h-px bg-white w-[150px] md:w-[242px]" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg relative z-10">
            Emergency Attention
          </h2>
          <p className="text-lg md:text-2xl text-pink-100 font-medium drop-shadow-md max-w-2xl">
          </p>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#5a3821]">Emergency Contacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyNumbers.map(contact => {
            const Icon = contact.icon;
            return (
              <div
                key={contact.number}
                className="bg-[#f5ebe0] rounded-2xl p-6 flex items-center shadow-lg"
              >
                <div className={`${contact.color} rounded-full p-3`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-lg font-semibold text-[#5a3821]">{contact.name}</h4>
                  <p className="text-sm text-[#7a5a3a]">{contact.description}</p>
                </div>
                <button
                  onClick={() => handleCall(contact.number)}
                  className={`${contact.color} text-white px-5 py-3 rounded-full font-semibold text-lg shadow hover:opacity-90`}
                >
                  📞 {contact.number}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Symptoms */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#5a3821]">When to Seek Help</h2>
        <div className="space-y-3">
          {emergencySymptoms.map(em => {
            const Icon = em.icon;
            const isOpen = selectedCategory === em.category;
            return (
              <div
                key={em.category}
                className="bg-white/80 rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setSelectedCategory(isOpen ? '' : em.category)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#f5ebe0] transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${em.color} rounded-full p-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#5a3821]">
                      {em.category}
                    </h4>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 text-[#7a5a3a] transition-transform ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-8 py-4 bg-[#fdfbf7] space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {em.symptoms.map((s, i) => (
                        <span
                          key={i}
                          className="bg-[#d6b08b] text-[#5a3821] text-sm px-3 py-1 rounded-full shadow-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-[#b58857] text-white py-3 rounded-2xl font-bold">
                      {em.action}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* First Aid Tips */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#5a3821]">Basic First Aid</h2>
        <div className="space-y-3">
          {firstAidTips.map(tip => (
            <div
              key={tip.title}
              className="bg-[#f5ebe0] rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4 space-x-3">
                <Info className="w-6 h-6 text-[#5a3821]" />
                <h4 className="text-lg font-semibold text-[#5a3821]">
                  {tip.title}
                </h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {tip.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow"
                  >
                    <span className="text-[#b58857] font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-[#5a3821] text-sm">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="bg-[#d6b08b] rounded-2xl p-5 flex items-start space-x-4 shadow-lg">
        <Clock className="w-6 h-6 text-[#5a3821]" />
        <p className="text-[#5a3821] font-medium">
          Trust your instincts—seek immediate help if something’s seriously wrong!
        </p>
      </div>

      {/* Nearby Hospitals */}
      <div className="bg-[#f5ebe0] rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <MapPin className="w-8 h-8 text-[#5a3821]" />
          <div>
            <h4 className="text-lg font-semibold text-[#5a3821]">
              Nearby Hospitals
            </h4>
            <p className="text-sm text-[#7a5a3a]">Find care near you</p>
          </div>
        </div>
        <button className="bg-[#7a5a3a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#5a3821]">
          Locate 🗺️
        </button>
      </div>
    </div>
  );
};

export default EmergencyPage;
