// Main.tsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Animation from './Pages/Animation/Animation';
import Cards from './Pages/cards/Cards';
import Filter from './Pages/filter/Filter';
import Footer from './Pages/footer/Footer';
import Navbar from './Pages/Menu/Layout'; // Ensure the path is correct
import NewsCard from './Pages/newsCard/Newcard';
import AnidubDashboard from './Pages/Dashbard/Dashboard';
import Profil from './Pages/profil/profil';
import Login from './Pages/Menu/login';

const Main = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isProfil = location.pathname === '/profil';
  const isLogin = location.pathname === '/Login';

  return (
    <>

      {/* Main content */}
      <Routes>
        <Route path="/dashboard" element={<AnidubDashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/Login" element={<Login />} />
        {/* Add additional routes here */}
      </Routes>

      {/* Content hidden on dashboard, profile, and login */}
      {!isDashboard && !isProfil && !isLogin && (
        <>
          <Animation />
          <Filter />
          <NewsCard />
          <Cards />
          <Footer />
        </>
      )}
    </>
  );
};

export default Main;
