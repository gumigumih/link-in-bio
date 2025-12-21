import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const PUBLIC_ARTICLES_IMAGES_DIR = path.join(projectRoot, 'public', 'assets', 'images', 'articles');
const LEGACY_ASSETS_IMAGES_DIR = path.join(projectRoot, 'assets', 'images', 'articles'); // 旧配置場所の掃除用
const ARTICLES_JSON_PATH = path.join(projectRoot, 'public', 'articles.json');

async function downloadImage(imageUrl, filename) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await fs.mkdir(PUBLIC_ARTICLES_IMAGES_DIR, { recursive: true });

    const filePath = path.join(PUBLIC_ARTICLES_IMAGES_DIR, filename);
    await fs.writeFile(filePath, response.data);

    console.log(`Downloaded image: ${filename}`);
    return `/assets/images/articles/${filename}`;
  } catch (error) {
    console.error(`Failed to download image: ${imageUrl}`, error.message);
    return null;
  }
}

export async function fetchNoteArticles() {
  try {
    const response = await axios.get(
      'https://note.com/api/v2/creators/gumigumih/contents?kind=note&size=3'
    );

    const articles = [];
    for (const article of response.data.data.contents) {
      let localImagePath = null;
      if (article.eyecatch) {
        const filename = `note_${article.id}_${Date.now()}.jpg`;
        localImagePath = await downloadImage(article.eyecatch, filename);
      }

      articles.push({
        id: article.id,
        name: article.name,
        key: article.key,
        type: 'note',
        publishAt: article.publishAt,
        eyecatch: article.eyecatch,
        localImagePath,
        body: article.body,
        hashtags: article.hashtags,
      });
    }

    return articles;
  } catch (error) {
    console.error('Error fetching Note articles:', error);
    return [];
  }
}

async function cleanupOldImages(usedImagePaths) {
  const usedFilenames = new Set((usedImagePaths || []).filter(Boolean).map((p) => path.basename(p)));
  const targets = [PUBLIC_ARTICLES_IMAGES_DIR, LEGACY_ASSETS_IMAGES_DIR];

  for (const dir of targets) {
    try {
      const files = await fs.readdir(dir);
      await Promise.all(
        files.map(async (file) => {
          const fullPath = path.join(dir, file);
          const stat = await fs.stat(fullPath);
          if (!stat.isFile()) return;
          if (!usedFilenames.has(file)) {
            await fs.unlink(fullPath);
            console.log(`Removed stale image: ${path.join(path.relative(projectRoot, dir), file)}`);
          }
        })
      );
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Failed to clean up stale images in ${dir}:`, error.message);
      }
    }
  }
}

export async function updateArticles() {
  try {
    const noteArticles = await fetchNoteArticles();

    const allArticles = [...noteArticles]
      .sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt))
      .slice(0, 9);

    const jsonData = { data: { contents: allArticles } };

    await fs.mkdir(path.dirname(ARTICLES_JSON_PATH), { recursive: true });
    await fs.writeFile(ARTICLES_JSON_PATH, JSON.stringify(jsonData, null, 2));
    await cleanupOldImages(allArticles.map((article) => article.localImagePath));
    console.log('Articles updated successfully!');
  } catch (error) {
    console.error('Error updating articles:', error);
    process.exit(1);
  }
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  updateArticles();
}
