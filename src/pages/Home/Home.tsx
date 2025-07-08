import React from 'react';
import pregnantVideo from '../../assets/pregnantmom.mp4';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
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

      {/* Hero Content (Upper Left) */}
      <div className="absolute top-0 left-0 z-10 flex flex-col items-start justify-start p-10 pt-48 text-white rounded-br-3xl max-w-3xl w-full gap-2">
  <h1 className=" text-5xl md:text-6xl font-bold font-sans drop-shadow-lg">
    Welcome to ChAlid-Baby Care 
  </h1>
  <p className=" text-2xl md:text-3xl font-sans font-normal mt-2 drop-shadow">
    Everything you need for your child
  </p>
</div>


     
    </div>
  );
};

export default Home;
