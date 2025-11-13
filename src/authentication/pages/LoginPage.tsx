import { useState } from "react";

//imports de iconos
import { FcGoogle } from "react-icons/fc";

//imports de react-router
import { useNavigate } from "react-router-dom";

//imports de tipos
import type { UserDataLogin } from "../types/userDataType";

import {
  loginUser,
  loginWithGoogle,
} from "../../firebase/functions/functionsAuthFirebase";
import { userDataContext } from "../hooks/userDataContext";
import { handleLoginErrors } from "../errors/errorsValidations";
import { LoadingModal } from "../../ui/modals/LoadingModal";

export const LoginPage = () => {
  /* hook para la navegacion */
  const navigate = useNavigate();

  //Se envia el los datos del usuario
  const { setUserData } = userDataContext();

  //Hook para el login del usuario
  const [userDataLogin, setUserDataLogin] = useState<UserDataLogin>({
    email: "",
    password: "",
  });

  //Hook para manejar los errores que provienen del firebase
  const [errorsLogin, setErrorsLogin] = useState<String | undefined>("");

  //Hook para saber si estan cargando los datos
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //Función para capturar el valor y el nombre del campo
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataLogin((prevdata) => ({
      ...prevdata,
      [name]: value.trim(),
    }));
  };

  //Función para ingresar con firebase
  const handleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //Función para evitar la recarga del navegador
    e.preventDefault();

    setIsLoading(true);

    //Usamos la función para validar el logeo del usuario
    const dataUser = await loginUser(
      userDataLogin.email,
      userDataLogin.password
    );

    //Validamos que no haya ninigún error
    if (!dataUser.ok) {
      //Enviamos un el tipo de error y lo imprimimos en el formulario
      const error = handleLoginErrors(dataUser.error);
      setErrorsLogin(error);

      setIsLoading(false);

      return false;
    }

    //Enviamos los datos al contexto
    setUserData(dataUser.userDataGetting);

    setIsLoading(false);

    //redireción a propiedades
    navigate("/properties");
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginWithGoogle();

    if (!result.ok) {
      setIsLoading(false);
      const error = handleLoginErrors(result.error);
      setErrorsLogin(error);
      return;
    }

    setIsLoading(false);
    setUserData(result.userData);
    navigate("/properties");
  };

  return (
    <div className="w-100% h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        {/* formulario principal para el login */}
        <form>
          <div className="bg-black text-white w-100 rounded-md p-6 shadow-xl">
            <h1 className="capitalize text-2xl">
              <strong>bienvenido a better place</strong>
            </h1>
            <h2 className="mt-2">
              La mejor aplicación para arrendar propiedades
            </h2>
            <div className="flex flex-col">
              {/* input para el email */}
              <input
                onChange={onChangeLogin}
                name="email"
                className="border mt-5 border-[#797979] p-2 rounded-md"
                type="email"
                placeholder="Email"
              />
              {/* input para la contraseña */}
              <input
                onChange={onChangeLogin}
                name="password"
                className="border mt-5 border-[#797979] p-2 rounded-md"
                type="password"
                placeholder="contraseña"
              />

              {/* Imprimimos el error si no esta vació */}
              {errorsLogin && (
                <div className="w-full flex items-center justify-center bg-red-900 mt-6 py-2 rounded-sm">
                  <span className="text-red-400">{errorsLogin}</span>
                </div>
              )}

              {/* bóton para iniciar sección */}
              <button
                onClick={handleAuth}
                className="capitalize w-100% bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] rounded-md py-2.5 mt-5 block cursor-pointer hover:transition-colors duration-200"
              >
                <strong>iniciar sección</strong>
              </button>
              <div className="my-5">
                {/* botón para redirigir al registro */}
                <button
                  onClick={() => navigate("/register")}
                  className="capitalize border-b cursor-pointer"
                >
                  ¿aun no tienes cuentas?
                </button>
              </div>
              <hr />
              {/* botón para iniciar sección con Google */}
              <button
                onClick={handleGoogleLogin}
                className="capitalize mt-5 p-2 font-semibold bg-white text-black rounded-md flex items-center justify-center cursor-pointer"
              >
                <FcGoogle className="text-[1.5 rem] mr-2" />
                ingresa con google
              </button>
              {/* botón para reestablecer la contraseña */}
              <button className="capitalize text-center mt-2 cursor-pointer">
                ¿olvidastes tú contraseña?
              </button>
            </div>
          </div>
        </form>
        {isLoading ? <LoadingModal /> : ""}
      </div>
    </div>
  );
};
