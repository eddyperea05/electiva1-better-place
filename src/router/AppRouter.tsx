import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
import { OwenershipsPage } from "../ownerships/pages/OwnershipsPage";
import { LoginPage } from "../authentication/pages/LoginPage";
import { RegisterPage } from "../authentication/pages/RegisterPage";
/* import { AboutUsPage } from "../ownerships/pages/AboutUsPage"; */
import { DetailPropertyPage } from "../detailProperty/pages/DetailPropertyPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/*  <Route path="/" element={<HomePage />} /> */}
        <Route path="/OwnershipsPage" element={<OwenershipsPage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        {/* <Route path="/about-us" element={<AboutUsPage />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<OwenershipsPage />} />
        <Route path="/Detalle" element={<DetailPropertyPage />} />
        {/* <Route path="/about-us" element={<AboutUsPage />} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
