import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Mis Propiedades</h3>
            <p className="text-background/70 leading-relaxed">
              Hospedaje único con atención personal. Reserva directo y vive experiencias 
              memorables en las mejores ubicaciones de México.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://api.whatsapp.com/send/?phone=523333260013&text&type=phone_number&app_absent=0&wame_ctl=1&source_surface=20" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                  <Phone className="w-4 h-4" />
                  +52 33 3326 0013
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <MapPin className="w-4 h-4" />
                Guadalajara, Jalisco
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Sígueme</h4>
            <div className="flex gap-4">
              <a
                href="https://api.whatsapp.com/send/?phone=523333260013&text&type=phone_number&app_absent=0&wame_ctl=1&source_surface=20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/ubicamegdl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Mis Propiedades. Todos los derechos reservados.
          </p>
          <p className="text-background/60 text-sm">
            Superhost desde 2019 · +1500 huéspedes felices
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
