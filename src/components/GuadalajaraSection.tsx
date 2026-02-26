import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import property1 from "@/assets/property-1.jpg";
import property6 from "@/assets/property-6.jpg";
import property15 from "@/assets/property-15.jpg";
import property17 from "@/assets/property-17.jpg";

const WA_MESSAGE = "Hola! Quiero planear mi viaje a Guadalajara. Vi tu página ubicame.com.mx";

const cards = [
  { title: "Gastronomía", text: "Birria, tortas ahogadas, tequila... capital culinaria de México", image: property1 },
  { title: "Cultura", text: "Hospicio Cabañas, Tlaquepaque, mariachis", image: property6 },
  { title: "Vida nocturna", text: "Chapultepec, Americana, la mejor escena de bares", image: property15 },
  { title: "Eventos 2026", text: "Copa del Mundo FIFA 2026 🏟️ — GDL es sede", image: property17 },
];

const GuadalajaraSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding bg-background">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12">
          <span className="section-label">Destino</span>
          <h2 className="section-title">Guadalajara te espera</h2>
          <p className="section-subtitle">La perla tapatía: cultura, gastronomía y experiencias únicas</p>
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
                alt={`${card.title} en Guadalajara`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-lg font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "guadalajara_section")}
            aria-label="Reservar por WhatsApp"
            className="btn-whatsapp rounded-full !px-10"
          >
            💬 Planear mi viaje
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuadalajaraSection;
