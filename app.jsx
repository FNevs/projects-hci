// app.jsx — Explorador Semântico (Timeline + Search + Tags + Detail panel)

const { useState, useEffect, useMemo, useRef } = React;

// ─── Tag pill ──────────────────────────────────────────
function Tag({ name, large, removable, onRemove, suggested, onClick }) {
  const meta = window.tagMeta(name);
  const style = suggested ? {} : { background: meta.bg, color: meta.color };
  return (
    <span className={`tag ${large ? 'lg' : ''} ${suggested ? 'suggested' : ''}`}
    style={style}
    onClick={onClick}>
      <span>#{name}</span>
      {removable && <span className="x" onClick={(e) => {e.stopPropagation();onRemove?.();}}>×</span>}
    </span>);

}

// ─── File card ─────────────────────────────────────────
function FileCard({ file, selected, onSelect, animOrder = 0 }) {
  return (
    <div className="fcard drop-in"
    style={{ animationDelay: `${animOrder * 30}ms` }}
    data-approved={file.approved}
    aria-selected={selected}
    onClick={() => onSelect(file.id)}>
      <div className="thumb">
        <window.FileThumb file={file} />
        <div className="thumb-badge">{file.kind?.split('·')[0].trim()}</div>
        <div className="approval">
          <window.IconCheck size={12} stroke={2.5} />
        </div>
      </div>
      <div className="body">
        <div className="name">{file.name}</div>
        <div className="meta">
          <span>{file.time}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{file.size}</span>
        </div>
        {(file.tags.length > 0 || file.suggested.length > 0) &&
        <div className="tags">
            {file.tags.slice(0, 3).map((t) => <Tag key={t} name={t} />)}
            {file.tags.length === 0 && file.suggested.slice(0, 2).map((t) =>
          <Tag key={t} name={t} suggested />
          )}
            {file.tags.length > 3 &&
          <span className="tag" style={{ background: 'var(--bg-chip)', color: 'var(--ink-3)' }}>
                +{file.tags.length - 3}
              </span>
          }
          </div>
        }
      </div>
    </div>);

}

// ─── Session bloc ──────────────────────────────────────
function SessionBlock({ session, files, onSelect, selectedId, animOffset }) {
  return (
    <div className="session">
      <div className="session-head">
        <span className="session-time">{session.timeRange}</span>
        <span className="session-name">{session.label}</span>
        <span className="session-meta">
          {files.length} {files.length === 1 ? 'item' : 'itens'}
          {session.autoTags.length > 0 &&
          <>
              <span style={{ opacity: 0.4 }}>·</span>
              {session.autoTags.slice(0, 2).map((t) => '#' + t).join(' ')}
            </>
          }
        </span>
      </div>
      <div className="session-grid">
        {files.map((f, i) =>
        <FileCard key={f.id} file={f} selected={selectedId === f.id}
        onSelect={onSelect} animOrder={animOffset + i} />
        )}
      </div>
    </div>);

}

// ─── Day section ───────────────────────────────────────
function DaySection({ day, sessionsList, files, onSelect, selectedId, animOffset }) {
  return (
    <div>
      <div className="day-header">
        <div className="day-title display">{day.title}</div>
        <div className="day-sub">{day.subtitle}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {sessionsList.map((session, idx) => {
          const sessionFiles = files.filter((f) => f.sessionId === session.id);
          if (!sessionFiles.length) return null;
          return (
            <SessionBlock key={session.id}
            session={session}
            files={sessionFiles}
            onSelect={onSelect}
            selectedId={selectedId}
            animOffset={animOffset + idx * 4} />);

        })}
      </div>
    </div>);

}

// ─── Search relevance ─────────────────────────────────
// Simple semantic-ish scoring: matches name, summary, tags, source.
function scoreFile(file, query) {
  if (!query.trim()) return 1;
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);
  const haystack = [
  file.name, file.summary, file.kind, file.source,
  ...file.tags.map((t) => '#' + t.replace(/_/g, ' ')),
  ...(file.suggested || []).map((t) => '#' + t.replace(/_/g, ' '))].
  join(' ').toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (haystack.includes(t)) score += 1;
    // partial token match
    else if (haystack.match(new RegExp(t.slice(0, Math.max(3, t.length - 1))))) score += 0.4;
  }
  return score >= tokens.length * 0.6 ? score : 0;
}

// ─── Detail panel ──────────────────────────────────────
function DetailPanel({ file, onClose, onApprove, onRejectTag, onApproveTag, onRemoveTag, onAddTag }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');

  if (!file) return null;
  const hasSuggested = file.suggested && file.suggested.length > 0;

  return (
    <aside className="detail">
      <div className="detail-head">
        <h3>Detalhes do arquivo</h3>
        <button className="btn btn-icon" aria-label="Fechar painel" onClick={onClose}>
          <window.IconClose size={16} />
        </button>
      </div>
      <div className="detail-body">
        <div className="detail-thumb">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <window.FileThumb file={file} />
          </div>
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500,
            letterSpacing: '-0.01em', marginBottom: 4, lineHeight: 1.2
          }}>{file.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
            {file.kind} · {file.size}
          </div>
        </div>

        {file.summary &&
        <div className="detail-section">
            <h4>
              <window.IconSparkle size={11} /> Resumo automático
              <span className="ai-shimmer">IA</span>
            </h4>
            <div className="summary-card">{file.summary}</div>
          </div>
        }

        <div className="detail-section">
          <h4>Tags aprovadas</h4>
          {file.tags.length > 0 ?
          <div className="tag-set">
              {file.tags.map((t) =>
            <Tag key={t} name={t} large removable
            onRemove={() => onRemoveTag(file.id, t)} />
            )}
              {!adding &&
            <button className="add-tag" onClick={() => setAdding(true)}>
                  <window.IconPlus size={11} /> adicionar
                </button>
            }
              {adding &&
            <input autoFocus
            className="mono"
            style={{
              border: '1px dashed var(--line-strong)', background: 'transparent',
              padding: '2px 8px', borderRadius: 999, fontSize: 11,
              outline: 'none', minWidth: 90
            }}
            placeholder="nome_da_tag"
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/[^a-z0-9_]/gi, '_').toLowerCase())}
            onBlur={() => {if (draft) onAddTag(file.id, draft);setDraft('');setAdding(false);}}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && draft) {onAddTag(file.id, draft);setDraft('');setAdding(false);}
              if (e.key === 'Escape') {setDraft('');setAdding(false);}
            }} />
            }
            </div> :

          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontStyle: 'italic' }}>
              Nenhuma tag aprovada ainda.
            </div>
          }
        </div>

        {hasSuggested &&
        <div className="detail-section">
            <h4>
              <window.IconSparkle size={11} /> Sugeridas pelo sistema
              <span className="ai-shimmer">IA</span>
            </h4>
            <div className="tag-set">
              {file.suggested.map((t) =>
            <span key={t} className="tag suggested lg" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <span>#{t}</span>
                  <button onClick={() => onApproveTag(file.id, t)}
              aria-label="aprovar"
              style={{
                background: 'var(--accent-moss)', color: 'white', border: 'none',
                width: 18, height: 18, borderRadius: '50%', display: 'grid',
                placeItems: 'center', cursor: 'pointer', padding: 0
              }}>
                    <window.IconCheck size={10} stroke={3} />
                  </button>
                  <button onClick={() => onRejectTag(file.id, t)}
              aria-label="rejeitar"
              style={{
                background: 'transparent', color: 'var(--ink-3)',
                border: '1px solid var(--line)', width: 18, height: 18,
                borderRadius: '50%', display: 'grid', placeItems: 'center', cursor: 'pointer', padding: 0
              }}>
                    <window.IconClose size={10} stroke={2.5} />
                  </button>
                </span>
            )}
            </div>
            <div className="tag-actions">
              <button className="btn btn-moss" onClick={() => onApprove(file.id)}>
                <window.IconCheck size={13} stroke={2.5} /> Aprovar todas
              </button>
              <button className="btn">Editar</button>
            </div>
          </div>
        }

        <div className="detail-section">
          <h4>Origem</h4>
          <dl className="kv">
            <dt>fonte</dt><dd>{file.source}</dd>
            <dt>quando</dt><dd>{file.time} · {file.dayLabel || (file.day === 'hoje' ? 'hoje' : file.day === 'ontem' ? 'ontem' : 'esta semana')}</dd>
            <dt>tamanho</dt><dd>{file.size}</dd>
            <dt>sessão</dt><dd>{window.SESSIONS[file.sessionId]?.label || '—'}</dd>
          </dl>
        </div>
      </div>
    </aside>);

}

// ─── Sidebar ───────────────────────────────────────────
function Sidebar({ view, setView, activeTags, toggleTag, fileCounts, tagCounts }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark"><window.BrandMark size={16} /></div>
        <div className="brand-name">E.S.</div>
      </div>

      <div>
        <div className="sidebar-section-label">Visualizar</div>
        <div className="sidebar-nav">
          <button className="nav-item" aria-current={view === 'timeline'}
          onClick={() => setView('timeline')}>
            <window.IconTimeline size={16} /> Timeline
            <span className="count">{fileCounts.total}</span>
          </button>
          <button className="nav-item" aria-current={view === 'recent'}
          onClick={() => setView('recent')}>
            <window.IconClock size={16} /> Recentes
            <span className="count">{fileCounts.recent}</span>
          </button>
          <button className="nav-item" aria-current={view === 'inbox'}
          onClick={() => setView('inbox')}>
            <window.IconInbox size={16} /> Caixa de entrada
            <span className="count">{fileCounts.unapproved}</span>
          </button>
          <button className="nav-item" aria-current={view === 'tags'}
          onClick={() => setView('tags')}>
            <window.IconTag size={16} /> Por tag
            <span className="count">{Object.keys(tagCounts).length}</span>
          </button>
        </div>
      </div>

      <div>
        <div className="sidebar-section-label">Tags rápidas</div>
        <div className="sidebar-nav">
          {window.ALL_TAGS.filter((t) => tagCounts[t] > 0).map((t) => {
            const meta = window.tagMeta(t);
            const active = activeTags.includes(t);
            return (
              <button key={t} className="tag-chip-nav"
              onClick={() => toggleTag(t)}
              style={active ? { background: meta.bg, color: meta.color } : {}}>
                <span className="dot" style={{ background: meta.color }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>#{t}</span>
                <span className="count">{tagCounts[t]}</span>
              </button>);

          })}
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 8px' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
            ✦ projeto IHC · 2026
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>
            <a href="storyboard.html" style={{ color: 'var(--accent-terra)', textDecoration: 'none', fontWeight: 500 }}>
              ← ver storyboard
            </a>
          </div>
        </div>
      </div>
    </nav>);

}

// ─── Main App ──────────────────────────────────────────
function App({ density, setDensity }) {
  const [files, setFiles] = useState(window.FILES);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('f-301'); // start showing the receipt
  const [activeTags, setActiveTags] = useState([]);
  const [view, setView] = useState('timeline');
  const [layout, setLayout] = useState('grid');
  const [panelOpen, setPanelOpen] = useState(true);
  const [dropping, setDropping] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter files by query + active tags + view
  const filteredFiles = useMemo(() => {
    let list = files;
    if (view === 'inbox') list = list.filter((f) => f.suggested?.length > 0 && f.tags.length === 0);
    if (view === 'recent') list = list.filter((f) => ['hoje', 'ontem'].includes(f.day));
    if (activeTags.length) list = list.filter((f) => activeTags.every((t) => f.tags.includes(t) || f.suggested?.includes(t)));
    if (query.trim()) {
      const scored = list.map((f) => ({ f, s: scoreFile(f, query) })).filter((x) => x.s > 0);
      scored.sort((a, b) => b.s - a.s);
      list = scored.map((x) => x.f);
    }
    return list;
  }, [files, query, activeTags, view]);

  // Counts
  const fileCounts = {
    total: files.length,
    recent: files.filter((f) => ['hoje', 'ontem'].includes(f.day)).length,
    unapproved: files.filter((f) => f.suggested?.length > 0 && f.tags.length === 0).length
  };
  const tagCounts = useMemo(() => {
    const c = {};
    for (const f of files) {
      for (const t of f.tags) c[t] = (c[t] || 0) + 1;
      for (const t of f.suggested || []) c[t] = (c[t] || 0) + 0.5;
    }
    const out = {};
    for (const k in c) out[k] = Math.ceil(c[k]);
    return out;
  }, [files]);

  const selected = files.find((f) => f.id === selectedId);

  // Tag operations
  const onApproveTag = (id, tag) => setFiles((fs) => fs.map((f) =>
  f.id !== id ? f : { ...f, tags: [...f.tags, tag], suggested: f.suggested.filter((s) => s !== tag), approved: true }));
  const onRejectTag = (id, tag) => setFiles((fs) => fs.map((f) =>
  f.id !== id ? f : { ...f, suggested: f.suggested.filter((s) => s !== tag) }));
  const onApproveAll = (id) => setFiles((fs) => fs.map((f) =>
  f.id !== id ? f : { ...f, tags: [...new Set([...f.tags, ...f.suggested])], suggested: [], approved: true }));
  const onRemoveTag = (id, tag) => setFiles((fs) => fs.map((f) =>
  f.id !== id ? f : { ...f, tags: f.tags.filter((t) => t !== tag) }));
  const onAddTag = (id, tag) => setFiles((fs) => fs.map((f) =>
  f.id !== id ? f : { ...f, tags: [...new Set([...f.tags, tag])] }));

  const toggleTag = (t) => setActiveTags((a) => a.includes(t) ? a.filter((x) => x !== t) : [...a, t]);

  // Drag & drop visual demo
  useEffect(() => {
    const onOver = (e) => {e.preventDefault();setDropping(true);};
    const onLeave = (e) => {if (e.target === document.body || e.clientX === 0) setDropping(false);};
    const onDrop = (e) => {e.preventDefault();setDropping(false);};
    window.addEventListener('dragover', onOver);
    window.addEventListener('dragleave', onLeave);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragover', onOver);
      window.removeEventListener('dragleave', onLeave);
      window.removeEventListener('drop', onDrop);
    };
  }, []);

  // Search shortcut
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {e.preventDefault();searchRef.current?.focus();}
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Group filtered files by day → sessions for timeline view
  const renderTimeline = () => {
    if (filteredFiles.length === 0) {
      return (
        <div className="empty">
          <div className="display">Nada por aqui ainda.</div>
          <div>Tente outra busca, ou remova os filtros ativos.</div>
        </div>);

    }
    const fileById = Object.fromEntries(filteredFiles.map((f) => [f.id, f]));
    const visibleIds = new Set(filteredFiles.map((f) => f.id));

    let animOffset = 0;
    return (
      <div className="timeline">
        {window.DAYS.map((day) => {
          const dayFiles = filteredFiles.filter((f) => f.day === day.id);
          if (!dayFiles.length) return null;
          const dayBlock =
          <DaySection key={day.id} day={day}
          sessionsList={day.sessions.map((sid) => window.SESSIONS[sid])}
          files={dayFiles}
          onSelect={setSelectedId}
          selectedId={selectedId}
          animOffset={animOffset} />;

          animOffset += dayFiles.length;
          return dayBlock;
        })}
      </div>);

  };

  return (
    <div className="window" data-density={density}>
      <div className="titlebar">
        <div className="titlebar-dots">
          <span className="titlebar-dot r" />
          <span className="titlebar-dot y" />
          <span className="titlebar-dot g" />
        </div>
        <div className="titlebar-title"> Explorador Semântico</div>
        <div className="titlebar-actions">
          <button className="btn btn-icon" aria-label="Painel"
          onClick={() => setPanelOpen((p) => !p)}>
            <window.IconPanel size={15} />
          </button>
          <button className="btn btn-icon" aria-label="Configurações">
            <window.IconSettings size={15} />
          </button>
        </div>
      </div>
      <div className="app" data-panel={panelOpen ? 'open' : 'closed'}>
        <Sidebar view={view} setView={setView}
        activeTags={activeTags} toggleTag={toggleTag}
        fileCounts={fileCounts} tagCounts={tagCounts} />

        <main className="main" style={{ position: 'relative' }}>
          <div className="topbar">
            <div className="topbar-row">
              <label className="search" style={{ flex: 1 }}>
                <window.IconSearch size={17} style={{ color: 'var(--ink-3)' }} />
                <input ref={searchRef}
                placeholder='Pergunte em linguagem natural — "comprovante luz maio", "gráfico que baixei à tarde"…'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)} />
                {query &&
                <button className="btn btn-icon" style={{ width: 26, height: 26 }} onClick={() => setQuery('')}>
                    <window.IconClose size={13} />
                  </button>
                }
                <span className="search-hint">⌘K</span>
              </label>

              <div className="seg" role="tablist" aria-label="Layout">
                <button aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')}>
                  <window.IconGrid size={13} />
                </button>
                <button aria-pressed={layout === 'list'} onClick={() => setLayout('list')}>
                  <window.IconList size={13} />
                </button>
              </div>

              <div className="seg" role="group" aria-label="Densidade">
                <button aria-pressed={density === 'comfortable'}
                onClick={() => setDensity('comfortable')}>Confortável</button>
                <button aria-pressed={density === 'compact'}
                onClick={() => setDensity('compact')}>Compacto</button>
              </div>
            </div>

            <div className="filter-chips">
              <button className="fchip" style={{ borderStyle: 'dashed' }}>
                <window.IconCalendar size={12} /> qualquer data
              </button>
              <button className="fchip" style={{ borderStyle: 'dashed' }}>
                <window.IconFile size={12} /> todos os tipos
              </button>
              {activeTags.map((t) =>
              <button key={t} className="fchip" aria-pressed onClick={() => toggleTag(t)}>
                  #{t} <span className="x">×</span>
                </button>
              )}
              {query &&
              <button className="fchip" aria-pressed onClick={() => setQuery('')}>
                  <window.IconSearch size={11} /> "{query}" <span className="x">×</span>
                </button>
              }
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
                {filteredFiles.length} resultado{filteredFiles.length === 1 ? '' : 's'}
                {query && <span> · busca semântica</span>}
              </span>
            </div>
          </div>

          {renderTimeline()}

          <div className={`drop-overlay ${dropping ? 'show' : ''}`}>
            <div className="drop-overlay-inner">
              <window.IconUpload size={32} />
              <div className="display">Solte para indexar</div>
              <div className="mono" style={{ fontSize: 11 }}>
                a IA vai sugerir tags em segundos
              </div>
            </div>
          </div>
        </main>

        {panelOpen &&
        <DetailPanel file={selected}
        onClose={() => setPanelOpen(false)}
        onApprove={onApproveAll}
        onApproveTag={onApproveTag}
        onRejectTag={onRejectTag}
        onRemoveTag={onRemoveTag}
        onAddTag={onAddTag} />
        }
      </div>
    </div>);

}

window.App = App;