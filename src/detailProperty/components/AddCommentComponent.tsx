import { useEffect, useState } from "react";
import {
  addCommentToProperty,
  getCommentCountByProperty,
} from "../../firebase/functions/functionsPropertiesFirebase";

import { FaComment, FaStar } from "react-icons/fa";
import { userDataContext } from "../../authentication/hooks/userDataContext";

export const AddCommentComponent = ({ codeHouse }: { codeHouse: string }) => {
  //Contexto para traer la información del usaurio
  const { userData } = userDataContext();

  //Hook para guardar el comentario
  const [commentText, setCommentText] = useState<string>("");
  const [rate, setRate] = useState<number | null>(null);
  const [commentsAmount, setCommentsAmount] = useState<number>(0);

  //Hook para rendereizar los comentarios cada vez que se agrega uno nuevo
  useEffect(() => {
    const getAmountComments = async () => {
      const comments = await getCommentCountByProperty(codeHouse);
      setCommentsAmount(comments);
    };
    getAmountComments();
  }, [codeHouse]);

  //Función para guardar el comentario en firebase
  const handleAddComment = async () => {
    //Verificamos que el comentario no se envie vació;
    if (!commentText.trim()) return;

    //Añadimos el comentario
    await addCommentToProperty(codeHouse, userData.id, commentText, rate);

    //Actualizamos la cantidad de comentarios
    const updatedCount = await getCommentCountByProperty(codeHouse);
    setCommentsAmount(updatedCount);
    setRate(null);
    setCommentText("");
  };

  return (
    <>
      {/* ventana para poder mostrar los comentarios */}
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <h2 className="capitalize text-gray-700 text-[2rem] font-bold mb-2">
            comentarios
          </h2>
          <div className="flex items-center">
            <FaComment className="mr-2 text-[#2A1EFA]" />
            <h3 className="text-gray-500">{commentsAmount}</h3>
          </div>
        </div>

        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                rate && star <= rate ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRate(star)}
            />
          ))}
        </div>

        <textarea
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          className="w-full h-40  outline-1 outline-gray-300 resize-none p-3 mb-4 rounded-sm"
          placeholder="Añade un comentario"
        />
        <div className="w-full flex justify-end">
          <button
            onClick={handleAddComment}
            disabled={rate === 0}
            className="capitalize font-bold w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white rounded-sm py-3 mb-10 cursor-pointer md:w-40"
          >
            comentar
          </button>
        </div>
      </div>
    </>
  );
};
