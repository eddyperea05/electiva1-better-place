type typeProperty = "oficina" | "apartamento" | "casa" | "finca";
type status = "arrendada" | "libre";

//Esta cosa es posible que cambie, porque aun no se que lleva el dueno de la propiedad
interface lessee {
  id: string;
  name: string;
  email: string | null;
  phone: string;
}

export interface PropiedadInterface {
  id?: string | undefined;
  name: string;
  typeProperty: typeProperty;
  code: string;
  image: string;
  price: number;
  rate: number;
  rateCount: number
  metres: number;
  rooms: number;
  baths: number;
  parkingLots: number;
  publicationDate: Date | null;
  address: string;
  description: string;
  benefits: string[];
  lessee: lessee;
  status: status;
}