import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Es seguro reservar directo y no por Airbnb?",
    a: "Absolutamente. Soy Superhost verificado desde 2019 con más de 1,500 huéspedes satisfechos y 4.9 de calificación. Al reservar directo, obtienes el mismo nivel de servicio (o mejor) a un precio menor. Si prefieres, podemos hacer la reserva por Airbnb también.",
  },
  {
    q: "¿Cómo funciona el pago?",
    a: "Aceptamos transferencia bancaria, pago en efectivo, o tarjeta. El pago es 50% al confirmar y 50% al hacer check-in. Envío comprobante de reserva por WhatsApp.",
  },
  {
    q: "¿Qué pasa si necesito cancelar?",
    a: "Ofrezco cancelación flexible hasta 7 días antes sin costo. Para cancelaciones tardías, evaluamos caso por caso. Siempre busco la mejor solución para ambos.",
  },
  {
    q: "¿Las fotos son reales?",
    a: "100%. Todas las fotos son de las propiedades actuales. Si algo no coincide con lo que ves, te reubico sin costo en otra de mis propiedades.",
  },
  {
    q: "¿Tienen estacionamiento?",
    a: "La mayoría de mis propiedades incluyen estacionamiento. Revisa los amenities de cada propiedad o pregúntame directo por WhatsApp.",
  },
  {
    q: "¿Puedo hacer check-in/out flexible?",
    a: "Sí, cuando la disponibilidad lo permite ofrezco early check-in y late check-out sin costo adicional. Solo pregúntame.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-6 bg-muted/40">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            FAQ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3">
            Preguntas frecuentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-xl border border-border/50 px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5 text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
