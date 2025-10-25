export type Property = {
  id: string;
  ownerId: string;
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
};

export const PROPERTIES: Property[] = [
  {
    id: "bp-101",
    ownerId: "owner-1",
    titulo: "Loft moderno en El Poblado",
    ubicacion: "Medellín, Colombia",
    habitaciones: 2, banos: 2, metros: 78,
    internet: true, lavadora: true, wifi: true,
    precio: "$3.200.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-102",
    ownerId: "owner-1",
    titulo: "Apartamento con vista",
    ubicacion: "Envigado, Colombia",
    habitaciones: 3, banos: 2, metros: 96,
    internet: true, lavadora: true, wifi: true,
    precio: "$3.900.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475855581698-495ebc9de62f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-103",
    ownerId: "owner-1",
    titulo: "Estudio minimalista",
    ubicacion: "Laureles, Medellín",
    habitaciones: 1, banos: 1, metros: 48,
    internet: true, lavadora: false, wifi: true,
    precio: "$2.100.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-104",
    ownerId: "owner-1",
    titulo: "Dúplex luminoso",
    ubicacion: "Sabaneta, Colombia",
    habitaciones: 3, banos: 3, metros: 110,
    internet: true, lavadora: true, wifi: true,
    precio: "$4.200.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475855581698-495ebc9de62f?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-105",
    ownerId: "owner-1",
    titulo: "Penthouse con terraza",
    ubicacion: "Poblado, Medellín",
    habitaciones: 4, banos: 3, metros: 160,
    internet: true, lavadora: true, wifi: true,
    precio: "$8.500.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1523419409543-a7e3a56a8f54?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-106",
    ownerId: "owner-1",
    titulo: "Casa familiar con jardín",
    ubicacion: "Envigado, Colombia",
    habitaciones: 4, banos: 3, metros: 140,
    internet: true, lavadora: true, wifi: true,
    precio: "$5.800.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1507086181673-3e5c8a3b4c8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-107",
    ownerId: "owner-1",
    titulo: "Apto estudio con balcón",
    ubicacion: "Belén, Medellín",
    habitaciones: 1, banos: 1, metros: 45,
    internet: true, lavadora: false, wifi: true,
    precio: "$1.900.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-108",
    ownerId: "owner-1",
    titulo: "Apto amoblado ejecutivo",
    ubicacion: "Laureles, Medellín",
    habitaciones: 2, banos: 2, metros: 72,
    internet: true, lavadora: true, wifi: true,
    precio: "$3.400.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527030280862-64139fba04ca?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300176565-45a6c58ef5f4?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-109",
    ownerId: "owner-1",
    titulo: "Suite compacta céntrica",
    ubicacion: "Centro, Medellín",
    habitaciones: 1, banos: 1, metros: 36,
    internet: true, lavadora: false, wifi: true,
    precio: "$1.600.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b06?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-110",
    ownerId: "owner-1",
    titulo: "Dúplex industrial chic",
    ubicacion: "Manila, Medellín",
    habitaciones: 2, banos: 2, metros: 88,
    internet: true, lavadora: true, wifi: true,
    precio: "$4.000.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1444419988131-046ed4e5ffd6?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-111",
    ownerId: "owner-1",
    titulo: "Apto nuevo con cowork",
    ubicacion: "Itagüí, Colombia",
    habitaciones: 2, banos: 2, metros: 68,
    internet: true, lavadora: true, wifi: true,
    precio: "$2.700.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "bp-112",
    ownerId: "owner-1",
    titulo: "Casa campestre",
    ubicacion: "Rionegro, Colombia",
    habitaciones: 3, banos: 2, metros: 120,
    internet: true, lavadora: true, wifi: true,
    precio: "$6.300.000 / mes",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];
