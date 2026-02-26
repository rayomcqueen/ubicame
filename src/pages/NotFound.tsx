import { MapPin, Home, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola Pablo! Llegué a una página que no existe en ubicame.com.mx. ¿Me ayudas a encontrar hospedaje?";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <MapPin className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          ¡Oops! Esta página se fue de vacaciones 🏖️
        </h1>

        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          No encontramos lo que buscas, pero tenemos 25+ propiedades increíbles esperándote.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#propiedades"
            className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-3.5 rounded-full text-base"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Ver propiedades
          </a>
          <a
            href={buildWhatsAppUrl(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("404")}
            aria-label="Hablar con Pablo por WhatsApp"
            className="inline-flex items-center justify-center gap-2 btn-whatsapp px-8 py-3.5 rounded-full text-base"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Hablar con Pablo
          </a>
        </div>

        <p className="text-muted-foreground text-sm mt-8">
          <a href="/" className="text-primary hover:underline underline-offset-2">← Volver al inicio</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
