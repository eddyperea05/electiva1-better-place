import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PROPERTIES, type Property } from "../../data/properties";
import { applyOverrides, getOverrides, saveOverride } from "../../data/overrides";
import {PropertyEditModal} from "../components/PropertyEditModal";
import { FaWifi } from "react-icons/fa";
import { TbWash } from "react-icons/tb";
import { PiGlobeLight } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-black/10 px-4 py-3">
    <div className="text-xs text-neutral-500">{label}</div>
    <div className="font-bold">{value}</div>
  </div>
);

const Tag = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm 
      ${ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-neutral-100 text-neutral-600 border border-neutral-200"}`}
  >
    {children}
  </span>
);

export const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [overrides, setOverrides] = useState(getOverrides());
  const [openEdit, setOpenEdit] = useState(false);

  const prop: Property | undefined = useMemo(() => {
    const base = PROPERTIES.find(p => p.id === id);
    return base ? applyOverrides(base, overrides) : undefined;
  }, [id, overrides]);

  if (!prop) {
    return (
      <section className="container py-16">
        <h2 className="text-2xl font-black">Propiedad no encontrada</h2>
        <Link to="/propietario" className="inline-block mt-4 underline">← Volver a mis propiedades</Link>
      </section>
    );
  }

  // Guarda el patch del modal
  const onSavePatch = (patch: {
    titulo: string;
    ubicacion: string;
    habitaciones: number;
    banos: number;
    metros: number;
    internet: boolean;
    lavadora: boolean;
    wifi: boolean;
    precio: string;
    images: string[];
    descripcion: string;
    publicada: boolean;
  }) => {
    saveOverride(prop.id, patch);
    setOverrides(prev => ({ ...prev, [prop.id]: { ...(prev[prop.id] || {}), ...patch } }));
  };

  const onTogglePublicada = () => {
    const next = !prop.publicada;
    saveOverride(prop.id, { publicada: next });
    setOverrides(prev => ({ ...prev, [prop.id]: { ...(prev[prop.id] || {}), publicada: next } }));
  };

  return (
    <>
      {/* Cabecera */}
      <section className="bg-[#f6f7fb] py-8">
        <div className="container">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Link to="/propietario" className="inline-block text-sm text-neutral-600 underline mb-3">← Volver</Link>
              <h1 className="text-[clamp(28px,4vw,44px)] font-black">{prop.titulo}</h1>
              <p className="text-neutral-600">{prop.ubicacion}</p>
              <div className="mt-2 text-xs font-semibold">
                {prop.publicada ? (
                  <span className="text-emerald-700">HABILITADA</span>
                ) : (
                  <span className="text-neutral-500">DESHABILITADA</span>
                )}
              </div>
            </div>

            {/* Acciones: lápiz + habilitar/deshabilitar */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenEdit(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 h-11 text-sm font-semibold hover:bg-neutral-50"
                title="Editar"
              >
                <FiEdit2 /> Editar
              </button>
              <button
                onClick={onTogglePublicada}
                className={`h-11 px-4 rounded-xl border text-sm font-semibold transition
                  ${prop.publicada
                    ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                    : "border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50"}`}
              >
                {prop.publicada ? "Deshabilitar" : "Habilitar"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Galería ESTÁTICA (grid) */}
      <section className="py-6">
        <div className="container">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {prop.images.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-black/10">
                <img
                  src={src}
                  alt={`${prop.titulo} ${i + 1}`}
                  className="w-full h-[260px] sm:h-[280px] lg:h-[300px] object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Descripción + Specs */}
      <section className="py-6">
        <div className="container grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-black/10 p-5 bg-white">
              <h3 className="text-lg font-extrabold">Descripción</h3>
              <p className="mt-2 text-neutral-700 leading-relaxed">{prop.descripcion}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Spec label="Habitaciones" value={`${prop.habitaciones}`} />
              <Spec label="Baños" value={`${prop.banos}`} />
              <Spec label="Metros" value={`${prop.metros} m²`} />
              <Spec label="Precio" value={prop.precio} />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Tag ok={prop.wifi}><FaWifi /> Wi-Fi</Tag>
              <Tag ok={prop.internet}><PiGlobeLight className="text-lg" /> Internet</Tag>
              <Tag ok={prop.lavadora}><TbWash className="text-lg" /> Lavadora</Tag>
            </div>
          </div>

          {/* CTA opcional */}
          <aside className="rounded-2xl border border-black/10 p-5 bg-white">
            <div className="text-sm text-neutral-500">Arrendador</div>
            <div className="text-xl font-extrabold">Propietario • Better Place</div>
            <div className="mt-2 text-sm text-neutral-600">¿Te interesa esta propiedad? Contáctanos para más detalles.</div>
            <a
              href={`https://wa.me/573113771792?text=Hola%2C%20me%20interesa%20la%20propiedad%20${encodeURIComponent(prop.titulo)}`}
              className="btn-gradient mt-4" target="_blank" rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </aside>
        </div>
      </section>

      {/* Modal Edición */}
      <PropertyEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        property={prop}
        onSave={onSavePatch}
      />
    </>
  );
};
