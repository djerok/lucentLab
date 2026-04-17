import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

export type SlideTab<T extends string> = { id: T; label: React.ReactNode; accent?: string };

export type SlideTabsProps<T extends string> = {
  tabs: SlideTab<T>[];
  value: T;
  onChange: (id: T) => void;
  size?: 'sm' | 'md';
};

/**
 * SlideTabs — hand-rolled equivalent of the 21st.dev Slide Tabs. The active
 * indicator slides between tabs using FLIP-style position transitions; no
 * framer-motion dep. Pure CSS-var theming.
 */
export default function SlideTabs<T extends string>({
  tabs, value, onChange, size = 'md',
}: SlideTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<Map<T, HTMLButtonElement | null>>(new Map());
  const [pill, setPill] = useState<{ left: number; width: number; opacity: number }>({
    left: 0, width: 0, opacity: 0,
  });

  useLayoutEffect(() => {
    const btn = refs.current.get(value);
    const container = containerRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setPill({ left: bRect.left - cRect.left, width: bRect.width, opacity: 1 });
  }, [value, tabs.length]);

  const padY = size === 'sm' ? 6 : 9;
  const padX = size === 'sm' ? 12 : 16;
  const fontSize = size === 'sm' ? 10 : 11;
  const activeAccent = tabs.find(t => t.id === value)?.accent ?? 'var(--paper)';

  return (
    <div
      ref={containerRef}
      role="tablist"
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexWrap: 'wrap',
        border: '1px solid var(--line-strong)',
        borderRadius: 4,
        background: 'var(--ink-1)',
        padding: 3,
        gap: 2,
      }}
    >
      {/* Sliding pill */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 3, bottom: 3,
          left: pill.left, width: pill.width,
          background: activeAccent,
          borderRadius: 3,
          opacity: pill.opacity,
          transition: 'left 220ms cubic-bezier(.4,.0,.2,1), width 220ms cubic-bezier(.4,.0,.2,1), background 200ms',
          zIndex: 0,
        }}
      />
      {tabs.map(t => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            ref={el => { refs.current.set(t.id, el); }}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className="mono"
            style={{
              position: 'relative', zIndex: 1,
              padding: `${padY}px ${padX}px`,
              background: 'transparent', border: 'none',
              fontSize, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: active ? 'var(--ink-0)' : 'var(--paper-dim)',
              fontWeight: active ? 600 : 400,
              cursor: 'pointer',
              transition: 'color 180ms',
              whiteSpace: 'nowrap',
            } satisfies CSSProperties}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export { SlideTabs };
