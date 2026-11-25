import { cp, mkdir, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
const config = {
  url: process.env.SUPABASE_URL || '',
  key: process.env.SUPABASE_PUBLISHABLE_KEY || '',
};
await writeFile('dist/config.js', 'export default ' + JSON.stringify(config) + ';\n');
