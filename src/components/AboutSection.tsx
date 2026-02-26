import { CheckCircle } from "lucide-react";
import perfilImg from "@/assets/perfil.jpg";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useScrollReveal, useCountUp } from "@/hooks/use-scroll-reveal";

const WA_MESSAGE = "Hola Pablo! Tengo preguntas sobre tus propiedades en Guadalajara";

const CountStat = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const { ref, count } = useCountUp(target);
  return (
    <div>
      <p className="font-serif font-semibold text-primary" style={{ fontSize: 28 }}>
        <span ref={ref}>{count.toLocaleString()}</span>{suffix}
      </p>
      <p style={{ fontSize: 14, color: "#6B6B6B" }}>{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="sobre-mi" className="py-16 px-6 bg-secondary/30">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto reveal ${isVisible ? "visible" : ""}`}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <img
              src={perfilImg}
              alt="Pablo, tu anfitrión"
              className="w-[140px] h-[140px] lg:w-[180px] lg:h-[180px] rounded-full border-4 border-primary/20 object-cover"
            />
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              Superhost verificado
            </span>
          </div>

          {/* Content */}
          <div className="space-y-4 text-center lg:text-left">
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#6B7B3F", textTransform: "uppercase" as const }}>
                Sobre mí
              </span>
              <h2 className="font-serif mt-2" style={{ fontSize: 32, fontWeight: 600, color: "#2D2D2D" }}>
                Tu anfitrión: Pablo
              </h2>
            </div>

            <p style={{ fontSize: 16, color: "#4A4A4A", lineHeight: 1.6 }}>
              Soy Pablo, Superhost en Airbnb desde 2019. Administro 25+ propiedades en las mejores zonas de Guadalajara. Mi obsesión es que cada huésped tenga una experiencia perfecta — por eso prefiero el trato directo. Cuando reservas conmigo, no solo obtienes un mejor precio: obtienes un guía local que te ayuda con todo.
            </p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8">
              <CountStat target={25} suffix="+" label="Propiedades" />
              <CountStat target={1500} suffix="+" label="Huéspedes" />
              <div>
                <p className="font-serif font-semibold text-primary" style={{ fontSize: 28 }}>4.9★</p>
                <p style={{ fontSize: 14, color: "#6B6B6B" }}>Rating</p>
              </div>
            </div>

            <div>
              <a
                href={buildWhatsAppUrl(WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "about")}
                aria-label="Reservar por WhatsApp"
                className="inline-flex items-center justify-center gap-2 btn-whatsapp font-semibold px-8 py-3.5 rounded-full shadow-md w-full sm:w-auto"
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
