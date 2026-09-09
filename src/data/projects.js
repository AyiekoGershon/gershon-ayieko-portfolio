/**
 * Content data — separated from UI so projects can be added/edited
 * without touching markup or components.
 *
 * Field reference (only what is used):
 *  - title        project display name
 *  - categories   one or more of: data-engineering, ai-engineering,
 *                 automation, analytics, machine-learning, software
 *  - summary      problem -> system -> outcome, one strong sentence
 *  - description  two short sentences max (card copy)
 *  - stack        technologies verified by GitHub / resume
 *  - github       repository URL (verified) or null
 *  - year         last-activity / creation year (verified)
 *  - featured     true -> featured treatment in grid
 *  - visual       inline SVG motif variant
 */

export const projects = [
  {
    title: 'Spotify Engineering Pipeline',
    categories: ['data-engineering', 'automation'],
    summary:
      'An automated end-to-end data pipeline that collects, archives, and analyzes daily music charts.',
    description:
      'Connects the Spotify Web API to a Supabase (PostgreSQL) warehouse and runs daily snapshot jobs — a complete extract, load, transform, and analytics loop.',
    stack: ['Python', 'Spotify API', 'Supabase', 'PostgreSQL', 'ETL', 'Scheduling'],
    github: 'https://github.com/AyiekoGershon/spotify-engineering',
    year: '2026',
    featured: true,
    visual: 'pipeline',
  },
  {
    title: 'Finance Portfolio Pipeline',
    categories: ['data-engineering', 'automation'],
    summary:
      'Automated CoinGecko → Supabase market-data pipeline with database-side ETL triggers.',
    description:
      'Market data is pulled, transformed inside PostgreSQL, and kept fresh without manual runs — evidence of database-first pipeline design.',
    stack: ['Python', 'CoinGecko API', 'Supabase', 'PostgreSQL', 'Triggers'],
    github: 'https://github.com/AyiekoGershon/finance-portfolio-pipeline',
    year: '2026',
    featured: true,
    visual: 'pipeline',
  },
  {
    title: 'Travel Documentation Assistant',
    categories: ['ai-engineering'],
    summary:
      'A full-stack, AI-powered Q&A system for visa, passport, and travel-advisory documentation worldwide.',
    description:
      'Uses the DeepSeek LLM behind a TypeScript stack to answer real-time travel-documentation questions — an applied LLM system, not a demo.',
    stack: ['TypeScript', 'DeepSeek', 'LLM', 'Full-Stack', 'RAG'],
    github: 'https://github.com/AyiekoGershon/Travel-Documentation-Assistant---Q-A-LLM-System',
    year: '2026',
    featured: true,
    visual: 'llm',
  },
  {
    title: 'Survey Platform',
    categories: ['software'],
    summary:
      'A multi-tier survey system: FastAPI + MySQL REST API, dark-themed web admin, and a Flutter mobile client.',
    description:
      'Three codebases, one contract — REST architecture spanning API design, database integration, and cross-platform frontends.',
    stack: ['FastAPI', 'MySQL', 'Flutter', 'JavaScript', 'REST'],
    github: 'https://github.com/AyiekoGershon/Survey-API',
    year: '2025',
    featured: true,
    visual: 'api',
  },
  {
    title: 'Traffic Speed Detection',
    categories: ['machine-learning'],
    summary:
      'Computer-vision system that detects and estimates vehicle speed in a video stream.',
    description:
      'Built with OpenCV and NumPy to automate traffic analysis — real-time detection, tracking, and speed estimation from raw footage.',
    stack: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
    github: 'https://github.com/AyiekoGershon/Traffic-speed-Detection',
    year: '2025',
    featured: true,
    visual: 'vision',
  },
  {
    title: 'Email & SMS Spam Detection',
    categories: ['machine-learning'],
    summary:
      'NLP system that classifies messages as spam or legitimate.',
    description:
      'Text preprocessing, feature extraction, and a comparison of multiple classifiers — a complete, evaluable ML workflow.',
    stack: ['Python', 'NLP', 'Scikit-learn', 'TF-IDF'],
    github: 'https://github.com/AyiekoGershon/Email-And-SMS-Spam-Detection',
    year: '2025',
    featured: false,
    visual: 'nlp',
  },
  {
    title: 'Car Price Prediction',
    categories: ['machine-learning'],
    summary:
      'Regression project predicting used-car selling prices from vehicle features.',
    description:
      'Age, brand, transmission, and kilometers driven feed an end-to-end regression pipeline with model diagnostics.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Regression'],
    github: 'https://github.com/AyiekoGershon/Car-Price-Prediction',
    year: '2025',
    featured: false,
    visual: 'regression',
  },
  {
    title: 'Napeiz Electronics Store',
    categories: ['software'],
    summary:
      'A full-stack e-commerce MVP for premium electronics built on Supabase.',
    description:
      'Catalog, cart, and order flows wired to a hosted PostgreSQL backend — browser application engineering end to end.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Supabase'],
    github: 'https://github.com/AyiekoGershon/Napeiz-Electronics-Website-mvp',
    year: '2026',
    featured: false,
    visual: 'commerce',
  },
  {
    title: 'Deloitte Data Analytics Simulation',
    categories: ['analytics'],
    summary:
      'Job simulation covering data analysis and forensic technology at Deloitte.',
    description:
      'Built interactive Tableau dashboards and performed data classification with Excel — business intelligence applied to a forensic context.',
    stack: ['Tableau', 'Excel', 'Forensic Analysis', 'BI'],
    github: null,
    year: '2024',
    featured: false,
    visual: 'analytics',
  },
];

export const filters = [
  { id: 'all', label: 'All Systems' },
  { id: 'data-engineering', label: 'Data Engineering' },
  { id: 'ai-engineering', label: 'AI Engineering' },
  { id: 'automation', label: 'Automation' },
  { id: 'machine-learning', label: 'Machine Learning' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'software', label: 'Software' },
];

/** Inline SVG schematic motifs for project cards (no external imagery). */
export function visualSVG(variant) {
  const stroke = '#2b3642';
  const accent = '#37d6e8';
  const dim = '#54616d';
  const bg = '#0d1218';
  switch (variant) {
    case 'pipeline':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}">
          <rect x="28" y="40" width="86" height="52" rx="4"/>
          <rect x="28" y="148" width="86" height="52" rx="4"/>
          <rect x="286" y="40" width="86" height="52" rx="4"/>
          <rect x="286" y="148" width="86" height="52" rx="4"/>
        </g>
        <g fill="none" stroke="${dim}" stroke-width="2">
          <path d="M114 66 H180 V66"/>
          <path d="M114 174 H180 V174"/>
          <path d="M220 66 H286"/>
          <path d="M220 174 H286"/>
          <path d="M180 66 V174"/>
          <path d="M200 120 H220 V66"/>
          <path d="M220 174 V120 H200"/>
        </g>
        <g fill="${accent}">
          <circle cx="220" cy="120" r="7"/>
          <circle cx="200" cy="66" r="4"/>
          <circle cx="200" cy="174" r="4"/>
        </g>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="40" y="70">api</text>
          <text x="40" y="178">schedule</text>
          <text x="298" y="70">supabase</text>
          <text x="298" y="178">analytics</text>
        </g>
      </svg>`;
    case 'llm':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}">
          <rect x="30" y="86" width="112" height="68" rx="6"/>
          <rect x="258" y="60" width="112" height="52" rx="6"/>
          <rect x="258" y="128" width="112" height="52" rx="6"/>
        </g>
        <g fill="none" stroke="${accent}" stroke-width="2">
          <path d="M142 110 H258"/>
          <path d="M142 136 H258"/>
          <path d="M300 112 V128"/>
        </g>
        <circle cx="258" cy="120" r="5" fill="${accent}"/>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="44" y="112">query</text>
          <text x="44" y="132">deepseek</text>
          <text x="272" y="82">visa rules</text>
          <text x="272" y="150">advisories</text>
        </g>
        <g fill="none" stroke="${accent}" opacity="0.5">
          <path d="M184 160 q10 -14 20 0 q10 14 20 0" />
          <path d="M244 76 q8 -12 16 0" />
        </g>
      </svg>`;
    case 'api':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}">
          <rect x="24" y="38" width="352" height="164" rx="6"/>
        </g>
        <g fill="none" stroke="${dim}" stroke-width="2">
          <path d="M24 86 H376"/>
          <path d="M24 138 H376"/>
        </g>
        <g font-family="monospace" font-size="11" fill="${dim}">
          <text x="40" y="64">POST /surveys</text>
          <text x="40" y="112">GET /responses</text>
          <text x="40" y="164">mysql</text>
        </g>
        <g fill="${accent}">
          <rect x="280" y="52" width="52" height="20" rx="3"/>
          <rect x="280" y="100" width="52" height="20" rx="3"/>
          <rect x="280" y="150" width="52" height="20" rx="3"/>
        </g>
        <text x="292" y="67" font-family="monospace" font-size="11" fill="#000">200</text>
        <text x="292" y="115" font-family="monospace" font-size="11" fill="#000">201</text>
        <text x="292" y="165" font-family="monospace" font-size="11" fill="#000">ok</text>
      </svg>`;
    case 'vision':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}">
          <rect x="30" y="34" width="190" height="110" rx="4"/>
        </g>
        <g fill="none" stroke="${accent}" stroke-width="2">
          <rect x="62" y="78" width="44" height="34" rx="3"/>
          <rect x="122" y="62" width="58" height="50" rx="3"/>
        </g>
        <g fill="none" stroke="${dim}" stroke-width="2">
          <path d="M220 96 H300"/>
          <path d="M220 120 H320"/>
        </g>
        <g fill="${accent}">
          <circle cx="334" cy="120" r="5"/>
        </g>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="44" y="170">opencv · track</text>
          <text x="220" y="86">frames →</text>
          <text x="236" y="158">speed ≈ Δpx/Δt</text>
        </g>
      </svg>`;
    case 'nlp':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g font-family="monospace" font-size="11" fill="${dim}">
          <text x="30" y="60">"win a prize now"</text>
          <text x="30" y="84">"meeting at 3pm"</text>
        </g>
        <g fill="none" stroke="${stroke}">
          <rect x="30" y="104" width="150" height="44" rx="4"/>
          <rect x="30" y="164" width="150" height="44" rx="4"/>
        </g>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="44" y="122">tf-idf → classify</text>
          <text x="44" y="182">scikit-learn</text>
        </g>
        <g fill="${accent}">
          <rect x="240" y="104" width="88" height="44" rx="4"/>
          <rect x="240" y="164" width="88" height="44" rx="4"/>
        </g>
        <text x="264" y="130" font-family="monospace" font-size="12" fill="#000">SPAM</text>
        <text x="260" y="190" font-family="monospace" font-size="12" fill="#000">HAM</text>
      </svg>`;
    case 'regression':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}" stroke-width="2">
          <path d="M40 200 V40"/>
          <path d="M40 200 H360"/>
        </g>
        <g fill="${accent}">
          <circle cx="80" cy="170" r="4"/><circle cx="120" cy="140" r="4"/>
          <circle cx="160" cy="120" r="4"/><circle cx="200" cy="105" r="4"/>
          <circle cx="240" cy="88" r="4"/><circle cx="280" cy="78" r="4"/>
          <circle cx="320" cy="60" r="4"/>
        </g>
        <path d="M70 180 L330 54" stroke="${accent}" stroke-width="2" fill="none" stroke-dasharray="5 6"/>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="250" y="160">price = f(age, km, brand)</text>
          <text x="60" y="228">train · validate · predict</text>
        </g>
      </svg>`;
    case 'analytics':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}">
          <rect x="30" y="30" width="340" height="148" rx="4"/>
        </g>
        <g fill="${accent}">
          <rect x="70" y="120" width="26" height="46"/>
          <rect x="116" y="96" width="26" height="70"/>
          <rect x="162" y="70" width="26" height="96"/>
          <rect x="208" y="46" width="26" height="120"/>
        </g>
        <path d="M60 170 L300 40" stroke="${dim}" stroke-width="2" fill="none" stroke-dasharray="4 5"/>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="44" y="198">tableau · excel · classification</text>
          <text x="120" y="222">forensic data workflow</text>
        </g>
      </svg>`;
    case 'commerce':
      return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <rect width="400" height="240" fill="${bg}"/>
        <g fill="none" stroke="${stroke}">
          <rect x="30" y="34" width="120" height="92" rx="4"/>
          <rect x="166" y="34" width="120" height="92" rx="4"/>
          <rect x="302" y="34" width="68" height="92" rx="4"/>
        </g>
        <g fill="none" stroke="${dim}" stroke-width="2">
          <path d="M40 170 H150"/>
          <path d="M166 170 H276"/>
        </g>
        <g fill="${accent}">
          <rect x="280" y="160" width="90" height="34" rx="3"/>
        </g>
        <text x="296" y="181" font-family="monospace" font-size="11" fill="#000">checkout</text>
        <g fill="${dim}" font-family="monospace" font-size="11">
          <text x="42" y="196">catalog · cart · supabase</text>
        </g>
      </svg>`;
    default:
      return `<rect width="400" height="240" fill="${bg}"/>`;
  }
}
