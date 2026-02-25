import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";

import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

const STORAGE_KEY = "ubicame_exit_popup_shown";
const WHATSAPP_URL = buildWhatsAppUrl("Hola! Vi la oferta de 15% de descuento en ubicame.com.mx. Me interesa reservar.");

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  const trigger = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShow(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    // Desktop: exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: 30s timer
    const timer = setTimeout(trigger, 30000);

    // Mobile: scroll-up intent
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastY - 100 && currentY > 300) trigger();
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 animate-fade-in"
      onClick={() => setShow(false)}
    >
      <div
        className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-4xl mb-4">🎁</p>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
          ¡Espera! Tengo una oferta especial para ti
        </h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Reserva en las próximas 24 horas y recibe <span className="font-bold text-foreground">15% de descuento</span> en tu primera noche
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("popup")}
          className="block w-full btn-whatsapp font-semibold py-4 rounded-full text-center shadow-md transition-transform hover:scale-105 mb-4"
        >
          💬 Obtener mi descuento por WhatsApp
        </a>

        <button
          onClick={() => setShow(false)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          No gracias, prefiero pagar más en Airbnb
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
