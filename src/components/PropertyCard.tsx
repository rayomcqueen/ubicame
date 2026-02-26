import { useState, useRef, useCallback } from "react";
import { Users, Bed, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Property } from "@/data/properties";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useSearchContext } from "@/lib/search-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

  const nextImage = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCurrentImage((p) => (p + 1) % images.length); };
  const prevImage = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCurrentImage((p) => (p - 1 + images.length) % images.length); };

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent, isLightbox = false) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      const setter = isLightbox ? setLightboxIndex : setCurrentImage;
      if (dx < 0) setter((p) => (p + 1) % images.length);
      else setter((p) => (p - 1 + images.length) % images.length);
    }
    touchRef.current = null;
  }, [images.length]);

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };

  const search = useSearchContext();

  const dateParts: string[] = [];
  if (search.checkIn) dateParts.push(`Check-in: ${format(search.checkIn, "d MMM yyyy", { locale: es })}`);
  if (search.checkOut) dateParts.push(`Check-out: ${format(search.checkOut, "d MMM yyyy", { locale: es })}`);
  if (search.guests > 0) dateParts.push(`Huéspedes: ${search.guests}`);
  const dateInfo = dateParts.length > 0 ? `\n${dateParts.join("\n")}` : "";

  const whatsappMessage = `Hola! Me interesa "${property.name}" en ${property.location}. Precio $${property.price.toLocaleString()}/noche.${dateInfo} [desde card]`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  // Single badge logic: "popular" → "Top", "demand" → "Nuevo"
  const badgeText = property.badge === "popular" ? "Top" : property.badge === "demand" ? "Nuevo" : null;

  return (
    <>
      <article
        className="group bg-card rounded-lg overflow-hidden shadow-system-sm hover:shadow-system-md hover:-translate-y-1 transition-all duration-200 opacity-0 animate-fade-up h-full flex flex-col"
        style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
      >
        {/* Image — 4:3 ratio */}
        <div
          className="relative overflow-hidden flex-shrink-0 cursor-pointer"
          style={{ aspectRatio: "4/3" }}
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e)}
          onClick={() => openLightbox(currentImage)}
        >
          <div className="absolute inset-0 img-skeleton" />

          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${property.name} — foto ${i + 1}`}
              width={400}
              height={300}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                i === currentImage ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.parentElement?.querySelector(".img-fallback") as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ))}

          <div className="img-fallback absolute inset-0 bg-muted items-center justify-center flex-col gap-2 hidden">
            <Home className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm text-muted-foreground font-medium">Foto no disponible</span>
          </div>

          {/* Carousel controls */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Foto anterior">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Siguiente foto">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImage ? "bg-white w-3" : "bg-white/60"}`} aria-label={`Foto ${i + 1}`} />
                ))}
              </div>
            </>
          )}

          {/* Badge — max 1 */}
          {badgeText && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-sm z-10">
              {badgeText}
            </span>
          )}
        </div>

        {/* Content — clean 4-line info */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Name + zone */}
          <h3 className="font-serif font-semibold text-heading text-lg leading-tight line-clamp-1 mb-1">
            {property.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{property.location}</p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              {property.guests}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" aria-hidden="true" />
              {property.bedrooms} hab · {property.beds} camas
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto mb-4">
            <span className="text-heading font-bold text-xl">${property.price.toLocaleString()}</span>
            <span className="text-muted-foreground text-sm">/noche</span>
          </div>

          {/* Single CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, whatsappUrl, "property_card", property.name, property.price.toString())}
            aria-label={`Ver detalles de ${property.name}`}
            className="btn-outline w-full !h-10 rounded-md text-center"
          >
            Ver detalles
          </a>
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
            <img src={images[lightboxIndex]} alt={`${property.name} — foto ${lightboxIndex + 1}`} className="max-w-full max-h-[85vh] object-contain" />
            {images.length > 1 && (
              <>
                <button onClick={() => setLightboxIndex((p) => (p - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors" aria-label="Foto anterior">
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button onClick={() => setLightboxIndex((p) => (p + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors" aria-label="Siguiente foto">
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
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
