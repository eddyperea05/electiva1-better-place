import {
  X,
  Star,
  MapPin,
  Bed,
  Bath,
  Car,
  Square,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { getPropertyIcon } from "../../utils/getPropertyIcon";
import { formatPrice } from "../../utils/formatPrice";

export const PropertyModal = ({ propiedad, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-96">
          <img
            src={propiedad.img}
            alt={propiedad.nombreCasa}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-6 left-6 px-4 py-2 rounded-full text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #2A1EFA 0%, #721EFA 100%)",
            }}
          >
            {getPropertyIcon(propiedad.tipoPropiedad)}{" "}
            {propiedad.tipoPropiedad.toUpperCase()}
          </div>
          <div className="absolute top-6 right-6 px-4 py-2 bg-green-500 text-white rounded-full font-semibold">
            ✓ Arrendada
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold mb-2 text-black">
                {propiedad.nombreCasa}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" style={{ color: "#2A1EFA" }} />
                <span>{propiedad.ubicacion}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                COD: {propiedad.codigoCasa}
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-black">
                {formatPrice(propiedad.precio)}
              </p>
              <p className="text-gray-500">por mes</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-black">
              Información del Arrendatario (Dueño de la propiedad)
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #2A1EFA 0%, #721EFA 100%)",
                  }}
                >
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Nombre Completo</p>
                  <p className="font-semibold text-black">
                    {propiedad.arrendatario.nombre}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #721EFA 0%, #BA1EFA 100%)",
                  }}
                >
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-black text-sm">
                    {propiedad.arrendatario.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #BA1EFA 0%, #2A1EFA 100%)",
                  }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Teléfono</p>
                  <p className="font-semibold text-black">
                    {propiedad.arrendatario.telefono}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-black">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">
              {propiedad.descripcion}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Bed
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#2A1EFA" }}
              />
              <p className="text-2xl font-bold text-black">
                {propiedad.habitaciones}
              </p>
              <p className="text-sm text-gray-600">Habitaciones</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Bath
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#721EFA" }}
              />
              <p className="text-2xl font-bold text-black">{propiedad.baños}</p>
              <p className="text-sm text-gray-600">Baños</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Car
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#BA1EFA" }}
              />
              <p className="text-2xl font-bold text-black">
                {propiedad.parqueaderos}
              </p>
              <p className="text-sm text-gray-600">Parqueaderos</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Square
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#52387B" }}
              />
              <p className="text-2xl font-bold text-black">
                {propiedad.metrosCuadrados}
              </p>
              <p className="text-sm text-gray-600">m²</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Star
              className="w-6 h-6 fill-current"
              style={{ color: "#2A1EFA" }}
            />
            <span className="font-bold text-xl text-black">
              {propiedad.calificacion}
            </span>
            <span className="text-gray-500">
              ({propiedad.cantidadComentarios} comentarios)
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-black">Amenidades</h3>
            <div className="grid grid-cols-2 gap-3">
              {propiedad.amenidades.map((amenidad: [], idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#2A1EFA" }}
                  ></div>
                  <span className="text-gray-700">{amenidad}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
