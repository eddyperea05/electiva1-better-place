import { useEffect, useState } from "react";

//Import firebase function
import { leasePropertyByCode } from "../../firebase/functions/functionsPropertiesFirebase";

//Import del contexto de la propiedad
import { useDetailContext } from "../../detailProperty/hooks/useDataContext";
import { AlertPropertyLeasedSuccesfully } from "./AlertPropertyLeasedSuccesfully";
import { userDataContext } from "../../authentication/hooks/userDataContext";

export const PropertyLeasedSuccessModal = () => {
  //Contexto de la propiedad
  const { data } = useDetailContext();

  //Contexto del usuario
  const { userData } = userDataContext();

  //Hook para abrir el modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  //Hook para mostrar el mensaje de propiedad arrendada
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  //Hook local para saber si esta arrendada o no
  const [isLeased, setIsLeased] = useState(false);

  //Hook para mostrar los errores
  const [error, setError] = useState<String | null>("");

  //Reenderizamos cada vez que cambian los datos "osea el estado de la propiedad"
  useEffect(() => {
    if (data.status === "arrendada") {
      setIsLeased(true);
    }
  }, [data]);

  //Función apra abrir y cerrar el modal
  const handleClickOpenAndCloseModal = () => {
    setIsOpenModal(!isOpenModal);
    setError("");
  };

  //Función para arrendar
  const handleLeaseProperty = async () => {

    //No dejamos arrendar si ya esta arrendada 
    if (data.status === "arrendada") return;

    //Intentamos arrendar la propiedad en firebase
    try {
      const status = await leasePropertyByCode(data.code, userData.id);
      if (status.ok) {
        handleClickOpenAndCloseModal();
        setShowSuccessMessage(true);
        setIsLeased(true);
        setError("");
      } else {
        setError(status.error);
      }
    } catch (error) {
      //Mostramos el error al desarrollador
      console.error("Hubo un error al tratar de guardar: ", error);
    }
  };

  return (
    <>
      {/* Si se arrendo la propiedad mostramos la alerta */}
      {showSuccessMessage && <AlertPropertyLeasedSuccesfully />}

      {/* Si hubo un error lo mostramos al usuario */}
      {error && (
        <div className="w-full flex items-center justify-center bg-red-900 mt-6 py-2 rounded-sm">
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {/* Botón para arrendar la propeidad */}
      <button
        onClick={handleLeaseProperty}
        disabled={isLeased}
        className={`capitalize mt-5 py-2 font-bold w-full text-white rounded-sm cursor-pointer ${
          isLeased
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA]"
        }`}
      >
        arrendar propiedad
      </button>
    </>
  );
};
