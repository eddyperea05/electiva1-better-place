import { useEffect, useState } from "react";

//Import de react router
import { useNavigate } from "react-router-dom";

//Import de componentes
import { PropertyCard } from "../components/PropertyCard";

//Import del contexto del usuario
import { userDataContext } from "../../authentication/hooks/userDataContext";

//Import de firebase
import {
  deletePropertyByCode,
  getUserProperties,
  updatePropertyByCode,
} from "../../firebase/functions/functionsPropertiesFirebase";

//Import de tipos
import type { PropiedadInterface } from "../../properties/types/propertyType";

import { PropertyEditModal } from "../components/PropertyEditModal";
import { handleUploadImage } from "../../cloudinary/saveImage";
import { AlertAreYouSure } from "../../ui/modals/AlertAreYoySure";

export const MyPropertiesPage = () => {
  //declaración de navigate
  const navigate = useNavigate();

  //Traemos el contexto del usuario
  const { userData } = userDataContext();

  //Hook para almacenar las propiedades
  const [properties, setProperties] = useState<PropiedadInterface[]>([]);

  //Hook para saber si esta cargando las propiedades
  const [loading, setLoading] = useState<boolean>(true);

  //Hook para abrir y cerrar el modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  //Hook para saber si se alcanzo el maximo de propiedades
  const [maxTop, setMaxTop] = useState(false);

  //Hook para almacenar el código almacenado
  const [codeSelected, setCodeSelected] = useState<string | null>(null);

  const [SelectedProperty, setSelectedProperty] =
    useState<PropiedadInterface>();

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  //Función pata pedir las propiedades de firebase
  const fetchProperties = async () => {
    const data = await getUserProperties(userData.id);
    setProperties(data);
    setMaxTop(data.length >= 10);
    setLoading(false);
  };

  //Reenderizado de cada vez recargamos la págia
  useEffect(() => {
    fetchProperties();
  }, []);

  //Función para confirmar la eliminación de una propiedad
  const handleConfirmDelete = async () => {
    if (!codeSelected) return;
    await deletePropertyByCode(codeSelected);
    setModalOpen(false);
    setCodeSelected(null);
    fetchProperties();
  };

  const handleUpdateProperty = async (updatedData: PropiedadInterface) => {
    try {
      const { image, code, ...rest } = updatedData;

      const dataToUpdate: Partial<PropiedadInterface> = {
        ...rest,
      };

      // Solo actualiza la imagen si es un archivo nuevo
      if (image instanceof File) {
        const imageUrl = await handleUploadImage(image);
        dataToUpdate.image = imageUrl;
      }

      await updatePropertyByCode(code, dataToUpdate);
      await fetchProperties();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  return (
    <section className="py-10">
      <div className="container text-center">
        <h1 className="text-[clamp(28px,4vw,44px)] font-black">
          Mis Propiedades
        </h1>
      </div>

      <div className="mx-6 mt-3">
        <button
          onClick={() => navigate("/addProperty")}
          disabled={maxTop}
          className={`capitalize cursor-pointer py-2 px-3 rounded-sm ${
            maxTop
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-300 text-white outline-1 outline-green-700"
          }`}
        >
          añadir propiedad
        </button>

        {/* reenderizamos las propiedades del usuario */}
        <div className="mt-5">
          {loading ? (
            /* Se reenderiza este comentario mientras cargan las propeidades */
            <p>Cargando propiedades...</p>
          ) : properties.length === 0 ? (
            /* Si el usuario no tiene propiedades reenderizamos este comentario */
            <p>No tienes propiedades registradas.</p>
          ) : (
            properties.map((property: PropiedadInterface, index) => (
              <PropertyCard
                key={property.code}
                property={property}
                index={index}
                onDeleteRequest={() => {
                  setCodeSelected(property.code);
                  setModalOpen(true);
                }}
                onEditRequest={() => {
                  setSelectedProperty(property);
                  setEditModalOpen(true);
                }}
              />
            ))
          )}
        </div>

        {/* Modal de confirmación de la eliminación*/}
        {modalOpen && (
          <AlertAreYouSure
            handleConfirmDelete={handleConfirmDelete}
            setModalOpen={setModalOpen}
            setCodeSelected={setCodeSelected}
          />
        )}

        {editModalOpen && SelectedProperty && (
          <PropertyEditModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            property={SelectedProperty}
            onSave={handleUpdateProperty}
          />
        )}
      </div>
    </section>
  );
};
