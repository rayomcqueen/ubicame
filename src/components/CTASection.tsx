import { Sparkles } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WHATSAPP_URL = buildWhatsAppUrl("Hola Pablo! Estoy buscando hospedaje en Guadalajara. Vi tu página ubicame.com.mx y me gustaría cotizar.");

const CTASection = () => {
  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Oferta especial</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
          Reserva directo y ahorra 10%
        </h2>
        
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Al reservar directamente conmigo evitas comisiones innecesarias. 
          Recibe atención personalizada y los mejores precios garantizados.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("footer_cta")}
          className="inline-block px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-elegant hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          Reservar ahora por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default CTASection;
