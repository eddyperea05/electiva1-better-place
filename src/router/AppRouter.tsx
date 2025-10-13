import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
import { OwenershipsPage } from "../ownerships/pages/OwnershipsPage";
import { HomePage } from "../ownerships/pages/HomePage";
import { AboutUsPage } from "../ownerships/pages/AboutUsPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/OwnershipsPage" element={<OwenershipsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
