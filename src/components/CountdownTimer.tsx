import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.total <= 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
      {[
        { value: timeLeft.days, label: "días" },
        { value: timeLeft.hours, label: "hrs" },
        { value: timeLeft.minutes, label: "min" },
        { value: timeLeft.seconds, label: "seg" },
      ].map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          <span
            className="font-sans font-bold text-primary-foreground bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[48px] text-center tabular-nums"
            style={{ fontSize: 22 }}
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-primary-foreground/70 font-sans mt-1" style={{ fontSize: 11 }}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

function getTimeLeft(target: Date) {
  const total = target.getTime() - Date.now();
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default CountdownTimer;
