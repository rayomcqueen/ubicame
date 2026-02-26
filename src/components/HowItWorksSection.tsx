import { MessageCircle, Search, CheckCircle, Clock } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Elige propiedad y fechas",
    description: "Explora nuestras opciones, elige la que más te guste y las fechas de tu viaje.",
  },
  {
    number: "2",
    icon: MessageCircle,
    title: "Te confirmamos por WhatsApp",
    description: "Escríbenos y en minutos te confirmamos disponibilidad con atención personalizada 1:1.",
  },
  {
    number: "3",
    icon: CheckCircle,
    title: "Recibes opciones y confirmas",
    description: "Te enviamos alternativas si es necesario. Eliges, pagas y listo — check-in sin complicaciones.",
  },
];

const HowItWorksSection = () => {
  const waUrl = buildWhatsAppUrl("Hola! Me gustaría reservar un departamento. ¿Me pueden ayudar?");
  const handleCTA = (e: React.MouseEvent) => {
    trackAndOpenWhatsApp(e, waUrl, "how_it_works_cta");
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Proceso</span>
          <h2 className="section-title">Así de fácil</h2>
          <p className="text-muted-foreground mt-2">Sin calendarios ni formularios. Todo por WhatsApp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Paso {step.number}</span>
                <h3 className="font-serif font-semibold text-heading text-lg mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 space-y-3">
          <button
            onClick={handleCTA}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            Escríbenos por WhatsApp
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Respondemos en menos de 5 minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
