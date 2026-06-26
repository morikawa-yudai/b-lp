const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const revealTargets = document.querySelectorAll('.reveal');
const statementCards = document.querySelectorAll('.statement-card');

// Keep the floating header legible once the page starts scrolling.
const updateHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

// Reset mobile navigation state after link clicks or desktop resize.
const closeMenu = () => {
  nav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Reveal sections only once for a restrained, brand-friendly motion style.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: '0px 0px -12% 0px', threshold: 0.16 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

// Rotate the three brand statements without requiring user interaction.
let activeStatement = 0;
setInterval(() => {
  if (statementCards.length === 0) return;
  statementCards[activeStatement].classList.remove('is-active');
  activeStatement = (activeStatement + 1) % statementCards.length;
  statementCards[activeStatement].classList.add('is-active');
}, 3600);

window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 920) closeMenu();
});
updateHeaderState();
