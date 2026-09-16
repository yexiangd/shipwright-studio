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

// Contact form -> POSTs to Web3Forms, which emails the studio owner.
// No email address is exposed anywhere on the site; the access key below is
// public by design (tied to the owner's inbox at web3forms.com).
const WEB3FORMS_KEY = 'PASTE_YOUR_WEB3FORMS_KEY';
const formStatus = document.getElementById('formStatus');
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();
  const btn = form.querySelector('button[type="submit"]');
  const say = (msg, ok) => {
    formStatus.textContent = msg;
    formStatus.classList.toggle('ok', !!ok);
    formStatus.classList.toggle('err', !ok);
  };
  if (WEB3FORMS_KEY.indexOf('PASTE_') === 0) {
    say('The contact form is being wired up — please check back shortly.', false);
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
    const out = await res.json();
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
