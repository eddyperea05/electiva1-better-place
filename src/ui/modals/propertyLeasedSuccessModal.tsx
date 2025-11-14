import { useState } from "react";

//import icons
import { IoClose } from "react-icons/io5";

//Import firebase function
import { leasePropertyByCode } from "../../firebase/functions/functionsPropertiesFirebase";

//Import del contexto de la propiedad
import { useDetailContext } from "../../detailProperty/hooks/useDataContext";

export const PropertyLeasedSuccessModal = () => {

  const { data } = useDetailContext();

  console.log(data)

  //Hook para abrir el modal
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);
  const [leaseDate, setLeaseDate] = useState<Date | null>(null);

  //Función apra abrir y cerrar el modal
  const handleClickOpenAndCloseModal = () => {
    setIsOpenModal(!isOpenModal);
    /* Hacemos un cambio en el estilo directo para que no se pueda hacer 
    el scroll de las ventanas anteriores */
    document.body.style.overflow = !isOpenModal ? "hidden" : "auto";
  };

  const handleLeaseProperty = async () => {
    if (!leaseDate) return alert("Selecciona una fecha de arrendamiento");


    try {
      await leasePropertyByCode(data.code, leaseDate);
      handleClickOpenAndCloseModal();
    } catch (error) {
      console.error("Sucedio un error al tratar de guardar: ", error);
    }
  };

  return (
    <>
      <button
        onClick={handleClickOpenAndCloseModal}
        className="capitalize py-2 font-bold w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white rounded-sm cursor-pointer"
      >
        arrendar propiedad
      </button>

      {isOpenModal && (
        <div
          onClick={handleClickOpenAndCloseModal}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        >
          {/* opacidad para ael fonto */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Utilizo la función stopPropagation para que no se cierre la ventana */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-110 bg-white p-6 rounded shadow-lg z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="capitalize text-[#2A1EFA] font-semibold mb-3">
                numero de días ha arrendar
              </h3>
              {/* botón para cerrar el modal */}
              <button
                onClick={handleClickOpenAndCloseModal}
                className="bg-[#2A1EFA] p-2 rounded-sm cursor-pointer"
              >
                <IoClose className="text-white" />
              </button>
            </div>
            <input
              className="w-full p-2 outline outline-gray-300 mb-3 rounded-sm"
              type="date"
              onChange={(e) => setLeaseDate(new Date(e.target.value))}
              placeholder="Número de días..."
            />

            {/* Botón para arrendar la propiedad */}
            <button
              onClick={handleLeaseProperty}
              className="capitalize bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] py-2 text-white font-bold rounded-sm cursor-pointer w-full"
            >
              arrendar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
