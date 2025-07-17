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
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyPage: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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
      ,
      imge: 'https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ByfGVufDB8fDB8fHww',
    },
    {
      title: 'Fever Management',
      steps: [
        'Remove excess clothing',
        'Use tepid sponge',
        'Ensure hydration',
        'Give meds as doctor advised'
      ],
      image: 'https://plus.unsplash.com/premium_photo-1664910150142-c5fee1b9c1b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmV2ZXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Minor Cuts',
      steps: [
        'Clean hands thoroughly',
        'Press clean cloth on wound',
        'Wash with clean water',
        'Bandage & watch for infection'
      ],
      image: 'https://media.istockphoto.com/id/856350192/photo/mother-comforting-son-after-he-injured-his-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=fc1aZ9iENRh4HbPbUJ0RY-Izkuq1kACsfHoQizGwVqM='
    }
  ];

  const handleCall = (number: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${number}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.15
      }
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="pb-8 px-4 space-y-6 bg-[#fdfbf7]">
      {/* Header */}
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
          <div className="absolute left-0 top-20 h-px bg-white w-[150px] md:w-[242px]" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg relative z-10">
            Emergency Attention
          </h2>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-4 bg-gradient-to-br from-red-100 via-yellow-50 to-white py-8 px-4 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-red-800 mb-6 text-center">
          🚨 Emergency Contacts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {emergencyNumbers.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl overflow-hidden transform hover:scale-105 transition-transform shadow-md"
              >
                <div className="absolute inset-0 bg-red-50 opacity-30 animate-pulse mix-blend-screen" />
                <div className="p-6 flex items-center space-x-4 relative z-10">
                  <div className={`${c.color} p-4 rounded-full shadow-lg`}>
                    <Icon className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-red-900">{c.name}</h4>
                    <p className="text-sm text-red-700">{c.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCall(c.number)}
                    className={`${c.color} text-white px-5 py-2 rounded-full text-lg font-semibold shadow-lg`}
                  >
                    📞 {c.number}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Emergency Symptoms */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#5a3821]">When to Seek Help</h2>
        <div className="space-y-3">
          {emergencySymptoms.map((em, i) => {
            const Icon = em.icon;
            const isHovered = hoveredCategory === em.category;
            return (
              <div
                key={em.category}
                onMouseEnter={() => setHoveredCategory(em.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="group bg-white/80 rounded-2xl shadow-lg overflow-hidden transition duration-300"
              >
                <div className="w-full px-6 py-5 flex items-center justify-between group-hover:bg-[#f5ebe0] transition">
                  <div className="flex items-center space-x-4">
                    <div className={`${em.color} rounded-full p-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#5a3821]">
                      {em.category}
                    </h4>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 text-[#7a5a3a] transform transition-transform duration-300 ${
                      isHovered ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key="details"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-8 py-4 bg-[#fdfbf7] space-y-4"
                    >
                      <motion.div className="flex flex-wrap gap-2">
                        {em.symptoms.map((s, i) => (
                          <motion.span
                            key={i}
                            variants={itemVariants}
                            className="bg-[#d6b08b] text-[#5a3821] text-sm px-3 py-1 rounded-full shadow-sm"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </motion.div>
                      <motion.button
                        variants={itemVariants}
                        className="w-full bg-[#b58857] text-white py-3 rounded-2xl font-bold shadow hover:opacity-90 transition"
                      >
                        {em.action}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* First Aid Tips */}
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#a52a2a] mb-8 tracking-tight drop-shadow-lg" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.04em' }}>
          Basic First Aid
        </h2>
        <div className="w-[90%] mx-auto">
          {firstAidTips.map((tip, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={tip.title}
                className={`flex flex-col md:flex-row items-stretch bg-[#f5ebe0] rounded-2xl shadow-lg overflow-hidden ${!isEven ? 'md:flex-row-reverse' : ''}`}
                style={{ marginBottom: 0 }}
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto flex-shrink-0">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover md:rounded-none md:rounded-l-2xl"
                    style={{ minHeight: '100%', minWidth: '100%' }}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
                  <h4 className="text-2xl font-bold text-[#5a3821] mb-2" style={{ fontFamily: 'Georgia, serif' }}>{tip.title}</h4>
                  <p className="text-base md:text-lg text-[#5a3821] font-medium leading-relaxed">
                    {tip.steps.join('. ')}.
                  </p>
                </div>
              </div>
            );
          })}
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
