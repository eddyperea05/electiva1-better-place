//imports de iconos
import { useEffect, useState } from "react";
import { FaCommentSlash } from "react-icons/fa";
import { getCommentsByCodeHouse } from "../../firebase/functions/functionsPropertiesFirebase";

export const CommentsComponent = ({ codeHouse }: { codeHouse: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      const data = await getCommentsByCodeHouse(codeHouse);
      setComments(data);
      setLoading(false);
    };

    loadComments();
  }, [codeHouse]);

  if (loading) return <p className="text-gray-400">Cargando comentarios...</p>;

  return (
    <>
      <div>
        {/* verificamos si hay comentarios, sino mostramos que no hay comentarios */}
        {comments.length > 0 ? (
          /* iteramos sobre los comentarios que estan en el array */
          comments.map((comment, index) => (
            <div key={index} className="mb-7">
              <div className="flex justify-between">
                <div className="flex justify-center items-center mb-6">
                  <img
                    className="outline outline-[#2A1EFA] p-1 rounded-full mr-3 w-15"
                    src={comment.image}
                  />
                  <h3 className="font-bold text-gray-500">{comment.userName}</h3>
                </div>
                <h3 className="font-semibold text-gray-500">
                  {comment.publicationDate}
                </h3>
              </div>
              <p className="text-gray-500">{comment.comment}</p>
            </div>
          ))
        ) : (
          /* visualización para mostrar que no hay comentarios */
          <div className="flex justify-center items-center mb-10">
            <FaCommentSlash className="mr-3 text-gray-400" />
            <h2 className="font-bold text-gray-400">
              No hay ningun comentario
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
