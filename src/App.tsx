import { useMemo, useState } from 'react';
import './styles.css';

type Category =
  | 'Marketing Collaterals'
  | 'Playbooks'
  | 'Case Studies'
  | 'Competitive Positioning Materials'
  | 'Contract Templates';

type Asset = {
  id: string;
  title: string;
  category: Category;
  type: string;
  tags: string[];
  description: string;
  imageUrl?: string;
  link?: string;
};

const LOGO_URL =
  'https://i.postimg.cc/L6DMNQVN/Sats-Logo-Colour-PANTONE-Positive-V1-Sep2024.png';

const ETIHAD_IMAGE = 'https://i.postimg.cc/WzGCMtW7/etihad.png';

const DELTA_IMAGE = 'https://i.postimg.cc/mkPq58gS/DELTA.png';

const FF_IMAGE = 'https://i.postimg.cc/QdYfRcRZ/FF.png';

/** Category config with icons */
const CATEGORY_CONFIG: { label: Category; icon: string }[] = [
  { label: 'Marketing Collaterals', icon: '📄' },
  { label: 'Playbooks', icon: '📘' },
  { label: 'Case Studies', icon: '📊' },
  { label: 'Competitive Positioning Materials', icon: '🎯' },
  { label: 'Contract Templates', icon: '🧾' },
];

const ASSETS: Asset[] = [
  // ===== MARKETING COLLATERALS =====
  {
    id: 'etihad-poster',
    title: 'Etihad Cargo × SATS — Powering Global Cargo Excellence',
    category: 'Marketing Collaterals',
    type: 'Poster',
    tags: [
      'Etihad',
      'Airlines',
      'Cargo',
      'Pharma',
      'Perishables',
      'Global Network',
    ],
    description:
      'Airline partner marketing poster highlighting joint cargo excellence, cold-chain capability, specialised handling and global connectivity.',
    imageUrl: ETIHAD_IMAGE,
  },
  {
    id: 'delta-poster',
    title: 'Delta Airlines × SATS — Premium Cargo & Ground Handling Solutions',
    category: 'Marketing Collaterals',
    type: 'Poster',
    tags: [
      'Delta',
      'Delta Airlines',
      'Airlines',
      'Cargo',
      'Handling',
      'Network',
    ],
    description:
      'Airline-focused marketing collateral showcasing premium cargo handling, operational reliability and global connectivity for Delta Airlines.',
    imageUrl: DELTA_IMAGE,
  },
  {
    id: 'ff-poster',
    title:
      'Freight Forwarding Solutions — Integrated Cargo & Logistics Support',
    category: 'Marketing Collaterals',
    type: 'Poster',
    tags: [
      'Freight Forwarders',
      'Forwarding',
      'Logistics',
      'E-commerce',
      'SLA',
    ],
    description:
      'Freight forwarder–focused marketing collateral highlighting integrated cargo handling, service reliability, and end-to-end logistics support.',
    imageUrl: FF_IMAGE,
  },

  // ===== PLAYBOOKS =====
  {
    id: 'playbook-renewal',
    title: 'Airline Renewal Playbook',
    category: 'Playbooks',
    type: 'PPT',
    tags: ['Airlines', 'Renewals', 'Negotiation'],
    description: 'Internal playbook for airline contract renewals.',
    imageUrl: 'https://i.postimg.cc/D8PzK65f/ARthumb2.png',
    link: 'https://drive.google.com/file/d/1ln32N3rnHsy2N3HKv3H7jGtE8AvQ05PS/view',
  },
  {
    id: 'playbook-cargo-sales',
    title: 'Cargo Sales Playbook',
    category: 'Playbooks',
    type: 'PDF',
    tags: ['Cargo', 'Sales', 'Playbook', 'Commercial', 'Process'],
    description:
      'End-to-end cargo sales playbook covering sales approach, engagement flow, and commercial best practices.',
    imageUrl: 'https://i.postimg.cc/N5c0VS8r/CSThumb2.png',
    link: 'https://drive.google.com/file/d/1aLSFYmvtTEVvuL8J4epBdQI3tR1e5gQM/view',
  },

  // ===== CASE STUDIES =====
  {
    id: 'case-coldchain',
    title: 'Cold Chain Cargo Case Study',
    category: 'Case Studies',
    type: 'PDF',
    tags: ['Cold Chain', 'Pharma', 'Temperature Control'],
    description: 'Case study on improving temperature-controlled cargo KPIs.',
  },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selected, setSelected] = useState<Asset | null>(null);

  const isHome = !query && !activeCategory;

  const results = useMemo(() => {
    const q = query.toLowerCase();

    return ASSETS.filter((a) => {
      const categoryMatch = !activeCategory || a.category === activeCategory;
      const queryMatch =
        !q ||
        [a.title, a.description, ...a.tags].join(' ').toLowerCase().includes(q);

      return categoryMatch && queryMatch;
    });
  }, [query, activeCategory]);

  return (
    <div className="page">
      {/* ===== MODAL ===== */}
      {selected && (
        <div className="modalOverlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <strong>{selected.title}</strong>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modalBody">
              {selected.imageUrl && (
                <img src={selected.imageUrl} alt={selected.title} />
              )}
              <p>{selected.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        {/* ===== HEADER ===== */}
        <header className="header">
          <img src={LOGO_URL} alt="SATS" className="logo" />
          <div>
            <h1>Marketing Content Hub</h1>
            <p>Central library for marketing & commercial assets</p>
          </div>

          {!isHome && (
            <button
              className="homeBtn"
              onClick={() => {
                setQuery('');
                setActiveCategory(null);
              }}
            >
              ← Home
            </button>
          )}
        </header>

        {/* ===== SEARCH ===== */}
        <section className="search">
          <input
            placeholder='Search e.g. "Etihad", "Delta", "Freight Forwarder"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </section>

        {/* ===== CATEGORIES ===== */}
        <section className="categories">
          {CATEGORY_CONFIG.map((c) => (
            <button
              key={c.label}
              className={`category ${
                activeCategory === c.label ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(c.label)}
            >
              <span style={{ marginRight: 8 }}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </section>

        {/* ===== RESULTS ===== */}
        {!isHome && (
          <section className="results">
            <h2>
              {activeCategory === 'Marketing Collaterals'
                ? 'Marketing Collaterals'
                : 'Matched Assets'}
            </h2>

            {/* ===== GRID VIEW FOR MARKETING COLLATERALS ===== */}
            {activeCategory === 'Marketing Collaterals' && (
              <div className="collateralGrid">
                {results.map((a) => (
                  <div
                    key={a.id}
                    className="collateralTile"
                    onClick={() => a.imageUrl && setSelected(a)}
                  >
                    {a.imageUrl && (
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="collateralThumb"
                      />
                    )}

                    <div className="collateralTitle">{a.title}</div>
                    <div className="collateralMeta">{a.type}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ===== PLAYBOOK GRID ===== */}
            {activeCategory === 'Playbooks' && (
              <div className="playbookGrid">
                {results.map((a) => (
                  <div
                    key={a.id}
                    className="playbookCard"
                    onClick={() =>
                      a.link &&
                      window.open(a.link, '_blank', 'noopener,noreferrer')
                    }
                  >
                    {a.imageUrl && (
                      <img src={a.imageUrl} className="playbookThumb" />
                    )}
                    <div className="playbookTitle">{a.title}</div>
                    <div className="playbookMeta">PDF · Playbook</div>
                  </div>
                ))}
              </div>
            )}

            {/* ===== DEFAULT LIST VIEW FOR OTHER CATEGORIES ===== */}
            {activeCategory !== 'Marketing Collaterals' &&
              activeCategory !== 'Playbooks' && (
                <>
                  {results.map((a) => (
                    <div
                      key={a.id}
                      className={`result ${
                        a.imageUrl || a.link ? 'clickable' : ''
                      }`}
                      onClick={() => {
                        if (a.imageUrl) {
                          setSelected(a);
                        } else if (a.link) {
                          window.open(a.link, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      <strong>{a.title}</strong>

                      <div className="chips">
                        <span className="chip">{a.category}</span>
                        <span className="chip">{a.type}</span>
                      </div>

                      <p>{a.description}</p>
                    </div>
                  ))}

                  {results.length === 0 && (
                    <p className="empty">
                      No matching assets. Try broader terms or switch category.
                    </p>
                  )}
                </>
              )}
          </section>
        )}

        <footer className="footer">
          © {new Date().getFullYear()} SATS • Marketing Content Hub (Prototype)
        </footer>
      </div>
    </div>
  );
}
