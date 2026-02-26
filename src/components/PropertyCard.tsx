import { useState, useRef, useCallback } from "react";
import { Users, Bed, DoorOpen, MapPin, Car, Wifi, Waves, Utensils, Dumbbell, Tv, Shield, Building, Eye, Bath, ChevronLeft, ChevronRight, Star, X, Home } from "lucide-react";
import type { Property } from "@/data/properties";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const amenityIcons: Record<string, React.ReactNode> = {
  "Estacionamiento": <Car className="w-3.5 h-3.5" aria-hidden="true" />,
  "WiFi": <Wifi className="w-3.5 h-3.5" aria-hidden="true" />,
  "Alberca": <Waves className="w-3.5 h-3.5" aria-hidden="true" />,
  "Cocina": <Utensils className="w-3.5 h-3.5" aria-hidden="true" />,
  "Gimnasio": <Dumbbell className="w-3.5 h-3.5" aria-hidden="true" />,
  "TV": <Tv className="w-3.5 h-3.5" aria-hidden="true" />,
  "Seguridad 24/7": <Shield className="w-3.5 h-3.5" aria-hidden="true" />,
  "Rooftop": <Building className="w-3.5 h-3.5" aria-hidden="true" />,
  "Vistas Panorámicas": <Eye className="w-3.5 h-3.5" aria-hidden="true" />,
  "A/C": <Waves className="w-3.5 h-3.5" aria-hidden="true" />,
  "Cama King": <Bed className="w-3.5 h-3.5" aria-hidden="true" />,
};

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchRef = useRef<{ startX: number; startY: number } | null>(null);

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

  // Touch handlers for swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent, isLightbox = false) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      const setter = isLightbox ? setLightboxIndex : setCurrentImage;
      if (dx < 0) setter((prev) => (prev + 1) % images.length);
      else setter((prev) => (prev - 1 + images.length) % images.length);
    }
    touchRef.current = null;
  }, [images.length]);

  const openLightbox = (imgIndex: number) => {
    setLightboxIndex(imgIndex);
    setLightboxOpen(true);
  };

  const whatsappMessage = `Hola! Me interesa ${property.name} en ${property.location} ($${property.price.toLocaleString()}/noche). ¿Hay disponibilidad?`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const airbnbPrice = Math.round(property.price / 0.80);
  const savings = airbnbPrice - property.price;

  return (
    <>
      <article
        className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 ease-out opacity-0 animate-fade-up h-full flex flex-col"
        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
      >
        {/* Image Carousel */}
        <div
          className="relative overflow-hidden flex-shrink-0 cursor-pointer"
          style={{ aspectRatio: "3/2" }}
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e)}
        >
          {/* Skeleton shimmer */}
          <div className="absolute inset-0 img-skeleton" />

          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${property.name} en ${property.location}, Guadalajara — ${property.bedrooms} habitaciones para ${property.guests} huéspedes, foto ${i + 1}`}
              width={600}
              height={400}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                i === currentImage ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              loading="lazy"
              onClick={() => openLightbox(i)}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement | null;
                if (fallback?.classList.contains("img-fallback")) fallback.style.display = "flex";
              }}
            />
          ))}
          {/* Image error fallback */}
          <div className="img-fallback absolute inset-0 bg-muted items-center justify-center flex-col gap-2 hidden">
            <Home className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm text-muted-foreground font-medium text-center px-4">{property.name}</span>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end pointer-events-none"
            onClick={() => openLightbox(currentImage)}
          >
            <div className="p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="text-white font-serif text-lg font-semibold line-clamp-2">{property.name}</p>
              <p className="text-white/90 text-sm">${property.price.toLocaleString()}/noche</p>
            </div>
          </div>

          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 z-10"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-4 h-4 text-white" aria-hidden="true" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
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

          {/* Photo counter badge */}
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full z-10">
            {currentImage + 1}/{images.length}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          {/* Badge */}
          {property.badge && (
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md z-10 ${
              property.badge === "popular"
                ? "bg-amber-500 text-white"
                : "bg-red-500 text-white"
            }`}>
              {property.badge === "popular" ? "⭐ Más popular" : "🔥 Alta demanda"}
            </div>
          )}

          {/* Rating */}
          <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground">{property.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-serif line-clamp-2 mb-1" style={{ fontSize: 20, fontWeight: 600, color: "#2D2D2D" }}>
            {property.name}
          </h3>

          <div className="flex items-center mb-3" style={{ fontSize: 14, color: "#6B6B6B" }}>
            <MapPin className="w-4 h-4 mr-1 text-primary" aria-hidden="true" />
            <span>{property.location}, {property.city}</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="line-through" style={{ fontSize: "14px", color: "#B0B0B0" }}>${airbnbPrice.toLocaleString()}</span>
            <span className="font-bold text-accent" style={{ fontSize: "22px" }}>${property.price.toLocaleString()}<span className="font-normal text-muted-foreground" style={{ fontSize: "14px" }}>/noche</span></span>
            <span className="px-2 py-0.5 rounded-full font-medium" style={{ fontSize: "12px", background: "#E6F9ED", color: "#166534", border: "1px solid #BBF0CF" }}>
              Ahorras ${savings.toLocaleString()}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-3 flex-wrap" style={{ fontSize: 14, color: "#6B6B6B" }}>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>{property.guests} huéspedes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DoorOpen className="w-4 h-4" aria-hidden="true" />
              <span>{property.bedrooms} hab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" aria-hidden="true" />
              <span>{property.beds} camas</span>
            </div>
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" aria-hidden="true" />
                <span>{property.bathrooms} baños</span>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="flex-grow">
            {property.amenities && property.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-border">
                {property.amenities.slice(0, 3).map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {amenityIcons[amenity] || null}
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="text-xs text-muted-foreground px-2 py-0.5">+{property.amenities.length - 3} más</span>
                )}
              </div>
            )}
          </div>

          {/* CTA — outline style for hierarchy */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, whatsappUrl, "property_card", property.name, property.price.toString())}
            aria-label={`Reservar ${property.name} por WhatsApp`}
            className="block w-full text-center py-3 px-4 rounded-md font-medium text-sm transition-all duration-300 hover:shadow-md mt-auto"
            style={{ border: "1.5px solid #25D366", color: "#25D366", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#25D366"; }}
          >
            💬 Consultar disponibilidad
          </a>
          <p className="text-center text-xs text-muted-foreground mt-1.5">
            Respuesta en menos de 5 minutos
          </p>
        </div>
      </article>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e, true)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={images[lightboxIndex]}
              alt={`${property.name} — foto ${lightboxIndex + 1} de ${images.length}`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;
