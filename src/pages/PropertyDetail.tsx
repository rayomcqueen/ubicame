import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Bed,
  Bath,
  Star,
  MapPin,
  CalendarDays,
  ArrowLeft,
  Check,
  Navigation,
} from "lucide-react";
import { properties } from "@/data/properties";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

/* ─── POIs per zone ─── */
const POI_MAP: Record<string, { name: string; walk: string }[]> = {
  Andares: [
    { name: "Centro Comercial Andares", walk: "5 min" },
    { name: "Paseo Andares", walk: "8 min" },
    { name: "Hospital Ángeles", walk: "10 min" },
  ],
  Chapultepec: [
    { name: "Av. Chapultepec", walk: "2 min" },
    { name: "Parque Revolución", walk: "5 min" },
    { name: "Glorieta de los Niños Héroes", walk: "10 min" },
  ],
  "Puerta de Hierro": [
    { name: "Plaza Punto Sur", walk: "5 min" },
    { name: "Bosque Los Colomos", walk: "12 min" },
    { name: "Hospital Puerta de Hierro", walk: "4 min" },
  ],
  "La Americana": [
    { name: "Av. Chapultepec", walk: "3 min" },
    { name: "Parque Revolución", walk: "6 min" },
    { name: "Templo Expiatorio", walk: "10 min" },
  ],
  Guadalupe: [
    { name: "Estadio Akron", walk: "8 min" },
    { name: "Plaza Forum", walk: "10 min" },
    { name: "Parque Ávila Camacho", walk: "15 min" },
  ],
  Chapalita: [
    { name: "Glorieta Chapalita", walk: "3 min" },
    { name: "Parque de la Calma", walk: "8 min" },
    { name: "Plaza Galerias", walk: "12 min" },
  ],
  "Zona Real": [
    { name: "Centro Comercial Galerías", walk: "5 min" },
    { name: "Expo Guadalajara", walk: "15 min" },
    { name: "Bosque Los Colomos", walk: "10 min" },
  ],
  "Ladrón de Guevara": [
    { name: "Av. Chapultepec", walk: "5 min" },
    { name: "Parque Revolución", walk: "8 min" },
    { name: "Plaza del Sol", walk: "12 min" },
  ],
};

const DEFAULT_POIS = [
  { name: "Centro de la ciudad", walk: "15 min" },
  { name: "Restaurantes y cafés", walk: "5 min" },
  { name: "Supermercado", walk: "8 min" },
];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = useMemo(
    () => properties.find((p) => p.id === Number(id)),
    [id]
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-4">
            Propiedad no encontrada
          </p>
          <Link to="/" className="btn-primary rounded-lg px-6 py-3">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [property.image];
  const pois = POI_MAP[property.location] || DEFAULT_POIS;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateParts: string[] = [];
  if (checkIn)
    dateParts.push(
      `Check-in: ${format(checkIn, "d MMM yyyy", { locale: es })}`
    );
  if (checkOut)
    dateParts.push(
      `Check-out: ${format(checkOut, "d MMM yyyy", { locale: es })}`
    );
  dateParts.push(`Huéspedes: ${guests}`);
  const dateInfo = dateParts.join("\n");

  const waMessage = `Hola! Me interesa "${property.name}" en ${property.location}.\n${dateInfo}\nPrecio: $${property.price.toLocaleString()}/noche [desde detalle]`;
  const waUrl = buildWhatsAppUrl(waMessage);

  const nextImg = () =>
    setCurrentImage((p) => (p + 1) % images.length);
  const prevImg = () =>
    setCurrentImage((p) => (p - 1 + images.length) % images.length);

  const formatDate = (d: Date | undefined, placeholder: string) =>
    d ? format(d, "d MMM", { locale: es }) : placeholder;

  const selectClass = (active: boolean) =>
    cn(
      "appearance-none border rounded-lg px-3 py-2.5 text-sm bg-background cursor-pointer min-h-[44px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full",
      active
        ? "border-primary text-foreground font-medium"
        : "border-border text-foreground"
    );

  /* ─── Highlights ─── */
  const highlights = [
    `Hasta ${property.guests} huéspedes`,
    `${property.bedrooms} habitaciones · ${property.beds} camas`,
    property.bathrooms ? `${property.bathrooms} baños completos` : null,
    property.rating >= 4.8 ? `★ ${property.rating} — Top rated` : `★ ${property.rating}`,
    "Reserva directa sin comisiones",
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back button */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-32 md:pb-16">
        {/* ═══ GALLERY ═══ */}
        <section className="relative rounded-xl overflow-hidden mt-2 mb-8" style={{ aspectRatio: "16/9", maxHeight: 480 }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${property.name} — foto ${i + 1}`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                i === currentImage ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}

          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors z-10"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full z-10">
                {currentImage + 1} / {images.length}
              </div>
            </>
          )}
        </section>

        {/* ═══ CONTENT GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT — Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title + meta */}
            <div>
              <h1 className="font-serif text-heading font-bold text-2xl md:text-3xl mb-2">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {property.location}, {property.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                  {property.rating}
                </span>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-card rounded-xl p-5 border border-border/50">
              <h2 className="text-sm font-semibold text-heading mb-3">
                Highlights
              </h2>
              <ul className="space-y-2">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities — collapsible */}
            {property.amenities && property.amenities.length > 0 && (
              <Accordion type="single" collapsible defaultValue="amenities">
                <AccordionItem value="amenities" className="border-border/50">
                  <AccordionTrigger className="text-sm font-semibold text-heading hover:no-underline">
                    Amenidades ({property.amenities.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {property.amenities.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-2 text-sm text-foreground"
                        >
                          <Check className="w-3.5 h-3.5 text-primary" />
                          {a}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Location + POIs */}
            <Accordion type="single" collapsible defaultValue="location">
              <AccordionItem value="location" className="border-border/50">
                <AccordionTrigger className="text-sm font-semibold text-heading hover:no-underline">
                  Ubicación — {property.location}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Embedded map */}
                  <div className="rounded-lg overflow-hidden mb-4" style={{ height: 220 }}>
                    <iframe
                      title={`Mapa de ${property.location}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(property.location + ", Guadalajara, Mexico")}&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Cerca de aquí
                  </h3>
                  <ul className="space-y-2">
                    {pois.map((poi) => (
                      <li
                        key={poi.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="inline-flex items-center gap-2 text-foreground">
                          <Navigation className="w-3.5 h-3.5 text-primary" />
                          {poi.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          🚶 {poi.walk}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* RIGHT — Sticky booking module (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-card rounded-xl border border-border/50 shadow-soft p-6 space-y-5">
              <div>
                <span className="text-heading font-bold text-2xl">
                  ${property.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-sm"> /noche</span>
                {property.airbnbPrice > property.price && (
                  <p className="text-xs text-muted-foreground mt-1">
                    En Airbnb: <span className="line-through">${property.airbnbPrice.toLocaleString()}</span>{" "}
                    <span className="text-primary font-semibold">
                      Ahorras ${(property.airbnbPrice - property.price).toLocaleString()}
                    </span>
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={selectClass(!!checkIn)}>
                        <CalendarDays className="w-3.5 h-3.5 inline mr-1 text-primary" />
                        {formatDate(checkIn, "Seleccionar")}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(d) => {
                          setCheckIn(d);
                          if (d && checkOut && d >= checkOut) setCheckOut(undefined);
                        }}
                        disabled={(d) => d < today}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={selectClass(!!checkOut)}>
                        <CalendarDays className="w-3.5 h-3.5 inline mr-1 text-primary" />
                        {formatDate(checkOut, "Seleccionar")}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(d) => d < (checkIn ? new Date(checkIn.getTime() + 86400000) : today)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Huéspedes</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={selectClass(true)}
                >
                  {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "huésped" : "huéspedes"}
                    </option>
                  ))}
                </select>
              </div>

              {/* CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) =>
                  trackAndOpenWhatsApp(
                    e,
                    waUrl,
                    "property_detail",
                    property.name,
                    property.price.toString()
                  )
                }
                className="btn-whatsapp w-full flex items-center justify-center gap-2 rounded-lg py-3.5 font-semibold text-base"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Cotizar por WhatsApp
              </a>

              <p className="text-xs text-center text-muted-foreground">
                ⚡ Respuesta en menos de 5 min · Sin compromiso
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══ MOBILE STICKY BAR ═══ */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="shrink-0">
            <span className="text-xs text-muted-foreground">Desde</span>
            <p className="text-foreground font-bold leading-tight">
              <span className="text-lg">${property.price.toLocaleString()}</span>
              <span className="text-sm font-normal text-muted-foreground">/noche</span>
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) =>
              trackAndOpenWhatsApp(
                e,
                waUrl,
                "property_detail_mobile",
                property.name,
                property.price.toString()
              )
            }
            className="flex-1 flex items-center justify-center gap-2 btn-whatsapp font-bold py-3 rounded-full text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
