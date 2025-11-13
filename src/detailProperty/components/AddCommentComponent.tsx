import { useState } from "react";
import { addCommentToProperty } from "../../firebase/functions/functionsPropertiesFirebase";

import { FaComment } from "react-icons/fa";

export const AddCommentComponent = ({ codeHouse }: { codeHouse: string }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await addCommentToProperty(codeHouse, currentUser.uid, commentText);
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
            <h3 className="text-gray-500">0</h3>
          </div>
        </div>
        <textarea
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full h-40  outline-1 outline-gray-300 resize-none p-3 mb-4 rounded-sm"
          placeholder="Añade un comentario"
        />
        <div className="w-full flex justify-end">
          <button
            onClick={handleAddComment}
            className="capitalize font-bold w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white rounded-sm py-3 mb-10 cursor-pointer md:w-40"
          >
            comentar
          </button>
        </div>
      </div>
    </>
  );
};
