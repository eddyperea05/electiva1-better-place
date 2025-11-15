import type { PropiedadInterface } from "../../properties/types/propertyType";

export const PropertyCard = ({
  property,
  index,
  onDeleteRequest,
  onEditRequest,
}: {
  property: PropiedadInterface;
  index: number;
  onDeleteRequest: () => void;
  onEditRequest: () => void;
}) => {
  return (
    <div className="flex mt-4 justify-between items-center outline-1 outline-black rounded-sm p-2">
      <span className="mr-2 font-bold">{index + 1}</span>
      <div className="flex items-center w-full">
        <button className="cursor-pointer">
          <img
            src={property.image}
            className="w-15 h-15 object-cover rounded-md"
          />
        </button>
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center ">
            <h2 className="capitalize font-bold">código</h2>
            <span className="uppercase">{property.code}</span>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="capitalize font-bold">nombre</h2>
            <span className="capitalize">{property.name}</span>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="capitalize font-bold">propietario</h2>
            <span className="capitalize">{property.lessee.name}</span>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="capitalize font-bold">dirección</h2>
            <span className="capitalize">{property.address}</span>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="capitalize font-bold">estado</h2>
            <span className="capitalize">{property.status}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          <button
            onClick={onEditRequest}
            className="cursor-pointer mr-3 outline-1 outline-yellow-700 bg-yellow-300 text-yellow-700 py-2 px-3 rounded-sm"
          >
            Editar
          </button>
          <button
            onClick={onDeleteRequest}
            className="cursor-pointer mr-3 outline-1 outline-red-500 bg-red-300 text-red-500 py-2 px-3 rounded-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
