import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    location: "España",
    text: "Increíble experiencia. La propiedad era exactamente como en las fotos y el anfitrión súper atento. Definitivamente volveré a reservar.",
    rating: 5,
    property: "Villa Mediterránea"
  },
  {
    name: "Carlos Rodríguez",
    location: "Argentina",
    text: "La mejor decisión fue reservar directo. Ahorramos dinero y recibimos tips increíbles sobre la zona. El departamento impecable.",
    rating: 5,
    property: "Loft Industrial Condesa"
  },
  {
    name: "Ana Martínez",
    location: "Colombia",
    text: "Atención de primera. Nos ayudó con todo lo que necesitamos y la casa superó nuestras expectativas. 100% recomendado.",
    rating: 5,
    property: "Casa Colonial Centro"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            Testimonios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-3">
            Lo que dicen mis huéspedes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="bg-card rounded-xl p-6 shadow-soft relative opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-xs text-primary mt-1">{testimonial.property}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
