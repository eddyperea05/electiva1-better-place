import type { Property } from "./properties";

const KEY = "bp_custom_properties_v1";

export function getCustomProperties(): Property[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Property[]) : [];
  } catch {
    return [];
  }
}

function saveCustomProperties(list: Property[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addCustomProperty(p: Property) {
  const list = getCustomProperties();
  list.push(p);
  saveCustomProperties(list);
}

export function updateCustomProperty(p: Property) {
  const list = getCustomProperties();
  const idx = list.findIndex(x => x.id === p.id);
  if (idx >= 0) {
    list[idx] = p;
    saveCustomProperties(list);
  }
}

export function deleteCustomProperty(id: string) {
  const list = getCustomProperties().filter(x => x.id !== id);
  saveCustomProperties(list);
}
