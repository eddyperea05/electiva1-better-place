import type { Property } from "./properties";

const KEY = "bp_property_overrides_v1";

export type PropertyOverride = Partial<
  Pick<Property, "titulo" | "precio" | "descripcion" | "publicada" | "banos" | "internet" | "lavadora" | "metros" | "wifi" | "ubicacion" >
>;
type Store = Record<string, PropertyOverride>; // id -> overrides

function readStore(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}
function writeStore(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function getOverrides(): Store {
  return readStore();
}

export function applyOverrides(base: Property, store: Store): Property {
  const ov = store[base.id] || {};
  return { ...base, ...ov };
}

export function saveOverride(id: string, patch: PropertyOverride) {
  const store = readStore();
  store[id] = { ...(store[id] || {}), ...patch };
  writeStore(store);
}
