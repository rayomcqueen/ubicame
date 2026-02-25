import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import PropertyCard from "@/components/PropertyCard";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import FloatingButtons from "@/components/FloatingButtons";
import MobileStickyBar from "@/components/MobileStickyBar";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { ChevronDown } from "lucide-react";

const INITIAL_COUNT = 6;

const Index = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Infinity });
  const [showAll, setShowAll] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesZone = !selectedZone || property.location === selectedZone;
      const matchesGuests = selectedGuests === 0 || 
        (selectedGuests === 7 ? property.guests >= 7 : property.guests <= selectedGuests && property.guests >= selectedGuests - 1);
      const matchesPrice = property.price >= selectedPriceRange.min && property.price <= selectedPriceRange.max;
      
      return matchesZone && matchesGuests && matchesPrice;
    });
  }, [selectedZone, selectedGuests, selectedPriceRange]);

  const isFiltering = selectedZone || selectedGuests > 0 || selectedPriceRange.min > 0 || selectedPriceRange.max < Infinity;
  const displayedProperties = isFiltering || showAll
    ? filteredProperties
    : filteredProperties.slice(0, INITIAL_COUNT);
  const hasMore = !isFiltering && !showAll && filteredProperties.length > INITIAL_COUNT;

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Properties Section */}
      <section id="propiedades" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-medium tracking-widest text-sm uppercase">
              Explora
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
              Propiedades destacadas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre espacios únicos en las mejores ubicaciones. Cada propiedad ha sido 
              seleccionada para ofrecerte una experiencia excepcional.
            </p>
          </div>

          <FilterBar
            selectedZone={selectedZone}
            setSelectedZone={setSelectedZone}
            selectedGuests={selectedGuests}
            setSelectedGuests={setSelectedGuests}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
          />

          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProperties.map((property, index) => (
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
                  setSelectedZone("");
                  setSelectedGuests(0);
                  setSelectedPriceRange({ min: 0, max: Infinity });
                }}
                className="mt-4 px-6 py-2 btn-primary rounded-lg"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-base transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Ver las {filteredProperties.length} propiedades
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              Mostrando {displayedProperties.length} de {filteredProperties.length} propiedades
            </p>
          </div>
        </div>
      </section>

      <AboutSection />
      <Testimonials />
      <CTASection />
      <Footer />
      <FloatingButtons />
      <MobileStickyBar />
    </div>
  );
};

export default Index;
