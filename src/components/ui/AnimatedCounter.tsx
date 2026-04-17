import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * AnimatedCounter — tweens between numeric values so readouts (pH, T_f, ΔG)
 * glide instead of flash-rerendering. Pure rAF, no deps.
 */
export type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  duration?: number;     // ms
  prefix?: string;
  suffix?: string;
  style?: CSSProperties;
  className?: string;
};

export default function AnimatedCounter({
  value, decimals = 2, duration = 220, prefix = '', suffix = '', style, className,
}: AnimatedCounterProps) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = shown;
    startRef.current = performance.now();
    const target = value;
    const from = fromRef.current;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(from + (target - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}{Number.isFinite(shown) ? shown.toFixed(decimals) : '—'}{suffix}
    </span>
  );
}

export { AnimatedCounter };
