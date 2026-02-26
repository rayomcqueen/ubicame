import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    emoji: "💰",
    title: "Ahorra 20% real",
    description: "Airbnb cobra comisiones de servicio de hasta $525 por reserva. Conmigo, ese dinero se queda en tu bolsillo.",
  },
  {
    emoji: "💬",
    title: "Respuesta humana, no un bot",
    description: "¿Cansado de esperar 24 horas por un mensaje automático? Yo respondo tu WhatsApp en menos de 5 minutos.",
  },
  {
    emoji: "🕐",
    title: "Flexibilidad real",
    description: "Check-in a las 11pm? Necesitas guardar maletas? Lo resolvemos directo sin depender de las políticas rígidas de la plataforma.",
  },
  {
    emoji: "📍",
    title: "Guía local incluida",
    description: "Te mando mi guía personal de Guadalajara: los mejores tacos, bares, y experiencias que solo un local conoce.",
  },
];

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#6B7B3F", textTransform: "uppercase" as const }}>
          Beneficios
        </span>
        <h2 className="font-serif mt-2" style={{ fontSize: 32, fontWeight: 600, color: "#2D2D2D" }}>
          ¿Por qué reservar directo?
        </h2>
        <p className="text-center mt-2 mb-10 max-w-xl mx-auto" style={{ fontSize: 16, color: "#6B6B6B", lineHeight: 1.6 }}>
          Más barato, más flexible, más personal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`bg-card rounded-2xl p-6 shadow-sm border border-border/50 text-center transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : "0ms" }}
            >
              <span className="text-4xl block mb-3">{b.emoji}</span>
              <h3 className="font-semibold mb-2" style={{ fontSize: 20, fontWeight: 600, color: "#2D2D2D" }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.6 }}>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
