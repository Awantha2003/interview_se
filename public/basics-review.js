const minute = 60 * 1000;
const day = 24 * 60 * minute;
const intervals = [1,3,7,14,30];

export function scheduleReview(previous,rating,now=Date.now()) {
  const level=previous?.level??0;
  if(rating==='again') return {rating,level:0,due:now+10*minute};
  if(rating==='unsure') return {rating,level:Math.max(0,level-1),due:now+day};
  const next=Math.min(level+1,intervals.length);
  return {rating,level:next,due:now+intervals[next-1]*day};
}

export function reviewQueue(ids,history,now=Date.now()) {
  return ids.filter(id=>history[id]?.due<=now).sort((a,b)=>history[a].due-history[b].due);
}

export function mockQuestions(groups,count=5,random=Math.random) {
  const pool=[...groups];
  const questions=[];
  while(pool.length&&questions.length<count) {
    const [group]=pool.splice(Math.floor(random()*pool.length),1);
    const index=Math.floor(random()*group.questions.length);
    questions.push(group.questions[index].id);
  }
  return questions;
}
