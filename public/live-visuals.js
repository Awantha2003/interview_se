import { createPlayer } from './live-player.js';
import { heapInsertion, heapSeed, pipelineTrace } from './live-models.js';
import { examplesForTitle, liveByKey, liveCatalog } from './live-catalog.js';
import { art, drawSystem, systems } from './live-art.js';
import { exampleClip, lessonProfile } from './live-lessons.js';
import { editions } from './editions/index.js';
import { lessons } from './lessons.js';
import { lessonScene } from './lesson-scene.js';

const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sectionLink=(id,key,page)=>`#live/${key}${id?'/'+id:''}${page?'/pdf-'+page:''}`;
const svgNS='http://www.w3.org/2000/svg';

function edges(container,points,links) {
  const svg=document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 100 100');
  svg.setAttribute('preserveAspectRatio','none');
  svg.setAttribute('aria-hidden','true');
  for(const [a,b] of links) {
    const line=document.createElementNS(svgNS,'line');
    line.setAttribute('x1',points[a][0]);line.setAttribute('y1',points[a][1]);
    line.setAttribute('x2',points[b][0]);line.setAttribute('y2',points[b][1]);
    svg.append(line);
  }
  container.prepend(svg);
  return svg;
}
function treePositions(count) {
  return Array.from({length:count},(_,i)=>{
    const level=Math.floor(Math.log2(i+1));
    const columns=2**level;
    return [100*(i-columns+1.5)/columns,13+level*25];
  });
}
function drawTree(scene,frame) {
  let tree=scene.querySelector('.live-tree');
  if(!tree) {
    scene.innerHTML='<div class="tree-diorama"><div class="live-tree" role="group" aria-label="Tree values by level"></div></div><div class="live-array" aria-label="Array representation"></div>';
    tree=scene.querySelector('.live-tree');
  }
  const positions=treePositions(frame.nodes.length);
  tree.querySelector('svg')?.remove();
  edges(tree,positions,positions.slice(1).map((_,i)=>[Math.floor(i/2),i+1]));
  const liveIds=new Set(frame.nodes.map(node=>String(node.id)));
  for(const old of tree.querySelectorAll('.tree-node')) if(!liveIds.has(old.dataset.node)) old.remove();
  frame.nodes.forEach((node,i)=>{
    let element=tree.querySelector(`[data-node="${node.id}"]`);
    if(!element){
      element=document.createElement('span');
      element.className='tree-node';
      element.dataset.node=node.id;
      element.innerHTML=art('orb')+'<strong></strong>';
      tree.append(element);
    }
    element.style.left=positions[i][0]+'%';
    element.style.top=positions[i][1]+'%';
    element.querySelector('strong').textContent=node.value;
    element.setAttribute('aria-label','Index '+i+': '+node.value);
    element.classList.toggle('is-active',frame.active?.includes(i));
  });
  scene.querySelector('.live-array').innerHTML=arrayMarkup({...frame,items:frame.nodes.map(node=>node.value)});
}
function arrayMarkup(frame) {
  return frame.items.map((item,i)=>{
    const active=frame.active?.includes(i);
    const outside=frame.range&&(i<frame.range[0]||i>frame.range[1]);
    return `<div class="live-cell ${active?'is-active':''} ${outside?'is-outside':''}"><span>${esc(item)}</span><small>${i}</small></div>`;
  }).join('');
}
function drawTiles(scene,frame) {
  let row=scene.querySelector('.motion-tiles');
  if(!row) {
    scene.innerHTML='<div class="motion-tiles" aria-label="Values by index"></div><p class="live-output" hidden></p>';
    row=scene.firstElementChild;
  }
  const existing=new Map([...row.children].map(el=>[el.dataset.tile,el]));
  const oldBounds=new Map([...existing].map(([key,el])=>[key,el.getBoundingClientRect()]));
  const counts=new Map();
  const fragment=document.createDocumentFragment();
  frame.items.forEach((value,i)=>{
    const base=JSON.stringify(value);
    const occurrence=counts.get(base)??0;
    counts.set(base,occurrence+1);
    const key=base+'#'+occurrence;
    let tile=existing.get(key);
    if(!tile){
      tile=document.createElement('div');
      tile.className='motion-tile';
      tile.dataset.tile=key;
      tile.innerHTML=art('orb')+'<strong></strong><small></small>';
      tile.querySelector('strong').textContent=value;
    }
    tile.querySelector('small').textContent=i;
    tile.classList.toggle('is-active',Boolean(frame.active?.includes(i)));
    tile.classList.toggle('is-outside',Boolean(frame.range&&(i<frame.range[0]||i>frame.range[1])));
    fragment.append(tile);
  });
  row.replaceChildren(fragment);
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    for(const el of row.children){
      const before=oldBounds.get(el.dataset.tile);
      const after=el.getBoundingClientRect();
      const x=before?before.x-after.x:0;
      const y=before?before.y-after.y:16;
      if(x||y) el.animate([{transform:`translate(${x}px,${y}px)`,opacity:before?1:0},{transform:'translate(0,0)',opacity:1}],{duration:380,easing:'ease-out'});
    }
  }
  const output=scene.querySelector('.live-output');
  output.hidden=!frame.output;
  if(frame.output) output.innerHTML=`Output <code>${frame.output.length?esc(frame.output.join(' → ')):'Empty'}</code>`;
}

function drawFrame(scene,frame) {
  if(frame.nodes) return drawTree(scene,frame);
  if(frame.items) drawTiles(scene,frame);
}
const graphPositions={A:[50,14],B:[24,40],C:[76,40],D:[11,74],E:[42,74],F:[84,74]};
const graphLinks=[['A','B'],['A','C'],['B','D'],['B','E'],['C','F'],['E','F']];
function drawGraph(scene,frame) {
  scene.innerHTML='<div class="tree-diorama"><div class="live-tree graph-tree" aria-label="Graph of nodes A to F"></div></div><div class="graph-result"></div>';
  const graph=scene.querySelector('.graph-tree');
  edges(graph,graphPositions,graphLinks);
  for(const name of frame.nodes) {
    const [left,top]=graphPositions[name];
    const state=name===frame.activeNode?'is-active':frame.visit.includes(name)?'is-visited':'';
    graph.insertAdjacentHTML('beforeend',`<span class="tree-node ${state}" style="left:${left}%;top:${top}%">${art('orb')}<strong>${esc(name)}</strong></span>`);
  }
  scene.querySelector('.graph-result').textContent='Visit order: '+frame.visit.join(' → ');
}
function mountHeap(root,signal) {
  root.innerHTML=`<form class="live-inputs">
    <label>Heap type <select name="mode"><option value="min">Min-heap</option><option value="max">Max-heap</option></select></label>
    <label>Value to insert <input name="value" type="number" value="2" min="-99" max="999" step="1" required></label>
    <button class="button primary" type="submit">Insert and play</button>
    <button class="button" type="button" data-restore>Reset heap</button>
  </form><div data-player></div>`;
  const form=root.querySelector('form');
  const value=form.elements.value;
  const mode=form.elements.mode;
  const submit=form.querySelector('[type="submit"]');
  let nodes=heapSeed(mode.value);
  let currentTrace=[];
  const player=createPlayer(root.querySelector('[data-player]'),{signal,draw(scene,frame,index){
    drawTree(scene,frame);
    submit.disabled=index!==currentTrace.length-1||nodes.length>=15;
  }});
  function restore(){
    nodes=heapSeed(mode.value);
    currentTrace=[{nodes,active:[],message:`Start with a valid ${mode.value}-heap. Insert a number to see it rise.`}];
    player.set(currentTrace);
  }
  restore();
  root.querySelector('[data-restore]').onclick=restore;
  mode.onchange=()=>{
    value.value=mode.value==='min'?2:50;
    restore();
  };
  form.onsubmit=event=>{
    event.preventDefault();
    currentTrace=heapInsertion(nodes,value.valueAsNumber,mode.value);
    nodes=currentTrace.at(-1).nodes;
    player.set(currentTrace,{autoplay:true});
  };
}
const pipelineStages=['Commit','Build','Test','Release gate','Deploy','Health check'];
const pipelineIcons=['laptop','gear','shield','badge','server','shield'];
const stateLabels={waiting:'Waiting',running:'In progress',passed:'Passed',failed:'Failed',blocked:'Blocked'};
function mountPipeline(root,signal) {
  root.innerHTML=`<form class="live-inputs">
    <label>Release mode <select name="mode"><option value="automatic">Automatic deployment</option><option value="manual">Manual approval</option></select></label>
    <label>Scenario <select name="outcome"><option value="pass">All checks pass</option><option value="build">Build fails</option><option value="test">Tests fail</option><option value="health">Health check fails</option></select></label>
    <button class="button primary" type="submit">Push sample commit</button>
    <button class="button" type="button" data-approve hidden>Approve release</button>
  </form><div data-player></div>`;
  const form=root.querySelector('form');
  const approve=form.querySelector('[data-approve]');
  let production='v1';
  let run=1;
  let configuration;
  let currentTrace=[];
  let approved=false;
  const player=createPlayer(root.querySelector('[data-player]'),{signal,draw(scene,frame){
    if(frame.states[5]==='passed') production=frame.production;
    approve.hidden=!frame.gate||approved;
    if(!scene.querySelector('.pipeline-set')){
      scene.innerHTML=`<p class="pipeline-production">Production at this step <strong></strong></p>
        <div class="pipeline-set"><ol class="pipeline-grid">${pipelineStages.map((stage,i)=>`<li>${art(pipelineIcons[i])}<strong>${stage}</strong><span data-stage-status></span></li>`).join('')}</ol>
        <div class="pipeline-piece" aria-hidden="true">${art('parcel')}</div></div>`;
    }
    scene.querySelector('.pipeline-production strong').textContent=frame.production;
    scene.querySelectorAll('.pipeline-grid li').forEach((stage,i)=>{
      stage.dataset.state=frame.states[i];
      stage.querySelector('[data-stage-status]').textContent=stateLabels[frame.states[i]];
      if(frame.stage===i) stage.setAttribute('aria-current','step');
      else stage.removeAttribute('aria-current');
    });
    const parcel=scene.querySelector('.pipeline-piece');
    const stage=frame.stage??0;
    parcel.hidden=frame.stage===undefined;
    parcel.style.setProperty('--desktop-x',stage%3);
    parcel.style.setProperty('--desktop-y',Math.floor(stage/3));
    parcel.style.setProperty('--mobile-x',stage%2);
    parcel.style.setProperty('--mobile-y',Math.floor(stage/2));
  }});
  player.set([{message:'Production starts at v1. Push a sample commit to begin.',production,states:pipelineStages.map(()=> 'waiting')}]);
  form.onsubmit=event=>{
    event.preventDefault();
    approved=false;
    configuration={mode:form.elements.mode.value,outcome:form.elements.outcome.value,current:production,version:'v'+(++run)};
    currentTrace=pipelineTrace(configuration);
    player.set(currentTrace,{autoplay:true});
  };
  approve.onclick=()=>{
    approved=true;
    const start=currentTrace.length;
    currentTrace=pipelineTrace({...configuration,approve:true});
    player.set(currentTrace,{start,autoplay:true});
  };
}

function mountStory(root,key,signal) {
  const model=systems[key];
  root.innerHTML=`<form class="live-inputs">
    <label>${esc(model.label)} <select name="case">${model.options.map(([value,label])=>`<option value="${value}">${esc(label)}</option>`).join('')}</select></label>
    <button class="button primary" type="submit">${esc(model.action)}</button>
  </form><div data-player></div>`;
  const form=root.querySelector('form');
  const player=createPlayer(root.querySelector('[data-player]'),{signal,
    draw(scene,frame){drawSystem(scene,frame,model.actors,model.item,key==='jwt');},
  });
  const render=autoplay=>{
    const frames=model.states(form.elements.case.value).map((frame,index)=>({...frame,
      message:frame.caption,detail:frame.detail||model.initial,
      account:frame.account??'',position:index,
    }));
    player.set(frames,{autoplay});
  };
  render(false);
  form.onsubmit=event=>{event.preventDefault();render(true);};
}

export function mountSimulation(root,key,signal) {
  const example=liveByKey[key];
  root.innerHTML=`<h2>${esc(example.title)}</h2><p lang="si">${esc(example.si)}</p><div data-live-body></div>`;
  const body=root.querySelector('[data-live-body]');
  if(key==='heap') return mountHeap(body,signal);
  if(key==='pipeline') return mountPipeline(body,signal);
  if(Object.hasOwn(systems,key)) return mountStory(body,key,signal);
  const inputs=Object.entries(example.inputs);
  body.innerHTML=`<form class="live-inputs">${inputs.map(([name,input])=>`<label>${esc(input.label)}
    ${input.options?`<select name="${name}">${input.options.map(([value,label],i)=>`<option value="${i}" ${value===input.defaultValue?'selected':''}>${esc(label)}</option>`).join('')}</select>`
    :`<input name="${name}" type="number" required step="1" min="${input.min}" max="${input.max}" value="${input.defaultValue}">`}</label>`).join('')}
    <button class="button primary" type="submit">Run trace</button></form><div data-player></div>`;
  const form=body.querySelector('form');
  const workspace=body.querySelector('[data-player]');
  const isIllustrated=example.view!=='graph'&&example.view!=='array'&&example.view!=='heap';
  const player=isIllustrated?mountLessonPlayer(workspace,{signal}):createPlayer(workspace,{signal,draw(scene,frame){
    if(example.view==='graph') drawGraph(scene,frame);
    else drawFrame(scene,frame);
  }});
  function run(autoplay=false){
    const values=Object.fromEntries(inputs.map(([name,input])=>{
      const control=form.elements[name];
      return [name,input.options?input.options[Number(control.value)][0]:control.valueAsNumber];
    }));
    const frames=example.trace(values);
    if(isIllustrated){
      const steps=frames.map(frame=>({...frame,code:frame.code??frame.output?.join(' → ')}));
      player.set(exampleClip({title:example.title,section:example.section,steps}),{autoplay});
    } else player.set(frames,{autoplay});
  }
  run();
  form.onsubmit=event=>{event.preventDefault();run(true);};
}

export function walkthroughSummary(section,title) {
  return `<summary class="scene-summary">${art(lessonProfile(section).token)}<span class="scene-summary-text"><strong>${esc(title)}</strong><small>Watch with 3D illustrations</small></span></summary>`;
}

export function mountLessonPlayer(root,{signal,language}={}) {
  let clip;
  let draw;
  let reflow;
  const player=createPlayer(root,{signal,draw(scene,frame,index){
    if(clip.kind==='tiles') {
      drawTiles(scene,frame);
      return;
    }
    draw??=lessonScene(scene,clip);
    reflow=draw(frame,index);
  }});
  const observer=new ResizeObserver(()=>reflow?.());
  const scene=root.querySelector('.live-scene');
  observer.observe(scene);
  signal?.addEventListener('abort',()=>observer.disconnect(),{once:true});
  return {
    set(next,{autoplay=false}={}) {
      clip={...next,language};
      draw=undefined;
      reflow=undefined;
      scene.replaceChildren();
      player.set(clip.frames,{autoplay});
    },
  };
}

export function mountWalkthrough(root,{clips,signal,language,scopeDiagram}) {
  root.innerHTML=`${clips.length>1?`<label class="lesson-clip-picker"><span>Choose an illustrated example</span>
    <select aria-label="Choose an illustrated example">${clips.map((clip,index)=>`<option value="${index}">${esc(clip.title)}</option>`).join('')}</select>
    </label>`:''}<div data-player></div><div data-diagram></div>`;
  const select=root.querySelector('select');
  const player=mountLessonPlayer(root.querySelector('[data-player]'),{signal,language});
  const diagram=root.querySelector('[data-diagram]');
  const show=index=>{
    const clip=clips[index];
    player.set(clip);
    diagram.innerHTML=clip.diagram&&scopeDiagram?`<details class="lesson-source-diagram"><summary>See the original diagram</summary>
      <figure class="live-source-figure" aria-label="${esc(clip.diagram.description)}">${scopeDiagram(clip.diagram.svg,'trace-source-')}</figure></details>`:'';
  };
  show(0);
  if(select) select.onchange=()=>show(Number(select.value));
}

export function liveLinks(title,section,page) {
  return examplesForTitle(title,section).map(example=>
    `<a class="button" href="${sectionLink(section,example.key,page)}">${esc(example.title)}</a>`).join('');
}

function mountLessonFinder(root) {
  const section=root.querySelector('select');
  const page=root.querySelector('[data-lesson-pages]');
  const link=root.querySelector('a');
  const updateLink=()=>{link.href='#lesson/'+section.value+(page.value?'/pdf-'+page.value+'-motion':'/walkthrough-motion');};
  const updatePages=()=>{
    const entries=editions[section.value];
    page.innerHTML=entries?.map((entry,index)=>`<option value="${index+1}">${index+1} · ${esc(entry.title)}</option>`).join('')??'';
    page.parentElement.hidden=!entries;
    if(entries){
      const firstLesson=entries.findIndex(entry=>entry.kind==='Lesson');
      page.selectedIndex=Math.max(0,firstLesson);
    }
    updateLink();
  };
  section.onchange=updatePages;
  page.onchange=updateLink;
  updatePages();
}

export function openLive(main,key,from,sourcePage,signal) {
  const example=Object.hasOwn(liveByKey,key)?liveByKey[key]:null;
  if(!example) {
    main.innerHTML=`<div class="shell page"><div class="intro"><div class="eyebrow">Practice</div><h1>Live visualizations</h1>
      <p>Choose a lesson or change the inputs in an interactive simulation.</p></div>
      <section class="panel live-finder"><h2>Find an illustrated lesson</h2><div class="live-inputs">
        <label><span>Section</span><select aria-label="Section">${lessons.map(item=>`<option value="${item.id}">${item.id} · ${esc(item.title)}</option>`).join('')}</select></label>
        <label><span>Lesson page</span><select aria-label="Lesson page" data-lesson-pages></select></label>
        <a class="button primary" href="#lesson/1/pdf-1-motion">Open animation</a>
      </div></section>
      <h2 class="live-gallery-title">Interactive simulations</h2><div class="cards">
      ${liveCatalog.map(item=>`<a class="card live-card" href="${sectionLink(null,item.key)}"><div class="live-card-art">${art(item.key==='jwt'||item.key==='offboarding'?'badge':item.key==='pipeline'?'parcel':item.view==='heap'||item.view==='array'?'orb':lessonProfile(item.section).token)}</div><h3>${esc(item.title)}</h3><p lang="si">${esc(item.si)}</p><span class="topic-open">Open visualization</span></a>`).join('')}
    </div></div>`;
    mountLessonFinder(main.querySelector('.live-finder'));
    return;
  }
  const section=String(from??'').match(/^\d{1,2}$/)?Number(from):example.section;
  const origin=/^pdf-\d+$/.test(sourcePage??'')?'/'+sourcePage:'';
  main.innerHTML=`<div class="shell page"><div class="live-page-links"><a class="back" href="#live">‹ Live visualizations</a><a class="back" href="#lesson/${section}${origin}">${origin?'Back to source lesson':'Related section'}</a></div>
    <div class="intro"><div class="eyebrow">Live visualization</div><h1>${esc(example.title)}</h1></div><section class="panel live-workspace" data-simulation></section></div>`;
  mountSimulation(main.querySelector('[data-simulation]'),key,signal);
}
