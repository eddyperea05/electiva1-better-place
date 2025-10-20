import { DetailProvider } from "./detailProperty/context/DetailProvider";
import { AppRouter } from "./router/AppRouter";
import { Navbar } from "./ui/components/Navbar";

export const EventsApp = () => {
  return (
    <>
      <DetailProvider>
        {/* <Navbar /> */}
        <AppRouter />
      </DetailProvider>
    </>
  );
};
