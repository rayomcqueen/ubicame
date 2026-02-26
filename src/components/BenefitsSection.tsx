const benefits = [
  {
    emoji: "💰",
    title: "Reserva directo, sin comisiones",
    description: "Te ahorras la comisión de plataforma. Mismo departamento, mejor precio.",
  },
  {
    emoji: "📉",
    title: "Hasta 20% menos que Airbnb",
    description: "Sin intermediarios el ahorro es real y directo en tu bolsillo.",
  },
  {
    emoji: "💬",
    title: "Atención humana en <5 min",
    description: "Nada de bots. Pablo te responde por WhatsApp al instante.",
  },
  {
    emoji: "🧾",
    title: "Facturación disponible",
    description: "Emitimos factura fiscal. Ideal para viajes corporativos y gastos médicos.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">¿Por qué directo?</span>
          <h2 className="section-title">Mejor precio, mejor servicio</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <span className="text-4xl block mb-3">{b.emoji}</span>
              <h3 className="font-serif font-semibold text-heading text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
