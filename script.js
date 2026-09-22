const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

// Brilho suave acompanhando o mouse em telas com ponteiro fino.
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches && glow) {
  document.addEventListener('mousemove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

// Galeria / lightbox.
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

function openLightbox(item) {
  const image = item.querySelector('img');
  lightboxImage.src = item.dataset.full || image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  setTimeout(() => {
    lightboxImage.src = '';
  }, 250);
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

// Revelação do presente final.
const giftTrigger = document.getElementById('giftTrigger');
const giftReveal = document.getElementById('giftReveal');

function createSparkles(origin) {
  const rect = origin.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 20; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;

    const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.25;
    const distance = 55 + Math.random() * 110;
    spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

    document.body.appendChild(spark);
    spark.addEventListener('animationend', () => spark.remove());
  }
}

giftTrigger.addEventListener('click', () => {
  const isOpen = giftReveal.classList.contains('is-open');

  if (!isOpen) {
    giftReveal.classList.add('is-open');
    giftReveal.setAttribute('aria-hidden', 'false');
    giftTrigger.querySelector('span:first-child').textContent = 'Seu presente está aqui';
    giftTrigger.querySelector('.gift-arrow').textContent = '↓';
    createSparkles(giftTrigger);

    setTimeout(() => {
      giftReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
});
