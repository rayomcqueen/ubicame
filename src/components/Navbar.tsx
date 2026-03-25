import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Propiedades", href: "#propiedades" },
  { label: "Testimonios", href: "#testimonios" },
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
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const waUrl = buildWhatsAppUrl("Hola! Busco hospedaje en Guadalajara");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-1.5"
        >
          <MapPin className={`w-5 h-5 transition-colors ${scrolled ? "text-primary" : "text-white"}`} />
          <span className={`font-serif text-lg font-bold transition-colors ${scrolled ? "text-heading" : "text-white"}`}>
            Ubicame
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`text-sm font-sans font-medium transition-colors ${
                scrolled ? "text-muted-foreground hover:text-heading" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => trackAndOpenWhatsApp(e, waUrl, "navbar")}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
            scrolled
              ? "bg-primary text-primary-foreground hover:bg-primary-dark"
              : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
          }`}
        >
          💬 WhatsApp
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
