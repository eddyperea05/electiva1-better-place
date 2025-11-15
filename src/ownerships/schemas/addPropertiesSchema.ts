import * as Yup from "yup";

//Función para validar los campos del registro
export const getAddPropertySchema = () =>
  Yup.object().shape({
    //Validación del nombre
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "Debe tener al menos 2 caracteres")
      .max(30, "El nombre no debe superar los 30 caracteres"),

    //Validación de la dirección
    address: Yup.string()
      .required("La dirección es obligatorio")
      .min(5, "Debe tener al menos 5 caracteres")
      .max(50, "La dirección no debe superar los 50 caracteres"),

    //Validación del la descripción
    description: Yup.string()
      .required("La descripción es obligatorio")
      .min(200, "Debe tener al menos 200 caracteres")
      .max(500, "La descripción no debe superar los 500 caracteres"),

    //validación de la cantidad de habitaciones
    rooms: Yup.number()
      .required("Las habitaciones son obligatorias")
      .min(1, "Las habitaciones deben de ser minimo 1"),

    metres: Yup.number()
      .required("Los metros son obligatorios")
      .min(10, "los metros cuadrados deben de ser minimo 10"),

    price: Yup.number()
      .required("El precio es obligatorio")
      .min(100000, "el precio minimo por dia es de 100.000")
      .max(2000000, "el precio maximo por propiedad es de 2'000.000"),

    image: Yup.mixed<File>()
      .required("Debes subir una imagen")
      .test("fileType", "Formato no soportado", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      })
      .test("fileSize", "La imagen es muy pesada", (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024;
      }),
  });
