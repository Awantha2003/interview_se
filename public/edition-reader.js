import { editions } from './editions/index.js';
import { mountEditionDemo } from './edition-demos.js';
import { liveLinks, mountLessonPlayer, mountWalkthrough, walkthroughSummary } from './live-visuals.js';
import { exampleClip, sourceClips } from './live-lessons.js';

export { editions };
const clean = title => title.toLowerCase().replace(/^\d+\.\s*/,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();

export function editionPageFor(section, title) {
  const pages=editions[section];
  if (!pages||!title) return null;
  const name=clean(title);
  const matches=entry=>[entry.title,...entry.headings].map(clean);
  const exact=pages.findIndex(entry=>matches(entry).includes(name));
  if (exact>=0) return exact+1;
  const partial=pages.findIndex(entry=>entry.kind==='Lesson'&&matches(entry).some(value=>value.length>5&&(value.includes(name)||name.includes(value))));
  return partial>=0?partial+1:null;
}

const photos = {
  1: ['keyboard.webp','A wired keyboard with a US layout','Keyboard input becomes data the program can process.','Dingo1234555','https://commons.wikimedia.org/wiki/File:Apple_Keyboard_(A1048).jpg'],
  27: ['ethernet.jpg','An Ethernet plug with eight exposed contacts','An Ethernet connector links devices to a physical network. TCP port 443 identifies a service endpoint.','David Monniaux','https://commons.wikimedia.org/wiki/File:Ethernet_RJ45_connector_p1160054.jpg','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/'],
  15: ['server-racks.webp','Rows of server racks inside a data centre','These servers can host backend processes that handle client requests.','NERSC','https://commons.wikimedia.org/wiki/File:Front_of_server_racks_at_NERSC.jpg'],
};

function scopedSvg(source,prefix) {
  return source.replace(/\bid="([^"]+)"/g,(_match,id)=>`id="${prefix}${id}"`)
    .replace(/(href="#|url\(#)([\w.-]+)/g,(_match,start,id)=>start+prefix+id);
}

function renderBlocks(blocks,escape,language,practice) {
  const answerMarkup=text=>practice?
    `<details class="source-answer"><summary>Reveal source answer</summary><p>${escape(text)}</p></details>`:
    `<p class="source-answer">${escape(text)}</p>`;
  const questionMarkup=text=>`<p class="source-question" data-question>${escape(text)}</p>`;
  const splitQuestion=text=>{
    const marker=text.search(/\n(?:Answer|A)\s*:/i);
    const end=text.indexOf('?');
    const cut=marker>=0?marker:end>=0?end+1:text.length;
    return [text.slice(0,cut).trim(),text.slice(cut).trim()];
  };
  let withinQuestion=0;
  return blocks.map(([type,value,label,width],index)=>{
    if (type==='diagram') return `<figure class="source-diagram" aria-label="${escape(label)}">${scopedSvg(value,'edition-'+index+'-')}</figure>`;
    if (type==='sinhala') return language==='en'?'':`<div class="source-sinhala"><img class="edition-sinhala" lang="si" style="--source-width:${Number(width)}px" src="data:image/webp;base64,${value}" alt="${escape(label)}"></div>`;
    if (type==='code') return `<pre class="edition-code"><code>${escape(value)}</code></pre>`;
    const question=/^(?:interview (?:questions?\b|q\s*&\s*a\b)|follow-up question\b)/i.test(value);
    const answer=/^(?:answer|a)\s*:/i.test(value);
    if (withinQuestion===1) {
      const [prompt,response]=splitQuestion(value);
      withinQuestion=response?0:2;
      return questionMarkup(prompt)+(response?answerMarkup(response):'');
    }
    if (withinQuestion===2) {
      withinQuestion=0;
      if (!question) return answerMarkup(value);
    }
    if (question) {
      if (/^(?:interview questions?(?: (?:and|&) answer)?|follow-up question)$/i.test(value.trim())) {
        withinQuestion=1;
        return `<h3>${escape(value)}</h3>`;
      }
      const [prompt,response]=splitQuestion(value);
      return questionMarkup(prompt)+(response?answerMarkup(response):'');
    }
    if (answer) return answerMarkup(value);
    if (type==='heading'&&value.length<180) return `<h3>${escape(value)}</h3>`;
    return `<p>${escape(value)}</p>`;
  }).join('');
}

export function openEdition(main,item,anchor,{escape,language,progress,record,signal}) {
  const id=item.id;
  const pages=editions[id];
  const pageMatch=/^(?:pdf|demo)-(\d+)(?:-(?:q|motion))?$/.exec(anchor??'');
  const previousTopic=/^topic-(\d+)$/.exec(anchor??'');
  const mapped=previousTopic?editionPageFor(id,item.topics[Number(previousTopic[1])]):null;
  const page=Math.min(Math.max(Number(pageMatch?.[1]??mapped??1),1),pages.length);
  const entry=pages[page-1];
  const openMotion=anchor?.endsWith('-motion');
  const demo=anchor==='demo'||anchor==='coding-examples'||/^demo-\d+$/.test(anchor??'');
  const source=`/editions/${id}/source.pdf#page=${page}`;
  const route=(number)=>`#lesson/${id}/pdf-${number}`;
  const key='lesson-'+id;
  const photo=photos[id];
  const matchingLive=liveLinks(entry.title,id,page);
  main.innerHTML=`<div class="shell page edition-page">
    <a class="back" href="#library">‹ Study library</a>
    <div class="intro edition-heading"><span class="label">Section ${String(id).padStart(2,'0')} · PDF teaching edition</span><h1>${escape(item.title)}</h1>
      <p>${pages.length} source pages · English and Sinhala</p></div>
    <div class="edition-toolbar">
      <label for="edition-page-select"><span>Jump to a page</span><select id="edition-page-select">
        ${pages.map((p,i)=>`<option value="${i+1}" ${i+1===page?'selected':''}>${i+1} · ${escape(p.title)}</option>`).join('')}
      </select></label>
      <div class="edition-toolbar-actions">
        <a class="button ${demo?'':'primary'}" href="${route(page)}">PDF lesson</a>
        <a class="button ${demo?'primary':''}" href="#lesson/${id}/demo-${page}">Section demo</a>
        <a class="button" href="${source}" target="_blank" rel="noopener">Open original PDF</a>
      </div>
    </div>
    ${demo?`<section class="panel edition-demo" id="edition-demo"></section>
      ${photo?`<figure class="edition-photo"><img src="/edition-images/${photo[0]}" alt="${escape(photo[1])}"><figcaption>${escape(photo[2])} <a href="${photo[4]}" target="_blank" rel="noopener">Photo: ${escape(photo[3])}</a> · ${photo[6]?`<a href="${photo[6]}" target="_blank" rel="noopener">${escape(photo[5])}</a>`: 'CC0'}</figcaption></figure>`:''}`
    :`<section class="edition-reader" aria-label="Source lesson page">
      <div class="edition-reader-title"><div><span class="label">PDF page ${page} of ${pages.length}</span><h2>${escape(entry.title)}</h2></div>
      <div class="edition-toolbar-actions">${entry.questions?'<button class="button" id="edition-question">Go to interview question</button>':''}
      <button class="button" id="edition-zoom" type="button" aria-pressed="false">Enlarge diagrams &amp; Sinhala</button></div></div>
      <section class="edition-live">
        ${matchingLive?`<div class="live-topic-links"><span class="label">Live practice</span><div class="actions">${matchingLive}</div></div>`:''}
        <details class="panel live-walkthrough" ${openMotion?'open':''}>${walkthroughSummary(id,"Play this page’s worked example")}<div id="edition-trace"><p role="status">Loading illustrated example…</p></div></details>
      </section>
      <div class="edition-sheet" id="edition-sheet" aria-busy="true"><p role="status">Loading lesson page…</p></div>
    </section>`}
    <div class="edition-navigation">
      <div>${!demo&&page>1?`<a class="button" href="${route(page-1)}">Previous page</a>`:''}
      ${!demo&&page<pages.length?`<a class="button primary" href="${route(page+1)}">Next page</a>`:''}</div>
      <button class="button" id="edition-progress" aria-pressed="${Boolean(progress[key])}">${progress[key]?'✓ Studied':'Mark section as studied'}</button>
    </div>
  </div>`;
  main.querySelector('#edition-page-select').onchange=event=>{location.hash=route(event.target.value);};
  main.querySelector('#edition-progress').onclick=event=>{
    record(key,!progress[key]);
    event.target.setAttribute('aria-pressed',String(progress[key]));
    event.target.textContent=progress[key]?'✓ Studied':'Mark section as studied';
  };
  if (demo) {
    const root=main.querySelector('#edition-demo');
    let player;
    mountEditionDemo(root,id,escape,(title,steps,autoplay)=>{
      player??=mountLessonPlayer(root.querySelector('[data-edition-player]'),{signal,language});
      player.set(exampleClip({title,section:id,steps:steps.map(message=>({message}))}),{autoplay});
    });
    return;
  }
  const sheet=main.querySelector('#edition-sheet');
  const zoom=main.querySelector('#edition-zoom');
  zoom.onclick=()=>{
    const enlarged=sheet.classList.toggle('edition-enlarged');
    zoom.setAttribute('aria-pressed',String(enlarged));
    zoom.textContent=enlarged?'Fit diagrams & Sinhala':'Enlarge diagrams & Sinhala';
  };
  const focusQuestion=()=>{
    const question=sheet.querySelector('[data-question]');
    if (!question) return;
    question.tabIndex=-1;
    question.focus({preventScroll:true});
    question.scrollIntoView({block:'center'});
  };
  const questionButton=main.querySelector('#edition-question');
  if (questionButton) questionButton.onclick=focusQuestion;
  fetch(`/editions/${id}/${page}.json`,{signal}).then(response=>{
    if (!response.ok) throw new Error('Lesson unavailable');
    return response.json();
  }).then(blocks=>{
    if (!sheet.isConnected) return;
    sheet.innerHTML=renderBlocks(blocks,escape,language,anchor?.endsWith('-q'));
    const trace=main.querySelector('#edition-trace');
    const details=trace.parentElement;
    const setup=()=>{
      if(!details.open) return;
      mountWalkthrough(trace,{clips:sourceClips(blocks,entry,id),signal,language,scopeDiagram:scopedSvg});
      details.removeEventListener('toggle',setup);
    };
    details.addEventListener('toggle',setup,{signal});
    setup();
    if(openMotion) details.scrollIntoView({block:'start'});
    zoom.hidden=!sheet.querySelector('.source-diagram,.source-sinhala');
    sheet.setAttribute('aria-busy','false');
    if (anchor?.endsWith('-q')) focusQuestion();
  }).catch(()=>{
    if (!sheet.isConnected) return;
    sheet.setAttribute('aria-busy','false');
    zoom.hidden=true;
    main.querySelector('#edition-trace').textContent='The illustrated example could not load. Open the original PDF to see the lesson.';
    sheet.innerHTML=`<p role="alert">The lesson page could not load. <a href="${source}" target="_blank" rel="noopener">Open this page in the original PDF.</a></p>`;
  });
}

export function editionQuestionIndex(escape) {
  return `<details class="panel edition-question-index" open><summary>Questions from the PDF editions</summary>
    <div class="edition-question-list">${Object.entries(editions).map(([id,pages])=>{
      const entries=pages.flatMap((entry,i)=>entry.questions?[{entry,page:i+1}]:[]);
      return `<details><summary>Section ${String(id).padStart(2,'0')} · ${escape(pages[0].title)}</summary><ul>
        ${entries.map(({entry,page})=>`<li><a href="#lesson/${id}/pdf-${page}-q">${escape(entry.title)} <small>· page ${page}</small></a></li>`).join('')}
      </ul></details>`;
    }).join('')}</div></details>`;
}
