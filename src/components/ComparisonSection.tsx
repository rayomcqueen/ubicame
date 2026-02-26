import { Check, X } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const WA_MESSAGE = "Hola! Quiero reservar directo y ahorrar. Vi la comparativa en ubicame.com.mx";

const rows = [
  { aspect: "Precio por noche", airbnb: "$2,333", ubicame: "$2,100", ubicameNote: "Ahorra 10%" },
  { aspect: "Comisión de servicio", airbnb: "$350+", ubicame: "$0", ubicameNote: "Sin comisiones" },
  { aspect: "Atención", airbnb: "Bot + email", ubicame: "WhatsApp directo 24/7", ubicameNote: "" },
  { aspect: "Tiempo de respuesta", airbnb: "2-24 horas", ubicame: "<5 minutos", ubicameNote: "" },
  { aspect: "Check-in flexible", airbnb: "Limitado", ubicame: "Sí, cuando es posible", ubicameNote: "" },
  { aspect: "Tips locales", airbnb: "No incluido", ubicame: "Guía personalizada", ubicameNote: "" },
  { aspect: "Cancelación", airbnb: "Política fija", ubicame: "Flexible, caso por caso", ubicameNote: "" },
];

const ComparisonSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div ref={ref} className={`max-w-4xl mx-auto reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            Compara y decide
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
            ¿Por qué reservar directo?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mira la diferencia real entre reservar por plataforma y hacerlo directo con nosotros.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-card rounded-lg shadow-md overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground bg-muted/50 w-1/3">
                  Aspecto
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold bg-destructive/5 text-destructive w-1/3">
                  Airbnb
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold bg-accent/10 text-primary w-1/3">
                  Reserva Directa ✨
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="py-4 px-6 text-sm font-medium text-foreground">
                    {row.aspect}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-destructive flex-shrink-0" aria-hidden="true" />
                      {row.airbnb}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                      {row.ubicame}
                    </div>
                    {row.ubicameNote && (
                      <span className="block text-xs text-accent mt-0.5 font-medium">{row.ubicameNote}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {rows.map((row, i) => (
            <div
              key={row.aspect}
              className={`bg-card rounded-lg border border-border p-4 reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {row.aspect}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-destructive/5 rounded-md p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-1 font-medium">Airbnb</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <X className="w-3.5 h-3.5 text-destructive" aria-hidden="true" />
                    <span>{row.airbnb}</span>
                  </div>
                </div>
                <div className="bg-accent/10 rounded-md p-3 text-center">
                  <p className="text-[10px] text-primary mb-1 font-medium">Directo</p>
                  <div className="flex items-center justify-center gap-1 text-sm font-medium text-foreground">
                    <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>{row.ubicame}</span>
                  </div>
                  {row.ubicameNote && (
                    <span className="text-[10px] text-accent font-medium">{row.ubicameNote}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("comparison")}
            aria-label="Reservar por WhatsApp"
            className="inline-flex items-center gap-2 btn-whatsapp text-lg font-bold px-10 py-4 rounded-full shadow-md"
          >
            💬 Reservar directo y ahorrar
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
