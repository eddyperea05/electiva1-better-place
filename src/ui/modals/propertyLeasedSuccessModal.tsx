import { useEffect, useState } from "react";

//Import firebase function
import { leasePropertyByCode } from "../../firebase/functions/functionsPropertiesFirebase";

//Import del contexto de la propiedad
import { useDetailContext } from "../../detailProperty/hooks/useDataContext";
import { PropertyLeasedSuccessfully } from "./PropertyLeasedSuccesfully";
import { userDataContext } from "../../authentication/hooks/userDataContext";

export const PropertyLeasedSuccessModal = () => {
  const { data } = useDetailContext();
  const { userData } = userDataContext();

  //Hook para abrir el modal
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);
  const [error, setError] = useState<String | null>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLeased, setIsLeased] = useState(false);

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
      console.error("Sucedio un error al tratar de guardar: ", error);
    }
  };

  return (
    <>
      {showSuccessMessage && <PropertyLeasedSuccessfully />}

      {error && (
        <div className="w-full flex items-center justify-center bg-red-900 mt-6 py-2 rounded-sm">
          <span className="text-red-400">{error}</span>
        </div>
      )}
      <button
        onClick={handleLeaseProperty}
        disabled={isLeased}
        className={`capitalize py-2 font-bold w-full text-white rounded-sm cursor-pointer ${
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
