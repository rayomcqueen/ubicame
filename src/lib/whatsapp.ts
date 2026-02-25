const WA_PHONE = "523333260013";

export const buildWhatsAppUrl = (message: string) =>
  `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

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
};
