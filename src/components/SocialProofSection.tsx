import { Star } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Huéspedes satisfechos" },
  { value: "4.9", label: "Rating en Airbnb", icon: true },
  { value: "Superhost", label: "Desde 2019" },
];

const quotes = [
  { text: "Mucho mejor que Airbnb — nos ahorró $2,000 en 4 noches.", author: "Roberto M.", country: "🇲🇽" },
  { text: "Pablo responde al instante. La diferencia es enorme.", author: "Ana M.", country: "🇨🇴" },
  { text: "Tercera vez que reservo directo. Ya no uso plataformas.", author: "Carlos R.", country: "🇦🇷" },
];

const SocialProofSection = () => {
  return (
    <section id="testimonios" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Prueba social</span>
          <h2 className="section-title">Miles de huéspedes confían en nosotros</h2>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="block font-serif text-heading font-bold text-2xl md:text-3xl">
                {s.icon && <Star className="inline w-5 h-5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))] mr-1 -mt-1" aria-hidden="true" />}
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Mini quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <blockquote key={q.author} className="bg-card rounded-lg p-5 shadow-system-sm border border-border/50">
              <div className="flex gap-0.5 mb-2 text-sm text-[hsl(var(--gold))]" style={{ letterSpacing: 2 }}>★★★★★</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{q.text}"</p>
              <footer className="text-xs font-medium text-heading">
                {q.country} {q.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
