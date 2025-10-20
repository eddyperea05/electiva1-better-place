import { FaCalendar } from "react-icons/fa";

export const CalendarComponent = () => {
  return (
    <>
      <button className="md:hidden fixed bottom-0 right-0 mr-5 mb-5 p-4 rounded-full bg-[#2A1EFA] hover:bg-[#261DCC] duration-150">
        <FaCalendar className="text-white text-[1.5rem]" />
      </button>
    </>
  );
};
