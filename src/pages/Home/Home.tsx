import React from 'react';
import pregnantVideo from '../../assets/pregnantmom.mp4';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={pregnantVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Hero Content (Centered) */}
      <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4 bg-black/40">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to the Baby Care App</h1>
      </div>
    </div>
  );
};

export default Home;
