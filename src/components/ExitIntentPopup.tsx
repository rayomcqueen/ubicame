import { useEffect, useState, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const STORAGE_KEY = "ubicame_exit_popup_dismissed";
const WA_CLICKED_KEY = "ubicame_wa_clicked";
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
const MIN_TIME_ON_PAGE = 20_000; // 20s minimum before any trigger
const MOBILE_DELAY = 45_000; // 45s for mobile
const WA_MESSAGE = "Hola! Vi la oferta de 15% en ubicame.com.mx";

function wasDismissedRecently(): boolean {
  const ts = localStorage.getItem(STORAGE_KEY);
  if (!ts) return false;
  return Date.now() - Number(ts) < COOLDOWN_MS;
}

function hasClickedWhatsApp(): boolean {
  return localStorage.getItem(WA_CLICKED_KEY) === "1";
}

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const pageLoadTime = useRef(Date.now());
  const triggered = useRef(false);

  const trigger = useCallback(() => {
    if (triggered.current) return;
    if (Date.now() - pageLoadTime.current < MIN_TIME_ON_PAGE) return;
    if (wasDismissedRecently() || hasClickedWhatsApp()) return;
    triggered.current = true;
    setShow(true);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "popup_shown" });
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }, []);

  useEffect(() => {
    if (wasDismissedRecently() || hasClickedWhatsApp()) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // Listen globally for WA clicks to suppress popup
    const onWaClick = () => {
      localStorage.setItem(WA_CLICKED_KEY, "1");
      setShow(false);
    };
    document.addEventListener("ubicame:wa_click", onWaClick);

    let cleanup: (() => void)[] = [];

    if (!isMobile) {
      // DESKTOP: exit-intent only (mouse leaves top of viewport)
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) trigger();
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      cleanup.push(() => document.removeEventListener("mouseleave", handleMouseLeave));
    } else {
      // MOBILE: 45s on page + scroll-up intent
      let ready = false;
      const timer = setTimeout(() => { ready = true; }, MOBILE_DELAY);

      let lastY = window.scrollY;
      const handleScroll = () => {
        if (!ready) { lastY = window.scrollY; return; }
        const currentY = window.scrollY;
        if (currentY < lastY - 120 && currentY > 300) trigger();
        lastY = currentY;
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      cleanup.push(() => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      });
    }

    return () => {
      document.removeEventListener("ubicame:wa_click", onWaClick);
      cleanup.forEach((fn) => fn());
    };
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 animate-fade-in"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Oferta especial de descuento"
    >
      <div
        className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-4xl mb-4">🎁</p>
        <h3 className="font-serif text-2xl font-semibold text-heading mb-2">
          ¡Espera! Tengo una oferta especial para ti
        </h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Reserva en las próximas 24 horas y recibe{" "}
          <span className="font-bold text-heading">15% de descuento</span> en tu primera noche
        </p>

        <a
          href={buildWhatsAppUrl(WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({ event: "popup_cta_click" });
            localStorage.setItem(WA_CLICKED_KEY, "1");
            dismiss();
            trackAndOpenWhatsApp(e, buildWhatsAppUrl(WA_MESSAGE), "popup");
          }}
          aria-label="Reservar por WhatsApp con descuento"
          className="block w-full btn-whatsapp font-semibold py-4 rounded-full text-center shadow-md transition-transform hover:scale-105 mb-4"
        >
          💬 Obtener mi descuento por WhatsApp
        </a>

        <button
          onClick={dismiss}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          No gracias
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
