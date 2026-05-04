// icons.jsx — geometric line icons, original shapes
// All 1.6 stroke, 24x24, currentColor

const Icon = ({ children, size = 18, stroke = 1.6, fill = 'none', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconTimeline   = (p) => <Icon {...p}><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M6 8v8"/><path d="M10 6h10"/><path d="M10 18h7"/></Icon>;
const IconSearch     = (p) => <Icon {...p}><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></Icon>;
const IconTag        = (p) => <Icon {...p}><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor"/></Icon>;
const IconStar       = (p) => <Icon {...p}><path d="M12 3l2.5 5.5 6 .8-4.5 4 1.2 6-5.2-2.9L6.8 19.3 8 13.3 3.5 9.3l6-.8z"/></Icon>;
const IconClock      = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconImage      = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5-9 9"/></Icon>;
const IconFile       = (p) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></Icon>;
const IconInbox      = (p) => <Icon {...p}><path d="M3 12l3-7h12l3 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 12h5l1 2h6l1-2h5"/></Icon>;
const IconClose      = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>;
const IconCheck      = (p) => <Icon {...p}><path d="M5 12.5l4.5 4.5L19 7"/></Icon>;
const IconPlus       = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconSparkle    = (p) => <Icon {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3.5 3.5M14.5 14.5L18 18M6 18l3.5-3.5M14.5 9.5L18 6"/></Icon>;
const IconFilter     = (p) => <Icon {...p}><path d="M3 5h18M6 12h12M10 19h4"/></Icon>;
const IconGrid       = (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Icon>;
const IconList       = (p) => <Icon {...p}><path d="M4 6h16M4 12h16M4 18h16"/></Icon>;
const IconChevDown   = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;
const IconCalendar   = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>;
const IconDoc        = (p) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></Icon>;
const IconReceipt    = (p) => <Icon {...p}><path d="M5 3h14v18l-3-2-3 2-2-2-3 2-3-2z"/><path d="M9 8h6M9 12h6M9 16h4"/></Icon>;
const IconFolder     = (p) => <Icon {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Icon>;
const IconSettings   = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>;
const IconUpload     = (p) => <Icon {...p}><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/></Icon>;
const IconPanel      = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M14 4v16"/></Icon>;

// brand mark — a sprout/leaf glyph (tag-like)
const BrandMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 19c0-7 5-12 14-12-1 8-6 13-13 13"/>
    <path d="M5 19l4-4"/>
  </svg>
);

Object.assign(window, {
  IconTimeline, IconSearch, IconTag, IconStar, IconClock, IconImage,
  IconFile, IconInbox, IconClose, IconCheck, IconPlus, IconSparkle,
  IconFilter, IconGrid, IconList, IconChevDown, IconCalendar,
  IconDoc, IconReceipt, IconFolder, IconSettings, IconUpload, IconPanel,
  BrandMark,
});
