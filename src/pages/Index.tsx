import { useEffect, useRef } from "react";
import property1 from "@/assets/property-1.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import { trackAndOpenWhatsApp, captureUtmParams } from "@/lib/whatsapp";
import FloatingButtons from "@/components/FloatingButtons";

const WA_URL = "https://wa.me/523333260013?text=Hola%20Ubicame%2C%20vi%20la%20promo%203x2%20y%20quiero%20ver%20disponibilidad";

const GALLERY_ITEMS = [
  { img: gallery1, zone: "Chapultepec", guests: 4, price: "$1,500" },
  { img: gallery5, zone: "Americana", guests: 6, price: "$1,800" },
  { img: gallery3, zone: "Providencia", guests: 8, price: "$2,200" },
  { img: gallery4, zone: "Andares", guests: 4, price: "$2,500" },
  { img: gallery5, zone: "Chapultepec", guests: 20, price: "$5,500" },
  { img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&q=80", zone: "Americana", guests: 2, price: "$1,200" },
];

const TESTIMONIALS = [
  { quote: "Increíble departamento, súper limpio y la ubicación perfecta en Chapultepec. Definitivamente regresaré.", name: "María G." },
  { quote: "Mucho mejor que un hotel y a mejor precio. La atención por WhatsApp fue inmediata. 100% recomendado.", name: "Carlos R." },
  { quote: "Ya es la tercera vez que reservo con Ubicame. Siempre igual de buenos. El depa de Americana es mi favorito.", name: "Ana L." },
];

const TRUST_BADGES = ["🏆 Superhost Airbnb", "4.9★ Rating promedio", "+10,000 huéspedes", "30+ propiedades"];

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const StarRow = () => (
  <div className="flex gap-0.5" aria-label="5 estrellas">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
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
      {/* ═══ 1. HERO ═══ */}
      <section className="relative min-h-screen flex flex-col">
        <img
          src={property1}
          alt="Departamento en Guadalajara"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col flex-1 px-5 pt-6 pb-10">
          {/* Logo — clickable */}
          <div className="mb-auto">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="font-serif text-foreground text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              Ubicame
            </a>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-5 mt-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-medium text-foreground bg-black/50 backdrop-blur-sm">
              4.9★ · +10,000 huéspedes · Superhost
            </span>

            <h1
              className="font-serif font-bold text-foreground"
              style={{ fontSize: "clamp(28px, 7vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
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
          </div>
        </div>
      </section>

      {/* ═══ 2. PROMO BANNER ═══ */}
      <section data-fade className="fade-section px-5 py-12 md:py-16 text-center bg-primary">
        <p className="text-primary-foreground font-serif font-bold mb-3 leading-tight" style={{ fontSize: 24 }}>
          🔥 RESERVA 3 NOCHES Y PAGA SOLO 2
        </p>
        <p className="text-primary-foreground/90 font-sans mb-6 max-w-sm mx-auto leading-relaxed" style={{ fontSize: 14 }}>
          Reservando directo te ahorras la comisión de Airbnb. Mismo depa, mejor precio.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "promo_banner")}
          className="btn-whatsapp mx-auto font-sans"
          style={{ height: 52, borderRadius: 12, fontSize: 16 }}
        >
          <WhatsAppIcon /> Aprovecha la promo →
        </a>
        <p className="text-primary-foreground/90 font-sans font-bold mt-5" style={{ fontSize: 14 }}>
          ⏰ Promo válida hasta el 7 de abril 2026
        </p>
      </section>

      {/* ═══ WHY BOOK DIRECT ═══ */}
      <section data-fade className="fade-section px-5 py-12 md:py-16 bg-background">
        <h2 className="font-serif font-bold text-foreground text-center mb-8" style={{ fontSize: 24 }}>
          ¿Por qué reservar directo?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { emoji: "💰", title: "Hasta 15% menos que en Airbnb", desc: "Sin comisión de plataforma. Mismo depa, mejor precio." },
            { emoji: "📱", title: "Atención directa por WhatsApp", desc: "Respuesta en minutos. Sin chatbots. Soporte real." },
            { emoji: "⭐", title: "Superhost con 4.9★", desc: "+10,000 huéspedes satisfechos. Calidad garantizada." },
          ].map((card, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
              <span className="text-3xl mb-3 block">{card.emoji}</span>
              <p className="text-foreground font-sans font-bold mb-2" style={{ fontSize: 16 }}>{card.title}</p>
              <p className="text-muted-foreground font-sans" style={{ fontSize: 14 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. GALERÍA ═══ */}
      <section data-fade className="fade-section px-4 sm:px-6 py-12 md:py-16 bg-background">
        <h2 className="font-serif font-bold text-foreground text-center mb-8" style={{ fontSize: 24 }}>
          Nuestros espacios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer">
              <img
                src={item.img}
                alt={`Departamento en ${item.zone}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                <p className="text-foreground font-sans font-bold leading-tight" style={{ fontSize: 15 }}>
                  {item.zone}
                </p>
                <p className="text-foreground/80 font-sans mt-1" style={{ fontSize: 13 }}>
                  Hasta {item.guests} huéspedes
                </p>
                <p className="text-foreground font-sans font-semibold mt-1" style={{ fontSize: 14 }}>
                  Desde {item.price}/noche
                </p>
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
      <section data-fade className="fade-section px-5 py-12 md:py-16 bg-background">
        <h2 className="font-serif font-bold text-foreground text-center mb-8" style={{ fontSize: 24 }}>
          Lo que dicen nuestros huéspedes
        </h2>

        <div className="flex flex-col gap-4 max-w-lg mx-auto mb-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <StarRow />
              <p className="text-foreground/90 font-sans mt-3 leading-relaxed" style={{ fontSize: 14 }}>"{t.quote}"</p>
              <p className="text-muted-foreground font-sans mt-3 font-medium" style={{ fontSize: 12 }}>— {t.name}</p>
            </div>
          ))}
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

      {/* ═══ FOOTER MÍNIMO ═══ */}
      <footer className="px-5 py-8 text-center bg-background border-t border-border">
        <p className="font-serif font-bold text-foreground text-lg mb-3">Ubicame</p>
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
            href="https://instagram.com/ubicame.gdl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
          >
            Instagram
          </a>
        </div>
        <p className="text-muted-foreground font-sans" style={{ fontSize: 12 }}>© 2026 Ubicame · Guadalajara, Jalisco</p>
      </footer>

      <FloatingButtons />
    </div>
  );
};

export default Index;
