//Import para cargar la imagen por defecto para los nuevos usuarios
import defaultImage from "../assets/images/imageProfile.webp";

//Keys para el cloudinary
const upload_preset = "betterPlace";
const cloud_name =  "dyr30w7ht"

//Función para guardar una imagen por defecto en el registro
export const handleDeafaultImage = async () => {

    //Promesa para convertir mi archivo en un blob
    const file = await fetch(defaultImage)
      .then((res) => res.blob());

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset); 

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; 
};

//Función para guardar imagenes que carga el usuario
export const handleUploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error al tratar de subir la imagen: ", error)
  }
};
