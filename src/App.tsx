import { DetailProvider } from "./detailProperty/context/DetailProvider";
import { PropertiesProvider } from "./properties/context/PropertiesProvider";
import { AppRouter } from "./router/AppRouter";
import { Navbar } from "./ui/components/Navbar";

export const App = () => {
  return (
    <>
      <DetailProvider>
        <PropertiesProvider>
          {/* <Navbar /> */}
          <AppRouter />
        </PropertiesProvider>
      </DetailProvider>
    </>
  );
};
