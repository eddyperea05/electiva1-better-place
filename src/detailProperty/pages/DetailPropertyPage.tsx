//import de componentes
import { FaBed, FaBath, FaCar, FaArrowLeft } from "react-icons/fa6";

//import de la imagen de la propiedad
import casa from "../../assets/images/casa_mickey_mouse.webp";

//import del contexto de los datos de la propiedad
import { useDetailContext } from "../hooks/useDataContext";

//import de los componentes
import { AddCommentComponent } from "../components/AddCommentComponent";
import { CommentsComponent } from "../components/CommentsComponent";
import { StarsComponent } from "../../components/StarsComponent";
import { CalendarComponent } from "../components/CalendarComponent";

//import react router
import { useNavigate } from "react-router-dom";

export const DetailPropertyPage = () => {
  const navigate = useNavigate();

  //llamada de la data desde el contexto
  const { data } = useDetailContext();

  return (
    <div className="flex flex-col md:flex-row mt-5">
      <div className="max-w-[1026px]">
        <button
          onClick={() => navigate("/")}
          className="ml-5 mb-5 bg-[#2A1EFA] p-3 rounded-md hover:bg-[#261DCC] duration-150 cursor-pointer"
        >
          <FaArrowLeft className="text-white text-[1rem]" />
        </button>
        <div className="flex mb-4 md:mx-5">
          {/* renderizado de imagen de la propiedad */}
          <img
            className="max-w-[1026px] w-full rounded-sm"
            src={casa}
            alt={`casa de ${data.nombreArrendador}`}
          />
        </div>
        <section className="mx-5">
          <div>
            {/* código de la propiedad */}
            <h2 className="font-semibold text-[1.5rem]">{data.codigoCasa}</h2>
            {/* nombre de la propiedad */}
            <h1 className="capitalize font-bold text-[2.5rem] mb-5">
              {data.nombreCasa}
            </h1>
            {/* componente para mostrar las estrellas */}
            <div className="mb-5">
              <StarsComponent amoutStarts={data.calificacion} />
            </div>
            {/* descripción de la propiedad */}
            <div className="mb-5">
              <h2 className="capitalize text-[2rem] font-bold">descripción</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
                explicabo nesciunt. Officia fugit aliquid corporis ullam
                veritatis! Quos placeat omnis molestias, itaque officiis
                voluptatibus inventore maxime repellat sapiente voluptatem
                minima.
              </p>
            </div>
          </div>
          {/* tipo de propiedad */}
          <div className="md:hidden">
            <div className="mb-5">
              <h3 className="capitalize outline-1 outline-black inline-block py-2 px-3 rounded-full font-semibold text-[1rem] ">
                {data.tipoPropiedad}
              </h3>
            </div>
            {/* nombre del arrendador */}
            <h2 className="capitalize font-semibold mb-3">{`propietario: ${data.nombreArrendador}`}</h2>

            {/* precio de arrendamiento por día */}
            <h2 className="capitalize font-semibold mb-3">{`arrendar a partir de $ ${new Intl.NumberFormat(
              "es-CO"
            ).format(data.precio)}`}</h2>

            {/* área de la propiedad */}
            <h4 className="capitalize font-semibold mb-5">{`área de la propiedad ${new Intl.NumberFormat(
              "es-CO"
            ).format(data.metrosCuadrados)}m²`}</h4>

            {/* cantidad de habitaciones, baños y parqueaderos */}
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center text-[#2A1EFA]">
                <FaBed className="mr-3" />
                <h3 className="font-bold">{data.habitaciones} hab.</h3>
              </div>
              <div className="flex justify-center items-center text-[#2A1EFA]">
                <FaBath className="mr-3" />
                <h3 className="font-bold">{data.baños} bañ.</h3>
              </div>
              <div className="flex justify-center items-center text-[#2A1EFA]">
                <FaCar className="mr-3" />
                <h3 className="font-bold">{data.parqueaderos} par.</h3>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-5">
          {/* componente para agregar comentarios */}
          <AddCommentComponent codeHouse={data.codigoCasa}/>

          {/* componente para visualizar los componentes */}
          <CommentsComponent codeHouse={data.codigoCasa} />

          <CalendarComponent />
        </section>
      </div>

      {/* esto es muy machetero y duplica código pero por ahora fue la solución que encontre para
            que sea responsive */}
      <div className="md:block bg-black hidden sticky top-0 self-start md:w-[300px] p-5 mt-16 mr-5 rounded-sm">
        <div className="mb-5">
          <h3 className="capitalize outline-1 outline-[#2A1EFA] inline-block py-2 px-3 rounded-full font-semibold text-white text-[1rem] ">
            {data.tipoPropiedad}
          </h3>
        </div>
        {/* nombre del arrendador */}
        <h2 className="text-white capitalize font-semibold mb-3">{`propietario: ${data.nombreArrendador}`}</h2>

        {/* precio de arrendamiento por día */}
        <h2 className="text-white capitalize font-semibold mb-3">{`arrendar a partir de $ ${new Intl.NumberFormat(
          "es-CO"
        ).format(data.precio)}`}</h2>

        {/* área de la propiedad */}
        <h4 className="text-white capitalize font-semibold mb-5">{`área de la propiedad ${new Intl.NumberFormat(
          "es-CO"
        ).format(data.metrosCuadrados)}m²`}</h4>

        {/* cantidad de habitaciones, baños y parqueaderos */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-center items-center text-white">
            <FaBed className="mr-3" />
            <h3 className="font-bold">{data.habitaciones} hab.</h3>
          </div>
          <div className="flex justify-center items-center text-white">
            <FaBath className="mr-3" />
            <h3 className="font-bold">{data.baños} bañ.</h3>
          </div>
          <div className="flex justify-center items-center text-white">
            <FaCar className="mr-3" />
            <h3 className="font-bold">{data.parqueaderos} par.</h3>
          </div>
        </div>
        <button className="capitalize py-2 font-bold w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white rounded-sm cursor-pointer">
          arrendar propiedad
        </button>
      </div>
    </div>
  );
};
