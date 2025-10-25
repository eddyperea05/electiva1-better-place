import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
import { OwnershipsPage } from "../ownerships/pages/OwnershipsPage";
import { HomePage } from "../ownerships/pages/HomePage";
import { AboutUsPage } from "../ownerships/pages/AboutUsPage";
import {Footer } from "../ui/components/Footer";
import { PropertyDetailPage } from "../ownerships/pages/PropertyDetailPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/OwnershipsPage" element={<OwnershipsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/propietario/:id" element={<PropertyDetailPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer/>

      
    </>
  );
};
