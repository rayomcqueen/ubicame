import property1 from "@/assets/property-1.jpg";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! 👋 Vi tu página y me interesa hospedarme en Guadalajara. ¿Me podrías ayudar con opciones disponibles? [desde hero]";

const Hero = () => {
  const waUrl = buildWhatsAppUrl(WA_MESSAGE);

  return (
    <section className="relative min-h-[480px] md:min-h-[520px] flex items-center">
      {/* Background image */}
      <img
        src={property1}
        alt="Propiedad en Guadalajara"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 100%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
        {/* H1 */}
        <h1
          className="font-serif opacity-0 animate-fade-up"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.15,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          Reserva directo y ahorra hasta 50%
        </h1>

        {/* Subtitle */}
        <p
          className="opacity-0 animate-fade-up stagger-1"
          style={{
            fontSize: "clamp(16px, 2.5vw, 18px)",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          Con más de <strong>10,000 huéspedes</strong> satisfechos, reserva con nosotros desde tan solo{" "}
          <strong style={{ fontSize: "1.15em" }}>$1,500 MXN</strong> la noche.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-up stagger-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, waUrl, "hero")}
            aria-label="Cotizar por WhatsApp"
            className="inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02]"
            style={{
              fontSize: 18,
              fontWeight: 600,
              padding: "16px 36px",
              background: "#25D366",
              color: "#FFFFFF",
              borderRadius: 12,
              boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotizar por WhatsApp
          </a>

          <a
            href="#propiedades"
            className="inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
            style={{
              fontSize: 16,
              fontWeight: 600,
              padding: "14px 32px",
              background: "rgba(255,255,255,0.15)",
              color: "#FFFFFF",
              borderRadius: 12,
              border: "1.5px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(4px)",
            }}
          >
            Ver propiedades
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
