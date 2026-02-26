import { CheckCircle, User } from "lucide-react";
import perfilImg from "@/assets/perfil.jpg";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { useCountUp } from "@/hooks/use-scroll-reveal";

const WA_MESSAGE = "Hola Pablo! Tengo preguntas sobre tus propiedades [desde about]";

const AboutSection = () => {
  const waUrl = buildWhatsAppUrl(WA_MESSAGE);
  const { ref: propRef, count: propCount } = useCountUp(25, 1500);
  const { ref: guestRef, count: guestCount } = useCountUp(1500, 1500);
  const { ref: ratingRef, count: ratingCount } = useCountUp(49, 1500);

  return (
    <section id="sobre-mi" className="px-6" style={{ paddingTop: 48, paddingBottom: 48, background: "hsl(var(--secondary) / 0.3)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center lg:text-left mb-4">
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#6B7B3F", textTransform: "uppercase" }}>
            Sobre mí
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-[120px] h-[120px] rounded-full border-4 border-primary/20 overflow-hidden">
              {perfilImg ? (
                <img src={perfilImg} alt="Pablo, tu anfitrión" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> Superhost
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <h2 className="font-serif" style={{ fontSize: 32, fontWeight: 600, color: "#2D2D2D" }}>
              Tu anfitrión: Pablo
            </h2>

            <p style={{ fontSize: 16, color: "#4A4A4A", lineHeight: 1.6 }}>
              Soy Pablo, Superhost en Airbnb desde 2019. Administro 25+ propiedades en las mejores zonas de Guadalajara con atención directa y personalizada.
            </p>

            {/* Stats row with count-up */}
            <div className="flex justify-center sm:justify-start gap-6">
              <div className="text-center sm:text-left">
                <p className="font-serif font-bold text-primary" style={{ fontSize: 24 }}>
                  <span ref={propRef}>{propCount}</span>+
                </p>
                <p style={{ fontSize: 13, color: "#6B6B6B" }}>Propiedades</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-serif font-bold text-primary" style={{ fontSize: 24 }}>
                  <span ref={guestRef}>{guestCount.toLocaleString()}</span>+
                </p>
                <p style={{ fontSize: 13, color: "#6B6B6B" }}>Huéspedes</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-serif font-bold text-primary" style={{ fontSize: 24 }}>
                  <span ref={ratingRef}>{(ratingCount / 10).toFixed(1)}</span>★
                </p>
                <p style={{ fontSize: 13, color: "#6B6B6B" }}>Rating</p>
              </div>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackAndOpenWhatsApp(e, waUrl, "about")}
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-2.5 rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-colors"
              style={{ fontSize: 14 }}
            >
              💬 Escríbeme por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
