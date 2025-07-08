import React from 'react';
import Coverbg from '../../assets/coverbg.jpg';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src={Coverbg}
        alt="Cover background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hero Content (Right Center, text left-aligned) */}
      <div className="absolute inset-0 z-10 flex items-center justify-end px-10">
        <div className="p-4 sm:p-6 md:p-10 rounded-xl max-w-xl w-full text-left text-black font-poppins">
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
    Welcome to ChAild
  </h1>
  <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4 drop-shadow text-black">
    Guiding You Through the First 1000 Days
  </p>
  <button className="mt-6 px-6 py-3 border-2 border-black text-black rounded-md text-lg font-medium hover:bg-[#ebc7ea] transition duration-300">
    Get Started
  </button>
</div>

      </div>
    </div>
  );
};

export default Home;
