import React from "react";
import { AppProvider } from "./contexts/AppContext";
import Navigation from "./components/Navigation";
import { Routes, Route, useLocation } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import Home from "./pages/Home/Home.tsx";
import Chat from "./pages/Chat/Chat.tsx";
import Tracker from "./components/HealthTracker.tsx";
import Services from "./components/LocalServices.tsx";
import Nutrition from "./components/NutritionGuide.tsx";
import Emergency from "./components/EmergencyPage.tsx";
import Profile from "./components/ProfilePage.tsx";
import NearbyPlaces from "./components/NearbyHospitals.tsx";
import Vaccination from "./components/Vaccination.tsx";

const App: React.FC = () => {
  const location = useLocation();

  // Check if current path is home "/"
  const isHomePage = location.pathname === "/";

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Render Navigation only if NOT home page */}
        {!isHomePage && <Navigation />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/services" element={<Services />} />
          <Route path="/health-center" element={<NearbyPlaces />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vaccinations" element={<Vaccination />} />
        </Routes>
      </div>
    </AppProvider>
  );
};

export default App;
