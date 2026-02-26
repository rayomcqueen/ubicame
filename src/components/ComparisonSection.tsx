import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const WA_MESSAGE = "Hola! Quiero reservar directo y ahorrar [desde comparativa]";

const airbnbItems = [
  "❌ $2,625/noche",
  "❌ Comisión $525+",
  "❌ Bot + email",
  "❌ 2-24 hrs respuesta",
  "❌ Cancelación rígida",
];

const ubicameItems = [
  "✅ $2,100/noche",
  "✅ Sin comisión",
  "✅ WhatsApp directo",
  "✅ <5 min respuesta",
  "✅ Cancelación flexible",
];

const ComparisonSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding bg-muted/30">
      <div ref={ref} className={`max-w-4xl mx-auto reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12">
          <span className="section-label">Compara y decide</span>
          <h2 className="section-title">¿Por qué reservar directo?</h2>
          <p className="section-subtitle">
            Mira la diferencia real entre reservar por plataforma y hacerlo directo con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ubicame — first on mobile */}
          <div className="rounded-lg overflow-hidden shadow-system-sm order-1 md:order-2 bg-primary/5 border-t-[3px] border-accent">
            <div className="px-6 pt-5 pb-4 text-center">
              <span className="inline-block mb-2 rounded-full px-3 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-accent text-accent-foreground">
                Recomendado
              </span>
              <h3 className="font-serif text-lg font-semibold text-primary">Ubicame</h3>
            </div>
            <ul className="px-6 pb-6 space-y-3">
              {ubicameItems.map((item) => (
                <li key={item} className="text-sm text-heading">{item}</li>
              ))}
            </ul>
          </div>

          {/* Airbnb */}
          <div className="rounded-lg overflow-hidden shadow-system-sm order-2 md:order-1 bg-destructive/5 border-t-[3px] border-destructive/40">
            <div className="px-6 pt-5 pb-4 text-center">
              <h3 className="font-serif text-lg font-semibold text-destructive">Airbnb</h3>
            </div>
            <ul className="px-6 pb-6 space-y-3">
              {airbnbItems.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center mt-8 font-serif font-bold text-primary text-lg">
          Hasta 50% de diferencia en precio que un hotel
        </p>

        <div className="text-center mt-6">
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "comparison")}
            aria-label="Reservar por WhatsApp"
            className="btn-whatsapp rounded-full !px-10"
          >
            💬 Reservar directo y ahorrar →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
