# 林原愛 | Link in Bio

🌸 林原愛のパーソナルリンク集サイト

## 🚀 特徴

- **Vue.js** でコンポーネント化された軽量サイト
- **noteの最新記事** を自動表示
- **レスポンシブデザイン** 対応
- **ガラス効果** を使った美しいUI
- **JSON cache** によるパフォーマンス最適化

## 📁 プロジェクト構造

```
link_in_bio/
├── assets/
│   ├── css/
│   │   ├── styles.css          # メインスタイル
│   │   └── components.css      # コンポーネント用スタイル
│   ├── js/
│   │   ├── app.js              # メインVueアプリ
│   │   ├── components/
│   │   │   └── NoteArticles.js # note記事表示コンポーネント
│   │   └── scripts/
│   │       └── fetch-note-rss.js # RSS取得スクリプト
│   ├── data/
│   │   └── note-articles.json  # noteの記事データ（キャッシュ）
│   └── images/                 # 画像ファイル
├── index.html                  # メインページ
├── update-note-articles.js     # RSS更新用Node.jsスクリプト
└── package.json
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:8000` にアクセス

## 📝 noteの記事更新

### 手動更新

```bash
npm run update-note
```

### 自動更新の設定

GitHub Actionsや cron job で定期実行する場合：

```bash
# 毎日午前9時に実行
0 9 * * * cd /path/to/link_in_bio && npm run update-note
```

## 🎨 カスタマイズ

### 1. プロフィール情報の変更

`index.html` の以下の部分を編集：

```html
<!-- プロフィール情報 -->
<h1>林原愛</h1>
<p>（本名：和田愛）</p>
```

### 2. リンクの追加・変更

各セクションのリンクを `index.html` で編集可能

### 3. スタイルのカスタマイズ

- `assets/css/styles.css` - 全体スタイル
- `assets/css/components.css` - コンポーネント固有スタイル

## 🔧 開発

### 新しいコンポーネントの追加

1. `assets/js/components/` に新しいコンポーネントファイルを作成
2. `assets/js/app.js` でコンポーネントをインポート・登録
3. `index.html` でコンポーネントを使用

### デバッグ

ブラウザの開発者ツールのコンソールで：

```javascript
// RSSデータを手動取得（テスト用）
fetchAndSaveNoteRSS()
```

## 🚀 デプロイ

### GitHub Pages

1. GitHubリポジトリにプッシュ
2. Settings > Pages で設定
3. 自動的にデプロイされます

### その他のホスティング

静的ファイルなので、任意のWebサーバーにアップロード可能

## 📄 ライセンス

MIT License

## 👩‍💻 作成者

**林原愛** (gumigumih)
- note: https://note.com/gumigumih
- GitHub: https://github.com/gumigumih
- X: https://twitter.com/gumigumih 