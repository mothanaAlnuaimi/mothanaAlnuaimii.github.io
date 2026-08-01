const body = document.body;
const themeButtons = document.querySelectorAll('.theme-button, .btn');
const themes = ['theme-1', 'theme-2', 'theme-3', 'theme-4'];
let currentThemeIndex = 0;

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 180);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    themes.forEach((theme) => body.classList.remove(theme));
    body.classList.add(themes[currentThemeIndex]);
  });
});

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  setTimeout(() => { loader.classList.add('hidden'); }, 700);
});

const revealItems = document.querySelectorAll('.reveal, .reveal-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach((item) => revealObserver.observe(item));

// ===================== SIDE NAVIGATION =====================
const sideNavItems = document.querySelectorAll('.side-nav-item');
const sections = document.querySelectorAll('section[id]');

function setActiveNav(id) {
  sideNavItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === id) {
      item.classList.add('active');
    }
  });
}

// تحديد القسم النشط بناءً على موقع الـ scroll
function onScroll() {
  let currentSection = sections[0].getAttribute('id');
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.4) {
      currentSection = section.getAttribute('id');
    }
  });
  setActiveNav(currentSection);
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);

// smooth scroll عند الضغط
sideNavItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('data-section');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
