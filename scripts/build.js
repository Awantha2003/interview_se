import { cp, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { reactExamples } from '../public/react-examples.js';

await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
const config = {
  url: process.env.SUPABASE_URL || '',
  key: process.env.SUPABASE_PUBLISHABLE_KEY || '',
};
await writeFile('dist/config.js', 'export default ' + JSON.stringify(config) + ';\n');

const reactPreview = 'dist/react-preview';
const entries = Object.keys(reactExamples);
await build({
  entryPoints: entries.map(id=>({in:'demo:'+id,out:id})),
  outdir: reactPreview,
  bundle: true,
  splitting: true,
  minify: true,
  jsx: 'automatic',
  format: 'esm',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{
    name:'react-lesson-source',
    setup(bundle) {
      bundle.onResolve({filter:/^demo:/},args=>({path:args.path.slice(5),namespace:'lesson'}));
      bundle.onLoad({filter:/.*/,namespace:'lesson'},args=>({
        contents:reactExamples[args.path].code,loader:'jsx',
        resolveDir:resolve('.'),pluginData:args.path,
      }));
      bundle.onResolve({filter:/^\.\/Receipt\.jsx$/,namespace:'lesson'},args=>({
        path:args.pluginData,namespace:'receipt',
      }));
      bundle.onLoad({filter:/.*/,namespace:'receipt'},args=>({
        contents:reactExamples[args.path].files['Receipt.jsx'],loader:'jsx',resolveDir:resolve('.'),
      }));
    },
  }],
});
for (const id of entries) {
  await writeFile(`${reactPreview}/${id}.html`,`<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>React example</title><style>
body{font:16px system-ui;margin:14px;color:#f6f5f0;background:#1b1d15}
button,input,select{font:inherit;padding:5px 8px;margin:3px;color:#151609;background:#f4efd4;border:1px solid #a8a479;border-radius:4px}
button{cursor:pointer;background:#ffda25}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #ffda25;outline-offset:2px}a{color:#ffda25}
</style><div id="root"></div><script type="module" src="./${id}.js"></script></html>\n`);
}
