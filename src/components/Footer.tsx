import { Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Tengo una pregunta sobre las propiedades en ubicame.com.mx";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Ubicame</h3>
            <p className="text-background/70 leading-relaxed text-[15px]">
              Hospedaje único con atención personal en Guadalajara. Reserva directo y vive experiencias
              memorables en las mejores ubicaciones.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+523333260013"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors min-h-[44px]"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  +52 33 3326 0013
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("footer")}
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                Guadalajara, Jalisco
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Sígueme</h4>
            <div className="flex gap-4">
              <a
                href={buildWhatsAppUrl(WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("footer")}
                className="w-11 h-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors min-w-[44px] min-h-[44px]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/ubicamegdl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors min-w-[44px] min-h-[44px]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Ubicame. Todos los derechos reservados.
          </p>
          <p className="text-background/60 text-sm">
            Superhost desde 2019 · +1500 huéspedes felices
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
