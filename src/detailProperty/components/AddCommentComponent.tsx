import comentarios from "../../json/comentarios_casas.json"

import { FaComment } from "react-icons/fa";


export const AddCommentComponent = ({codeHouse}: {codeHouse: string}) => {

  //guardamos en una variable los comentarios que coincidan con el código de la casa
  const comments = comentarios.find(
    (comment) => comment.codigoCasa === codeHouse
  );

  return (
    <>
      {/* ventana para poder mostrar los comentarios */}
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <h2 className="capitalize text-[2rem] font-bold mb-2">comentarios</h2>
          <div className="flex items-center">
            <FaComment className="mr-2" />
            <h3>{comments?.comentarios.length}</h3>
          </div>
        </div>
        <textarea
          className="w-full h-40  outline-1 outline-black resize-none p-3 rounded-sm"
          placeholder="Añade un comentario"
        />
        <button className="capitalize font-bold w-full bg-[#2A1EFA] hover:bg-[#261DCC] duration-150 text-white rounded-sm py-3 mb-10 cursor-pointer">
          comentar
        </button>
      </div>
    </>
  );
};
