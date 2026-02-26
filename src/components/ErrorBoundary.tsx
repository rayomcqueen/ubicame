import { Component, ErrorInfo, ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Could send to analytics
  }

  render() {
    if (this.state.hasError) {
      const wa = buildWhatsAppUrl("Hola! La página ubicame.com.mx tuvo un error. ¿Me puedes ayudar?");
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center max-w-md">
            <p className="text-5xl mb-4">🏠</p>
            <h1 className="text-2xl font-semibold mb-2">
              Algo salió mal
            </h1>
            <p className="text-muted-foreground mb-6">
              Estamos solucionándolo. Mientras tanto, contáctame directo:
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp text-white font-semibold px-8 py-4 rounded-full"
            >
              💬 Contactar por WhatsApp
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Tel: <a href="tel:+5213333260013" className="underline text-primary">+52 1 33 3326 0013</a>
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
