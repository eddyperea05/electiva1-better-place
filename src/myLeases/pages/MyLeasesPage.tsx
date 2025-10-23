import { useState } from "react";
import propiedades from "../../mocks/propiedades.json";
import { PropertyModal } from "../components/PropertyModal";
import { PropertyCard } from "../components/PropertyCard";

export const MyLeasesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);


  // Filtrar solo propiedades arrendadas
  const propiedadesArrendadas = propiedades.filter(
    (prop) => prop.estado === "arrendada"
  );

  return (
    <div className="min-h-screen bg-white">

      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
            Mis Propiedades Arrendadas
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Gestiona y monitorea tus propiedades actualmente arrendadas
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black">
              {propiedadesArrendadas.length}{" "}
              {propiedadesArrendadas.length === 1
                ? "Propiedad Arrendada"
                : "Propiedades Arrendadas"}
            </h2>
          </div>


                
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propiedadesArrendadas.map((propiedad, index) => (
              <PropertyCard
                key={index}
                propiedad={propiedad}
                onClick={setSelectedProperty}
              />
            ))}
          </div>
        </div>
      </section>


      {selectedProperty && (
        <PropertyModal
          propiedad={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};
