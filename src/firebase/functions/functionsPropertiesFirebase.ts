import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { formatDateFirebase } from "../../utils/formatDateFirebase";
import type { UserCache } from "./types/firebaseFunctionsTypes";

export const getProperties = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error al obtener documentos:", error);
  }
};

export const getCommentsByCodeHouse = async (codeHouse: string) => {
  const q = query(collection(db, "comments"), where("codeProperty", "==", codeHouse));
  const querySnapshot = await getDocs(q);

  const allComments = [];
  const userCache = {} as UserCache; 

  for (const docSnap of querySnapshot.docs) {
    const { comments } = docSnap.data();

    for (const commentObj of comments) {
      const id = commentObj.uid;

      if (!userCache[id]) {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        userCache[id] = userSnap.exists()
          ? userSnap.data()
          : { userName: "Usuario desconocido", userImage: "" };
      }

      //Con este objeto organizamos los comentarios porque el otro es un string
      const date = new Date(commentObj.publicationDate);
      const newDate = formatDateFirebase(commentObj.publicationDate);

      console.log(newDate)

      allComments.push({
        comment: commentObj.comment,
        publicationDate: newDate,
        userName: userCache[id].userName,
        image: userCache[id].userImage,
        rawDate: date,
      });
    }
  }

  // Ordenar por fecha descendente
  allComments.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

  return allComments;
};

export const addCommentToProperty = async (
  codeHouse: string,
  uid: string,
  commentText: string
): Promise<void> => {
  try {
    const q = query(
      collection(db, "comments"),
      where("codeProperty", "==", codeHouse)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("No se encontró documento de comentarios para esta propiedad.");
      return;
    }

    const docRef = querySnapshot.docs[0].ref;

    const newComment = {
      uid,
      comment: commentText,
      publicationDate: Timestamp.now(),
    };

    await updateDoc(docRef, {
      comments: arrayUnion(newComment),
    });

    console.log("Comentario agregado exitosamente.");
  } catch (error) {
    console.error("Error al agregar comentario:", error);
  }
};
