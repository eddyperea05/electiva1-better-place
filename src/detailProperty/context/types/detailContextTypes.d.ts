import type { property } from "../../../ownerships/components/types/ownershipsPropertiesTypes";

export interface DetailContextData {
    data: property;
    setData: React.Dispatch<React.SetStateAction<property>>;
}