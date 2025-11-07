import * as Yup from "yup";

//Función para validar los campos del registro
export const getRegisterSchema = () =>
  Yup.object().shape({
    //Validación de los nombres
    firstName: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "Debe tener al menos 2 caracteres")
      .max(15, "El nombre no debe superar los 15 caracteres"),

    //Validación de los apellidos
    lastName: Yup.string()
      .required("El apellido es obligatorio")
      .min(2, "Debe tener al menos 2 caracteres")
      .max(15, "El apellido no debe superar los 15 caracteres"),

    //Validación del nombre de usuario
    userName: Yup.string()
      .required("El nombre de usuario es obligatorio")
      .min(4, "Debe tener al menos 4 caracteres")
      .max(15, "El nombre de usuario no debe superar los 15 caracteres"),

    //validación del correo electronico
    email: Yup.string()
      .required("El correo es obligatorio")
      .email("Formato de correo inválido")
      .test("email-parts", 'Falta el símbolo "@" o el dominio', (value) => {
        if (!value) return false;
        const parts = value.split("@");
        return parts.length === 2 && parts[1].includes(".");
      }),

    //validación del número de teléfono
    numberPhone: Yup.string()
      .matches(/^\+?\d{7,15}$/, "Formato de teléfono inválido"),

    //Validación de la contraseña
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(6, "Debe tener al menos 6 caracteres")
      .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .matches(/[0-9]/, "Debe contener al menos un número")
      .matches(/[^A-Za-z0-9]/, "Debe contener al menos un símbolo especial"),
  });
