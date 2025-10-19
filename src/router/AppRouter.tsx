import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
import { OwenershipsPage } from "../ownerships/pages/OwnershipsPage";
import { DetailPropertyPage } from "../detailProperty/pages/DetailPropertyPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<OwenershipsPage />} />
        <Route path="/Detalle" element={<DetailPropertyPage />} />
        {/* <Route path="/about-us" element={<AboutUsPage />} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
