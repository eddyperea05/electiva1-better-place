//Función para manejar los errores que provienen del login
export const handleLoginErrors = (error: string) => {
  //Error cuando el correo es invalido
  if (error === "auth/invalid-email") {
    return "El correo es invalido";
  }

  //Error cuando no se ingresa contraseña
  if (error === "auth/missing-password") {
    return "Ingrese la contraseña";
  }

  //Error cuando las credenciales son invalidas
  if (error === "auth/invalid-credential") {
    return "La contraseña es incorrecta";
  }

  //Error cuando ya hay un correo registrado
  if(error = "auth/email-already-in-use") {
    return("Este correo ya esta en uso");
  }
};
