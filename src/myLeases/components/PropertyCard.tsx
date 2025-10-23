import { Star, MapPin, Bed, Bath, Car, User } from "lucide-react";
import { getPropertyIcon } from "../../utils/getPropertyIcon";
import { formatPrice } from "../../utils/formatPrice";

export const PropertyCard = ({ propiedad, onClick }) => {
  return (
    <div
      onClick={() => onClick(propiedad)}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={propiedad.img}
          alt={propiedad.nombreCasa}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-sm font-semibold flex items-center gap-1">
          <span>{getPropertyIcon(propiedad.tipoPropiedad)}</span>
          <span className="capitalize">{propiedad.tipoPropiedad}</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
          Arrendada
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-black group-hover:text-gray-900">
          {propiedad.nombreCasa}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-gray-600">
          <MapPin
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "#2A1EFA" }}
          />
          <span className="text-sm line-clamp-1">{propiedad.ubicacion}</span>
        </div>

        <div className="mb-4 pb-4 border-b border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Arrendatario Actual</p>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" style={{ color: "#2A1EFA" }} />
            <span className="text-sm font-semibold text-black">
              {propiedad.arrendatario.nombre}
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{propiedad.habitaciones}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{propiedad.baños}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Car className="w-4 h-4" />
            <span className="text-sm">{propiedad.parqueaderos}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-black">
              {formatPrice(propiedad.precio)}
            </p>
            <p className="text-xs text-gray-500">por mes</p>
          </div>
          <div className="flex items-center gap-1">
            <Star
              className="w-5 h-5 fill-current"
              style={{ color: "#2A1EFA" }}
            />
            <span className="font-bold text-black">
              {propiedad.calificacion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
