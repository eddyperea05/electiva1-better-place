type TipoPropiedad = "oficina" | "apartamento" | "casa" | "loft" | "penthouse";
type EstadoPropiedad = "arrendada" | "libre";



//Esta cosa es posible que cambie, porque aun no se que lleva el dueno de la propiedad
interface Arrendatario {
  nombre: string;
  email: string;
  telefono: string;
}

export interface PropiedadInterface {
  nombreCasa: string;
  tipoPropiedad: TipoPropiedad;
  codigoCasa: string;
  img: string;
  precio: number;
  calificacion: number;
  metrosCuadrados: number;
  habitaciones: number;
  baños: number;
  parqueaderos: number;
  cantidadComentarios: number;
  ubicacion: string;
  descripcion: string;
  amenidades: string[];
  arrendatario: Arrendatario;
  estado: EstadoPropiedad;
}