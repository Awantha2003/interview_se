import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { heapSeed, heapInsertion, pipelineTrace } from '../public/live-models.js';
import { liveCatalog } from '../public/live-catalog.js';
import { editions } from '../public/editions/index.js';
import { sourceClips } from '../public/live-lessons.js';
import { labs } from '../public/labs.js';
import { conceptTables } from '../public/concept-tables.js';
import { comparisons } from '../public/comparisons.js';
import { exampleIds } from '../public/topic-examples.js';
import { reactExamples } from '../public/react-examples.js';
import { javaExamples } from '../public/java-examples.js';
import { codingSteps } from '../public/coding-steps.js';
import { lessons } from '../public/lessons.js';
import { checklist } from '../public/checklist.js';
import { visualLessons } from '../public/visual-lessons.js';
import { topicScenarios } from '../public/topic-scenarios.js';
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
assert.equal(topicScenarios.length,checklist.length);
const topicNames=new Set(checklist.flatMap(module=>module.topics.map(title=>title.toLowerCase())));
for (const [title,rows] of Object.entries(conceptTables)) {
  assert.ok(topicNames.has(title),title);
  assert.ok(rows.length>=2 && rows.every(row=>row.length===4&&row.every(Boolean)),title);
}
assert.equal(conceptTables['trees and binary search trees'].length,3);
for (const [index,module] of checklist.entries()) {
  assert.equal(topicGuides[index].length,module.topics.length,module.title);
  assert.ok(topicGuides[index].every(Boolean), module.title);
  assert.equal(topicScenarios[index].length,module.topics.length,module.title);
  assert.ok(topicScenarios[index].every(steps=>steps.length===3&&steps.every(Boolean)),module.title);
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
for (const [mode,values] of [['min',[2,4,-5,100]],['max',[50,40,90,-5]]]) {
  let nodes=heapSeed(mode);
  for (const value of values) {
    const trace=heapInsertion(nodes,value,mode);
    assert.equal(trace[0].nodes.at(-1).value,value);
    const previousCount=nodes.length;
    nodes=trace.at(-1).nodes;
    assert.equal(nodes.length,previousCount+1);
    assert.equal(new Set(nodes.map(node=>node.id)).size,nodes.length);
    assert.ok(nodes.every(({value},i)=>i===0||(mode==='min'
      ?nodes[Math.floor((i-1)/2)].value<=value:nodes[Math.floor((i-1)/2)].value>=value)));
  }
}
for (const [outcome,stage] of [['build',1],['test',2],['health',5]]) {
  const failed=pipelineTrace({outcome}).at(-1);
  assert.equal(failed.production,'v1');
  assert.equal(failed.states[stage],'failed');
}
const awaiting=pipelineTrace({mode:'manual'}).at(-1);
assert.equal(awaiting.gate,true);
assert.equal(awaiting.production,'v1');
assert.equal(pipelineTrace({mode:'manual',approve:true}).at(-1).production,'v2');
for (const example of liveCatalog.filter(example=>example.trace)) {
  const values=Object.fromEntries(Object.entries(example.inputs).map(([key,input])=>[key,input.defaultValue]));
  assert.ok(example.trace(values).every(frame=>frame.message),example.key);
}
let pages=0;
let diagrams=0;
for(const [section,entries] of Object.entries(editions)) {
  for(const [index,entry] of entries.entries()) {
    const label=section+'/'+(index+1);
    const blocks=JSON.parse(readFileSync(new URL('../public/editions/'+label+'.json',import.meta.url),'utf8'));
    const clips=sourceClips(blocks,entry,Number(section));
    assert.ok(clips.length&&clips.every(clip=>clip.frames.length>=2&&clip.frames.every(frame=>frame.message)),label);
    assert.equal(clips.filter(clip=>clip.diagram).length,entry.diagrams,label);
    diagrams+=entry.diagrams;
    pages++;
  }
}
console.log(`Verified playable scenes for ${pages} PDF pages and ${diagrams} source diagrams.`);
console.log(`Verified ${lessons.length} complete module records, ${checklist.reduce((total,item)=>total+item.topics.length,0)} checklist entries and ${labs.length} lab fixtures.`);
