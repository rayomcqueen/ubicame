import { MapPin, Users, DollarSign } from "lucide-react";
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
  return (
    <>
      {/* Desktop: inline grid */}
      <div className="hidden md:block bg-card rounded-xl shadow-soft p-6 mb-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
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
              <Users className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
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
              <DollarSign className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
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
      </div>

      {/* Mobile: horizontal scrollable row */}
      <div className="md:hidden mb-6 -mx-6 px-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
          <div className="shrink-0">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="appearance-none bg-card border border-border rounded-full px-4 py-2.5 text-sm text-foreground min-h-[44px] min-w-[44px] pr-8 cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="">🏘 Zona</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          <div className="shrink-0">
            <select
              value={selectedGuests}
              onChange={(e) => setSelectedGuests(Number(e.target.value))}
              className="appearance-none bg-card border border-border rounded-full px-4 py-2.5 text-sm text-foreground min-h-[44px] min-w-[44px] pr-8 cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              {guestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value === 0 ? "👥 Huéspedes" : option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="shrink-0">
            <select
              value={JSON.stringify(selectedPriceRange)}
              onChange={(e) => setSelectedPriceRange(JSON.parse(e.target.value))}
              className="appearance-none bg-card border border-border rounded-full px-4 py-2.5 text-sm text-foreground min-h-[44px] min-w-[44px] pr-8 cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={JSON.stringify({ min: range.min, max: range.max })}>
                  {range.min === 0 && range.max === Infinity ? "💰 Precio" : range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
