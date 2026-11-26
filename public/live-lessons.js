// The artwork and the moving object reflect the lesson's domain. Diagram labels,
// example input, code, and results are taken from the current lesson.
const profiles = {
  1: ['code','Value','laptop','Program','gear','Operation','orb','Output'],
  2: ['puzzle','Object','code','Class','gear','Method','badge','Instance'],
  3: ['orb','Value','parcel','Input','puzzle','Data structure','orb','Stored value'],
  4: ['orb','Value','parcel','Input','search','Algorithm','orb','Result'],
  5: ['code','Element','code','HTML','browser','Browser','browser','Page'],
  6: ['puzzle','Style','code','CSS rule','gear','Style calculation','browser','Styled page'],
  7: ['puzzle','Item','browser','Container','gear','Layout','browser','Rendered layout'],
  8: ['code','Value','code','JavaScript','gear','Operation','orb','Output'],
  9: ['parcel','Event','person','User','browser','Browser','code','Handler'],
  10: ['badge','Value','code','Source','gear','Type check','code','Typed result'],
  11: ['puzzle','Update','puzzle','Parent','gear','Component','browser','Render'],
  12: ['puzzle','Update','browser','Current render','gear','Hook','browser','Next render'],
  13: ['parcel','Page','laptop','Browser','server','Framework','browser','Rendered page'],
  14: ['parcel','Bundle','code','Source','gear','Build tool','browser','Output'],
  15: ['parcel','Request','laptop','Client','server','Service','database','Storage'],
  16: ['parcel','Message','laptop','Client','network','HTTP','server','Server'],
  17: ['parcel','Request','laptop','Client','server','Node.js','code','Handler'],
  18: ['code','Value','code','Java code','gear','JVM','orb','Output'],
  19: ['parcel','Request','laptop','Client','server','Spring','database','Repository'],
  20: ['puzzle','Change','code','Source','gear','Build tool','browser','Result'],
  21: ['database','Rows','database','Source tables','gear','SQL operation','chart','Result rows'],
  22: ['code','Document','database','Collection','gear','Operation','code','Document result'],
  23: ['badge','Identity','person','User','lock','Security check','shield','Access decision'],
  24: ['branch','Commit','laptop','Working copy','branch','Local repository','server','Remote'],
  25: ['puzzle','Feature','person','Requirement','gear','Design','browser','Application'],
  26: ['bug','Test case','code','Code under test','search','Test runner','shield','Test result'],
  27: ['parcel','Message','laptop','Sender','network','System / network','server','Receiver'],
  28: ['parcel','Artifact','branch','Commit','gear','Build / verify','server','Environment'],
  29: ['parcel','Request','laptop','Client','server','Service','database','Data'],
  30: ['puzzle','Input','person','User','phone','App / platform','browser','Result'],
  31: ['receipt','Payment','person','Customer','lock','Payment provider','receipt','Order status'],
  32: ['orb','Value','code','Example input','gear','Algorithm','orb','Output'],
  33: ['badge','Evidence','person','Candidate','code','Project evidence','person','Interviewer'],
  34: ['badge','Evidence','person','Candidate','code','Action taken','chart','Result'],
  35: ['badge','Query','person','Signed-in user','lock','Row-level policy','database','Visible rows'],
  36: ['parcel','Request','laptop','Client','server','API','database','Recorded result'],
};

const asText = value=>value.replace(/\s+/g,' ').trim();
const trim = (text,length)=>text.length>length?text.slice(0,length-1).trimEnd()+'…':text;
const marker = /^(real[- ]world example|worked example|expected(?:\s+(?:output|result))?|output(?: and analysis)?|result(?:\s*\/\s*explanation)?|remember|memory(?: trick)?|read the diagram[^:]*)(?=\s*:|\n|$)/i;
const metadata = /^(?:section \d+|lesson \d+|full[- ]stack|interview (?:question|q\s*&)|quick practice|practice:|follow-up|english definition|simple english|code example|graphical explanation|visual explanation)/i;
const numbered = /^(?:0?[1-9]|[1-9]\d)\.\s+(\S[^\n]*)$/;
const comparison = /\b(?:vs\.?|versus|compare|comparison|pros and cons|trade-offs?)\b/i;
const sequence = /\s*(?:→|\s->\s|\s=>\s)\s*/;
const hasSinhala = /[\u0d80-\u0dff]/;

export function lessonProfile(section) {
  const [token,item,a,first,b,middle,c,last]=profiles[section]??profiles[1];
  return {token,item,stations:[[a,first],[b,middle],[c,last]]};
}

function artFor(label,fallback) {
  const icons=[
    [/\b(?:keyboard|input|terminal|client|laptop)\b/i,'laptop'],
    [/\b(?:browser|page|html|dom|view|render)\b/i,'browser'],
    [/\b(?:mobile|phone|native app|expo)\b/i,'phone'],
    [/\b(?:db|database|collection|storage|rows?|table|index|sql|bucket)\b/i,'database'],
    [/\b(?:user|employee|owner|student|candidate|customer|admin|interviewer)\b/i,'person'],
    [/\b(?:server|backend|api|service|replica|origin)\b/i,'server'],
    [/\b(?:git|branch|commit|merge|remote)\b/i,'branch'],
    [/\b(?:token|session|identity|jwt|claims|id)\b/i,'badge'],
    [/\b(?:permission|deny|allowed|authorization|security|signature|verify|lock)\b/i,'lock'],
    [/\b(?:network|dns|https?|cdn|tcp|udp|packet)\b/i,'network'],
    [/\b(?:pay(?:ment|s)?|invoice|receipt|order|refund)\b/i,'receipt'],
    [/\b(?:bug|error|fail(?:ed|ure)?|exception)\b/i,'bug'],
    [/\b(?:check|validation|pass(?:es|ed)?|verified|assert)\b/i,'shield'],
    [/\b(?:search|find|lookup|match|inspect)\b/i,'search'],
    [/\b(?:chart|latency|metrics|complexity|count|performance)\b/i,'chart'],
    [/\b(?:code|script|method|function|class|file|return|component)\b/i,'code'],
    [/\b(?:build|process|operation|queue|workflow|middleware)\b/i,'gear'],
  ];
  return icons.find(([re])=>re.test(label))?.[1]??fallback;
}

function clip(title,frames,profile,options={}) {
  return {title,frames,profile,...options};
}

export function exampleClip({title,section,steps,kind='walkthrough'}) {
  const profile=lessonProfile(section);
  const isComparison=kind!=='code'&&comparison.test(title);
  const frames=steps.map((step,index)=>{
    const point=Math.min(profile.stations.length-1,index);
    const station=step.label||profile.stations[point][1];
    return {
      ...step,point,station,
      icon:step.code?'code':artFor(station,profile.stations[point][0]),
    };
  });
  const stations=kind!=='code'&&steps.length===3&&steps.every(step=>step.label)
    ?frames.map(frame=>[frame.icon,frame.station]):undefined;
  return clip(title,frames,profile,{kind:isComparison?'overview':kind,stations});
}

function markedParts(blocks,pattern) {
  const notes=[];
  for(const [i,[type,value]] of blocks.entries()) {
    if(!['text','heading'].includes(type)) continue;
    const found=value.match(marker);
    if(!found||!pattern.test(found[1])) continue;
    const inline=value.slice(found[0].length).replace(/^[\s:]+/,'');
    const next=blocks[i+1];
    const following=next?.[0]==='text'&&!next[1].match(marker)&&!metadata.test(next[1])?next[1]:'';
    if(inline||following) notes.push(asText(inline||following));
  }
  return notes;
}

function exampleFrames(blocks,profile) {
  const initial=markedParts(blocks,/^(real|worked)/i);
  const results=markedParts(blocks,/^(expected|output|result)/i);
  const codes=blocks.filter(([type,value])=>type==='code'&&value.trim()).map(([,value])=>value);
  const paragraphs=blocks.filter(([type,value])=>type==='text'&&value.trim()&&!metadata.test(value)&&!marker.test(value)).map(([,value])=>asText(value));
  const definition=paragraphs.find(text=>!/^answer:/i.test(text));
  const secondFact=paragraphs.find(text=>text!==definition&&!/^answer:/i.test(text));
  const frames=[];
  if(initial.length) frames.push({label:'Scenario',message:initial[0],point:0,icon:profile.stations[0][0]});
  else if(definition) frames.push({label:'Concept',message:definition,point:0,icon:profile.stations[0][0]});
  if(codes.length) frames.push({label:'Code from the lesson',message:'Follow the example code from the lesson.',code:codes.join('\n').split('\n').slice(0,35).join('\n'),point:1,icon:'code'});
  else if(secondFact) frames.push({label:'How it works',message:secondFact,point:1,icon:profile.stations[1][0]});
  if(results.length) frames.push({label:'Result in the lesson',message:results[0],point:2,icon:profile.stations[2][0]});
  else if(initial.length&&definition) frames.push({label:'What this shows',message:definition,point:2,icon:profile.stations[2][0]});
  return frames;
}

function dryRun(description) {
  const markers=[...description.matchAll(/(?:^|[ ·])((?:INPUT|RESULT|STEP \d+))\s+/g)];
  if(markers.length<3) return null;
  const frames=markers.map((match,i)=>{
    const start=match.index+match[0].length;
    const end=markers[i+1]?.index??description.length;
    const values=description.slice(start,end).split(/ · /)[0].trim();
    const items=values.split(/\s+/).filter(Boolean);
    return {label:match[1],message:match[1]+' · '+values,items,output:match[1]==='RESULT'?items:undefined};
  });
  return frames.every(frame=>frame.items.length>0&&frame.items.length<=16)?frames:null;
}

function diagramParts(description,title) {
  const clean = description.split(/\s+·\s+/).map(asText).filter(Boolean);
  const labels=clean.filter(label=>!hasSinhala.test(label)&&!/^(?:read (?:the |this )?(?:diagram|numbered|boxes)|trace from input|concept map|visual (?:rehearsal|model)|follow the arrows|diagram:|step \d+ \/ \d+|\d+\s*$)/i.test(label));
  const fullPath=clean.map(label=>label.match(/^Read the diagram\s*:\s*(.*)$/i)?.[1]).find(path=>path?.includes('→'));
  const explicitPaths=labels.filter(label=>sequence.test(label));
  const isComparison=comparison.test(title)||/\b(?:Feature .+ Yes No|Time complexity Space complexity|Benefit Trade-off)\b/i.test(description);
  const path=(fullPath??(!isComparison&&explicitPaths.length===1?explicitPaths[0]:null))?.split(sequence).map(asText).filter(Boolean);
  if(path?.length>=3) return {labels:path.slice(0,12),kind:'flow'};
  if(path?.length===2&&labels.length===1) return {labels:path,kind:'flow'};
  return {labels:(labels.length?labels:clean).slice(0,12),kind:isComparison?'comparison':'diagram'};
}

export function sourceClips(blocks,{title,headings=[],kind},section) {
  const profile=lessonProfile(section);
  const known=new Set(headings.map(asText));
  const parts=[{title,blocks:[]}];
  for(const block of blocks) {
    const [type,value]=block;
    const found=type==='heading'&&value.match(numbered);
    if(found&&known.has(asText(value))) parts.push({title:found[1],blocks:[]});
    parts.at(-1).blocks.push(block);
  }

  const clips=[];
  for(const part of parts) {
    const examples=exampleFrames(part.blocks,profile);
    const isIntro=kind==='Overview'&&part===parts[0]&&parts.length>1;
    const figures=part.blocks.filter(([type])=>type==='diagram');
    for(const [i,[,svg,description]] of figures.entries()) {
      const name=figures.length>1?part.title+' · Diagram '+(i+1):part.title+' · Diagram';
      const values=Number(section)===32?dryRun(description):null;
      if(values) {
        clips.push(clip(name,values,profile,{kind:'tiles',diagram:{svg,description}}));
        continue;
      }
      const figure=diagramParts(description,part.title);
      const frames=figure.labels.map((label,index)=>({
        label:figure.kind==='flow'?'Follow the flow':'Read the diagram',
        station:trim(label,105),message:label,point:index,icon:artFor(label,profile.stations[Math.min(index,2)][0]),
      }));
      if(frames.length===1) frames.push(...examples.filter(frame=>!frame.code).slice(-1).map(frame=>({...frame,point:1})));
      if(frames.length) {
        clips.push(clip(name,frames,profile,{kind:figure.kind,diagram:{svg,description},stations:frames.map(frame=>[frame.icon,frame.station??frame.label])}));
      }
    }
    if(examples.length>=2) {
      clips.push(clip(part.title+(figures.length?' · Worked example':''),examples,profile,{kind:examples.some(frame=>frame.code)?'code':'walkthrough'}));
    } else if(!figures.length&&!isIntro&&part.blocks.length>1) {
      const frames=examples.length?examples:[{label:'Topic',message:part.title,point:0,icon:profile.stations[0][0]}];
      frames.push({label:'Study prompt',message:kind==='Reference'?'Use this page to find a topic or review the source notes.':'Explain the idea in your own words and give an example.',point:1,icon:'person',
        si:kind==='Reference'?'මේ පිටුවෙන් topic එකක් තෝරන්න හෝ source notes බලන්න.':'මේ අදහස ඔයාගේම වචනවලින් උදාහරණයක් එක්ක කියලා බලන්න.'});
      clips.push(clip(part.title,frames,profile,{kind:'review'}));
    }
  }
  return clips.length?clips:[exampleClip({title,section,steps:[
    {label:'Source page',message:title},
    {label:'Study prompt',message:'Choose a topic from this page and explain it aloud.',si:'මේ පිටුවෙන් topic එකක් තෝරලා හඬින් පැහැදිලි කරන්න.'},
  ],kind:'review'})];
}
