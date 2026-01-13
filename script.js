// Theme Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggle.innerHTML = document.body.classList.contains('light') 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));

// Carousel for each project
document.querySelectorAll('.project-card').forEach(card => {
  const slides = card.querySelector('.slides');
  const images = card.querySelectorAll('.slides img');
  const dotsContainer = card.querySelector('.dots');
  let current = 0;

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goTo(index) {
    current = index;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  card.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % images.length;
    goTo(current);
  });

  card.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    goTo(current);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    current = (current + 1) % images.length;
    goTo(current);
  }, 5000);
});