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

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

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
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 700);
});

const revealItems = document.querySelectorAll('.reveal, .reveal-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach((item) => observer.observe(item));
