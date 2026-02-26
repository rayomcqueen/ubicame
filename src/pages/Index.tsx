import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BenefitsSection from "@/components/BenefitsSection";
import FilterBar from "@/components/FilterBar";
import ComparisonSection from "@/components/ComparisonSection";
import PropertyCard from "@/components/PropertyCard";
import MapSection from "@/components/MapSection";
import GuadalajaraSection from "@/components/GuadalajaraSection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import UrgencyBanner from "@/components/UrgencyBanner";
import CTASection from "@/components/CTASection";
import FloatingButtons from "@/components/FloatingButtons";
import MobileStickyBar from "@/components/MobileStickyBar";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import OfflineBanner from "@/components/OfflineBanner";
import FAQSection from "@/components/FAQSection";
import { properties } from "@/data/properties";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";
import { Home } from "lucide-react";

const INITIAL_COUNT = 6;

const Index = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Infinity });
  const [showAll, setShowAll] = useState(false);

  // Listen for zone filter from map section
  useEffect(() => {
    const handler = (e: Event) => {
      const zone = (e as CustomEvent).detail;
      setSelectedZone(zone);
      setShowAll(false);
    };
    window.addEventListener("filter-zone", handler);
    return () => window.removeEventListener("filter-zone", handler);
  }, []);

  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesZone = !selectedZone || property.location === selectedZone;
      const matchesGuests = selectedGuests === 0 || 
        (selectedGuests === 7 ? property.guests >= 7 : property.guests <= selectedGuests && property.guests >= selectedGuests - 1);
      const matchesPrice = property.price >= selectedPriceRange.min && property.price <= selectedPriceRange.max;
      
      return matchesZone && matchesGuests && matchesPrice;
    });

    // Sort: badged properties first, then by rating descending
    return filtered.sort((a, b) => {
      const badgeWeight = (p: typeof a) => (p.badge === "popular" ? 2 : p.badge === "demand" ? 1 : 0);
      const diff = badgeWeight(b) - badgeWeight(a);
      return diff !== 0 ? diff : b.rating - a.rating;
    });
  }, [selectedZone, selectedGuests, selectedPriceRange]);

  const isFiltering = selectedZone || selectedGuests > 0 || selectedPriceRange.min > 0 || selectedPriceRange.max < Infinity;
  const displayedProperties = isFiltering || showAll
    ? filteredProperties
    : filteredProperties.slice(0, INITIAL_COUNT);
  const hasMore = !isFiltering && !showAll && filteredProperties.length > INITIAL_COUNT;

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link */}
      <a
        href="#propiedades"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <header>
        <Hero />
      </header>

      <main>
      <BenefitsSection />

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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Home className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="text-foreground text-lg font-medium mb-2">
                No hay propiedades con estos filtros
              </p>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Prueba ajustando tus criterios o contáctame y te ayudo a encontrar tu lugar ideal.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSelectedZone("");
                    setSelectedGuests(0);
                    setSelectedPriceRange({ min: 0, max: Infinity });
                  }}
                  className="px-6 py-2.5 btn-primary rounded-lg"
                >
                  Limpiar filtros
                </button>
                <a
                  href={buildWhatsAppUrl("Hola! No encuentro una propiedad con los filtros que busco. ¿Me ayudas?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("empty_filters")}
                  aria-label="Pedir ayuda por WhatsApp"
                  className="inline-flex items-center justify-center gap-2 btn-whatsapp px-6 py-2.5 rounded-lg text-sm"
                >
                  💬 Ayúdame a encontrar
                </a>
              </div>
            </div>
          )}

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-base transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Ver las {filteredProperties.length} propiedades →
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

      <GuadalajaraSection />
      <MapSection />
      <AboutSection />
      <UrgencyBanner />
      <Testimonials />
      <ComparisonSection />
      <CTASection />
      <FAQSection />
      </main>

      <Footer />
      <FloatingButtons />
      <MobileStickyBar />
      <ExitIntentPopup />
      <OfflineBanner />
    </div>
  );
};

export default Index;
