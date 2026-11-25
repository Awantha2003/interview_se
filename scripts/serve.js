import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
}
const root = resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.wasm':'application/wasm'};
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) throw new Error();
    const headers={'Content-Type':types[extname(file)] || 'application/octet-stream'};
    if (path.startsWith('/react-preview/')) headers['Access-Control-Allow-Origin']='*';
    response.writeHead(200, headers);
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end('File not found');
  }
}).listen(Number(option('--port','4173')), option('--host','127.0.0.1'));
