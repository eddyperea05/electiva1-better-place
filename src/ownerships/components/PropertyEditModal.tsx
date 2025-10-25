import { useEffect, useMemo, useState } from "react";
import type { Property } from "../../data/properties";

type Patch = {
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
};

type Props = {
  open: boolean;
  onClose: () => void;
  property: Property;
  onSave: (patch: Patch) => void;
};

function toMultiline(images: string[]) {
  return images.join("\n");
}
function parseImages(input: string): string[] {
  // acepta separador por nueva línea o coma
  return input
    .split(/\n|,/)
    .map(s => s.trim())
    .filter(Boolean);
}

export const PropertyEditModal = ({ open, onClose, property, onSave }: Props) => {
  const [titulo, setTitulo] = useState(property.titulo);
  const [ubicacion, setUbicacion] = useState(property.ubicacion);
  const [habitaciones, setHabitaciones] = useState<number>(property.habitaciones);
  const [banos, setBanos] = useState<number>(property.banos);
  const [metros, setMetros] = useState<number>(property.metros);
  const [internet, setInternet] = useState<boolean>(property.internet);
  const [lavadora, setLavadora] = useState<boolean>(property.lavadora);
  const [wifi, setWifi] = useState<boolean>(property.wifi);
  const [precio, setPrecio] = useState(property.precio);
  const [imagesText, setImagesText] = useState<string>(toMultiline(property.images));
  const [descripcion, setDescripcion] = useState(property.descripcion);
  const [publicada, setPublicada] = useState<boolean>(property.publicada);

  // Reset cuando se abre con otra propiedad
  useEffect(() => {
    if (open) {
      setTitulo(property.titulo);
      setUbicacion(property.ubicacion);
      setHabitaciones(property.habitaciones);
      setBanos(property.banos);
      setMetros(property.metros);
      setInternet(property.internet);
      setLavadora(property.lavadora);
      setWifi(property.wifi);
      setPrecio(property.precio);
      setImagesText(toMultiline(property.images));
      setDescripcion(property.descripcion);
      setPublicada(property.publicada);
    }
  }, [open, property]);

  const isValidNumbers = useMemo(() => {
    return (
      Number.isFinite(habitaciones) &&
      Number.isFinite(banos) &&
      Number.isFinite(metros) &&
      habitaciones >= 0 && banos >= 0 && metros >= 0
    );
  }, [habitaciones, banos, metros]);

  if (!open) return null;

  const handleSave = () => {
    const imgs = parseImages(imagesText);
    const patch: Patch = {
      titulo: titulo.trim(),
      ubicacion: ubicacion.trim(),
      habitaciones: Number(habitaciones) || 0,
      banos: Number(banos) || 0,
      metros: Number(metros) || 0,
      internet: Boolean(internet),
      lavadora: Boolean(lavadora),
      wifi: Boolean(wifi),
      precio: precio.trim(),
      images: imgs,
      descripcion: descripcion.trim(),
      publicada: Boolean(publicada),
    };
    onSave(patch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold">Editar propiedad</h3>
          <button onClick={onClose} className="text-sm text-neutral-500 hover:underline">Cerrar</button>
        </div>

        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Columna 1 */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-neutral-600">Título</span>
              <input
                className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                value={titulo} onChange={e => setTitulo(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-600">Ubicación</span>
              <input
                className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                value={ubicacion} onChange={e => setUbicacion(e.target.value)}
              />
            </label>

            <div className="grid grid-cols-3 gap-3">
              <label className="block">
                <span className="text-sm text-neutral-600">Habitaciones</span>
                <input
                  type="number" min={0}
                  className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                  value={habitaciones}
                  onChange={e => setHabitaciones(parseInt(e.target.value || "0", 10))}
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-600">Baños</span>
                <input
                  type="number" min={0}
                  className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                  value={banos}
                  onChange={e => setBanos(parseInt(e.target.value || "0", 10))}
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-600">Metros (m²)</span>
                <input
                  type="number" min={0}
                  className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                  value={metros}
                  onChange={e => setMetros(parseInt(e.target.value || "0", 10))}
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-neutral-600">Precio</span>
              <input
                className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                value={precio} onChange={e => setPrecio(e.target.value)}
              />
            </label>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            <fieldset className="rounded-2xl border border-neutral-200 p-3">
              <legend className="text-sm text-neutral-600 px-1">Servicios</legend>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={internet} onChange={e => setInternet(e.target.checked)} />
                  Internet
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={wifi} onChange={e => setWifi(e.target.checked)} />
                  Wi-Fi
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={lavadora} onChange={e => setLavadora(e.target.checked)} />
                  Lavadora
                </label>
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm text-neutral-600">Imágenes (una por línea o separadas por coma)</span>
              <textarea
                className="mt-1 w-full min-h-[120px] rounded-xl border border-neutral-200 p-3 outline-none focus:ring-4 focus:ring-violet-200"
                value={imagesText}
                onChange={e => setImagesText(e.target.value)}
                placeholder="https://...jpg
https://...jpg"
              />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-600">Descripción</span>
              <textarea
                className="mt-1 w-full min-h-[120px] rounded-xl border border-neutral-200 p-3 outline-none focus:ring-4 focus:ring-violet-200"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={publicada} onChange={e => setPublicada(e.target.checked)} />
              Publicada
            </label>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="h-11 px-4 rounded-xl border border-neutral-300 text-neutral-700">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!isValidNumbers}
            className={`btn-gradient h-11 ${!isValidNumbers ? "opacity-60 cursor-not-allowed" : ""}`}
            title={!isValidNumbers ? "Revisa los valores numéricos" : undefined}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};