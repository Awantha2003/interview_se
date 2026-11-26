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
  21: ['Find which customers have paid twice','Filter order rows before grouping, then change the minimum count to see which groups remain.','Paid orders filter කරලා customer අනුව group කරන්න. Minimum count එක වෙනස් කරලා ඉතිරි customers බලන්න.','Minimum paid orders',
    [[1,'At least 1'],[2,'At least 2'],[3,'At least 3']], minimum=>{
      const orders=[['Nila','paid'],['Nila','paid'],['Sam','paid'],['Sam','pending']];
      const counts=new Map();
      for (const [name,status] of orders) {
        if (status==='paid') counts.set(name,(counts.get(name)??0)+1);
      }
      const matches=[...counts].filter(([,count])=>count>=minimum).map(([name,count])=>name+' ('+count+')');
      return ['Orders: Nila paid, paid; Sam paid, pending','WHERE status = paid → GROUP BY customer','HAVING COUNT(*) ≥ '+minimum,matches.join(', ')||'No matching customers'];
    }],
  22: ['Read an address from a document model','Compare reading an address saved with an order and looking up the customer’s current address.','Order එකේම save කරපු address එක සහ customer profile එකෙන් ගන්න අලුත් address එක compare කරන්න.','Order model',
    [[true,'Embed shipping address'],[false,'Reference customer profile']], embedded=>[
      'Order 42 shipped to Colombo','Customer profile later changes to Kandy',
      embedded?'Read order.shippingAddress → Colombo':'Resolve order.customerId → current address: Kandy',
    ]],
  23: ['Check whether an order can be opened','Follow the server checks for a visitor, a signed-in customer and the order owner.','Order එක බලන්න කලින් server එක user කවුද සහ order එක අයිති කාටද බලන හැටි අත්හදා බලන්න.','Request identity',
    [['guest','Signed out'],['sam','Sam · different customer'],['nila','Nila · order owner']], user=>[
      'Request: read order 42',user==='guest'?'No signed-in session':'Session belongs to '+(user==='sam'?'Sam':'Nila'),
      user==='guest'?'401 · sign in first':user==='sam'?'Ownership check fails → 403':'Ownership check passes → show order',
    ]],
  24: ['See what happens to your local Git branch','Your local main is at A and remote main has commit B. Choose how to bring that information in.','Local main එක A වල. Remote එකේ B තියෙනවා. Fetch සහ fast-forward pull කරද්දී local branch එකට මොකද වෙන්නේ බලන්න.','Git operation',
    [['fetch','Fetch'],['pull','Fast-forward pull']], operation=>[
      'main → A · remote main → B','Download B → origin/main now points to B',
      operation==='fetch'?'Local main stays at A':'Local main fast-forwards to B',
    ]],
  25: ['Swap a discount strategy','The checkout supplies the subtotal to a selected rule. See how different rule choices change the result.','Checkout එක subtotal එක තෝරපු discount rule එකට දෙනවා. Rule එක මාරු කරලා total එක බලන්න.','Discount rule',
    [[0,'Standard · 0%'],[10,'Member · 10%'],[25,'Sale · 25%']], rate=>[
      'Cart subtotal: Rs. 1,200','Strategy returns '+rate+'% off','Checkout total: Rs. '+(1200*(100-rate)/100).toLocaleString('en-LK'),
    ]],
  26: ['Test the boundary of a quantity rule','The rule accepts whole numbers from 1 to 10. Try inputs around both bounds.','Quantity එක 1ත් 10ත් අතර whole number එකක් වෙන්න ඕන. සීමා දෙක අසල inputs test කරන්න.','Test input',
    [[0,'0'],[1,'1'],[10,'10'],[11,'11']], quantity=>[
      'Input: '+quantity,'Check 1 ≤ quantity ≤ 10',quantity>=1&&quantity<=10?'Expected: accepted':'Expected: rejected',
    ]],
  27: ['Trace a browser connection','Choose an address to see which default port the browser uses and whether TLS is part of the flow.','Address එක තෝරලා browser එක යන port එක සහ TLS භාවිත වෙනවද බලන්න.','Address',
    [[false,'http://shop.example'],[true,'https://shop.example']], secure=>[
      'DNS resolves shop.example',secure?'Connect on port 443 and establish TLS':'Connect on port 80',
      secure?'Send HTTP through the protected connection':'Send HTTP without TLS',
    ]],
  28: ['Release a build through CI','A Git push starts a build. Choose a test result to see whether the release step can proceed.','Git push එකෙන් build එක පටන් ගන්නවා. Tests pass ද fail ද අනුව release වෙනවද බලන්න.','Pipeline result',
    [[true,'Tests pass'],[false,'Tests fail']], pass=>[
      'Git push → create build artifact',pass?'Checks pass':'Checks fail',pass?'Deploy the checked artifact':'Keep current production version',
    ]],
  29: ['Read inventory through a cache','Compare a cache hit with a cache miss and watch where the stock value comes from.','Cache hit එකක් සහ miss එකක් compare කරලා stock value එක එන්නේ කොහෙන්ද බලන්න.','Cache state',
    [[true,'Stock is cached'],[false,'Cache entry expired']], cached=>[
      'Read stock for Mango juice',cached?'Cache hit → return 8':'Cache miss → read 8 from database',
      cached?'No database read on this request':'Fill cache → return 8',
    ]],
  30: ['Preview product metadata for search','Pick a product and see how a storefront can use product-specific title and description metadata. The preview is illustrative.','Product එක තෝරලා page title සහ description එක මාරු වෙන හැටි බලන්න. මේක search preview උදාහරණයක්.','Storefront product',
    [['Mango','Mango juice'],['Lime','Lime juice']], drink=>[
      'Product template receives '+drink,'Set title: '+drink+' juice · Fresh Drinks','Description: Order fresh '+drink.toLowerCase()+' juice from the menu.',
    ]],
  31: ['Handle repeated payment notifications','These are simulated provider events. Compare a first delivery, a repeat delivery and a payment with the wrong amount.','මේවා simulated payment events. පළමු notification එක, ඒක නැවත එන එක, සහ වැරදි amount එක compare කරන්න.','Provider event',
    [['first','First verified delivery'],['duplicate','Same transaction again'],['mismatch','Amount differs']], event=>[
      'Read verified event for order 42',
      event==='mismatch'?'Compare Rs. 400 with expected Rs. 500':'Amount matches Rs. 500',
      {first:'Store transaction ID and mark order paid',duplicate:'Transaction ID already stored → keep one payment',mismatch:'Keep order unpaid and investigate the mismatch'}[event],
    ]],
  32: ['Trace binary search on sorted data','Choose a target in the sorted list [2, 4, 6, 8, 10], or try a missing value.','Sorted list එකේ target එකක් තෝරලා search range එක කුඩා වෙන හැටි බලන්න.','Search target',
    [[2,'Find 2'],[10,'Find 10'],[7,'Find 7 (missing)']], target=>{
      const items=[2,4,6,8,10];
      const steps=['Sorted list: '+items.join(', ')];
      let left=0;
      let right=items.length-1;
      while (left<=right) {
        const mid=Math.floor((left+right)/2);
        const value=items[mid];
        if (value===target) return [...steps,'Check '+value,'Found at index '+mid];
        if (value<target) {
          steps.push(value+' < '+target+' → move right');
          left=mid+1;
        } else {
          steps.push(value+' > '+target+' → move left');
          right=mid-1;
        }
      }
      return [...steps,'Range is empty → not found'];
    }],
  33: ['Match a CV claim to interview evidence','Choose a claim from this fictional project. Trace the contribution and the evidence you could show.','කල්පිත project එකේ CV claim එකක් තෝරන්න. ඔබ කළ වැඩේ සහ ඒක පෙන්වන evidence එක වෙන් කරලා බලන්න.','Sample CV claim',
    [['api','Built the booking API'],['tests','Tested booking edge cases']], claim=>({
      api:['Problem: two customers can request one seat','Contribution: added booking endpoint and a unique slot rule','Evidence: show the endpoint and a conflict response'],
      tests:['Risk: a repeated request creates a duplicate','Contribution: tested two requests for the same slot','Evidence: show one booking succeeds and the second returns a conflict'],
    })[claim]],

};

export function mountEditionDemo(root,section,escape,showScene) {
  const [title,en,si,label,choices,run]=demos[section];
  let count=0;
  root.innerHTML=`<h2>${escape(title)}</h2><p>${escape(en)}</p><p lang="si">${escape(si)}</p>
    <fieldset><legend>${escape(label)}</legend><div class="actions edition-demo-controls">
      ${choices.map(([,name],i)=>`<button type="button" class="button" data-choice="${i}" aria-pressed="${i===0}">${escape(name)}</button>`).join('')}
      ${section===8||section===11?'<button type="button" class="button" data-reset>Reset</button>':''}
    </div></fieldset><div data-edition-player></div><ol class="edition-flow"></ol>`;
  const list=root.querySelector('.edition-flow');
  const show=(index,advance=false)=>{
    const input=choices[index][0];
    const accumulating=section===8||section===11;
    const steps=accumulating&&!advance?[section===8?'Create a counter':'Prop: Mango juice','Current count: '+count]:run(input,count);
    if (advance && accumulating) count+=input;
    root.querySelectorAll('[data-choice]').forEach(button=>button.setAttribute('aria-pressed',String((advance||!accumulating)&&Number(button.dataset.choice)===index)));
    list.innerHTML=steps.map(step=>`<li>${escape(step)}</li>`).join('');
    showScene(title,steps,advance);
  };
  show(0);
  root.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if (!button?.matches('[data-choice],[data-reset]')) return;
    if (button.hasAttribute('data-reset')) {
      count=0;
      show(0);
      return;
    }
    show(Number(button.dataset.choice),true);
  });
}
