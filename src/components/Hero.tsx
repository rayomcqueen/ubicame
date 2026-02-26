import property3 from "@/assets/property-3.jpg";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola Pablo! Estoy buscando hospedaje en Guadalajara. Vi tu página ubicame.com.mx y me gustaría cotizar.";

const Hero = () => {
  return (
    <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={property3}
        alt="Departamento de lujo con vista panorámica en Guadalajara"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      {/* Gradient overlay — transparent top, dark bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-6 md:gap-8 pt-20 pb-12">
        {/* H1 */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight opacity-0 animate-fade-up">
          Hospédate en Guadalajara
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-white/90 opacity-0 animate-fade-up stagger-1">
          Desde <span className="text-[hsl(var(--gold))] font-semibold">$1,900/noche</span> · Ahorra 10% vs Airbnb
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-fade-up stagger-2">
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero")}
            aria-label="Reservar por WhatsApp"
            className="inline-flex items-center gap-2 btn-whatsapp text-lg font-bold px-10 py-4 rounded-full cta-pulse"
          >
            💬 Reservar por WhatsApp
          </a>
          <p className="text-white/60 text-sm mt-3">Respuesta en &lt;5 min</p>
        </div>

        {/* Trust badges */}
        <p className="text-white/70 text-sm opacity-0 animate-fade-up stagger-3">
          Superhost 4.9★ · +1,500 huéspedes · Respuesta inmediata
        </p>
      </div>
    </section>
  );
};

export default Hero;
