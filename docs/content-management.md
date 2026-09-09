# Content management

## Add a project

Edit `src/data/projects.js`. One object per project:

```js
{
  title: 'My New System',
  categories: ['data-engineering'],      // see list below
  summary: 'One sentence — problem → system → outcome.',
  description: 'Two sentences max of card copy.',
  stack: ['Python', 'PostgreSQL'],
  github: 'https://github.com/AyiekoGershon/...',  // or null
  year: '2026',
  featured: false,
  visual: 'pipeline',                    // one of the SVG variants
}
```

Valid categories: `data-engineering`, `ai-engineering`, `automation`, `analytics`,
`machine-learning`, `software`.

Valid `visual` variants: `pipeline`, `llm`, `api`, `vision`, `nlp`, `regression`,
`analytics`, `commerce`. New variants are added in `visualSVG()` in the same file.

The projects grid and filters re-render automatically — no markup changes.

## Edit copy

All narrative copy lives in `index.html` by section:

- Hero → `<section id="hero">`
- Capabilities → `<section id="capabilities">`
- Experience → `<section id="experience">`
- Stack → `<section id="stack">`
- Education → `<section id="education">`
- About → `<section id="about">`
- Contact → `<section id="contact">`

## Change contact details

- Email / phone / location / networks: `index.html` contact section.
- Mailto fallback target: `openMailto()` in `src/main.js`.

## Remove a section

Delete the `<section>` and its nav link in `index.html`, plus the corresponding
observer entry in `src/main.js` (`sectionObserver` list and `stickyObserver`).

## Factual integrity rule

Never add invented employers, clients, metrics, or URLs. Everything in this portfolio
is sourced from public GitHub, LinkedIn, the resume, and the prior portfolio site.
