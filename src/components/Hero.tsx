import property4 from "@/assets/property-4.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=523333260013&text&type=phone_number&app_absent=0&wame_ctl=1&source_surface=20";

const trustBadges = [
  "✓ Superhost desde 2019",
  "✓ +1,500 huéspedes",
  "✓ 4.9/5 calificación",
  "✓ Respuesta inmediata",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={property4}
        alt="Propiedad con vista panorámica"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pb-24 md:pb-0">
        {/* Urgency banner */}
        <div className="inline-flex items-center gap-2 bg-[hsl(15,80%,50%,0.85)] text-white text-sm font-semibold px-5 py-2 rounded-full mb-6 opacity-0 animate-fade-up">
          🔥 Temporada alta — Pocas fechas disponibles
        </div>

        {/* Headline */}
        <h1 className="font-serif text-white mb-5 opacity-0 animate-fade-up stagger-1">
          <span className="block text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Hospédate en Guadalajara
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mt-1">
            desde <span className="text-[hsl(var(--gold))]">$1,900/noche</span>
          </span>
          <span className="block text-xl md:text-2xl font-medium text-white/80 mt-2">
            Ahorra 10% vs Airbnb
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-up stagger-2">
          Superhost con 4.9★ y +1,500 huéspedes felices. Reserva directo por
          WhatsApp y recibe atención personalizada.
        </p>

        {/* CTA WhatsApp — desktop */}
        <div className="hidden md:flex justify-center opacity-0 animate-fade-up stagger-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-whatsapp text-lg font-bold px-10 py-5 rounded-full shadow-[0_4px_30px_hsl(142,70%,45%,0.45)] animate-[pulse_2.5s_ease-in-out_infinite]"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            💬 Reservar por WhatsApp — Respuesta en &lt;5 min
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 opacity-0 animate-fade-up stagger-4">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="text-white/75 text-sm font-medium whitespace-nowrap"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 btn-whatsapp w-full text-base font-bold py-4 rounded-full shadow-[0_4px_30px_hsl(142,70%,45%,0.45)] animate-[pulse_2.5s_ease-in-out_infinite]"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          💬 Reservar por WhatsApp — Respuesta en &lt;5 min
        </a>
      </div>
    </section>
  );
};

export default Hero;
