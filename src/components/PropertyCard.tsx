import { useState } from "react";
import { Users, Bed, DoorOpen, MapPin, Car, Wifi, Waves, Utensils, Dumbbell, Tv, Shield, Building, Eye, Bath, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Property } from "@/data/properties";

const amenityIcons: Record<string, React.ReactNode> = {
  "Estacionamiento": <Car className="w-3.5 h-3.5" />,
  "WiFi": <Wifi className="w-3.5 h-3.5" />,
  "Alberca": <Waves className="w-3.5 h-3.5" />,
  "Cocina": <Utensils className="w-3.5 h-3.5" />,
  "Gimnasio": <Dumbbell className="w-3.5 h-3.5" />,
  "TV": <Tv className="w-3.5 h-3.5" />,
  "Seguridad 24/7": <Shield className="w-3.5 h-3.5" />,
  "Rooftop": <Building className="w-3.5 h-3.5" />,
  "Vistas Panorámicas": <Eye className="w-3.5 h-3.5" />,
  "A/C": <Waves className="w-3.5 h-3.5" />,
  "Cama King": <Bed className="w-3.5 h-3.5" />,
};

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = property.images?.length ? property.images : [property.image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa ${property.name} para [fechas]. ¿Está disponible?`
  );
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=523333260013&text=${whatsappMessage}&type=phone_number&app_absent=0`;

  const savings = property.airbnbPrice - property.price;

  return (
    <article
      className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out opacity-0 animate-fade-up h-full flex flex-col"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      {/* Image Carousel */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${property.name} - foto ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === currentImage ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImage(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentImage ? "bg-white w-4" : "bg-white/60"
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Badge */}
        {property.badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
            property.badge === "popular"
              ? "bg-amber-500 text-white"
              : "bg-red-500 text-white"
          }`}>
            {property.badge === "popular" ? "⭐ Más popular" : "🔥 Alta demanda"}
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-foreground">{property.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-1 line-clamp-1">
          {property.name}
        </h3>

        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          <span>{property.location}, {property.city}</span>
        </div>

        {/* Pricing with strikethrough */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-muted-foreground line-through text-sm">${property.airbnbPrice.toLocaleString()}</span>
          <span className="text-lg font-bold text-[hsl(142,70%,40%)]">${property.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/noche</span></span>
          <span className="text-xs bg-[hsl(142,70%,45%)]/15 text-[hsl(142,70%,35%)] px-2 py-0.5 rounded-full font-medium">
            Ahorras ${savings.toLocaleString()}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{property.guests}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DoorOpen className="w-4 h-4" />
            <span>{property.bedrooms} hab</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{property.beds} camas</span>
          </div>
          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} baños</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="flex-grow">
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-border">
              {property.amenities.slice(0, 5).map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {amenityIcons[amenity] || null}
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 5 && (
                <span className="text-xs text-muted-foreground px-2 py-0.5">+{property.amenities.length - 5} más</span>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 px-4 btn-whatsapp rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-md mt-auto"
        >
          💬 Consultar disponibilidad
        </a>
        <p className="text-center text-xs text-muted-foreground mt-1.5">
          Respuesta en menos de 5 minutos
        </p>
      </div>
    </article>
  );
};

export default PropertyCard;
