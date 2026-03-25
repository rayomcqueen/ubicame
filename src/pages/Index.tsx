import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";
import { MapPin, Star, Users, BedDouble, ChevronRight, Shield, Clock, Percent, ArrowRight, MessageCircle } from "lucide-react";

const WA_URL = "https://wa.me/523333260013?text=Hola%20Ubicame%2C%20vi%20la%20promo%203x2%20y%20quiero%20ver%20disponibilidad";

const TESTIMONIALS = [
  { quote: "Increíble departamento, súper limpio y la ubicación perfecta en Chapultepec. Definitivamente regresaré.", name: "María G.", location: "CDMX", initials: "MG" },
  { quote: "Mucho mejor que un hotel y a mejor precio. La atención por WhatsApp fue inmediata. 100% recomendado.", name: "Carlos R.", location: "Monterrey", initials: "CR" },
  { quote: "Ya es la tercera vez que reservo con Ubicame. Siempre igual de buenos. El depa de Americana es mi favorito.", name: "Ana L.", location: "León", initials: "AL" },
];

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/** Fade-in on scroll */
function useFadeInSections(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll<HTMLElement>("[data-fade]");
    if (!sections.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((s) => { s.style.opacity = "1"; s.style.transform = "none"; });
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("fade-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [containerRef]);
}

/* Show first 6 properties */
const FEATURED = properties.slice(0, 6);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFadeInSections(containerRef);
  useEffect(() => { captureUtmParams(); }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full overflow-x-hidden bg-background">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-end">
        <img
          src={property1}
          alt="Departamento premium en Guadalajara"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)" }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pb-16 md:pb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/80 text-sm font-sans">4.9 · +10,000 huéspedes</span>
            </div>

            <h1 className="text-white font-serif font-bold mb-4" style={{ fontSize: "clamp(32px, 6vw, 52px)", lineHeight: 1.1 }}>
              Tu estancia perfecta en Guadalajara
            </h1>

            <p className="text-white/80 font-sans mb-8" style={{ fontSize: 17, lineHeight: 1.6 }}>
              Departamentos premium. Reserva directo y ahorra hasta 20% vs Airbnb.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "hero")}
                className="btn-whatsapp font-sans"
                style={{ height: 52, borderRadius: 12, fontSize: 16 }}
              >
                <WhatsAppIcon /> Consultar disponibilidad
              </a>
              <a
                href="#propiedades"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="btn-base font-sans text-white border border-white/30 hover:bg-white/10"
                style={{ height: 52, borderRadius: 12, fontSize: 16, background: "rgba(255,255,255,0.08)" }}
              >
                Ver propiedades
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: Shield, text: "Superhost verificado" },
            { icon: Clock, text: "Respuesta en < 5 min" },
            { icon: Percent, text: "Mejor precio directo" },
            { icon: Star, text: "4.9★ en Airbnb" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="font-sans text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROMO BANNER ═══ */}
      <section data-fade className="fade-section bg-primary/[0.06] border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-5 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span style={{ fontSize: 24 }}>🔥</span>
            </div>
            <div>
              <p className="font-serif font-bold text-heading" style={{ fontSize: 20 }}>
                Reserva 3 noches, paga solo 2
              </p>
              <p className="text-muted-foreground font-sans" style={{ fontSize: 14 }}>
                Oferta exclusiva reservando directo. Válida por tiempo limitado.
              </p>
            </div>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "promo_banner")}
            className="btn-primary font-sans shrink-0"
            style={{ height: 44, borderRadius: 10, fontSize: 14 }}
          >
            Aprovechar oferta <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ═══ PROPERTIES ═══ */}
      <section data-fade className="fade-section py-16 md:py-20 px-5" id="propiedades">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Nuestros espacios</p>
            <h2 className="section-title">Propiedades en las mejores zonas</h2>
            <p className="section-subtitle">
              Chapultepec, Americana, Providencia, Andares y más
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map((prop) => (
              <Link
                key={prop.id}
                to={`/propiedad/${prop.id}`}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {prop.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full font-sans font-medium text-white ${
                      prop.badge === "popular" ? "bg-primary" : "bg-amber-500"
                    }`} style={{ fontSize: 11 }}>
                      {prop.badge === "popular" ? "Popular" : "Alta demanda"}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-sans font-semibold text-heading truncate" style={{ fontSize: 15 }}>
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-sans font-medium text-heading" style={{ fontSize: 13 }}>{prop.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-sans" style={{ fontSize: 13 }}>{prop.location}, {prop.city}</span>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground mb-3" style={{ fontSize: 13 }}>
                    <span className="flex items-center gap-1 font-sans">
                      <Users className="w-3.5 h-3.5" /> {prop.guests}
                    </span>
                    <span className="flex items-center gap-1 font-sans">
                      <BedDouble className="w-3.5 h-3.5" /> {prop.bedrooms}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans font-bold text-heading" style={{ fontSize: 16 }}>
                        ${prop.price.toLocaleString()}
                      </span>
                      <span className="font-sans text-muted-foreground" style={{ fontSize: 13 }}>/noche</span>
                      <span className="font-sans text-muted-foreground/60 line-through" style={{ fontSize: 12 }}>
                        ${prop.airbnbPrice.toLocaleString()}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "gallery_more")}
              className="btn-outline font-sans"
              style={{ height: 48, borderRadius: 10, fontSize: 15 }}
            >
              Ver las {properties.length} propiedades <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ WHY BOOK DIRECT ═══ */}
      <section data-fade className="fade-section bg-card py-16 md:py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Ventajas</p>
            <h2 className="section-title">¿Por qué reservar directo?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Percent,
                title: "Ahorra hasta 20%",
                desc: "Sin comisión de plataforma. El mismo departamento que ves en Airbnb, a mejor precio.",
              },
              {
                icon: MessageCircle,
                title: "Atención personalizada",
                desc: "Habla directo con nosotros por WhatsApp. Respuesta en minutos, no en horas.",
              },
              {
                icon: Shield,
                title: "Calidad garantizada",
                desc: "Superhost con 4.9★ y más de 10,000 huéspedes satisfechos.",
              },
            ].map((card, i) => (
              <div key={i} className="bg-background rounded-xl p-6 border border-border">
                <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-heading mb-2" style={{ fontSize: 16 }}>{card.title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed" style={{ fontSize: 14 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section data-fade className="fade-section py-16 md:py-20 px-5" id="testimonios">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Reseñas</p>
            <h2 className="section-title">Lo que dicen nuestros huéspedes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="font-sans text-foreground leading-relaxed mb-5" style={{ fontSize: 14 }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-sans font-bold" style={{ fontSize: 12 }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-sans font-medium text-heading" style={{ fontSize: 13 }}>{t.name}</p>
                    <p className="font-sans text-muted-foreground" style={{ fontSize: 12 }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section data-fade className="fade-section bg-heading py-16 md:py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: "clamp(24px, 5vw, 36px)" }}>
            ¿Listo para tu próxima estancia?
          </h2>
          <p className="text-white/70 font-sans mb-8" style={{ fontSize: 16 }}>
            Escríbenos por WhatsApp y te ayudamos a encontrar el departamento ideal. Respuesta en menos de 5 minutos.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, WA_URL, "cta_final")}
            className="btn-whatsapp font-sans mx-auto"
            style={{ height: 56, borderRadius: 12, fontSize: 17 }}
          >
            <WhatsAppIcon /> Reservar ahora
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-footer-bg text-white/70 py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg font-bold text-white">Ubicame</span>
            </div>
            <div className="flex items-center gap-6">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white font-sans text-sm transition-colors">WhatsApp</a>
              <a href="https://www.instagram.com/ubicamegdl/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white font-sans text-sm transition-colors">Instagram</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-white/30" style={{ fontSize: 12 }}>© 2026 Ubicame · Guadalajara, Jalisco</p>
            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "Transferencia"].map((m) => (
                <span key={m} className="text-white/20 font-sans border border-white/10 rounded px-2 py-0.5" style={{ fontSize: 10 }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <FloatingButtons />
    </div>
  );
};

export default Index;
