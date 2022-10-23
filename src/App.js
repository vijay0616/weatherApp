import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CityContextProvider from "./contexts/CityContext";
import Dashboard from "./pages/Dashboard";
import WeatherDetails from "./pages/WeatherDetails";
function App() {
  return (
    <div className="App">
      <CityContextProvider>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate replace to="dashboard" />} />
          <Route path="/weather-deatils" element={<WeatherDetails />} />
        </Routes>
      </CityContextProvider>
    </div>
  );
}

export default App;
