import { useState } from "react";

//import iconos
import { FcGoogle } from "react-icons/fc";

//import react-router
import { useNavigate } from "react-router-dom";

//imports de los tipos
import type { UserDataRegister } from "../types/userDataType";

//import del context de los datos del usuario
import { userDataContext } from "../hooks/userDataContext";

//imports de la función de registro de firebase
import {
  loginUser,
  loginWithGoogle,
  registerUser,
} from "../../firebase/functions/functionsAuthFirebase";

//imports de formik
import { ErrorMessage, Field, Form, Formik } from "formik";

//imports de yup
import { getRegisterSchema } from "../schemas/registerSchema";

//imports de componentes
import { LoadingModal } from "../../ui/modals/LoadingModal";

export const RegisterPage = () => {
  /* hook para la navegacion */
  const navigate = useNavigate();

  //Contexto para enviar datos al usuario
  const { setUserData } = userDataContext();

  //Hook para saber si estan cargando los datos
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //Inicializamos los valores por defecto en un objeto
  const initialValuesUserRegister: UserDataRegister = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    numberPhone: "",
    isOwner: false,
    password: "",
  };

  //Funcion para crear un nuevo usuario en Firevase
  const handleRegister = async (value: typeof initialValuesUserRegister) => {
    setIsLoading(true);

    //Registramos el usuario con los datos ingresados al input
    const dataUserRegister = await registerUser(
      value.firstName,
      value.lastName,
      value.userName,
      value.email,
      value.numberPhone,
      value.password
    );

    //Validamos que no haya ninigún error
    if (!dataUserRegister.ok) {
      //enviamos error al desarrollador
      console.error(dataUserRegister.error);

      setIsLoading(false);

      //Retornamos un null para que no pueda seguir el flujo
      return null;
    }

    //Autenticamos el usuario de una vez
    const userLogin = await loginUser(value.email, value.password);

    //Verificamos si el usario si fue autenticado correctamente
    if (!userLogin.ok) {
      setIsLoading(false);
      console.error("No se pudo autenticar al usuario");
    }

    //Le enviamos los datos del usuario al contexto
    setUserData(userLogin.userDataGetting);

    setIsLoading(false);

    //Cuando el usuario se registra lo enviamos de nuvo al login para que haga login
    navigate("/properties");
  };

  //Función para registrar y entrar con cuenta de google
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginWithGoogle();

    if (!result.ok) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setUserData(result.userData);

    navigate("/properties");
  };

  return (
    <div className="w-100% h-full">
      <div className="flex items-center justify-center h-full">
        {/* formulario principal para el registro */}
        <Formik
          initialValues={initialValuesUserRegister}
          validationSchema={getRegisterSchema}
          onSubmit={handleRegister}
        >
          {/* Usamos el form que nos provee formik */}
          <Form>
            <div className="capitalize bg-black text-white w-100 rounded-md p-6 my-10">
              <h1 className="text-2xl">
                <strong>bienvenido a better place</strong>
              </h1>
              <h2 className="mt-2">
                La mejor aplicación para arrendar propiedades
              </h2>
              <div className="flex flex-col">
                <div className="flex mt-5 justify-between">
                  <div>
                    {/* input para los nombres */}
                    <Field
                      name="firstName"
                      className="border border-[#797979] p-2 rounded-md w-40"
                      placeholder="Nombres"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="mt-1.5 text-red-600"
                    />
                  </div>
                  <div>
                    {/* input para los apellidos */}
                    <Field
                      name="lastName"
                      className="border border-[#797979] p-2 rounded-md w-40"
                      placeholder="Apellidos"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="mt-1.5 text-red-600"
                    />
                  </div>
                </div>
                {/* input para el email */}
                <Field
                  name="email"
                  type="email"
                  className="border mt-5 border-[#797979] p-2 rounded-md"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1.5 text-red-600"
                />
                {/* input para el email */}
                <Field
                  name="userName"
                  className="border mt-5 border-[#797979] p-2 rounded-md"
                  placeholder="Nombre de usuario"
                />
                <ErrorMessage
                  name="userName"
                  component="p"
                  className="mt-1.5 text-red-600"
                />
                {/* input para el número de teléfono */}
                <Field
                  name="numberPhone"
                  className="border mt-5 border-[#797979] p-2 rounded-md"
                  placeholder="Número de teléfono"
                />
                <ErrorMessage
                  name="numberPhone"
                  component="p"
                  className="mt-1.5 text-red-600"
                />
                {/* input para la contraseña */}
                <Field
                  name="password"
                  type="password"
                  className="border mt-5 border-[#797979] p-2 rounded-md"
                  placeholder="Contraseña"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1.5 text-red-600"
                />
                {/* botón para registrar el usuario */}
                <button
                  type="submit"
                  className="capitalize w-100% bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] rounded-md py-2.5 block mt-5 cursor-pointer hover:transition-colors duration-200"
                >
                  <strong>registrarse</strong>
                </button>
                <div className="my-5">
                  {/* botón para redirigir al la vista de login */}
                  <button
                    onClick={() => navigate("/login")}
                    className="border-b cursor-pointer"
                  >
                    ¿Ya tienes una cuenta creada?
                  </button>
                </div>
                {/* botón para registrarse con google */}
                <button
                  onClick={handleGoogleLogin}
                  className="capitalize bg-white font-semibold text-black p-2 rounded-md flex items-center justify-center cursor-pointer"
                >
                  <FcGoogle className="text-[1.5 rem] mr-2" />
                  registrate con google
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        {isLoading ? <LoadingModal /> : ""}
      </div>
    </div>
  );
};
