const WA_PHONE = "523333260013";

export const buildWhatsAppUrl = (message: string) =>
  `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
