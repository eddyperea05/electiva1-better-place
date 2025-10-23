//imports de iconos
import { FaStar, FaStarHalf } from "react-icons/fa";

export const StarsComponent = ({ amoutStarts }: { amoutStarts: number }) => {
  return (
    <>
      {/* para validar si mostramos una estrella y media o no 
      verificamos si el Numbero es entero o no */}
      {Number.isInteger(amoutStarts) ? (
        <div className="flex items-center">
          {/* creamos un array apartir de la cantidad de estrellas */}
          {Array.from({ length: amoutStarts }).map((_, index) => (
            <FaStar key={index} className="mr-1 text-xl text-[#2A1EFA]" />
          ))}
          <p className="text-gray-500">{amoutStarts}</p>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="flex">
            {/* hacemos lo mismo para las estrellas normales solo que siempre va redondear al número
          más bajo y le agregamos una estrella y media */}
            {Array.from({ length: Math.floor(amoutStarts) }).map((_, index) => (
              <FaStar key={index} className="mr-1 text-xl text-[#2A1EFA]" />
            ))}
            <FaStarHalf className="text-xl text-[#2A1EFA]" />
          </div>
          <p className="text-gray-500">{amoutStarts}</p>
        </div>
      )}
    </>
  );
};
