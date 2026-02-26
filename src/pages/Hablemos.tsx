import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildWhatsAppUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import { DateRange } from "react-day-picker";

function saveLead(lead: Record<string, string>) {
  try {
    const existing = JSON.parse(localStorage.getItem("ubicame_leads") || "[]");
    existing.push({ ...lead, timestamp: new Date().toISOString() });
    localStorage.setItem("ubicame_leads", JSON.stringify(existing));
  } catch {}
}

const Hablemos = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedName.length > 100) errs.name = "Ingresa tu nombre";
    if (!trimmedPhone || !/^[\d\s+()-]{7,20}$/.test(trimmedPhone)) errs.phone = "Ingresa un teléfono válido";
    if (!dateRange?.from) errs.dates = "Selecciona al menos la fecha de entrada";
    if (!guests) errs.guests = "Selecciona huéspedes";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validate()) return;

    const from = dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "";
    const to = dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "";
    const dateStr = to ? `${from} → ${to}` : from;

    const lead = {
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 20),
      dates: dateStr,
      guests,
    };
    saveLead(lead);

    const msg = `Hola! Soy ${lead.name}.\nBusco hospedaje para ${lead.guests} huésped(es).\nFechas: ${dateStr}\nMi WhatsApp: ${lead.phone}\n[desde /hablemos]`;
    const waUrl = buildWhatsAppUrl(msg);

    setSubmitted(true);
    trackAndOpenWhatsApp(e, waUrl, "hablemos_form", "general");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-28 md:pt-32">
        <div className="max-w-md mx-auto text-center mb-10">
          <span className="section-label">Contacto</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-heading mb-3">
            Hablemos
          </h1>
          <p className="text-muted-foreground">
            Llena el formulario y te contactamos en menos de 5 minutos por WhatsApp.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-2xl font-serif font-bold text-heading">¡Listo!</h2>
              <p className="text-muted-foreground">
                Recibimos tu solicitud. Te respondemos en minutos por WhatsApp.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Enviar otra solicitud
              </Button>
            </div>
          ) : (
            <div className="space-y-5 bg-card border rounded-xl p-6 shadow-sm">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">WhatsApp / Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="+52 33 1234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={20}
                  type="tel"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              {/* Date Range */}
              <div className="space-y-1.5">
                <Label>Fechas</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground",
                        errors.dates && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          `${format(dateRange.from, "dd MMM", { locale: es })} → ${format(dateRange.to, "dd MMM", { locale: es })}`
                        ) : (
                          format(dateRange.from, "dd MMM yyyy", { locale: es })
                        )
                      ) : (
                        "Entrada → Salida"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={1}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dates && <p className="text-xs text-destructive">{errors.dates}</p>}
              </div>

              {/* Guests */}
              <div className="space-y-1.5">
                <Label>Huéspedes</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className={errors.guests ? "border-destructive" : ""}>
                    <SelectValue placeholder="¿Cuántos?" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? "huésped" : "huéspedes"}
                      </SelectItem>
                    ))}
                    <SelectItem value="9+">9+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.guests && <p className="text-xs text-destructive">{errors.guests}</p>}
              </div>

              {/* Submit */}
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleSubmit}
              >
                <MessageCircle className="w-5 h-5" />
                Enviar y cotizar
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                Respondemos en menos de 5 minutos
              </p>
            </div>
          )}
        </div>
      </section>

      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Hablemos;
