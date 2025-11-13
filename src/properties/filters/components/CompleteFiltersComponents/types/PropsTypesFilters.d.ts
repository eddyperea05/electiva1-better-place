import type { Filter } from "../../../../context/types/PropertiesContextTypes";

export interface PropsFilters {
  handleChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  areOpenFilters: {
    amountStuffs: boolean;
  };
}

export interface PropsFiltersWithInput {
  handleChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  areOpenFilters: {
    amoutBudget: boolean;
    amoutMeters: boolean;
    typeProperties: boolean;
  };
  typeFastFilter: Filter
}