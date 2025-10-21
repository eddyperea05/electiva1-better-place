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

export const MyLeasesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState();
  const [activeTab, setActiveTab] = useState("todas"); // 'todas', 'alquiladas', 'reservadas'

  const propiedades = [
    {
      nombreCasa: "Casa de Mikey",
      tipoPropiedad: "oficina",
      codigoCasa: "O853442",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      precio: 2500000,
      calificacion: 4.5,
      metrosCuadrados: 120,
      habitaciones: 3,
      baños: 2,
      parqueaderos: 2,
      cantidadComentarios: 45,
      ubicacion: "Cra 43A #14-45, El Poblado, Medellín",
      descripcion:
        "Moderna oficina en el corazón de El Poblado, perfecta para equipos creativos. Espacios amplios y luminosos con vista panorámica.",
      amenidades: [
        "WiFi de alta velocidad",
        "Aire acondicionado",
        "Seguridad 24/7",
        "Parqueadero visitantes",
      ],
      arrendatario: {
        nombre: "María González Pérez",
        email: "maria.gonzalez@email.com",
        telefono: "+57 300 123 4567",
      },
      contrato: {
        fechaInicio: "2024-10-01",
        fechaFin: "2024-10-15",
        duracion: "15 días",
        estadoPago: "al día",
      },
    },
    {
      nombreCasa: "Apartamento Vista Hermosa",
      tipoPropiedad: "apartamento",
      codigoCasa: "A123456",
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      precio: 1800000,
      calificacion: 4.8,
      metrosCuadrados: 85,
      habitaciones: 2,
      baños: 2,
      parqueaderos: 1,
      cantidadComentarios: 67,
      ubicacion: "Calle 10 Sur #48-56, Envigado",
      descripcion:
        "Acogedor apartamento con excelente iluminación natural. Zona tranquila cerca de centros comerciales y transporte público.",
      amenidades: ["Gimnasio", "Piscina", "Zona BBQ", "Parque infantil"],
      arrendatario: {
        nombre: "Carlos Ramírez Torres",
        email: "carlos.ramirez@email.com",
        telefono: "+57 301 987 6543",
      },
      contrato: {
        fechaInicio: "2024-10-10",
        fechaFin: "2024-10-17",
        duracion: "7 días",
        estadoPago: "al día",
      },
    },
    {
      nombreCasa: "Casa Campestre Los Pinos",
      tipoPropiedad: "casa",
      codigoCasa: "C789012",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      precio: 3200000,
      calificacion: 4.9,
      metrosCuadrados: 200,
      habitaciones: 4,
      baños: 3,
      parqueaderos: 3,
      cantidadComentarios: 89,
      ubicacion: "Vereda El Escobero, Envigado",
      descripcion:
        "Hermosa casa campestre con amplio jardín y zona verde. Perfecta para familias que buscan tranquilidad y naturaleza.",
      amenidades: [
        "Jardín privado",
        "Chimenea",
        "Zona BBQ",
        "Vista panorámica",
      ],
      arrendatario: {
        nombre: "Andrea Martínez Silva",
        email: "andrea.martinez@email.com",
        telefono: "+57 302 456 7890",
      },
      contrato: {
        fechaInicio: "2024-10-05",
        fechaFin: "2024-10-25",
        duracion: "20 días",
        estadoPago: "pendiente",
      },
    },
    {
      nombreCasa: "Loft Moderno Laureles",
      tipoPropiedad: "loft",
      codigoCasa: "L345678",
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      precio: 2100000,
      calificacion: 4.6,
      metrosCuadrados: 95,
      habitaciones: 1,
      baños: 1,
      parqueaderos: 1,
      cantidadComentarios: 34,
      ubicacion: "Cra 70 #45-23, Laureles, Medellín",
      descripcion:
        "Loft de diseño contemporáneo con acabados de lujo. Ideal para profesionales o parejas jóvenes que valoran el estilo.",
      amenidades: ["WiFi", "Aire acondicionado", "Cocina equipada", "Gimnasio"],
      arrendatario: {
        nombre: "Roberto Sánchez López",
        email: "roberto.sanchez@email.com",
        telefono: "+57 303 234 5678",
      },
      contrato: {
        fechaInicio: "2024-10-12",
        fechaFin: "2024-10-19",
        duracion: "7 días",
        estadoPago: "al día",
      },
    },
    {
      nombreCasa: "Penthouse Premium",
      tipoPropiedad: "penthouse",
      codigoCasa: "P901234",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      precio: 4500000,
      calificacion: 5.0,
      metrosCuadrados: 180,
      habitaciones: 3,
      baños: 3,
      parqueaderos: 2,
      cantidadComentarios: 102,
      ubicacion: "Calle 7 Sur #42-70, El Poblado, Medellín",
      descripcion:
        "Exclusivo penthouse con terraza privada y jacuzzi. Vistas espectaculares de la ciudad, lujo y confort en cada detalle.",
      amenidades: ["Jacuzzi", "Terraza privada", "Smart Home", "Conserjería"],
      arrendatario: {
        nombre: "Laura Gutiérrez Mendoza",
        email: "laura.gutierrez@email.com",
        telefono: "+57 304 876 5432",
      },
      contrato: {
        fechaInicio: "2024-10-08",
        fechaFin: "2024-11-08",
        duracion: "30 días",
        estadoPago: "al día",
      },
    },
  ];

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
