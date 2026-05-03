import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');

const updateSitemap = () => {
    try {
        if (!fs.existsSync(SITEMAP_PATH)) {
            console.warn('Sitemap file not found at:', SITEMAP_PATH);
            return;
        }

        let content = fs.readFileSync(SITEMAP_PATH, 'utf8');
        const today = new Date().toISOString().split('T')[0];

        // Regex to match <lastmod>YYYY-MM-DD</lastmod>
        const updatedContent = content.replace(
            /<lastmod>.*?<\/lastmod>/g,
            `<lastmod>${today}</lastmod>`
        );

        fs.writeFileSync(SITEMAP_PATH, updatedContent);
        console.log(`✅ Sitemap successfully updated with date: ${today}`);
    } catch (error) {
        console.error('❌ Error updating sitemap:', error);
        process.exit(1);
    }
};

updateSitemap();
