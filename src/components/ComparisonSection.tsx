import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const WA_MESSAGE = "Hola! Quiero reservar directo y ahorrar. Vi la comparativa en ubicame.com.mx";

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
    <section className="py-12 px-6 bg-muted/30">
      <div ref={ref} className={`max-w-4xl mx-auto reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-10">
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#6B7B3F", textTransform: "uppercase" as const }}>
            Compara y decide
          </span>
          <h2 className="font-serif mt-2 mb-4" style={{ fontSize: 32, fontWeight: 600, color: "#2D2D2D" }}>
            ¿Por qué reservar directo?
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: 16, color: "#6B6B6B", lineHeight: 1.6 }}>
            Mira la diferencia real entre reservar por plataforma y hacerlo directo con nosotros.
          </p>
        </div>

        {/* Two columns — mobile: stacked (Ubicame first), desktop: side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ubicame column — first on mobile */}
          <div
            className="rounded-xl overflow-hidden shadow-sm order-1 md:order-2"
            style={{ backgroundColor: "#F0FDF4", borderTop: "3px solid #22C55E" }}
          >
            <div className="px-6 pt-5 pb-4 text-center">
              <span
                className="inline-block mb-2 rounded-full px-3 py-0.5"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", backgroundColor: "#22C55E", color: "#fff", textTransform: "uppercase" as const }}
              >
                Recomendado
              </span>
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, color: "#166534" }}>
                Ubicame
              </h3>
            </div>
            <ul className="px-6 pb-6 space-y-3">
              {ubicameItems.map((item) => (
                <li key={item} className="flex items-center gap-2" style={{ fontSize: 15, color: "#2D2D2D" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Airbnb column — second on mobile */}
          <div
            className="rounded-xl overflow-hidden shadow-sm order-2 md:order-1"
            style={{ backgroundColor: "#FEF2F2", borderTop: "3px solid #EF4444" }}
          >
            <div className="px-6 pt-5 pb-4 text-center">
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, color: "#991B1B" }}>
                Airbnb
              </h3>
            </div>
            <ul className="px-6 pb-6 space-y-3">
              {airbnbItems.map((item) => (
                <li key={item} className="flex items-center gap-2" style={{ fontSize: 15, color: "#6B7280" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <p className="text-center mt-8" style={{ fontSize: 20, fontWeight: 700, color: "#166534" }}>
          Ahorro promedio: $525 por noche (20%)
        </p>

        {/* CTA */}
        <div className="text-center mt-6">
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "comparison")}
            aria-label="Reservar por WhatsApp"
            className="inline-flex items-center gap-2 btn-whatsapp text-lg font-bold px-10 py-4 rounded-full shadow-md"
          >
            💬 Reservar directo y ahorrar →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
