import property1Image from "@/assets/property-1.jpg";
import property2Image from "@/assets/property-2.jpg";
import property3Image from "@/assets/property-3.jpg";
import property4Image from "@/assets/property-4.jpg";
import property5Image from "@/assets/property-5.jpg";
import property6Image from "@/assets/property-6.jpg";
import property7Image from "@/assets/property-7.jpg";
import property8Image from "@/assets/property-8.jpg";
import property9Image from "@/assets/property-9.jpg";
import property10Image from "@/assets/property-10.jpg";
import property11Image from "@/assets/property-11.jpg";
import property12Image from "@/assets/property-12.jpg";
import property13Image from "@/assets/property-13.jpg";
import property14Image from "@/assets/property-14.jpg";
import property15Image from "@/assets/property-15.jpg";
import property16Image from "@/assets/property-16.jpg";
import property17Image from "@/assets/property-17.jpg";
import property18Image from "@/assets/property-18.jpg";
import property19Image from "@/assets/property-19.jpg";
import property20Image from "@/assets/property-20.jpg";
import property21Image from "@/assets/property-21.jpg";
import property22Image from "@/assets/property-22.jpg";
import property23Image from "@/assets/property-23.jpg";
import property24Image from "@/assets/property-24.jpg";
import property25Image from "@/assets/property-25.jpg";

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
    image: property2Image,
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
    image: property3Image,
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
    image: property4Image,
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
    image: property5Image,
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
    image: property6Image,
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
    image: property7Image,
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
    image: property8Image,
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
    image: property9Image,
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
    image: property10Image,
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
    image: property11Image,
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
    image: property12Image,
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
    image: property13Image,
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
    image: property14Image,
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
    image: property15Image,
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
    image: property16Image,
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
    image: property17Image,
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
    image: property18Image,
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
    image: property19Image,
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
    image: property20Image,
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
    image: property21Image,
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
    image: property22Image,
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
    image: property23Image,
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
    image: property24Image,
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
    image: property25Image,
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
