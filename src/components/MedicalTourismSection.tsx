import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { Hospital, MapPin, Clock, Shield } from "lucide-react";

const PHONE_NUMBER = "tel:+523333260013";

const hospitals = [
  {
    name: "Hospital Country 2000",
    distance: "5 min",
    specialties: "Cirugía plástica, Bariátrica, Dental",
  },
  {
    name: "Hospital San Javier",
    distance: "8 min",
    specialties: "Cardiología, Ortopedia, Oncología",
  },
  {
    name: "Hospital Puerta de Hierro",
    distance: "10 min",
    specialties: "Cirugía general, Urología, Oftalmología",
  },
  {
    name: "Hospital Ángeles del Carmen",
    distance: "12 min",
    specialties: "Neurología, Traumatología, Dental",
  },
];

const perks = [
  {
    icon: MapPin,
    title: "Cerca de hospitales top",
    desc: "Todos nuestros departamentos están a menos de 15 min de los principales hospitales.",
  },
  {
    icon: Clock,
    title: "Estadías flexibles",
    desc: "Desde 3 noches hasta meses. Ideal para recuperación post-operatoria.",
  },
  {
    icon: Shield,
    title: "Facturación disponible",
    desc: "Emitimos factura fiscal para deducción de gastos médicos y corporativos.",
  },
];

const WA_MSG = "Hola! Necesito hospedaje por turismo médico en Guadalajara. [desde turismo-médico]";

const MedicalTourismSection = () => {
  return (
    <section id="turismo-medico" className="section-padding bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Turismo Médico</span>
          <h2 className="section-title">
            Guadalajara: destino médico de clase mundial
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Miles de pacientes eligen Guadalajara cada año para procedimientos
            médicos y dentales. Hospédate cerca de tu hospital con todas las
            comodidades para tu recuperación.
          </p>
        </div>

        {/* Perks grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {perks.map((p) => (
            <div
              key={p.title}
              className="bg-background rounded-2xl p-6 border border-border/50 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <p.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif font-semibold text-heading text-lg mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Hospital list */}
        <div className="bg-background rounded-2xl border border-border/50 overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
            <Hospital className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-serif font-semibold text-heading">
              Hospitales cercanos
            </h3>
          </div>
          <div className="divide-y divide-border/50">
            {hospitals.map((h) => (
              <div
                key={h.name}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
              >
                <span className="font-medium text-foreground min-w-[200px]">
                  {h.name}
                </span>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit">
                  {h.distance}
                </span>
                <span className="text-sm text-muted-foreground">
                  {h.specialties}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={buildWhatsAppUrl(WA_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) =>
              trackAndOpenWhatsApp(
                e,
                buildWhatsAppUrl(WA_MSG),
                "medical_tourism",
                "turismo_medico"
              )
            }
            className="btn-whatsapp rounded-full px-8 py-3.5 text-center font-semibold"
          >
            💬 Cotizar hospedaje médico
          </a>
          <a
            href={PHONE_NUMBER}
            className="btn-outline rounded-full px-8 py-3.5 text-center font-semibold inline-flex items-center justify-center gap-2"
            onClick={() => {
              (window as any).dataLayer = (window as any).dataLayer || [];
              (window as any).dataLayer.push({
                event: "click_to_call",
                click_location: "medical_tourism",
              });
            }}
          >
            📞 Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default MedicalTourismSection;
