import React, { useState } from "react";
import {
  X,
  Star,
  MapPin,
  Calendar,
  Bed,
  Bath,
  Car,
  Square,
  User,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";

import propiedades from "../../mocks/propiedades.json";

export const MyLeasesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState();
  const [activeTab, setActiveTab] = useState("todas"); // 'todas', 'alquiladas', 'reservadas'

  //const propiedades =

  const sortedProperties = [...propiedades].sort((a, b) => {
    return new Date(b.contrato.fechaInicio) - new Date(a.contrato.fechaInicio);
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyIcon = (tipo) => {
    const icons = {
      oficina: "🏢",
      apartamento: "🏬",
      casa: "🏡",
      loft: "🏙️",
      penthouse: "🏰",
    };
    return icons[tipo] || "🏠";
  };

  const getDaysRemaining = (fechaFin) => {
    const today = new Date();
    const endDate = new Date(fechaFin);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
            Mis Propiedades Arrendadas
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Gestiona y monitorea tus propiedades actualmente en renta
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black">
              {sortedProperties.length}{" "}
              {sortedProperties.length === 1
                ? "Propiedad Activa"
                : "Propiedades Activas"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((propiedad, index) => (
              <div
                key={index}
                onClick={() => setSelectedProperty(propiedad)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={propiedad.img}
                    alt={propiedad.nombreCasa}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-sm font-semibold flex items-center gap-1">
                    <span>{getPropertyIcon(propiedad.tipoPropiedad)}</span>
                    <span className="capitalize">
                      {propiedad.tipoPropiedad}
                    </span>
                  </div>
                  {propiedad.contrato.estadoPago === "pendiente" && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                      Pago Pendiente
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-black group-hover:text-gray-900">
                    {propiedad.nombreCasa}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <MapPin
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "#2A1EFA" }}
                    />
                    <span className="text-sm line-clamp-1">
                      {propiedad.ubicacion}
                    </span>
                  </div>

                  {/* Arrendatario Info */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">
                      Arrendatario Actual
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4" style={{ color: "#2A1EFA" }} />
                      <span className="text-sm font-semibold text-black">
                        {propiedad.arrendatario.nombre}
                      </span>
                    </div>
                  </div>

                  {/* Contract Dates */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-semibold text-black">
                        {formatDate(propiedad.contrato.fechaInicio)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-semibold text-black">
                        {formatDate(propiedad.contrato.fechaFin)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Clock className="w-4 h-4" style={{ color: "#721EFA" }} />
                      <span className="text-sm text-gray-600">
                        {getDaysRemaining(propiedad.contrato.fechaFin) > 0
                          ? `${getDaysRemaining(
                              propiedad.contrato.fechaFin
                            )} días restantes`
                          : "Finalizado"}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-2xl font-bold text-black">
                        {formatPrice(propiedad.precio)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {propiedad.contrato.duracion}
                      </p>
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
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProperty && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6 overflow-y-auto"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProperty(null)}
              className="sticky top-4 right-4 float-right z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative h-96">
              <img
                src={selectedProperty.img}
                alt={selectedProperty.nombreCasa}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-6 left-6 px-4 py-2 rounded-full text-white font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #2A1EFA 0%, #721EFA 100%)",
                }}
              >
                {getPropertyIcon(selectedProperty.tipoPropiedad)}{" "}
                {selectedProperty.tipoPropiedad.toUpperCase()}
              </div>
              {selectedProperty.contrato.estadoPago === "pendiente" && (
                <div className="absolute top-6 right-6 px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold">
                  ⚠️ Pago Pendiente
                </div>
              )}
            </div>
            <br />
            <br />
            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2 text-black">
                    {selectedProperty.nombreCasa}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" style={{ color: "#2A1EFA" }} />
                    <span>{selectedProperty.ubicacion}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Código: {selectedProperty.codigoCasa}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-black">
                    {formatPrice(selectedProperty.precio)}
                  </p>
                  <p className="text-gray-500">
                    {selectedProperty.contrato.duracion}
                  </p>
                </div>
              </div>

              {/* Arrendatario Info Card */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-black">
                  Información del Arrendatario
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
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
                        {selectedProperty.arrendatario.nombre}
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
                      <p className="font-semibold text-black">
                        {selectedProperty.arrendatario.email}
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
                        {selectedProperty.arrendatario.telefono}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #52387B 0%, #721EFA 100%)",
                      }}
                    >
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Estado de Pago</p>
                      <p
                        className={`font-semibold ${
                          selectedProperty.contrato.estadoPago === "al día"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {selectedProperty.contrato.estadoPago === "al día"
                          ? "✓ Al día"
                          : "⚠️ Pendiente"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Dates */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar
                      className="w-6 h-6"
                      style={{ color: "#2A1EFA" }}
                    />
                    <h4 className="font-bold text-black">Fecha de Inicio</h4>
                  </div>
                  <p className="text-3xl font-bold text-black">
                    {formatDate(selectedProperty.contrato.fechaInicio)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Check-in</p>
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar
                      className="w-6 h-6"
                      style={{ color: "#BA1EFA" }}
                    />
                    <h4 className="font-bold text-black">
                      Fecha de Finalización
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-black">
                    {formatDate(selectedProperty.contrato.fechaFin)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Check-out</p>
                </div>
              </div>

              {/* Property Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-black">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProperty.descripcion}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Bed
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#2A1EFA" }}
                  />
                  <p className="text-2xl font-bold text-black">
                    {selectedProperty.habitaciones}
                  </p>
                  <p className="text-sm text-gray-600">Habitaciones</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Bath
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#721EFA" }}
                  />
                  <p className="text-2xl font-bold text-black">
                    {selectedProperty.baños}
                  </p>
                  <p className="text-sm text-gray-600">Baños</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Car
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#BA1EFA" }}
                  />
                  <p className="text-2xl font-bold text-black">
                    {selectedProperty.parqueaderos}
                  </p>
                  <p className="text-sm text-gray-600">Parqueaderos</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Square
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#52387B" }}
                  />
                  <p className="text-2xl font-bold text-black">
                    {selectedProperty.metrosCuadrados}
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
                  {selectedProperty.calificacion}
                </span>
                <span className="text-gray-500">
                  ({selectedProperty.cantidadComentarios} comentarios)
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  Amenidades
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProperty.amenidades.map((amenidad, idx) => (
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
      )}
    </div>
  );
};
