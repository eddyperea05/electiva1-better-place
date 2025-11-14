//Imports de react-router
import { Route, Routes } from "react-router-dom";

//Imports de componentes
import { Navbar } from "../ui/components/Navbar";
import { PropertiesPage } from "../properties/pages/PropertiesPage";
import { AboutUsPage } from "../aboutUS/page/AboutUsPage";
import { DetailPropertyPage } from "../detailProperty/pages/DetailPropertyPage";
import { MyLeasesPage } from "../myLeases/pages/MyLeasesPage";
import { MyProperties } from "../ownerships/pages/MyProperties";
import { PropertyDetailPage } from "../ownerships/pages/PropertyDetailPage";
import { NotFound } from "../ui/components/NotFound";
import { Footer } from "../ui/components/Footer";
import { PrivatePolicityMyLessesRouter } from "./PrivatePolicityMyLessesRouter";

export const GeneralRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/properties" element={<PropertiesPage />} />
        {/* Con esta ruta me aseguro de que si el propietario no es propietario 
        no pueda acceder a la ruta */}
        <Route
          path="/myLessee"
          element={
            <PrivatePolicityMyLessesRouter>
              <MyLeasesPage />
            </PrivatePolicityMyLessesRouter>
          }
        />
        <Route path="/myProperties" element={<MyProperties />} />
        <Route path="/detail" element={<DetailPropertyPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/propietario/:id" element={<PropertyDetailPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
