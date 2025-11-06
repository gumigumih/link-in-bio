# 林原愛 | Link in Bio

?? 林原愛のパーソナルリンク集サイト

## ?? 特徴

- **Vue.js** でコンポーネント化された軽量サイト
- **noteの最新記事** を自動表示
- **レスポンシブデザイン** 対応
- **ガラス効果** を使った美しいUI
- **JSON cache** によるパフォーマンス最適化

## ?? プロジェクト構造

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

## ??? セットアップ

### 1. 依存関係のインストール

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

### 2. 開発サーバーの起動

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

ブラウザで `http://localhost:8000` にアクセス

## ?? noteの記事更新

### 手動更新

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

### 自動更新の設定

GitHub Actionsや cron job で定期実行する場合：

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

## ?? カスタマイズ

### 1. プロフィール情報の変更

`index.html` の以下の部分を編集：

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

### 2. リンクの追加・変更

各セクションのリンクを `index.html` で編集可能

### 3. スタイルのカスタマイズ

- `src/styles/components.css` - Swiperなどのコンポーネント向けスタイル
- `src/styles/components.css` - コンポーネント固有スタイル

## ?? 開発

### 新しいコンポーネントの追加

1. `src/scripts/components/` に新しいコンポーネントファイルを作成
2. `src/scripts/app.js` でコンポーネントをインポート・登録
3. `index.html` でコンポーネントを使用

### デバッグ

ブラウザの開発者ツールのコンソールで：

```
link_in_bio/
├── public/
│   ├── assets/
│   │   └── images/               # 公開用画像アセット
│   └── articles.json              # note記事キャッシュ
├── scripts/
│   └── update-articles.js        # 記事取得スクリプト
├── src/
│   ├── components/
│   │   └── ArticleList.astro     # note記事一覧コンポーネント
│   ├── pages/
│   │   └── index.astro           # メインページ
│   ├── scripts/
│   │   └── articleList.js        # Swiper初期化・描画ロジック
│   └── styles/
│       ├── components.css        # コンポーネント向けスタイル
│       └── tailwind.css          # Tailwindエントリ
├── astro.config.mjs
├── package.json
└── README.md
```

## ?? デプロイ

### GitHub Pages

1. GitHubリポジトリにプッシュ
2. Settings > Pages で設定
3. 自動的にデプロイされます

### その他のホスティング

静的ファイルなので、任意のWebサーバーにアップロード可能

## ?? ライセンス

MIT License

## ????? 作成者

**林原愛** (gumigumih)
- note: https://note.com/gumigumih
- GitHub: https://github.com/gumigumih
- X: https://twitter.com/gumigumih 


