/**
 * Intersection Observer–based reveal animations.
 * Elements with `data-animate` get `.is-visible` when they enter the viewport.
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.animateDelay ?? '0';
          el.style.animationDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  elements.forEach((el) => observer.observe(el));
}

// Run on load and on view transitions
document.addEventListener('DOMContentLoaded', initScrollAnimations);
document.addEventListener('astro:page-load', initScrollAnimations);
