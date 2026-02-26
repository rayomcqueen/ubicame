import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import property1 from "@/assets/property-1.jpg";
import property6 from "@/assets/property-6.jpg";
import property15 from "@/assets/property-15.jpg";
import property17 from "@/assets/property-17.jpg";

const WA_MESSAGE = "Hola! Quiero planear mi viaje a Guadalajara. Vi tu página ubicame.com.mx";

const cards = [
  {
    title: "Gastronomía",
    text: "Birria, tortas ahogadas, tequila... Guadalajara es capital culinaria de México",
    image: property1,
  },
  {
    title: "Cultura",
    text: "Hospicio Cabañas, Tlaquepaque, mariachis en Plaza de los Mariachis",
    image: property6,
  },
  {
    title: "Vida nocturna",
    text: "Chapultepec, Americana, la mejor escena de bares del país",
    image: property15,
  },
  {
    title: "Eventos 2026",
    text: "Copa del Mundo FIFA 2026 🏟️ — Guadalajara es sede",
    image: property17,
  },
];

const GuadalajaraSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-background">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            Destino
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
            🌮 Guadalajara te espera
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La perla tapatía: cultura, gastronomía y experiencias únicas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`group relative rounded-lg overflow-hidden cursor-pointer reveal ${isVisible ? "visible" : ""}`}
              style={{ aspectRatio: "3/4", transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={card.image}
                alt={`${card.title} en Guadalajara — ${card.text}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/50 group-hover:via-black/20 group-hover:to-transparent transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Descubre todo lo que Guadalajara tiene para ti. Reserva tu hospedaje ideal ahora.
          </p>
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("guadalajara_section")}
            aria-label="Reservar por WhatsApp"
            className="inline-flex items-center gap-2 btn-whatsapp text-lg font-bold px-10 py-4 rounded-full shadow-md"
          >
            💬 Planear mi viaje
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuadalajaraSection;
