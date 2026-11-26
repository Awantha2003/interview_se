import { factorialTrace, fibonacciTrace, graphTrace, lookupTrace, mergeTrace, pairTrace, searchTrace, sortTrace, structureTrace, windowTrace } from './live-models.js';

const choice=(label,defaultValue,options)=>({label,defaultValue,options:options.map(option=>Array.isArray(option)?option:[option,String(option)])});
const choices=(label,options)=>choice(label,Array.isArray(options[0])?options[0][0]:options[0],options);
const number=(label,defaultValue,min,max)=>({label,defaultValue,min,max});
const words = steps => steps.map(message=>({message}));
const shared = [2,4,6,8,10,12,14];
const list=[7,2,9,2,4,1];

export const liveCatalog = [
  {key:'jwt',title:'JWT in motion',si:'Signed token එක browser එක සහ API එක අතර ගමන් කරන හැටි බලන්න.',section:23,
    match:/\bjwt\b|token expiration and revocation|access and refresh tokens/i,view:'story'},
  {key:'offboarding',title:'The orphaned account',si:'Employee කෙනෙක් ගියාම ඉතිරි වෙන access එක හඳුනාගෙන disable කරන හැටි බලන්න.',section:23,
    match:/orphaned account|offboarding|identity lifecycle|least privilege|api keys and service accounts/i,view:'story'},
  {key:'heap',title:'Heap insertion',si:'අලුත් value එක පහළට දාලා parent එක්ක compare කරමින් උඩට යන හැටි බලන්න.',section:3,
    match:/\bheap(?:s|ify)?\b|priority queue/i,view:'heap'},
  {key:'pipeline',title:'CI/CD pipeline',si:'Build, tests, release gate සහ deploy එක හරහා production වෙනස් වෙන හැටි බලන්න.',section:28,
    match:/\bCI\s*(?:vs|\/|and)\s*CD\b|github actions|(?:build,?\s*)?test and deploy pipeline|continuous integration|deployment pipeline/i,view:'pipeline'},
  {key:'search',title:'Linear and binary search',si:'Target එක හොයද්දී candidate range එක වෙනස් වෙන හැටි බලන්න.',section:4,match:/binary search|linear search|best, average and worst/i,view:'array',
    inputs:{target:number('Target',10,-50,100),mode:choices('Search',['Binary','Linear'])},
    trace:({target,mode})=>searchTrace(shared,target,{binary:mode==='Binary'})},
  {key:'sort',title:'Compare and sort an array',si:'Array එක sort වෙනකම් compare සහ swap පියවර බලන්න.',section:4,match:/bubble|selection sort|insertion sort/i,view:'array',
    inputs:{algorithm:choices('Algorithm',[['bubble','Bubble sort'],['selection','Selection sort'],['insertion','Insertion sort']])},
    trace:({algorithm})=>sortTrace(list,algorithm)},
  {key:'merge',title:'Merge two sorted arrays',si:'Lists දෙකේ මුල් values compare කර අඩු එක output එකට යන හැටි බලන්න.',section:4,match:/merge sort|merge sorted arrays/i,view:'array',
    inputs:{run:choices('Inputs',[['a','[1,4,8] + [2,3,6]'],['b','[1,2,2] + [2,5,7]']])},
    trace:({run})=>run==='a'?mergeTrace([1,4,8],[2,3,6]):mergeTrace([1,2,2],[2,5,7])},
  {key:'graph',title:'BFS and DFS traversal',si:'BFS queue එක සහ DFS stack එකෙන් visit order එක වෙනස් වෙන හැටි බලන්න.',section:4,match:/\bbfs\b|\bdfs\b|breadth.first|depth.first|graphs|adjacency list/i,view:'graph',
    inputs:{algorithm:choices('Traversal',[['bfs','Breadth-first (queue)'],['dfs','Depth-first (stack)']]),start:choices('Start node',['A','B','F'])},
    trace:({algorithm,start})=>graphTrace(algorithm,start)},
  {key:'tree',title:'Search a binary search tree',si:'Target එක හා දැනට node එක compare කර වමට හෝ දකුණට යන්න.',section:3,match:/binary search tree|tree traversals/i,view:'heap',
    inputs:{target:number('Target',10,-50,100)},trace:({target})=>lookupTrace(target)},
  {key:'stack',title:'Stack: last in, first out',si:'අන්තිමට දාපු value එක මුලින් ඉවත් වෙනවා.',section:3,match:/\bstacks?\b|balanced brackets/i,view:'array',
    inputs:{operation:choices('Operation',[['add','Push 40'],['remove','Pop']])},
    trace:({operation})=>structureTrace('stack',operation)},
  {key:'queue',title:'Queue and deque operations',si:'Queue එකේ පළමුව ආපු value එක පළමුව යනවා. Deque එකේ දෙපැත්තම භාවිත කරන්න පුළුවන්.',section:3,match:/\bqueues?\b|\bdeques?\b|ring buffer/i,view:'array',
    inputs:{operation:choices('Operation',[['add','Add 40 at back'],['remove','Remove front'],['front','Deque: add 40 at front'],['back','Deque: remove back']])},
    trace:({operation})=>structureTrace('queue',operation)},
  {key:'window',title:'Sliding window sum',si:'Window එක slide කරද්දී කලින් value එක අඩු කරලා අලුත් value එක එකතු කරන්න.',section:4,match:/sliding window/i,view:'array',
    inputs:{size:number('Window size',3,1,6)},trace:({size})=>windowTrace([4,2,7,1,6,3],size)},
  {key:'pair',title:'Two pointers on sorted data',si:'Sum එක target එකට වඩා අඩුද වැඩිද බලලා pointers move කරන්න.',section:4,match:/two pointers|sorted pair/i,view:'array',
    inputs:{target:number('Target sum',13,-20,40)},trace:({target})=>pairTrace([1,3,5,8,12,16],target)},
  {key:'fibonacci',title:'Build a Fibonacci sequence',si:'කලින් values දෙක එකතු කරලා ඊළඟ value එක හදන හැටි බලන්න.',section:32,match:/fibonacci|dynamic programming/i,view:'array',
    inputs:{count:number('Number of terms',7,1,12)},trace:({count})=>fibonacciTrace(count)},
  {key:'factorial',title:'Recursion: push and unwind',si:'Calls base case එකට යන හැටිත්, අගයන් ආපහු return වෙන හැටිත් බලන්න.',section:1,match:/recursion|factorial/i,view:'array',
    inputs:{n:number('Factorial input',4,0,9)},trace:({n})=>factorialTrace(n)},
  {key:'event-loop',title:'Browser event loop',si:'Sync code, microtasks සහ timer callback run වෙන order එක බලන්න.',section:9,match:/event loop|microtasks/i,
    inputs:{schedule:choices('Scheduled work',[['both','Promise + timer'],['timer','Timer only'],['promise','Promise only']])},
    trace:({schedule})=>{
      const log=['start'];
      const frames=[{message:'Run the current script.',output:[...log]}];
      log.push('end');
      frames.push({message:'Finish all synchronous statements.',output:[...log]});
      if(schedule!=='timer'){log.push('promise');frames.push({message:'Drain the Promise callback from the microtask queue.',output:[...log]});}
      if(schedule!=='promise'){log.push('timer');frames.push({message:'Run the timer as the next task.',output:[...log]});}
      return frames;
    }},
  {key:'await',title:'Await a promise and handle rejection',si:'Order එක ready නම් try එක දිගටම යනවා. Reject වුණොත් catch එකට යනවා.',section:9,match:/async\s*\/\s*await|promise(?:s|\s+chaining)?\s*$/i,
    inputs:{result:choices('Lookup',[['ready','A12 exists'],['missing','B99 missing']])},
    trace:({result})=>words(['Start the lookup and receive a pending promise.','Pause the async function at await. The rest of the page keeps working.',result==='ready'?'Promise fulfills → resume try → Ready.':'Promise rejects → jump to catch → Order not found.'])},
  {key:'transaction',title:'Commit or roll back a transaction',si:'Changes එකට සාර්ථක වුණොත් commit වෙනවා. Failure එකකදී කලින් balances ආපහු එනවා.',section:21,match:/\btransactions?\b|\bcommit\b.*\brollback\b|\bACID\b/i,
    inputs:{outcome:choices('Second update',[['pass','Credit succeeds'],['fail','Credit fails']])},
    trace:({outcome})=>[
      {items:[500,200],message:'BEGIN. Sender has 500, receiver has 200.'},
      {items:[400,200],active:[0],message:'Debit 100 inside the transaction.'},
      outcome==='pass'?{items:[400,300],active:[1],message:'Credit 100 and COMMIT both updates.'}:{items:[500,200],message:'Credit failed. ROLLBACK the debit.'},
    ],view:'array'},
  {key:'cache',title:'Cache hit vs cache miss',si:'Cache hit එකේ DB read එක skip වෙනවා. Miss එකෙන් DB data එක cache එකට දානවා.',section:29,match:/\bcach(?:e|es|ing)\b|\bredis\b/i,
    inputs:{state:choices('Cache entry',[['hit','Fresh'],['miss','Expired or missing']])},
    trace:({state})=>words(['Read stock for Mango juice.',state==='hit'?'Fresh entry → read cached value 8.':'No fresh entry → database returns 8.',state==='hit'?'Respond with 8. No database read.':'Store 8 with a TTL, then respond with 8.'])},
  {key:'payment',title:'Payment notification decision',si:'Expected amount සහ transaction ID check කර duplicate payment එකකට දෙවරක් order update නොකරන හැටි බලන්න.',section:31,match:/\bidempotency\b|duplicate payment|webhook|payment status lifecycle/i,
    inputs:{event:choices('Simulated notification',[['first','First valid payment'],['duplicate','Already processed'],['wrong','Wrong amount']])},
    trace:({event})=>words(['Read an already verified event for order 42.',event==='wrong'?'Expected 500. Event contains 400.':'Amount and currency match the order.',{first:'Save transaction ID and mark the order paid.',duplicate:'ID already recorded. Return the prior result.',wrong:'Keep the existing order status. Review the mismatch.'}[event]])},
  {key:'permission',title:'Authentication and authorization gates',si:'User කවුද කියලා check කරලා එයාට order එක බලන්න අවසර තියෙනවද බලන්න.',section:23,match:/authentication and authorization|authentication vs authorization|access control|rbac|row.level security/i,
    inputs:{actor:choices('Request identity',[['guest','Guest'],['other','Signed in, different owner'],['owner','Signed in, owner']])},
    trace:({actor})=>words(['Request to view order 42.',actor==='guest'?'No valid signed-in session.':'Session establishes user identity.',{guest:'401 → sign in first.',other:'403 → access denied by ownership check.',owner:'200 → show order 42.'}[actor]])},
  {key:'retry',title:'Retry with the same operation identity',si:'First response එක timeout වුණත් එකම ID එකෙන් retry කරලා duplicate work නවත්වන්න.',section:36,match:/retries and timeouts|reliable apis|idempotent methods/i,
    inputs:{outcome:choices('First response',[['received','Delivered'],['lost','Timed out after save']])},
    trace:({outcome})=>words(['Send booking request with key K1.','Server stores the booking and result for K1.',outcome==='lost'?'Response times out. Retry with K1 → return the stored result.':'Client receives the initial result. No retry needed.'])},
  {key:'props-state',title:'React props and state across renders',si:'Parent prop එක සහ component state එකෙන් render එකට ලැබෙන වෙනස බලන්න.',section:11,match:/props vs state|rendering and re.rendering|functional updates|useState/i,
    inputs:{action:choices('Action',[['count','Click add twice'],['rename','Parent changes label']])},
    trace:({action})=>{
      const before={name:'Mango juice',count:0};
      const after=action==='count'?{...before,count:[1,1].reduce((value,increment)=>value+increment,before.count)}:{...before,name:'Lime juice'};
      return [
        {items:[before.name,before.count],message:'Render: parent prop name and local state count.'},
        {items:[before.name,before.count],message:action==='count'?'Queue two functional state updates. Each receives the previous queued value.':'Parent passes a new name prop.'},
        {items:[after.name,after.count],message:`React renders ${after.name} with count ${after.count}.`},
      ];
    }},
  {key:'boundaries',title:'Run boundary-value tests',si:'Allowed range එකේ සීමාවට ඇතුළේ සහ පිට inputs run කරන්න.',section:26,match:/boundary value|equivalence partition|tdd|test.driven development/i,view:'array',
    inputs:{implementation:choices('Implementation',[['correct','Accept 1 through 10'],['off','Bug: rejects 10']])},
    trace:({implementation})=>{
      const results=[];
      return [0,1,10,11].map(n=>{
        const expected=n>=1&&n<=10;
        const actual=n>=1&&(implementation==='correct'?n<=10:n<10);
        results.push(n+': '+(expected===actual?'PASS':'FAIL'));
        return {items:[0,1,10,11],active:[results.length-1],output:[...results],message:`Input ${n}: expected ${expected}, got ${actual}.`};
      });
    }},
  {key:'cursor',title:'Filter, sort and paginate a result',si:'Rows filter කරලා sort කරලා page එකක් ගන්නා පිළිවෙළ බලන්න.',section:15,match:/pagination|offset and cursor|cursor pagination/i,view:'array',
    inputs:{status:choices('Order status',['paid','pending']),page:number('Page number',1,1,4)},
    trace:({status,page})=>{
      const orders=[[104,'paid'],[101,'paid'],[106,'pending'],[103,'paid'],[105,'paid'],[102,'pending']];
      const filtered=orders.filter(([,state])=>state===status).map(([id])=>id);
      const sorted=[...filtered].sort((a,b)=>b-a);
      return [
        {items:orders.map(([id])=>id),message:'Read all order IDs and their statuses.'},
        {items:filtered,message:'Filter to '+status+' orders.'},
        {items:sorted,message:'Sort IDs largest first with a deterministic order.'},
        {items:sorted.slice((page-1)*2,page*2),message:`Return page ${page} with up to two orders.`},
      ];
    }},
  {key:'join',title:'Match customers to their orders',si:'INNER JOIN එකෙන් matches පමණයි. LEFT JOIN එකෙන් order නැති customer එකත් තියාගන්නවා.',section:21,match:/(?:inner|left|right|cross|outer).*join|joins/i,
    inputs:{kind:choices('Join',['INNER','LEFT'])},
    trace:({kind})=>{
      const customers=[[1,'Nila'],[2,'Sam'],[3,'Ravi']];
      const orders=[[11,1],[12,1],[13,2]];
      const result=[];
      return customers.map(([id,name])=>{
        const matches=orders.filter(([,owner])=>owner===id);
        const unmatched=matches.length===0;
        if (!unmatched) for(const [order] of matches) result.push(name+' → '+order);
        else if(kind==='LEFT') result.push(name+' → NULL');
        return {items:customers.map(([,name])=>name),active:[id-1],output:[...result],
          message:unmatched?(kind==='LEFT'?name+' has no order. Keep the left row with NULL.':name+' has no order. Skip this row.'):`Match ${name} to ${matches.length} order(s).`};
      });
    }},
  {key:'git',title:'Git fetch and fast-forward pull',si:'Remote commits ලැබුණත් local branch එක ඉදිරියට යන්නේ කවදාද බලන්න.',section:24,match:/pull vs fetch|remote.tracking branches|git pull|git fetch/i,
    inputs:{operation:choices('Operation',[['fetch','Fetch only'],['pull','Pull (fast-forward)']])},
    trace:({operation})=>words(['Local main → A; remote contains A → B.','Download B. Update origin/main → B.',operation==='fetch'?'Stop after fetch. Local main still points to A.':'Fast-forward local main to B.'])},
  {key:'fizzbuzz',title:'FizzBuzz output trace',si:'3 සහ 5 දෙකටම බෙදෙන case එක මුලින් check කරනවා.',section:32,match:/fizzbuzz/i,view:'array',
    inputs:{start:number('Start number',12,1,60)},
    trace:({start})=>{
      const items=Array.from({length:6},(_,i)=>start+i);
      const results=[];
      return items.map((n,i)=>{
        const value=n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':n;
        results.push(value);
        return {items,active:[i],output:[...results],message:`Number ${n} → ${value}.`};
      });
    }},
  {key:'palindrome',title:'Compare a palindrome from both ends',si:'Text එකේ දෙපැත්තෙන් characters compare කරමින් මැදට යන්න.',section:32,match:/palindrome/i,view:'array',
    inputs:{text:choices('Text',['level','racecar','coding'])},
    trace:({text})=>{
      const items=Array.from(text);
      const frames=[];
      for(let i=0,j=items.length-1;i<j;i++,j--){
        const match=items[i]===items[j];
        frames.push({items,active:[i,j],message:`${items[i]} vs ${items[j]}: ${match?'match → move inward':'different → return false'}.`});
        if(!match) return frames;
      }
      frames.push({items,message:'Every mirrored pair matched. Return true.'});
      return frames;
    }},
  {key:'dns',title:'Trace DNS and a browser request',si:'Hostname එක IP address එකක් වෙලා connection එකට යන හැටි බලන්න.',section:27,match:/dns|http request flow|ip addresses and ports/i,
    inputs:{state:choices('DNS lookup',[['hit','Cached record'],['miss','No cached record']])},
    trace:({state})=>words(['Browser needs the address for shop.example.',state==='hit'?'Resolver finds a valid cached record.':'Resolver obtains an answer and caches it for its TTL.','Browser uses the resulting address for the HTTPS connection.'])},
  {key:'load-balancer',title:'Route requests around an unhealthy instance',si:'Health check fail වුණාම healthy instances වලට request බෙදන හැටි බලන්න.',section:29,match:/load balancing|load balancer|health checks/i,view:'array',
    inputs:{health:choices('Instance B',[['healthy','Healthy'],['down','Unhealthy']])},
    trace:({health})=>{
      const instances=['A','B','C'];
      const pool=health==='healthy'?instances:['A','C'];
      const routed=[];
      return Array.from({length:5},(_,i)=>{
        const next=pool[i%pool.length];
        routed.push(next);
        return {items:instances,active:[instances.indexOf(next)],output:[...routed],message:`Request ${i+1} → instance ${next}. Eligible pool: ${pool.join(', ')}.`};
      });
    }},

];

export const liveByKey = Object.fromEntries(liveCatalog.map(example=>[example.key,example]));
export function examplesForTitle(title,section) {
  return liveCatalog.filter(example=>
    example.match.test(title) && (example.key!=='payment'||section===31) &&
    (example.key!=='queue'||(section===3||section===32)&&!/priority queue/i.test(title)) &&
    (example.key!=='graph'||section===3||section===4||section===32));
}
