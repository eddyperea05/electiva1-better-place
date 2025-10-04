import { Routes, Route } from "react-router-dom";
import { HomePage } from "../events/pages/HomePage";
import { AboutUsPage } from "../events/pages/AboutUsPage";
import { EventsPage } from "../events/pages/EventsPage";
import { NotFound } from "../ui/components/NotFound";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
