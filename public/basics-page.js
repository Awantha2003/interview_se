import { art } from './live-art.js';
import { basicGroups,basicQuestions,practiceLinks,starterQuestions } from './interview-basics.js';
import { mockQuestions,reviewQueue,scheduleReview } from './basics-review.js';

const groups=new Map(basicGroups.map(group=>[group.id,group]));
const questions=new Map(basicQuestions.map(question=>[question.id,question]));
const ids=[...questions.keys()];
const sourceSections={
  oop:2,'constructor-basic':2,'interface-abstract':2,'overload-override':2,'java-equality':18,solid:25,
  'npm-basics':14,'node-io':17,
  'big-o':4,'binary-search':4,sorting:4,semantics:5,'box-model':6,'flex-grid':7,cascade:6,
  promise:9,'event-loop':9,'dom-events':9,typescript:10,'react-updater':12,'react-effect':12,'react-memo':12,rendering:13,
  'backend-layers':15,middleware:17,pagination:15,idempotency:36,'spring-di':19,'sql-nosql':22,rls:35,
  testing:26,'test-boundary':26,debugging:26,'ci-cd':28,containers:28,configuration:28,agile:25,
  caching:29,'load-balancing':29,scaling:29,'system-design':29,star:34,'coding-process':32,
  'two-sum-basic':32,'palindrome-basic':32,'frequency-basic':32,
};

const ratings={
  again:'Missed it',
  unsure:'Almost',
  solid:'Got it',
};
const modeNames={
  starter:'The first 12',
  all:'All basic questions',
  due:'Due for review',
  weak:'Questions to strengthen',
  mock:'Mock interview',
  question:'One question',
};

let session;
const formatTime=seconds=>'0:'+String(seconds).padStart(2,'0');
const day=24*60*60*1000;
const questionPath=id=>'#basics/question/'+id;
const morePath=id=>practiceLinks[id]??'#lesson/'+(sourceSections[id]??groups.get(questions.get(id).group).section);
const reviewed=(deck,history)=>deck.filter(id=>history[id]).length;
const unpracticedFirst=(deck,history)=>[...deck].sort((a,b)=>Number(Boolean(history[a]))-Number(Boolean(history[b])));
const weak=(deck,history)=>deck.filter(id=>history[id]&&history[id].rating!=='solid');

function home(main,{escape,history}) {
  const due=reviewQueue(ids,history).length;
  const practiceCount=reviewed(ids,history);
  const starterCount=reviewed(starterQuestions,history);
  const toStrengthen=weak(ids,history).length;
  main.innerHTML=`<div class="shell page basics-page">
    <header class="basics-hero">
      <div>
        <p class="eyebrow">Software engineering interview</p>
        <h1>Interview Basics</h1>
        <p>Say your answer aloud. Then check the example and try the follow-up.</p>
        <p lang="si">මුලින් මතකෙන් උත්තර දෙන්න. ඊට පස්සේ උදාහරණය බලලා ආයෙම කියලා බලන්න.</p>
        <div class="actions"><a class="button primary" href="#basics/starter">${starterCount?'Practice the first 12':'Start with 12 essentials'}</a>
        <a class="button" href="#basics/mock">Try a 5-question mock</a></div>
      </div>
      <div class="basics-progress-panel">
        ${art('puzzle')}
        <p id="basics-progress-label"><strong>${practiceCount} / ${ids.length}</strong> practiced</p>
        <progress value="${practiceCount}" max="${ids.length}" aria-labelledby="basics-progress-label"></progress>
        <div class="basics-progress-links">
          <a href="#basics/due"><strong>${due}</strong> due for review</a>
          <a href="#basics/weak"><strong>${toStrengthen}</strong> to strengthen</a>
        </div>
        <p class="muted">Saved on this device.</p>
      </div>
    </header>
    <section class="basics-topics" aria-labelledby="basics-topic-heading">
      <div class="basics-section-heading"><div><h2 id="basics-topic-heading">Practice by topic</h2>
      <p class="muted">Each question has a short answer, an example, and a follow-up.</p></div><a class="button" href="#basics/all">Practice all ${ids.length}</a></div>
      <label class="basics-search"><span>Find a question</span><input class="search" type="search" placeholder="e.g. props, JOIN, Big O"></label>
      <p class="muted" data-search-status role="status"></p>
      <div class="basics-topic-list">
        ${basicGroups.map(group=>{
          const groupIds=group.questions.map(question=>question.id);
          return `<article class="basics-topic panel" data-topic="${group.id}">
            <div class="basics-topic-title">${art(group.icon)}<div><h3>${escape(group.title)}</h3><p class="muted">${reviewed(groupIds,history)} / ${groupIds.length} practiced</p></div></div>
            <a class="button" href="#basics/group/${group.id}">Practice <span class="basics-sr">${escape(group.title)}</span></a>
            <details><summary>Browse questions</summary><ul>${group.questions.map(question=>`<li data-question-id="${question.id}"><a href="${questionPath(question.id)}">${escape(question.question)}</a></li>`).join('')}</ul></details>
          </article>`;
        }).join('')}
      </div>
    </section>
  </div>`;
  const search=main.querySelector('input[type="search"]');
  const status=main.querySelector('[data-search-status]');
  const tiles=[...main.querySelectorAll('[data-topic]')];
  const opened=new Map();
  search.oninput=()=>{
    const term=search.value.trim().toLowerCase();
    let matchCount=0;
    for(const tile of tiles) {
      const group=groups.get(tile.dataset.topic);
      const rows=[...tile.querySelectorAll('[data-question-id]')];
      const details=tile.querySelector('details');
      const searching=Boolean(term);
      if(searching&&!opened.has(details)) opened.set(details,details.open);
      let any=false;
      for(const row of rows){
        const question=questions.get(row.dataset.questionId);
        const text=[question.question,question.cue,group.title,question.sinhala,question.followUp].join(' ').toLowerCase();
        const matches=term.split(/\s+/).every(word=>text.includes(word));
        row.hidden=!matches;
        if(matches){any=true;matchCount++;}
      }
      tile.hidden=!any;
      if(searching) details.open=any;
      else if(opened.has(details)) details.open=opened.get(details);
    }
    if(!term) opened.clear();
    status.textContent=term?matchCount+' matching '+(matchCount===1?'question':'questions'):'';
  };
}

function makeSession(mode,slug,history,key) {
  const group=mode==='group'?groups.get(slug):null;
  const deck=group?unpracticedFirst(group.questions.map(question=>question.id),history)
    :mode==='starter'?starterQuestions
    :mode==='due'?reviewQueue(ids,history)
    :mode==='weak'?weak(ids,history)
    :mode==='mock'?mockQuestions(basicGroups)
    :mode==='question'?[slug]
    :unpracticedFirst(ids,history);
  return {key,deck,mode,title:group?.title??modeNames[mode],index:0,revealed:false,cue:false,results:{},timerStart:null};
}

function resultPage(main,state,{escape,history}) {
  const answered=Object.keys(state.results);
  const missed=weak(answered,history);
  const skipped=state.deck.length-answered.length;
  const empty=state.deck.length===0;
  const message=state.mode==='due'?'There are no questions due right now. You can still practice the essentials.':'Rate more answers during practice and the ones you need to strengthen will appear here.';
  main.innerHTML=`<div class="shell page basics-page basics-session">
    <a class="back" href="#basics">‹ Interview Basics</a>
    <div class="intro"><h1>${empty?escape(state.title):'Practice complete'}</h1><p>${empty?message:escape(state.title)}</p></div>
    ${empty?'':`<section class="panel basics-results">
      <h2>Your self-check</h2>
      <dl><div><dt>Answered</dt><dd>${answered.length}</dd></div><div><dt>To strengthen</dt><dd>${missed.length}</dd></div><div><dt>Skipped</dt><dd>${skipped}</dd></div></dl>
      ${missed.length?`<h3>Say these once more</h3><ul>${missed.map(id=>`<li><a href="${questionPath(id)}">${escape(questions.get(id).question)}</a></li>`).join('')}</ul>`:''}
    </section>`}
    <div class="actions"><a class="button primary" href="#basics">Back to Interview Basics</a>
    ${empty?'<a class="button" href="#basics/starter">Practice the first 12</a>':`<button class="button" type="button" data-restart>${state.mode==='mock'?'New mock interview':'Practice this set again'}</button>`}</div>
  </div>`;
}

function roundPage(main,state,{escape,language,history}) {
  const question=questions.get(state.deck[state.index]);
  const group=groups.get(question.group);
  const isMock=state.mode==='mock';
  const body=`<div class="basics-answer-body">
      <div class="basics-answer-section"><h3>Say it in English</h3><p lang="en">${escape(question.answer)}</p></div>
      ${language==='en'?'':`<div class="basics-answer-section" lang="si"><h3>සිංහල උදාහරණය</h3><p>${escape(question.sinhala)}</p></div>`}
      <div class="basics-cue"><span class="label">Memory cue</span><p>${escape(question.cue)}</p></div>
      <details class="basics-followup"><summary>Try the follow-up</summary>
        <p>${escape(question.followUp)}</p><details><summary>Show follow-up answer</summary><p>${escape(question.followAnswer)}</p></details>
      </details>
      <a class="back" href="${morePath(question.id)}">${practiceLinks[question.id]?'Try a worked example':'Open the related lesson'} ›</a>
    </div>`;
  main.innerHTML=`<div class="shell page basics-page basics-session">
    <a class="back" href="#basics">‹ Interview Basics</a>
    <div class="intro basics-round-heading"><h1>${escape(state.title)}</h1><p id="basics-round-position">Question ${state.index+1} of ${state.deck.length}</p>
      <progress aria-labelledby="basics-round-position" max="${state.deck.length}" value="${state.index+1}"></progress>
    </div>
    <article class="panel basics-question">
      <div class="basics-question-top">${art(group.icon)}<div><p class="label">${escape(group.title)}</p><h2 tabindex="-1">${escape(question.question)}</h2></div></div>
      <p class="basics-prompt" lang="en">Say the definition, then give one example.</p>
      ${isMock&&!state.revealed?`<div class="basics-timer"><button class="button" type="button" data-start-timer ${state.timerStart?'hidden':''}>Start a 45-second timer</button>
        <span role="timer" aria-label="Mock question time remaining" data-timer ${state.timerStart?'':'hidden'}>${formatTime(45)}</span><span class="basics-sr" role="status" data-time-status></span></div>`:''}
      ${state.revealed?body:`<div class="actions basics-prompt-actions"><button class="button primary" type="button" data-reveal>Show answer</button>
        ${!isMock&&!state.cue?'<button class="button" type="button" data-cue>Show a memory cue</button>':''}
        <button class="button" type="button" data-skip>Skip question</button></div>
        ${state.cue?`<div class="basics-cue" tabindex="-1"><span class="label">Memory cue</span><p>${escape(question.cue)}</p></div>`:''}`}
    </article>
    ${state.revealed?`<section class="panel basics-rating"><h2 tabindex="-1">How did it go?</h2><p class="muted">Choose when to see this question again.</p>
    <div class="basics-ratings">${Object.entries(ratings).map(([rating,label])=>{
      const days=scheduleReview(history[question.id],rating,0).due/day;
      const when=days<1?'10 min':days===1?'1 day':days+' days';
      return `<button class="button" type="button" data-rate="${rating}"><strong>${label}</strong><small>${when}</small></button>`;
    }).join('')}</div></section>`:''}
  </div>`;
}

export function openBasics(main,requested,slug,{escape,language,signal,read,write,progressKey}) {
  const valid=requested==='group'?groups.has(slug)
    :requested==='question'?questions.has(slug)
    :Object.hasOwn(modeNames,requested);
  const mode=valid?requested:'home';
  const key='se-prep/basics/'+progressKey;
  const saved=read(key,{});
  const history=saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{};
  if(mode==='home') {
    session=undefined;
    home(main,{escape,history});
    return;
  }
  const sessionKey=[key,mode,slug].join('/');
  if(session?.key!==sessionKey) session=makeSession(mode,slug,history,sessionKey);
  let state=session;
  let timer;
  const stopTimer=()=>clearInterval(timer);
  signal.addEventListener('abort',stopTimer,{once:true});
  function draw(focus) {
    stopTimer();
    if(state.index>=state.deck.length) {
      resultPage(main,state,{escape,history});
      if(focus) {
        const heading=main.querySelector('h1');
        heading.tabIndex=-1;
        heading.focus();
      }
      main.querySelector('[data-restart]')?.addEventListener('click',()=>{
        session=state=makeSession(mode,slug,history,sessionKey);
        draw('question');
        window.scrollTo(0,0);
      });
      return;
    }
    roundPage(main,state,{escape,language,history});
    if(focus==='question'){
      main.querySelector('.basics-question h2').focus({preventScroll:true});
      window.scrollTo(0,0);
    }
    if(focus==='answer'){
      const answer=main.querySelector('.basics-answer-body h3');
      answer.tabIndex=-1;
      answer.focus();
    }
    if(focus==='cue') main.querySelector('.basics-cue').focus();
    main.querySelector('[data-cue]')?.addEventListener('click',()=>{state.cue=true;draw('cue');});
    main.querySelector('[data-reveal]')?.addEventListener('click',()=>{state.revealed=true;draw('answer');});
    main.querySelector('[data-skip]')?.addEventListener('click',next);
    main.querySelectorAll('[data-rate]').forEach(button=>button.onclick=()=>{
      const id=state.deck[state.index];
      const rating=button.dataset.rate;
      history[id]=scheduleReview(history[id],rating);
      state.results[id]=rating;
      write(key,history);
      next();
    });
    main.querySelector('[data-start-timer]')?.addEventListener('click',()=>{
      state.timerStart=Date.now();
      main.querySelector('[data-start-timer]').hidden=true;
      main.querySelector('[data-timer]').hidden=false;
      startTimer();
    });
    if(state.timerStart&&!state.revealed) startTimer();
  }
  function next() {
    state.index++;
    state.revealed=false;
    state.cue=false;
    state.timerStart=null;
    draw('question');
  }
  function startTimer() {
    const display=main.querySelector('[data-timer]');
    const update=()=>{
      const remaining=Math.max(0,45-Math.floor((Date.now()-state.timerStart)/1000));
      display.textContent=formatTime(remaining);
      if(remaining===0){
        main.querySelector('[data-time-status]').textContent='45 seconds elapsed. You can still finish your answer.';
        stopTimer();
      }
    };
    timer=setInterval(update,250);
    update();
  }
  draw();
}
