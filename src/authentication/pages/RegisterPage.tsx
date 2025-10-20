import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  /* hook para la navegacion */
  const navigate = useNavigate();

  return (
    <div className="w-100% h-full">
      <div className="flex items-center justify-center h-full">
        {/* formulario principal para el registro */}
        <form>
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
                  <input
                    name="firstName"
                    className="border-1 border-[#797979] p-2 rounded-md w-40"
                    type="text"
                    placeholder="Nombres"
                  />
                </div>
                <div>
                    {/* input para los apellidos */}
                  <input
                    name="lastName"
                    className="border-1 border-[#797979] p-2 rounded-md w-40"
                    type="text"
                    placeholder="Apellidos"
                  />
                </div>
              </div>
              {/* input para el email */}
              <input
                name="email"
                className="border-1 mt-5 border-[#797979] p-2 rounded-md"
                type="email"
                placeholder="Email"
              />
              {/* input para el número de teléfono */}
              <input
                name="numberPhone"
                className="border-1 mt-5 border-[#797979] p-2 rounded-md"
                type="text"
                placeholder="Número de teléfono"
              />
              {/* input para la contraseña */}
              <input
                name="password"
                className="border-1 mt-5 border-[#797979] p-2 rounded-md"
                type="password"
                placeholder="Contraseña"
              />
              {/* botón para registrar el usuario */}
              <button
                type="submit"
                onClick={() => navigate("/")}
                className="capitalize w-100% bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] rounded-md py-2.5 block mt-5 cursor-pointer hover:transition-colors duration-200"
              >
                <strong>registrarse</strong>
              </button>
              <div className="my-5">
                {/* botón para redirigir al la vista de login */}
                <button
                  onClick={() => navigate("/")}
                  className="border-b-1 cursor-pointer"
                >
                  ¿Ya tienes una cuenta creada?
                </button>
              </div>
              {/* botón para registrarse con google */}
              <button className="capitalize bg-white font-semibold text-black p-2 rounded-md flex items-center justify-center cursor-pointer">
                <FcGoogle className="text-[1.5 rem] mr-2" />
                registrate con google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
