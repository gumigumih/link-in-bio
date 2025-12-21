export default {
  name: 'NoteArticles',
  data() {
    return {
      articles: {
        loading: true,
        error: false,
        latest: null
      }
    }
  },
  methods: {
    async fetchArticles() {
      try {
        this.articles.loading = true;
        this.articles.error = false;
        
        const response = await fetch('/articles.json');
        if (!response.ok) {
          throw new Error('記事データの取得に失敗しました');
        }
        const data = await response.json();
        const articles = data.data.contents.map(article => ({
          title: article.name,
          link: `https://note.com/gumigumih/n/${article.key}`,
          pubDate: article.publishAt,
          guid: article.key,
          eyecatch: article.eyecatch,
          hashtags: article.hashtags.map(tag => tag.hashtag.name),
        })).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        this.articles.latest = articles[0] || null;
        console.log('noteの記事を取得しました:', articles.length, '件');
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
          day: 'numeric'
        });
      } catch (error) {
        console.error('日付フォーマットエラー:', error);
        return dateString;
      }
    }
  },
  mounted() {
    this.fetchArticles();
  },
  template: `
    <div class="space-y-4 mb-4 font-['Zen_Maru_Gothic']">
      <div v-if="articles.loading" class="text-center text-gray-500">
        <i class="fa-solid fa-spinner fa-spin text-xl mb-2"></i>
        <p>noteの最新記事を読み込み中...</p>
      </div>
      <div v-else-if="articles.error" class="text-center text-gray-500">
        <i class="fa-solid fa-exclamation-triangle text-xl mb-2"></i>
        <p>記事データの読み込みに失敗しました</p>
        <a href="https://note.com/gumigumih" 
           class="text-pink-600 hover:text-pink-700 transition-colors duration-300 mt-2 inline-block">
          noteで直接見る
        </a>
      </div>
      <div v-else-if="!articles.latest" class="text-center text-gray-500">
        <p>記事が見つかりませんでした</p>
        <a href="https://note.com/gumigumih" 
           class="text-pink-600 hover:text-pink-700 transition-colors duration-300 mt-2 inline-block">
          noteで直接見る
        </a>
      </div>
      <div v-else class="relative">
        <div class="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4">
          <div class="flex-shrink-0">
            <img v-if="articles.latest.eyecatch" 
                 :src="articles.latest.eyecatch" 
                 :alt="articles.latest.title" 
                 class="w-full aspect-[1200/630] rounded-xl object-cover">
            <div v-else class="w-full aspect-[1200/630] rounded-xl bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center">
              <img src="/assets/images/note-icon.svg" alt="note" class="h-10 w-10">
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-gray-800 text-lg leading-snug">
              {{ articles.latest.title }}
            </h3>
            <div v-if="articles.latest.hashtags && articles.latest.hashtags.length > 0" class="flex flex-wrap gap-2">
              <span v-for="hashtag in articles.latest.hashtags" :key="hashtag"
                    class="text-xs text-gray-600 bg-gray-100/80 px-2 py-1 rounded-full">
                {{ hashtag }}
              </span>
            </div>
            <time class="text-xs text-gray-500">{{ formatDate(articles.latest.pubDate) }}</time>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <a :href="articles.latest.link" target="_blank"
               class="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-3 px-4 rounded-xl hover:opacity-95 hover:scale-[1.01] transition-all duration-300">
              <i class="fa-solid fa-book-open"></i>
              <span>記事を読む</span>
            </a>
            <a href="https://note.com/gumigumih" target="_blank"
               class="inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-3 px-4 rounded-xl border border-gray-200 hover:border-pink-300 hover:text-pink-600 transition-all duration-300">
              <span>もっと見る</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
};
