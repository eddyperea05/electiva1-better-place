type typeProperty = "oficina" | "apartamento" | "casa" | "finca";
type status = "arrendada" | "libre";

//Esta cosa es posible que cambie, porque aun no se que lleva el dueno de la propiedad
interface lessee {
  name: string;
  email: string;
  phone: string;
}

export interface PropiedadInterface {
  name: string;
  typeProperty: typeProperty;
  code: string;
  image: string;
  price: number;
  rate: number;
  metres: number;
  rooms: number;
  baths: number;
  parkingLots: number;
  publicationDate: Date;
  address: string;
  descripcion: string;
  benefits: string[];
  lessee: lessee;
  status: status;
}