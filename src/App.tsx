import { DetailProvider } from "./detailProperty/context/DetailProvider";
import { PropertiesProvider } from "./properties/context/PropertiesProvider";
import { AppRouter } from "./router/AppRouter";
import { Footer } from "./ui/components/Footer";
import { Navbar } from "./ui/components/Navbar";

export const App = () => {
  return (
    <>
      <DetailProvider>
        <PropertiesProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </PropertiesProvider>
      </DetailProvider>
    </>
  );
};
