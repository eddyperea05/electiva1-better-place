//Con este tipo vamos a poder aplicar varios filtros a la vez
type Filter = {
  typeProperties?: string[];
  sortBy?: string;
  amountStuffs: {
    habitaciones: number | string;
    baños: number | string;
    parqueaderos: number | string;
  };
  budgetRange?: {
    min?: number;
    max?: number;
  };
  metersRange?: {
    min?: number;
    max?: number;
  };
};
export interface FilterInterface {
  typeFastFilter: Filter;
  setFastFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
