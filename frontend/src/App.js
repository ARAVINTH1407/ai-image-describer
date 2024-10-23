import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Dashboard from './pages/Dashboard';  // Re-add Dashboard
import Pricing from './pages/Pricing';      // Re-add Pricing
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Re-add Dashboard route */}
        <Route path="/history" element={<History />} />
        <Route path="/pricing" element={<Pricing />} />      {/* Re-add Pricing route */}
      </Routes>
    </div>
  );
}

export default App;
