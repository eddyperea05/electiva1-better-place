import { PROPERTIES } from "../../data/properties";
import { PropertyCard } from "../components/PropertyCard";

export const MyProperties = () => {
  const currentOwnerId = "owner-1";
  const myProps = PROPERTIES.filter(p => p.ownerId === currentOwnerId);

  return (
    <section className="py-10">
      <div className="container text-center">
        <h1 className="text-[clamp(28px,4vw,44px)] font-black">Mis Propiedades</h1>
        <p className="text-neutral-600 mt-1">Selecciona una propiedad para ver su detalle</p>
      </div>

      <div className="mt-6">
        <div className="container">
          <div className="flex flex-wrap items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
            {myProps.map(p => <PropertyCard key={p.id} data={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProperties;
