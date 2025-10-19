//imports de iconos
import { FaUserCircle, FaCommentSlash } from "react-icons/fa";

//import de comentarios
import comentarios_casas from "../../json/comentarios_casas.json";

export const CommentsComponent = ({ codeHouse }: { codeHouse: string }) => {
  //guardamos en una variable los comentarios que coincidan con el código de la casa
  const comments = comentarios_casas.find(
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
                <div className="flex justify-center items-center">
                  <FaUserCircle className="mr-3 text-xl" />
                  <h3 className="font-bold">{comment.usuario}</h3>
                </div>
                <h3 className="font-semibold">{comment.fechaPublicacion}</h3>
              </div>
              <p>{comment.comentario}</p>
            </div>
          ))
        ) : (
          /* visualización para mostrar que no hay comentarios */
          <div className="flex justify-center items-center mb-10">
            <FaCommentSlash className="mr-3"/>
            <h2 className="font-bold">No hay ningun comentario</h2>
          </div>
        )}
      </div>
    </>
  );
};
