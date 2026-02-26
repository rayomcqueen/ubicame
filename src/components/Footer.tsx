import { MapPin, Phone, MessageCircle, Instagram, Mail, Star, Award } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Tengo una pregunta sobre las propiedades en ubicame.com.mx";

const ZONES = [
  "Andares", "Puerta de Hierro", "La Americana", "Chapultepec",
  "Guadalupe", "Zona Real", "Chapalita", "Ladrón de Guevara",
];

const INFO_LINKS = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "FAQ", href: "#faq" },
  { label: "Testimonios", href: "#testimonios" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const filterZone = (zone: string) => {
  window.dispatchEvent(new CustomEvent("filter-zone", { detail: zone }));
  const el = document.getElementById("propiedades");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="bg-[hsl(0,0%,18%)] text-white/90 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="font-serif text-2xl font-bold">Ubicame</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Hospedaje único con atención personal en Guadalajara. Reserva directo y ahorra.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                Superhost
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium">
                <Award className="w-3 h-3 text-primary" aria-hidden="true" />
                GDL 2026 Ready
              </span>
            </div>
          </div>

          {/* Col 2: Zones */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Zonas</h4>
            <ul className="space-y-2.5">
              {ZONES.map((zone) => (
                <li key={zone}>
                  <button
                    onClick={() => filterZone(zone)}
                    className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors text-sm text-left"
                  >
                    {zone}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Información</h4>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <span className="text-white/60 text-sm">Política de cancelación</span>
              </li>
              <li>
                <span className="text-white/60 text-sm">Términos y condiciones</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("footer")}
                  className="flex items-center gap-2.5 text-white/60 hover:text-accent transition-colors text-sm group"
                  aria-label="Contactar por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 group-hover:text-accent" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="tel:+523333260013"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  33 3326 0013
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/ubicamegdl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/60 hover:text-pink-400 transition-colors text-sm group"
                  aria-label="Seguir en Instagram"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  @ubicamegdl
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@ubicame.com.mx"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  hola@ubicame.com.mx
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2026 Ubicame. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs">
            Superhost desde 2019 · +1,500 huéspedes felices
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
