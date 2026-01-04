import aboutImage from "@/assets/about-image.png";

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform rotate-3" />
            <img
              src={aboutImage}
              alt="Guadalajara 2026 Ready"
              className="relative rounded-2xl shadow-elegant w-full h-80 lg:h-96 object-contain bg-white p-6"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="text-primary font-medium tracking-widest text-sm uppercase">
              Sobre mí
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
              Hospedaje con experiencia personal
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Con más de 5 años como Superhost en Airbnb, he tenido el privilegio de recibir 
              a viajeros de todo el mundo. Cada una de mis propiedades refleja mi pasión por 
              crear espacios acogedores, funcionales y con personalidad única.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Al reservar directamente conmigo, no solo obtienes los mejores precios, sino 
              también atención personalizada y recomendaciones locales exclusivas para que 
              tu estancia sea inolvidable.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">25+</p>
                <p className="text-muted-foreground text-sm">Propiedades</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">1500+</p>
                <p className="text-muted-foreground text-sm">Huéspedes felices</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">4.9★</p>
                <p className="text-muted-foreground text-sm">Calificación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
