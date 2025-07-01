import NoteArticles from './components/NoteArticles.js';

const { createApp } = Vue;

const app = createApp({
  components: {
    NoteArticles
  },
  
  data() {
    return {
      // 将来的に他のコンポーネント用のデータもここに追加
    }
  },
  
  methods: {
    initializeAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.animate-fade-in').forEach((el) => {
        observer.observe(el);
      });
    }
  },
  
  mounted() {
    // アニメーションを初期化
    this.initializeAnimations();
  }
});

app.mount('#app'); 