// Each row answers one interview question about both sides.
export const comparisons = {
  'props vs state': ['Props','State',[
    ['Where it comes from','Passed in by a parent component.','Owned by a component, often with useState.','Parent component එකෙන් ලැබෙන data.','Component එක තමන්ම useState වගේ hook එකකින් තියාගන්න data.'],
    ['How it changes','The parent renders with a new value. Treat received props as read-only.','Call its setter to schedule another render.','Parent එක අලුත් value එකක් pass කරනවා. ලැබුණු prop එක edit කරන්න එපා.','Setter එක call කරලා නැවත render එකක් schedule කරනවා.'],
    ['Juice shop example','name="Mango juice" tells the card what to display.','quantity changes from 0 to 1 when Add one is clicked.','name="Mango juice" කියන්නේ card එකට දීපු drink නම.','Add one click කළාම quantity එක 0 ඉඳන් 1 වෙනවා.'],
  ]],
  'controlled vs uncontrolled inputs': ['Controlled','Uncontrolled',[
    ['Current value','React state drives value.','The DOM stores the value.','React state එක value එක පාලනය කරනවා.','DOM එක value එක තියාගන්නවා.'],
    ['Example','Update query in onChange to filter immediately.','Use defaultValue and read FormData on submit.','onChange එකේ query update කර filter කරන්න.','defaultValue දීලා submit වෙද්දී FormData කියවන්න.'],
  ]],
  'spa vs mpa': ['SPA','MPA',[
    ['Navigation','Client-side router changes the view in the current document.','Navigation typically requests a new HTML document.','Client router එක page එකේ view එක වෙනස් කරනවා.','Route එකකට යද්දී අලුත් HTML document එකක් load වෙනවා.'],
    ['Example','Dashboard tabs share one page shell.','A traditional store loads a new page for checkout.','Dashboard tabs එකම shell එක share කරනවා.','සාම්ප්‍රදායික store එක checkout සඳහා අලුත් page එකක් load කරනවා.'],
  ]],
  'virtual dom vs real dom': ['React element tree','Browser DOM',[
    ['Role','Describes what the UI should look like.','Contains the actual browser nodes.','UI එක කොහොමද පේන්න ඕන කියලා විස්තර කරනවා.','Browser එක ඇත්තටම render කරන nodes තියෙනවා.'],
    ['Example','A render describes quantity 2.','React commits the updated text to the page.','Render එක quantity 2 කියලා විස්තර කරනවා.','React එක page එකේ text එක update කරනවා.'],
  ]],
  'context api vs prop drilling': ['Context','Prop drilling',[
    ['Data path','A consumer reads from the nearest provider.','Each intermediate component receives and forwards props.','Consumer එක ළඟම provider එකෙන් value කියවනවා.','අතරමැද components හැම එකම props pass කරනවා.'],
    ['When to use','Many distant controls need the same theme.','A nearby child needs the value and the path is easy to follow.','දුරින් තියෙන controls ගොඩකට theme එක ඕන නම්.','ළඟ child එකකට data එක ඕන නම්.'],
  ]],
  'method overloading vs overriding': ['Overloading','Overriding',[
    ['What changes','Parameter list varies under the same method name.','A subclass replaces the inherited implementation.','එකම නමට වෙනස් parameter lists.','Subclass එක inherited implementation එක වෙනස් කරනවා.'],
    ['Java example','print(String) and print(int).','ExpressDelivery overrides Delivery.fee().','print(String) සහ print(int).','ExpressDelivery එක Delivery.fee() override කරනවා.'],
    ['Dispatch','The compiler chooses an applicable signature.','Runtime dispatch chooses the instance implementation.','Compiler එක ගැළපෙන signature එක තෝරනවා.','Runtime එක actual object එකේ method එකට යනවා.'],
  ]],
  'abstract classes vs interfaces': ['Abstract class','Interface',[
    ['What it provides','Can share instance fields, constructors and implementation.','Defines a contract and may supply default methods.','Fields, constructors සහ implementation share කරන්න පුළුවන්.','Contract එකක් සහ අවශ්‍ය නම් default methods දෙන්න පුළුවන්.'],
    ['Example','Delivery holds a destination field.','Trackable requires trackingCode().','Delivery එක destination field එක තියාගන්නවා.','Trackable එක trackingCode() ඉල්ලනවා.'],
  ]],
  'static vs instance members': ['Static','Instance',[
    ['Owner','Belongs to the class.','Belongs to an object.','Class එකට අයිතියි.','එක් object එකකට අයිතියි.'],
    ['Example','Cart.MAX_ITEMS is shared.','cart.quantity differs for each cart.','Cart.MAX_ITEMS හැම cart එකටම පොදුයි.','cart.quantity එක් එක් cart එකට වෙනස්.'],
  ]],
  'is-a vs has-a': ['IS-A','HAS-A',[
    ['Relationship','A subtype fulfills a parent contract.','An object holds or uses another object.','Subtype එක parent contract එක රකිනවා.','Object එක තවත් object එකක් තියාගන්නවා හෝ භාවිත කරනවා.'],
    ['Example','An express delivery is a delivery.','Checkout has a payment method.','Express delivery එක delivery එකක්.','Checkout එකට payment method එකක් තියෙනවා.'],
  ]],
  'primitive and reference types': ['Primitive value','Object reference',[
    ['Assignment','Copies the value into a separate binding.','Copies a reference to the same object.','Value එක වෙනම binding එකකට copy වෙනවා.','එකම object එකට reference එක copy වෙනවා.'],
    ['Example','Increasing a copied number leaves the first number unchanged.','Editing the shared cart is visible from both variables.','Copy කරපු number එක වැඩි කළාට මුල් number එක එහෙමමයි.','Shared cart එක edit කළාම variables දෙකෙන්ම ඒක පේනවා.'],
  ]],
  'shallow vs deep copy': ['Shallow copy','Deep copy',[
    ['Nested objects','Still shared between the two outer objects.','Copied too, for supported values.','ඇතුළේ objects දෙකටම shared.','Support කරන nested values ද copy වෙනවා.'],
    ['JavaScript example','{...cart} copies the top level.','structuredClone(cart) copies nested cart items.','{...cart} top level එක copy කරනවා.','structuredClone(cart) nested items ද copy කරනවා.'],
  ]],
  '== vs ===': ['==','===',[
    ['Comparison','Allows type coercion under defined rules.','Compares without coercion.','Rules අනුව type convert කරන්න පුළුවන්.','Type convert කරන්නේ නැහැ.'],
    ['Example','0 == "0" is true.','0 === "0" is false.','0 == "0" true.','0 === "0" false.'],
  ]],
  'null vs undefined': ['null','undefined',[
    ['Typical meaning','Explicitly empty.','Missing or uninitialized.','හිතාමතාම හිස් කරපු value එකක්.','Value එකක් නැති හෝ තවම initialize නොකළ එකක්.'],
    ['Example','selectedDrink = null on clear.','cart.missingProperty evaluates to undefined.','Selection එක clear කළාම selectedDrink = null.','Cart එකේ නැති property එකක් undefined.'],
  ]],
  'flexbox vs grid': ['Flexbox','Grid',[
    ['Layout','One main axis at a time.','Rows and columns together.','වරකට main axis එකක්.','Rows සහ columns එකට.'],
    ['Example','Align buttons in a toolbar.','Arrange product cards in columns and rows.','Toolbar buttons පෙළගස්වන්න.','Product cards rows සහ columns වල සකසන්න.'],
  ]],
  'margin vs padding': ['Margin','Padding',[
    ['Where','Outside the border.','Inside the border.','Border එකට පිටින්.','Border එකට ඇතුළෙන්.'],
    ['Example','Separate two cards.','Place space between a card border and its text.','Cards දෙකක් වෙන් කරන්න.','Card border එකත් text එකත් අතර ඉඩ දෙන්න.'],
  ]],
  'linear and binary search': ['Linear search','Binary search',[
    ['Input','Sorted or unsorted.','Sorted or otherwise monotonic.','Sorted හෝ unsorted දෙකම.','Sorted හෝ monotonic order එකක් ඕන.'],
    ['Worst case','O(n) comparisons.','O(log n) comparisons with indexed access.','O(n) comparisons.','Index access එක්ක O(log n) comparisons.'],
  ]],
  'bfs and dfs': ['Breadth-first search','Depth-first search',[
    ['Visit order','Neighbors first, one level at a time.','Follow a branch before backtracking.','Level එක බැගින් ළඟ nodes බලනවා.','එක් branch එකක් ඔස්සේ ගිහින් පස්සේ ආපහු එනවා.'],
    ['Structure','Queue.','Stack or recursion.','Queue එකක්.','Stack හෝ recursion.'],
  ]],
  'where vs having': ['WHERE','HAVING',[
    ['When','Filters source rows before grouping.','Filters the grouped results.','Group කරන්න කලින් rows filter කරනවා.','Group හදපු පස්සේ groups filter කරනවා.'],
    ['Example','WHERE status = \'paid\'','HAVING COUNT(*) >= 2','Paid orders විතරක් තෝරන්න.','Orders දෙකක් හෝ වැඩි groups ගන්න.'],
  ]],
  'authentication vs authorization': ['Authentication','Authorization',[
    ['Question','Who is the caller?','May the caller access this resource?','Caller කවුද?','මේ resource එකට access තියෙනවද?'],
    ['Example','Verify the current sign-in session.','Check that the caller owns the booking.','Sign-in session එක තහවුරු කරන්න.','Booking එක caller ගේද බලන්න.'],
  ]],
  'pull vs fetch': ['git pull','git fetch',[
    ['Local branch','Fetches and integrates into the current branch.','Downloads remote updates without integrating.','Fetch කරලා current branch එකට integrate කරනවා.','Remote updates ගන්නවා. Current branch එකට integrate කරන්නේ නැහැ.'],
    ['When','You are ready to integrate the configured upstream.','You want to inspect incoming changes first.','Upstream changes integrate කරන්න සූදානම් නම්.','Incoming changes කලින් බලන්න ඕන නම්.'],
  ]],
  'merge vs rebase': ['Merge','Rebase',[
    ['History','Integrates histories, sometimes with a merge commit.','Replays commits on a new base and changes their IDs.','Histories එකතු කරනවා. සමහර විට merge commit එකක් හදනවා.','Commits අලුත් base එකක් මත replay කරනවා. IDs වෙනස් වෙනවා.'],
    ['Example','Integrate a shared feature branch.','Update a private feature branch before review.','Shared feature branch එකක් integrate කරන්න.','Review කලින් private feature branch එක update කරන්න.'],
  ]],
  'process vs thread': ['Process','Thread',[
    ['Memory','Has its own virtual address space.','Shares the process address space with its peers.','තමන්ගේ virtual address space එකක් තියෙනවා.','එකම process එකේ threads address space එක share කරනවා.'],
    ['Example','Two independently started applications.','Two workers coordinating one application’s memory.','වෙන වෙනම start කළ apps දෙකක්.','App එකක memory share කරන workers දෙකක්.'],
  ]],
  'tcp vs udp': ['TCP','UDP',[
    ['Delivery','Reliable ordered byte stream.','Datagrams without built-in reliable ordering.','පිළිවෙළට ලැබෙන reliable byte stream එකක්.','Built-in reliable ordering නැති datagrams.'],
    ['Example','A conventional SSH session.','A real-time voice application may use UDP.','සාමාන්‍ය SSH session එකක්.','Real-time voice app එකක් UDP භාවිත කරන්න පුළුවන්.'],
  ]],
  'build vs runtime': ['Build','Runtime',[
    ['When','Creates the deployable artifacts.','Serves or executes the deployed application.','Deploy කරන artifacts හදන වෙලාව.','Deploy කරපු app එක සේවය කරන හෝ execute කරන වෙලාව.'],
    ['Example','Bundle the React application into JavaScript assets.','The browser executes the delivered JavaScript.','React app එක JS assets වලට bundle කරනවා.','Browser එක ලැබුණු JS ක්‍රියාත්මක කරනවා.'],
  ]],
};

// Compact comparisons for course topics whose main distinction fits one row.
const short = [
 ['Pass by value vs reference semantics','Value argument','Reference parameter','The callee receives a copy, which may be a copy of an object reference. Java and JS use this model.','The callee can assign through the caller’s variable, as in C# ref parameters.','Callee එකට value copy එකක් ලැබෙනවා. ඒක object reference එකක් වුණත් copy වෙනවා.','C# ref වගේ parameter එකකින් caller ගේ variable එකටම assign කරන්න පුළුවන්.'],
 ['Stack vs heap','Call stack','Heap','Tracks active calls and their frames.','Holds allocated objects whose lifetime can extend beyond a call.','දැනට run වෙන calls සහ frames තියාගන්නවා.','Function call එකෙන් පසුවත් පවතින allocated objects තියාගන්න පුළුවන්.'],
 ['Mutable vs immutable data','Mutable','Immutable','Can change in place, like a JavaScript array with push().','Operations return another value, like string.toUpperCase().','Array එකට push කරනවා වගේ තිබුණු value එකම වෙනස් කරන්න පුළුවන්.','String එකට toUpperCase() කළාම වෙනත් value එකක් ලැබෙනවා.'],
 ['Compiled vs interpreted languages','Compilation','Interpretation','Translates code into another representation, such as Java bytecode.','Executes a representation directly. A runtime can use both approaches.','Java bytecode වගේ වෙනත් representation එකකට code translate කරනවා.','Representation එක කෙළින්ම execute කරනවා. Runtime එකකට ක්‍රම දෙකම භාවිත කරන්න පුළුවන්.'],
 ['id vs class','id','class','Identifies one element in the document.','Groups elements that can share styles or behavior.','Document එකේ එක් element එකක් හඳුනාගන්නවා.','Styles හෝ behavior share කරන elements group කරනවා.'],
 ['div vs span','div','span','Generic grouping element, block by default.','Generic wrapper for phrasing content, inline by default.','සාමාන්‍ය group element එකක්. Default block.','Text කොටසක් වටේ දාන්න පුළුවන්. Default inline.'],
 ['Block vs inline elements','Block box','Inline box','Starts a new line in normal flow.','Runs along a line of text in normal flow.','සාමාන්‍ය flow එකේ අලුත් line එකක පටන් ගන්නවා.','Text line එක එක්කම යනවා.'],
 ['GET vs POST forms','GET form','POST form','Encodes fields in the URL query. Use for search.','Sends fields in the request body. Use for creating a booking.','Fields URL query එකට යනවා. Search එකකට ගැළපෙනවා.','Fields request body එකට යනවා. Booking එකක් හදන්න යොදන්න.'],
 ['Visibility vs display','visibility: hidden','display: none','Hides the box while keeping its layout space.','Removes the box from layout.','Box එක නොපෙනුණත් layout ඉඩ තියෙනවා.','Box එක layout එකෙන්ම අයින් වෙනවා.'],
 ['Interfaces vs type aliases','Interface','Type alias','Describe structures and allow declaration merging.','Can name unions, primitives and other type expressions.','Structure එකක් විස්තර කර declaration merge කරන්නත් පුළුවන්.','Union, primitive සහ වෙනත් type expressions වලට නමක් දෙන්න පුළුවන්.'],
 ['Server vs client components','Server components','Client components','Run on the server and can access server-only dependencies.','Can use browser event handlers and React state. May also be pre-rendered.','Server එකේ run වෙලා server-only dependencies භාවිත කරන්න පුළුවන්.','Browser event handlers සහ React state භාවිත කරන්න පුළුවන්. Pre-render වෙන්නත් පුළුවන්.'],
 ['UI vs UX','UI','UX','The controls and presentation the user sees.','How clearly and effectively the user completes a task.','User ට පේන controls සහ presentation එක.','Task එක පැහැදිලිව සහ පහසුවෙන් කරන්න පුළුවන්ද කියන experience එක.'],
 ['Monolith vs microservices','Monolith','Microservices','Deploys as one application unit.','Services can deploy independently and communicate over boundaries.','එක application unit එකක් විදිහට deploy වෙනවා.','Services වෙන වෙනම deploy වෙලා boundaries හරහා සන්නිවේදනය කරනවා.'],
 ['Stateless vs stateful services','Stateless service','Stateful service','Can handle a request without stored history in that instance.','Retains state relevant to later operations.','ඒ instance එකේ request history නැතිව request එක handle කරන්න පුළුවන්.','ඊළඟ operations සඳහා අදාළ state එක තියාගන්නවා.'],
 ['HTTP vs HTTPS','HTTP','HTTPS','Application protocol without built-in transport encryption.','Uses TLS to protect HTTP traffic and authenticate the server.','Built-in transport encryption නැති application protocol එක.','TLS වලින් HTTP traffic ආරක්ෂා කර server identity තහවුරු කරනවා.'],
 ['WebSockets vs polling','WebSockets','Polling','Keeps a two-way connection open for messages.','Clients request fresh information at intervals.','Messages හුවමාරු කරන්න two-way connection එක open තියාගන්නවා.','Client එක කාල පරතරයකින් නැවත status ඉල්ලනවා.'],
 ['npm and modules (CommonJS vs ESM)','CommonJS','ES modules','Uses require() and module.exports.','Uses import and export.','require() සහ module.exports යොදනවා.','import සහ export යොදනවා.'],
 ['Exceptions: checked vs unchecked','Checked exceptions','Unchecked exceptions','Java requires callers to catch or declare them.','Java does not require catch or declaration.','Java වල catch කරන්න හෝ throws වලින් declare කරන්න ඕන.','Java වල catch හෝ declare කරන්න අනිවාර්ය නැහැ.'],
 ['Equals vs ==','equals','==','For objects, can compare logical content.','For objects, compares reference identity.','Objects වල logical content compare කරන්න පුළුවන්.','Objects වල එකම reference එකද බලනවා.'],
 ['ArrayList vs LinkedList','ArrayList','LinkedList','Resizable array with constant-time indexed access.','Linked nodes. Indexed access requires traversal.','Resize වෙන array එකක්. Index එකෙන් ඉක්මනින් access කරන්න පුළුවන්.','Linked nodes තියෙනවා. Index එකකට යන්න nodes ඔස්සේ යන්න ඕන.'],
 ['HashMap vs HashSet','HashMap','HashSet','Pairs each key with a value.','Stores distinct elements.','Key එකකට value එකක් තියාගන්නවා.','Distinct elements තියාගන්නවා.'],
 ['Spring vs Spring Boot','Spring Framework','Spring Boot','Provides core application infrastructure such as dependency injection.','Uses Spring and adds auto-configuration and starter dependencies.','Dependency injection වගේ app infrastructure දෙනවා.','Spring එක්ක auto-configuration සහ starter dependencies දෙනවා.'],
 ['Lazy vs eager loading','Lazy','Eager','Fetch related data when accessed, subject to the mapping/session.','Load the association as required by the eager mapping.','සම්බන්ධ data access කරනකොට load කරනවා.','Eager mapping එකට අනුව association එක කලින් ගන්නවා.'],
 ['UNION vs UNION ALL','UNION','UNION ALL','Combines results and removes duplicate rows.','Combines results and keeps duplicate rows.','Results එකතු කර duplicate rows අයින් කරනවා.','Results එකතු කර duplicate rows තියාගන්නවා.'],
 ['SQL vs NoSQL','Relational SQL databases','NoSQL databases','Model relations and commonly use joins and constraints.','Cover document, key-value and other models with different access patterns.','Tables අතර relations, joins සහ constraints යොදනවා.','Document, key-value වගේ වෙනස් models තියෙනවා.'],
 ['Embedded vs referenced documents','Embedded','Referenced','Stores related data inside the parent document.','Stores an ID that links to a separate document.','Related data parent document එක ඇතුළේ තියාගන්නවා.','වෙනම document එකකට link වන ID එකක් තියාගන්නවා.'],
 ['Access vs refresh tokens','Access token','Refresh token','Authorizes calls to an API.','Obtains new access tokens through the authorization server.','API calls සඳහා අවසර දෙනවා.','Authorization server එකෙන් අලුත් access tokens ගන්න යොදනවා.'],
 ['Password hashing vs encryption','Password hashing','Encryption','Uses a one-way, slow password verifier.','Transforms data so an authorized key holder can recover it.','Slow one-way verifier එකක් හදනවා.','Authorized key එක තියෙන කෙනෙකුට data ආපහු ලබාගන්න පුළුවන්.'],
 ['OAuth 2.0 vs OpenID Connect','OAuth 2.0','OpenID Connect','Delegates access to an application.','Adds an identity layer with an ID token.','Application එකකට delegated access දෙනවා.','ID token එකක් එක්ක identity layer එකක් එකතු කරනවා.'],
 ['Git vs GitHub','Git','GitHub','Version control that works locally.','Hosts Git repositories and collaboration features.','Localව වැඩ කරන version control system එක.','Git repositories සහ collaboration features host කරනවා.'],
 ['Reset vs revert','git reset','git revert','Moves the branch or updates local state depending on usage.','Creates a new commit that undoes a prior change.','Usage එක අනුව branch එක move කරනවා හෝ local state update කරනවා.','පරණ වෙනස undo කරන අලුත් commit එකක් හදනවා.'],
 ['Functional vs non-functional requirements','Functional','Non-functional','Defines what the system does, such as reserving a seat.','Defines a quality or constraint, such as a latency target.','Seat එකක් reserve කරනවා වගේ system එක කරන වැඩ.','Latency target එකක් වගේ ගුණාංග හෝ සීමා.'],
 ['Waterfall vs Agile','Waterfall','Agile','Plans work in largely sequential phases.','Delivers iteratively and adapts to feedback.','වැඩ බොහෝවිට පිළිවෙළට phases වලින් යනවා.','Iterations වලින් deliver කර feedback අනුව වෙනස් වෙනවා.'],
 ['Functional vs non-functional testing','Functional testing','Non-functional testing','Checks visible behavior against requirements.','Checks qualities such as response time or accessibility.','Requirements අනුව behavior එක check කරනවා.','Response time හෝ accessibility වගේ qualities check කරනවා.'],
 ['Black-box vs white-box testing','Black-box','White-box','Derive tests from the external contract.','Use knowledge of internal branches and structure.','පිටින් පේන contract එකෙන් tests හදනවා.','ඇතුළේ branches සහ structure දැනගෙන tests හදනවා.'],
 ['Concurrency vs parallelism','Concurrency','Parallelism','Handles multiple overlapping tasks.','Executes tasks at the same instant.','එකිනෙකට overlap වන වැඩ manage කරනවා.','එකම මොහොතේ වැඩ කිහිපයක් execute කරනවා.'],
 ['LAN vs WAN','LAN','WAN','Connects devices in a local area.','Connects networks across a wider area.','ළඟ ප්‍රදේශයක devices සම්බන්ධ කරනවා.','විශාල ප්‍රදේශයක networks සම්බන්ධ කරනවා.'],
 ['Proxy vs reverse proxy','Forward proxy','Reverse proxy','Sits in front of clients.','Sits in front of servers.','Clients ඉස්සරහින් requests යවනවා.','Servers ඉස්සරහින් requests භාර ගන්නවා.'],
 ['Latency vs bandwidth','Latency','Bandwidth','Time it takes for data or a response to arrive.','Capacity to carry data per unit of time.','Response එක එන්න යන කාලය.','කාල ඒකකයකට යවන්න පුළුවන් data ප්‍රමාණය.'],
 ['CI vs CD','Continuous integration','Continuous delivery / deployment','Regularly integrates changes and runs checks.','Keeps changes releasable or automatically deploys them.','Changes නිතර integrate කර checks run කරනවා.','Changes release කරන්න සූදානම් තියාගන්නවා හෝ auto deploy කරනවා.'],
 ['Scalability vs availability','Scalability','Availability','Ability to accommodate growing workload.','Ability to remain usable when requested.','වැඩ වැඩි වෙද්දී ඒ load එක handle කරන හැකියාව.','ඉල්ලූ වෙලාවට service එක භාවිත කළ හැකි වීම.'],
 ['Vertical vs horizontal scaling','Vertical','Horizontal','Give one instance more CPU or memory.','Add more instances.','එක් instance එකකට CPU හෝ memory වැඩි කරන්න.','Instances ගණන වැඩි කරන්න.'],
 ['React Native vs React web','React Native','React web','Render native mobile UI with elements such as View.','Render browser UI with elements such as div.','View වගේ elements වලින් native mobile UI render කරනවා.','div වගේ elements වලින් browser UI render කරනවා.'],
 ['Sandbox vs production','Sandbox','Production','Uses test credentials and simulated payments.','Uses live credentials and can charge actual funds.','Test credentials සහ simulated payments.','Live credentials සහ ඇත්ත මුදල් ගෙවීම්.'],
 ['Callback vs webhook','Browser return','Webhook','Returns the customer to the app after payment.','Notifies the server directly about an event.','Payment පස්සේ customer app එකට ආපහු යවනවා.','Event එකක් ගැන server එකට කෙළින්ම දැනුම් දෙනවා.'],
];
for (const [name,left,right,enLeft,enRight,siLeft,siRight] of short) {
  comparisons[name.toLowerCase()]=[left,right,[['Main difference',enLeft,enRight,siLeft,siRight]]];
}
comparisons['primitive vs reference types']=comparisons['primitive and reference types'];
comparisons['sql vs nosql tradeoffs']=comparisons['sql vs nosql'];
comparisons['group by and having']=comparisons['where vs having'];
comparisons['any vs unknown vs never'] = ['any','unknown',[
  ['Meaning','Bypasses type checks for the value.','Allows any input, but use requires narrowing.','Value එකේ type checks බොහොමයක් මඟහරිනවා.','ඕනෑම input එකක් ගන්නවා. භාවිතයට කලින් type narrow කරන්න ඕන.','Represents values that cannot occur.','සිදුවිය නොහැකි values නියෝජනය කරනවා.'],
  ['Example','A legacy untyped integration.','An API payload before validation.','පරණ untyped integration එකක්.','Validate කිරීමට පෙර API payload එක.','An unreachable branch in an exhaustive switch.','Exhaustive switch එකක reach කරන්න බැරි branch එක.'],
],'never'];
comparisons['local vs global vs server state'] = ['Local','Global',[
  ['Owner','One component or a small subtree.','Shared by several parts of the application.','Component එකක් හෝ ළඟ subtree එකක්.','Application එකේ කොටස් කිහිපයක් share කරනවා.','A remote source of truth, with optional client caching.','Remote source එකේ data. Client එකේ cache කරන්න පුළුවන්.'],
  ['Example','The text in a search field.','A cart quantity shared by menu and checkout.','Search field එකේ text එක.','Menu සහ checkout share කරන cart quantity එක.','Stock fetched for a selected store.','Selected store එකට API එකෙන් ගන්න stock.'],
],'Server'];
comparisons['database vs dbms vs rdbms'] = ['Database','DBMS',[
  ['Meaning','The stored collection of data.','Software that manages databases.','තියාගන්න data එකතුව.','Databases manage කරන software.','A DBMS based on the relational model.','Relational model එක භාවිත කරන DBMS එකක්.'],
  ['Example','The orders and products database.','The software that stores and queries that data.','Orders සහ products database එක.','ඒ data store සහ query කරන software.','PostgreSQL, with relations and constraints.','Relations සහ constraints තියෙන PostgreSQL.'],
],'RDBMS'];
