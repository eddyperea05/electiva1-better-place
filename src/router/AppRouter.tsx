import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
import { PropertiesPage } from "../properties/pages/PropertiesPage";
import { LoginPage } from "../authentication/pages/LoginPage";
import { RegisterPage } from "../authentication/pages/RegisterPage";
import { DetailPropertyPage } from "../detailProperty/pages/DetailPropertyPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PropertiesPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/Detalle" element={<DetailPropertyPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
