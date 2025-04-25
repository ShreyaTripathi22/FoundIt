import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Lost from './Pages/Lost';
import Found from './Pages/Found';
import Home from './Pages/Home'; 
import SignIn from './Pages/SignIn';
import Login from './Pages/Login';
import Profile from './Pages/Profile'
import FoundItems from './Pages/FoundItems';

function App() {

  return (
    <Router>
    <div className='min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/found" element={<Found />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/FoundItems" element={<FoundItems />} />
      </Routes>
    </div>

    
      
  </Router>
  );
}

export default App
