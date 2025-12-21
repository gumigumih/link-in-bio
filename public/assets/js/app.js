// Fade-in animation observer (vanilla)
window.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.animate-fade-in').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.animate-fade-in').forEach((el) => el.classList.add('visible'));
  }
});
