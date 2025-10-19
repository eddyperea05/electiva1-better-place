//import iconos
import {
  FaCube,
  FaBed,
  FaBath,
  FaCarRear,
  FaRegStar,
  FaComment,
} from "react-icons/fa6";

//Import imagenes
import casa from "../../assets/images/casa_mickey_mouse.webp";

//import del useNavigate
import { useNavigate } from "react-router-dom";

//import del contexto del detalle
import { useDetailContext } from "../../detailProperty/hooks/useDataContext";

//import de los tipos
import type { property } from "./types/ownershipsPropertiesTypes";


export const CardPropertyComponent = ({ property }: { property: property }) => {

  //navigate para ir al detalle de la propiedad
  const navigate = useNavigate();

  //llamado al conexto del detalle
  const { setData } = useDetailContext();

  //Función para enviar los datos al detalle de las propiedades
  const handleClickDetail = () => {
    setData({...property});
    navigate("/Detalle");
  };

  return (
    <div className="w-80 outline-1 outline-black p-5 rounded-md my-4">
      <div className="flex justify-between mb-3">
        {/* nombre de la propiedad */}
        <h2 className="font-bold capitalize">{property.nombreCasa}</h2>
        {/* código de la casa */}
        <p className="font-bold uppercase">{property.codigoCasa}</p>
      </div>
      <img
        className="rounded-md mb-3"
        src={casa}
        alt={`casa de ${property.nombreArrendador}`}
      />
      <div className="flex justify-between mb-2">
        {/* arrendador */}
        <h3 className="font-semibold">{property.nombreArrendador}</h3>
        {/* precio */}
        <p className="font-semibold">
          ${new Intl.NumberFormat("es-CO").format(property.precio)}
        </p>
      </div>
      <div className="flex justify-between mb-3">
        {/* tipo de propiedad */}
        <h3 className="capitalize font-semibold">{property.tipoPropiedad}</h3>
        {/* cantidad de metros cuadrados */}
        <div className="flex justify-center items-center">
          <FaCube className="mr-1" />
          <p>
            {new Intl.NumberFormat("es-CO").format(property.metrosCuadrados)}
            m²
          </p>
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div className="flex">
          <FaRegStar size={20} className="mr-1" />
          <FaRegStar size={20} className="mr-1" />
          <FaRegStar size={20} className="mr-1" />
          <FaRegStar size={20} className="mr-1" />
          <FaRegStar size={20} className="mr-1" />
        </div>
        {/* cantidad de comentarios */}
        <div className="flex items-center justify-center">
          <FaComment size={20} className="mr-1" />
          <p>{property.cantidadComentarios}</p>
        </div>
      </div>
      {/* cantidad de metros cuadrados */}
      <div className="flex justify-between mb-3">
        {/* cantidad de habitaciones */}
        <div className="flex justify-center items-center">
          <FaBed className="mr-1" />
          <p>{property.habitaciones} hab.</p>
        </div>
        {/* cantidad de baños */}
        <div className="flex justify-center items-center">
          <FaBath className="mr-1" />
          <p>{property.baños} bañ.</p>
        </div>
        {/* cantidad de parqueaderos */}
        <div className="flex justify-center items-center">
          <FaCarRear className="mr-1" />
          <p>{property.parqueaderos} par.</p>
        </div>
      </div>
      <button
        onClick={handleClickDetail}
        className="w-full uppercase font-bold bg-blue-700 duration-150 hover:bg-blue-900 text-white px-5 py-2 rounded-sm cursor-pointer"
      >
        arrendar propiedad
      </button>
    </div>
  );
};
