import { art } from './live-art.js';

const captions = {
  flow: 'Object එක ඊළඟ පියවරට යන පාර බලන්න.',
  diagram: 'ආලෝකමත් වෙන කොටස බලලා diagram එක කියවන්න.',
  comparison: 'එක් එක් පැත්ත highlight කරලා වෙනස බලන්න.',
  overview: 'එක් එක් අදහස වෙන වෙනම බලලා compare කරන්න.',
  code: 'මේ පියවරේ code එක සහ output එක බලන්න.',
  walkthrough: 'ඉහළින් highlight වෙන පියවරේ example එක පහළින් බලන්න.',
  review: 'Example එකක් එක්ක මේ අදහස හඬින් පැහැදිලි කරන්න.',
};

export function lessonScene(scene,clip) {
  const stations=clip.stations??clip.profile.stations;
  const tokenIcon=['flow','walkthrough','code'].includes(clip.kind)?clip.profile.token:'search';
  scene.innerHTML=`<div class="story-stage lesson-scene" data-layout="${stations.length>3?'grid':'row'}" data-kind="${clip.kind}">
    <div class="story-topline"><span data-scene-label></span><span class="lesson-scene-counter" data-scene-count></span></div>
    <div class="lesson-scene-floor">
      <ol class="lesson-scene-stations"></ol>
      <span class="lesson-scene-token" aria-hidden="true">${art(tokenIcon)}</span>
    </div>
    <p class="lesson-scene-caption story-sinhala" lang="si"></p>
    <dl class="lesson-scene-state" hidden></dl>
    <pre class="lesson-scene-code" hidden><code></code></pre>
  </div>`;
  const stage=scene.firstElementChild;
  const floor=stage.querySelector('.lesson-scene-floor');
  const list=stage.querySelector('.lesson-scene-stations');
  list.style.setProperty('--lesson-columns',stations.length);
  const label=stage.querySelector('[data-scene-label]');
  const count=stage.querySelector('[data-scene-count]');
  const caption=stage.querySelector('.lesson-scene-caption');
  const state=stage.querySelector('.lesson-scene-state');
  const sample=stage.querySelector('.lesson-scene-code');
  const sampleCode=sample.firstElementChild;
  const token=stage.querySelector('.lesson-scene-token');
  const actors=stations.map(([icon,name])=>{
    const actor=document.createElement('li');
    actor.innerHTML=art(icon)+'<strong></strong>';
    actor.querySelector('strong').textContent=name;
    list.append(actor);
    return actor;
  });
  let active;
  const moveToken=()=>{
    if(!active||!floor.clientWidth) return;
    const floorBounds=floor.getBoundingClientRect();
    const actorBounds=active.getBoundingClientRect();
    token.style.setProperty('--move-x',actorBounds.left-floorBounds.left+actorBounds.width/2+'px');
    token.style.setProperty('--move-y',actorBounds.bottom-floorBounds.top-13+'px');
    token.classList.add('is-positioned');
  };
  return (frame,index)=>{
    if(active) active.removeAttribute('aria-current');
    active=actors[frame.point??index]??actors[0];
    active.setAttribute('aria-current','step');
    label.textContent=frame.label||active.textContent;
    count.textContent=(index+1)+' / '+clip.frames.length;
    caption.textContent=frame.si||captions[clip.kind];
    caption.hidden=clip.language==='en';
    state.hidden=!frame.state;
    state.replaceChildren(...(frame.state??[]).map(([key,value])=>{
      const box=document.createElement('div');
      const name=document.createElement('dt');
      const data=document.createElement('dd');
      name.textContent=key;
      data.textContent=value;
      box.append(name,data);
      return box;
    }));
    sample.hidden=!frame.code;
    sampleCode.textContent=frame.code??'';
    moveToken();
    return moveToken;
  };
}
