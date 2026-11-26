export const heapSeed = mode => (mode==='max'?[40,24,33,10,15,30]:[4,12,8,21,16,11])
  .map((value,id)=>({id,value}));

export function heapInsertion(input, value, mode) {
  const nodes=input.slice();
  const nextId=Math.max(-1,...nodes.map(node=>node.id))+1;
  const frames=[];
  const add=(message,active=[],phase='')=>frames.push({nodes:nodes.slice(),message,active,phase});
  let child=nodes.length;
  nodes.push({id:nextId,value});
  add(`Insert ${value} at the next free leaf (index ${child}).`,[child],'Insert at the bottom');
  const wins=(a,b)=>mode==='max'?a>b:a<b;
  while (child>0) {
    const parent=Math.floor((child-1)/2);
    const parentValue=nodes[parent].value;
    const move=wins(value,parentValue);
    const symbol=mode==='max'?'>':'<';
    add(`Compare ${value} ${symbol} ${parentValue}: ${move?'true → swap':'false → stop'}.`,[child,parent],'Compare with parent');
    if (!move) break;
    [nodes[child],nodes[parent]]=[nodes[parent],nodes[child]];
    child=parent;
    add(`${value} moves up to index ${child}.`,[child],'Swap and move up');
  }
  add(`Insertion complete. Root = ${nodes[0].value}; the ${mode}-heap property holds.`,[child],'Heap restored');
  return frames;
}

export function pipelineTrace({outcome='pass',mode='automatic',current='v1',version='v2',approve=false}={}) {
  const frames=[];
  const states=['waiting','waiting','waiting','waiting','waiting','waiting'];
  const add=(stage,status,message,production=current,gate=false)=>{
    states[stage]=status;
    frames.push({states:states.slice(),stage,message,production,gate});
  };
  const block=from=>{for(let i=from;i<states.length;i++) states[i]='blocked';};
  add(0,'passed','Commit '+version+' starts the pipeline.');
  add(1,'running','Build compiles and bundles the source.');
  if (outcome==='build') {
    block(2);
    add(1,'failed','Build failed. There is no artifact to test or deploy.');
    return frames;
  }
  add(1,'passed','Build produced artifact '+version+'.');
  add(2,'running','Run checks against artifact '+version+'.');
  if (outcome==='test') {
    block(3);
    add(2,'failed','Tests failed. The pipeline stops before deployment.');
    return frames;
  }
  add(2,'passed','Tests passed. The same artifact is ready for delivery.');
  if (mode==='manual') {
    add(3,'running','Delivery gate: approve promoting '+version+' to production.',current,true);
    if (!approve) return frames;
    add(3,'passed','Release approved for '+version+'.');
  } else {
    add(3,'passed','Automatic release policy allows deployment.');
  }
  add(4,'running','Deploy the checked artifact '+version+'; production still serves '+current+'.');
  add(4,'passed','New deployment is provisioned. Run its health check.');
  add(5,'running','Check that the new deployment can serve traffic.');
  if (outcome==='health') add(5,'failed','Health check failed. Keep traffic on '+current+'.');
  else add(5,'passed','Health check passed. Production now serves '+version+'.',version);
  return frames;
}

export function searchTrace(items,target,{binary=true}={}) {
  const frames=[];
  let left=0;
  let right=items.length-1;
  while(left<=right) {
    const i=binary?Math.floor((left+right)/2):left;
    const value=items[i];
    frames.push({items,active:[i],range:[left,right],message:`Compare index ${i}: ${value} with target ${target}.`});
    if(value===target) {
      frames.push({items,active:[i],result:i,message:`Found ${target} at index ${i}.`});
      return frames;
    }
    if (!binary||value<target) left=i+1;
    else right=i-1;
    frames.push({items,range:[left,right],message:left<=right?`Continue in indices ${left}–${right}.`:'The remaining range is empty.'});
  }
  frames.push({items,active:[],result:-1,message:`${target} is not present. Return −1.`});
  return frames;
}

export function sortTrace(input,algorithm) {
  const items=[...input];
  const frames=[];
  const add=(message,active=[])=>frames.push({items:[...items],active,message});
  add('Start with the input in its original order.');
  const swap=(i,j)=>{[items[i],items[j]]=[items[j],items[i]];};
  if (algorithm==='insertion') {
    for(let i=1;i<items.length;i++) {
      let j=i;
      while(j>0) {
        const move=items[j-1]>items[j];
        add(`Compare ${items[j-1]} and ${items[j]} in the sorted prefix.`,[j-1,j]);
        if (!move) break;
        swap(j-1,j);
        add('Move the smaller value one slot left.',[j-1,j]);
        j--;
      }
    }
  } else if(algorithm==='selection') {
    for(let i=0;i<items.length-1;i++){
      let min=i;
      for(let j=i+1;j<items.length;j++){
        add(`Compare ${items[j]} with the current minimum ${items[min]}.`,[min,j]);
        if(items[j]<items[min]) min=j;
      }
      if(min!==i) {
        swap(i,min);
        add(`Place ${items[i]} at the start of the unsorted portion.`,[i,min]);
      }
    }
  } else {
    for(let end=items.length-1;end>0;end--) {
      let changed=false;
      for(let i=0;i<end;i++){
        add(`Compare adjacent values ${items[i]} and ${items[i+1]}.`,[i,i+1]);
        if(items[i]>items[i+1]){
          swap(i,i+1);
          changed=true;
          add('Swap the pair.',[i,i+1]);
        }
      }
      if(!changed) break;
    }
  }
  add('Sorted result: '+items.join(', ')+'.');
  return frames;
}

export function graphTrace(algorithm,start) {
  const graph={A:['B','C'],B:['A','D','E'],C:['A','F'],D:['B'],E:['B','F'],F:['C','E']};
  const visit=[],seen=new Set([start]),pending=[start],frames=[];
  const stack=algorithm==='dfs';
  while(pending.length){
    const node=stack?pending.pop():pending.shift();
    visit.push(node);
    const neighbors=graph[node].filter(x=>!seen.has(x));
    if(stack) neighbors.reverse();
    for(const n of neighbors){seen.add(n);pending.push(n);}
    frames.push({nodes:Object.keys(graph),visit:[...visit],activeNode:node,pending:[...pending],
      message:`Visit ${node}. ${stack?'Stack':'Queue'}: ${pending.join(', ')||'empty'}.`});
  }
  frames.push({nodes:Object.keys(graph),visit:[...visit],activeNode:null,pending:[],message:'Visit order: '+visit.join(' → ')+'.'});
  return frames;
}

export function structureTrace(kind,operation) {
  const items=[10,20,30];
  const frames=[{items:[...items],message:`Start with ${kind}: 10, 20, 30.`}];
  const push=operation==='add'||operation==='front';
  if (push) {
    if (operation==='front') items.unshift(40);
    else items.push(40);
    frames.push({items:[...items],active:[operation==='front'?0:items.length-1],message:`Add 40 at the ${operation==='front'?'front':'back'}.`});
  } else {
    const atBack=kind==='stack'||operation==='back';
    const removed=atBack?items.pop():items.shift();
    frames.push({items:[...items],message:`Remove ${removed} from the ${atBack?'top / back':'front'}.`});
  }
  return frames;
}

export function windowTrace(items,size) {
  const frames=[];
  let total=items.slice(0,size).reduce((a,b)=>a+b,0);
  frames.push({items,range:[0,size-1],message:`Add the first ${size} values. Sum = ${total}.`});
  for(let i=size;i<items.length;i++){
    const old=total;
    total+=items[i]-items[i-size];
    frames.push({items,range:[i-size+1,i],message:`Slide one position. ${old} − ${items[i-size]} + ${items[i]} = ${total}.`});
  }
  return frames;
}

export function lookupTrace(target) {
  const values=[8,3,12,1,6,10,14];
  const frames=[];
  let index=0;
  while(index<values.length){
    const value=values[index];
    if(value===target){
      frames.push({nodes:values.map((value,id)=>({id,value})),active:[index],message:`Found ${target}.`});
      return frames;
    }
    const right=target>value;
    frames.push({nodes:values.map((value,id)=>({id,value})),active:[index],message:`${target} ${right?'>':'<'} ${value}. Follow the ${right?'right':'left'} child.`});
    index=2*index+(right?2:1);
  }
  frames.push({nodes:values.map((value,id)=>({id,value})),active:[],message:'Reached an empty child. Target not found.'});
  return frames;
}

export function mergeTrace(left,right) {
  const input=[...left,...right];
  const frames=[{items:input,output:[],message:'Both input arrays are already sorted.'}];
  const output=[];
  let a=0,b=0;
  while(a<left.length||b<right.length){
    if(b===right.length||(a<left.length&&left[a]<=right[b])){
      output.push(left[a]);
      frames.push({items:input,active:[a],output:[...output],message:`Take ${left[a]} from the left array.`});
      a++;
    } else {
      output.push(right[b]);
      frames.push({items:input,active:[left.length+b],output:[...output],message:`Take ${right[b]} from the right array.`});
      b++;
    }
  }
  return frames;
}

export function pairTrace(items,target) {
  const frames=[];
  let left=0,right=items.length-1;
  while(left<right){
    const sum=items[left]+items[right];
    const found=sum===target;
    frames.push({items,active:[left,right],range:[left,right],message:`${items[left]} + ${items[right]} = ${sum}. ${found?'Pair found.':sum<target?'Too small → move left pointer right.':'Too large → move right pointer left.'}`});
    if(found) return frames;
    if(sum<target) left++;
    else right--;
  }
  frames.push({items,active:[],message:`No pair adds up to ${target}.`});
  return frames;
}

export function fibonacciTrace(count) {
  const seq=[];
  const frames=[];
  while(seq.length<count){
    const i=seq.length;
    const value=i<2?i:seq[i-2]+seq[i-1];
    frames.push({items:seq.concat(value),active:[i],message:i<2?`Base case F(${i}) = ${value}.`:`F(${i}) = ${seq[i-2]} + ${seq[i-1]} = ${value}.`});
    seq.push(value);
  }
  return frames;
}

export function factorialTrace(n) {
  const frames=[];
  for(let k=n;k>=0;k--) frames.push({items:Array.from({length:n-k+1},(_,i)=>n-i),message:k===0?'Base case: factorial(0) returns 1.':`factorial(${k}) waits for factorial(${k-1}).`});
  let result=1;
  for(let k=1;k<=n;k++){
    result*=k;
    frames.push({items:Array.from({length:n-k},(_,i)=>n-i),output:[result],message:`Unwind factorial(${k}) → ${result}.`});
  }
  return frames;
}
