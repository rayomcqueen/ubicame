import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Roberto M.",
    initials: "RM",
    country: "🇲🇽 México",
    highlight: "Mucho mejor que Airbnb",
    text: "Pablo nos respondió al instante, el depa estaba impecable y nos ahorró como $2,000 en nuestra estancia de 4 noches.",
    rating: 5,
    property: "Departamento de Lujo",
    date: "Febrero 2026",
  },
  {
    name: "María García",
    initials: "MG",
    country: "🇪🇸 España",
    highlight: "Nos sentimos como en casa",
    text: "La propiedad era exactamente como en las fotos. Pablo nos mandó una guía de restaurantes increíble y hasta nos consiguió early check-in.",
    rating: 5,
    property: "Vive la Americana",
    date: "Enero 2026",
  },
  {
    name: "Sarah & Tom L.",
    initials: "SL",
    country: "🇺🇸 USA",
    highlight: "So easy to communicate",
    text: "We were worried about the language barrier but Pablo speaks perfect English. He answered every question on WhatsApp instantly. Way better than dealing with Airbnb support.",
    rating: 5,
    property: "Torre Anuva",
    date: "Enero 2026",
  },
  {
    name: "Carlos Rodríguez",
    initials: "CR",
    country: "🇦🇷 Argentina",
    highlight: "Ya no uso Airbnb en GDL",
    text: "Tercera vez que reservo con Pablo. Los precios son mucho mejores, la comunicación es directa, y siempre me consigue algo extra como late checkout.",
    rating: 5,
    property: "Loft de Doble altura",
    date: "Diciembre 2025",
  },
  {
    name: "Ana Martínez",
    initials: "AM",
    country: "🇨🇴 Colombia",
    highlight: "Atención que no existe en plataformas",
    text: "Llegamos a las 11pm y Pablo estaba ahí para recibirnos. En Airbnb nos hubieran dejado con un código y ya. La diferencia es enorme.",
    rating: 5,
    property: "Encantador con Jardín Privado",
    date: "Noviembre 2025",
  },
  {
    name: "Diego F.",
    initials: "DF",
    country: "🇲🇽 México",
    highlight: "El ahorro es real",
    text: "Comparé precios y me salió $1,800 más barato que en Airbnb por 5 noches. Mismo departamento, misma calidad, sin las comisiones absurdas.",
    rating: 5,
    property: "Departamento con Alberca",
    date: "Febrero 2026",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (isPaused) return;
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 24
        : 340;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollToProperty = (name: string) => {
    const section = document.getElementById("propiedades");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="testimonios" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#6B7B3F", textTransform: "uppercase" as const }}>
            Testimonios
          </span>
          <h2 className="font-serif mt-2" style={{ fontSize: 32, fontWeight: 600, color: "#2D2D2D" }}>
            Lo que dicen +10,000 huéspedes satisfechos
          </h2>
        </div>

        {/* Average rating */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="font-bold text-foreground" style={{ fontSize: 32 }}>4.9</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" aria-hidden="true" />
              ))}
            </div>
          </div>
          <p style={{ fontSize: 16, color: "#6B6B6B" }}>⭐ 4.9 de 5 — basado en 10,000+ reseñas en Airbnb</p>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {testimonials.map((t, index) => (
            <article
              key={index}
              className="flex-shrink-0 w-[82vw] sm:w-[340px] lg:w-[calc(33.333%-16px)] bg-card rounded-2xl p-6 shadow-sm border border-border/50 relative snap-start"
            >
              <Quote className="absolute top-5 right-5 w-7 h-7 text-primary/15" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                <span style={{ fontSize: 14, color: "#F59E0B", letterSpacing: 2 }}>★★★★★</span>
                <span className="text-xs text-muted-foreground ml-1">5/5</span>
              </div>

              <p className="mb-5" style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.6 }}>
                "<span className="font-bold" style={{ color: "#2D2D2D" }}>{t.highlight}</span> — {t.text}"
              </p>

              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center flex-shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.country} · {t.date}</p>
                  <button
                    onClick={() => scrollToProperty(t.property)}
                    className="text-xs text-primary hover:underline mt-0.5 text-left"
                  >
                    {t.property}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
