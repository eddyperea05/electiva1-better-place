import { useEffect, useMemo, useState } from "react";
import type { Property } from "../../data/properties";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (p: Property) => void;
  ownerId: string; 
};

function parseImages(input: string): string[] {
  return input
    .split(/\n|,/)
    .map(s => s.trim())
    .filter(Boolean);
}

export const AddPropertyModal = ({ open, onClose, onCreate, ownerId }: Props) => {
  const [titulo, setTitulo] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [habitaciones, setHabitaciones] = useState<number>(0);
  const [banos, setBanos] = useState<number>(0);
  const [metros, setMetros] = useState<number>(0);
  const [internet, setInternet] = useState<boolean>(true);
  const [lavadora, setLavadora] = useState<boolean>(false);
  const [wifi, setWifi] = useState<boolean>(true);
  const [precio, setPrecio] = useState<string>("");
  const [imagesText, setImagesText] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [publicada, setPublicada] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      // reset al abrir
      setTitulo("");
      setUbicacion("");
      setHabitaciones(0);
      setBanos(0);
      setMetros(0);
      setInternet(true);
      setLavadora(false);
      setWifi(true);
      setPrecio("");
      setImagesText("");
      setDescripcion("");
      setPublicada(true);
    }
  }, [open]);

  const validNumbers = useMemo(
    () => habitaciones >= 0 && banos >= 0 && metros >= 0,
    [habitaciones, banos, metros]
  );
  const validRequired = useMemo(
    () => titulo.trim() && ubicacion.trim() && precio.trim() && imagesText.trim(),
    [titulo, ubicacion, precio, imagesText]
  );

  if (!open) return null;

  const handleCreate = () => {
    const images = parseImages(imagesText);
    const id = `bp-local-${Math.random().toString(36).slice(2, 8)}`;
    const payload: Property = {
      id,
      ownerId,
      titulo: titulo.trim(),
      ubicacion: ubicacion.trim(),
      habitaciones: Number(habitaciones) || 0,
      banos: Number(banos) || 0,
      metros: Number(metros) || 0,
      internet: Boolean(internet),
      lavadora: Boolean(lavadora),
      wifi: Boolean(wifi),
      precio: precio.trim(),
      images,
      descripcion: descripcion.trim(),
      publicada: Boolean(publicada),
    };
    onCreate(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold">Añadir nueva propiedad</h3>
          <button onClick={onClose} className="text-sm text-neutral-500 hover:underline">Cerrar</button>
        </div>

        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-neutral-600">Título*</span>
              <input className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                     value={titulo} onChange={e => setTitulo(e.target.value)} />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-600">Ubicación*</span>
              <input className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                     value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
            </label>

            <div className="grid grid-cols-3 gap-3">
              <label className="block">
                <span className="text-sm text-neutral-600">Habitaciones</span>
                <input type="number" min={0} className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                       value={habitaciones} onChange={e => setHabitaciones(parseInt(e.target.value || "0", 10))} />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-600">Baños</span>
                <input type="number" min={0} className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                       value={banos} onChange={e => setBanos(parseInt(e.target.value || "0", 10))} />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-600">Metros (m²)</span>
                <input type="number" min={0} className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                       value={metros} onChange={e => setMetros(parseInt(e.target.value || "0", 10))} />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-neutral-600">Precio*</span>
              <input className="mt-1 w-full h-11 rounded-xl border border-neutral-200 px-3 outline-none focus:ring-4 focus:ring-violet-200"
                     value={precio} onChange={e => setPrecio(e.target.value)} />
            </label>
          </div>

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
              <span className="text-sm text-neutral-600">Imágenes* (una por línea o separadas por coma)</span>
              <textarea className="mt-1 w-full min-h-[120px] rounded-xl border border-neutral-200 p-3 outline-none focus:ring-4 focus:ring-violet-200"
                        value={imagesText} onChange={e => setImagesText(e.target.value)}
                        placeholder="https://...jpg
https://...jpg" />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-600">Descripción</span>
              <textarea className="mt-1 w-full min-h-[120px] rounded-xl border border-neutral-200 p-3 outline-none focus:ring-4 focus:ring-violet-200"
                        value={descripcion} onChange={e => setDescripcion(e.target.value)} />
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
            onClick={handleCreate}
            disabled={!validNumbers || !validRequired}
            className={`btn-gradient h-11 ${(!validNumbers || !validRequired) ? "opacity-60 cursor-not-allowed" : ""}`}
            title={!validRequired ? "Completa los campos obligatorios" : undefined}
          >
            Crear propiedad
          </button>
        </div>
      </div>
    </div>
  );
};