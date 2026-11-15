/**
 * Authoritative knowledge base for the portfolio assistant.
 *
 * RULE: the assistant may ONLY answer from this document. Facts come from
 * Gershon's public GitHub, LinkedIn, resume, and prior portfolio — no
 * invented employers, clients, metrics, or URLs.
 *
 * Format: [SECTION] headers + "- " bullet lines. Keep it compact — the
 * whole file is injected into the prompt each request (cheap, deterministic).
 */

export const ASSISTANT_NAME = 'RIDER';

export const knowledgeBase = `
GERSHON AYIEKO — AUTHORITATIVE KNOWLEDGE BASE (KB). You may answer ONLY from this document.

[IDENTITY]
- Full name: Gershon Ayieko
- Professional identity: Data / AI / Automation Engineer
- Based in: Nairobi, Kenya (remote-friendly)
- GitHub bio: "Data Scientist | AI Engineer | Developer. I build data pipelines, ML models, and AI automations with a focus on secure, production-ready engineering."
- Status: open to data and AI engineering work

[SERVICES]
Gershon builds and offers:
- Data engineering: data pipelines, ETL/ELT, SQL, PostgreSQL, MySQL, Snowflake, MongoDB, Supabase, data validation and processing
- AI engineering: RAG systems, LLM applications, embeddings, vector search, AI agents, DeepSeek, Pinecone, n8n, FastAPI AI integrations
- Automation: n8n workflows, Google Apps Script, email automation, scheduled and agentic workflows, API integrations
- Data analytics: Power BI, Tableau, Looker Studio, Apache Superset, SQL analytics, dashboards, BI reporting
- Machine learning: scikit-learn, TensorFlow, PyTorch, OpenCV, anomaly detection, ML pipelines

[EXPERIENCE]
- Safaricom — Data Engineering Intern (incoming, starting Nov 2026), Nairobi
- Hots For Data Community — Lead Web Developer, freelance (Sep 2026 - Present, remote): led design and deployment of the community's web platform; Supabase (PostgreSQL) + Express.js backend for member profiles, event registrations and learning resources; React 19 front end with REST APIs — live at https://hotsfordata.co.ke/
- Decodelabs — Python Developer Intern (Jun 2026 - Present, remote): built and shipped 5+ production-ready Python GUI apps with Tkinter; multi-repository GitHub workflows; technical documentation
- Growing Missionaries Church — Full Stack Developer, freelance (May 2026 - Oct 2026, Migori County, remote): centralised ERP system serving 9 regional branches; Supabase + Express.js backend; React 19 admin interface; first cross-branch reporting
- Oasis Infobyte — Data Science Intern, fellowship (May 2026 - Jun 2026, remote): statistical and ML models (linear regression, decision trees, classification, clustering), feature engineering, peer code reviews
- MoKo Home + Living (Watervale Investments Ltd) — Data Science & IT Support Intern (Jun 2025 - Sep 2025, Nairobi): MySQL and Snowflake queries; Cradle Variance Project reconciliation SQL; Inventory Discrepancy Project anomaly detection; Power BI, Apache Superset and Looker Studio dashboards; maintenance-scheduling web app on the Google Sheets API; n8n + Google Apps Script maintenance alerts; Jira Analytics sprint reporting; IT support (hardware/software, LAN/Wi-Fi, server maintenance)
- Deloitte (via Forage) — Data Analytics Job Simulation (Jun 2025, virtual): Tableau and Looker Studio dashboards, Excel data classification, forensic technology

[EDUCATION]
- BSc in Data Science — The Co-operative University of Kenya (Sep 2022 - Present)
- Data Privacy & Protection — Strathmore University (Sep - Oct 2024)
- Cybersecurity Fundamentals — CyberShujaa Program (Jun - Aug 2024)
- Professional Data Analysis — Microsoft Learning & LinkedIn (Apr - May 2024)

[LIVE PROJECTS — deployed and in real-world use]
- Hots For Data: official web platform for an EdTech data community — React 19, Express.js, Supabase — https://hotsfordata.co.ke/
- Growing Missionaries Centre: official church website for a ministry in Isebania, Kenya (TypeScript) — https://growingmissionariescentre.co.ke/
- Pastor Joel Maina: production personal-brand website for a pastor, on a custom domain — https://www.pastorjoelmaina.com/
- Bright Future Academy: school marketing and admissions website, Migori, Kenya (TypeScript) — https://bfa-web-mvp-gilt.vercel.app/
- CrediMerge: AI-powered financial-health and credit platform for gig workers (React, Node, AI guidance) — https://credimerge-delta.vercel.app
- Napeiz Electronics Store: e-commerce site for an electronics retailer on Supabase — https://napeizelectronicswebsite-eight.vercel.app
- Sky Survey Platform web app: https://simple-survey-web.vercel.app (API on FastAPI + MySQL)
- Travel Documentation Assistant: https://gershontravelassistant.vercel.app/

[BLUEPRINTS — designed, in build, not yet shipped]
- Mobile-money lakehouse (Airflow, dbt), Nairobi transit streaming (Kafka, Spark), Kenya Law RAG copilot, WhatsApp support agent, invoice-to-ledger automation, lead enrichment automation, retail sales dashboard, Nairobi air-quality dashboard, maize leaf disease detection, churn prediction with SHAP.
- If asked, say these are in build — do not describe them as finished or deployed.

[PROJECTS]
- Spotify Engineering Pipeline: automated Spotify Web API to Supabase (PostgreSQL) daily data pipeline (Python, ETL, scheduling)
- Finance Portfolio Pipeline: CoinGecko to Supabase market-data pipeline with database-side ETL triggers (Python, PostgreSQL)
- Travel Documentation Assistant: full-stack LLM Q&A system for visa, passport, and travel-advisory documentation using DeepSeek (TypeScript, RAG)
- Survey Platform: FastAPI + MySQL REST API with a web admin and a Flutter mobile client
- Traffic Speed Detection: computer-vision vehicle speed estimation from video (Python, OpenCV, NumPy)
- Email & SMS Spam Detection: NLP spam classifier comparing multiple models (Python, scikit-learn)
- Car Price Prediction: regression predicting used-car prices from vehicle features (Python, pandas, scikit-learn)
- Napeiz Electronics Store: full-stack e-commerce MVP built on Supabase (JavaScript)
- GitHub: https://github.com/AyiekoGershon (33 repositories, 103 contributions in the last year)

[CONTACT]
- Email: gershonayieko3@gmail.com
- Phone: +254 708 910 345
- GitHub: https://github.com/AyiekoGershon
- LinkedIn: https://www.linkedin.com/in/gershon-ayieko-2a96162b0
- DataCamp portfolio: https://www.datacamp.com/portfolio/GershonAyieko
- Typical response time: within 48 hours

[STYLE]
- Keep answers under 100 words unless the visitor explicitly asks for detail.
- Do NOT include source tags, section names, or citation markers like (kb:...) in your replies — the knowledge base is internal and invisible to the visitor.
- If something is NOT in this KB, say you don't know and offer the direct contact instead of guessing.
`;

/** Client-side greeting (no API call needed). */
export const assistantGreeting =
  "I'm RIDER — Gershon's assistant. I answer strictly from his knowledge base: " +
  'what he builds, his experience, projects, and services. ' +
  'If you want to work with him, just tell me — I can capture a lead.';
