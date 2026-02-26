import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Propiedades", href: "#propiedades" },
  { label: "Sobre mí", href: "#sobre-mi" },
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const waUrl = buildWhatsAppUrl("Hola! Me interesa rentar una propiedad en Guadalajara");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-[12px] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
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
            className="w-6 h-6 text-primary transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          <span className={`font-serif text-xl font-bold transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>
            Ubicame
          </span>
        </a>

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

        {/* WhatsApp CTA — visible always */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("navbar")}
          className="inline-flex items-center gap-1.5 btn-whatsapp px-4 py-2 text-sm rounded-md"
          aria-label="Reservar por WhatsApp"
        >
          💬 WhatsApp
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
