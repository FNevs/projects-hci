// storyboard.jsx — 3 cenários, 3 quadros cada, estilo HQ
// Cada quadro: arte SVG + legenda. Mockups originais (não copia UIs existentes).

// ─── Frame art primitives ──────────────────────────────────
// Generic "old system" frustration frame: cluttered grid of generic icons
function ArtChaosFolder() {
  const items = Array.from({ length: 28 });
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'oklch(0.93 0.01 230)',
      padding: 14
    }}>
      <window.Stripes angle={0} opacity={0.04} />
      <div style={{
        background: 'white', borderRadius: 6,
        boxShadow: '0 4px 14px oklch(0.3 0.04 60 / 0.12)',
        height: '100%', overflow: 'hidden',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          height: 18, background: 'oklch(0.88 0.01 220)',
          display: 'flex', alignItems: 'center', gap: 4, padding: '0 6px'
        }}>
          {['oklch(0.7 0.13 25)', 'oklch(0.82 0.13 85)', 'oklch(0.75 0.14 145)'].map((c, i) =>
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
          )}
          <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'oklch(0.4 0.02 80)' }}>
            Capturas de tela · 384 itens
          </div>
        </div>
        <div style={{
          flex: 1, padding: 8,
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5,
          alignContent: 'start', overflow: 'hidden'
        }}>
          {items.map((_, i) =>
          <div key={i} style={{
            aspectRatio: '1', background: 'oklch(0.94 0.01 220)',
            borderRadius: 3, display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 5, color: 'oklch(0.6 0.02 80)',
            padding: 1, textAlign: 'center', lineHeight: 1.1
          }}>
              <div>
                <div style={{ width: 14, height: 14, background: 'oklch(0.85 0.02 220)', borderRadius: 2, margin: '0 auto 1px' }} />
                IMG_{1020 + i}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* frustrated cursor */}
      <svg width="36" height="36" viewBox="0 0 36 36"
      style={{ position: 'absolute', right: 28, bottom: 28 }}>
        <path d="M5 5 L 5 25 L 11 19 L 16 28 L 19 26 L 14 17 L 22 17 Z"
        fill="oklch(0.3 0.02 90)" stroke="white" strokeWidth="1.2" />
      </svg>
    </div>);

}

// Cenário 1 frame 2 — empty search bar focus
function ArtSearchFocus({ value = '' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, oklch(0.97 0.012 75) 0%, oklch(0.94 0.018 60) 100%)',
      display: 'grid', placeItems: 'center', padding: 28
    }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400,
          color: 'var(--ink-2)', marginBottom: 12, fontStyle: 'italic',
          fontVariationSettings: '"SOFT" 100'
        }}>
          O que você está procurando?
        </div>
        <div style={{
          background: 'white', borderRadius: 999, padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 8px 30px oklch(0.3 0.04 60 / 0.14)',
          border: '2px solid var(--accent-terra)'
        }}>
          <window.IconSearch size={18} style={{ color: 'var(--accent-terra)' }} />
          <span style={{ fontSize: 15, color: 'var(--ink-1)', fontWeight: 500 }}>
            {value}
            <span style={{
              display: 'inline-block', width: 1.5, height: 16,
              background: 'var(--accent-terra)', marginLeft: 2,
              verticalAlign: 'middle', animation: 'pulse-soft 1s infinite'
            }} />
          </span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['#comprovante', '#maio', '#energia'].map((t, i) =>
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
            borderRadius: 999, background: 'var(--bg-card)',
            border: '1px dashed var(--line)', color: 'var(--ink-3)'
          }}>{t}</span>
          )}
        </div>
      </div>
    </div>);

}

// Cenário 1 frame 3 — single result + tag panel
function ArtResultReceipt() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'oklch(0.985 0.008 80)',
      display: 'flex', gap: 0
    }}>
      <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 999, padding: '7px 12px',
          fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-2)',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          <window.IconSearch size={11} /> comprovante luz maio
          <span style={{ marginLeft: 'auto', color: 'var(--accent-moss)', fontWeight: 600 }}>1 resultado</span>
        </div>
        <div style={{
          flex: 1, background: 'var(--bg-card)', border: '1.5px solid var(--accent-terra)',
          borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 0 3px oklch(0.66 0.13 45 / 0.15)'
        }}>
          <div style={{ height: 100, position: 'relative', overflow: 'hidden' }}>
            <window.ThumbReceipt company="ENEL · Energia" total="R$ 184,72" />
          </div>
          <div style={{ padding: '6px 8px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 10, fontWeight: 600 }}>IMG_20240518_1030.png</div>
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {['comprovante', 'maio', 'energia'].map((t) => {
                const meta = window.tagMeta(t);
                return <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 8, padding: '1px 5px',
                  borderRadius: 999, background: meta.bg, color: meta.color
                }}>#{t}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div style={{
        width: 110, background: 'var(--bg-panel)', borderLeft: '1px solid var(--line-soft)',
        padding: 10, display: 'flex', flexDirection: 'column', gap: 6
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ✦ ia · ocr
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontStyle: 'italic', color: 'var(--ink-2)', lineHeight: 1.3, fontVariationSettings: '"SOFT" 100' }}>
          "ENEL · 184,72 · venc. 20/05/2024"
        </div>
        <div style={{ height: 1, background: 'var(--line-soft)', margin: '4px 0' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--ink-3)', textTransform: 'uppercase' }}>tags</div>
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {['comprovante', 'maio', 'energia', 'fatura'].map((t) => {
            const meta = window.tagMeta(t);
            return <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: 7, padding: '1px 4px',
              borderRadius: 999, background: meta.bg, color: meta.color
            }}>#{t}</span>;
          })}
        </div>
      </div>
    </div>);

}

// Cenário 2 frame 1 — three windows scattered
function ArtScatteredWindows() {
  const wnd = (top, left, title, color) =>
  <div style={{
    position: 'absolute', top, left, width: 110, height: 86,
    background: 'white', borderRadius: 6,
    boxShadow: '0 8px 20px oklch(0.3 0.04 60 / 0.18)',
    overflow: 'hidden'
  }}>
      <div style={{ height: 14, background: color, display: 'flex', alignItems: 'center', gap: 3, padding: '0 5px' }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'oklch(0.7 0.13 25)' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'oklch(0.82 0.13 85)' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'oklch(0.75 0.14 145)' }} />
        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 6, color: 'oklch(0.4 0.02 80)' }}>{title}</div>
      </div>
      <div style={{ padding: 5, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
        {Array.from({ length: 9 }).map((_, i) =>
      <div key={i} style={{ aspectRatio: '1', background: 'oklch(0.94 0.01 220)', borderRadius: 2 }} />
      )}
      </div>
    </div>;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, oklch(0.92 0.01 220), oklch(0.86 0.014 220))' }}>
      {wnd(20, 16, 'Downloads', 'oklch(0.88 0.04 230)')}
      {wnd(60, 92, 'Documentos', 'oklch(0.88 0.05 145)')}
      {wnd(110, 36, 'Imagens', 'oklch(0.9 0.05 25)')}
      {/* question marks */}
      {[{ x: 130, y: 14 }, { x: 200, y: 60 }, { x: 18, y: 110 }].map((p, i) =>
      <div key={i} style={{
        position: 'absolute', top: p.y, left: p.x,
        fontFamily: 'var(--font-display)', fontSize: 32, fontStyle: 'italic',
        color: 'var(--accent-terra)', fontWeight: 600, opacity: 0.7,
        fontVariationSettings: '"SOFT" 100, "WONK" 1'
      }}>?</div>
      )}
    </div>);

}

// Cenário 2 frame 2 — session bloc visualized
function ArtSessionBloc() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'oklch(0.985 0.008 80)',
      padding: 16, display: 'flex', flexDirection: 'column', gap: 8
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 6, borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--ink-1)' }}>Hoje</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink-3)' }}>seg · 20 mai · 2024</div>
      </div>
      <div style={{ position: 'relative', paddingLeft: 20, marginTop: 6, flex: 1 }}>
        <div style={{
          position: 'absolute', left: 5, top: 4, bottom: 4, width: 1.5,
          background: 'linear-gradient(to bottom, var(--line-strong), var(--line-soft))'
        }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            position: 'absolute', left: -20, top: 0,
            width: 11, height: 11, borderRadius: '50%',
            background: 'var(--bg-app)', border: '2px solid var(--accent-terra)',
            boxShadow: '0 0 0 3px var(--bg-app)'
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600 }}>14h — 17h</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontStyle: 'italic', color: 'var(--ink-2)', fontVariationSettings: '"SOFT" 100' }}>Sessão de Pesquisa</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--ink-3)' }}>7 itens</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {[
            { kind: 'doc', title: 'User-Centered', accent: 'var(--accent-sky)' },
            { kind: 'doc', title: 'Heuristics', accent: 'var(--accent-sky)' },
            { kind: 'chart', kind2: 'line' },
            { kind: 'chart', kind2: 'bar' },
            { kind: 'doc', title: 'Card Sorting', accent: 'var(--accent-sky)' },
            { kind: 'doc', title: 'Affordances', accent: 'var(--accent-sky)' },
            { kind: 'note', headline: 'IHC aula 8' },
            null].
            map((t, i) => t ?
            <div key={i} style={{
              aspectRatio: '4/3', borderRadius: 5, overflow: 'hidden', position: 'relative',
              border: '1px solid var(--line-soft)'
            }}>
                <window.FileThumb file={{ thumb: t }} />
              </div> :
            null)}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            {['artigo_academico', 'estudos', 'ux', 'grafico_dados'].map((t) => {
              const meta = window.tagMeta(t);
              return <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: 7, padding: '1px 5px',
                borderRadius: 999, background: meta.bg, color: meta.color
              }}>#{t}</span>;
            })}
          </div>
        </div>
      </div>
    </div>);

}

// Cenário 2 frame 3 — drag chart into doc
function ArtDragToDoc() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.94 0.012 78)', padding: 14 }}>
      {/* doc on left */}
      <div style={{
        position: 'absolute', left: 14, top: 14, bottom: 14, width: '52%',
        background: 'white', borderRadius: 8,
        boxShadow: '0 6px 18px oklch(0.3 0.04 60 / 0.12)',
        padding: 14, display: 'flex', flexDirection: 'column', gap: 6
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, color: 'var(--ink-1)' }}>
          IHC — Aula 8
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--ink-3)' }}>resumo pessoal</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
          {[0.95, 0.7, 0.88, 0.5, 0.92, 0.76, 0.82].map((w, i) =>
          <div key={i} style={{ height: 2, width: `${w * 100}%`, background: 'oklch(0.4 0.02 80 / 0.3)' }} />
          )}
        </div>
        {/* drop zone */}
        <div style={{
          marginTop: 8, height: 60,
          border: '1.5px dashed var(--accent-terra)', borderRadius: 6,
          display: 'grid', placeItems: 'center',
          background: 'oklch(0.66 0.13 45 / 0.08)'
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent-terra)' }}>
            ↓ solte aqui
          </span>
        </div>
      </div>
      {/* dragged ghost (chart) crossing the screen */}
      <div style={{
        position: 'absolute', left: '47%', top: 70,
        width: 90, height: 70, borderRadius: 6, overflow: 'hidden',
        boxShadow: '0 16px 30px oklch(0.3 0.04 60 / 0.3)',
        transform: 'rotate(-3deg)',
        border: '1.5px solid var(--accent-terra)'
      }}>
        <window.ThumbChart kind="line" />
      </div>
      {/* timeline preview on right */}
      <div style={{
        position: 'absolute', right: 14, top: 14, bottom: 14, width: '38%',
        background: 'var(--bg-app)', borderRadius: 8, border: '1px solid var(--line-soft)',
        padding: 10, display: 'flex', flexDirection: 'column', gap: 5,
        opacity: 0.85
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--ink-3)' }}>14h — 17h</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontStyle: 'italic', color: 'var(--ink-2)' }}>Sessão de Pesquisa</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 2 }}>
          {[
          { kind: 'doc', title: 'Norman', accent: 'var(--accent-sky)' },
          { kind: 'chart', kind2: 'bar' },
          { kind: 'doc', title: 'Nielsen', accent: 'var(--accent-sky)' },
          { kind: 'note', headline: 'aula 8' }].
          map((t, i) =>
          <div key={i} style={{
            aspectRatio: '4/3', borderRadius: 4, overflow: 'hidden', position: 'relative',
            border: '1px solid var(--line-soft)'
          }}>
              <window.FileThumb file={{ thumb: t }} />
            </div>
          )}
        </div>
      </div>
      {/* arrow */}
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ position: 'absolute', left: '38%', top: 130 }}>
        <path d="M5 8 Q 20 5, 30 25" stroke="var(--accent-terra)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d="M28 22 L 30 25 L 33 22" stroke="var(--accent-terra)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>);

}

// Cenário 3 frame 1 — drag PDFs into app
function ArtDropFiles() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.985 0.008 80)' }}>
      {/* timeline subtle in bg */}
      <div style={{
        position: 'absolute', inset: 16, borderRadius: 10,
        border: '2px dashed var(--accent-terra)',
        background: 'oklch(0.66 0.13 45 / 0.06)',
        display: 'grid', placeItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'var(--accent-terra)' }}>
          <window.IconUpload size={28} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, marginTop: 4 }}>
            Solte para indexar
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, marginTop: 2 }}>
            5 PDFs · ~1.6 MB
          </div>
        </div>
      </div>
      {/* falling PDFs */}
      {[
      { x: '18%', y: 30, r: -8, label: 'doc_lab_01' },
      { x: '40%', y: 20, r: 4, label: 'doc_lab_02' },
      { x: '62%', y: 38, r: -3, label: 'doc_lab_03' },
      { x: '28%', y: 60, r: 6, label: 'doc_lab_04' },
      { x: '54%', y: 70, r: -5, label: 'doc_lab_05' }].
      map((p, i) =>
      <div key={i} style={{
        position: 'absolute', left: p.x, top: p.y,
        width: 60, height: 76, borderRadius: 4, overflow: 'hidden',
        background: 'white', boxShadow: '0 12px 22px oklch(0.3 0.04 60 / 0.22)',
        transform: `rotate(${p.r}deg)`,
        border: '1px solid var(--line-soft)'
      }}>
          <div style={{ height: 50, position: 'relative' }}>
            <window.ThumbDoc title="" subtitle="" accent="var(--accent-terra)" />
          </div>
          <div style={{ padding: '3px 5px', fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--ink-2)' }}>
            {p.label}.pdf
          </div>
        </div>
      )}
    </div>);

}

// Cenário 3 frame 2 — detail panel with suggestions
function ArtTagSuggestions() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.985 0.008 80)', display: 'flex' }}>
      {/* main hint */}
      <div style={{ flex: 1, padding: 14, display: 'grid', placeItems: 'center' }}>
        <div style={{
          width: 70, height: 90, borderRadius: 5, overflow: 'hidden',
          border: '1.5px solid var(--accent-terra)',
          boxShadow: '0 0 0 3px oklch(0.66 0.13 45 / 0.15), 0 8px 20px oklch(0.3 0.04 60 / 0.12)'
        }}>
          <div style={{ height: 60, position: 'relative' }}>
            <window.ThumbDoc title="Hemograma" subtitle="Lab" accent="var(--accent-terra)" />
          </div>
          <div style={{ padding: '2px 4px', fontFamily: 'var(--font-mono)', fontSize: 5 }}>doc_lab_01.pdf</div>
        </div>
      </div>
      {/* panel */}
      <div style={{
        width: 145, background: 'var(--bg-panel)', borderLeft: '1px solid var(--line-soft)',
        padding: 10, display: 'flex', flexDirection: 'column', gap: 8
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 500 }}>Detalhes</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ✦ tags sugeridas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['exame_sangue', 'laboratorio', 'saude_2024'].map((t, i) => {
            const meta = window.tagMeta(t);
            return (
              <div key={t} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: meta.bg, color: meta.color, padding: '3px 6px',
                borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 7,
                border: '1px dashed currentColor'
              }}>
                <span style={{ flex: 1 }}>#{t}</span>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--accent-moss)', color: 'white',
                  display: 'grid', placeItems: 'center', fontSize: 7, fontWeight: 700
                }}>✓</span>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'transparent', color: 'var(--ink-3)',
                  border: '1px solid var(--line)',
                  display: 'grid', placeItems: 'center', fontSize: 7
                }}>×</span>
              </div>);

          })}
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          <div style={{
            background: 'var(--accent-moss)', color: 'white',
            padding: '4px 8px', borderRadius: 4, fontSize: 7, fontWeight: 600,
            fontFamily: 'var(--font-ui)', flex: 1, textAlign: 'center'
          }}>✓ Aprovar todas</div>
          <div style={{
            background: 'var(--bg-card)', color: 'var(--ink-2)',
            padding: '4px 8px', borderRadius: 4, fontSize: 7, fontWeight: 500,
            fontFamily: 'var(--font-ui)', border: '1px solid var(--line)'
          }}>Editar</div>
        </div>
      </div>
    </div>);

}

// Cenário 3 frame 3 — green checks + tag in nav
function ArtApproved() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.985 0.008 80)', display: 'flex' }}>
      <div style={{
        width: 80, background: 'var(--bg-panel)',
        borderRight: '1px solid var(--line-soft)', padding: 8,
        display: 'flex', flexDirection: 'column', gap: 6
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--ink-3)', textTransform: 'uppercase' }}>tags</div>
        {['saude_2024', 'laboratorio', 'exame_sangue'].map((t, i) => {
          const meta = window.tagMeta(t);
          const active = i === 0;
          return (
            <div key={t} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: active ? meta.bg : 'transparent',
              color: active ? meta.color : 'var(--ink-2)',
              padding: '3px 5px', borderRadius: 4,
              fontFamily: 'var(--font-mono)', fontSize: 7
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: meta.color }} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>#{t}</span>
              {active && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6 }}>5</span>}
            </div>);

        })}
      </div>
      <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 500 }}>
          #saude_2024 <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--ink-3)', fontWeight: 400 }}>· 5 itens</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
          {['Hemograma', 'Glicemia', 'Lipídico', 'Vit. D', 'TSH'].map((label, i) =>
          <div key={i} style={{
            aspectRatio: '4/3', position: 'relative', borderRadius: 4, overflow: 'hidden',
            border: '1px solid var(--line-soft)'
          }}>
              <window.ThumbDoc title={label} subtitle="Lab" accent="var(--accent-terra)" />
              <div style={{
              position: 'absolute', top: 3, right: 3,
              width: 12, height: 12, borderRadius: '50%',
              background: 'var(--accent-moss)', color: 'white',
              display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700,
              animation: 'pulse-soft 1.4s ease-in-out infinite'
            }}>✓</div>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// ─── Frame component ──────────────────────────────────
function Frame({ num, title, art, children }) {
  return (
    <div className="frame">
      <div className="frame-art">
        {art}
        <div className="dots" />
      </div>
      <div className="frame-cap">
        <div className="frame-num">Quadro {num}</div>
        <div className="frame-title">{title}</div>
        <div className="frame-text">{children}</div>
      </div>
    </div>);

}

// ─── Scenario ─────────────────────────────────────────
function Scenario({ num, label, title, focus, problem, frames }) {
  return (
    <section className="scenario">
      <div className="scenario-meta">
        <div className="scenario-num">{num}</div>
        <div className="scenario-title-block">
          <div className="label">{label}</div>
          <h2>{title}</h2>
          <div className="focus">Foco: {focus}</div>
        </div>
        <div className="scenario-problem">{problem}</div>
      </div>
      <div className="frames">
        {frames.map((f, i) =>
        <Frame key={i} num={i + 1} title={f.title} art={f.art}>{f.text}</Frame>
        )}
      </div>
    </section>);

}

// ─── Storyboard page ──────────────────────────────────
function StoryboardPage() {
  return (
    <div className="story-page">
      <div className="story-head">
        <div className="display">
          Storyboard <em></em>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic',
            color: 'var(--ink-3)', marginTop: 8, fontWeight: 400,
            fontVariationSettings: '"SOFT" 100' }}>
            três cenários cotidianos — como a busca semântica, o auto-tagging e a timeline resolvem a desorganização.
          </div>
        </div>
        <a href="prototipo.html" className="back">→ ver protótipo interativo</a>
      </div>

      <Scenario
        num="01"
        label="Cenário · OCR + Busca Semântica"
        title="O 'buraco negro' dos comprovantes"
        focus="Reconhecer texto dentro da imagem · entender pedidos em linguagem natural"
        problem="Ana pagou a conta de luz pelo celular, tirou um print do comprovante e duas semanas depois precisa enviar — mas ele está perdido entre centenas de capturas com nomes IMG_20240518_1030.png."
        frames={[
        {
          title: 'A frustração do velho paradigma',
          art: <ArtChaosFolder />,
          text: <>Ana rola infinitamente a pasta <strong>Capturas de Tela</strong> com 384 arquivos — todos com o mesmo ícone genérico, todos com nomes inúteis. Cada miniatura parece igual à outra.</>
        },
        {
          title: 'A busca natural',
          art: <ArtSearchFocus value="comprovante luz maio" />,
          text: <>No <strong>Sêmea</strong>, ela abre uma única barra ampla — sem pastas, sem hierarquia. Digita do jeito que pensa: <em>"comprovante luz maio"</em>.</>
        },
        {
          title: 'A mágica do OCR',
          art: <ArtResultReceipt />,
          text: <>O sistema retorna <strong>1 resultado</strong>: o print, com o logo da ENEL visível. O painel mostra o trecho que o OCR leu — <em>"ENEL · 184,72 · venc. 20/05/2024"</em> — e as tags <span style={{ fontFamily: 'var(--font-mono)' }}>#comprovante #maio #energia</span> aplicadas automaticamente.</>
        }]
        } />
      

      <Scenario
        num="02"
        label="Cenário · Timeline + Sessões de Atividade"
        title="O caos da pesquisa acadêmica"
        focus="Agrupar por contexto temporal · costurar formatos diferentes"
        problem="Numa tarde de pesquisa, Tomás baixou 4 PDFs de artigos, salvou 2 imagens de gráficos e criou 1 documento de notas. No paradigma antigo, cada arquivo foi parar numa pasta diferente — e ele não lembra onde salvou o gráfico."
        frames={[
        {
          title: 'A dispersão',
          art: <ArtScatteredWindows />,
          text: <>Três janelas abertas — <strong>Downloads</strong>, <strong>Documentos</strong>, <strong>Imagens</strong> — sem qualquer conexão entre si. Os arquivos estão organizados por <em>tipo</em>, não por <em>intenção</em>.</>
        },
        {
          title: 'O agrupamento contextual',
          art: <ArtSessionBloc />,
          text: <>Tomás abre a Timeline e rola até <strong>"Hoje, à tarde"</strong>. Lá está, costurado por uma linha temporal, o álbum <em>Sessão de Pesquisa · 14h–17h</em>: 7 itens — PDFs, gráficos e notas — todos juntos.</>
        },
        {
          title: 'O fluxo contínuo',
          art: <ArtDragToDoc />,
          text: <>Ele arrasta o gráfico direto da Timeline para o documento aberto. As tags <span style={{ fontFamily: 'var(--font-mono)' }}>#artigo_academico #grafico_dados</span> unem formatos diferentes pelo <strong>contexto do momento</strong>.</>
        }]
        } />
      

      <Scenario
        num="03"
        label="Cenário · Auto-tagging + Painel Lateral"
        title="A caixa de entrada organizada"
        focus="Sugestão automática · aprovação em um clique · navegação por tag"
        problem="Marina baixa um pacote de exames médicos do laboratório — 5 PDFs com nomes genéricos como doc_lab_01.pdf. Ela tem preguiça de renomear cada um e criar uma pasta 'Saúde 2024'."
        frames={[
        {
          title: 'O download massivo',
          art: <ArtDropFiles />,
          text: <>Marina arrasta os <strong>5 PDFs</strong> do navegador direto para a Timeline de hoje. A área inteira do app reage com um overlay terracota — <em>"solte para indexar"</em>.</>
        },
        {
          title: 'A inteligência em ação',
          art: <ArtTagSuggestions />,
          text: <>Ela clica num arquivo e o painel lateral abre. O sistema leu o cabeçalho do exame e sugere: <span style={{ fontFamily: 'var(--font-mono)' }}>#exame_sangue #laboratorio #saude_2024</span>. Cada tag tem um botão verde de <strong>aprovar</strong> e um cinza de <strong>rejeitar</strong> — ou ela toca em <em>"Aprovar todas"</em>.</>
        },
        {
          title: 'Organização sem esforço',
          art: <ArtApproved />,
          text: <>Um chip verde brilha em cada arquivo classificado. No menu lateral, <span style={{ fontFamily: 'var(--font-mono)' }}>#saude_2024</span> aparece sozinha como filtro rápido — sem que Marina precise criar pasta alguma.</>
        }]
        } />
      
    </div>);

}

window.StoryboardPage = StoryboardPage;