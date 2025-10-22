//imports componentes
import { CompleteFilterComponent } from "./components/CompleteFilterComponent";
import { FastFilterComponent } from "./components/FastFilterComponent";

export const Filters = () => {
  return (
    <div className="flex flex-col justify-center items-center md:items-start md:flex-row md:flex-wrap mx-7 md:mx-0 md:w-80 md:h-full">
      <div className="flex relative md:static justify-between mx-5 my-7 w-full md:flex-col">
        {/* filtros rápidos */}
        <FastFilterComponent />

        {/* filtros detallados */}
        <CompleteFilterComponent />
      </div>
    </div>
  );
};
