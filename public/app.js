import { checklist } from './checklist.js';
import { lessons } from './lessons.js';
import { labs } from './labs.js';
import { examplesSi } from './examples-si.js';
import config from './config.js';

const modules = lessons.map(lesson => ({
  ...lesson, ...checklist[lesson.id-1],
  ...(lesson.id === 35 ? {title:'Supabase and row-level security',priority:'EXTRA',topics:[]} : {}),
  ...(lesson.id === 36 ? {title:'Reliable APIs and retries',priority:'EXTRA',topics:[]} : {}),
}));
const $ = (selector, root = document) => root.querySelector(selector);
const main = $('#content');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key,value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};
let progressKey = 'se-prep/guest';
let progress = read(progressKey,{});
let language = read('se-prep/language','both');
let filter = 'All';
let query = '';
let flashIndex = 0;
let revealed = false;
let syncNote = '';
let client;
let account;
let activeLab;
let finishRun;
let remoteQueue = Promise.resolve();
let accountVersion = 0;
const labels = {both:'EN + සිං',en:'EN',si:'සිං'};
const group = id => id <= 4 ? 'Foundations' : id <= 14 ? 'Frontend' : id <= 23 || id >= 35 ? 'Backend & Data' : id <= 31 ? 'Engineering' : 'Interview';
const glyphs = ['{ }','OOP','DS','O(n)','HTML','CSS','GRID','JS','DOM','TS','JSX','ƒ()','N/A','NPM','API','HTTP','NODE','JAVA','JPA','<>','SQL','DB','AUTH','GIT','SDLC','QA','NET','CI','SYS','APP','PAY','>_','CV','STAR','RLS','API'];
const route = () => location.hash.slice(1).split('/');
const doneCount = () => modules.filter(item=>progress['lesson-'+item.id]).length;
const langText = (en,si) => `${language !== 'si' ? `<p lang="en">${escape(en)}</p>` : ''}${language !== 'en' ? `<p lang="si">${escape(si)}</p>` : ''}`;
const renderCards = () => {
  const term = query.trim().toLowerCase();
  const results = modules.filter(item => (filter === 'All' || group(item.id) === filter || filter === item.priority) &&
    [item.title,item.question,item.en,item.si,...item.topics].join(' ').toLowerCase().includes(term));
  $('#cards').innerHTML = results.length ? results.map(item => {
    const done = progress['lesson-'+item.id];
    return `<a class="card" href="#lesson/${item.id}"><div class="card-top"><span class="glyph">${glyphs[item.id-1]}</span><span class="tag ${done?'done':''}">${done?'✓ Studied':item.priority}</span></div><h3>${escape(item.title)}</h3><p>${escape(item.question)}</p><div class="card-bottom"><span>${item.topics.length ? item.topics.length+' checklist topics' : 'Supplementary lesson'}</span><span>Open lesson</span></div></a>`;
  }).join('') : '<p class="muted">No matching lessons. Try a different search or filter.</p>';
  $('#result-count').textContent = results.length + ' modules';
};
function library() {
  main.innerHTML = `<section class="hero"><div class="shell hero-inner"><div>
    <div class="eyebrow">Full-stack interview prep</div><h1>Study smarter.<br><span>Interview ready.</span></h1>
    <p>Learn software engineering in English and Sinhala. Explain the concepts out loud, run code, and remember what to say in your interview.</p>
    <div class="actions"><a class="button primary" href="#lesson/${(modules.find(item=>!progress['lesson-'+item.id]) ?? modules[0]).id}">${doneCount()?'Continue studying':'Start studying'}</a><a class="button" href="#lab">Open code lab</a></div>
    </div><div class="terminal" aria-label="JavaScript example"><header><span class="dots" aria-hidden="true">●●●</span> interview-prep.js</header>
    <pre><span class="comment">// Predict the output before you run it.</span>
<span class="keyword">const</span> scores = [60, 82, 91];
<span class="keyword">const</span> ready = scores.filter(s =&gt; s &gt;= 75);

console.log(ready);</pre><div class="result">› [82, 91]</div></div></div></section>
    <div class="shell stats">
      <div class="stat"><strong>${modules.length}</strong><span>Study modules</span></div>
      <div class="stat"><strong>EN + සිං</strong><span>Lesson languages</span></div>
      <div class="stat"><strong>${labs.length}</strong><span>Runnable examples</span></div>
      <div class="stat"><strong id="done-total">${doneCount()} / ${modules.length}</strong><span>Modules studied</span></div>
    </div>
    <section class="shell catalog" id="catalog"><div class="section-head"><div><h2>Study library</h2><p id="result-count" class="muted" aria-live="polite"></p></div>
    <input id="search" class="search" type="search" aria-label="Search topics" placeholder="Search topics, e.g. SQL joins" value="${escape(query)}"></div>
    <div class="filters" aria-label="Filter modules">${['All','Foundations','Frontend','Backend & Data','Engineering','Interview','CORE','CV FOCUS','EXTRA'].map(value=>`<button class="filter" data-filter="${value}" aria-pressed="${filter===value}">${value==='CORE'?'Core':value==='CV FOCUS'?'CV focus':value==='EXTRA'?'Extra':value}</button>`).join('')}</div><div id="cards" class="cards"></div></section>`;
  renderCards();
  $('#search').addEventListener('input',event=>{query=event.target.value;renderCards();});
  $('.filters').addEventListener('click',event=>{
    const button=event.target.closest('[data-filter]');
    if (!button) return;
    filter=button.dataset.filter;
    main.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    renderCards();
  });
}
function lesson(item) {
  const exercises = labs.filter(lab=>lab.lesson===item.id);
  const marked = progress['lesson-'+item.id];
  main.innerHTML = `<div class="shell page"><a class="back" href="#library">‹ Study library</a><div class="intro">
    <div class="eyebrow">${escape(group(item.id))} / ${item.priority}</div><h1>${escape(item.title)}</h1><p>${escape(item.question)}</p></div>
    <div class="columns"><div><article class="panel"><h2>Understand the concept</h2>${langText(item.en,item.si)}</article>
    <article class="panel"><h2>Worked example</h2>${langText(item.example,examplesSi[item.id-1])}${item.diagram ? `<div class="diagram" aria-label="Process flow">${item.diagram.map(escape).map(value=>`<span>${value}</span>`).join('<b aria-hidden="true">›</b>')}</div>` : ''}</article>
    ${item.topics.length ? `<section class="panel"><h2>Checklist topics</h2><p class="muted">Tick each item when you can explain it and give an example.</p><div class="checklist">${item.topics.map((topic,index)=>{const key='topic-'+item.id+'-'+index;return `<label><input type="checkbox" data-progress="${key}" ${progress[key]?'checked':''}><span>${escape(topic)}</span></label>`;}).join('')}</div></section>` : ''}</div>
    <aside><section class="panel callout"><span class="label">Say it in the interview</span><details class="answer"><summary>Reveal sample answer</summary><p>${escape(item.answer)}</p></details></section>
    <section class="panel"><span class="label">Memory cue</span><p>${escape(item.recall)}</p></section>
    ${exercises.length ? `<section class="panel"><h2>Practice in the code lab</h2><div class="lesson-links">${exercises.map(lab=>`<a href="#lab/${lab.id}">${escape(lab.name)}</a>`).join('')}</div></section>` : ''}
    <button id="mark-lesson" class="button ${marked?'':'primary'}" aria-pressed="${Boolean(marked)}">${marked?'✓ Studied':'Mark as studied'}</button>
    <div class="actions">${item.id>1?`<a class="button" href="#lesson/${item.id-1}">Previous lesson</a>`:''}${item.id<modules.length?`<a class="button" href="#lesson/${item.id+1}">Next lesson</a>`:''}</div></aside></div></div>`;
  $('#mark-lesson').addEventListener('click',event=>{
    const key='lesson-'+item.id;
    record(key,!progress[key]);
    event.target.textContent=progress[key]?'✓ Studied':'Mark as studied';
    event.target.classList.toggle('primary',!progress[key]);
    event.target.setAttribute('aria-pressed',String(progress[key]));
  });
  $('.checklist')?.addEventListener('change',event=>{
    if (event.target.dataset.progress) record(event.target.dataset.progress,event.target.checked);
  });
}
const get = async (url,mode) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Unable to load a lab asset.');
  return response[mode]();
};
function runLab() {
  finishRun?.();
  const lab = activeLab;
  const code = $('#editor').value;
  const output = $('#output');
  const preview = $('#preview');
  const status = $('#lab-status');
  if (lab.lang === 'HTML') {
    preview.srcdoc = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; form-action \'none\'">' + code;
    preview.hidden = false;
    output.hidden = true;
    status.textContent = 'Preview updated';
    return;
  }
  preview.hidden = true;
  output.hidden = false;
  output.textContent = '';
  status.textContent = 'Running…';
  $('#run').disabled = true;
  const id = crypto.randomUUID();
  const frame = document.createElement('iframe');
  frame.hidden = true;
  frame.setAttribute('sandbox','allow-scripts');
  frame.title = 'Isolated code runner';
  const loader = `addEventListener('message', e => {
    if (e.source !== parent || e.data.id !== ${JSON.stringify(id)}) return;
    const {source, lang, code, wasmBinary} = e.data;
    const url = URL.createObjectURL(new Blob([source], {type:'text/javascript'}));
    const worker = new Worker(url);
    const respond = data => parent.postMessage({id:e.data.id,...data}, '*');
    worker.onmessage = event => respond(event.data);
    worker.onerror = () => respond({line:'The runner could not start.',done:true});
    worker.postMessage({lang,code,wasmBinary});
  }, {once:true});`;
  frame.srcdoc = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' \'unsafe-eval\' \'wasm-unsafe-eval\'; worker-src blob:"><script>'+loader+'<\/script>';
  let lines = 0;
  const receive = event => {
    if (event.source !== frame.contentWindow || event.data?.id !== id) return;
    if (typeof event.data.line === 'string' && ++lines <= 200) output.textContent += event.data.line.slice(0,2000)+'\n';
    if (lines === 200) { stop('Output limit reached.'); return; }
    if (event.data.done) stop(output.textContent ? 'Run finished' : 'Run finished · no output');
  };
  const timer = setTimeout(()=>stop('Run stopped after 5 seconds.'),5000);
  function stop(message='') {
    clearTimeout(timer);
    removeEventListener('message',receive);
    frame.remove();
    status.textContent=message;
    if ($('#run')) $('#run').disabled=false;
    finishRun=undefined;
  }
  finishRun=stop;
  addEventListener('message',receive);
  frame.onload=async()=>{
    try {
      const [runner,vendor,wasmBinary] = await Promise.all([
        get('/runner.js','text'),
        lab.lang==='SQL'?get('/vendor/sql-wasm.js','text'):'',
        lab.lang==='SQL'?get('/vendor/sql-wasm.wasm','arrayBuffer'):undefined,
      ]);
      frame.contentWindow?.postMessage({id,lang:lab.lang,code,source:vendor+'\n'+runner,wasmBinary},'*');
    } catch (error) { if (frame.isConnected) stop(error.message); }
  };
  document.body.append(frame);
}
function labView(id) {
  const lab = labs.find(item=>item.id===id) ?? labs[0];
  activeLab = lab;
  main.innerHTML=`<div class="shell page"><a class="back" href="#lesson/${lab.lesson}">‹ Related lesson</a><div class="intro"><div class="eyebrow">Practice</div><h1>Code lab</h1><p>Edit an example, predict the result, then run it in your browser.</p></div>
    <label class="lab-picker"><span class="label">Choose an example</span><select id="lab-select">${labs.map(item=>`<option value="${item.id}" ${item.id===lab.id?'selected':''}>${escape(item.name)} · ${item.lang}</option>`).join('')}</select></label>
    <div class="panel">${langText(lab.goal,lab.si)}${lab.lang==='SQL'?'<p class="muted">Uses a fresh SQLite database with sample customers and orders on every run.</p>':''}</div>
    <div class="workbench"><section class="panel"><h2><label for="editor">${lab.lang} editor</label></h2><textarea id="editor" class="code" spellcheck="false" maxlength="30000">${escape(lab.code)}</textarea><div class="actions"><button class="button primary" id="run">Run code</button><button class="button" id="reset">Reset example</button></div></section>
    <section class="panel"><h2>Output</h2><p id="lab-status" class="muted" role="status">Ready to run</p><pre id="output" class="output" aria-live="polite"></pre><iframe class="preview" title="HTML preview" id="preview" sandbox="" hidden></iframe><details class="answer"><summary>Show expected output</summary><pre>${escape(lab.out)}</pre></details></section></div></div>`;
  $('#lab-select').onchange=event=>{location.hash='lab/'+event.target.value;};
  $('#run').onclick=runLab;
  $('#reset').onclick=()=>{
    finishRun?.();
    $('#editor').value=lab.code;
    $('#preview').hidden=true;
    $('#preview').removeAttribute('srcdoc');
    $('#output').hidden=false;
    $('#output').textContent='';
    $('#lab-status').textContent='Ready to run';
  };
}
function review() {
  const item = modules[flashIndex];
  main.innerHTML=`<div class="shell page flash"><div class="intro"><div class="eyebrow">Active recall</div><h1>Flashcards</h1><p>Say your answer aloud, then compare it with the example.</p></div>
    <section class="panel"><span class="label">${flashIndex+1} / ${modules.length} · ${escape(item.title)}</span><h2>${escape(item.question)}</h2>
    ${revealed?`<p>${escape(item.answer)}</p>${language==='en'?'':`<p lang="si">${escape(item.si)}</p>`}<p class="muted">${escape(item.recall)}</p>`:''}</section>
    <div class="actions"><button class="button" id="prev" ${flashIndex===0?'disabled':''}>Previous</button><button class="button primary" id="reveal" aria-expanded="${revealed}">${revealed?'Hide answer':'Reveal answer'}</button><button class="button" id="next" ${flashIndex===modules.length-1?'disabled':''}>Next</button></div>
    <div class="actions"><a class="back" href="#lesson/${item.id}">Review the full lesson</a></div></div>`;
  $('#reveal').onclick=()=>{revealed=!revealed;review();$('#reveal').focus();};
  const flip = (step,selector)=>{flashIndex+=step;revealed=false;review();($(selector).disabled?$('#reveal'):$(selector)).focus();};
  $('#prev').onclick=()=>flip(-1,'#prev');
  $('#next').onclick=()=>flip(1,'#next');
}
function record(key,value) {
  progress[key]=value;
  write(progressKey,progress);
  if (!account) return;
  const userId=account.id;
  const version=accountVersion;
  const pendingKey='se-prep/pending/'+userId;
  write(pendingKey,{...read(pendingKey,{}),[key]:value});
  remoteQueue=remoteQueue.then(async()=>{
    if (version!==accountVersion) return;
    const current=read(pendingKey,{});
    const rows=Object.entries(current).map(([item,done])=>({user_id:userId,item,done}));
    if (!rows.length) return;
    const {error}=await client.from('lesson_progress').upsert(rows);
    if (error) {syncNote='Cloud save failed. Changes are saved on this device.';return;}
    const pending=read(pendingKey,{});
    for (const row of rows) if (pending[row.item]===row.done) delete pending[row.item];
    write(pendingKey,pending);
    if (version===accountVersion) syncNote='';
  }).catch(()=>{syncNote='Cloud save failed. Changes are saved on this device.';});
}
function progressDialog() {
  $('#progress-content').innerHTML=`<h2>Study progress</h2><progress max="${modules.length}" value="${doneCount()}" aria-label="Modules studied"></progress><p>${doneCount()} of ${modules.length} modules studied.</p>
    ${client ? account ? '<p>Signed in for cloud sync.</p><button id="logout" class="button">Sign out</button>' : '<p>Get a sign-in link by email to sync progress across devices.</p><form id="login"><label class="label" for="email">Email address</label><input id="email" type="email" required autocomplete="email"><div class="actions"><button class="button primary">Send sign-in link</button></div></form>' : '<p>Progress is saved on this device.</p>'}
    <p id="sync-note" role="status">${escape(syncNote)}</p>`;
  $('#login')?.addEventListener('submit',async event=>{
    event.preventDefault();
    const button=event.target.querySelector('button');
    button.disabled=true;
    const {error}=await client.auth.signInWithOtp({email:$('#email').value,emailRedirectTo:location.origin});
    $('#sync-note').textContent=error?error.message:'Check your email for a sign-in link.';
    button.disabled=false;
  });
  $('#logout')?.addEventListener('click',async()=>{await remoteQueue;await client.auth.signOut();});
}
async function useAccount(user) {
  if (account?.id === user?.id) return;
  account=user;
  const version=++accountVersion;
  progressKey=user?'se-prep/user/'+user.id:'se-prep/guest';
  progress=read(progressKey,{});
  render();
  if (!user) {syncNote='';if ($('#progress-dialog').open) progressDialog();return;}
  const {data,error}=await client.from('lesson_progress').select('item,done');
  if (version!==accountVersion) return;
  if (error) syncNote='Cloud sync is unavailable. This device keeps your progress.';
  else {
    const pending=read('se-prep/pending/'+user.id,{});
    progress={...Object.fromEntries(data.map(row=>[row.item,row.done])),...pending};
    write(progressKey,progress);
    const next=Object.entries(pending)[0];
    if (next) record(...next);
  }
  render();
  if ($('#progress-dialog').open) progressDialog();
}
function render() {
  finishRun?.();
  const [page,id]=route();
  const item=modules.find(lesson=>String(lesson.id)===id);
  const current=page==='lesson'&&item?'library':page==='lab'||page==='review'?page:'library';
  document.querySelectorAll('nav [data-page]').forEach(link=>{
    if (link.dataset.page===current) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if (page==='lesson'&&item) lesson(item);
  else if (page==='lab') labView(id);
  else if (page==='review') review();
  else library();
}
$('#language').textContent=labels[language];
$('#language').onclick=()=>{
  const languages=Object.keys(labels);
  language=languages[(languages.indexOf(language)+1)%languages.length];
  write('se-prep/language',language);
  $('#language').textContent=labels[language];
  if (route()[0]==='lab') {
    const editor=$('#editor');
    const draft=editor.value;
    render();
    $('#editor').value=draft;
  } else render();
};
$('#sync').onclick=()=>{progressDialog();$('#progress-dialog').showModal();};
addEventListener('hashchange',()=>{
  if (location.hash==='#content') {main.focus();return;}
  render();
  window.scrollTo(0,0);
});
$('.skip').onclick=event=>{event.preventDefault();main.focus();};
render();
if (config.url && config.key) {
  const sdk=document.createElement('script');
  sdk.src='/vendor/supabase.js';
  sdk.onload=()=>{
    client=globalThis.supabase.createClient(config.url,config.key);
    client.auth.onAuthStateChange((_event,session)=>setTimeout(()=>useAccount(session?.user),0));
  };
  sdk.onerror=()=>{syncNote='Cloud sync could not load. Progress is saved on this device.';};
  document.head.append(sdk);
}
