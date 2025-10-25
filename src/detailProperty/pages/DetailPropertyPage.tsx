//import de componentes
import { FaBed, FaBath, FaCar, FaArrowLeft } from "react-icons/fa6";

//import del contexto de los datos de la propiedad
import { useDetailContext } from "../hooks/useDataContext";

//import de los componentes
import { AddCommentComponent } from "../components/AddCommentComponent";
import { CommentsComponent } from "../components/CommentsComponent";
import { StarsComponent } from "../components/StarsComponent";

//import react router
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { getPropertyIcon } from "../../utils/getPropertyIcon";
import { PropertyLeasedSuccessModal } from "../../ui/modals/propertyLeasedSuccessModal";

export const DetailPropertyPage = () => {
  //hook para abrir una nueva pestaña
  const navigate = useNavigate();

  //llamada de la data desde el contexto
  const { data } = useDetailContext();

  return (
    <div className="flex flex-col md:flex-row mt-5">
      <div className="max-w-[1026px]">
        <button
          onClick={() => navigate("/")}
          className="ml-5 mb-5 bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] p-3 rounded-md cursor-pointer"
        >
          <FaArrowLeft className="text-white text-[1rem]" />
        </button>
        <div className="flex mb-4 md:mx-5">
          {/* renderizado de imagen de la propiedad */}
          <img
            className="max-w-[1026px] w-full h-120 rounded-sm"
            src={data.img}
            alt={`casa de ${data.arrendatario}`}
          />
        </div>
        <section className="mx-5">
          <div>
            {/* código de la propiedad */}
            <h2 className="font-semibold text-[#721EFA] text-[1.5rem]">
              {data.codigoCasa}
            </h2>
            {/* nombre de la propiedad */}
            <h1 className="capitalize font-bold text-gray-700 text-[2.5rem] mb-5">
              {data.nombreCasa}
            </h1>
            {/* componente para mostrar las estrellas */}
            <div className="mb-5">
              <StarsComponent amoutStarts={data.calificacion} />
            </div>
            {/* descripción de la propiedad */}
            <div className="mb-5">
              <h2 className="capitalize text-[2rem] font-bold text-gray-700">
                descripción
              </h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
                explicabo nesciunt. Officia fugit aliquid corporis ullam
                veritatis! Quos placeat omnis molestias, itaque officiis
                voluptatibus inventore maxime repellat sapiente voluptatem
                minima.
              </p>
            </div>
          </div>
          {/* tipo de propiedad */}
          <div className="md:hidden outline outline-gray-300 p-4 rounded-sm">
            <div className="outline outline-gray-300 py-2 px-3 inline-block rounded-full mb-5">
              <div className="flex">
                <p className="mr-2">{getPropertyIcon(data.tipoPropiedad)}</p>
                <h3 className="capitalize text-[#721EFA]   font-semibold text-[1rem] ">
                  {data.tipoPropiedad}
                </h3>
              </div>
            </div>
            {/* nombre del arrendador */}
            <h2 className="capitalize text-gray-600 font-semibold mb-5">{`propietario: ${data.arrendatario.nombre}`}</h2>

            {/* precio de arrendamiento por día */}
            <h2 className="capitalize text-gray-600 font-semibold mb-5">{`arrendar a partir de ${formatPrice(
              data.precio
            )}`}</h2>

            {/* área de la propiedad */}
            <h4 className="capitalize text-gray-600 font-semibold mb-5">{`área de la propiedad ${data.metrosCuadrados}m²`}</h4>

            {/* ubicación */}
            <h4 className="capitalize text-gray-600 font-semibold mb-5">
              {data.ubicacion}
            </h4>

            {/* cantidad de habitaciones, baños y parqueaderos */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex justify-center items-center">
                <FaBed className="mr-3 text-[#BA1EFA]" />
                <h3 className="font-bold text-[#721EFA]">
                  {data.habitaciones} hab.
                </h3>
              </div>
              <div className="flex justify-center items-center">
                <FaBath className="mr-3 text-[#BA1EFA]" />
                <h3 className="font-bold text-[#721EFA]">{data.baños} bañ.</h3>
              </div>
              <div className="flex justify-center items-center">
                <FaCar className="mr-3 text-[#BA1EFA]" />
                <h3 className="font-bold text-[#721EFA]">
                  {data.parqueaderos} par.
                </h3>
              </div>
            </div>
            <PropertyLeasedSuccessModal />
          </div>
        </section>
        <section className="mx-5">
          {/* componente para agregar comentarios */}
          <AddCommentComponent codeHouse={data.codigoCasa} />

          {/* componente para visualizar los componentes */}
          <CommentsComponent codeHouse={data.codigoCasa} />
        </section>
      </div>

      {/* esto es muy machetero y duplica código pero por ahora fue la solución que encontre para
            que sea responsive */}
      <div className="outline outline-gray-300 hidden sticky top-0 self-start md:w-[300px] p-5 mt-16 mr-5 rounded-sm md:block shadow-lg">
        <div className="outline outline-gray-300 py-2 px-3 inline-block rounded-full mb-5">
          <div className="flex">
            <p className="mr-2">{getPropertyIcon(data.tipoPropiedad)}</p>
            <h3 className="capitalize text-[#721EFA]   font-semibold text-[1rem] ">
              {data.tipoPropiedad}
            </h3>
          </div>
        </div>
        {/* nombre del arrendador */}
        <h2 className="capitalize text-gray-600 font-semibold mb-5">{`propietario: ${data.arrendatario.nombre}`}</h2>

        {/* precio de arrendamiento por día */}
        <h2 className="capitalize text-gray-600 font-semibold mb-5">{`arrendar a partir de ${formatPrice(
          data.precio
        )}`}</h2>

        {/* área de la propiedad */}
        <h4 className="capitalize text-gray-600 font-semibold mb-5">{`área de la propiedad ${data.metrosCuadrados}m²`}</h4>

        {/* ubicación */}
        <h4 className="capitalize text-gray-600 font-semibold mb-5">
          {data.ubicacion}
        </h4>

        {/* cantidad de habitaciones, baños y parqueaderos */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-center items-center">
            <FaBed className="mr-3 text-[#BA1EFA]" />
            <h3 className="font-bold text-[#721EFA]">
              {data.habitaciones} hab.
            </h3>
          </div>
          <div className="flex justify-center items-center">
            <FaBath className="mr-3 text-[#BA1EFA]" />
            <h3 className="font-bold text-[#721EFA]">{data.baños} bañ.</h3>
          </div>
          <div className="flex justify-center items-center">
            <FaCar className="mr-3 text-[#BA1EFA]" />
            <h3 className="font-bold text-[#721EFA]">
              {data.parqueaderos} par.
            </h3>
          </div>
        </div>

        <PropertyLeasedSuccessModal />
      </div>
    </div>
  );
};
