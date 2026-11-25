// Sinhala explanations for the beginner path, in checklist order.
export const starterGuidesSi = [
`Variable එකක් කියන්නේ value එකකට දෙන නමක්. වෙනස් වන soldCount එකට let යොදන්න. වෙනත් value එකක් assign කරන්න බැරි menuName binding එකට const යොදන්න.
Scope එකෙන් නම භාවිත කරන්න පුළුවන් කොහෙද කියනවා. Lifetime එකෙන් එහි value එක කොච්චර කල් reachable ද කියනවා. Callback එකකට පිටත count එක තියාගන්න පුළුවන්.
Number එක copy කළාම වෙනම quantity එකක් ලැබෙනවා. Object එක assign කළාම දෙන්නාම එකම object එක බලනවා. උඩ juice cart එක පියවරෙන් පියවර බලන්න.
Array එකට පිළිවෙළක් තියෙනවා. items[0] කියන්නේ පළමු item එක. String එක text එකක්. JavaScript වල මුල් string එකේ අකුරු වෙනස් කරන්න බැහැ.
Operators වල precedence එකෙන් මුලින් කරන්නේ මොන calculation එකද තීරණය කරනවා. 2 + 3 * 4 = 14. (2 + 3) * 4 = 20.
Recursion වලදී function එක පොඩි problem එකක් සඳහා තමන්ව නැවත call කරනවා. factorial(1) දී තව call නොකර නවතිනවා.
Conversion එකෙන් value එක වෙනත් type එකකට හරවනවා. Number("12") වලින් number 12 ලැබෙනවා. Type assertion එකක් විතරක් runtime data වෙනස් කරන්නෙ නැහැ.
JavaScript function එකට යන්නේ value එකක්. Object එකක් නම් එය හඳුන්වන reference value එක යනවා. Parameter එක reassign කළාට caller ගේ variable වෙනස් වෙන්නේ නැහැ. Shared object එක edit කළාම ඒ වෙනස පේනවා.
Input කියන්නේ program එකට ලැබෙන දේ. Output කියන්නේ එය ලබා දෙන දේ. Checkout එක quantity එක ගෙන total එක return කරනවා.
වැඩක් fail නම් throw හෝ reject කරන්න. Recover කරන්න හෝ user ට පැහැදිලි error එකක් දෙන්න පුළුවන් තැන catch කරන්න. Stock නැත්නම් ඒ බව කියන්න.
Condition එකකින් මොන branch එක run කරන්නද තෝරනවා. Stock 0 නම් buy button එක disable කරන්න. වෙනස් statuses කිහිපයකට switch එකක් ගැළපෙන්න පුළුවන්.
දැනට run වෙන function calls වලට call frames තියෙනවා. Object එකක් තව reference තියෙන තුරු ඒ calls වලට වඩා දිගට ජීවත් වෙන්න පුළුවන්.
පිළිවෙළින් ගණන් කරනකොට for. Condition එක true වන තාක් while. අවම වශයෙන් එක වරක් run කරන්න do-while.
Mutable object එක එතැනම වෙනස් කරන්න පුළුවන්. Array එකකට push කරන්න පුළුවන්. String එකේ toUpperCase() අලුත් result එකක් දෙනවා.
Function එකක් නැවත භාවිත කළ හැකි වැඩක් එකට තියාගන්නවා. total(quantity, price) වල quantity සහ price parameters.
Compiler එක code වෙනත් representation එකකට හරවනවා. Interpreter එක representation එක execute කරනවා. Java bytecode එක JVM එකෙන් interpret හෝ JIT compile කරන්න පුළුවන්.
return එක function එක අවසන් කර result එක caller ට දෙනවා. උදාහරණයකට quantity × price return කරන්න.
Breakpoint එකක් තියා code එක line එකෙන් line එකට බලන්න. Discount එක apply කරන්න කලින් සහ පස්සේ total එක compare කරන්න.`,
`Class එක හැඩය සහ behavior එක නියම කරනවා. Object එක ඒ class එකේ instance එකක්. Cart instances දෙකක් වෙනම orders තියාගන්නවා.
Access modifiers වලින් class එකෙන් පිට අයට භාවිත කරන්න පුළුවන් fields සහ methods නියම කරනවා. Wallet balance එක private තියා deposit method එකක් දෙන්න.
Constructor එක object එකේ මුල් state එක හදනවා. new Cart(customerId) කියන්නේ customer කෙනෙකුට අලුත් cart එකක්.
Static member එක class එකට අයිතියි. Instance member එක එක් object එකකට අයිතියි. Cart.maxItems සහ cart.items compare කරන්න.
Encapsulation වලින් state එක methods හරහා පාලනය කරනවා. addItem එකට negative quantity එකක් ආවොත් cart එක වෙනස් කිරීමට පෙර reject කරන්න.
Instance method එකක this කියන්නේ දැනට භාවිත කරන object එක. super එකෙන් parent constructor හෝ method එකට යන්න පුළුවන්.
Abstraction වලින් අවශ්‍ය behavior එක විතරක් ඉස්සරහට දෙනවා. Checkout එක pay(amount) දන්නවා. Card provider එකේ ඇතුළේ steps දැනගන්න ඕන නැහැ.
Association එක objects අතර link එකක්. Aggregation වල parts වෙනමත් පවතිනවා, team එකේ players වගේ. Composition වල whole එක parts අයිති කරගන්නවා, order එකේ lines වගේ.
Inheritance වල subclass එක parent behavior එක ලබාගන්නවා. ExpressDelivery එක Delivery contract එක රකිනවා නම් subtype එකක් වෙන්න පුළුවන්.
CardPayment එක Payment එකක්. Checkout එකට Payment එකක් තියෙනවා. පළමුවැන්න IS-A, දෙවැන්න HAS-A.
එකම pay(amount) call එක card සහ wallet වලදී වෙනස් implementation වලට යනවා. ඒක polymorphism.
Service ඇතුළේ repository හදනවා වෙනුවට constructor එකෙන් දෙන්න. Test එකකට fake repository එකක් දාන්න පුළුවන්.
Overload එකේ නම එකයි, parameters වෙනස්. Override එකේ subclass එක inherited method එකට වෙනත් implementation එකක් දෙනවා.
Coupling කියන්නේ components එකිනෙකට කොච්චර depend ද කියන එක. Cohesion කියන්නේ එක් component එකේ වැඩ එකිනෙකට කොච්චර සම්බන්ධද කියන එක.
Interface එක contract එකක් නියම කරනවා. Abstract class එකකට ඒ එක්ක shared state සහ implementation තියාගන්නත් පුළුවන්.`,
`Array එකක් ordered items තියාගන්නවා. Index 0 පළමුවැන්න. Dense array එකේ මුලට insert කරද්දී අනිත් items shift වෙන්න පුළුවන්.
Binary search tree එකේ කුඩා keys වමට, විශාල keys දකුණට. Root 8 නම් 12 හොයන්න දකුණට යන්න.
String එක text sequence එකක්. Emoji වගේ visible character එකක් Unicode code points කිහිපයකින් හැදෙන්න පුළුවන්.
Heap එක priority වැඩි හෝ අඩු item එක root එකේ තියාගන්නවා. Priority queue එකෙන් urgent order එක කලින් ගන්න පුළුවන්.
Linked list එක nodes pointers වලින් සම්බන්ධ කරනවා. Doubly linked නම් ඉස්සරහටයි පස්සටයි දෙපැත්තට යන්න පුළුවන්.
Graph එක nodes සහ edges වලින් සම්බන්ධතා පෙන්වනවා. Railway stations nodes. Direct routes edges.
Stack එකේ අන්තිමට දැම්ම දේ මුලින් එළියට එනවා. අන්තිම edit එක මුලින් undo කරනවා වගේ.
Adjacency list එක node එකේ neighbors තියාගන්නවා. Matrix එකෙන් node pairs හැම එකකටම cell එකක් දෙනවා. Connections අඩු graph එකකට list එක ඉඩ ඉතිරි කරනවා.
Queue එක මුලින් ආපු order එක මුලින් ගන්නවා. Deque එක දෙකෙළවරින්ම add සහ remove කරන්න දෙනවා.
Trie එක වචනවල පොදු prefixes share කරනවා. PRE යටතේ PREP සහ PREVIEW හොයන්න පුළුවන්.
Map එක key එකකට value එකක් දෙනවා. Set එක unique keys තියාගන්නවා. SKU එකෙන් stock ගන්න map. Scan කළ ticket IDs තියාගන්න set.
නිතර කරන operation එක අනුව structure එක තෝරන්න. Index access සඳහා array, arrival order සඳහා queue, ID lookup සඳහා map.`,
`Big O වර්ධනයට upper bound එකක්. Omega lower bound එකක්. Theta tight bound එකක්. හැම item එකක්ම එක් වරක් බලන pass එක Theta(n).
Sliding window එක contiguous range එකක් move කරනවා. දවස් තුනක total එකට එළියට යන day value එක අඩු කර ඇතුළට එන value එක එකතු කරන්න.
Time complexity වැඩ ප්‍රමාණය වර්ධනය වෙන හැටි. Space complexity memory වර්ධනය වෙන හැටි. Counter එකක් එක්ක full scan එක O(n) time, O(1) extra space.
Map එකක counts දාන්න. mango, lime, mango කියවද්දී mango:2 සහ lime:1 ලැබෙනවා.
Linear search එකේ best case පළමු item එක. Worst case target එක නැති නිසා හැම item එකම බලනවා. Average එකට input distribution එකක් ඕන.
BFS queue එකෙන් layer එක බැගින් බලනවා. Unweighted graph එකක කෙටිම route එකට එය ගැළපෙනවා. DFS branch එකක ගැඹුරට යනවා.
Linear search ඕනෑම array එකක් scan කරනවා. Binary search sorted range එක නැවත නැවත අඩක් කරනවා.
Greedy එක දැනට හොඳම choice එක තෝරනවා. Overlap නොවන meetings වැඩිම ගණනක් තෝරන්න ඉක්මනින් ඉවර වන meeting එක තෝරන rule එක වැඩ කරනවා.
Bubble sort neighbors swap කරනවා. Selection sort ඊළඟ minimum එක තෝරනවා. Insertion sort ඊළඟ value එක sorted කොටසට දානවා.
Dynamic programming එක නැවත ලැබෙන පොඩි problems වල results මතක තියාගන්නවා. පඩිපෙළක් නගින ways ගණන කලින් පඩි දෙකේ results වලින් ගන්න පුළුවන්.
Merge sort බෙදලා නැවත sorted කොටස් එකතු කරනවා. Quicksort pivot එක වටේ partition කරනවා. නරක pivots දිගටම ආවොත් O(n²).
Backtracking choice එකක් try කරලා ඉදිරි පියවර fail නම් ඒ choice එක undo කරනවා. Sudoku එකකට candidate එක දාලා බලනවා වගේ.
Recursion එකට නවත්වන case එකක් ඕන. ඒ case එක ළඟට යන්න හැම call එකේම input එක වෙනස් වෙන්න ඕන.
Dry run එකේ හැම පියවරකම values ලියන්න. Binary search සඳහා හිස් array එක, එක item එක සහ නැති target එක check කරන්න.
Two pointers වල indices දෙකක් move කරනවා. Sorted array එකේ sum එක අඩු නම් left index එක ඉදිරියට ගෙන එන්න.`,
].map(guide=>guide.split('\n'));
