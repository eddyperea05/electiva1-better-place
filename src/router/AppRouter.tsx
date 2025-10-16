import { Routes, Route } from "react-router-dom";
import { NotFound } from "../ui/components/NotFound";
import { OwenershipsPage } from "../ownerships/pages/OwnershipsPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<OwenershipsPage />} />
        {/* <Route path="/about-us" element={<AboutUsPage />} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
