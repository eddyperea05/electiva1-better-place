import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  /* hook para la navegacion */
  const navigate = useNavigate();

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
                name="email"
                className="border-1 mt-5 border-[#797979] p-2 rounded-md"
                type="email"
                placeholder="Email"
              />
              {/* input para la contraseña */}
              <input
                name="password"
                className="border-1 mt-5 border-[#797979] p-2 rounded-md"
                type="password"
                placeholder="contraseña"
              />
              {/* bóton para iniciar sección */}
              <button
                onClick={() => navigate("/")}
                className="capitalize w-100% bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] rounded-md py-2.5 block mt-5 cursor-pointer hover:transition-colors duration-200"
              >
                <strong>iniciar sección</strong>
              </button>
              <div className="my-5">
                {/* botón para redirigir al registro */}
                <button
                  onClick={() => navigate("/register")}
                  className="capitalize border-b-1 cursor-pointer"
                >
                  ¿aun no tienes cuentas?
                </button>
              </div>
              <hr />
              {/* botón para iniciar sección con Google */}
              <button className="mt-5 p-2 font-semibold bg-white text-black rounded-md flex items-center justify-center cursor-pointer">
                <FcGoogle className="text-[1.5 rem] mr-2" />
                Login with Google
              </button>
              {/* botón para reestablecer la contraseña */}
              <button className="text-center mt-2 cursor-pointer">
                Do you forget your password?
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
