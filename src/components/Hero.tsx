import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToProperties = () => {
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-olive-light/30 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-4 opacity-0 animate-fade-up">
          Hospedaje con alma
        </span>
        
        <h1 className="font-serif text-foreground mb-6 opacity-0 animate-fade-up stagger-1">
          <span className="block text-2xl md:text-3xl lg:text-4xl font-medium mb-2">Encuentra tu espacio ideal en</span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-semibold">Guadalajara</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-up stagger-2">
          Hospédate diferente. Mejor precio, trato directo, experiencias auténticas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
          <button
            onClick={scrollToProperties}
            className="px-8 py-3.5 btn-primary rounded-full font-medium shadow-elegant hover:shadow-xl transition-all duration-300"
          >
            Ver propiedades
          </button>
          <a
            href="#sobre-mi"
            className="px-8 py-3.5 bg-transparent border-2 border-primary/30 text-foreground rounded-full font-medium hover:bg-primary/5 transition-all duration-300"
          >
            Conoce más
          </a>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToProperties}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 animate-float"
          aria-label="Scroll to properties"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
