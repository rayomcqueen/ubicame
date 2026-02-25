import { Camera, CheckCircle } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WHATSAPP_URL = buildWhatsAppUrl("Hola Pablo! Vi tu perfil en ubicame.com.mx y me gustaría hablar sobre hospedaje en Guadalajara.");

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-muted border-4 border-primary/20 flex flex-col items-center justify-center text-muted-foreground">
              <Camera className="w-10 h-10 mb-2" />
              <span className="text-xs">Foto del anfitrión</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4" />
              Superhost verificado
            </span>
          </div>

          {/* Content */}
          <div className="space-y-5 text-center lg:text-left">
            <div>
              <span className="text-primary font-medium tracking-widest text-sm uppercase">
                Sobre mí
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2">
                Tu anfitrión: Pablo
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Soy Pablo, Superhost en Airbnb desde 2019. Administro 25+ propiedades en las mejores zonas de Guadalajara. Mi obsesión es que cada huésped tenga una experiencia perfecta — por eso prefiero el trato directo. Cuando reservas conmigo, no solo obtienes un mejor precio: obtienes un guía local que te ayuda con todo.
            </p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-2">
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">25+</p>
                <p className="text-muted-foreground text-sm">Propiedades</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">1500+</p>
                <p className="text-muted-foreground text-sm">Huéspedes</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">4.9★</p>
                <p className="text-muted-foreground text-sm">Rating</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("about")}
                className="inline-flex items-center gap-2 btn-whatsapp font-semibold px-8 py-3.5 rounded-full shadow-md transition-transform hover:scale-105"
              >
                💬 Habla conmigo directo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
