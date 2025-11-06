export default {
  name: 'NoteArticles',
  data() {
    return {
      articles: {
        loading: true,
        error: false,
        items: [],
      },
      swiper: null,
      pollTimer: null,
    };
  },
  methods: {
    async fetchArticles() {
      try {
        this.articles.loading = true;
        this.articles.error = false;

        const response = await fetch('/articles.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('記事データの取得に失敗しました');
        }

        const data = await response.json();
        const items = data.data.contents.map((article) => ({
          title: article.name,
          link: `https://note.com/gumigumih/n/${article.key}`,
          pubDate: article.publishAt,
          guid: article.key,
          eyecatch: article.eyecatch,
          hashtags: article.hashtags.map((tag) => tag.hashtag.name),
        }));

        this.articles.items = items;

        this.$nextTick(() => {
          this.initSwiper();
        });
      } catch (error) {
        console.error('noteの記事取得エラー:', error);
        this.articles.error = true;
      } finally {
        this.articles.loading = false;
      }
    },

    formatDate(dateString) {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch (error) {
        console.error('日付フォーマットエラー:', error);
        return dateString;
      }
    },

    truncateTitle(title, maxLength = 50) {
      return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
    },

    initSwiper() {
      this.$nextTick(() => {
        if (typeof Swiper !== 'undefined' && this.articles.items.length > 0) {
          this.destroySwiper();

          this.swiper = new Swiper('.note-articles-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: this.articles.items.length > 3,
            autoplay:
              this.articles.items.length > 3
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                  }
                : false,
            navigation: {
              nextEl: '.note-swiper-button-next',
              prevEl: '.note-swiper-button-prev',
            },
            pagination: {
              el: '.note-swiper-pagination',
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            },
            breakpoints: {
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            },
          });
        }
      });
    },

    destroySwiper() {
      if (this.swiper) {
        this.swiper.destroy(true, true);
        this.swiper = null;
      }
    },

    startPolling() {
      if (!this.pollTimer) {
        this.pollTimer = setInterval(() => {
          this.fetchArticles();
        }, 1000 * 60 * 10);
      }
    },

    stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    },
  },

  mounted() {
    this.fetchArticles();
    this.startPolling();
  },

  beforeUnmount() {
    this.destroySwiper();
    this.stopPolling();
  },

  template: `
    <div class="space-y-4 mb-8">
      <div v-if="articles.loading" class="text-center text-gray-500">
        <i class="fa-solid fa-spinner fa-spin text-xl mb-2"></i>
        <p>noteの最新記事を読み込み中...</p>
      </div>

      <div v-else-if="articles.error" class="text-center text-gray-500">
        <i class="fa-solid fa-exclamation-triangle text-xl mb-2"></i>
        <p>記事データの読み込みに失敗しました</p>
        <a
          href="https://note.com/gumigumih"
          class="text-pink-600 hover:text-pink-700 transition-colors duration-300 mt-2 inline-block"
        >
          noteで直接見る
        </a>
      </div>

      <div v-else-if="articles.items.length === 0" class="text-center text-gray-500">
        <p>記事が見つかりませんでした</p>
        <a
          href="https://note.com/gumigumih"
          class="text-pink-600 hover:text-pink-700 transition-colors duration-300 mt-2 inline-block"
        >
          noteで直接見る
        </a>
      </div>

      <div v-else class="relative">
        <div class="swiper note-articles-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="article in articles.items"
              :key="article.link"
              class="swiper-slide"
            >
              <a
                :href="article.link"
                target="_blank"
                class="block glass-effect rounded-2xl p-4 md:p-5 hover:scale-105 hover:shadow-lg transition-all duration-300 h-full"
              >
                <div class="mb-3">
                  <img
                    v-if="article.eyecatch"
                    :src="article.eyecatch"
                    :alt="article.title"
                    class="w-full aspect-video rounded-lg object-cover"
                  >
                  <div
                    v-else
                    class="w-full aspect-video rounded-lg bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center"
                  >
                    <img src="/assets/images/note-icon.svg" alt="note" class="h-8 w-8">
                  </div>
                </div>

                <div>
                  <h3 class="font-medium text-gray-800 mb-2 hover:text-pink-600 transition-colors duration-300 leading-tight text-sm">
                    {{ truncateTitle(article.title, 40) }}
                  </h3>

                  <div v-if="article.hashtags && article.hashtags.length > 0" class="flex flex-wrap gap-1 mb-2">
                    <span
                      v-for="hashtag in article.hashtags.slice(0, 2)"
                      :key="hashtag"
                      class="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full"
                    >
                      {{ hashtag }}
                    </span>
                  </div>

                  <time class="text-xs text-gray-500">{{ formatDate(article.pubDate) }}</time>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6">
          <div class="note-swiper-button-prev cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white/90 shadow-md transition-all duration-300">
            <i class="fas fa-chevron-left text-pink-500"></i>
          </div>

          <div class="note-swiper-pagination flex justify-center flex-1 mx-4"></div>

          <div class="note-swiper-button-next cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white/90 shadow-md transition-all duration-300">
            <i class="fas fa-chevron-right text-pink-500"></i>
          </div>
        </div>
      </div>
    </div>
  `,
};
