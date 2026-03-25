interface WaveSeparatorProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

const WaveSeparator = ({ fromColor = "hsl(var(--background))", toColor = "hsl(var(--primary))", flip = false }: WaveSeparatorProps) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} style={{ marginTop: -1, marginBottom: -1 }}>
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="w-full h-[40px] md:h-[60px]"
    >
      <path
        d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
        fill={toColor}
      />
      <rect width="1200" height="40" fill={fromColor} opacity="0" />
    </svg>
  </div>
);

export default WaveSeparator;
