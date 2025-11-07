import { useState } from "react";

//imports de react-router
import { Link, NavLink, useNavigate } from "react-router-dom";

//imports de hooks
import { useWindowSize } from "../../properties/filters/hooks/useWindowSize";

//imports de iconos
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { userDataContext } from "../../authentication/hooks/userDataContext";

//Imports de componentes
import { PerfilForm } from "../forms/PerfilForm";
import {
  handleLogOutUser,
} from "../../firebase/functions/functionsFirebase";
export const Navbar = () => {

  const navigate = useNavigate();

  //Hook para saber el tamaño de la ventana
  const { width } = useWindowSize();

  //contexto de los datos del usuario
  const { userData } = userDataContext();

  //Hook para saber si se abrio el menu
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //Función para mostrar la el modal de los filtros
  const handleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  //Función para cerrar seción
  const handleLogOut = async () => {
    navigate("/login");
    await handleLogOutUser();
  };

  return (
    <>
      <nav className="flex relative items-center justify-between bg-black h-18 px-5 shadow-lg">
        {/* logo del better place */}
        <Link
          to="/"
          className="uppercase bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-transparent bg-clip-text inline-block font-bold text-2xl"
        >
          better place
        </Link>

        {/* componente para el estilo movil */}
        {width < 768 && (
          <button
            onClick={handleModal}
            className="p-2 bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] rounded-md"
          >
            <IoIosMenu className="text-white text-3xl" />
          </button>
        )}

        {/* componente para el estilo en escritorio */}
        {(isModalOpen || width > 768) && (
          <>
            <div className="absolute top-17 left-0 right-0 bg-black px-5 py-5 z-20 md:static md:bg-none md:py-0 md:px-0">
              <ul className="md:flex md:justify-center md:items-center md:gap-9">
                <li className="flex justify-between pb-1 mb-3 md:border-none md:p-0 md:mb-0 md:order-6">
                  <PerfilForm />
                </li>
                <li className="border-b border-white pb-1 mb-3 md:border-none md:p-0 md:mb-0">
                  <NavLink
                    to="/"
                    className="capitalize font-semibold text-white"
                  >
                    home
                  </NavLink>
                </li>
                <li className="border-b border-white pb-1 mb-3 md:border-none md:p-0 md:mb-0">
                  <NavLink
                    to="/properties"
                    className="capitalize font-semibold text-white"
                  >
                    propiedades
                  </NavLink>
                </li>
                {userData.isOwner && (
                  <li className="border-b border-white pb-1 mb-3 md:border-none md:p-0 md:mb-0">
                    <NavLink
                      to="/MyLeases"
                      className="capitalize font-semibold text-white"
                    >
                      mis arrendamientos
                    </NavLink>
                  </li>
                )}
                <li className="border-b border-white pb-1 mb-3 md:border-none md:p-0 md:mb-0">
                  <NavLink
                    to="/myProperties"
                    className="capitalize font-semibold text-white"
                  >
                    mis propiedades
                  </NavLink>
                </li>
                <li className="border-b border-white pb-1 mb-3 md:border-none md:p-0 md:mb-0">
                  <NavLink
                    to="/about-us"
                    className="capitalize font-semibold text-white"
                  >
                    acerca de nosotros
                  </NavLink>
                </li>
                <li
                  onClick={handleLogOut}
                  className="capitalize font-bold cursor-pointer text-[#2A1EFA] md:order-7"
                >
                  log-out
                </li>
              </ul>
              <div className="flex items-center justify-center w-full md:hidden md:p-0 md:mb-0">
                <button onClick={handleModal}>
                  <IoIosArrowUp className="text-white text-3xl" />
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};
