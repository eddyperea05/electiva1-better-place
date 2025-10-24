import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
/* import { HomePage } from "../ownerships/pages/HomePage"; */
import { PropertiesPage } from "../properties/pages/PropertiesPage";
import { AboutUsPage } from "../aboutUS/page/AboutUsPage";
import { DetailPropertyPage } from "../detailProperty/pages/DetailPropertyPage";
import { LoginPage } from "../authentication/pages/LoginPage";
import { RegisterPage } from "../authentication/pages/RegisterPage";
import { MyLeasesPage } from "../myLeases/pages/MyLeasesPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/MyLeases" element={<MyLeasesPage />} />
        <Route path="/Detail" element={<DetailPropertyPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
