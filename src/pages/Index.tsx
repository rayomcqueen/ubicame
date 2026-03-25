import { useEffect, useRef } from "react";
import property1 from "@/assets/property-1.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import galleryChap20 from "@/assets/gallery-chap20.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { trackAndOpenWhatsApp, captureUtmParams } from "@/lib/whatsapp";
import FloatingButtons from "@/components/FloatingButtons";
import CountdownTimer from "@/components/CountdownTimer";
import WaveSeparator from "@/components/WaveSeparator";
import ScrollIndicator from "@/components/ScrollIndicator";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { MapPin, Wallet, MessageCircle, Award, Wifi, Car, Snowflake, ShieldCheck } from "lucide-react";

const WA_URL = "https://wa.me/523333260013?text=Hola%20Ubicame%2C%20vi%20la%20promo%203x2%20y%20quiero%20ver%20disponibilidad";
const PROMO_END = new Date("2026-04-07T23:59:59");

const GALLERY_ITEMS = [
  { img: gallery1, zone: "Andares", guests: 4, price: "$2,300", airbnbPrice: "$2,700", badge: "Popular", availability: "available" as const, amenities: ["WiFi", "AC", "Estacionamiento"], rating: 4.9 },
  { img: gallery5, zone: "Midtown", guests: 6, price: "$1,800", airbnbPrice: "$2,100", badge: "Nuevo", availability: "available" as const, amenities: ["WiFi", "AC"], rating: 4.8 },
  { img: gallery3, zone: "Puerta de Hierro", guests: 5, price: "$2,200", airbnbPrice: "$2,600", badge: null, availability: "few" as const, amenities: ["WiFi", "AC", "Estacionamiento"], rating: 4.9 },
  { img: gallery4, zone: "Providencia", guests: 8, price: "$2,500", airbnbPrice: "$2,900", badge: "Popular", availability: "available" as const, amenities: ["WiFi", "AC", "Estacionamiento"], rating: 5.0 },
  { img: galleryChap20, zone: "Chapultepec", guests: 20, price: "$5,500", airbnbPrice: "$6,400", badge: "Más reservado", availability: "few" as const, amenities: ["WiFi", "AC", "Estacionamiento"], rating: 4.9 },
  { img: gallery6, zone: "Americana", guests: 6, price: "$2,000", airbnbPrice: "$2,350", badge: null, availability: "available" as const, amenities: ["WiFi", "AC"], rating: 4.7 },
];

const TESTIMONIALS = [
  { quote: "Increíble departamento, súper limpio y la ubicación perfecta en Chapultepec. Definitivamente regresaré.", name: "María G.", date: "Marzo 2026", color: "bg-rose-500" },
  { quote: "Mucho mejor que un hotel y a mejor precio. La atención por WhatsApp fue inmediata. 100% recomendado.", name: "Carlos R.", date: "Febrero 2026", color: "bg-blue-500" },
  { quote: "Ya es la tercera vez que reservo con Ubicame. Siempre igual de buenos. El depa de Americana es mi favorito.", name: "Ana L.", date: "Enero 2026", color: "bg-emerald-500" },
];

const TRUST_BADGES = ["🏆 Superhost Airbnb", "4.9★ Rating promedio", "+10,000 huéspedes", "30+ propiedades"];

const WHY_CARDS = [
  { icon: Wallet, title: "Hasta 15% menos que en Airbnb", desc: "Sin comisión de plataforma. Mismo depa, mejor precio." },
  { icon: MessageCircle, title: "Atención directa por WhatsApp", desc: "Respuesta en minutos. Sin chatbots. Soporte real." },
  { icon: Award, title: "Superhost con 4.9★", desc: "+10,000 huéspedes satisfechos. Calidad garantizada." },
];

const amenityIcon = (name: string) => {
  switch (name) {
    case "WiFi": return <Wifi className="w-3.5 h-3.5" />;
    case "AC": return <Snowflake className="w-3.5 h-3.5" />;
    case "Estacionamiento": return <Car className="w-3.5 h-3.5" />;
    default: return null;
  }
};

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const StarRow = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5" aria-label={`${rating} estrellas`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-yellow-400 font-sans font-semibold" style={{ fontSize: 13 }}>{rating}</span>
  </div>
);

/** Fade-in sections on scroll via IntersectionObserver */
function useFadeInSections(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll<HTMLElement>("[data-fade]");
    if (!sections.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      sections.forEach((s) => { s.style.opacity = "1"; s.style.transform = "none"; });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("fade-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [containerRef]);
}

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFadeInSections(containerRef);

  useEffect(() => { captureUtmParams(); }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full overflow-x-hidden bg-background">
      <ScrollProgressBar />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-[60vh] md:h-[70vh] flex flex-col">
        <img
          src={property1}
          alt="Departamento en Guadalajara"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* #3 — Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col flex-1 px-5 pt-6 pb-10">
          <div className="mb-auto">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="font-serif text-foreground text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              Ubicame
            </a>
          </div>

          <div className="flex flex-col items-center text-center gap-5 mt-auto">
            {/* #4 — Badge with shield icon and pop animation */}
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-medium text-foreground bg-black/50 backdrop-blur-sm animate-scale-in">
              <ShieldCheck className="w-4 h-4 text-accent" />
              4.9★ · +10,000 huéspedes · Superhost
            </span>

            {/* #5 — Headline with subtle gradient */}
            <h1
              className="font-serif font-bold"
              style={{
                fontSize: "clamp(28px, 7vw, 44px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                background: "linear-gradient(180deg, #FFFFFF 30%, rgba(255,255,255,0.75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hospédate en Guadalajara — Reserva directo y ahorra
            </h1>

            <p className="font-sans text-foreground/85" style={{ fontSize: 16 }}>
              30+ departamentos en Chapultepec, Americana, Providencia y Andares
            </p>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "hero")}
              className="btn-whatsapp w-full max-w-sm font-sans"
              style={{ height: 56, borderRadius: 14, fontSize: 17 }}
            >
              <WhatsAppIcon /> Ver disponibilidad →
            </a>

            {/* #8 — Urgency text */}
            <p className="flex items-center gap-2 text-foreground/70 font-sans" style={{ fontSize: 13 }}>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              3 personas viendo esto ahora
            </p>
          </div>
        </div>

        {/* #6 — Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* #14 — Wave separator */}
      <WaveSeparator fromColor="transparent" toColor="hsl(var(--primary))" />

      {/* ═══ 2. PROMO BANNER ═══ */}
      <section data-fade className="fade-section px-5 py-12 md:py-16 text-center bg-primary relative overflow-hidden">
        {/* #11 — Geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* #12 — Floating discount badge */}
        <div
          className="absolute top-4 right-4 md:top-6 md:right-8 bg-foreground text-primary font-sans font-bold rounded-xl px-3 py-2 shadow-lg z-10"
          style={{ fontSize: 18, transform: "rotate(-12deg)" }}
        >
          -33%
        </div>

        <div className="relative z-10">
          {/* #13 — Animated fire emoji */}
          <p className="text-primary-foreground font-serif font-bold mb-3 leading-tight" style={{ fontSize: 24 }}>
            <span className="inline-block animate-pulse">🔥</span> RESERVA 3 NOCHES Y PAGA SOLO 2
          </p>
          <p className="text-primary-foreground/90 font-sans mb-4 max-w-sm mx-auto leading-relaxed" style={{ fontSize: 14 }}>
            Reservando directo te ahorras la comisión de Airbnb. Mismo depa, mejor precio.
          </p>

          {/* #10 — Countdown timer */}
          <CountdownTimer targetDate={PROMO_END} />

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "promo_banner")}
            className="btn-whatsapp mx-auto font-sans mt-6"
            style={{ height: 52, borderRadius: 12, fontSize: 16 }}
          >
            <WhatsAppIcon /> Aprovecha la promo →
          </a>
        </div>
      </section>

      <WaveSeparator fromColor="hsl(var(--primary))" toColor="hsl(var(--background))" flip />

      {/* ═══ WHY BOOK DIRECT ═══ */}
      <section data-fade className="fade-section px-5 py-12 md:py-16 bg-background">
        <h2 className="font-serif font-bold text-foreground text-center mb-10" style={{ fontSize: 24 }}>
          ¿Por qué reservar directo?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {WHY_CARDS.map((card, i) => (
            <div
              key={i}
              className="relative bg-card border border-border rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 group"
            >
              {/* #18 — Ordinal number */}
              <span
                className="absolute top-3 right-4 font-sans font-bold text-foreground/5 select-none"
                style={{ fontSize: 60, lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* #15 — Custom SVG icons */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <card.icon className="w-6 h-6 text-primary" />
              </div>

              <p className="text-foreground font-sans font-bold mb-2 relative z-10" style={{ fontSize: 16 }}>{card.title}</p>
              <p className="text-muted-foreground font-sans relative z-10" style={{ fontSize: 14 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. GALERÍA ═══ */}
      <section data-fade className="fade-section px-4 sm:px-6 py-12 md:py-16 bg-background" id="propiedades">
        <h2 className="font-serif font-bold text-foreground text-center mb-8" style={{ fontSize: 24 }}>
          Nuestros espacios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer">
              <img
                src={item.img}
                alt={`Departamento en ${item.zone}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />

              {/* #21 — Badge */}
              {item.badge && (
                <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground font-sans font-semibold px-3 py-1 rounded-full" style={{ fontSize: 11 }}>
                  {item.badge}
                </span>
              )}

              {/* #28 — Availability dot */}
              <span className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans font-medium backdrop-blur-sm ${
                item.availability === "available"
                  ? "bg-accent/20 text-accent"
                  : "bg-yellow-500/20 text-yellow-400"
              }`} style={{ fontSize: 11 }}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.availability === "available" ? "bg-accent" : "bg-yellow-400"}`} />
                {item.availability === "available" ? "Disponible" : "Pocas fechas"}
              </span>

              {/* #32 — Glassmorphism overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-md p-4 pt-3 border-t border-white/10 translate-y-0 transition-all duration-300">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-foreground font-sans font-bold leading-tight" style={{ fontSize: 15 }}>
                    {item.zone}
                  </p>
                  {/* #23 — Individual rating */}
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-foreground/90 font-sans font-medium" style={{ fontSize: 12 }}>{item.rating}</span>
                  </div>
                </div>

                <p className="text-foreground/70 font-sans" style={{ fontSize: 13 }}>
                  Hasta {item.guests} huéspedes
                </p>

                {/* #24 — Strikethrough Airbnb price */}
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-foreground font-sans font-semibold" style={{ fontSize: 14 }}>
                    Desde {item.price}/noche
                  </p>
                  <span className="text-foreground/40 font-sans line-through" style={{ fontSize: 12 }}>
                    Airbnb {item.airbnbPrice}
                  </span>
                </div>

                {/* #22 — Amenities on hover */}
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.amenities.map((a) => (
                    <span key={a} className="flex items-center gap-1 text-foreground/70 font-sans" style={{ fontSize: 11 }}>
                      {amenityIcon(a)} {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground font-sans mb-4" style={{ fontSize: 16 }}>
            Y muchas más opciones...
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "gallery_more")}
            className="btn-whatsapp mx-auto font-sans"
            style={{ height: 52, borderRadius: 12, fontSize: 16 }}
          >
            <WhatsAppIcon /> Ver más propiedades →
          </a>
        </div>
      </section>

      {/* ═══ 4. SOCIAL PROOF + CTA FINAL ═══ */}
      <section data-fade className="fade-section px-5 py-12 md:py-16 bg-background" id="testimonios">
        <h2 className="font-serif font-bold text-foreground text-center mb-8" style={{ fontSize: 24 }}>
          Lo que dicen nuestros huéspedes
        </h2>

        <div className="flex flex-col gap-4 max-w-lg mx-auto mb-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="relative bg-card border border-border rounded-2xl p-5 overflow-hidden">
              {/* #36 — Decorative quote */}
              <span
                className="absolute top-2 right-4 font-serif text-foreground/5 select-none"
                style={{ fontSize: 80, lineHeight: 1 }}
              >
                "
              </span>

              <div className="flex items-center gap-3 mb-3 relative z-10">
                {/* #34 — Avatar with initials */}
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-sans font-bold`} style={{ fontSize: 14 }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-foreground font-sans font-medium" style={{ fontSize: 14 }}>
                    {t.name}
                  </p>
                  {/* #35 — Date */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground font-sans" style={{ fontSize: 11 }}>{t.date}</span>
                    {/* #37 — Verified badge */}
                    <span className="flex items-center gap-0.5 text-accent font-sans" style={{ fontSize: 10 }}>
                      <ShieldCheck className="w-3 h-3" /> Verificado
                    </span>
                  </div>
                </div>
              </div>

              <StarRow />
              <p className="text-foreground/90 font-sans mt-2 leading-relaxed relative z-10" style={{ fontSize: 14 }}>"{t.quote}"</p>
            </div>
          ))}
        </div>

        {/* #38 — Satisfaction metric */}
        <div className="flex items-center justify-center gap-3 max-w-lg mx-auto mb-8">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeDasharray="97.4 100" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-sans font-bold text-foreground" style={{ fontSize: 12 }}>98%</span>
          </div>
          <p className="text-muted-foreground font-sans" style={{ fontSize: 14 }}>de huéspedes nos recomendarían</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-12">
          {TRUST_BADGES.map((badge, i) => (
            <span key={i} className="bg-card border border-border rounded-full px-4 py-2 text-foreground font-sans font-medium" style={{ fontSize: 13 }}>
              {badge}
            </span>
          ))}
        </div>

        <div className="text-center">
          <p className="font-serif font-bold text-foreground mb-5" style={{ fontSize: 20 }}>
            ¿Listo para tu próxima estancia?
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "cta_final")}
            className="btn-whatsapp mx-auto font-sans"
            style={{ height: 56, borderRadius: 14, fontSize: 17 }}
          >
            <WhatsAppIcon /> Reservar ahora →
          </a>
          <p className="text-muted-foreground font-sans mt-4" style={{ fontSize: 12 }}>Respuesta en menos de 5 minutos</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-5 py-8 text-center bg-background border-t border-border">
        {/* #40 — Logo with MapPin */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <MapPin className="w-5 h-5 text-primary" />
          <p className="font-serif font-bold text-foreground text-lg">Ubicame</p>
        </div>

        {/* #41 — Zone links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {["Chapultepec", "Americana", "Providencia", "Andares"].map((zone) => (
            <span key={zone} className="text-muted-foreground hover:text-foreground font-sans text-xs transition-colors cursor-pointer">
              {zone}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 mb-4">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/ubicamegdl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
          >
            Instagram
          </a>
        </div>

        {/* #42 — Payment badges */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {["Visa", "Mastercard", "Transferencia"].map((m) => (
            <span key={m} className="text-muted-foreground/60 font-sans border border-border rounded px-2 py-0.5" style={{ fontSize: 10 }}>
              {m}
            </span>
          ))}
        </div>

        <p className="text-muted-foreground font-sans" style={{ fontSize: 12 }}>© 2026 Ubicame · Guadalajara, Jalisco</p>
      </footer>

      <FloatingButtons />
    </div>
  );
};

export default Index;
