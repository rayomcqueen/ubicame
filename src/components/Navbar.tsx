import { useState, useEffect } from "react";
import { MapPin, Menu, X, Phone, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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
          ? "bg-card/90 backdrop-blur-lg shadow-md"
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
          <span className="font-serif text-xl font-bold text-foreground">
            Ubicame
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("navbar")}
          className="hidden md:inline-flex items-center gap-1.5 btn-whatsapp px-4 py-2 text-sm rounded-md"
          aria-label="Reservar por WhatsApp"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          WhatsApp
        </a>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 rounded-md"
              aria-label="Abrir menú de navegación"
            >
              <Menu
                className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`}
                aria-hidden="true"
              />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 bg-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-serif text-lg font-bold">Ubicame</span>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="px-3 py-3 rounded-md text-foreground font-medium hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <a
                href="tel:+523333260013"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                33 3326 0013
              </a>

              <SheetClose asChild>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("navbar_mobile")}
                  className="btn-whatsapp flex items-center justify-center gap-2 px-4 py-3 rounded-md text-center"
                  aria-label="Reservar por WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Escribir por WhatsApp
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
