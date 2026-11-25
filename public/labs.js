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

labs.push(
  {id:'reverse',lesson:32,name:'Reverse a delivery code',lang:'JavaScript',goal:'Reverse MANGO without changing the original code.',si:'මුල් code එක වෙනස් නොකර MANGO ආපස්සට හරවන්න.',code:`function reverseCode(code) {
  const characters = Array.from(code);
  characters.reverse();
  return characters.join('');
}

console.log(reverseCode('MANGO'));`,out:'OGNAM'},
  {id:'frequency',lesson:32,name:'Count fruit orders',lang:'JavaScript',goal:'Count how many times each fruit appears in the order list.',si:'Order list එකේ එක් එක් fruit එක කී වරක් තියෙනවද ගණන් කරන්න.',code:`function countOrders(fruits) {
  const counts = new Map();
  for (const fruit of fruits) {
    counts.set(fruit, (counts.get(fruit) ?? 0) + 1);
  }
  return Object.fromEntries(counts);
}

console.log(countOrders(['mango', 'lime', 'mango']));`,out:'{"mango":2,"lime":1}'},
  {id:'anagram',lesson:32,name:'Compare two scrambled words',lang:'JavaScript',goal:'Check whether listen and silent contain the same letters.',si:'listen සහ silent වල අකුරු ගණන සහ වර්ග සමානද බලන්න.',code:`function sortedLetters(word) {
  return [...word.toLowerCase()].sort().join('');
}

function isAnagram(first, second) {
  return sortedLetters(first) === sortedLetters(second);
}

console.log(isAnagram('listen', 'silent'));
console.log(isAnagram('mango', 'lemon'));`,out:'true\nfalse'},
  {id:'merge-sorted',lesson:32,name:'Merge two sorted price lists',lang:'JavaScript',goal:'Merge two sorted lists by repeatedly taking the smaller price.',si:'List දෙකේ ඉදිරි prices දෙකෙන් අඩු එක ගනිමින් sorted list එකක් හදන්න.',code:`function mergePrices(first, second) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    if (first[i] <= second[j]) merged.push(first[i++]);
    else merged.push(second[j++]);
  }
  return merged.concat(first.slice(i), second.slice(j));
}

console.log(mergePrices([100, 250, 400], [150, 300]));`,out:'[100,150,250,300,400]'},
  {id:'missing',lesson:32,name:'Find a missing ticket number',lang:'JavaScript',goal:'Find the one missing number in an otherwise complete range from 1 to n.',si:'1 ඉඳන් n වෙනකම් තියෙන ticket numbers වල නැති එක හොයන්න.',code:`function missingTicket(tickets) {
  const n = tickets.length + 1;
  const expected = n * (n + 1) / 2;
  const actual = tickets.reduce((sum, ticket) => sum + ticket, 0);
  return expected - actual;
}

console.log(missingTicket([1, 3, 4, 5]));`,out:'2'},
  {id:'second-largest',lesson:32,name:'Find the second-highest distinct score',lang:'JavaScript',goal:'Find the second-highest score without counting a tie twice.',si:'Tie එකක් දෙවරක් ගන්නේ නැතුව දෙවැනි වැඩිම score එක හොයන්න.',code:`function secondHighest(scores) {
  const ranked = [...new Set(scores)].sort((a, b) => b - a);
  return ranked[1] ?? null;
}

console.log(secondHighest([95, 95, 81, 70]));
console.log(secondHighest([95, 95]));`,out:'81\nnull'},
  {id:'fizzbuzz',lesson:32,name:'Write FizzBuzz in order',lang:'JavaScript',goal:'Print a special label for multiples of 3, 5, or both.',si:'3ට, 5ට, හෝ දෙකටම බෙදෙන numbers වලට label එකක් දෙන්න.',code:`function label(number) {
  if (number % 15 === 0) return 'FizzBuzz';
  if (number % 3 === 0) return 'Fizz';
  if (number % 5 === 0) return 'Buzz';
  return String(number);
}

for (let number = 13; number <= 16; number++) {
  console.log(label(number));
}`,out:'13\n14\nFizzBuzz\n16'},
  {id:'prime',lesson:32,name:'Check whether a number is prime',lang:'JavaScript',goal:'Reject small inputs and test divisors only up to the square root.',si:'2ට අඩු values ඉවත් කර square root එක දක්වා divisors බලන්න.',code:`function isPrime(number) {
  if (!Number.isInteger(number) || number < 2) return false;
  for (let divisor = 2; divisor * divisor <= number; divisor++) {
    if (number % divisor === 0) return false;
  }
  return true;
}

console.log(isPrime(29));
console.log(isPrime(35));`,out:'true\nfalse'},
  {id:'fibonacci',lesson:32,name:'Build the Fibonacci sequence',lang:'JavaScript',goal:'Start at 0 and 1; each next value is the sum of the previous two.',si:'0 සහ 1 වලින් පටන් ගන්න. ඊළඟ value එක කලින් values දෙකේ එකතුවයි.',code:`function fibonacci(count) {
  const sequence = [];
  let previous = 0;
  let next = 1;
  while (sequence.length < count) {
    sequence.push(previous);
    [previous, next] = [next, previous + next];
  }
  return sequence;
}

console.log(fibonacci(7));`,out:'[0,1,1,2,3,5,8]'},
  {id:'duplicate-orders',lesson:21,name:'Find repeat customer records',lang:'SQL',goal:'Find customer IDs that appear more than once in the sample orders.',si:'Sample orders වල එක් වරකට වඩා පේන customer IDs හොයන්න.',code:`SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY customer_id;`,out:'customer_id | order_count\n1 | 2'},
);

labs.push({
  id:'cart-constructor',lesson:2,name:'Create two carts with a JavaScript constructor',
  lang:'JavaScript',
  goal:'Start a new cart with a customer name and zero drinks. Add drinks only to the first cart.',
  si:'Customer name එක සහ drinks 0ක් එක්ක cart එකක් හදන්න. පළමු cart එකට විතරක් drinks එකතු කරන්න.',
  code:`class Cart {
  constructor(customer) {
    this.customer = customer;
    this.quantity = 0;
  }

  addDrinks(quantity) {
    this.quantity += quantity;
  }

  summary() {
    return this.customer + ': ' + this.quantity;
  }
}

const nilaCart = new Cart('Nila');
const samCart = new Cart('Sam');
nilaCart.addDrinks(2);

console.log(nilaCart.summary());
console.log(samCart.summary());`,
  out:'Nila: 2\nSam: 0',
});
