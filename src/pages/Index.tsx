import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import PropertyCard from "@/components/PropertyCard";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Infinity });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesCity = !selectedCity || property.city === selectedCity;
      const matchesGuests = selectedGuests === 0 || 
        (selectedGuests === 7 ? property.guests >= 7 : property.guests <= selectedGuests && property.guests >= selectedGuests - 1);
      const matchesPrice = property.price >= selectedPriceRange.min && property.price <= selectedPriceRange.max;
      
      return matchesCity && matchesGuests && matchesPrice;
    });
  }, [selectedCity, selectedGuests, selectedPriceRange]);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta handled in index.html */}
      
      <Hero />

      {/* Properties Section */}
      <section id="propiedades" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-medium tracking-widest text-sm uppercase">
              Explora
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
              Propiedades disponibles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre espacios únicos en las mejores ubicaciones. Cada propiedad ha sido 
              seleccionada para ofrecerte una experiencia excepcional.
            </p>
          </div>

          <FilterBar
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedGuests={selectedGuests}
            setSelectedGuests={setSelectedGuests}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
          />

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron propiedades con los filtros seleccionados.
              </p>
              <button
                onClick={() => {
                  setSelectedCity("");
                  setSelectedGuests(0);
                  setSelectedPriceRange({ min: 0, max: Infinity });
                }}
                className="mt-4 px-6 py-2 btn-primary rounded-lg"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Mostrando {filteredProperties.length} de {properties.length} propiedades
            </p>
          </div>
        </div>
      </section>

      <AboutSection />
      <Testimonials />
      <CTASection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
