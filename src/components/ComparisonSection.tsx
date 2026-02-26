import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const WA_MESSAGE = "Hola! Quiero reservar directo y ahorrar. Vi la comparativa en ubicame.com.mx";

const rows = [
  { aspect: "Precio por noche", airbnb: "$2,625", ubicame: "$2,100", ubicameNote: "Ahorra 20%" },
  { aspect: "Comisión de servicio", airbnb: "$525+", ubicame: "$0", ubicameNote: "Sin comisiones" },
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

        {/* Desktop table */}
        <div className="hidden md:block rounded-xl shadow-md overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground bg-muted/50 w-1/3">
                  Aspecto
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold w-1/3" style={{ backgroundColor: "#FFF5F5", color: "#DC2626" }}>
                  Airbnb
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold w-1/3" style={{ backgroundColor: "#F0FFF4", color: "#16A34A" }}>
                  Reserva Directa ✨
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.aspect}>
                  <td className={`py-4 px-6 text-sm font-medium text-foreground ${i % 2 === 0 ? "bg-white" : "bg-muted/20"}`}>
                    {row.aspect}
                  </td>
                  <td
                    className="py-4 px-6 text-center"
                    style={{ backgroundColor: i % 2 === 0 ? "#FFF5F5" : "#FEF0F0" }}
                  >
                    <div className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#6B7280" }}>
                      <span className="text-base" aria-hidden="true">❌</span>
                      {row.airbnb}
                    </div>
                  </td>
                  <td
                    className="py-4 px-6 text-center"
                    style={{ backgroundColor: i % 2 === 0 ? "#F0FFF4" : "#E8FAED" }}
                  >
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#111827" }}>
                      <span className="text-base" aria-hidden="true">✅</span>
                      {row.ubicame}
                    </div>
                    {row.ubicameNote && (
                      <span className="block text-xs mt-0.5 font-medium" style={{ color: "#16A34A" }}>{row.ubicameNote}</span>
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
              className={`rounded-xl border border-border overflow-hidden reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="bg-muted/50 px-4 py-2.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {row.aspect}
                </p>
              </div>
              <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: "#FFF5F5" }}>
                <span className="text-sm">❌</span>
                <span className="text-xs font-medium" style={{ color: "#6B7280" }}>Airbnb:</span>
                <span className="text-sm" style={{ color: "#6B7280" }}>{row.airbnb}</span>
              </div>
              <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: "#F0FFF4" }}>
                <span className="text-sm">✅</span>
                <span className="text-xs font-medium" style={{ color: "#16A34A" }}>Ubicame:</span>
                <span className="text-sm font-medium" style={{ color: "#111827" }}>
                  {row.ubicame}
                  {row.ubicameNote && (
                    <span className="ml-1 text-xs" style={{ color: "#16A34A" }}>({row.ubicameNote})</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "comparison")}
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
