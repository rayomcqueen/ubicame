const WA_PHONE = "5213333260013";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;

export function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  let hasUtm = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    sessionStorage.setItem("ubicame_utm", JSON.stringify(utm));
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "page_view_with_utm",
      ...utm,
    });
  }
}

function getUtmRef(): string {
  try {
    const raw = sessionStorage.getItem("ubicame_utm");
    if (!raw) return "";
    const utm = JSON.parse(raw);
    const source = utm.utm_source || "";
    const campaign = utm.utm_campaign || "";
    if (!source && !campaign) return "";
    return ` [Ref: ${[source, campaign].filter(Boolean).join("/")}]`;
  } catch {
    return "";
  }
}

export const buildWhatsAppUrl = (message: string) => {
  const ref = getUtmRef();
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message + ref)}`;
};

export const trackWhatsAppClick = (
  clickLocation: string,
  propertyName = "general",
  propertyPrice = ""
) => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "whatsapp_click",
    property_name: propertyName,
    property_price: propertyPrice,
    click_location: clickLocation,
  });

  // Fire Google Ads conversion
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-17977375274/GLDjCIr5xv8bEKr0o_xC",
    });
  }

  // Signal popup suppression
  document.dispatchEvent(new CustomEvent("ubicame:wa_click"));
  try { localStorage.setItem("ubicame_wa_clicked", "1"); } catch {}
};

/**
 * Track conversion, then open WhatsApp in a new tab after a small delay
 * so the gtag beacon has time to fire.
 */
export const trackAndOpenWhatsApp = (
  e: React.MouseEvent | MouseEvent,
  whatsappUrl: string,
  clickLocation: string,
  propertyName = "general",
  propertyPrice = ""
) => {
  e.preventDefault();
  trackWhatsAppClick(clickLocation, propertyName, propertyPrice);
  setTimeout(() => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, 300);
};
