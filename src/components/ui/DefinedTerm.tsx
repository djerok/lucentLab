import { useState, type ReactNode } from 'react';

/**
 * DefinedTerm — inline tooltip wrapper. Hover or focus the term to see its
 * definition. Pure CSS-var. No external tooltip library.
 *
 *   <DefinedTerm definition="Activation energy — the kinetic barrier...">Ea</DefinedTerm>
 */
export type DefinedTermProps = {
  children: ReactNode;
  definition: ReactNode;
  accent?: string;
};

export default function DefinedTerm({ children, definition, accent = 'var(--phos)' }: DefinedTermProps) {
  const [show, setShow] = useState(false);
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
      style={{
        position: 'relative',
        borderBottom: `1px dotted ${accent}`,
        cursor: 'help',
        outline: 'none',
      }}
    >
      {children}
      <span
        role="tooltip"
        aria-hidden={!show}
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)', left: '50%',
          transform: `translate(-50%, ${show ? '0' : '4px'})`,
          opacity: show ? 1 : 0,
          pointerEvents: 'none',
          minWidth: 200, maxWidth: 320,
          background: 'var(--ink-1)',
          border: '1px solid var(--line-strong)',
          borderRadius: 4,
          padding: '8px 10px',
          fontSize: 11, lineHeight: 1.45,
          color: 'var(--paper)',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: 0,
          textTransform: 'none',
          boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
          transition: 'opacity 140ms, transform 140ms',
          zIndex: 100,
        }}
      >
        {definition}
      </span>
    </span>
  );
}

export { DefinedTerm };
