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
  bathrooms?: number;
  price: number;
  airbnbPrice: number;
  rating: number;
  image: string;
  images: string[];
  whatsappLink: string;
  amenities?: string[];
  badge?: "popular" | "demand";
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Departamento de Lujo",
    location: "Andares",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    price: 2500,
    airbnbPrice: 3125,
    rating: 4.9,
    image: property1Image,
    images: [property1Image, property5Image, property11Image, property25Image, property12Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Departamento%20de%20Lujo",
    amenities: ["Estacionamiento", "Cama King", "A/C"],
    badge: "popular"
  },
  {
    id: 2,
    name: "Vive la Americana",
    location: "La Americana",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    price: 2100,
    airbnbPrice: 2625,
    rating: 4.9,
    image: property2Image,
    images: [property2Image, property15Image, property16Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Vive%20la%20Americana",
    amenities: ["Estacionamiento", "Gimnasio", "Seguridad 24/7", "Rooftop", "Vistas Panorámicas", "A/C", "Cama King"],
    badge: "popular"
  },
  {
    id: 3,
    name: "Torre Anuva",
    location: "Puerta de Hierro",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 2300,
    airbnbPrice: 2875,
    rating: 4.8,
    image: property3Image,
    images: [property3Image, property12Image, property24Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Torre%20Anuva",
    amenities: ["Estacionamiento", "Alberca", "Gimnasio", "Seguridad 24/7", "Rooftop", "Vistas Panorámicas"],
    badge: "demand"
  },
  {
    id: 4,
    name: "Cerca de Estadio Akron",
    location: "Guadalupe",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 2200,
    airbnbPrice: 2750,
    rating: 4.7,
    image: property4Image,
    images: [property4Image, property8Image, property10Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Cerca%20de%20Estadio%20Akron",
    amenities: ["Estacionamiento", "Gimnasio", "Seguridad 24/7", "Rooftop", "Vistas Panorámicas"]
  },
  {
    id: 5,
    name: "Cocina completa y lujosa",
    location: "Andares",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 2,
    price: 2100,
    airbnbPrice: 2625,
    rating: 4.8,
    image: property5Image,
    images: [property5Image, property1Image, property25Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Cocina%20completa%20y%20lujosa",
    amenities: ["Estacionamiento", "Seguridad 24/7", "Rooftop"]
  },
  {
    id: 6,
    name: "Encantador con Jardín Privado",
    location: "Chapultepec",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 1900,
    airbnbPrice: 2375,
    rating: 4.9,
    image: property6Image,
    images: [property6Image, property7Image, property13Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Encantador%20con%20Jardín%20Privado",
    amenities: ["Estacionamiento", "Seguridad 24/7", "Rooftop", "Planta Baja"]
  },
  {
    id: 7,
    name: "En Chapultepec",
    location: "Chapultepec",
    city: "Guadalajara",
    guests: 7,
    bedrooms: 2,
    beds: 5,
    price: 1999,
    airbnbPrice: 2499,
    rating: 4.7,
    image: property7Image,
    images: [property7Image, property6Image, property14Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20En%20Chapultepec",
    amenities: ["Estacionamiento", "Seguridad 24/7", "Rooftop"]
  },
  {
    id: 8,
    name: "Vista Majestuosa",
    location: "Guadalupe",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 1999,
    airbnbPrice: 2499,
    rating: 4.8,
    image: property8Image,
    images: [property8Image, property9Image, property10Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Vista%20Majestuosa",
    amenities: ["Estacionamiento", "Seguridad 24/7", "A/C", "Rooftop"]
  },
  {
    id: 9,
    name: "Super Moderno cama King",
    location: "Guadalupe",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 2199,
    airbnbPrice: 2749,
    rating: 4.7,
    image: property9Image,
    images: [property9Image, property8Image, property4Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Super%20Moderno%20cama%20King",
    amenities: ["Estacionamiento", "Seguridad 24/7", "A/C"]
  },
  {
    id: 10,
    name: "Vista Majestuosa",
    location: "Guadalupe",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 1999,
    airbnbPrice: 2499,
    rating: 4.6,
    image: property10Image,
    images: [property10Image, property8Image, property9Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Vista%20Majestuosa",
    amenities: ["Estacionamiento", "Seguridad 24/7", "A/C", "Rooftop"]
  },
  {
    id: 11,
    name: "Departamento con Alberca",
    location: "Andares",
    city: "Guadalajara",
    guests: 6,
    bedrooms: 2,
    beds: 4,
    price: 2300,
    airbnbPrice: 2875,
    rating: 4.8,
    image: property11Image,
    images: [property11Image, property1Image, property5Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Departamento%20con%20Alberca",
    amenities: ["Estacionamiento", "Alberca", "Gimnasio", "Seguridad 24/7", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 12,
    name: "Torre Anuva",
    location: "Puerta de Hierro",
    city: "Guadalajara",
    guests: 6,
    bedrooms: 2,
    beds: 4,
    price: 2300,
    airbnbPrice: 2875,
    rating: 4.8,
    image: property12Image,
    images: [property12Image, property3Image, property24Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Torre%20Anuva",
    amenities: ["Estacionamiento", "Alberca", "Gimnasio", "Seguridad 24/7", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 13,
    name: "Living Chapultepec",
    location: "Chapultepec",
    city: "Guadalajara",
    guests: 5,
    bedrooms: 2,
    beds: 4,
    price: 1800,
    airbnbPrice: 2250,
    rating: 4.7,
    image: property13Image,
    images: [property13Image, property14Image, property7Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Living%20Chapultepec",
    amenities: ["Estacionamiento", "Seguridad 24/7", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 14,
    name: "Living Chapultepec",
    location: "Chapultepec",
    city: "Guadalajara",
    guests: 7,
    bedrooms: 2,
    beds: 4,
    price: 1900,
    airbnbPrice: 2375,
    rating: 4.7,
    image: property14Image,
    images: [property14Image, property13Image, property6Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Living%20Chapultepec",
    amenities: ["Estacionamiento", "Seguridad 24/7", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 15,
    name: "Americana Rooftop",
    location: "La Americana",
    city: "Guadalajara",
    guests: 8,
    bedrooms: 2,
    beds: 4,
    price: 1900,
    airbnbPrice: 2375,
    rating: 4.8,
    image: property15Image,
    images: [property15Image, property16Image, property2Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Americana%20Rooftop",
    amenities: ["Estacionamiento", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 16,
    name: "Americana Rooftop",
    location: "La Americana",
    city: "Guadalajara",
    guests: 8,
    bedrooms: 2,
    beds: 4,
    price: 1900,
    airbnbPrice: 2375,
    rating: 4.6,
    image: property16Image,
    images: [property16Image, property15Image, property2Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Americana%20Rooftop",
    amenities: ["Estacionamiento", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 17,
    name: "Zona Real Ventura",
    location: "Zona Real",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 2400,
    airbnbPrice: 3000,
    rating: 4.7,
    image: property17Image,
    images: [property17Image, property18Image, property19Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Zona%20Real%20Ventura",
    amenities: ["Estacionamiento", "Alberca", "A/C", "Rooftop", "Área de Trabajo"]
  },
  {
    id: 18,
    name: "Glorieta Chapalita",
    location: "Chapalita",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 2400,
    airbnbPrice: 3000,
    rating: 4.6,
    image: property18Image,
    images: [property18Image, property19Image, property20Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Glorieta%20Chapalita",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 19,
    name: "Glorieta Chapalita",
    location: "Chapalita",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 2800,
    airbnbPrice: 3500,
    rating: 4.8,
    image: property19Image,
    images: [property19Image, property18Image, property20Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Glorieta%20Chapalita",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 20,
    name: "Glorieta Chapalita",
    location: "Chapalita",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 1900,
    airbnbPrice: 2375,
    rating: 4.5,
    image: property20Image,
    images: [property20Image, property18Image, property21Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Glorieta%20Chapalita",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 21,
    name: "Andares con cama King",
    location: "Chapalita",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 2300,
    airbnbPrice: 2875,
    rating: 4.7,
    image: property21Image,
    images: [property21Image, property20Image, property25Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Andares%20con%20cama%20King",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 22,
    name: "Privado con Terraza",
    location: "Ladrón de Guevara",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 1600,
    airbnbPrice: 2000,
    rating: 4.6,
    image: property22Image,
    images: [property22Image, property23Image, property6Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Privado%20con%20Terraza",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 23,
    name: "Privado con Terraza",
    location: "Ladrón de Guevara",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 1600,
    airbnbPrice: 2000,
    rating: 4.5,
    image: property23Image,
    images: [property23Image, property22Image, property14Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Privado%20con%20Terraza",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 24,
    name: "Torre Anuva",
    location: "Puerta de Hierro",
    city: "Guadalajara",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    price: 2200,
    airbnbPrice: 2750,
    rating: 4.7,
    image: property24Image,
    images: [property24Image, property3Image, property12Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Torre%20Anuva",
    amenities: ["Rooftop", "Área de Trabajo"]
  },
  {
    id: 25,
    name: "Loft de Doble altura",
    location: "Andares",
    city: "Guadalajara",
    guests: 3,
    bedrooms: 1,
    beds: 1,
    price: 1999,
    airbnbPrice: 2499,
    rating: 4.8,
    image: property25Image,
    images: [property25Image, property1Image, property11Image],
    whatsappLink: "https://api.whatsapp.com/send/?phone=523333260013&text=Hola,%20me%20interesa%20Loft%20de%20Doble%20altura",
    amenities: ["Alberca", "Seguridad 24/7", "Rooftop", "Área de Trabajo"]
  }
];

export const cities = [...new Set(properties.map(p => p.city))];
export const zones = [...new Set(properties.map(p => p.location))].sort();
export const priceRanges = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "Hasta $2,000", min: 0, max: 2000 },
  { label: "$2,000 - $2,500", min: 2000, max: 2500 },
  { label: "$2,500+", min: 2500, max: Infinity },
];
export const guestOptions = [
  { label: "Cualquiera", value: 0 },
  { label: "1-2 huéspedes", value: 2 },
  { label: "3-4 huéspedes", value: 4 },
  { label: "5-6 huéspedes", value: 6 },
  { label: "7+ huéspedes", value: 7 }
];