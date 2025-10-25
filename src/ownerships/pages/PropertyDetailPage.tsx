import { useParams, Link } from "react-router-dom";
import { PROPERTIES } from "../../data/properties";
import { FaWifi } from "react-icons/fa";
import { TbWash } from "react-icons/tb";
import { PiGlobeLight } from "react-icons/pi";

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
  const prop = PROPERTIES.find(p => p.id === id);

  if (!prop) {
    return (
      <section className="container py-16">
        <h2 className="text-2xl font-black">Propiedad no encontrada</h2>
        <Link to="/myProperties" className="inline-block mt-4 underline">← Volver a mis propiedades</Link>
      </section>
    );
  }

  return (
    <>

      <section className="bg-[#f6f7fb] py-10">
        <div className="container">
          <Link to="/myProperties" className="inline-block text-sm text-neutral-600 underline mb-3">← Volver</Link>
          <h1 className="text-[clamp(28px,4vw,44px)] font-black">{prop.titulo}</h1>
          <p className="text-neutral-600">{prop.ubicacion}</p>
        </div>
      </section>

      <section className="py-6">
        <div className="container">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory rounded-2xl
                          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {prop.images.map((src, i) => (
              <div key={i} className="snap-start shrink-0 w-[88%] sm:w-[600px] rounded-2xl overflow-hidden border border-black/10">
                <img src={src} alt={`${prop.titulo} ${i + 1}`} className="w-full h-[320px] sm:h-[420px] object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
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

          <aside className="rounded-2xl border border-black/10 p-5 bg-white">
            <div className="text-sm text-neutral-500">Arrendador</div>
            <div className="text-xl font-extrabold">Propietario • Better Place</div>
            <div className="mt-2 text-sm text-neutral-600">¿Te interesa esta propiedad? Contáctanos para más detalles.</div>
            <a
              href={`https://wa.me/573001112233?text=Hola%2C%20me%20interesa%20la%20propiedad%20${encodeURIComponent(prop.titulo)}`}
              className="btn-gradient mt-4" target="_blank" rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </>
  );
};
