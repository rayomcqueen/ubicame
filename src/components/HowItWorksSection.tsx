const steps = [
  {
    number: "1",
    title: "Elige tu propiedad",
    description: "Explora nuestras opciones y encuentra la ideal para ti.",
  },
  {
    number: "2",
    title: "Escríbenos por WhatsApp",
    description: "Pregunta disponibilidad y recibe atención inmediata.",
  },
  {
    number: "3",
    title: "Confirma y listo",
    description: "Reserva segura, pago flexible, check-in sin complicaciones.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Proceso</span>
          <h2 className="section-title">Así de fácil</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-serif font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-serif font-semibold text-heading text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
