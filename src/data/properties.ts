import property1Image from "@/assets/property-1.jpg";

export interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
  guests: number;
  bedrooms: number;
  beds: number;
  price: number;
  image: string;
  whatsappLink: string;
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Villa Mediterránea",
    location: "Puerta de Hierro",
    city: "Guadalajara",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    price: 2800,
    image: property1Image,
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Villa%20Mediterránea"
  },
  {
    id: 2,
    name: "Loft Industrial Condesa",
    location: "Condesa",
    city: "Ciudad de México",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 1950,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Loft%20Industrial%20Condesa"
  },
  {
    id: 3,
    name: "Penthouse Vista al Mar",
    location: "Zona Hotelera",
    city: "Cancún",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    price: 4500,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Penthouse%20Vista%20al%20Mar"
  },
  {
    id: 4,
    name: "Casa Colonial Centro",
    location: "Centro Histórico",
    city: "Oaxaca",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 1600,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Casa%20Colonial%20Centro"
  },
  {
    id: 5,
    name: "Studio Minimalista Roma",
    location: "Roma Norte",
    city: "Ciudad de México",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    price: 1200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Studio%20Minimalista%20Roma"
  },
  {
    id: 6,
    name: "Cabaña en el Bosque",
    location: "Valle de Bravo",
    city: "Estado de México",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    price: 2200,
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Cabaña%20en%20el%20Bosque"
  },
  {
    id: 7,
    name: "Departamento Frente al Mar",
    location: "Playa del Carmen",
    city: "Quintana Roo",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 2600,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Departamento%20Frente%20al%20Mar"
  },
  {
    id: 8,
    name: "Casa Artística San Miguel",
    location: "Centro",
    city: "San Miguel de Allende",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    price: 3800,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Casa%20Artística%20San%20Miguel"
  },
  {
    id: 9,
    name: "Loft Bohemio Coyoacán",
    location: "Coyoacán",
    city: "Ciudad de México",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    price: 1450,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Loft%20Bohemio%20Coyoacán"
  },
  {
    id: 10,
    name: "Villa con Alberca Privada",
    location: "Tulum",
    city: "Quintana Roo",
    guests: 10,
    bedrooms: 5,
    beds: 6,
    price: 5500,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Villa%20con%20Alberca%20Privada"
  },
  {
    id: 11,
    name: "Apartamento Ejecutivo Santa Fe",
    location: "Santa Fe",
    city: "Ciudad de México",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    price: 1800,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Apartamento%20Ejecutivo%20Santa%20Fe"
  },
  {
    id: 12,
    name: "Casa con Jardín Reforma",
    location: "Lomas de Chapultepec",
    city: "Ciudad de México",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    price: 4200,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Casa%20con%20Jardín%20Reforma"
  },
  {
    id: 13,
    name: "Estudio Acogedor Zona Rosa",
    location: "Zona Rosa",
    city: "Ciudad de México",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    price: 1100,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Estudio%20Acogedor%20Zona%20Rosa"
  },
  {
    id: 14,
    name: "Hacienda Tradicional",
    location: "Centro",
    city: "Mérida",
    guests: 12,
    bedrooms: 6,
    beds: 8,
    price: 6000,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Hacienda%20Tradicional"
  },
  {
    id: 15,
    name: "Departamento Moderno Anzures",
    location: "Anzures",
    city: "Ciudad de México",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 1700,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Departamento%20Moderno%20Anzures"
  },
  {
    id: 16,
    name: "Casa Playa Puerto Escondido",
    location: "Zicatela",
    city: "Puerto Escondido",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    price: 2400,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Casa%20Playa%20Puerto%20Escondido"
  },
  {
    id: 17,
    name: "Penthouse de Lujo Interlomas",
    location: "Interlomas",
    city: "Estado de México",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    price: 3500,
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Penthouse%20de%20Lujo%20Interlomas"
  },
  {
    id: 18,
    name: "Loft con Terraza Nápoles",
    location: "Nápoles",
    city: "Ciudad de México",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    price: 1550,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Loft%20con%20Terraza%20Nápoles"
  },
  {
    id: 19,
    name: "Villa Romántica Sayulita",
    location: "Sayulita",
    city: "Nayarit",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 2800,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Villa%20Romántica%20Sayulita"
  },
  {
    id: 20,
    name: "Apartamento Vista Ciudad",
    location: "Del Valle",
    city: "Ciudad de México",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 1600,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Apartamento%20Vista%20Ciudad"
  },
  {
    id: 21,
    name: "Casa Campestre Tepoztlán",
    location: "Tepoztlán",
    city: "Morelos",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    price: 3200,
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Casa%20Campestre%20Tepoztlán"
  },
  {
    id: 22,
    name: "Suite de Lujo Masaryk",
    location: "Polanco",
    city: "Ciudad de México",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    price: 2200,
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Suite%20de%20Lujo%20Masaryk"
  },
  {
    id: 23,
    name: "Casa Colonial Guanajuato",
    location: "Centro Histórico",
    city: "Guanajuato",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    price: 1900,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Casa%20Colonial%20Guanajuato"
  },
  {
    id: 24,
    name: "Departamento Chapultepec",
    location: "Chapultepec",
    city: "Ciudad de México",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 2100,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Departamento%20Chapultepec"
  },
  {
    id: 25,
    name: "Bungalow Tropical Holbox",
    location: "Isla Holbox",
    city: "Quintana Roo",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 2900,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    whatsappLink: "https://wa.me/5215512345678?text=Hola,%20me%20interesa%20Bungalow%20Tropical%20Holbox"
  }
];

export const cities = [...new Set(properties.map(p => p.city))];
export const priceRanges = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "Menos de $1,500", min: 0, max: 1500 },
  { label: "$1,500 - $2,500", min: 1500, max: 2500 },
  { label: "$2,500 - $4,000", min: 2500, max: 4000 },
  { label: "Más de $4,000", min: 4000, max: Infinity }
];
export const guestOptions = [
  { label: "Cualquiera", value: 0 },
  { label: "1-2 huéspedes", value: 2 },
  { label: "3-4 huéspedes", value: 4 },
  { label: "5-6 huéspedes", value: 6 },
  { label: "7+ huéspedes", value: 7 }
];
