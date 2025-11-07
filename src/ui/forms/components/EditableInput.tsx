import { useState } from "react";

//Impots iconos
import { FaPencilAlt } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";

/* Se trae el valor, el nombre y la función que nos permite actualizar desde el padre */
export const EditableInput = ({
  value,
  name,
  onChange,
}: {
  value: string;
  name: string;
  onChange: (name: string, value: string) => void;
}) => {

  //Hook para saber que botón poner
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  //Función para cambiar el tipo de botón
  const handleEditingAndNoEditing = () => {
    setIsEditing(!isEditing);
  };

  // De la función que nos traemos del padre para lso campos le enviamos el nombre y el evento
  const handleOnChangeEditableInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="flex w-full mr-6 mb-5">
      <input
        className="outline-2 outline-gray-300 rounded-sm w-full h-10 mr-4 px-3"
        value={value}
        disabled={!isEditing}
        onChange={handleOnChangeEditableInput}
        type="text"
      />
      {/* Con este booleano cambiamos el botón */}
      {!isEditing ? (
        <button
          onClick={handleEditingAndNoEditing}
          className="bg-[#2A1EFA] p-2 rounded-sm"
        >
          <FaPencilAlt className="text-white" />
        </button>
      ) : (
        <button
          onClick={handleEditingAndNoEditing}
          className="bg-red-600 p-2 rounded-sm"
        >
          <TbCancel className="text-white" />
        </button>
      )}
    </div>
  );
};
