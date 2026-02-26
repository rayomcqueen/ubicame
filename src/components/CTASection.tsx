import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";

const WA_MESSAGE = "Hola! Quiero reservar un hospedaje en Guadalajara. ¿Qué opciones me recomiendas? 🌮 [desde cta-final]";

const stats = [
  { value: "25+", label: "propiedades" },
  { value: "$1,500", label: "por noche desde" },
  { value: "<5 min", label: "respuesta" },
];

const CTASection = () => {
  const url = buildWhatsAppUrl(WA_MESSAGE);

  return (
    <section className="py-28 px-6 bg-primary/5">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="section-title !text-[32px]">¿Listo para hospedarte en Guadalajara?</h2>

        <p className="section-subtitle mb-10">
          Reserva directo, ahorra 20%, y recibe atención personal de principio a fin.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="block font-serif text-heading font-bold text-xl">{s.value}</span>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => trackAndOpenWhatsApp(e, url, "footer_cta")}
          aria-label="Reservar por WhatsApp"
          className="btn-whatsapp rounded-full cta-pulse !h-14 !px-14 !text-lg"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Reservar por WhatsApp
        </a>

        <p className="mt-6 text-sm text-muted-foreground">
          Sin compromisos · Cancela con flexibilidad
        </p>
      </div>
    </section>
  );
};

export default CTASection;
