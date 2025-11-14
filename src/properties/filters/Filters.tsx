//imports componentes
import { CompleteFilterComponent } from "./components/CompleteFilterComponent";
import { FastFilterComponent } from "./components/FastFilterComponent";

export const Filters = () => {
  return (
    <div className="flex py-5 flex-col justify-center items-center md:items-start md:flex-row md:flex-wrap mx-7 md:mx-0 md:w-80 md:h-full z-80">
      <div className="flex relative mx-5 w-full md:flex-col md:h-full md:static">
        {/* filtros rápidos */}
        <FastFilterComponent />

        {/* filtros detallados */}
        <CompleteFilterComponent />
      </div>
    </div>
  );
};
