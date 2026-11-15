/**
 * Content data — separated from UI so projects can be added/edited
 * without touching markup or components.
 *
 * Field reference:
 *  - title        project display name
 *  - categories   one or more of: data-engineering, ai-engineering,
 *                 automation, analytics, machine-learning, software
 *  - status       'live'      → deployed and used in the real world
 *                 'shipped'   → complete, public on GitHub
 *                 'blueprint' → designed and in build (no repo yet)
 *  - description  two short sentences max (card copy)
 *  - stack        technologies
 *  - live         public URL of the deployed product (or omitted)
 *  - github       repository URL (or null / omitted)
 *  - client       who it was built for (live client work)
 *  - year         last-activity / target year
 *  - img          static image in /public (assets/projects/*.webp)
 *  - image        frame base path hydrated by main.js (frames/frame-0X)
 *  - visual       inline SVG motif fallback when no image is available
 */

export const projects = [
  /* ---------------- LIVE — real-world, deployed ---------------- */
  {
    title: 'Hots For Data Platform',
    categories: ['software', 'data-engineering'],
    status: 'live',
    client: 'EdTech data community · Nairobi',
    description:
      'Official platform for an African data-learning community — tracks, events, registrations and learning resources, with member-engagement data centralised for organisers.',
    stack: ['React 19', 'Express.js', 'Supabase', 'PostgreSQL', 'REST APIs'],
    live: 'https://hotsfordata.co.ke/',
    github: null,
    year: '2026',
    img: 'assets/projects/hotsfordata.webp',
    visual: 'commerce',
  },
  {
    title: 'Growing Missionaries Centre',
    categories: ['software'],
    status: 'live',
    client: 'Church · Isebania, Kenya',
    description:
      'Official website for a ministry in Isebania — ministries, service times, branches, outreach programmes, and online giving in one fast, mobile-first site.',
    stack: ['TypeScript', 'React', 'Responsive UI', 'SEO'],
    live: 'https://growingmissionariescentre.co.ke/',
    github: 'https://github.com/AyiekoGershon/Growing-Ministrie-Center-Web',
    year: '2026',
    img: 'assets/projects/gmc.webp',
    visual: 'commerce',
  },
  {
    title: 'Pastor Joel Maina — Personal Brand',
    categories: ['software'],
    status: 'live',
    client: 'Pastor · Nairobi, Kenya',
    description:
      'Production portfolio for a pastor and counsellor — ministry areas, publications, gallery, donations and contact, on a custom domain.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Custom Domain'],
    live: 'https://www.pastorjoelmaina.com/',
    github: 'https://github.com/AyiekoGershon/PASTOR-Joel-Maina-Portfolio',
    year: '2026',
    img: 'assets/projects/joelmaina.webp',
    visual: 'commerce',
  },
  {
    title: 'Napeiz Electronics Store',
    categories: ['software'],
    status: 'live',
    client: 'Electronics retailer · Migori, Kenya',
    description:
      'Full-stack e-commerce store for phones, TVs and appliances — catalogue, search, cart, WhatsApp ordering and local delivery on a Supabase backend.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Supabase', 'PostgreSQL'],
    live: 'https://napeizelectronicswebsite-eight.vercel.app',
    github: 'https://github.com/AyiekoGershon/Napeiz-Electronics-Website-mvp',
    year: '2026',
    img: 'assets/projects/napeiz.webp',
    visual: 'commerce',
  },
  {
    title: 'Sky Survey Platform',
    categories: ['software'],
    status: 'live',
    client: 'Survey management system',
    description:
      'Multi-tier survey system: FastAPI + MySQL REST API, a dark-themed web admin, and a Flutter mobile client — three codebases, one contract.',
    stack: ['FastAPI', 'MySQL', 'Flutter', 'JavaScript', 'REST'],
    live: 'https://simple-survey-web.vercel.app',
    github: 'https://github.com/AyiekoGershon/Survey-API',
    year: '2026',
    img: 'assets/projects/survey.webp',
    visual: 'api',
  },
  {
    title: 'Travel Documentation Assistant',
    categories: ['ai-engineering'],
    status: 'live',
    client: 'AI Q&A product',
    description:
      'Full-stack LLM assistant answering visa, passport and travel-advisory questions worldwide, powered by DeepSeek behind a TypeScript stack.',
    stack: ['TypeScript', 'DeepSeek', 'LLM', 'RAG', 'Full-Stack'],
    live: 'https://gershontravelassistant.vercel.app/',
    github: 'https://github.com/AyiekoGershon/Travel-Documentation-Assistant---Q-A-LLM-System',
    year: '2026',
    image: 'frames/frame-02',
    visual: 'llm',
  },

  /* ---------------- SHIPPED — public on GitHub ---------------- */
  {
    title: 'Spotify Engineering Pipeline',
    categories: ['data-engineering', 'automation'],
    status: 'shipped',
    description:
      'Spotify Web API → Supabase (PostgreSQL) warehouse with daily snapshot jobs on GitHub Actions and in-database triggers for nested payloads.',
    stack: ['Python', 'Spotify API', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    github: 'https://github.com/AyiekoGershon/spotify-engineering',
    year: '2026',
    image: 'frames/frame-03',
    visual: 'pipeline',
  },
  {
    title: 'Finance Portfolio Pipeline',
    categories: ['data-engineering', 'automation'],
    status: 'shipped',
    description:
      'Automated CoinGecko → Supabase market-data pipeline; transformations run inside PostgreSQL via triggers, so data stays fresh without manual runs.',
    stack: ['Python', 'CoinGecko API', 'Supabase', 'PostgreSQL', 'Triggers'],
    github: 'https://github.com/AyiekoGershon/finance-portfolio-pipeline',
    year: '2026',
    image: 'frames/frame-07',
    visual: 'pipeline',
  },
  {
    title: 'Traffic Speed Detection',
    categories: ['machine-learning'],
    status: 'shipped',
    description:
      'Computer-vision system that detects, tracks and estimates vehicle speed from raw video — groundwork for smart traffic and road-safety monitoring.',
    stack: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
    github: 'https://github.com/AyiekoGershon/Traffic-speed-Detection',
    year: '2025',
    img: 'assets/projects/traffic.webp',
    visual: 'vision',
  },
  {
    title: 'Email & SMS Spam Detection',
    categories: ['machine-learning'],
    status: 'shipped',
    description:
      'NLP classifier separating spam from legitimate messages — text preprocessing, TF-IDF features, and a comparison of models on imbalanced data.',
    stack: ['Python', 'NLP', 'Scikit-learn', 'TF-IDF'],
    github: 'https://github.com/AyiekoGershon/Email-And-SMS-Spam-Detection',
    year: '2025',
    img: 'assets/projects/spam.webp',
    visual: 'nlp',
  },
  {
    title: 'Car Price Prediction',
    categories: ['machine-learning'],
    status: 'shipped',
    description:
      'Regression pipeline predicting used-car prices from age, brand, transmission and mileage, with feature engineering and hyperparameter tuning.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Regression'],
    github: 'https://github.com/AyiekoGershon/Car-Price-Prediction',
    year: '2025',
    img: 'assets/projects/car.webp',
    visual: 'regression',
  },
  {
    title: 'Deloitte Forensic Analytics',
    categories: ['analytics'],
    status: 'shipped',
    description:
      'Job simulation in data analysis and forensic technology — interactive Tableau dashboards and Excel-based data classification.',
    stack: ['Tableau', 'Excel', 'Forensic Analysis', 'BI'],
    github: null,
    year: '2024',
    img: 'assets/projects/forensic.webp',
    visual: 'analytics',
  },

  /* ---------------- BLUEPRINTS — two per role, in build ---------------- */
  {
    title: 'Mobile-Money Lakehouse',
    categories: ['data-engineering'],
    status: 'blueprint',
    description:
      'Batch lakehouse for M-Pesa-style transaction data: Airflow-orchestrated ingestion, dbt models with tests, and a star schema ready for finance reporting.',
    stack: ['Airflow', 'dbt', 'DuckDB', 'Snowflake', 'Great Expectations'],
    year: '2026',
    img: 'assets/projects/lakehouse.webp',
    visual: 'pipeline',
  },
  {
    title: 'Nairobi Transit Stream',
    categories: ['data-engineering'],
    status: 'blueprint',
    description:
      'Real-time matatu GPS pipeline — Kafka ingestion and Spark Structured Streaming for ETAs and congestion, served to a live map dashboard.',
    stack: ['Kafka', 'Spark Streaming', 'PostgreSQL', 'PostGIS', 'Docker'],
    year: '2026',
    img: 'assets/projects/streaming.webp',
    visual: 'pipeline',
  },
  {
    title: 'Kenya Law RAG Copilot',
    categories: ['ai-engineering'],
    status: 'blueprint',
    description:
      'Retrieval-augmented assistant over Kenyan statutes and case law with cited answers, hybrid search, and an evaluation harness for faithfulness.',
    stack: ['LLM', 'pgvector', 'Hybrid Search', 'FastAPI', 'RAG Evals'],
    year: '2026',
    img: 'assets/projects/legal-rag.webp',
    visual: 'llm',
  },
  {
    title: 'WhatsApp Support Agent',
    categories: ['ai-engineering', 'automation'],
    status: 'blueprint',
    description:
      'Tool-using AI agent for SME customer support on WhatsApp — order lookup, FAQs from a knowledge base, and human hand-off behind guardrails.',
    stack: ['AI Agents', 'Tool Use', 'WhatsApp API', 'n8n', 'Supabase'],
    year: '2026',
    img: 'assets/projects/support-agent.webp',
    visual: 'llm',
  },
  {
    title: 'Invoice-to-Ledger Automation',
    categories: ['automation'],
    status: 'blueprint',
    description:
      'Emailed invoices are captured, parsed with OCR + LLM extraction, validated, and posted to Google Sheets or accounting — with an approval step.',
    stack: ['n8n', 'OCR', 'LLM Extraction', 'Google Sheets API', 'Apps Script'],
    year: '2026',
    img: 'assets/projects/invoice.webp',
    visual: 'pipeline',
  },
  {
    title: 'Lead Enrichment & Outreach',
    categories: ['automation'],
    status: 'blueprint',
    description:
      'Form and CRM leads are enriched, scored, and routed to personalised follow-up sequences automatically — plus a weekly pipeline report.',
    stack: ['n8n', 'APIs', 'Lead Scoring', 'Gmail API', 'Cron'],
    year: '2026',
    img: 'assets/projects/outreach.webp',
    visual: 'pipeline',
  },
  {
    title: 'Retail Sales Command Center',
    categories: ['analytics'],
    status: 'blueprint',
    description:
      'Executive dashboard for a retail chain — sales, margin, stock-outs and branch performance, modelled in SQL with drill-downs and alerts.',
    stack: ['Power BI', 'SQL', 'DAX', 'Data Modelling'],
    year: '2026',
    img: 'assets/projects/retail.webp',
    visual: 'analytics',
  },
  {
    title: 'Nairobi Air Quality Monitor',
    categories: ['analytics'],
    status: 'blueprint',
    description:
      'Public dashboard tracking PM2.5 across Nairobi from open sensor data, with trends, health thresholds, and neighbourhood comparisons.',
    stack: ['Apache Superset', 'Python', 'OpenAQ API', 'PostgreSQL'],
    year: '2026',
    img: 'assets/projects/airquality.webp',
    visual: 'analytics',
  },
  {
    title: 'Maize Leaf Disease Detection',
    categories: ['machine-learning'],
    status: 'blueprint',
    description:
      'CNN that diagnoses common maize diseases from a phone photo, exported to TensorFlow Lite for offline use by smallholder farmers.',
    stack: ['TensorFlow', 'Transfer Learning', 'TF Lite', 'Computer Vision'],
    year: '2026',
    img: 'assets/projects/crop.webp',
    visual: 'vision',
  },
  {
    title: 'Churn Prediction & Explainability',
    categories: ['machine-learning'],
    status: 'blueprint',
    description:
      'Gradient-boosted churn model with SHAP explanations, served through a FastAPI endpoint so retention teams see who is at risk — and why.',
    stack: ['XGBoost', 'SHAP', 'FastAPI', 'MLflow'],
    year: '2026',
    img: 'assets/projects/churn.webp',
    visual: 'regression',
  },
];

/** Status filters match project.status; the rest match project.categories. */
export const STATUS_FILTERS = ['live', 'shipped', 'blueprint'];

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
