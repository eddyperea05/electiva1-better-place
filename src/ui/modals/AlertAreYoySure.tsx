import type { Dispatch, SetStateAction } from "react";

export const AlertAreYouSure = ({
  handleConfirmDelete,
  setModalOpen,
  setCodeSelected,
}: {
  handleConfirmDelete: () => void;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setCodeSelected: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Fondo oscuro con opacidad */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Contenido del modal */}
        <div className="relative bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-lg font-bold mb-4">
            ¿Estás seguro de eliminar esta propiedad?
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmDelete}
              className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Sí, eliminar
            </button>
            <button
              onClick={() => {
                setModalOpen(false);
                setCodeSelected(null);
              }}
              className="cursor-pointer bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
