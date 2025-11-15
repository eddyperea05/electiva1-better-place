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
import { FaCocktail, FaSwimmingPool, FaWifi } from "react-icons/fa";
import { PiThermometerColdBold } from "react-icons/pi";
import { TbWash } from "react-icons/tb";
import { MdOutlineFastfood } from "react-icons/md";

const typeOfBenefist = [
  { benefist: "wifi", icon: FaWifi },
  { benefist: "mini bar", icon: FaCocktail },
  { benefist: "piscina", icon: FaSwimmingPool },
  { benefist: "aire acondicionado", icon: PiThermometerColdBold },
  { benefist: "lavadora", icon: TbWash },
  { benefist: "cocina", icon: MdOutlineFastfood },
];

export const DetailPropertyPage = () => {
  //hook para abrir una nueva pestaña
  const navigate = useNavigate();

  //llamada de la data desde el contexto
  const { data } = useDetailContext();

  return (
    <div className="flex flex-col justify-center md:flex-row mt-5">
      <div className="max-w-[1026px]">
        <button
          onClick={() => navigate("/properties")}
          className="ml-5 mb-5 bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] p-3 rounded-md cursor-pointer"
        >
          <FaArrowLeft className="text-white text-[1rem]" />
        </button>
        <div className="flex mb-4 md:mx-5">
          {/* renderizado de imagen de la propiedad */}
          <img
            className="max-w-[1026px] w-full h-120 rounded-sm"
            src={data.image}
            alt={`casa de ${data.lessee.name}`}
          />
        </div>
        <section className="mx-5">
          <div>
            {/* código de la propiedad */}
            <h2 className="font-semibold text-[#721EFA] text-[1.5rem]">
              {data.code}
            </h2>
            {/* nombre de la propiedad */}
            <h1 className="capitalize font-bold text-gray-700 text-[2.5rem] mb-5">
              {data.name}
            </h1>
            {/* componente para mostrar las estrellas */}
            <div className="mb-5">
              <StarsComponent amoutStarts={data.rate} />
            </div>
            {/* descripción de la propiedad */}
            <div className="mb-5">
              <h2 className="capitalize text-[2rem] font-bold text-gray-700">
                descripción
              </h2>
              <p className="text-gray-500 break-words whitespace-normal">{data.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {data.benefits.map((b) => {
                const matched = typeOfBenefist.find(
                  (item) => item.benefist === b
                );

                return (
                  <div
                    key={b}
                    className="flex items-center gap-2 capitalize outline-1 rounded-full px-3 py-2 border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  >
                    {matched && <matched.icon className="text-emerald-500" />}
                    <span>{b}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* tipo de propiedad */}
          <div className="md:hidden outline outline-gray-300 p-4 rounded-sm">
            <div className="outline outline-gray-300 py-2 px-3 inline-block rounded-full mb-5">
              <div className="flex">
                <p className="mr-2">{getPropertyIcon(data.typeProperty)}</p>
                <h3 className="capitalize text-[#721EFA]   font-semibold text-[1rem] ">
                  {data.typeProperty}
                </h3>
              </div>
            </div>
            {/* nombre del arrendador */}
            <h2 className="capitalize text-gray-600 font-semibold mb-5">{`propietario: ${data.lessee.name}`}</h2>

            {/* precio de arrendamiento por día */}
            <h2 className="capitalize text-gray-600 font-semibold mb-5">{`arrendar a partir de ${formatPrice(
              data.price
            )}`}</h2>

            {/* área de la propiedad */}
            <h4 className="capitalize text-gray-600 font-semibold mb-5">{`área de la propiedad ${data.metres}m²`}</h4>

            {/* ubicación */}
            <h4 className="capitalize text-gray-600 font-semibold mb-5">
              {data.address}
            </h4>

            {/* cantidad de habitaciones, baños y parqueaderos */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex justify-center items-center">
                <FaBed className="mr-3 text-[#BA1EFA]" />
                <h3 className="font-bold text-[#721EFA]">{data.rooms} hab.</h3>
              </div>
              <div className="flex justify-center items-center">
                <FaBath className="mr-3 text-[#BA1EFA]" />
                <h3 className="font-bold text-[#721EFA]">{data.baths} bañ.</h3>
              </div>
              <div className="flex justify-center items-center">
                <FaCar className="mr-3 text-[#BA1EFA]" />
                <h3 className="font-bold text-[#721EFA]">
                  {data.parkingLots} par.
                </h3>
              </div>
            </div>
            <PropertyLeasedSuccessModal />
          </div>
        </section>
        <section className="mx-5">
          {/* componente para agregar comentarios */}
          <AddCommentComponent codeHouse={data.code} />

          {/* componente para visualizar los componentes */}
          <CommentsComponent codeHouse={data.code} />
        </section>
      </div>

      {/* esto es muy machetero y duplica código pero por ahora fue la solución que encontre para
            que sea responsive */}
      <div className="outline outline-gray-300 hidden sticky top-0 self-start md:w-[300px] p-5 mt-16 mr-5 rounded-sm md:block shadow-lg">
        <div className="outline outline-gray-300 py-2 px-3 inline-block rounded-full mb-5">
          <div className="flex">
            <p className="mr-2">{getPropertyIcon(data.typeProperty)}</p>
            <h3 className="capitalize text-[#721EFA]   font-semibold text-[1rem] ">
              {data.typeProperty}
            </h3>
          </div>
        </div>
        {/* nombre del arrendador */}
        <h2 className="capitalize text-gray-600 font-semibold mb-5">{`propietario: ${data.lessee.name}`}</h2>

        {/* precio de arrendamiento por día */}
        <h2 className="capitalize text-gray-600 font-semibold mb-5">{`arrendar a partir de ${formatPrice(
          data.price
        )}`}</h2>

        {/* área de la propiedad */}
        <h4 className="capitalize text-gray-600 font-semibold mb-5">{`área de la propiedad ${data.metres}m²`}</h4>

        {/* ubicación */}
        <h4 className="capitalize text-gray-600 font-semibold mb-5">
          {data.address}
        </h4>

        {/* cantidad de habitaciones, baños y parqueaderos */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-center items-center">
            <FaBed className="mr-3 text-[#BA1EFA]" />
            <h3 className="font-bold text-[#721EFA]">{data.rooms} hab.</h3>
          </div>
          <div className="flex justify-center items-center">
            <FaBath className="mr-3 text-[#BA1EFA]" />
            <h3 className="font-bold text-[#721EFA]">{data.baths} bañ.</h3>
          </div>
          <div className="flex justify-center items-center">
            <FaCar className="mr-3 text-[#BA1EFA]" />
            <h3 className="font-bold text-[#721EFA]">
              {data.parkingLots} par.
            </h3>
          </div>
        </div>

        <PropertyLeasedSuccessModal />
      </div>
    </div>
  );
};
