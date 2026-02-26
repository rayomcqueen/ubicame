import { useState } from "react";
import { MapPin, Users, CalendarDays, Search, X } from "lucide-react";
import { zones, guestOptions } from "@/data/properties";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  selectedGuests: number;
  setSelectedGuests: (guests: number) => void;
  checkIn: Date | undefined;
  setCheckIn: (d: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (d: Date | undefined) => void;
  onSearch: () => void;
}

const FilterBar = ({
  selectedZone,
  setSelectedZone,
  selectedGuests,
  setSelectedGuests,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  onSearch,
}: FilterBarProps) => {
  const hasFilters = selectedZone || selectedGuests > 0 || checkIn || checkOut;

  const clearAll = () => {
    setSelectedZone("");
    setSelectedGuests(0);
    setCheckIn(undefined);
    setCheckOut(undefined);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (d: Date | undefined, placeholder: string) =>
    d ? format(d, "d MMM", { locale: es }) : placeholder;

  const selectClass = (active: boolean) =>
    cn(
      "appearance-none border rounded-lg px-3 py-2.5 text-sm bg-background cursor-pointer min-h-[44px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
      active ? "border-primary text-foreground font-medium" : "border-border text-foreground"
    );

  return (
    <>
      {/* Desktop: single-row search bar */}
      <div className="hidden md:flex items-end gap-3 bg-card rounded-xl shadow-soft p-4 mb-10">
        {/* Check-in */}
        <div className="flex-1 space-y-1.5">
          <label className="flex items-center text-xs font-medium text-muted-foreground">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-primary" aria-hidden="true" />
            Check-in
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(selectClass(!!checkIn), "w-full text-left")}>
                {formatDate(checkIn, "Fecha entrada")}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(d) => {
                  setCheckIn(d);
                  if (d && checkOut && d >= checkOut) setCheckOut(undefined);
                }}
                disabled={(d) => d < today}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="flex-1 space-y-1.5">
          <label className="flex items-center text-xs font-medium text-muted-foreground">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-primary" aria-hidden="true" />
            Check-out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(selectClass(!!checkOut), "w-full text-left")}>
                {formatDate(checkOut, "Fecha salida")}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(d) => d < (checkIn ? new Date(checkIn.getTime() + 86400000) : today)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex-1 space-y-1.5">
          <label className="flex items-center text-xs font-medium text-muted-foreground">
            <Users className="w-3.5 h-3.5 mr-1.5 text-primary" aria-hidden="true" />
            Huéspedes
          </label>
          <select
            value={selectedGuests}
            onChange={(e) => setSelectedGuests(Number(e.target.value))}
            className={selectClass(selectedGuests > 0) + " w-full"}
          >
            {guestOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Zone */}
        <div className="flex-1 space-y-1.5">
          <label className="flex items-center text-xs font-medium text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" aria-hidden="true" />
            Zona
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className={selectClass(!!selectedZone) + " w-full"}
          >
            <option value="">Todas las zonas</option>
            {zones.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          className="btn-primary rounded-lg px-6 min-h-[44px] flex items-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          Buscar
        </button>
      </div>

      {/* Mobile: stacked compact */}
      <div className="md:hidden bg-card rounded-xl shadow-soft p-4 mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Check-in mobile */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(selectClass(!!checkIn), "w-full text-left text-xs")}>
                <CalendarDays className="w-3.5 h-3.5 inline mr-1.5 text-primary" />
                {formatDate(checkIn, "Check-in")}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(d) => {
                  setCheckIn(d);
                  if (d && checkOut && d >= checkOut) setCheckOut(undefined);
                }}
                disabled={(d) => d < today}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Check-out mobile */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(selectClass(!!checkOut), "w-full text-left text-xs")}>
                <CalendarDays className="w-3.5 h-3.5 inline mr-1.5 text-primary" />
                {formatDate(checkOut, "Check-out")}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(d) => d < (checkIn ? new Date(checkIn.getTime() + 86400000) : today)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={selectedGuests}
            onChange={(e) => setSelectedGuests(Number(e.target.value))}
            className={selectClass(selectedGuests > 0) + " w-full text-xs"}
          >
            <option value="0">👥 Huéspedes</option>
            {guestOptions.filter(o => o.value > 0).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className={selectClass(!!selectedZone) + " w-full text-xs"}
          >
            <option value="">🏘 Zona</option>
            {zones.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        <button
          onClick={onSearch}
          className="btn-primary rounded-lg w-full min-h-[44px] flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          Buscar
        </button>
      </div>

      {hasFilters && (
        <div className="text-center mb-6">
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            Limpiar filtros
          </button>
        </div>
      )}
    </>
  );
};

export default FilterBar;
