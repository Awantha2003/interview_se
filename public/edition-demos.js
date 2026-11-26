// Small interactive alternatives to the worked examples in the source editions.
const demos = {
  1: ['Cashier calculator','Choose a quantity and follow input → calculation → output.','Quantity එකක් තෝරලා total එක වෙනස් වෙන හැටි බලන්න.','Quantity',
    [[1,'1 juice'],[2,'2 juices'],[4,'4 juices']], n=>[n+' juice(s)','Quantity × Rs. 250','Rs. '+(n*250)]],
  2: ['Create student objects','Pick a name and see the constructor put it in the new instance.','Name එකක් තෝරලා constructor එකෙන් අලුත් object එකට ඒක set වෙන හැටි බලන්න.','Student name',
    [['Nila','Nila'],['Sam','Sam'],['Kamal','Kamal']], name=>['new Student("'+name+'")','this.name = name','student.name → '+name]],
  3: ['Follow a search tree','Choose the target to trace a search from root 20.','Target එක තෝරලා root 20 ඉඳන් යන පාර බලන්න.','Target key',
    [[10,'10'],[20,'20'],[30,'30'],[25,'25']], n=>{
      const path=['Root: 20'];
      let node={key:20,left:{key:10},right:{key:30}};
      while (node && node.key!==n) {
        const branch=n<node.key?'left':'right';
        path.push(n+' '+(branch==='left'?'<':'>')+' '+node.key+' → '+branch);
        node=node[branch];
      }
      return [...path,node?'Found '+n:'Missing child → not found'];
    }],
  4: ['Count a linear search','Pick a target in [3, 7, 11, 15]. Count the comparisons until the search stops.','Target එකක් තෝරලා search එක නවතිනකම් comparisons ගණන බලන්න.','Target',
    [[3,'3'],[11,'11'],[15,'15'],[9,'9 (missing)']], n=>{
      const path=[];
      for (const number of [3,7,11,15]) {
        path.push(number+' === '+n+' → '+(number===n));
        if (number===n) return [...path,'Found in '+path.length+' checks'];
      }
      return [...path,'Not found after '+path.length+' checks'];
    }],
  5: ['Follow an accessible form','Compare submitting an empty email with filling in the field first.','Email එක හිස්ව submit කරන එක සහ පුරවලා submit කරන එක compare කරන්න.','Email input',
    [['','Empty'],['nila@example.com','nila@example.com']], email=>['Label → Email field',email?'Enter '+email:'Leave field empty',email?'Validation passes → submit':'required → browser asks for email']],
  6: ['Measure a CSS box','A card is 200px wide with 16px padding and 2px borders on both sides. Change box-sizing.','box-sizing වෙනස් කර content width සහ මුළු width වෙනස් වෙන හැටි බලන්න.','Box sizing',
    [['content-box','content-box'],['border-box','border-box']], type=>{
      const paddingAndBorder=2*(16+2);
      return [type,'Content: '+(type==='border-box'?200-paddingAndBorder:200)+'px','Outer width: '+(type==='border-box'?200:200+paddingAndBorder)+'px'];
    }],
  7: ['Fit cards into a responsive grid','Change the container width. Each card needs 140px and each gap is 12px.','Container width එක වෙනස් කර columns ගණන බලන්න.','Container width',
    [[290,'290px'],[320,'320px'],[480,'480px'],[640,'640px']], width=>[width+'px available','Each additional card needs a 12px gap',Math.floor((width+12)/152)+' columns fit']],
  8: ['Watch a closure remember its count','Each click calls the same counter. The outer variable stays available.','හැම click එකකටම closure එක කලින් count එක මතක තියාගන්නවා.','Counter action',
    [[1,'Add one'],[3,'Add three']], (n,current)=>['Previous count: '+current,'Closure adds '+n,'New count: '+(current+n)]],
  9: ['Follow the event loop','Click an order lookup. Synchronous logging runs before its async result.','Order lookup එකක් තෝරන්න. Await එකට කලින් සහ පස්සේ output order එක බලන්න.','Order',
    [['A12','A12 exists'],['B99','B99 is missing']], id=>['Start lookup '+id,'Other JavaScript keeps running',id==='A12'?'Promise resolves → Ready':'Promise rejects → catch: Order not found']],
  10: ['Narrow an unknown value','Choose what arrives from an API and see which branch is safe.','API එකෙන් එන value එක තෝරලා type guard එක කොයි පැත්තට යනවද බලන්න.','Received value',
    [[' Mango ','" Mango "'],[25,'25'],[null,'null']], v=>[JSON.stringify(v),'typeof value === "string" → '+(typeof v==='string'),typeof v==='string'?'trim() → '+v.trim():'Skip trim(); handle non-string']],
  11: ['Change state while the prop stays stable','The parent gives the card a drink name. Add to the card’s quantity.','Parent එකෙන් නම දෙනවා. Card එකේ quantity state එක විතරක් update වෙනවා.','Cart action',
    [[1,'Add one'],[2,'Add two']], (n,current)=>['Prop: Mango juice','setQuantity('+current+' + '+n+')','Mango juice · quantity '+(current+n)]],
  12: ['Avoid a stale React response','Compare keeping the old request with cancelling it during effect cleanup.','Store එක මාරු කළාම පරණ request එක cancel කරන එකෙන් ලැබෙන වෙනස බලන්න.','Effect behavior',
    [[false,'Keep old request'],[true,'Cancel old request']], cancel=>['Store A starts → switch to B','B finishes first',cancel?'A aborted → B stays visible':'A finishes later → stale A replaces B']],
  13: ['Choose when a page is rendered','Choose a page and trace where its initial HTML is generated.','Page එක තෝරලා initial HTML එක හදන්නේ කවදාද බලන්න.','Page',
    [['Docs','Public docs'],['Account','Personal account'],['Dashboard','Interactive dashboard']], page=>({
      Docs:['Docs content','Generate HTML during build','Serve prebuilt page'],
      Account:['Signed-in request','Render using current request data','Serve personalized HTML'],
      Dashboard:['Open browser view','Client JavaScript loads dashboard data','Render updated UI'],
    })[page]],
  14: ['Apply a breakpoint utility','See what grid-cols-1 md:grid-cols-3 does at three widths.','Screen width එක වෙනස් කර Tailwind classes වල effect එක බලන්න.','Viewport width',
    [[375,'375px'],[768,'768px'],[1024,'1024px']], width=>[width+'px',width>=768?'md variant applies':'Base utility applies',width>=768?'3 columns':'1 column']],
  15: ['Reserve a seat through the backend','Select a seat state and follow the controller, service and repository.','Seat එක free ද booked ද තෝරලා backend flow එක බලන්න.','Seat',
    [[true,'Seat is free'],[false,'Seat is taken']], free=>['Controller reads seat A1','Service checks availability',free?'Repository saves → HTTP 201':'Reject duplicate → HTTP 409']],
  16: ['Match a request to a response','Change the request or outcome and follow the status the server sends.','Request එක අනුව server response status එක වෙනස් වෙන හැටි බලන්න.','Request',
    [['read','Read existing order'],['create','Create new order'],['missing','Read missing order']], event=>({
      read:['GET /orders/42','Order 42 exists','200 OK'],
      create:['POST /orders','New order saved','201 Created'],
      missing:['GET /orders/99','Order 99 missing','404 Not Found'],
    })[event]],
  17: ['Trace Express middleware','Send a valid or invalid quantity through parsing and validation.','Quantity එක valid ද බලලා හරි handler එකට යන හැටි බලන්න.','JSON quantity',
    [[2,'2 (valid)'],[0,'0 (invalid)'],[-1,'−1 (invalid)']], n=>['express.json() reads quantity '+n,'Validator checks quantity > 0',n>0?'Route saves order → 201':'Validation error → 400']],
  18: ['Test Java String equality','Compare two references to the same object or two separate objects with matching text.','Java වල == සහ equals() වල වෙනස String දෙකකින් බලන්න.','Second string',
    [[true,'Same object'],[false,'Separate object, same text']], same=>['first = new String("Mango")',same?'second = first':'second = new String("Mango")','== → '+same+' · equals() → true']],
  19: ['Follow a Spring Security decision','Choose a caller and trace authentication, authorization and the controller.','Caller එකක් තෝරලා Spring Security access දෙනවද බලන්න.','Caller',
    [['guest','Not signed in'],['other','Signed in, no access'],['owner','Signed in, owns booking']], user=>[
      'GET /bookings/42',user==='guest'?'Authentication missing':'Authenticated → check ownership',
      user==='guest'?'401 Unauthorized':user==='other'?'403 Forbidden':'Controller returns booking → 200',
    ]],
};

export function mountEditionDemo(root,section,escape) {
  const [title,en,si,label,choices,run]=demos[section];
  let count=0;
  root.innerHTML=`<h2>${escape(title)}</h2><p>${escape(en)}</p><p lang="si">${escape(si)}</p>
    <fieldset><legend>${escape(label)}</legend><div class="actions edition-demo-controls">
      ${choices.map(([,name],i)=>`<button type="button" class="button" data-choice="${i}" aria-pressed="${i===0}">${escape(name)}</button>`).join('')}
      ${section===8||section===11?'<button type="button" class="button" data-reset>Reset</button>':''}
    </div></fieldset><ol class="edition-flow" aria-live="polite"></ol>`;
  const list=root.querySelector('.edition-flow');
  const show=(index,advance=false)=>{
    const input=choices[index][0];
    const accumulating=section===8||section===11;
    const steps=accumulating&&!advance?[section===8?'Create a counter':'Prop: Mango juice','Current count: '+count]:run(input,count);
    if (advance && accumulating) count+=input;
    root.querySelectorAll('[data-choice]').forEach(button=>button.setAttribute('aria-pressed',String((advance||!accumulating)&&Number(button.dataset.choice)===index)));
    list.innerHTML=steps.map(step=>`<li>${escape(step)}</li>`).join('');
  };
  show(0);
  root.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-reset')) {
      count=0;
      show(0);
      return;
    }
    show(Number(button.dataset.choice),true);
  });
}
