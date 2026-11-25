const stages = [
  {
    title:'The customer adds one mango juice',
    si:'Customer එක mango juice එකක් cart එකට දානවා.',
    code:'const customerCart = { mangoJuices: 1 };',
    customer:1,cashier:null,shared:false,
  },
  {
    title:'The cashier opens that same cart',
    si:'Cashier අලුත් cart එකක් හදන්නේ නැතුව customer ගේ cart එකම open කරනවා.',
    code:'const cashierCart = customerCart;',
    customer:1,cashier:1,shared:true,
  },
  {
    title:'The cashier adds two more juices',
    si:'Cashier juices දෙකක් එක් කරනවා. දෙන්නාම බලන්නේ එකම cart එක නිසා දැන් දෙන්නාටම 3 පේනවා.',
    code:'cashierCart.mangoJuices += 2;',
    customer:3,cashier:3,shared:true,
  },
  {
    title:'Copy the number and only one screen changes',
    si:'මේ පාර copy කරන්නේ number එකක්. Cashier ගේ number එක 3 වුණත් customer ගේ number එක 1.',
    code:'const customerQty = 1;\nlet cashierQty = customerQty;\ncashierQty += 2;',
    customer:1,cashier:3,shared:false,primitive:true,
  },
];
export function cartDemo() {
  return `<section class="panel cart-demo" id="shared-cart"><div class="label">Interactive example</div>
    <h2>One juice cart. Two screens.</h2><p class="muted">Step through the order and watch what each screen sees.</p>
    <div class="cart-step" aria-live="polite"></div>
    <div class="actions cart-controls"><button class="button cart-back">Previous step</button><span class="cart-counter"></span><button class="button primary cart-next">Next step</button></div>
  </section>`;
}
export function connectCart(root, langText) {
  let index=0;
  const previous=root.querySelector('.cart-back');
  const next=root.querySelector('.cart-next');
  const render = () => {
    const stage=stages[index];
    const screen=(label,variable,qty)=>`<div class="cart-screen"><span>${label}</span><code>${variable}</code><strong>${qty ?? '—'}</strong></div>`;
    root.querySelector('.cart-step').innerHTML=`<div class="cart-caption">${langText(stage.title,stage.si)}</div>
      <div class="cart-screens">${screen('Customer screen',stage.primitive?'customerQty':'customerCart',stage.customer)}${screen('Cashier screen',stage.primitive?'cashierQty':'cashierCart',stage.cashier)}</div>
      ${stage.primitive ? '<div class="cart-separate"><span>Customer number</span><span>Cashier number</span></div>' : `<div class="cart-connection"><i></i>${stage.shared?'<i></i>':''}</div><div class="cart-object"><span>Object in memory</span><code>{ mangoJuices: ${stage.customer} }</code></div>`}
      <pre><code>${stage.code}</code></pre>`;
    root.querySelector('.cart-counter').textContent=`${index+1} / ${stages.length}`;
    previous.disabled=index===0;
    next.textContent=index===stages.length-1?'Start again':'Next step';
  };
  previous.onclick=()=>{index--;render();if (previous.disabled) next.focus();};
  next.onclick=()=>{index=(index+1)%stages.length;render();};
  render();
}
