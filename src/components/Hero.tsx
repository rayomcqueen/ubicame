import property3 from "@/assets/property-3.jpg";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Me interesa hospedarme en Guadalajara. Vi tu página ubicame.com.mx";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '80svh' }}>
      {/* Background image */}
      <img
        src={property3}
        alt="Departamento de lujo con vista panorámica en Guadalajara"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center" style={{ paddingTop: 120, paddingBottom: 48 }}>
        {/* H1 */}
        <h1
          className="font-serif opacity-0 animate-fade-up"
          style={{
            fontSize: 48,
            lineHeight: 1.2,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            marginBottom: 16,
          }}
        >
          Hospédate en Guadalajara
        </h1>

        {/* Subline */}
        <p
          className="opacity-0 animate-fade-up stagger-1"
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            marginBottom: 32,
          }}
        >
          Desde $1,900/noche · Ahorra 20% vs Airbnb
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-fade-up stagger-2" style={{ marginBottom: 12 }}>
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero")}
            aria-label="Reservar por WhatsApp"
            style={{
              display: 'inline-block',
              fontSize: 18,
              fontWeight: 600,
              padding: '16px 48px',
              background: '#25D366',
              color: '#FFFFFF',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#128C7E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#25D366';
            }}
          >
            Reservar por WhatsApp
          </a>
        </div>

        {/* Texto bajo el botón */}
        <p
          className="opacity-0 animate-fade-up stagger-2"
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 24,
          }}
        >
          Respuesta en menos de 5 minutos
        </p>

        {/* Trust line */}
        <p
          className="opacity-0 animate-fade-up stagger-3"
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.02em',
          }}
        >
          Superhost 4.9★ · +1,500 huéspedes · Respuesta inmediata
        </p>
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          section > .relative h1 {
            font-size: 32px !important;
          }
          section > .relative p:first-of-type {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
