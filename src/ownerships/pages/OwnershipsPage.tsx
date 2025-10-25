import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { PROPERTIES, type Property } from "../../data/properties";
import { addCustomProperty, getCustomProperties } from "../../data/customProperties.tsx";
import {AddPropertyModal} from "../components/AddPropertyModal";

export const OwnershipsPage = () => {
  const currentOwnerId = "owner-1";

  const [custom, setCustom] = useState<Property[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  // Cargar desde el localStorage
  useEffect(() => {
    setCustom(getCustomProperties());
  }, []);

  // Propiedades creadas por el usuario
  const myProps = useMemo(() => {
    const base = PROPERTIES.filter(p => p.ownerId === currentOwnerId);
    const mineCustom = custom.filter(p => p.ownerId === currentOwnerId);
    return [...mineCustom, ...base];
  }, [custom]);

  const handleCreate = (p: Property) => {
    addCustomProperty(p);
    setCustom(prev => [...prev, p]);
  };

  return (
    <section className="py-10">
      <div className="container text-center">
        <h1 className="text-[clamp(28px,4vw,44px)] font-black">Mis Propiedades</h1>
        <p className="text-neutral-600 mt-1">Selecciona una propiedad para ver su detalle o crea una nueva.</p>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setOpenAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 h-11 text-sm font-semibold hover:bg-neutral-50"
          >
            + Añadir propiedad
          </button>
        </div>
      </div>

      <div className="container mt-6">
        {myProps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-10 text-center text-neutral-600">
            Aún no tienes propiedades. <button onClick={() => setOpenAdd(true)} className="underline">Crea la primera →</button>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
            {myProps.map(p => (
              <Link
                key={p.id}
                to={`/propietario/${p.id}`}
                className="rounded-2xl border border-black/10 overflow-hidden bg-white hover:shadow-lg transition"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img src={p.images[0]} alt={p.titulo} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-extrabold line-clamp-1">{p.titulo}</h3>
                  <p className="text-sm text-neutral-600 line-clamp-1">{p.ubicacion}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
       
      <AddPropertyModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={handleCreate}
        ownerId={currentOwnerId}
      />
    </section>
  );
};