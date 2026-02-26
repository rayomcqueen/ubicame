import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Vi la oferta especial en ubicame.com.mx. Me gustaría reservar con el descuento.";

const UrgencyBanner = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[hsl(var(--primary))]/10 via-[hsl(var(--gold))]/10 to-[hsl(var(--primary))]/10">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Stat left */}
        <div className="text-center lg:text-right flex-1">
          <p className="text-3xl font-bold text-foreground">92%</p>
          <p className="text-muted-foreground text-sm">de ocupación promedio</p>
        </div>

        {/* Center content */}
        <div className="text-center flex-[2]">
          <p className="text-4xl mb-3">📅</p>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Fechas populares se llenan rápido
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm">
            Guadalajara es destino mundial 2026. Reserva con anticipación y asegura tu lugar.
          </p>
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("urgency_banner")}
            aria-label="Reservar por WhatsApp"
            className="inline-flex items-center gap-2 btn-whatsapp font-semibold px-8 py-3.5 rounded-full shadow-md transition-transform hover:scale-105"
          >
            💬 Consultar fechas disponibles
          </a>
        </div>

        {/* Stat right */}
        <div className="text-center lg:text-left flex-1">
          <p className="text-3xl font-bold text-foreground">&lt;2h</p>
          <p className="text-muted-foreground text-sm">para confirmar reservas</p>
        </div>
      </div>
    </section>
  );
};

export default UrgencyBanner;
