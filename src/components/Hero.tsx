import property1 from "@/assets/property-1.jpg";
import property5 from "@/assets/property-5.jpg";
import property8 from "@/assets/property-8.jpg";
import property12 from "@/assets/property-12.jpg";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! 👋 Vi tu página y me interesa hospedarme en Guadalajara. ¿Me podrías ayudar con opciones disponibles? [desde hero]";

const photos = [
  { src: property1, alt: "Departamento moderno en Guadalajara", rotate: "-2deg" },
  { src: property5, alt: "Suite de lujo con vista panorámica", rotate: "1deg" },
  { src: property8, alt: "Estudio acogedor en zona céntrica", rotate: "-1deg" },
  { src: property12, alt: "Penthouse con terraza privada", rotate: "2deg" },
];

const Hero = () => {
  return (
    <section
      className="bg-white pt-[80px] pb-8 md:pt-[110px] md:pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left column — text */}
        <div className="w-full md:w-[55%] text-center md:text-left flex flex-col items-center md:items-start">
          {/* Badge */}
          <span
            className="inline-block opacity-0 animate-fade-up"
            style={{
              fontSize: 13,
              padding: "6px 16px",
              borderRadius: 999,
              background: "#F0F7E6",
              color: "#6B7B3F",
              border: "1px solid #D4E4BC",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1.5 -mt-0.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#6B7B3F" stroke="#6B7B3F" strokeWidth="1"/>
            </svg>
            Superhost 4.9 · +10,000 huéspedes
          </span>

          {/* H1 */}
          <h1
            className="font-serif opacity-0 animate-fade-up stagger-1"
            style={{
              fontSize: 52,
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#2D2D2D",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Hospédate en Guadalajara
          </h1>

          {/* Subtitle */}
          <p
            className="opacity-0 animate-fade-up stagger-2"
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#2D2D2D",
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Desde <span style={{ fontSize: 24, fontWeight: 700, color: "#6B7B3F" }}>$1,500/noche</span> · <span style={{ fontWeight: 600 }}>Hasta 50% de diferencia en precio que un hotel</span>
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-up stagger-2" style={{ marginBottom: 12 }}>
            <a
              href={buildWhatsAppUrl(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "hero")}
              aria-label="Reservar por WhatsApp"
              className="inline-flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
              style={{
                fontSize: 18,
                fontWeight: 600,
                padding: "18px 40px",
                background: "#25D366",
                color: "#FFFFFF",
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1EBE5A";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#25D366";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,211,102,0.3)";
              }}
            >
              {/* WhatsApp SVG icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Reservar por WhatsApp
            </a>
          </div>

          {/* Support text */}
          <p
            className="opacity-0 animate-fade-up stagger-3"
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#757575",
            }}
          >
            Respuesta personal en menos de 5 minutos
          </p>
        </div>

        {/* Right column — photo grid (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-2 gap-3 w-[45%]">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden"
              style={{
                borderRadius: 16,
                transform: `rotate(${photo.rotate})`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={300}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile font overrides handled globally in index.css */}
    </section>
  );
};

export default Hero;
