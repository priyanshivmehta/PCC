import React from "react";
import { AppProvider } from "./contexts/AppContext";
import Navigation from "./components/Navigation";
import { Routes, Route, useLocation } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import Home from "./pages/Home/Home.tsx";
import Chat from "./pages/Chat/Chat.tsx";
import Tracker from "./pages/Tracker/Tracker.tsx";
import Services from "./pages/Services/Services.tsx";
import Nutrition from "./pages/Nutrition/Nutrition.tsx";
import Emergency from "./pages/Emergency/Emergency.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import NearbyPlaces from "./components/NearbyHospitals.tsx";
import Chatbot from "./components/Chatbot.tsx";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AppProvider>
      {/* <Chatbot /> */}
      <div className="min-h-screen bg-gray-50">
        {/* <Navigation/> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/services" element={<Services />} />
          <Route path="/health-center" element={<NearbyPlaces />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AppProvider>
  );
};

export default App;
