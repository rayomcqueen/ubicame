import { useState, useEffect } from "react";
import { WifiOff, Phone, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const OfflineBanner = () => {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-foreground text-background px-4 py-3 shadow-lg animate-slide-up">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <WifiOff className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span className="text-sm font-medium">Sin conexión a internet</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+523333260013"
            className="inline-flex items-center gap-1.5 text-sm hover:underline underline-offset-2"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            33 3326 0013
          </a>
          <a
            href={buildWhatsAppUrl("Hola! Estuve viendo ubicame.com.mx pero se me fue el internet.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm bg-accent text-accent-foreground px-3 py-1.5 rounded-md font-medium"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfflineBanner;
