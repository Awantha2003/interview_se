import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { labs } from '../public/labs.js';
import { comparisons } from '../public/comparisons.js';
import { exampleIds } from '../public/topic-examples.js';
import { reactExamples } from '../public/react-examples.js';
import { javaExamples } from '../public/java-examples.js';
import { codingSteps } from '../public/coding-steps.js';
import { lessons } from '../public/lessons.js';
import { checklist } from '../public/checklist.js';
import { visualLessons } from '../public/visual-lessons.js';
import { topicGuides } from '../public/topic-guides.js';
import { starterGuidesSi } from '../public/topic-guides-si.js';
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
assert.equal(topicGuides.length,checklist.length);
for (const [index,module] of checklist.entries()) {
  assert.equal(topicGuides[index].length,module.topics.length,module.title);
  assert.ok(topicGuides[index].every(Boolean), module.title);
  for (const [position,title] of module.topics.entries()) {
    const ids=exampleIds(module.id,position,title);
    if (module.id===11||module.id===12) assert.ok(ids.some(id=>reactExamples[id]),title);
    if (/ vs /i.test(title)) assert.ok(comparisons[title.toLowerCase()],title);
    for (const id of ids) assert.ok(reactExamples[id]||javaExamples[id]||labs.some(lab=>lab.id===id),title);
  }
  if (starterGuidesSi[index]) assert.equal(starterGuidesSi[index].length,module.topics.length,module.title);
}
for (const [index,lesson] of lessons.entries()) {
  assert.equal(lesson.id,index+1);
  assert.equal(visualLessons[lesson.id].steps.length,3);
  assert.ok(visualLessons[lesson.id].steps.every(step=>step.length===3&&step.every(Boolean)));
  assert.ok([lesson.en,lesson.si,lesson.example,lesson.answer,lesson.recall,examplesSi[index]].every(Boolean));
}
for (const lab of labs) {
  assert.ok(lessons.some(item=>item.id===lab.lesson));
  const steps=codingSteps[lab.id];
  const lines=lab.code.split('\n');
  assert.equal(steps.at(-1)[0],lines.length,lab.name);
  let previous=0;
  for (const [end,en,si] of steps) {
    assert.ok(end>previous && en && si,lab.name);
    assert.ok(lines.slice(previous,end).join('').trim(),lab.name);
    previous=end;
  }
  if (lab.lang==='HTML') {assert.match(lab.code,/<(form|main)>/);continue;}
  const messages = [];
  const self = {postMessage:message=>messages.push(message)};
  vm.runInNewContext(runner,{self,setTimeout,initSqlJs:vendorModule.exports});
  await self.onmessage({data:{...lab,wasmBinary}});
  assert.equal(messages.filter(item=>item.line).map(item=>item.line).join('\n'),lab.out,lab.name);
  assert.equal(messages.at(-1).done,true);
}
console.log(`Verified ${lessons.length} complete module records, ${checklist.reduce((total,item)=>total+item.topics.length,0)} checklist entries and ${labs.length} lab fixtures.`);
