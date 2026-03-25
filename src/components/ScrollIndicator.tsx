import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce">
    <ChevronDown className="w-6 h-6 text-foreground/60" />
  </div>
);

export default ScrollIndicator;
