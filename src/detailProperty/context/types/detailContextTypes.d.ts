import type { property } from "../../../properties/components/types/ownershipsPropertiesTypes";

export interface DetailContextData {
    data: property;
    setData: React.Dispatch<React.SetStateAction<property>>;
}