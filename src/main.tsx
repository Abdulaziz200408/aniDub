import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Animation from './Pages/Animation/Animation';
import Cards from './Pages/cards/Cards';
import Filter from './Pages/filter/Filter';
import Footer from './Pages/footer/Footer';
import Navbar from './Pages/Menu/Layout'; // Ensure the path is correct
import NewsCard from './Pages/newsCard/Newcard';
import AnidubDashboard from './Pages/Dashbard/Dashboard';

const Main = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <Animation />}
      {!isDashboard && <Filter />}
      {!isDashboard && <NewsCard />}
      {!isDashboard && <Cards />}
      {!isDashboard && <Footer />}
      <Routes>
        <Route path="/dashboard" element={<AnidubDashboard />} />
        {/* Add more routes here */}
      </Routes>
    </>
  );
};

export default Main;
