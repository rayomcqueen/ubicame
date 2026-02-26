import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Propiedades", href: "#propiedades" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const waUrl = buildWhatsAppUrl("Hola! Busco hospedaje en Guadalajara [desde nav]");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        scrolled
          ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
      style={scrolled ? { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" } : undefined}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-1.5 group"
        >
          <MapPin
            className="w-5 h-5 text-primary transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          <span className={`font-serif text-lg font-bold transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>
            Ubicame
          </span>
        </a>

        {/* Price indicator — desktop only, visible after scroll */}
        {scrolled && (
          <span className="hidden md:block text-sm text-muted-foreground">
            Desde <strong className="text-heading font-bold">$1,500</strong>/noche
          </span>
        )}

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* WhatsApp CTA — compact */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => trackAndOpenWhatsApp(e, waUrl, "navbar")}
          className="inline-flex items-center gap-1.5 btn-whatsapp px-5 py-2 text-sm rounded-md font-medium"
          style={{ fontSize: "14px", padding: "8px 20px", boxShadow: "none" }}
          aria-label="Reservar por WhatsApp"
        >
          💬 WhatsApp
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
