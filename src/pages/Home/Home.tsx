import React from 'react';
import { useNavigate } from 'react-router-dom';
import Coverbg from '../../assets/coverbg.jpg';
import Typewriter from "../../typewritter";

const rotatingWords = [
  'Welcome',
  'स्वागत है',
  'வரவேற்பு',
  'స్వాగతం',
  'സ്വാഗതം',
  'ಸ್ವಾಗತ',
  'স্বাগত',
  'સ્વાગત છે',
  'ਸਵਾਗਤ ਹੈ',
  'স্বাগতম',
  'स्वागत आहे',
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden font-poppins">
      {/* Background Image */}
      <img
        src={Coverbg}
        alt="Cover background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-end px-10 mt-10">
        <div className="p-6 mr-4 sm:p-6 md:p-10 rounded-xl max-w-xl w-full text-left text-white font-poppins">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-tight">
            <Typewriter
              text={rotatingWords}
              speed={80}
              waitTime={2000}
              deleteSpeed={40}
              className="text-white"
              cursorChar="|"
              showCursor={true}
              hideCursorOnType={false}
            />{' '}
            <span className="text-white">to ChAild</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4 drop-shadow">
            Guiding You Through the First 1000 Days
          </p>

          <button
            onClick={() => navigate('/tracker')}
            className="mt-6 px-6 py-3 border-2 border-white text-white rounded-md text-lg font-medium hover:bg-white hover:text-black transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
