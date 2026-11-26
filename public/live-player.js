export function createPlayer(root,{draw,signal}) {
  root.innerHTML=`<div class="live-controls">
    <button class="button primary" data-control="play" type="button">Play</button>
    <button class="button" data-control="back" type="button">Previous</button>
    <button class="button" data-control="next" type="button">Next step</button>
    <button class="button" data-control="reset" type="button">Reset trace</button>
    <label>Speed <select data-speed><option value="1400">Slow</option><option value="900" selected>Normal</option><option value="420">Fast</option></select></label>
  </div><div class="live-scene"></div>
    <div class="live-progress"><progress aria-label="Trace progress"></progress><span data-counter></span></div>
    <p class="live-message" role="status"></p>`;
  const buttons=Object.fromEntries([...root.querySelectorAll('[data-control]')].map(button=>[button.dataset.control,button]));
  const scene=root.querySelector('.live-scene');
  const message=root.querySelector('.live-message');
  const counter=root.querySelector('[data-counter]');
  const progress=root.querySelector('progress');
  const speed=root.querySelector('[data-speed]');
  let index=0;
  let frames=[];
  let timer;
  let running=false;
  const last=()=>index>=frames.length-1;
  const show=()=>{
    buttons.play.textContent=running?'Pause':'Play';
    buttons.play.disabled=frames.length<2||last();
    buttons.back.disabled=index===0;
    buttons.next.disabled=last();
    buttons.reset.disabled=index===0&&!running;
    if(!frames.length) return;
    counter.textContent=`Step ${index+1} / ${frames.length}`;
    progress.max=frames.length;
    progress.value=index+1;
    message.textContent=frames[index].message;
    draw(scene,frames[index],index);
  };
  const pause=()=>{
    clearTimeout(timer);
    running=false;
    buttons.play.textContent='Play';
    buttons.reset.disabled=index===0;
  };
  const tick=()=>{
    clearTimeout(timer);
    timer=setTimeout(()=>{
      if(!root.isConnected||root.closest('details:not([open])')) {pause();return;}
      index++;
      if(last()) pause();
      show();
      if(running) tick();
    },Number(speed.value));
  };
  root.addEventListener('click',event=>{
    const control=event.target.closest('[data-control]')?.dataset.control;
    if(!control) return;
    if(control==='play') {
      if(running) pause();
      else {running=true;tick();}
      show();
      return;
    }
    pause();
    index=control==='reset'?0:index+(control==='back'?-1:1);
    show();
    const controlButton=buttons[control];
    if(controlButton.disabled) {
      if(!buttons.back.disabled) buttons.back.focus();
      else if(!buttons.next.disabled) buttons.next.focus();
    }
  },signal?{signal}:undefined);
  signal?.addEventListener('abort',pause,{once:true});
  return {
    set(nextFrames,{start=0,autoplay=false}={}) {
      pause();
      frames=nextFrames;
      index=Math.min(start,frames.length-1);
      running=autoplay&&!last();
      show();
      if(running) tick();
    },
    pause,
  };
}
