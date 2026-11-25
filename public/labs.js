export const labs = [
 {id:'factorial', lesson:1, name:'Factorial recursion', lang:'JavaScript', goal:'Trace the recursive calls, then try factorial(5).', si:'Recursive calls trace කරලා factorial(5) try කරන්න.', code:`function factorial(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error('Use a non-negative integer');
  if (n < 2) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5));`, out:'120'},
 {id:'oop',lesson:2,name:'Polymorphic payment',lang:'JavaScript',goal:'Pass interchangeable payment objects to a checkout function.',si:'Checkout function එකට වෙනස් payment objects දෙකක් දෙන්න.',code:`class Card { pay(total) { return 'Card paid ' + total; } }
class Wallet { pay(total) { return 'Wallet paid ' + total; } }
const checkout = (method, total) => method.pay(total);
console.log(checkout(new Card(), 120));
console.log(checkout(new Wallet(), 120));`,out:'Card paid 120\nWallet paid 120'},
 {id:'sets',lesson:3,name:'Remove duplicates',lang:'JavaScript',goal:'Use a set and preserve first-seen order.',si:'මුලින් දුටු පිළිවෙළ රැකගෙන duplicates ඉවත් කරන්න.',code:`const names = ['Nila', 'Sam', 'Nila'];
console.log([...new Set(names)].join(', '));`,out:'Nila, Sam'},
 {id:'binary',lesson:4,name:'Binary search',lang:'JavaScript',goal:'Find a target in sorted input. Return -1 if absent.',si:'Sorted array එකක target එක හොයන්න. නැත්නම් -1 return කරන්න.',code:`function search(items, target) {
  let left = 0, right = items.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (items[mid] === target) return mid;
    if (items[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
console.log(search([1, 3, 5, 7, 9], 7));
console.log(search([1, 3, 5], 2));`,out:'3\n-1'},
 {id:'html',lesson:5,name:'Accessible login form',lang:'HTML',goal:'Preview the form, then use Tab to reach each labeled field.',si:'Form එක preview කර Tab key එකෙන් fields වෙත යන්න.',code:`<style>
  body { font: 16px system-ui; padding: 18px; }
  form { display: grid; gap: 10px; max-width: 320px; }
  input, button { padding: 8px; }
</style>
<form>
  <label for="email">Email</label>
  <input id="email" type="email" autocomplete="email" required>
  <label for="password">Password</label>
  <input id="password" type="password" autocomplete="current-password" required>
  <button type="submit">Sign in</button>
</form>`,out:'Two labeled fields and a Sign in button.'},
 {id:'grid',lesson:7,name:'Responsive grid',lang:'HTML',goal:'Change the minimum card size and resize the window.',si:'Card එකේ minimum size වෙනස් කරලා window width එක වෙනස් කරන්න.',code:`<style>
  main { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:12px; }
  article { background:#ffd400; padding:18px; font:16px system-ui; }
</style>
<main><article>HTML</article><article>CSS</article><article>JS</article></main>`,out:'Three yellow cards wrap to fit the available width.'},
 {id:'closure',lesson:8,name:'Closure counter',lang:'JavaScript',goal:'Predict the result for both counters.',si:'Counters දෙකේ output වෙන වෙනම predict කරන්න.',code:`function makeCounter() {
  let count = 0;
  return () => ++count;
}
const first = makeCounter();
const second = makeCounter();
console.log(first(), first(), second());`,out:'1 2 1'},
 {id:'event',lesson:9,name:'Event loop order',lang:'JavaScript',goal:'Predict the output before running the example.',si:'Example එක run කරන්න කලින් output order එක කියන්න.',code:`console.log('start');
setTimeout(() => console.log('timer'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
await new Promise(resolve => setTimeout(resolve, 10));`,out:'start\nend\npromise\ntimer'},
 {id:'sql',lesson:21,name:'SQL join and grouping',lang:'SQL',goal:'Join customers and paid orders. Use HAVING to keep repeat customers.',si:'Customers සහ paid orders JOIN කරන්න. Orders දෙකක් හෝ වැඩි customers HAVING වලින් ගන්න.',code:`SELECT c.name, COUNT(*) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.status = 'paid'
GROUP BY c.id, c.name
HAVING COUNT(*) >= 2
ORDER BY c.name;`,out:'name | orders\nNila | 2'},
 {id:'palindrome',lesson:32,name:'Palindrome',lang:'JavaScript',goal:'Normalize punctuation and compare a string to its reverse.',si:'Punctuation ඉවත් කර string එක reverse එකට සමානද බලන්න.',code:`function isPalindrome(text) {
  const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === [...normalized].reverse().join('');
}
console.log(isPalindrome('Never odd or even'));
console.log(isPalindrome('hello'));`,out:'true\nfalse'},
 {id:'two-sum',lesson:32,name:'Two sum',lang:'JavaScript',goal:'Return the two indices that add up to the target.',si:'Target එකට එකතු වන numbers දෙකේ indices return කරන්න.',code:`function twoSum(numbers, target) {
  const seen = new Map();
  for (const [index, value] of numbers.entries()) {
    if (seen.has(target - value)) return [seen.get(target - value), index];
    seen.set(value, index);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9));`,out:'[0,1]'},
 {id:'brackets',lesson:32,name:'Balanced brackets',lang:'JavaScript',goal:'Use a stack to validate nested brackets.',si:'Nested brackets නිවැරදිව close වෙනවද stack එකෙන් බලන්න.',code:`function balanced(input) {
  const stack = [];
  const closing = { ')': '(', ']': '[', '}': '{' };
  for (const char of input) {
    if ('([{'.includes(char)) stack.push(char);
    else if (closing[char] && stack.pop() !== closing[char]) return false;
  }
  return stack.length === 0;
}
console.log(balanced('([])'));
console.log(balanced('([)]'));`,out:'true\nfalse'}
];

labs.unshift({
  id:'shared-cart',lesson:1,name:'One cart, two screens',lang:'JavaScript',
  goal:'A customer screen and a cashier screen both use the same cart. Predict the two quantities after the cashier adds two juices.',
  si:'Customer screen එකයි cashier screen එකයි එකම cart එක භාවිත කරනවා. Cashier juices දෙකක් එකතු කළාම screens දෙකේ quantities guess කරන්න.',
  code:`const customerCart = { mangoJuices: 1 };
const cashierCart = customerCart;

cashierCart.mangoJuices += 2;

console.log("Customer sees:", customerCart.mangoJuices);
console.log("Cashier sees:", cashierCart.mangoJuices);`,
  out:'Customer sees: 3\nCashier sees: 3',
});
