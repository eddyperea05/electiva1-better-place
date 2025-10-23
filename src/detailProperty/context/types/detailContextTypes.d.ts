import type { property } from "../../../properties/components/types/ownershipsPropertiesTypes";
import type { PropiedadInterface } from "../../../properties/types/propertyType";

export interface DetailContextData {
    data: PropiedadInterface;
    setData: React.Dispatch<React.SetStateAction<PropiedadInterface>>;
}