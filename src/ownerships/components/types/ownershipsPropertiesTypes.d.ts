export type typeproperty = "casa" | "apartamento" | "oficina" | "finca";

export interface property {
  nombreCasa: string;
  tipoPropiedad: typeproperty;
  codigoCasa: string;
  img: string;
  nombreArrendador: string;
  precio: number;
  calificacion: number;
  metrosCuadrados: number;
  habitaciones: number;
  baños: number;
  parqueaderos: number;
  cantidadComentarios: number;
  fechaPublicacion: Date;
}
