import { AppRouter } from "./router/AppRouter";
import { Navbar } from "./ui/components/Navbar";

export const EventsApp = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};
