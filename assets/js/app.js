import NoteArticles from './components/NoteArticles.js';

// Register Vue component and mount
const app = Vue.createApp({});
app.component('note-articles', NoteArticles);
app.mount('#app');

// Fade-in animation observer
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.animate-fade-in').forEach(el => observer.observe(el));
