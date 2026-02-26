import { MapPin, MessageCircle, Instagram, Mail, Phone } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Tengo una pregunta sobre las propiedades en ubicame.com.mx";

const ZONES = [
  { label: "Andares", zone: "Andares" },
  { label: "Puerta de Hierro", zone: "Puerta de Hierro" },
  { label: "La Americana", zone: "La Americana" },
  { label: "Chapultepec", zone: "Chapultepec" },
];

const INFO_LINKS = [
  { label: "FAQ", href: "#faq" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Sobre mí", href: "#sobre-mi" },
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
    <footer style={{ backgroundColor: "#1A1A1A" }} className="text-white/90 pt-14 pb-20 md:pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="font-serif text-2xl font-bold text-white">Ubicame</span>
            </div>
            <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6 }}>
              Hospedaje con atención personal en Guadalajara.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com/ubicamegdl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={buildWhatsAppUrl(WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "footer_icon")}
                aria-label="WhatsApp"
                className="text-white/50 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Zonas */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#888", textTransform: "uppercase" as const }} className="mb-4">
              Zonas
            </h4>
            <ul className="space-y-2.5">
              {ZONES.map((z) => (
                <li key={z.zone}>
                  <button
                    onClick={() => filterZone(z.zone)}
                    className="text-left text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    {z.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Información */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#888", textTransform: "uppercase" as const }} className="mb-4">
              Información
            </h4>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#888", textTransform: "uppercase" as const }} className="mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "footer")}
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  +52 33 3326 0013
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@ubicame.com.mx"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors min-h-[44px]"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  hola@ubicame.com.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+523333260013"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  33 3326 0013
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div style={{ borderTop: "1px solid #333" }} className="pt-5 text-center">
          <p style={{ fontSize: 13, color: "#666" }}>
            © 2026 Ubicame — Hospedaje en Guadalajara
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
