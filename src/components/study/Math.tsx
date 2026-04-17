import katex from 'katex';
import 'katex/dist/katex.min.css';

// Renders TeX source with KaTeX. `display` switches between inline and block mode.
// Intentionally kept tiny — no plugin system, no macros.
export function TeX({ src, display = false }: { src: string; display?: boolean }) {
  const html = katex.renderToString(src, {
    throwOnError: false,
    displayMode: display,
    output: 'html',
    strict: 'ignore',
  });
  return (
    <span
      className={display ? 'tex-block' : 'tex-inline'}
      style={display ? { display: 'block', margin: '6px 0' } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Parses a string for $...$ inline TeX delimiters and returns an array of
// React nodes. Plain-text runs are returned as strings; math runs are returned
// as <TeX> components. Keeps authoring simple — any note body can mix prose
// and math without changing its type.
export function renderTeX(text: string): (string | React.ReactElement)[] {
  const out: (string | React.ReactElement)[] = [];
  const re = /\$([^$]+)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<TeX key={i++} src={m[1]} />);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
