import NoteArticles from './components/NoteArticles.js';

const { createApp } = Vue;

const app = createApp({
  components: {
    NoteArticles,
  },

  data() {
    return {
      animationObserver: null,
    };
  },

  methods: {
    initializeAnimations() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for unsupported browsers: show elements immediately.
        document.querySelectorAll('.animate-fade-in').forEach((el) => {
          el.classList.add('visible');
        });
        return;
      }

      if (this.animationObserver) {
        this.animationObserver.disconnect();
      }

      this.animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              entry.target.dataset.animationObserved = 'done';
              this.animationObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      this.observeAnimationTargets();
    },

    observeAnimationTargets() {
      if (!this.animationObserver) {
        return;
      }

      document.querySelectorAll('.animate-fade-in').forEach((el) => {
        if (el.dataset.animationObserved) {
          return;
        }

        el.dataset.animationObserved = 'pending';
        this.animationObserver.observe(el);
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initializeAnimations();
    });
  },

  updated() {
    this.$nextTick(() => {
      this.observeAnimationTargets();
    });
  },

  beforeUnmount() {
    if (this.animationObserver) {
      this.animationObserver.disconnect();
      this.animationObserver = null;
    }
  },
});

app.mount('#app');
