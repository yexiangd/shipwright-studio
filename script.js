// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Scroll reveal
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form -> POSTs directly to Web3Forms from the visitor's browser
// (their free tier only accepts client-side submissions).
// No email address appears anywhere on the site or in this repo.
// The access key below is a BUILD-TIME placeholder: the deploy step replaces
// __WEB3FORMS_KEY__ with the real key, so the key never lands in git.
// (Web3Forms designs this key as public — it only routes to the owner's
// inbox and reveals no email address.)
const WEB3FORMS_KEY = '__WEB3FORMS_KEY__';
const formStatus = document.getElementById('formStatus');
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();
  const company = (data.get('company') || '').toString(); // honeypot
  const btn = form.querySelector('button[type="submit"]');
  const say = (msg, ok) => {
    formStatus.textContent = msg;
    formStatus.classList.toggle('ok', !!ok);
    formStatus.classList.toggle('err', !ok);
  };
  if (company) {
    // Bot filled the honeypot — pretend it worked, send nothing.
    say('Message sent — I reply within one business day.', true);
    form.reset();
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Sending…';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name, email, message,
        subject: `Project inquiry from ${name} — Shipwright Studio`,
        botcheck: '',
      }),
    });
    const out = await res.json().catch(() => ({}));
    if (out.success) {
      say('Message sent — I reply within one business day.', true);
      form.reset();
    } else {
      say('Something went wrong sending. Please try again in a bit.', false);
    }
  } catch (err) {
    say('Something went wrong sending. Please try again in a bit.', false);
  }
  btn.disabled = false;
  btn.textContent = 'Send message';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Auto-synced showcase: repos tagged with the `showcase` topic on GitHub
// appear here as extra work cards. Curated cards above are untouched.
(function () {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const visuals = ['work-visual-1', 'work-visual-2', 'work-visual-3',
                   'work-visual-4', 'work-visual-5'];
  fetch('showcase.json', { cache: 'no-store' })
    .then(r => { if (!r.ok) throw new Error('no showcase'); return r.json(); })
    .then(data => {
      const projects = (data && data.projects) || [];
      if (!projects.length) return;
      const base = grid.querySelectorAll('.work-card').length;
      projects.forEach((p, i) => {
        const idx = String(base + i + 1).padStart(2, '0');
        const isDemo = p.url && p.repo_url && p.url !== p.repo_url;
        const tags = (p.tags || []).slice(0, 3)
          .map(t => `<span>${esc(t)}</span>`).join('');
        const card = document.createElement('article');
        card.className = 'work-card reveal';
        card.innerHTML =
          `<div class="work-visual ${visuals[i % visuals.length]}">` +
          `<span class="work-index">${idx}</span></div>` +
          `<div class="work-body">` +
          (tags ? `<div class="work-tags">${tags}</div>` : '') +
          `<h3>${esc(p.title || p.name)}</h3>` +
          (p.description ? `<p>${esc(p.description)}</p>` : '') +
          `<a class="work-link" href="${esc(p.url)}" target="_blank" rel="noopener">` +
          `${isDemo ? 'Try the live demo' : 'View on GitHub'} &rarr;</a>` +
          `<p class="work-note">Self-initiated &middot; Auto-synced from GitHub</p>` +
          `</div>`;
        grid.appendChild(card);
        observer.observe(card);
      });
    })
    .catch(() => { /* curated cards remain; sync failure is silent */ });
})();
