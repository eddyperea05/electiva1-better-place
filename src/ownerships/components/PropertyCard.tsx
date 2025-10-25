import { Link } from "react-router-dom";
import type { Property } from "../../data/properties";

type Props = { data: Property };

export const PropertyCard = ({ data }: Props) => {
  const cover = data.images[0];

  return (
    <Link
      to={`/propietario/${data.id}`}
      className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-black/10 overflow-hidden bg-white hover:shadow-lg transition"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={cover}
          alt={data.titulo}
          className="w-full h-full object-cover hover:scale-[1.03] transition"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-extrabold line-clamp-1">{data.titulo}</h3>
        <p className="text-sm text-neutral-600 line-clamp-1">{data.ubicacion}</p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-neutral-700">
          <div className="rounded-xl bg-neutral-100 px-2 py-1 text-center">{data.habitaciones} hab</div>
          <div className="rounded-xl bg-neutral-100 px-2 py-1 text-center">{data.banos} baños</div>
          <div className="rounded-xl bg-neutral-100 px-2 py-1 text-center">{data.metros} m²</div>
        </div>

        <div className="mt-3 font-bold bg-linear-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          {data.precio}
        </div>
      </div>
    </Link>
  );
};
