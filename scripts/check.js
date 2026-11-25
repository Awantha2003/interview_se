import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { labs } from '../public/labs.js';
import { lessons } from '../public/lessons.js';
import { checklist } from '../public/checklist.js';
import { examplesSi } from '../public/examples-si.js';
const require = createRequire(import.meta.url);
const vendorPath = new URL('../public/vendor/sql-wasm.js',import.meta.url);
const vendorModule = {exports:{}};
const vendor = readFileSync(vendorPath,'utf8');
vm.runInNewContext(vendor,{module:vendorModule,exports:vendorModule.exports,require,__dirname:new URL('.',vendorPath).pathname,WebAssembly,process,console,setTimeout,clearTimeout,Buffer});
const runner = readFileSync(new URL('../public/runner.js',import.meta.url),'utf8');
const wasmBinary = readFileSync(new URL('../public/vendor/sql-wasm.wasm',import.meta.url));
assert.equal(checklist.length,34);
assert.equal(examplesSi.length,lessons.length);
for (const [index,lesson] of lessons.entries()) {
  assert.equal(lesson.id,index+1);
  assert.ok([lesson.en,lesson.si,lesson.example,lesson.answer,lesson.recall,examplesSi[index]].every(Boolean));
}
for (const lab of labs) {
  assert.ok(lessons.some(item=>item.id===lab.lesson));
  if (lab.lang==='HTML') {assert.match(lab.code,/<(form|main)>/);continue;}
  const messages = [];
  const self = {postMessage:message=>messages.push(message)};
  vm.runInNewContext(runner,{self,setTimeout,initSqlJs:vendorModule.exports});
  await self.onmessage({data:{...lab,wasmBinary}});
  assert.equal(messages.filter(item=>item.line).map(item=>item.line).join('\n'),lab.out,lab.name);
  assert.equal(messages.at(-1).done,true);
}
console.log(`Verified ${lessons.length} complete module records, ${checklist.reduce((total,item)=>total+item.topics.length,0)} checklist entries and ${labs.length} lab fixtures.`);
