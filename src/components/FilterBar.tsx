import { useState } from "react";
import { MapPin, Users, DollarSign, SlidersHorizontal, X } from "lucide-react";
import { zones, priceRanges, guestOptions } from "@/data/properties";

interface FilterBarProps {
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  selectedGuests: number;
  setSelectedGuests: (guests: number) => void;
  selectedPriceRange: { min: number; max: number };
  setSelectedPriceRange: (range: { min: number; max: number }) => void;
}

const FilterBar = ({
  selectedZone,
  setSelectedZone,
  selectedGuests,
  setSelectedGuests,
  selectedPriceRange,
  setSelectedPriceRange,
}: FilterBarProps) => {
  const [open, setOpen] = useState(false);

  const hasFilters = selectedZone || selectedGuests > 0 || selectedPriceRange.min > 0 || selectedPriceRange.max < Infinity;

  const filterContent = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-foreground">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          Zona
        </label>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <option value="">Todas las zonas</option>
          {zones.map((zone) => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-foreground">
          <Users className="w-4 h-4 mr-2 text-primary" />
          Huéspedes
        </label>
        <select
          value={selectedGuests}
          onChange={(e) => setSelectedGuests(Number(e.target.value))}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          {guestOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-foreground">
          <DollarSign className="w-4 h-4 mr-2 text-primary" />
          Precio por noche
        </label>
        <select
          value={JSON.stringify(selectedPriceRange)}
          onChange={(e) => setSelectedPriceRange(JSON.parse(e.target.value))}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={JSON.stringify({ min: range.min, max: range.max })}>{range.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: inline filters */}
      <div className="hidden md:block bg-card rounded-xl shadow-soft p-6 mb-10">
        {filterContent}
      </div>

      {/* Mobile: button + bottom sheet */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-card rounded-xl shadow-soft px-4 py-3.5 text-foreground font-medium min-h-[48px]"
        >
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Filtrar propiedades
          {hasFilters && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>
          )}
        </button>
      </div>

      {/* Bottom sheet overlay */}
      {open && (
        <div className="fixed inset-0 z-[90] md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 inset-x-0 bg-card rounded-t-2xl p-6 animate-slide-up"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-foreground text-lg">Filtros</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted min-w-[44px] min-h-[44px]"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setOpen(false)}
              className="w-full mt-5 bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl min-h-[48px]"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
