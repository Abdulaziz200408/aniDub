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

const Main = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isProfil = location.pathname === '/profil';

  return (
    <>
      {!isDashboard && !isProfil && <Animation />}
      {!isDashboard && !isProfil && <Filter />}
      {!isDashboard && !isProfil && <NewsCard />}
      {!isDashboard && !isProfil && <Cards />}
      {!isDashboard && !isProfil && <Footer />}
      <Routes>
        <Route path="/dashboard" element={<AnidubDashboard />} />
        <Route path="/profil" element={<Profil />} />
        {/* Add more routes here */}
      </Routes>
    </>
  );
};

export default Main;
