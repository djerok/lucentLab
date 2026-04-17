import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * SpotlightCard — radial cursor-tracking glow on hover. Pure CSS-var.
 * Inspired by 21st.dev "Spotlight Card". Spotlight color defaults to --phos
 * but can be set per-card so each AP unit can glow its own hue.
 */
export type SpotlightCardProps = {
  children: ReactNode;
  spotlightColor?: string;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'a';
  href?: string;
  ariaLabel?: string;
};

export default function SpotlightCard({
  children, spotlightColor = 'var(--phos)', className, style, as = 'div', href, ariaLabel,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const onLeave = () => setPos(null);

  const Cmp = as as 'div';
  const extra = as === 'a' ? { href, 'aria-label': ariaLabel } : {};

  return (
    <Cmp
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...extra}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        ...style,
      }}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position: 'absolute', inset: 0,
          opacity: pos ? 1 : 0,
          transition: 'opacity 200ms',
          background: pos
            ? `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}24, transparent 60%)`
            : 'transparent',
        }}
      />
      {children}
    </Cmp>
  );
}

export { SpotlightCard };
