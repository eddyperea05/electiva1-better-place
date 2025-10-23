//imports de iconos
import { FaCommentSlash } from "react-icons/fa";

//import de comentarios
import comentarios_propiedades from "../../json/comentarios_propiedades.json";

export const CommentsComponent = ({ codeHouse }: { codeHouse: string }) => {
  //guardamos en una variable los comentarios que coincidan con el código de la casa
  const comments = comentarios_propiedades.find(
    (comment) => comment.codigoCasa === codeHouse
  );

  return (
    <>
      <div>
        {/* verificamos si hay comentarios, sino mostramos que no hay comentarios */}
        {comments?.comentarios.length !== 0 ? (
          /* iteramos sobre los comentarios que estan en el array */
          comments?.comentarios.map((comment, index) => (
            <div key={index} className="mb-7">
              <div className="flex justify-between">
                <div className="flex justify-center items-center mb-6">
                  <img className="outline outline-[#2A1EFA] p-1 rounded-full mr-3 w-15" src={comment.fotoPerfil}/>
                  <h3 className="font-bold text-gray-500">{comment.usuario}</h3>
                </div>
                <h3 className="font-semibold text-gray-500">{comment.fechaPublicacion}</h3>
              </div>
              <p className="text-gray-500">{comment.comentario}</p>
            </div>
          ))
        ) : (
          /* visualización para mostrar que no hay comentarios */
          <div className="flex justify-center items-center mb-10">
            <FaCommentSlash className="mr-3 text-gray-400"/>
            <h2 className="font-bold text-gray-400">No hay ningun comentario</h2>
          </div>
        )}
      </div>
    </>
  );
};
