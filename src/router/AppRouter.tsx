//imports react-router
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../ownerships/pages/HomePage";

//Imports componentes
import { RegisterPage } from "../authentication/pages/RegisterPage";
import { LoginPage } from "../authentication/pages/LoginPage";
import { GeneralRoutes } from "./GeneralRoutes";
import { PrivatePolicityRouter } from "./PrivatePolicityRouter";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route
          path="*"
          element={
            <PrivatePolicityRouter>
              <GeneralRoutes />
            </PrivatePolicityRouter>
          }
        />
      </Routes>
    </>
  );
};
