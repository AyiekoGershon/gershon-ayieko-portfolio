import './styles.css';
import { projects, visualSVG } from './data/projects.js';
import { assistantGreeting } from './data/knowledge-base.js';

/* ============================================================
   Environment helpers
   ============================================================ */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';
const FORMSPREE_READY = FORMSPREE_ENDPOINT.startsWith('https://formspree.io/f/');

/* ============================================================
   TOAST
   ============================================================ */
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMsg = document.getElementById('toastMsg');
let toastTimer = null;

function showToast(title, msg, isError = false) {
  toastTitle.textContent = title;
  toastMsg.textContent = msg;
  toast.classList.toggle('error', isError);
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4200);
}

/* ============================================================
   SPLASH — animated logo boot screen
   ============================================================ */
const splash = document.getElementById('splash');
const splashProgress = document.getElementById('splashProgress');
const bootText = document.getElementById('bootText');
const splashSkip = document.getElementById('splashSkip');

const BOOT_LINES = [
  'booting system…',
  'loading identity assets…',
  'linking data systems…',
  'mounting ai modules…',
  'calibrating analytics…',
  'all systems ready.',
];

let splashFinished = false;

function finishSplash() {
  if (splashFinished) return;
  splashFinished = true;
  splashProgress.style.width = '100%';
  bootText.textContent = BOOT_LINES[BOOT_LINES.length - 1];
  splash.classList.add('done');
  setTimeout(() => {
    splash.remove();
    document.body.classList.add('site-ready');
    const brand = document.querySelector('.brand');
    if (brand) brand.focus({ preventScroll: true });
  }, REDUCED_MOTION ? 50 : 720);
}

if (REDUCED_MOTION) {
  // Reduced motion: brief static brand state, minimal wait.
  splashProgress.style.width = '100%';
  bootText.textContent = 'all systems ready.';
  setTimeout(finishSplash, 700);
} else {
  const DURATION = 2300;
  const start = performance.now();

  function tick(now) {
    if (splashFinished) return;
    const pct = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(1 - pct, 2.2);
    splashProgress.style.width = (eased * 100).toFixed(1) + '%';
    const lineIdx = Math.min(
      BOOT_LINES.length - 1,
      Math.floor(eased * BOOT_LINES.length)
    );
    bootText.textContent = BOOT_LINES[lineIdx];
    if (pct < 1) requestAnimationFrame(tick);
    else finishSplash();
  }
  requestAnimationFrame(tick);
}

splashSkip.addEventListener('click', finishSplash);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !splashFinished) finishSplash();
});

/* ============================================================
   FRAME IMAGES — progressive hydration
   WebP is the deployed format, so it is checked first.
   Candidates are verified with fetch (no console 404 noise);
   missing files simply leave the slot hidden.
   ============================================================ */
const FRAME_EXTS = ['.webp', '.jpg', '.jpeg', '.png'];

async function hydrateFrame(img, slot) {
  const base = img.dataset.frame;
  if (!base) return;
  for (const ext of FRAME_EXTS) {
    const url = base + ext;
    try {
      const res = await fetch(url);
      if (res.ok) {
        img.src = url;
        img.classList.add('loaded');
        if (slot) slot.classList.add('on');
        return;
      }
    } catch {
      /* keep trying next extension */
    }
  }
}

function hydrateAllFrames() {
  document.querySelectorAll('img[data-frame]').forEach((img) => {
    if (img.dataset.hydrated) return;
    img.dataset.hydrated = '1';
    hydrateFrame(img, img.closest('.frame-slot'));
  });
}

/* ============================================================
   PROJECTS — render + filters
   ============================================================ */
const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
  const list = projects.filter(
    (p) => filter === 'all' || p.categories.includes(filter)
  );

  if (list.length === 0) {
    projectGrid.innerHTML = `<div class="project-none">// no systems in this channel</div>`;
    return;
  }

  projectGrid.innerHTML = list
    .map(
      (p, i) => `
      <article class="project-card info-card" style="--i:${i}">
        <div class="project-visual">
          ${visualSVG(p.visual)}
          ${p.image ? `<img class="project-photo" data-frame="${p.image}" alt="" loading="lazy" />` : ''}
          <div class="visual-scan" aria-hidden="true"></div>
          <div class="visual-tag">${p.categories[0].toUpperCase().replace('-', ' ')}</div>
        </div>
        <div class="project-body">
          <div class="project-top">
            <span class="project-cat">${p.categories.join(' · ').toUpperCase()}</span>
            <span class="project-year">${p.year}</span>
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-stack">
            ${p.stack.map((t) => `<span>${t}</span>`).join('')}
          </div>
          <div class="project-foot">
            ${
              p.github
                ? `<a class="project-link" href="${p.github}" target="_blank" rel="noopener" aria-label="${p.title} on GitHub">
                     VIEW REPOSITORY
                     <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
                   </a>`
                : `<span class="project-flag">CASE STUDY</span>`
            }
            ${p.featured ? `<span class="project-flag">FEATURED</span>` : ''}
          </div>
        </div>
      </article>`
    )
    .join('');

  hydrateAllFrames();
}

renderProjects('all');
hydrateAllFrames();

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    renderProjects(btn.dataset.filter);
  });
});
filterButtons.forEach((b) => b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false'));

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document
  .querySelectorAll('.reveal, .reveal-stagger')
  .forEach((el) => revealObserver.observe(el));

/* ============================================================
   NUMBER COUNTERS (verified stats only)
   ============================================================ */
const counters = document.querySelectorAll('.number-display');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (REDUCED_MOTION) {
        el.textContent = target.toLocaleString();
        counterObserver.unobserve(el);
        return;
      }
      const duration = 1600;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => counterObserver.observe(c));

/* ============================================================
   MOBILE NAV
   ============================================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mobileNav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  })
);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});

/* ============================================================
   ACTIVE NAV SECTION
   ============================================================ */
const navLinks = document.querySelectorAll('.main-nav .nav-link');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) =>
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
      );
    });
  },
  { rootMargin: '-38% 0px -55% 0px' }
);
['capabilities', 'systems', 'experience', 'stack', 'about', 'assistant', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ============================================================
   STICKY CTA — visible after hero, hidden at contact
   ============================================================ */
const stickyCta = document.getElementById('stickyCta');
const hero = document.getElementById('hero');
const contact = document.getElementById('contact');

const stickyObserver = new IntersectionObserver(
  () => {
    const heroGone = hero.getBoundingClientRect().bottom < 0;
    const contactRect = contact.getBoundingClientRect();
    const atContact = contactRect.top < window.innerHeight && contactRect.bottom > 0;
    const showSticky = heroGone && !atContact;
    stickyCta.classList.toggle('visible', showSticky);
    // Raise the assistant FAB above the sticky bar when it is visible
    const fab = document.getElementById('assistantFab');
    if (fab) fab.classList.toggle('raised', showSticky);
  },
  { threshold: 0 }
);
stickyObserver.observe(hero);
stickyObserver.observe(contact);

/* ============================================================
   CONTACT FORM — Formspree (env) with mailto fallback
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formHint = document.getElementById('formHint');

if (FORMSPREE_READY) {
  formHint.textContent = 'Routed via Formspree — delivered straight to the inbox.';
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const topic = data.get('topic');
  const message = data.get('message');

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'TRANSMITTING…';

  if (FORMSPREE_READY) {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        showToast('Signal received', 'Message transmitted. I\'ll reply within 48 hours.');
        contactForm.reset();
      } else {
        throw new Error('formspree rejected the request');
      }
    } catch {
      showToast('Transmission failed', 'Falling back to your mail client…', true);
      openMailto(name, email, topic, message);
    }
  } else {
    showToast('Mail client requested', 'Composing your message locally.');
    openMailto(name, email, topic, message);
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = originalLabel;
});

function openMailto(name, email, topic, message) {
  const subject = encodeURIComponent(`[Portfolio] ${topic} — from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
  window.location.href = `mailto:gershonayieko3@gmail.com?subject=${subject}&body=${body}`;
}

/* ============================================================
   COPY EMAIL
   ============================================================ */
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    btn.textContent = 'COPIED ✓';
    btn.classList.add('copied');
    showToast('Copied', 'Email address copied to clipboard.');
    setTimeout(() => {
      btn.textContent = 'COPY';
      btn.classList.remove('copied');
    }, 2200);
  });
});

/* ============================================================
   GRAIN PARALLAX (decorative — disabled for reduced motion)
   ============================================================ */
const grain = document.querySelector('.grain');
if (grain && !REDUCED_MOTION) {
  let targetY = 0;
  let currentY = 0;
  window.addEventListener(
    'scroll',
    () => {
      targetY = window.scrollY * 0.1;
    },
    { passive: true }
  );
  (function animateGrain() {
    currentY += (targetY - currentY) * 0.08;
    grain.style.transform = `translateY(${currentY}px)`;
    requestAnimationFrame(animateGrain);
  })();
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById('year').textContent = String(new Date().getFullYear());

/* ============================================================
   RIDER — ASSISTANT WIDGET
   ============================================================ */
const fab = document.getElementById('assistantFab');
const panel = document.getElementById('assistantPanel');
const closeBtn = document.getElementById('assistantClose');
const logEl = document.getElementById('assistantLog');
const chipsEl = document.getElementById('assistantChips');
const formEl = document.getElementById('assistantForm');
const inputEl = document.getElementById('assistantInput');

const assistantState = {
  history: [], // { role: 'user' | 'assistant', content }
  busy: false,
  greeted: false,
};

function setPanelOpen(open) {
  panel.hidden = !open;
  fab.setAttribute('aria-expanded', String(open));
  fab.setAttribute('aria-label', open ? 'Close Gershon\'s AI assistant' : 'Open Gershon\'s AI assistant');
  if (open) {
    if (!assistantState.greeted) {
      assistantState.greeted = true;
      addAssistantMessage(assistantGreeting);
    }
    requestAnimationFrame(() => inputEl.focus());
  }
}

fab.addEventListener('click', () => setPanelOpen(panel.hidden));
closeBtn.addEventListener('click', () => {
  setPanelOpen(false);
  fab.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !panel.hidden) {
    setPanelOpen(false);
    fab.focus();
  }
});

function addBubble(role, text, { error = false, note = '' } = {}) {
  const div = document.createElement('div');
  div.className = `ap-msg ${role}${error ? ' error' : ''}`;
  div.textContent = text;
  if (note) {
    const span = document.createElement('span');
    span.className = 'note';
    span.textContent = note;
    div.appendChild(span);
  }
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
  return div;
}

function addAssistantMessage(text, opts) {
  assistantState.history.push({ role: 'assistant', content: text });
  return addBubble('assistant', text, opts);
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'ap-typing';
  el.setAttribute('aria-label', 'RIDER is typing');
  el.innerHTML = '<i></i><i></i><i></i>';
  logEl.appendChild(el);
  logEl.scrollTop = logEl.scrollHeight;
  return el;
}

async function sendAssistant(text) {
  if (assistantState.busy) return;
  const message = String(text || '').trim();
  if (!message) return;

  chipsEl.hidden = true;
  assistantState.history.push({ role: 'user', content: message });
  addBubble('user', message);
  inputEl.value = '';
  assistantState.busy = true;

  const submitBtn = formEl.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  const typing = showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: assistantState.history.slice(-10) }),
    });
    const data = await res.json().catch(() => ({}));
    typing.remove();

    if (res.ok && data.reply) {
      const note = data.leadCaptured
        ? 'LEAD CAPTURED — GERSHON WILL REACH OUT WITHIN 48H'
        : '';
      addAssistantMessage(data.reply, { note });
    } else {
      const fallback =
        data.reply ||
        'The assistant is unavailable right now. Email gershonayieko3@gmail.com directly.';
      addBubble('assistant', fallback, { error: true });
    }
  } catch {
    typing.remove();
    addBubble(
      'assistant',
      'Connection lost. Email gershonayieko3@gmail.com directly.',
      { error: true }
    );
  } finally {
    assistantState.busy = false;
    submitBtn.disabled = false;
    inputEl.focus();
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  sendAssistant(inputEl.value);
});

chipsEl.querySelectorAll('button').forEach((chip) => {
  chip.addEventListener('click', () => sendAssistant(chip.dataset.q));
});
