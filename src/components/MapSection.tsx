import { useState, useMemo } from "react";
import { MapPin, Home, DollarSign, ArrowRight } from "lucide-react";
import { properties } from "@/data/properties";

interface ZoneData {
  name: string;
  label: string;
  description: string;
  // SVG map pin positions (percentage based)
  x: number;
  y: number;
}

const ZONES: ZoneData[] = [
  { name: "Andares", label: "Andares", description: "Zona premium con plazas de lujo", x: 28, y: 28 },
  { name: "Puerta de Hierro", label: "Puerta de Hierro", description: "Exclusiva y moderna", x: 22, y: 20 },
  { name: "La Americana", label: "La Americana", description: "Zona céntrica con personalidad", x: 52, y: 55 },
  { name: "Chapultepec", label: "Chapultepec", description: "Bares, cafés y vida nocturna", x: 48, y: 48 },
  { name: "Guadalupe", label: "Guadalupe", description: "Cerca del Estadio Akron", x: 30, y: 60 },
  { name: "Zona Real", label: "Zona Real", description: "Residencial y tranquila", x: 18, y: 38 },
  { name: "Chapalita", label: "Chapalita", description: "Tradicional y familiar", x: 38, y: 45 },
  { name: "Ladrón de Guevara", label: "Ladrón de Guevara", description: "Céntrica y accesible", x: 55, y: 42 },
];

const MapSection = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zoneStats = useMemo(() => {
    const stats: Record<string, { count: number; minPrice: number; maxPrice: number }> = {};
    for (const p of properties) {
      if (!stats[p.location]) {
        stats[p.location] = { count: 0, minPrice: Infinity, maxPrice: 0 };
      }
      stats[p.location].count++;
      stats[p.location].minPrice = Math.min(stats[p.location].minPrice, p.price);
      stats[p.location].maxPrice = Math.max(stats[p.location].maxPrice, p.price);
    }
    return stats;
  }, []);

  const scrollToProperties = (zoneName: string) => {
    const el = document.getElementById("propiedades");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // Dispatch a custom event so FilterBar can pick it up
    window.dispatchEvent(new CustomEvent("filter-zone", { detail: zoneName }));
  };

  return (
    <section id="zonas" className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            Ubicaciones
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
            📍 Las mejores zonas de Guadalajara
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todas nuestras propiedades están en zonas seguras, bien conectadas y cerca de lo que importa.
          </p>
        </div>

        {/* SVG Map */}
        <div className="relative bg-card rounded-lg shadow-md overflow-hidden mb-12 mx-auto max-w-4xl">
          <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
            {/* Stylized map background */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full"
              role="img"
              aria-label="Mapa de zonas de propiedades en Guadalajara"
            >
              {/* Background */}
              <rect width="800" height="500" fill="hsl(var(--background))" />

              {/* Stylized roads / grid */}
              <g stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" opacity="0.5">
                {/* Main avenues */}
                <path d="M 0 250 Q 200 230 400 250 Q 600 270 800 250" />
                <path d="M 400 0 Q 380 150 400 250 Q 420 350 400 500" />
                <path d="M 100 100 Q 300 200 500 150 Q 700 100 800 200" />
                <path d="M 0 380 Q 250 350 400 380 Q 600 410 800 370" />
                <path d="M 200 0 Q 220 200 200 350 Q 180 400 200 500" />
                <path d="M 600 0 Q 580 150 600 300 Q 620 400 600 500" />
                {/* Diagonal */}
                <path d="M 100 400 Q 300 300 500 350 Q 650 380 750 300" />
                <path d="M 50 150 Q 200 250 350 200 Q 500 150 650 250" />
              </g>

              {/* Green park areas */}
              <g fill="hsl(var(--primary))" opacity="0.08">
                <ellipse cx="350" cy="220" rx="40" ry="25" />
                <ellipse cx="500" cy="300" rx="30" ry="20" />
                <ellipse cx="180" cy="350" rx="25" ry="18" />
              </g>

              {/* Zone labels (subtle) */}
              <g fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.4" fontFamily="Inter, sans-serif">
                <text x="400" y="480" textAnchor="middle">GUADALAJARA METROPOLITANA</text>
              </g>
            </svg>

            {/* Interactive pins overlay */}
            {ZONES.map((zone) => {
              const stats = zoneStats[zone.name];
              if (!stats) return null;
              const isActive = activeZone === zone.name;

              return (
                <div
                  key={zone.name}
                  className="absolute group"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {/* Pin */}
                  <button
                    onClick={() => setActiveZone(isActive ? null : zone.name)}
                    onMouseEnter={() => setActiveZone(zone.name)}
                    className={`relative flex flex-col items-center transition-transform duration-200 ${
                      isActive ? "scale-125 z-20" : "hover:scale-110 z-10"
                    }`}
                    aria-label={`${zone.label}: ${stats.count} propiedades`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                      isActive ? "bg-primary" : "bg-primary/80 hover:bg-primary"
                    }`}>
                      <MapPin className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <div className="w-2 h-2 bg-primary rotate-45 -mt-1.5" />
                    {/* Zone name under pin */}
                    <span className={`mt-1 text-[10px] md:text-xs font-semibold whitespace-nowrap px-1.5 py-0.5 rounded ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-card/90 text-foreground"
                    }`}>
                      {zone.label}
                    </span>
                  </button>

                  {/* Tooltip */}
                  {isActive && (
                    <div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card rounded-lg shadow-lg border border-border p-4 w-56 z-30 animate-fade-in"
                      onMouseLeave={() => setActiveZone(null)}
                    >
                      <h4 className="font-serif font-semibold text-foreground text-base mb-1">
                        {zone.label}
                      </h4>
                      <p className="text-muted-foreground text-xs mb-2">{zone.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Home className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{stats.count} propiedades disponibles</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>
                          ${stats.minPrice.toLocaleString()} – ${stats.maxPrice.toLocaleString()}/noche
                        </span>
                      </div>
                      <button
                        onClick={() => scrollToProperties(zone.name)}
                        className="w-full btn-primary text-xs py-2 rounded-md flex items-center justify-center gap-1"
                      >
                        Ver propiedades
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Zone Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ZONES.filter((z) => zoneStats[z.name]).map((zone) => {
            const stats = zoneStats[zone.name]!;
            return (
              <button
                key={zone.name}
                onClick={() => scrollToProperties(zone.name)}
                className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground text-sm leading-tight">
                    {zone.label}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{zone.description}</p>
                <p className="text-xs font-medium text-primary">
                  {stats.count} propiedad{stats.count > 1 ? "es" : ""}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Desde ${stats.minPrice.toLocaleString()}/noche
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
