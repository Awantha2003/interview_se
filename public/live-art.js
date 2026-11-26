// Decorative scene objects. The visible actors and live status describe their roles.
export const art = (icon,extra='') => `<span class="scene-art art-${icon} ${extra}" aria-hidden="true"></span>`;

export const systems = {
  jwt: {
    label:'Token condition',
    options:[['valid','Valid token'],['expired','Expired token'],['invalid','Signature check fails']],
    action:'Replay sign-in and request',
    actors:[['person','User'],['laptop','Browser'],['server','API server']],
    item:['badge','JWT'],
    initial:'The browser asks the API to sign the user in.',
    states:value=>[
      {point:1,visible:false,caption:'The browser sends the sign-in request.',si:'Browser එක sign-in request එක යවනවා.',detail:'Sign-in'},
      {point:2,icon:'parcel',item:'Request',caption:'The API authenticates the user and signs a short-lived JWT.',si:'API එක user හඳුනාගෙන short-lived JWT එකක් sign කරනවා.',detail:'Sign token',parts:true},
      {point:1,caption:'The browser receives the signed token.',si:'Browser එකට signed token එක ලැබෙනවා.',detail:'Token delivered',parts:true},
      {point:2,caption:'The browser includes the token in its next API request.',si:'Browser එක ඊළඟ API request එකත් එක්ක token එක යවනවා.',detail:'Verify JWT',parts:true},
      {point:2,icon:'shield',item:'Decision',caption:value==='valid'?'Signature and expiry checks pass. The API checks permission for the requested resource.':value==='expired'?'Expiration check fails. The API requires a new sign-in or refresh.':'Signature verification fails. The API rejects the token.',
        si:value==='valid'?'Signature සහ expiry හරි. ඊළඟට resource එකට access තියෙනවද බලනවා.':'Token verification fail නිසා request එක ප්‍රතික්ෂේප කරනවා.',detail:value==='valid'?'Verified':'Rejected',tone:value==='valid'?'good':'bad'},
      {point:1,icon:value==='valid'?'shield':'badge',item:value==='valid'?'Response':'401',caption:value==='valid'?'Nila owns this order, so the API returns order 42 to the browser.':'No protected order data is returned.',
        si:value==='valid'?'Order එක Nila ගේ නිසා browser එකට order data ලැබෙනවා.':'Protected order data එක browser එකට යවන්නේ නැහැ.',detail:value==='valid'?'Order returned':'Access denied',tone:value==='valid'?'good':'bad'},
    ],
  },
  offboarding: {
    label:'Offboarding scenario',
    options:[['missed','Offboarding missed'],['complete','Offboarding completed']],
    action:'Replay employee departure',
    actors:[['person','Employee'],['badge','Identity directory'],['server','Company app']],
    item:['badge','Account'],
    initial:'An active employee has an approved identity and application account.',
    states:value=>{
      const completed=value==='complete';
      return [
        {point:0,caption:'Nila joins the team. An approved employee identity is created.',si:'Nila team එකට join වුණාම approved employee identity එකක් හදනවා.',detail:'Joined',account:'Active'},
        {point:2,caption:'The directory grants approved application access for the role.',si:'Identity directory එකෙන් role එකට අදාළ app access දෙනවා.',detail:'Access granted',account:'Active'},
        {point:1,icon:'parcel',item:'Departure',caption:'Nila leaves the company. The departure event reaches the identity team.',si:'Nila company එකෙන් යනවා. ඒ event එක identity team එකට ලැබෙනවා.',detail:'Employee leaves',account:'Active'},
        {point:2,icon:completed?'shield':'badge',caption:completed?'Offboarding disables the app account and revokes active sessions.':'The app is missed by offboarding. Its account stays active after Nila leaves.',
          si:completed?'Offboarding එකෙන් app account එක disable කර active sessions revoke කරනවා.':'මේ app එක offboarding එකට අහු වෙන්නේ නැහැ. Nila ගියාට account එක active.',detail:completed?'Access removed':'Orphaned account',account:completed?'Disabled':'Active after departure',tone:completed?'good':'bad'},
        {point:2,icon:'shield',item:'Review',caption:completed?'An access review confirms the account is disabled.':'An access review finds the mismatch and disables the remaining account.',
          si:completed?'Access review එකෙන් account එක disabled බව තහවුරු කරනවා.':'Access review එකෙන් orphaned account එක හොයාගෙන disable කරනවා.',detail:'Access verified',account:'Disabled',tone:'good'},
      ];
    },
  },
};

export function drawSystem(scene,frame,actors,item,showParts=false) {
  let stage=scene.querySelector('.story-stage');
  if(!stage){
    scene.innerHTML=`<div class="story-stage" aria-label="Illustrated sequence">
      <div class="story-topline"><span data-beat></span><span data-account></span></div>
      <div class="story-route">
        <div class="story-beam" aria-hidden="true"></div>
        <div class="story-actors">${actors.map(([icon,label],i)=>`<div class="story-actor" data-actor="${i}">${art(icon)}<strong>${label}</strong></div>`).join('')}</div>
        <div class="story-packet" data-packet>${art(item[0])}<span data-packet-label></span></div>
      </div>
      ${showParts?`<div class="token-components" data-parts hidden>
        <div><span>Header</span><code>alg: HS256</code></div><div><span>Payload</span><code>sub: nila · exp</code></div><div><span>Signature</span><code>signed by API</code></div>
      </div>`:''}
      <p class="story-sinhala" lang="si" data-caption-si></p>
    </div>`;
    stage=scene.firstElementChild;
  }
  stage.dataset.tone=frame.tone??'neutral';
  stage.querySelector('[data-beat]').textContent=frame.detail;
  const account=stage.querySelector('[data-account]');
  account.hidden=!frame.account;
  account.textContent=frame.account??'';
  const packet=stage.querySelector('[data-packet]');
  packet.style.setProperty('--point',frame.point);
  packet.classList.toggle('is-invisible',frame.visible===false);
  packet.querySelector('.scene-art').className='scene-art art-'+(frame.icon??item[0]);
  packet.querySelector('[data-packet-label]').textContent=frame.item??item[1];
  for(const actor of stage.querySelectorAll('[data-actor]')) actor.classList.toggle('is-active',+actor.dataset.actor===frame.point);
  if(showParts) stage.querySelector('[data-parts]').hidden=!frame.parts;
  stage.querySelector('[data-caption-si]').textContent=frame.si??'';
}
