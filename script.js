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

// Contact form -> opens the visitor's email app (no backend, nothing stored)
const CONTACT_EMAIL = 'hello@shipwright.studio';
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();
  const subject = encodeURIComponent(`Project inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
