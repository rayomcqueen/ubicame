import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BenefitsSection from "@/components/BenefitsSection";
import SocialProofSection from "@/components/SocialProofSection";
import FilterBar from "@/components/FilterBar";
import PropertyCard from "@/components/PropertyCard";
import FloatingButtons from "@/components/FloatingButtons";
import MobileStickyBar from "@/components/MobileStickyBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import OfflineBanner from "@/components/OfflineBanner";
import { properties } from "@/data/properties";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import { Home, X } from "lucide-react";
import { SearchProvider } from "@/lib/search-context";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

const INITIAL_COUNT = 6;

const Index = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [showAll, setShowAll] = useState(false);
  const [showUrgencyBanner, setShowUrgencyBanner] = useState(() => {
    return sessionStorage.getItem("urgency-banner-closed") !== "true";
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const zone = (e as CustomEvent).detail;
      setSelectedZone(zone);
      setShowAll(false);
    };
    window.addEventListener("filter-zone", handler);
    return () => window.removeEventListener("filter-zone", handler);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesZone = !selectedZone || property.location === selectedZone;
      const matchesGuests = selectedGuests === 0 || 
        (selectedGuests === 7 ? property.guests >= 7 : property.guests >= selectedGuests - 1 && property.guests <= selectedGuests);
      return matchesZone && matchesGuests;
    });
    return filtered.sort((a, b) => {
      const badgeWeight = (p: typeof a) => (p.badge === "popular" ? 2 : p.badge === "demand" ? 1 : 0);
      const diff = badgeWeight(b) - badgeWeight(a);
      return diff !== 0 ? diff : b.rating - a.rating;
    });
  }, [selectedZone, selectedGuests]);

  const isFiltering = selectedZone || selectedGuests > 0;
  const displayedProperties = isFiltering || showAll
    ? filteredProperties
    : filteredProperties.slice(0, INITIAL_COUNT);
  const hasMore = !isFiltering && !showAll && filteredProperties.length > INITIAL_COUNT;

  const buildSearchWhatsApp = () => {
    const parts: string[] = [];
    if (checkIn) parts.push(`Check-in: ${format(checkIn, "d MMM yyyy", { locale: es })}`);
    if (checkOut) parts.push(`Check-out: ${format(checkOut, "d MMM yyyy", { locale: es })}`);
    if (selectedGuests > 0) parts.push(`Huéspedes: ${selectedGuests}`);
    if (selectedZone) parts.push(`Zona: ${selectedZone}`);
    const details = parts.length > 0 ? `\n${parts.join("\n")}` : "";
    return buildWhatsAppUrl(`Hola! Busco hospedaje en Guadalajara.${details} [desde buscador]`);
  };

  const handleSearch = () => {
    const el = document.getElementById("propiedades");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#propiedades" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium">
        Saltar al contenido
      </a>

      {showUrgencyBanner && (
        <div className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-center px-4 h-9 bg-primary/10 text-sm text-primary font-medium">
          <span className="text-center">🔥 Marzo y Abril son los meses más reservados — Asegura tu fecha</span>
          <button onClick={() => { setShowUrgencyBanner(false); sessionStorage.setItem("urgency-banner-closed", "true"); }} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity" aria-label="Cerrar banner">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div style={{ paddingTop: showUrgencyBanner ? 36 : 0 }}>
        <Navbar />

        <header>
          <Hero />
        </header>

        <main>
          {/* 1. Benefits — 3 bullets */}
          <BenefitsSection />

          {/* 2. Social proof */}
          <SocialProofSection />

          {/* 3. Properties */}
          <section id="propiedades" className="section-padding">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Explora</span>
                <h2 className="section-title">Propiedades destacadas</h2>
                <p className="section-subtitle">Espacios únicos en las mejores zonas de Guadalajara.</p>
              </div>

              <FilterBar
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
                selectedGuests={selectedGuests}
                setSelectedGuests={setSelectedGuests}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
                onSearch={handleSearch}
              />

              <SearchProvider value={{ checkIn, checkOut, guests: selectedGuests }}>
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
                  <p className="text-foreground text-lg font-medium mb-2">No encontramos propiedades con esos filtros</p>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">Escríbenos y te buscamos la opción ideal.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => { setSelectedZone(""); setSelectedGuests(0); setCheckIn(undefined); setCheckOut(undefined); }} className="btn-primary rounded-lg">
                      Limpiar filtros
                    </button>
                    <a href={buildSearchWhatsApp()} target="_blank" rel="noopener noreferrer" onClick={(e) => trackAndOpenWhatsApp(e, buildSearchWhatsApp(), "empty_filters")} className="btn-whatsapp rounded-lg">
                      💬 Ayúdame a encontrar
                    </a>
                  </div>
                </div>
              )}
              </SearchProvider>

              {hasMore && (
                <div className="text-center mt-12">
                  <button onClick={() => { setShowAll(true); (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "view_all_properties" }); }} className="btn-outline rounded-full">
                    Ver las {filteredProperties.length}+ propiedades →
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 4. How it works */}
          <Suspense fallback={null}>
            <HowItWorksSection />
          </Suspense>

          {/* 5. FAQ */}
          <Suspense fallback={null}>
            <FAQSection />
          </Suspense>
        </main>

        {/* 6. Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        <FloatingButtons />
        <MobileStickyBar />
        <ExitIntentPopup />
        <OfflineBanner />
      </div>
    </div>
  );
};

export default Index;
