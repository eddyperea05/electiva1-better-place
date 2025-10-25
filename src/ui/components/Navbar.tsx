import { Link, NavLink, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../properties/filters/hooks/useWindowSize";

import { IoIosMenu } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();

  const { width } = useWindowSize();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //Función para mostrar la el modal de los filtros
  const handleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  return (
    <>
      <nav className="flex relative items-center justify-between bg-black h-18 px-5 shadow-lg">
        {/* logo del better place */}
        <Link to="/" className="uppercase bg-gradient-to-r from-[#2A1EFA] to-[#BA1EFA] text-transparent bg-clip-text inline-block font-bold text-2xl">
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
                <li className="border-b border-white pb-1 mb-3 md:border-none md:p-0 md:mb-0">
                  <NavLink
                    to="/MyLeases"
                    className="capitalize font-semibold text-white"
                  >
                    mis arrendamientos
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
              </ul>
              <div className="flex items-center justify-center w-full md:hidden md:p-0 md:mb-0">
                <button onClick={handleModal}>
                  <IoIosArrowUp className="text-white text-3xl" />
                </button>
              </div>
            </div>
          </>
        )}

        {width > 768 && (
          <>
            {/* contenedor para los botones de inicio de sección */}
            <div>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="capitalize cursor-pointer font-bold bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white rounded-sme py-2 px-4 trans hover:scale-105 transition-transform duration-200 rounded-sm"
              >
                inicia sección
              </button>
            </div>
          </>
        )}
      </nav>
    </>
  );
};
