import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "María García",
    initials: "MG",
    country: "🇪🇸 España",
    text: "Increíble experiencia. La propiedad era exactamente como en las fotos y el anfitrión súper atento. Definitivamente volveré a reservar.",
    rating: 5,
    property: "Villa Mediterránea",
    date: "Enero 2026",
  },
  {
    name: "Carlos Rodríguez",
    initials: "CR",
    country: "🇦🇷 Argentina",
    text: "La mejor decisión fue reservar directo. Ahorramos dinero y recibimos tips increíbles sobre la zona. El departamento impecable.",
    rating: 5,
    property: "Loft Industrial Condesa",
    date: "Diciembre 2025",
  },
  {
    name: "Ana Martínez",
    initials: "AM",
    country: "🇨🇴 Colombia",
    text: "Atención de primera. Nos ayudó con todo lo que necesitamos y la casa superó nuestras expectativas. 100% recomendado.",
    rating: 5,
    property: "Casa Colonial Centro",
    date: "Noviembre 2025",
  },
  {
    name: "Roberto M.",
    initials: "RM",
    country: "🇲🇽 México",
    text: "Mucho mejor que Airbnb. El trato directo hace toda la diferencia.",
    rating: 5,
    property: "Penthouse Skyline",
    date: "Febrero 2026",
  },
  {
    name: "Sarah L.",
    initials: "SL",
    country: "🇺🇸 USA",
    text: "Las fotos no le hacen justicia. El lugar es aún mejor en persona.",
    rating: 5,
    property: "Suite Ejecutiva",
    date: "Enero 2026",
  },
  {
    name: "Diego F.",
    initials: "DF",
    country: "🇨🇴 Colombia",
    text: "Tercera vez que me hospedo con Pablo. Ya es mi opción fija en Guadalajara.",
    rating: 5,
    property: "Torre Anuva Premium",
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
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-3">
            Lo que dicen +1,500 huéspedes satisfechos
          </h2>
        </div>

        {/* Average rating */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-4xl md:text-5xl font-bold text-foreground">4.9</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" aria-hidden="true" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Basado en +500 reseñas en Airbnb</p>
        </div>

        {/* Desktop grid / Mobile carousel */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {testimonials.map((t, index) => (
            <article
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-auto bg-card rounded-2xl p-6 shadow-sm border border-border/50 relative snap-start"
            >
              <Quote className="absolute top-5 right-5 w-7 h-7 text-primary/15" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" aria-hidden="true" />
                ))}
              </div>

              <p className="text-muted-foreground mb-5 leading-relaxed italic text-sm">
                "{t.text}"
              </p>

              <div className="border-t border-border pt-4 flex items-center gap-3">
                {/* Avatar */}
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
