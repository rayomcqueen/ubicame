import { Users, Bed, DoorOpen, MapPin, Car, Wifi, Waves, Utensils, Dumbbell, Tv } from "lucide-react";
import type { Property } from "@/data/properties";

const amenityIcons: Record<string, React.ReactNode> = {
  "Estacionamiento": <Car className="w-3.5 h-3.5" />,
  "WiFi": <Wifi className="w-3.5 h-3.5" />,
  "Alberca": <Waves className="w-3.5 h-3.5" />,
  "Cocina": <Utensils className="w-3.5 h-3.5" />,
  "Gimnasio": <Dumbbell className="w-3.5 h-3.5" />,
  "TV": <Tv className="w-3.5 h-3.5" />,
};

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  return (
    <article
      className="group bg-card rounded-xl overflow-hidden shadow-soft card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <span className="font-semibold text-foreground">${property.price.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm"> /noche</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-1 line-clamp-1">
          {property.name}
        </h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          <span>{property.location}, {property.city}</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
        </div>

        {/* Extra Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
            {property.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {amenityIcons[amenity] || null}
                {amenity}
              </span>
            ))}
          </div>
        )}

        {!property.amenities?.length && (
          <div className="mb-5 pb-4 border-b border-border" />
        )}

        {/* CTA Button */}
        <a
          href={property.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 px-4 btn-whatsapp rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-md"
        >
          Reservar ahora
        </a>
      </div>
    </article>
  );
};

export default PropertyCard;
