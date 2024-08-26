import { Route, Routes, useLocation } from "react-router-dom";
import Animation from "./Pages/Animation/Animation";
import Cards from "./Pages/cards/Cards";
import Filter from "./Pages/filter/Filter";
import Footer from "./Pages/footer/Footer";
import Navbar from "./Pages/Menu/Layout";
import NewsCard from "./Pages/newsCard/Newcard";
import AnidubDashboard from "./Pages/Dashbard/Dashboard";

const Main = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <Animation />} {/* Tugatilgan */}
      {!isDashboard && <Filter />} {/* Islom */}
      {!isDashboard && <NewsCard />} {/* Islom */}
      {!isDashboard && <Cards />} {/* Abdulaziz */}
      {/* {!isDashboard && <Footer />} Lobar */}
      <Routes>
        <Route path="/dashboard" element={<AnidubDashboard />} />
        {/* Qo'shimcha routelarni shu yerga qo'shishingiz mumkin */}
      </Routes>
    </>
  );
};

export default Main;
