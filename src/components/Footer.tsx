import { MapPin, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Me interesa reservar una propiedad en Guadalajara";

const NAV_LINKS = [
  { label: "Propiedades", href: "#propiedades" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
  { label: "Hablemos", href: buildWhatsAppUrl(WA_MESSAGE), external: true },
];

const scrollToWithOffset = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-white/90 pt-14 pb-20 md:pb-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Col 1: Marca */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="font-serif text-xl font-bold text-white">Ubicame</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Reserva directo, ahorra más. Hospedaje premium en Guadalajara.
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <h4 className="section-label !text-white/40 !mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => trackAndOpenWhatsApp(e, link.href, "footer_nav")}
                      className="text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToWithOffset(link.href); }}
                      className="text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <h4 className="section-label !text-white/40 !mb-4">Contacto</h4>
            <a
              href={buildWhatsAppUrl(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "footer_cta")}
              className="btn-whatsapp w-full mb-4"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp: 33 3326 0013
            </a>
            <p className="text-xs text-white/40 leading-relaxed">
              ⚡ Respuesta promedio en menos de 5 minutos · Lun–Dom 8am–10pm
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-center">
          <p className="text-xs text-white/30">© 2026 Ubicame — Hospedaje en Guadalajara</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
