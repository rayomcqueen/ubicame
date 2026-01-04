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
  setSelectedPriceRange
}: FilterBarProps) => {
  return (
    <div className="bg-card rounded-xl shadow-soft p-4 md:p-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Zone Filter */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            Zona
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer"
          >
            <option value="">Todas las zonas</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        {/* Guests Filter */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Huéspedes
          </label>
          <select
            value={selectedGuests}
            onChange={(e) => setSelectedGuests(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer"
          >
            {guestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-foreground">
            <DollarSign className="w-4 h-4 mr-2 text-primary" />
            Precio por noche
          </label>
          <select
            value={JSON.stringify(selectedPriceRange)}
            onChange={(e) => setSelectedPriceRange(JSON.parse(e.target.value))}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={JSON.stringify({ min: range.min, max: range.max })}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
