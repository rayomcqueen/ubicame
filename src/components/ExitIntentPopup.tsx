import { useEffect, useState, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const SESSION_KEY = "ubicame_exit_popup_dismissed";
const WA_CLICKED_KEY = "ubicame_wa_clicked";
const MOBILE_DELAY = 60_000; // 60s for mobile
const WA_MESSAGE = "Hola! Vi la oferta de 15% de descuento en ubicame.com.mx";

function wasDismissed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function hasClickedWhatsApp(): boolean {
  return localStorage.getItem(WA_CLICKED_KEY) === "1";
}

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const triggered = useRef(false);

  const trigger = useCallback(() => {
    if (triggered.current) return;
    if (wasDismissed() || hasClickedWhatsApp()) return;
    triggered.current = true;
    setShow(true);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "popup_shown" });
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (wasDismissed() || hasClickedWhatsApp()) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // Suppress if user clicks any WA link
    const onWaClick = () => {
      localStorage.setItem(WA_CLICKED_KEY, "1");
      setShow(false);
      triggered.current = true;
    };
    document.addEventListener("ubicame:wa_click", onWaClick);

    let cleanup: (() => void)[] = [];

    if (!isMobile) {
      // DESKTOP: exit-intent only
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) trigger();
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      cleanup.push(() => document.removeEventListener("mouseleave", handleMouseLeave));
    } else {
      // MOBILE: 60s timer only, no scroll trigger
      const timer = setTimeout(() => {
        if (!hasClickedWhatsApp()) trigger();
      }, MOBILE_DELAY);
      cleanup.push(() => clearTimeout(timer));
    }

    return () => {
      document.removeEventListener("ubicame:wa_click", onWaClick);
      cleanup.forEach((fn) => fn());
    };
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Oferta especial de descuento"
    >
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in"
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-4xl mb-4">🎁</p>
        <h3 className="font-serif text-2xl font-semibold mb-2" style={{ color: "#2D2D2D" }}>
          ¿Te vas sin reservar?
        </h3>
        <p className="mb-6" style={{ fontSize: 15, color: "#6B6B6B", lineHeight: 1.6 }}>
          Obtén <span className="font-bold" style={{ color: "#2D2D2D" }}>15% de descuento</span> en tu primera noche
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
          aria-label="Obtener descuento por WhatsApp"
          className="block w-full btn-whatsapp font-semibold py-4 rounded-full text-center shadow-md transition-transform hover:scale-105 mb-4 min-h-[48px]"
        >
          💬 Obtener descuento por WhatsApp
        </a>

        <button
          onClick={dismiss}
          className="text-sm transition-colors min-h-[44px]"
          style={{ color: "#999" }}
        >
          No gracias
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
