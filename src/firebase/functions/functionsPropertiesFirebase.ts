//Impor de la base de datos de firebase
import { db } from "../firebase";

//Import de funciones de firebase
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

//Import de utilidades
import { formatDateFirebase } from "../../utils/formatDateFirebase";

//import de tipos
import type { PropiedadInterface } from "../../properties/types/propertyType";

//Función para obtener las propiedades de firebase
export const getProperties = async (): Promise<PropiedadInterface[]> => {
  try {
    //Accedemos a los documentos
    const querySnapshot = await getDocs(collection(db, "properties"));

    // creaos una data por cada documento que hay en la colección
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PropiedadInterface[];

    return data;
  } catch (error) {
    //Error para el desarrollador
    console.error("Error al obtener las propiedades:", error);
    return [];
  }
};

//Función para obtener los comentarioas a partir del código de la casa
export const getCommentsByCodeHouse = async (codeHouse: string) => {
  //Variables para almacenar los comentarios y lso datos de los usaurios que comentaron
  const allComments = [];
  const userCache = {} as UserCache;

  //Obnemos la colección especifica en base a el codigo de la casa
  const queryFirebase = query(
    collection(db, "comments"),
    where("codeProperty", "==", codeHouse)
  );

  //traemos el documento que concinda
  const querySnapshot = await getDocs(queryFirebase);

  //Defininmos un tipo especial para UserCache
  type UserCache = {
    [uid: string]: {
      userName: string;
      userImage: string;
    };
  };

  //Iteramos los documentos que hay en la colección
  for (const docSnap of querySnapshot.docs) {
    //Extraemos comments de los docymentos
    const { comments } = docSnap.data();

    //Iteramos en cada uno de los comentarios
    for (const commentObj of comments) {
      //Almacenamos el id de cada comentario para buscar los datos del usuario
      const id: string = commentObj.uid;

      // verifocamos que si haya algun usuario para consultar la coleción de los usauruios
      if (!userCache[id]) {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        //almacenamos los datos del usaurio encontrado
        const userData = userSnap.data();
        if (userData) {
          userCache[id] = {
            userName: userData.userName,
            userImage: userData.userImage,
          };
        }
      }

      //Con este objeto organizamos los comentarios porque el otro es un string
      const date = commentObj.publicationDate.toDate();
      const newDate = formatDateFirebase(commentObj.publicationDate);

      //Almacenamos toda la daa que recolectamos de las colecciones
      allComments.push({
        comment: commentObj.comment,
        publicationDate: newDate,
        userName: userCache[id].userName,
        image: userCache[id].userImage,
        rawDate: date,
        rate: commentObj.rate,
      });
    }
  }

  //Ordenamos las rechas de las mas recientes a las mas antiguas
  allComments.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

  return allComments;
};

//Función para agregar un comentario
export const addCommentToProperty = async (
  codeHouse: string,
  uid: string,
  commentText: string,
  rate: number
) => {
  try {
    //Obnemos la colección especifica en base a el codigo de la casa
    const queryFirebase = query(
      collection(db, "comments"),
      where("codeProperty", "==", codeHouse)
    );

    //Traemos el documento que concinda
    const querySnapshot = await getDocs(queryFirebase);

    //Creamos un objeto el cual usaremos para agregarlo al array de comentarios
    const newComment = {
      uid,
      comment: commentText,
      publicationDate: Timestamp.now(),
      rate,
    };

    //Verificamos si existe el documento
    if (!querySnapshot.empty) {
      //En caso de que el documento exista, actualizamos la información
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        comments: arrayUnion(newComment),
      });
    } else {
      /* En caso de que no exista creamos un nuevo documento con la información de la propiedad y el
      objeto del nuevo comentario */
      const newDocRef = doc(collection(db, "comments"));
      await setDoc(newDocRef, {
        codeProperty: codeHouse,
        comments: [newComment],
      });
    }

    //Obnemos la colección especifica en base a el codigo de la casa
    const propertyQuery = query(
      collection(db, "properties"),
      where("code", "==", codeHouse)
    );

    if (!rate || rate < 1 || rate > 5) {
      throw new Error("Debes seleccionar una calificación antes de comentar.");
    }

    //Traemos el documento que concinda
    const propertySnapshot = await getDocs(propertyQuery);

    //Validemos que la colección no este vacia
    if (!propertySnapshot.empty) {
      const propertyRef = propertySnapshot.docs[0].ref;

      //Traemos los datos del documento
      const data = propertySnapshot.docs[0].data();

      //Tremos la actual calificación
      const currentRate = data.rate || 0;

      //Traemos la actual
      const currentCount = data.rateCount || 0;

      //Actualizamos la cantidad de calificaciones
      const newCount = currentCount + 1;

      //Creamos el la nueva calificación general de la propiedad
      const newRate = (currentRate * currentCount + rate) / newCount;

      //Actualizamos el documento de propiedades con la calificación y la cantidad de calificacipnes
      await updateDoc(propertyRef, {
        rate: parseFloat(newRate.toFixed(2)),
        rateCount: newCount,
      });
    }
  } catch (error) {
    //Error para el desarrollador
    console.error("Error al tratar de agregar comentario:", error);
  }
};

//Función para saber la cantidad de comentarios que hay por propiedad
export const getCommentCountByProperty = async (codeHouse: string) => {
  try {
    //Obnemos la colección especifica en base a el codigo de la casa
    const queryFirebase = query(
      collection(db, "comments"),
      where("codeProperty", "==", codeHouse)
    );

    //Traemos el documento que concinda
    const querySnapshot = await getDocs(queryFirebase);

    //Si la colección esta vacia retornamos 0
    if (querySnapshot.empty) return 0;

    //Guardamos los datos
    const docData = querySnapshot.docs[0].data();
    const comments = docData.comments || [];

    //Retornamos la longitud del arry
    return comments.length;
  } catch (error) {
    //Error para el desarrollador
    console.error("Error al contar comentarios:", error);
    return 0;
  }
};

//Función para guardar el arrendamiento
export const leasePropertyByCode = async (code: string, uid: string) => {
  try {
    //Buscamos la colección por el codigo
    const propertyQuery = query(
      collection(db, "properties"),
      where("code", "==", code)
    );

    //Obnemos el documento
    const snapshot = await getDocs(propertyQuery);

    //Guardamos los datos que hay
    const propertyDoc = snapshot.docs[0];

    //Obtenemos la data
    const propertyData = propertyDoc.data();

    //Verificamos el el usuario que trata de arrendar no sea el mismo
    if (propertyData.lessee?.id === uid) {
      return {
        ok: false,
        error: "No puedes arrendar tu propiedad",
      };
    }

    //Actualizamos el documento del arrendamiento
    await updateDoc(propertyDoc.ref, {
      status: "arrendada",
      leaser: uid,
      TimeLease: serverTimestamp(),
    });

    //Devolvemos una respuesta exitosa
    return {
      ok: true,
      error: null,
    };
  } catch (error) {
    //Error para el desarrolaldor
    console.error("Error al arrendar propiedad:", error);

    //Retornamos una respuesta para el usaurio
    return {
      ok: false,
      error: "Error al tratar de arrendar la propiedad.",
    };
  }
};

//Función para guardar la propiedad
export const saveProperty = async (propiedad: PropiedadInterface) => {
  try {
    //Añadimos un documento a la colección de propiedades
    await addDoc(collection(db, "properties"), propiedad);
  } catch (error) {
    //Error para el desarrollador
    console.error("Error al tratar de guardar la propiedad:", error);
  }
};

//Función para generar los códigos de las propiedades
export const generateSequentialCodeByType = async (tipo: string) => {
  //inicializamos una letra
  let letra = "X";

  //Verificamos que tipo de propiedad es y le asignamos la letra
  if (tipo === "casa") letra = "C";
  else if (tipo === "apartamento") letra = "A";
  else if (tipo === "oficina") letra = "O";
  else if (tipo === "finca") letra = "F";

  //Guardamos la referencia de la colección de las propiedades
  const propiedadesRef = collection(db, "properties");

  //Guardamos la query para generar el código
  const q = query(
    propiedadesRef,
    where("typeProperty", "==", tipo),
    orderBy("code", "desc"),
    limit(1)
  );

  //obnemos el documento con según la query
  const snapshot = await getDocs(q);

  //este es el número por el cual las propiedades siempre empiezan
  let nuevoNumero = 100;

  //Validamos de que no este vacio el documento
  if (!snapshot.empty) {
    const ultima = snapshot.docs[0].data();
    const codigoAnterior = ultima.code;
    const numero = parseInt(codigoAnterior.slice(1));
    nuevoNumero = numero + 1;
  }

  //Retornamos la letra del tipo de propiedad y el número de la propiedad
  return `${letra}${nuevoNumero}`;
};

//Función para obener las propiedades según el id de propietario
export const getUserProperties = async (uid: string) => {
  try {
    //Guardamos la referencia de la colección
    const propiedadesRef = collection(db, "properties");

    //Guardamos la queary la cual tenga el mismo id que el propietario
    const q = query(propiedadesRef, where("lessee.id", "==", uid));

    //Obtenemos los documentos
    const snapshot = await getDocs(q);

    //retornamos las propiedades del propietario
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PropiedadInterface[];
  } catch (error) {
    //Error para el desarrollador
    console.error("No se ha podido obtener les propiedades del usuario");
    return [];
  }
};

//Función para eliminar las propiedades
export const deletePropertyByCode = async (code: string) => {
  //guardamos la referencia de la colección
  const propiedadesRef = collection(db, "properties");

  //buscamos la query que tenga el mismo código de la propiedad
  const q = query(propiedadesRef, where("code", "==", code));

  //Obtenemos los documentos
  const snapshot = await getDocs(q);

  //Obtenemos los datos
  const docId = snapshot.docs[0].id;

  //Eliminamos el documento
  await deleteDoc(doc(db, "properties", docId));
};

export const updatePropertyByCode = async (
  code: string,
  updatedData: Partial<PropiedadInterface>
) => {
  const q = query(collection(db, "properties"), where("code", "==", code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("No se encontró la propiedad con ese código.");
  }

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, updatedData);
};

//Funciópn para cancelar un arrendamiento
export const cancelLease = async (codeHouse: string) => {
  try {
    //Guardamos la query donde la colección sea igual al código de la propiedad
    const q = query(
      collection(db, "properties"),
      where("code", "==", codeHouse)
    );

    //Obtenemos los documentos
    const querySnapshot = await getDocs(q);

    //Validamos que la propiedad si exista
    if (querySnapshot.empty) {
      console.warn("No se encontró esta propiedad.");
      return;
    }

    //Obtenemos la referencia del documento
    const docRef = querySnapshot.docs[0].ref;

    //Actualizamos el arrendador y el status
    await updateDoc(docRef, {
      leaser: "",
      TimeLease: null,
      status: "libre",
    });

    console.log("Se canceló exitosamente");
  } catch (error) {
    console.error("Esta monda valió: ", error);
  }
};
