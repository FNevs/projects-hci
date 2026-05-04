// thumbnails.jsx — rich content previews
// Each thumbnail is a unique SVG that *suggests* the file's content,
// not a generic file-type icon. Original artwork.

// helpers ─────────────────────────────────────────────────
const Stripes = ({ angle = 35, count = 18, opacity = 0.06 }) => (
  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <pattern id={`stripe-${angle}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
        <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1.2" opacity={opacity}/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#stripe-${angle})`}/>
  </svg>
);

const PaperLines = ({ from = 30, gap = 12, count = 10, widths = [0.9, 0.95, 0.6, 0.85, 0.92, 0.7, 0.88, 0.5, 0.82, 0.4] }) => (
  <div style={{ position: 'absolute', inset: '24px 22px', display: 'flex', flexDirection: 'column', gap: 7 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        height: 4,
        width: `${(widths[i % widths.length] || 0.8) * 100}%`,
        background: 'oklch(0.3 0.02 90 / 0.18)',
        borderRadius: 2,
      }}/>
    ))}
  </div>
);

// PDF-paper thumbnail (warm cream paper with header) ────
function ThumbDoc({ title, subtitle, accent = 'var(--accent-sky)', children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, oklch(0.99 0.005 80) 0%, oklch(0.96 0.008 78) 100%)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8,
      color: 'var(--ink-2)',
    }}>
      <div style={{ height: 3, width: 28, background: accent, borderRadius: 2 }}/>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500,
        color: 'var(--ink-1)', lineHeight: 1.2,
      }}>{title}</div>
      {subtitle && <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>{subtitle}</div>}
      {children || <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
        {[0.92, 0.86, 0.78, 0.94, 0.7, 0.88, 0.6].map((w, i) => (
          <div key={i} style={{
            height: 2.5, width: `${w * 100}%`,
            background: 'oklch(0.3 0.02 90 / 0.16)', borderRadius: 2,
          }}/>
        ))}
      </div>}
    </div>
  );
}

// Receipt / invoice paper ────────────────────────────────
function ThumbReceipt({ company, total, ocr = true }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'oklch(0.96 0.012 78)',
      display: 'grid', placeItems: 'center', padding: 18,
    }}>
      <div style={{
        background: 'white',
        boxShadow: '0 6px 18px oklch(0.3 0.04 60 / 0.12)',
        padding: '14px 14px 18px',
        width: '78%', height: '92%',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), 92% 100%, 84% calc(100% - 6px), 76% 100%, 68% calc(100% - 6px), 60% 100%, 52% calc(100% - 6px), 44% 100%, 36% calc(100% - 6px), 28% 100%, 20% calc(100% - 6px), 12% 100%, 4% calc(100% - 6px), 0 100%)',
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
          textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--ink-1)', paddingBottom: 4, borderBottom: '1px dashed oklch(0.7 0.02 80)',
        }}>{company}</div>
        {[0.7, 0.85, 0.55].map((w, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            <div style={{ height: 2, width: `${w * 70}%`, background: 'oklch(0.4 0.02 80 / 0.3)' }}/>
            <div style={{ height: 2, width: '20%', background: 'oklch(0.4 0.02 80 / 0.3)' }}/>
          </div>
        ))}
        <div style={{ flex: 1 }}/>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
          color: 'var(--accent-moss)', textAlign: 'right',
        }}>{total}</div>
        {ocr && <div style={{
          position: 'absolute', top: 8, right: 8,
          fontFamily: 'var(--font-mono)', fontSize: 8, padding: '2px 5px',
          background: 'var(--accent-clay-soft)', color: 'oklch(0.45 0.06 80)',
          borderRadius: 3, letterSpacing: '0.05em',
        }}>OCR</div>}
      </div>
    </div>
  );
}

// Photo / image — colorful gradient field ───────────────
function ThumbPhoto({ palette }) {
  // palette: [color1, color2, color3]
  const [a, b, c] = palette;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 30% 30%, ${a} 0%, transparent 55%), radial-gradient(circle at 75% 70%, ${b} 0%, transparent 60%), ${c}`,
    }}>
      <Stripes angle={45} opacity={0.04}/>
    </div>
  );
}

// Whiteboard photo — strokes on light bg ─────────────────
function ThumbWhiteboard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, oklch(0.95 0.005 200) 0%, oklch(0.92 0.01 220) 100%)',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <path d="M20 30 Q 40 20, 60 35 T 100 40" stroke="oklch(0.4 0.15 25)" strokeWidth="2" fill="none"/>
        <path d="M30 60 L 80 60 L 80 90 L 30 90 Z" stroke="oklch(0.4 0.12 230)" strokeWidth="1.5" fill="none"/>
        <path d="M55 60 L 55 90" stroke="oklch(0.4 0.12 230)" strokeWidth="1.5"/>
        <circle cx="130" cy="70" r="14" stroke="oklch(0.55 0.15 145)" strokeWidth="2" fill="none"/>
        <path d="M120 100 L 180 100" stroke="oklch(0.4 0.04 80)" strokeWidth="1.5"/>
        <path d="M120 110 L 165 110" stroke="oklch(0.4 0.04 80)" strokeWidth="1.5"/>
        <path d="M120 120 L 175 120" stroke="oklch(0.4 0.04 80)" strokeWidth="1.5"/>
        <path d="M30 110 L 100 110 M 30 120 L 80 120" stroke="oklch(0.4 0.04 80)" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

// Chart screenshot ───────────────────────────────────────
function ThumbChart({ kind = 'line' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, oklch(0.99 0.005 80), oklch(0.96 0.012 78))',
      padding: 12, display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 30, height: 6, background: 'oklch(0.3 0.02 90 / 0.5)', borderRadius: 2 }}/>
        <div style={{ width: 16, height: 6, background: 'oklch(0.3 0.02 90 / 0.25)', borderRadius: 2 }}/>
      </div>
      <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid oklch(0.7 0.02 80)', borderBottom: '1px solid oklch(0.7 0.02 80)' }}>
        {kind === 'line' ? (
          <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path d="M0 50 L 15 40 L 30 45 L 45 25 L 60 30 L 75 15 L 100 18" stroke="var(--accent-terra)" strokeWidth="1.8" fill="none"/>
            <path d="M0 50 L 15 40 L 30 45 L 45 25 L 60 30 L 75 15 L 100 18 L 100 60 L 0 60 Z" fill="var(--accent-terra)" opacity="0.12"/>
            <circle cx="45" cy="25" r="2" fill="var(--accent-terra)"/>
            <circle cx="75" cy="15" r="2" fill="var(--accent-terra)"/>
          </svg>
        ) : (
          <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
            {[35, 22, 45, 18, 30, 12, 38].map((h, i) => (
              <rect key={i} x={i * 13 + 4} y={60 - h} width="9" height={h} fill="var(--accent-moss)" opacity={0.3 + i * 0.08}/>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}

// Spreadsheet / data ─────────────────────────────────────
function ThumbSheet() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'oklch(0.98 0.008 80)',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridAutoRows: '14%',
      gap: 0,
    }}>
      {Array.from({ length: 35 }).map((_, i) => {
        const isHeader = i < 5;
        const filled = !isHeader && Math.random() > 0.3;
        return <div key={i} style={{
          borderRight: '1px solid oklch(0.85 0.012 80)',
          borderBottom: '1px solid oklch(0.85 0.012 80)',
          background: isHeader ? 'oklch(0.92 0.05 145)' : 'transparent',
          padding: '4px 6px',
          display: 'flex', alignItems: 'center',
        }}>
          {filled && <div style={{ height: 2, width: `${30 + Math.random() * 50}%`, background: 'oklch(0.4 0.02 80 / 0.4)' }}/>}
        </div>;
      })}
    </div>
  );
}

// Notes ─────────────────────────────────────────────────
function ThumbNote({ headline }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'oklch(0.97 0.04 95)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500,
        color: 'oklch(0.3 0.04 80)', fontStyle: 'italic',
        fontVariationSettings: '"SOFT" 100',
      }}>{headline}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4 }}>
        {[0.94, 0.7, 0.88, 0.5, 0.82].map((w, i) => (
          <div key={i} style={{ height: 2.2, width: `${w * 100}%`, background: 'oklch(0.4 0.04 80 / 0.35)', borderRadius: 2 }}/>
        ))}
      </div>
    </div>
  );
}

// Generic fallback (striped placeholder)
function ThumbPlaceholder({ label }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--bg-chip)',
      display: 'grid', placeItems: 'center',
      color: 'var(--ink-3)',
    }}>
      <Stripes angle={35} opacity={0.08}/>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
        textTransform: 'uppercase', position: 'relative',
      }}>{label}</div>
    </div>
  );
}

// Resolver ──────────────────────────────────────────────
function FileThumb({ file }) {
  switch (file.thumb?.kind) {
    case 'doc':        return <ThumbDoc {...file.thumb}/>;
    case 'receipt':    return <ThumbReceipt {...file.thumb}/>;
    case 'photo':      return <ThumbPhoto {...file.thumb}/>;
    case 'whiteboard': return <ThumbWhiteboard {...file.thumb}/>;
    case 'chart':      return <ThumbChart {...file.thumb}/>;
    case 'sheet':      return <ThumbSheet {...file.thumb}/>;
    case 'note':       return <ThumbNote {...file.thumb}/>;
    default:           return <ThumbPlaceholder label={file.kind || 'arquivo'}/>;
  }
}

Object.assign(window, {
  ThumbDoc, ThumbReceipt, ThumbPhoto, ThumbWhiteboard, ThumbChart,
  ThumbSheet, ThumbNote, ThumbPlaceholder, FileThumb, Stripes, PaperLines,
});
