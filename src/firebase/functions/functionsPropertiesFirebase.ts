//Impor de la base de datos de firebase
import { db } from "../firebase";

//Import de funciones de firebase
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

//Import de utilidades
import { formatDateFirebase } from "../../utils/formatDateFirebase";

//Import de tipos
import type { UserCache } from "./types/firebaseFunctionsTypes";

//Función para obtener las propiedades de firebase
export const getProperties = async () => {
  try {
    //Accedemos a los documentos
    const querySnapshot = await getDocs(collection(db, "properties"));

    // creaos una data por cada documento que hay en la colección
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    //Error para el desarrollador
    console.error("Error al obtener las propiedades:", error);
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

  //Iteramos los documentos que hay en la colección
  for (const docSnap of querySnapshot.docs) {
    //Extraemos comments de los docymentos
    const { comments } = docSnap.data();

    //Iteramos en cada uno de los comentarios
    for (const commentObj of comments) {
      //Almacenamos el id de cada comentario para buscar los datos del usuario
      const id = commentObj.uid;

      // verifocamos que si haya algun usuario para consultar la coleción de los usauruios
      if (!userCache[id]) {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        //almacenamos los datos del usaurio encontrado
        userCache[id] = userSnap.data();
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

//Función para guardar la fecha de arendamiendo
export const leasePropertyByCode = async (code: string, uid: string) => {
  try {
    
    //Obnemos la colección especifica en base a el codigo de la casa
    const propertyQuery = query(
      collection(db, "properties"),
      where("code", "==", code)
    );

    //Traemos el documento que concinda
    const snapshot = await getDocs(propertyQuery);

    ///Guardamos la referencia del documento
    const propertyRef = snapshot.docs[0].ref;

    //Actualizamos el documento
    await updateDoc(propertyRef, {
      status: "arrendada",
      leaser: uid
    });

    return {
      ok: true,
      error: null,
    };
  } catch (error) {
    console.error("Error al arrendar propiedad:", error);
    return {
      ok: false,
      error: "error al tratar de arrendar la propiedad",
    };
  }
};

export const cancelLease = async (codeHouse: string): Promise<void> => {
  try {
    const q = query(
      collection(db, "properties"),
      where("code", "==", codeHouse)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("No se encontró esta propiedad.");
      return;
    }

    const docRef = querySnapshot.docs[0].ref;

    await updateDoc(docRef, {
      Arrendador: "",
      status: "libre",
    });

    console.log("Se canceló exitosamente");
  } catch (error) {
    console.error("Esta monda valió: ", error);
  }
};
