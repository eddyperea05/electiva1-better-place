import { useRef, useState } from "react";

//iImports de iconos
import { IoClose } from "react-icons/io5";

//Import del contexto del usuario
import { userDataContext } from "../../authentication/hooks/userDataContext";

//Imports de la función para poder guardar los datos en firebase
import { handleUpdateUser } from "../../firebase/functions/functionsAuthFirebase";

//Imports de componentes
import { EditableInput } from "./components/EditableInput";
import { handleUploadImage } from "../../cloudinary/saveImage";

export const PerfilForm = () => {
  //Traemos los datos del usuario por medio del contexto
  const { userData, setUserData } = userDataContext();

  //Hook para saber si se abrio el modal
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  //Hooks para el archivo de la imagen de foto de usuario
  const [previewImage, setPreviewImage] = useState<string>(userData.userImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //Hooks para el archivo de la imagen de la cedula
  const [previewCedula, setPreviewCedula] = useState<string>(
    userData.cedulaImage
  );
  const [cedulaFile, setCedulaFile] = useState<File | null>(null);
  const cedulaInputRef = useRef<HTMLInputElement>(null);

  //Hook para guardar los datos del usuario
  const [formData, setFormData] = useState({
    userName: userData.userName,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    userImage: userData.userImage,
    numberPhone: userData.numberPhone,
  });

  //Función para asignar la referencia de la imagen de usuario
  const handleClickOnImage = () => {
    fileInputRef.current?.click();
  };

  //Función para asignar la referencia de la imagen de la cedula
  const handleClickOnCedula = () => {
    cedulaInputRef.current?.click();
  };

  //Función para abrir y cerrar el modal
  const handleOpenAndCloseModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData(userData);

    /* Hacemos un cambio en el estilo directo para que no se pueda hacer 
    el scroll de las ventanas anteriores */
    document.body.style.overflow = !isModalOpen ? "hidden" : "auto";
  };

  //Función para capturar el nombr y el valor del input
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Función para guardar la información del usuario
  const handleSaveUser = async () => {
    try {
      //Guardamos los datos de las imagenes ya cargadas
      let imageUrl = userData.userImage;
      let cedulaUrl = userData.cedulaImage;

      // Si hay nuevas imagenes seleccionadas las subimos
      if (selectedFile) {
        imageUrl = await handleUploadImage(selectedFile);
      }

      if (cedulaFile) {
        cedulaUrl = await handleUploadImage(cedulaFile);
      }

      //Guardamos el objeto para cargarlo en el firebase
      const updatedData = {
        ...formData,
        userImage: imageUrl,
        cedulaImage: cedulaUrl,
        //Cambiamos el estado del propietario a true para que pueda subir propiedades
        isOwner: true,
      };

      //usamos la función de firebase para actualizar la data
      await handleUpdateUser(userData.id, updatedData);
      //Actualizamos el estado global
      setUserData(updatedData);
      //Cerramos e lmodal
      handleOpenAndCloseModal();
    } catch (error) {
      //Error para el desarrollador
      console.error("Error al tratar de los guardar cambios:", error);
    }
  };

  //Función para guardar la imagen de la cedula
  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCedulaFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewCedula(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  //Función para guardar la imagen del usuario
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button
        onClick={handleOpenAndCloseModal}
        className="capitalize cursor-pointer bg-[#2A1EFA] rounded-full p-1"
      >
        <img
          src={userData.userImage}
          className="w-10 h-10 object-cover rounded-full"
        />
      </button>

      {isModalOpen && (
        <div
          onClick={handleOpenAndCloseModal}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
        >
          {/* opacidad para ael fonto */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Utilizo la función stopPropagation para que no se cierre la ventana */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-150 my-5 bg-white p-6 rounded shadow-lg z-50"
          >
            <div className="flex items-center justify-between mb-4">
              {/* Componente para cambiar la imagen de perfil */}
              <div className="bg-[#2A1EFA] p-1 rounded-full cursor-pointer">
                <img
                  src={previewImage}
                  onClick={handleClickOnImage}
                  className="w-12 h-12 object-cover rounded-full hover:bg-black hover:opacity-45"
                />
              </div>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {/* botón para cerrar el modal */}
              <button
                onClick={handleOpenAndCloseModal}
                className="bg-[#2A1EFA] text-[20px] p-2 rounded-sm cursor-pointer"
              >
                <IoClose className="text-white" />
              </button>
            </div>
            <div>
              {/* Se debe de tener en cuenta que le enviamos la función onChange para que
              podamos tener los datos desde el padre */}
              <div className="flex flex-col w-full">
                {/* input para el nombre de usuario */}
                <label className="capitalize mb-2 text-gray-600">
                  nombre de usuario:
                </label>
                <EditableInput
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
                {/* input para los nombres */}
                <label className="capitalize mb-2 text-gray-600">
                  nombres:
                </label>
                <EditableInput
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {/* input para los apellidos */}
                <label className="capitalize mb-2 text-gray-600">
                  apellidos:
                </label>
                <EditableInput
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {/* input para el número de teléfono*/}
                <label className="capitalize mb-2 text-gray-600">
                  número de teléfono:
                </label>
                <EditableInput
                  name="numberPhone"
                  value={formData.numberPhone}
                  onChange={handleInputChange}
                />
                {/* input para la imagen de la cedula*/}
                <label className="capitalize mb-2 text-gray-600">
                  imagen de la cédula:
                </label>
                <div className="bg-[#2A1EFA] p-1 rounded-sm cursor-pointer w-full mb-4">
                  <img
                    src={previewCedula}
                    onClick={handleClickOnCedula}
                    className="w-full h-20 object-cover rounded-sm hover:opacity-70"
                  />
                </div>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={cedulaInputRef}
                  onChange={handleCedulaChange}
                />
              </div>
              <button
                onClick={handleSaveUser}
                className="w-full capitalize font-bold text-white bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] p-3 rounded-md cursor-pointer"
              >
                guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
