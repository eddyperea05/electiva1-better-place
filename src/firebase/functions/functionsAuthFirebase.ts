import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { handleDeafaultImage } from "../../cloudinary/saveImage";

//Función para obtener los datos del usuario por su uid
export const getUserByUid = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  //validamos si existe el usuario con ese uid
  if (!userSnap.exists()) {
    throw new Error(`No se encontró el usuario con el uid: ${uid}`);
  }

  //retornamos toda la información del usuario
  return { id: uid, ...userSnap.data() };
};

//Función para actulizar los datos del usuario
export const handleUpdateUser = async (uid: string, formData: any) => {
  try {
    //buscamos al usuario por su uid
    const userRef = doc(db, "users", uid);

    //le enviamos los datos a actualizar del usuario
    await updateDoc(userRef, formData);

    //retornamos que la actualización salio bien
    return {
      ok: true,
    };
  } catch (error) {
    //retornamos que la actualización fue fallida
    return {
      ok: false,
      error,
    };
  }
};

//Función para registrar al usuario con correo y contraseña
export const registerUser = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  numberPhone: string,
  password: string
) => {
  try {
    //creamos nuevas credenciales de usuario con la función createUserWithEmailAndPassword
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //Fuardamos las credenciales del usuario logeado
    const user = userCredentials.user;

    //Con la función do creamos un nuevo documento en base al usuario
    const userDocRef = doc(db, "users", user.uid);

    //Llamamos a la función para enviar por defecto una imagen
    const userDefaultImage = await handleDeafaultImage();

    //Creamos un objeto en base a los datos de las credenciales y enviados por el usuario
    const userObject = {
      id: user.uid,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: user.email,
      numberPhone: numberPhone,
      userImage: userDefaultImage,
      isOwner: false,
    };

    //Le enviamos al documento toda la información del usuario
    const userData = await setDoc(userDocRef, userObject);

    //Retornamos una respuesta al usuario
    return {
      ok: true,
      userData,
    };
  } catch (error) {
    //Mensaje para el desarrollador
    console.error(error);

    //Retornamos el error para imprimir en el formulario
    return {
      ok: false,
      error,
    };
  }
};

//Función para logear el usuario
export const loginUser = async (email: string, password: string) => {
  try {
    //promesa para obtener los datos
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    //se obtiene el uid del usuario
    const uid = credentials.user.uid;

    //Función para buscar al usuario y enviarlo al contexto
    const userDataGetting = await getUserByUid(uid);

    //Retornamos una respuesta al usuario
    return {
      ok: true,
      userDataGetting,
    };
  } catch (error: any) {
    //Error para el desarrollador
    console.error(error);

    //Retornamos el error para imprimir en el formulario
    return {
      ok: false,
      error: error.code,
    };
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Referencia al documento del usuario en Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const firstAndLastName = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];

    // Si el usuario no existe aún, lo creamos
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        firstName: firstAndLastName[0],
        lastName: firstAndLastName[1],
        userName: user.displayName,
        email: user.email,
        numberPhone: "",
        userImage: user.photoURL,
        isOwner: false,
      });
    }

    const userData = await getUserByUid(user.uid);

    return {
      ok: true,
      userData,
    };
  } catch (error: any) {
    return { ok: false, error: error.code };
  }
};

//Funcipon para salir de la cuenta
export const handleLogOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Hubo un error al cerrar sección");
  }
};
