import { UserProvider } from "./authentication/context/UserProvider";
import { DetailProvider } from "./detailProperty/context/DetailProvider";
import { PropertiesProvider } from "./properties/context/PropertiesProvider";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <>
      <DetailProvider>
        <PropertiesProvider>
          <UserProvider>
            <AppRouter />
          </UserProvider>
        </PropertiesProvider>
      </DetailProvider>
    </>
  );
};
