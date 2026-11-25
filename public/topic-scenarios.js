// Each row is an input or situation, the change, and the visible result.
const scenarios = [
`Juice counter starts at 0 | Assign soldCount = 2 | Receipt shows 2 sold
Quantity declared inside if | Read it after the block | The name is out of scope
Customer and cashier share one cart | Cashier adds two juices | Both see quantity 3
Menu has Mango and Lime | Read menu[0] | Mango
2 + 3 * 4 | Multiply 3 × 4 first | 14
factorial(3) | Multiply 3 × 2 × 1 | 6
Quantity arrives as "12" | Apply Number("12") | Numeric value 12
Pass a cart object to a function | Add an item through the parameter | The caller sees the updated cart
Quantity 2 and unit price 250 | Multiply | Rs. 500
Stock is unavailable | Throw and catch the error | Show “Out of stock”
Order status is paid | Match the paid branch | Show the receipt
factorial(3) calls factorial(2) | Put the second call on top of the first | Return from the second call before the first
Three drinks in the cart | Run the loop once per drink | Print three labels
Original text is Mango | Call toUpperCase() | New text MANGO; original stays Mango
total takes quantity and price | Call total(2, 250) | 500
Main.java | Compile to bytecode | JVM can execute Main.class
Quantity 2 and price 250 | Return the total | Caller receives 500
Discount looks wrong | Pause before applying it and inspect total | See whether the error starts before or after discount`,
`Cart class | Create a cart for Nila and another for Sam | Each stores its own quantity
Wallet balance is private | Call deposit(100) | Amount changes through the permitted method
New cart for Nila | Constructor sets name and quantity 0 | Nila: 0
Cart.MAX_ITEMS is 20 | Nila adds 2 drinks | Shared limit stays 20; Nila’s quantity becomes 2
A cart has quantity 2 | Attempt addDrinks(-4) | Validation preserves quantity 2
ExpressDelivery("Colombo") | super stores the destination | Child can calculate its own fee for Colombo
Choose a card or wallet | Checkout calls pay(500) | It gets a receipt without handling provider details
One order owns two lines | Remove the draft order | Its owned lines are removed too
ExpressDelivery extends Delivery | Override the fee | Express delivery adds its own price
Checkout needs a Payment | Store it as a dependency | Checkout has a payment method
Card and wallet both expose pay | Call pay(500) on each | Different provider behavior under one operation
BookingService needs a repository | Pass an in-memory implementation during a test | Test booking rules without real storage
print(int) and print(String); Delivery.fee() | Choose signature by arguments, select override by actual object | print(42) picks int; ExpressDelivery uses its own fee
Checkout and payment provider | Communicate through a small Payment interface | Swap providers without editing checkout math
Payment interface and BaseDelivery | Define pay as a contract and store destination in the base class | Different providers share a contract; deliveries can share fields`,
`Prices [100, 250, 400] | Read index 1 | 250
Root 8; left 3; right 12 | Compare target 12 with 8 and go right | Find 12
Text MANGO | Read the first ASCII character | M
Urgency 10, 3, 8 in a max-priority queue | Remove highest priority | 10
A points to B and B points to C | Follow B.next | C
Stations Colombo, Kandy and Galle | Draw each direct route as an edge | Check which stations are connected
Undo history A, B then C | Pop the top action | Undo C first
Route A → B | Store B as A’s neighbor or put 1 in cell A,B | Both forms answer whether A links to B
Print jobs Nila, Sam | Remove the front entry | Print Nila first
Words PREP and PREVIEW | Follow the shared prefix PRE | Both matches remain
Scan Mango, Lime, Mango | Count with a map and deduplicate with a set | Mango: 2; unique: Mango, Lime
Stock by SKU | Choose a map and look up SKU 42 | Get its quantity without scanning a list`,
`Five items | Visit each one once | Θ(n) work
Daily sales [2, 4, 6, 8] | Move the two-day window by removing 2 and adding 6 | Sum changes from 6 to 10
One array plus one counter | Scan once while updating the counter | O(n) time, O(1) extra space
Mango, Lime, Mango | Increment a count for each drink | Mango: 2; Lime: 1
Search [3, 7, 9] | Compare first, middle, or all items | Target 3 takes one check; missing 5 takes three
Routes A→B, A→C, B→D | Use BFS to visit A, B, C, D | Reach D in two edges
Sorted [1, 3, 5, 7, 9] | Search midpoint 5, then move right | Find 7 at index 3
Meetings 9–10, 9–12, 10–11 | Select earliest finish first | Keep 9–10 and 10–11
Unsorted [3, 1, 2] | Bubble 3 past 1 and 2 | [1, 2, 3]
Ways to climb 3 steps | Sum counts for 2 and 1 steps | 3 ways
Sorted halves [1,4] and [2,3] | Merge by taking the smaller front value | [1,2,3,4]
Sudoku cell can be 2 or 4 | Try 2; undo when a later cell cannot be filled | Try 4
factorial(1) | Hit the base case | Return 1 immediately
Search in an empty array | Test bounds before reading a midpoint | Return −1
Sorted [2, 4, 7, 10], target 11 | Move pointers inward until 4 + 7 | Found the pair`,
`HTML file has a title and a visible heading | Put title in head and heading in body | Tab title and page heading appear in their places
Empty required email input | Submit the form | Browser asks for an email
An unordered list needs two items | Nest li elements under ul | Browser presents one list with two entries
Email field and several inputs | Give email a unique ID; use a class for all inputs | Label targets Email; CSS can style every field
A cart action | Use a native button | Mouse and keyboard can activate it
One emphasized word | Wrap just the word in a span | Inline highlighting
Paragraph and highlighted word | Give paragraph a block and word an inline wrapper | Paragraph starts a line; highlighted word stays in it
Photo shows a chart trend | Give it an alternative such as “Sales rose from 2 to 5” | A text reader gets the main information
Product menu needs a heading and navigation | Use headings, links and list items for their matching roles | Page structure is easier to navigate
User has no mouse | Tab to Place order and press Enter | Button activates
Time and Route columns | Use header cells for both labels | Readers can associate row data with each column
Expandable shipping options | Update aria-expanded with open state | Assistive tech reports expanded or collapsed
Order form accepts quantity | Use the appropriate input type with a label | Browser offers a suitable control
Page opened on a phone | Add viewport metadata | Responsive styles follow the phone width
Email field uses id and name | Associate label by id and submit by name | Clicking label focuses input; email appears in payload
Form contains a label and input | Inspect the browser’s DOM tree | See both controls as children of the form
Customer searches for lime | Submit with GET | URL can include ?q=lime`,
`Two pages need the same card style | Link the same external CSS file | One rule styles both pages
Yellow text over charcoal | Check contrast and font weight | Heading remains readable
Only direct links in a nav should change | Use nav > a | Nested submenu links are excluded
Form grows on a desktop | Set width:100% and max-width:640px | Form stops growing at 640px
Two rules target the same element in the same layer | Compare #title and .title | ID rule wins if other precedence is equal
Text sits above a busy image | Place a dark gradient over the image | Words remain visible
200px border-box has 16px padding and 2px border on each side | Subtract 36px | Content width 164px
Code line is wider than its container | Set overflow:auto | User can scroll inside the box
Cards touch and their text hugs the border | Add margin between cards and padding inside | Both areas have space
Header should remain visible while scrolling a section | Set position:sticky and top:0 | Header sticks within that scroll area
Card width set to 200px | Use border-box with a 2px border | Border fits inside the specified width
Tooltip inside a lower stacking context | Raise its child z-index only | It still cannot outrank a higher sibling context
A conditional banner should take no space | Apply display:none | Following content moves up
A keyboard user focuses a button | Style :focus-visible | User sees a focus indicator
Hide a placeholder while keeping its position | Use visibility:hidden | Layout space remains
Several buttons share a yellow accent | Define --accent once | Button rules refer to the same color
Root font size is 16px | Set padding to 2rem | Padding computes to 32 CSS pixels`,
`Toolbar uses flex-direction:row | Identify horizontal main axis and vertical cross axis | Align controls intentionally
Small and large viewports share one layout | Use a fluid width capped with max-width | Content grows then stops
A row needs horizontal and vertical centering | Set justify-content and align-items to center | Controls sit in the middle
Icon needs a small visual lift | Apply translateY(-2px) | Icon moves without reflowing neighbors
Three cards start at 200px | Allow grow and shrink | Cards divide free room or compress
Button background changes on hover | Transition background over 150ms | Color changes gradually
Catalogue needs columns and a full-width heading | Define grid tracks and let heading span them | Heading covers all columns
Loading symbol should rotate | Animate a transform with keyframes | Spinner changes angle over time
Cards form rows and columns; buttons form one row | Use Grid for cards and Flexbox for buttons | Each layout uses a suitable tool
A spinner belongs in the panel center | Use display:grid and place-items:center | Centered on both axes
Mobile shows one column | Add a min-width breakpoint | Desktop can show two
Default body margin creates outside space | Reset body margin | Page can sit flush to edge
Design first for narrow screens | Add desktop enhancements with min-width | Small layout works before enhancements
A featured card has a custom style | Use card and card--featured classes | Variant remains tied to same component
Phone screen needs a smaller product image | Declare srcset and sizes | Browser can choose a suitable file
A feature is missing in an older browser | Provide a simple fallback layout | Core content still appears`,
`Quantity should change but price stays fixed | Use let for quantity and const for price | Updates stay intentional
Two carts share one class method | Call it on each instance | Same behavior uses each cart’s state
Value is 42 | Run typeof 42 | "number"
Shopping cart behavior has fields and methods | Define class Cart and create two instances | Instances have independent quantities
User clears selection; another field does not exist | Set selected = null and read a missing property | Explicit null and implicit undefined
Product has name and price | Destructure price | A local price binding
Basket is an empty array | Test basket.length rather than basket alone | Correctly report no items
Items are [Mango] | Use [...items, Lime] | New array [Mango, Lime]
Number 0 and string "0" | Compare with == and === | true with coercion, false without
Product price is 250 | Interpolate name and price | Mango costs Rs. 250
Outer function has a count | Read count inside its nested function | Lexical access works
Quantity is 0 | Evaluate quantity ?? 1 | Keep 0
Read a let binding before its declaration executes | Hit its temporal dead zone | ReferenceError
Prices [100,200,300] | Filter above 150, then map to doubled values | [400,600]
Totals need a callback | Use an arrow in map | Each price is transformed
A shallow copy shares order.items | Push through the copied object | Original sees the added item
Create counter A and B separately | Call A twice, B once | A: 1, 2; B: 1
Tax logic belongs in another file | Export it and import it into checkout | One reusable definition
Pass an instance method as a callback | Bind it to the instance first | this remains the intended object
Broken JSON arrives from storage | Catch the parse error | Show a fallback basket`,
`A page displays quantity 1 | Find the display element and update textContent | Page shows quantity 2
Server returns HTTP 404 | Fetch resolves; check response.ok | Show a friendly not-found message
A button already exists | Register an event listener | Handle the next click
Cart text is "{{oops" | Run JSON.parse inside try/catch | Catch the invalid format
Click a button inside a panel | Capture goes toward button; bubble goes back | Parent observes the click in the configured phase
Theme should survive reopening the tab | Save to localStorage | New visit can read the theme
Cart list contains many Remove buttons | Listen on the parent and identify the clicked button | One handler covers all rows
User rapidly types mango | Restart a debounce timer each keystroke | Search once after typing stops
Form should stay on current page | Call preventDefault on submit | Browser does not navigate to a form URL
Timer scheduled for later | Close the view and clear the timer | Callback does not run
Product list receives onSelect | Click Mango and invoke the callback | Parent receives Mango
A card width changes | Browser computes layout and paints | Neighboring cards reflow
Order status lookup returns a promise | Resolve with Ready or reject on failure | Handler receives the value or error
Price fails to load | Open DevTools Network and inspect status | Identify the failing request
Check order A12 and missing order B99 | Await the simulated lookup inside try/catch | A12: Ready; B99: Order not found
Script on one origin requests another | Browser checks cross-origin response rules | Access depends on the server’s permission
Log start, schedule timer and promise, log end | Drain promise microtasks after synchronous work | start → end → promise → timer
A recurring timer holds a removed view | Clear timer during cleanup | View can become unreachable`,
`Product name and quantity | Type name as string and quantity as number | Reject an unexpected type
Unknown input might be " Mango " | Check typeof input === "string" | trim safely returns Mango
Set let price = 250 | Assign a string later | TypeScript flags the incompatible assignment
Order can be Pending or Paid | Declare named enum values | Callers refer to defined states
API returns data with unknown type | Narrow it before reading fields | TypeScript checks safe use
An edit need not send every field | Use Partial<Product> | Payload can contain only changed fields
Pair stores name and quantity | Give it type [string, number] | Position 0 is a string and position 1 is a number
Untrusted payload is asserted as Product | Read it without runtime validation | An assertion cannot make missing fields exist
API result may be Success or Failure | Define a type alias for the union | Both cases are represented
Formatter receives a quantity | Declare its result as string | Caller expects text
Admin must be a User and have permissions | Use an intersection type | Value must meet both constraints
Product card expects a Product | Validate the API payload at the boundary | Pass a known-good value as props
Name may be absent; ID should not be reassigned | Use optional name and readonly id | Missing name is allowed; id assignment is flagged
Project enables strict checking | Compile using tsconfig | Potential type errors surface before deployment
first receives a Product array | Infer T from that input | Result stays Product or undefined`,
`Menu and checkout tabs share a shell | Change route in a React SPA | New view without a full document load
Click Add one | onClick calls the state setter | Quantity increases
Use JuiceCard twice with different names | Pass different props | Two separate rendered cards
Query input has value={query}; note uses defaultValue | Type into both inputs | React owns query; DOM holds note until submit
Product has a price 250 | Use braces in JSX | Paragraph renders 250
Click Save with an empty required note | Native validation blocks submit | Show the missing input
App passes Mango juice to a card | Click Add one to update its quantity state | Name stays Mango juice; quantity changes
Menu and receipt both need quantity | Move state to common App parent | Both see one shared count
Child wants to add an item | Call a handler passed by its parent | Parent updates state and passes new data down
Checkout combines two distinct responsibilities | Render OrderSummary and PaymentForm inside it | Each component handles its part
Set quantity from 0 to 1 | React computes new UI and commits needed updates | Display changes to 1
Panel wraps arbitrary content | Render its children prop | Page can place a form or receipt inside
React output describes quantity as 2 | React updates the real DOM text | Browser renders 2
Heading and button need a common return | Wrap them in a fragment | No extra wrapper div in the DOM
Mango and Lime cards swap order | Match each by stable product key | Mango retains its state
Select menu link /drinks/mango | Read drinkId using useParams | Show Mango detail
Search query matches no product | Render an empty-state paragraph | User sees “No drinks match”
Store lookup is pending or failed | Render by status | Loading, error, empty or stock text
Reverse a list keyed by product ID | React matches the existing item identities | Quantity follows the product`,
`A component sometimes hides its receipt | Call useState at top level before conditional return | Hook order stays consistent
Cart count belongs in a shared store | Dispatch addOne through Redux Toolkit | Receipt reads the new count
Two increments depend on prior value | Use setCount(n => n + 1) for both | Count moves from 0 to 2
Search term, shared cart and remote stock | Keep them as local, global and server state respectively | Each has the right source of truth
Switch from store A to B | Effect cleanup cancels A’s lookup | Only the current store should update the screen
Stock starts loading | Request data and observe success or failure | View renders the matching state
Provider supplies tropical theme | Child reads useContext(Theme) | Displays tropical
Slow store A request finishes after fast B | Cancel A during cleanup | B stays visible
Need to focus a specific input | Store its node in useRef | Button focuses the existing input
Chat room opens, changes and closes | Set up and clean up at corresponding stages | One current connection
Order can add and reset | Dispatch actions to the order reducer | Reducer computes the next quantity
Receipt throws while rendering | Error boundary shows fallback | Checkout controls still work
Query changes from empty to lime | useMemo recomputes filtered menu for new query | Only Lime remains
Receipt is closed initially | Open it to render the lazy component | Module loads and receipt appears
Menu callback passed to memoized child | Stabilize callback with useCallback | Unrelated parent renders can keep same callback identity
Receipt code lives in its own chunk | Open the receipt | Browser requests that chunk when needed
Several views read shop stock | Extract request state into useStock | Share logic without sharing each component’s state
Unrelated receipt flag changes | Keep menu props stable | Memoized menu can skip that render
Memoized menu receives same items and handler | Toggle unrelated parent state | Menu may skip recalculation
Render cart in a test | Click Add one by accessible role | Assert Quantity: 1
Three deeply nested controls need theme | Supply a Context provider | Controls can read theme without passing it through every layer`,
];
scenarios.push(
`Create app/products/page.tsx | Next.js maps file to a route | /products renders the page
Angular product component has price 250 | Bind it in the template | Page displays 250
A shop needs shared nested layouts | Use App Router segments | Product routes reuse parent navigation
Form may be invalid | Bind disabled to validity | Submit stays disabled until valid
Product routes share navigation | Add a parent layout | Navigation stays as route content changes
Selected Angular row | Apply an attribute directive | Selected row is highlighted
Product 42 is requested | Match products/[id] | Page receives id 42
Raw order timestamp | Apply Angular date pipe | Show a readable date
Stable product guide | Pre-render at build time | Same HTML can be served repeatedly
Component needs profile data | Inject a profile service | View logic stays separate from fetching
Product page needs private data and a cart button | Fetch in server component; pass safe fields to client button | Data stays scoped and button stays interactive
Visit Angular /products/42 | Router matches a parameterized route | Product detail receives 42
Request GET /api/menu | Route handler reads catalogue | Return JSON
Order label must be nonempty | Add a reactive form validator | Invalid label blocks submission
Catalogue rarely changes | Cache and revalidate periodically | Recent version served without rebuilding on every request
User types two queries quickly | Switch observable to latest query | Late result from old query is ignored
Open a product page | Generate a descriptive title | Tab and search metadata show product name
Angular view subscribes during its lifetime | Release subscription on destroy | Closed view stops receiving updates
Card is only 200px wide | Request a suitably sized image | Download fewer bytes
Create standalone Menu component | Declare imports on component | It can render without an NgModule declaration`,
`Card needs padding and bold text | Apply p-4 and font-semibold | Both styles apply
Edit component during development | Vite serves updated module | Browser updates the view quickly
Small screen needs one column | Use grid-cols-1 and md:grid-cols-3 | Medium screen shows three columns
App imports three modules | Translate needed syntax and bundle assets | Browser receives deployable JS
Keyboard focuses a button | Apply focus-visible variant | Visible focus ring appears
Build includes a public API URL | Read it from configuration | Browser bundle contains that URL
Toolbar and card catalogue | Use flex for toolbar and grid for catalogue | Alignment matches each layout
File has unused variable and inconsistent spaces | Run lint and formatting | Lint flags the variable; formatter adjusts style
All primary buttons need a new color | Update shared theme token | Buttons update together
Older browser lacks a layout API | Use a supported fallback | Content remains accessible
Two Bootstrap columns start stacked | Apply col-md-6 | Each uses half width on medium screens
Form looks polished but errors are unclear | Add labels and specific error feedback | User can finish the task
Project declares React dependency | npm installs it from package metadata | Imports can be resolved
Danger and primary buttons look alike | Give them consistent distinct treatments | Users can recognize destructive actions
Team checks out same lockfile | Run npm ci | Install the same locked dependency graph
Product hero loads slowly | Run performance audit and check LCP | Locate the slow first major content
Team needs repeatable builds | Define npm run build | Local and CI use the same entry point`,
`Browser needs product list | Ask server for GET /products | Receive products as JSON
Checkout request fails | Log request ID and status | Find associated server events safely
Submit booking form | Server routes, validates and saves | Client gets a 201 response
Staging and production use different databases | Read connection setting at runtime | Same code uses correct environment
User changes order status | Server checks permission and business rules | Authorized update is persisted
Product is held as an object | Serialize to JSON | Browser can read transmitted text
User manages task 7 | Create, read, change or remove via handlers | Store reflects the action
Upload a profile photo | Check size and type, then store under a generated name | Return a safe reference
Client sends DELETE /orders/42 | Router uses method and path | Delete handler receives ID 42
Customer lists recent paid orders | Filter paid, sort newest, return ten | First page is deterministic
Request enters API | Authentication middleware identifies caller | Handler can enforce access
Same catalogue requested repeatedly | Cache it with expiry | Less database work for repeated reads
Reserve last seat | Controller reads input, service checks rule, repository saves | Endpoint returns reservation
Booking has been confirmed | Enqueue notification work | Request can finish before email sends
Order page needs data and display | Separate model, controller and view | Each part has a clear responsibility
Application gains separate fulfilment workload | Compare library boundary with independently deployed service | Choose based on operational needs
Quantity supplied is 0 | Validate allowed range | Reject the invalid request
Two instances receive one user’s requests | Read shared session data instead of memory specific to one instance | Either instance can respond
Booking is missing | Map expected error to 404 | Client sees a clear message`,
`Customer signs in | Use HTTPS with a valid TLS connection | Traffic is protected in transit
Server returns a JSON order | Set Content-Type: application/json | Client interprets the payload as JSON
/orders/42?view=summary | Read ID from path and view from query | Order 42 appears in summary format
A new API response breaks older clients | Keep v1 and introduce v2 | Consumers can migrate gradually
Create booking request | Put JSON in body and content type in header | Server can parse the input
Partner needs to integrate | Document POST /orders schema and status codes | Partner can construct valid requests
Task 7 needs a new label | Send PATCH /tasks/7 with the change | Other fields stay intact
Endpoint accepts typed amount | Send sample request with Postman | Verify expected status and JSON
PUT sets order address; repeat identical request | Server applies same target value | Final address is unaffected by repetition
Too many requests in one minute | Apply rate-limit policy | Client gets 429
Seat has already been booked | Return a conflict status | Client sees HTTP 409
Payment provider reports a change | Verify webhook and reconcile the order | Trusted state can update safely
Client reads one order | Use GET /orders/42 | Response represents resource 42
Dashboard needs occasional fresh status | Poll every few seconds | UI updates with some delay
Product includes price and title | Serialize as a JSON object | Client reads named properties
Card only needs title and price | Request those fields through GraphQL | Response contains the selected fields`,
`Run a CLI task | Start JavaScript with Node.js | Program can read local files
Local port is 3001 | Load environment from dotenv | App listens on configured port
File read takes time | Start it asynchronously and handle another request | I/O wait does not occupy the JS stack
Frontend uses another origin | Configure allowed origin | Browser can read the permitted API response
Promise settles after current callback | Event loop processes ready work | Its callback runs after current synchronous work
Product name is required | Define a Mongoose schema with name required | Model validation catches missing name
Project uses ESM | Import a utility using import | Node loads exported function
Quantity is outside range and name has spaces | Reject quantity and trim name as appropriate | Stored data follows rules
Product routes share a prefix | Mount a router under /products | GET /products/42 reaches product handler
Request claims a session | Verify session in middleware | Handler sees authenticated identity
POST /orders/42?view=compact carries JSON | Read params, query and body independently | Handler gets ID, view and order fields
Large upload arrives | Stream it and apply size limit | Memory stays bounded
JSON payload reaches validator | Register parser before validator | Validator receives parsed data
A response returns 500 | Record status and request ID | Troubleshooting can identify matching request
JSON request is larger than allowed | Parser enforces size limit | Request is rejected
Endpoint should reject invalid quantity | Test it through HTTP | No row is added on invalid input
Async handler cannot load storage | Reject the operation | Express 5 forwards error to middleware
Deployment begins shutdown | Stop accepting traffic then drain in-flight work | Active responses can finish
A known stock error reaches error handler | Convert it to application response | Client receives a suitable status`,
`Write Main.java | Use a JDK to compile it and JVM to run bytecode | Program prints its output
Read may fail with IOException | Catch or declare the checked exception | Compiler sees how caller handles it
Copy an int and an object reference | Change copied int and mutate shared object | Original int stays; shared object changes
A file operation can fail | Close related resource in finally or use try-with-resources | Resource is released either way
String starts as Mango | Call toUpperCase | Original remains Mango
A Wallet has a private balance | Call public deposit method | Code outside cannot assign the field directly
Receipt has several lines | Append through StringBuilder | One completed receipt string
Set MAX_ITEMS as static final | Use it through Cart class | All carts share declared limit
Two distinct String objects contain Mango | Compare with == and equals | false for identity, true for logical value
Several providers expose pay | Define interface and optionally share a base class | Checkout can depend on common contract
Two objects compare equal | Compute hash codes | Equal objects have equal hash codes
Order list contains paid and unpaid entries | Use a stream filter for paid orders | Collect paid entries
Scan Mango, Lime, Mango | Keep list, create set, count with map | Sequence, unique items and counts are available
Two threads update the same counter | Synchronize the update | Both increments are accounted for
App reads index 10 many times | Use an ArrayList | Direct indexed lookup
Remove the last reference to a temporary object | Object becomes eligible for collection | Runtime can reclaim it later
Need counts and unique product IDs | Use a map for counts and set for IDs | Each structure supports its planned operation
Project uses Maven dependencies | Run its wrapper build | Tool resolves dependencies and checks project
Cart list should accept Product only | Use List<Product> | Compiler rejects adding an unrelated type`,
`Set up a new Spring API | Use Boot starters and auto-configuration | Start a Spring application with less setup
Page needs orders and customer names | Fetch related entities with a planned query | Avoid an extra load for each order
BookingService needs a repository | Spring injects its constructor dependency | Service can use the configured implementation
Seat reservation and inventory count must agree | Update both in one transaction | Commit both or roll back both
Service class is annotated for scanning | Start application context | Class becomes a managed bean
Booking with ID 42 is missing | Map exception in handler | HTTP 404
Tests need their own data source | Activate test profile | Production configuration is avoided
App needs custom server port | Set server.port through configuration | Application listens on that port
Reservation request arrives | Controller routes to service and repository | Rules run before row is saved
Protected endpoint receives a token | Security filter chain authenticates it | Request proceeds only if authorized
GET /products/42 | Match a Spring request mapping | Handler receives product ID
Signed-in caller requests another user’s booking | Enforce resource authorization | Access denied
Product entity includes internal audit fields | Map to a public DTO | Response omits internal fields
API receives signed JWT | Verify issuer, signature and audience | Trusted claims can guide access checks
Incoming order quantity is negative | Apply bean validation to the DTO | Client receives validation error
User creates a password | Store a password hash via encoder | Later compare a submitted password safely
Repository needs orders for user 42 | Use a Spring Data query method | Get matching entities
Frontend app sends credentials cross-site | Apply appropriate CORS and CSRF configuration | Intended calls work with protections
Entity changes quantity in a transaction | ORM synchronizes changes to the table | Database stores new quantity
Test BookingService without a live repository | Mock dependency and assert behavior | Unit test is repeatable
One customer has two orders | Map one-to-many association | Both orders link to that customer`,
`Python menu contains repeated items | List preserves order; set removes repeats | Mango, Lime once in the set
An order stores lines in PHP | Define an Order class with total() | Caller calculates total through a method
Python cart needs operations and state | Use a Cart class with add and total methods | Each cart tracks its own items
C# product has ID and price | Define typed properties or a record | Compiler checks assignments
User supplies abc for integer quantity | Catch invalid conversion | Show a helpful message
ASP.NET Core receives JSON order | Route it to an API handler | Handler returns an order result
Three objects have name attributes | Use a list comprehension | Produce a list of names
Web application needs logs for every request | Add middleware before controllers | Each request is logged consistently
Two Python apps require different library versions | Create separate virtual environments | Each resolves its own dependencies
Service needs a data repository | Inject one in the constructor | Tests can substitute a simple store
A small API needs validated request models | Choose a suitable framework such as FastAPI | Handler receives checked input
Add a product using EF Core | Add it to DbContext and save | New row is persisted
PHP form submits a name | Read field and retain allowed data in session | Next request can read session state
Order list contains mixed statuses | Where paid, then Select order numbers | List contains paid order IDs
PHP looks up a product by ID | Bind it through PDO prepared statement | Database treats it as data
Java servlet prepares a list of orders | Pass model to JSP | Page renders the provided values`,
`Order records need durable storage and querying | Manage a relational database with PostgreSQL | Rows and constraints are accessible through SQL
Customer Nila has orders; Sam has none | LEFT JOIN customers to orders | Both customers appear, with NULL for Sam’s order
Menu table has name and price columns | Insert one row per drink | Mango and Lime are separate records
Two lists contain unmatched records on each side | Full outer join preserves both sides | Missing partners appear as NULL
Room 4 at 9am should only be booked once | Use a composite unique key | Second matching reservation is rejected
Employee record holds manager ID | Join employees to itself with two aliases | Return employee and manager names
Quantity has a positive check and default 1 | Insert without quantity | Database supplies 1
Need orders with at least one payment | Use EXISTS with a correlated subquery | Unpaid orders are excluded
One student joins many courses | Use an enrolment link table | Both sides can have multiple matches
Two sales lists share one identical record | Combine with UNION ALL instead of UNION | Both copies remain
Customer and Order have a one-to-many relationship | Draw cardinalities in an ER diagram | See where the foreign key belongs
Many reports need paid orders | Create a view for that query | Reuse the same definition
Order lines repeat customer address | Move address to relevant customer record | Remove avoidable duplication
Frequent queries filter by customer ID | Add an index and compare the plan | Database can find matching rows with less work
Orders should retain the amount charged | Store the total as a checkout snapshot | Later price changes do not alter old receipts
Transfer money between two accounts | Debit and credit in one transaction | Both changes succeed together
Need a new table and permission | CREATE the table then GRANT access | Structure and access are configured
Inventory update fails after an order is added | ROLLBACK the transaction | Order insertion is undone
Need to mark only order 42 paid | UPDATE using WHERE id = 42 | Other orders remain as they were
Two transactions overlap | Set appropriate isolation and retry rejected writes | Concurrent effects meet the chosen guarantees
Products include several sale items | Filter sale, sort by price, limit to three | Three cheapest matching products
Two operations lock the same rows in different order | Use consistent lock order | Avoid a common source of deadlocks
Several customers share Colombo | SELECT DISTINCT city | Colombo appears once
Product lookup receives an ID | Bind it to prepared SQL parameter | ID stays separate from the statement
Need orders from certain cities | Filter with IN | Only listed cities match
Slow order query | Inspect EXPLAIN | See scan and indexes selected by planner
Paid orders have amounts 200 and 300 | SUM the two amounts | 500
A specific table change requires an audit entry | Add a narrowly scoped trigger | Audit row is recorded on change
Nila has two paid orders; Sam has one | Group customers and apply HAVING COUNT(*) >= 2 | Only Nila remains
Database fails after backup | Restore validated backup and available recovery logs | Data returns within planned recovery limits`,
`Order lines are always read with the order | Choose an embedded document or a relational join based on constraints | Data layout matches the workload
Two products use same SKU | Enforce unique index | Duplicate insert is rejected
Order has nested lines and a date field | Store it as BSON in orders collection | Nested data and typed date are retained
Order shipping address should never follow profile changes | Embed the address snapshot | Old order keeps original address
Route receives stored ID as text | Validate and convert to ObjectId | Find matching MongoDB document
One user could create millions of events | Reference events in a separate collection | User document stays bounded
Order 42 is shipped | Update matching document by ID | Only that order changes
New order is created through a Mongoose model | Apply schema validation | Required fields must pass checks
Need amounts above Rs. 1000 | Query with greater-than operator | Small amounts are excluded
Unknown importer writes invalid quantity | Enforce database validation as well | Invalid write is rejected
Orders list only needs date and total | Project those fields | Other fields are omitted
Booking records store customer IDs | Populate referenced customer name | List can show a readable name
Order list can have equal dates | Sort by date and ID before paging | Stable order for ties
Transfer changes two documents | Use atomic multi-document transaction if needed | Both changes commit together
Month has mixed paid and unpaid orders | Match paid, group total by customer | Produce a customer sales summary
Traffic and storage grow | Replicate for resilience, shard for distribution | Copies and partitions serve different purposes
Aggregate orders with customer names | Match status, group totals, look up names | Report shows sums and customer information
Network disconnects two replicas | Choose how reads/writes behave during partition | Clarify consistency or availability tradeoff`,
);
scenarios.push(
`Nila signs in and opens order 42 | Verify identity, then verify ownership | Show order only if access is permitted
User submits a comment | Render the comment as text | Browser displays the comment without executing it
User signs in | Server creates a session and sends an identifier cookie | Later requests can find the session
Search includes user-provided text | Bind SQL parameters and validate filters | User input remains data
API receives a signed token | Verify signature, issuer, audience and expiry | Use only trusted claims
User enters a display name | Validate its length and render as text | Accepted name displays safely
App needs another access token | Send the refresh token to the authorization server | Receive a new limited-lifetime access token
Session cookie should not be exposed to scripts | Set HttpOnly and relevant Secure/SameSite flags | Cookie access and sending follow those settings
User signs out | Revoke the refresh session | That session cannot obtain new tokens
App chooses a cookie for auth | Assess script access and cross-site sending separately | Add controls suited to the chosen storage
User creates a password | Derive a slow salted hash | Sign-in checks a verifier instead of storing the plain password
Client sends repeated login requests | Enforce an attempt limit | Further attempts are temporarily limited
Two users choose the same password | Hash each with its own salt | Stored hashes differ
App needs a private API key | Store it in server-side secret configuration | Browser files and Git do not contain it
Support agent needs order status only | Grant a read-only support role | The role cannot change prices
Team reviews a booking API | Use OWASP categories to check server-side access control | Missing authorization checks are identified
App needs calendar permission and sign-in | Use OAuth for delegated access and OIDC for identity | Each token has an appropriate purpose
User requests order 42 they do not own | Check object ownership on the server | Access is denied
Browser sends sign-in form over HTTPS | TLS protects the connection | Credentials are protected in transit
Installed library has a known defect | Apply a tested patched release | Deploy the updated dependency
Frontend requests API at another origin | Check allowed origin without skipping authentication | Intended browser client can read eligible responses
User signs in with password | Confirm a second factor on their device | Sign-in requires both factor types
Authenticated browser submits a state-changing form | Validate its CSRF protection | Unintended cross-site submission is rejected`,
`Create a commit locally | Push it to GitHub | Teammates can review shared history
Two branches change the same line | Review both edits and resolve manually | Merge uses the agreed version
Edit app.js in the working tree | Run git status | See change compared with the repository state
Build output is generated repeatedly | Put its path in .gitignore before tracking | New generated files stay out of commits
Two files changed; one is ready | Stage only the ready file | Commit contains the intended file
Need to switch tasks temporarily | Stash unfinished work and later apply it | Original changes are available again
New developer joins project | Clone, edit, stage, commit | A local snapshot records their change
Bad commit is already shared | Use revert | New commit undoes it without changing existing commit IDs
Want to inspect a change | Run git log then git diff | Identify commit and edited lines
Existing branch has one release fix | Cherry-pick that commit | Current branch gets the selected patch
Need to isolate a search feature | Switch to a new feature branch | Main history is separate while work progresses
Release 1.0 is ready | Tag the shipped commit | Team can identify the exact version
Private branch lags behind main | Rebase onto current main before review | Private commit IDs change
Team uses short-lived branches | Open a focused pull request | Small changes are easier to review
Want to inspect remote main first | Fetch without integrating | Compare before changing current branch
New contributor needs setup | Add install and test commands to README | Contributor can run the project
Commit exists only locally | Push it to origin | Remote branch receives new commit
A key was accidentally committed | Revoke and rotate it | Old key can no longer authorize access
Feature is ready for review | Open PR with purpose and checks | Reviewers can inspect and discuss changes`,
`Team needs online ordering | Plan, design, build, test and deploy a small flow | Working order flow can improve with feedback
Two functions repeat discount math | Extract a shared function and rerun tests | Structure improves and output stays the same
Booking must save and respond within 300ms | State behavior and performance requirement separately | Both can be tested
Checkout must support multiple payment rules | Use a Strategy selected through a shared interface | New provider can plug into checkout
Customer needs evolve as they try early demos | Deliver small iterations and use feedback | Later work reflects real requests
Browser requests a receipt page | Controller selects data model and view | Template renders receipt
Sprint produces a working cart increment | Inspect increment with stakeholders in sprint review | Feedback informs next work
Order API changes its response shape | Keep business rules in the service layer | Domain logic can stay stable
Four tickets are in progress and none finish | Limit work in progress | Team notices and resolves bottlenecks
UI and payment verification are mixed | Move verification into service | UI renders server-provided status
Customer wants to reserve a seat | Add criterion “second reservation for same slot is rejected” | Team can test the story
Booking design needs to show message order | Draw sequence diagram from UI to API to database | Review where each call happens
Checkout may gain another payment provider | Apply dependency inversion around a small contract | Checkout can use either provider
Manual releases repeatedly delay fixes | Track the cost and automate the step | Reduce the ongoing cost of the shortcut
Building first booking flow | Implement the current need and keep shared rules in one place | Avoid a plugin system before it is needed
Pull request changes a validation rule | Reviewer checks edge cases and asks for a missing test | Merge has clearer evidence
Helper named process does validation | Rename it validateQuantity | Reader can tell its role at the call site`,
`Ordering flow has calculation, storage and checkout | Test logic, database integration and one real user journey | Different failures are caught at the right level
Tests run every line of discount function | Add an assertion about a zero-price edge case | Coverage now comes with meaningful behavior checks
Booking endpoint works but takes 3 seconds | Test behavior separately from response time | Pass functional check; investigate performance
Negative values must be rejected | Write a failing test, implement rule and refactor | Test stays green after cleanup
New release includes a checkout fix | Smoke-test basic launch, sanity-check fix and rerun old booking cases | Release evidence covers different scopes
Checkout UI should update on a click | Render and click with Testing Library | Assert the new total
Password validation is a public contract | Use black-box boundary inputs | Verify behavior without depending on implementation
POST /orders needs validation | Send a valid JSON request in Postman | Assert status and returned ID
Cart loses one item after reload | Record concrete steps, expected and actual result | Team can reproduce bug
Product API looks slow | Inspect Network timing in DevTools | Identify the slow request
Valid quantity is 1 to 10 | Test 0, 1, 10 and 11 | Check both sides of each boundary
A calculation returns NaN | Break before calculation and inspect inputs | Find the first unexpected value
Slot can be available or taken | Test both requests | Available succeeds; taken returns conflict
A request failed in one service | Follow its request ID across logs | Match backend errors to the same request
Payment dependency usually returns a result | Stub success, then verify receipt collaborator called | Test controls input and checks interaction
Search bug appears with an empty filter | Remove unrelated steps until it still fails | Minimal reproduction points at filter logic`,
`One app starts two threads | Threads share the process address space | Coordinate changes to shared values
Server listens on 443 | Client connects to the host IP and port | Route to the HTTPS service
Two requests wait on I/O on a single thread | Interleave ready work | Concurrency without simultaneous JS instruction execution
User opens example.com | DNS resolves the name | Browser knows the server address
Running task loses its time slice | OS saves state and resumes another task | Original task can resume later
Browser submits form | Resolve host, connect and send HTTP request | Read server response
Two transactions need locks in reverse order | Order lock acquisition consistently | Avoid a common circular wait
Browser connects to site through TLS | Verify certificate matches hostname | Establish protected transport
App keeps huge unused cache contents | Remove unwanted references | Memory can be reclaimed
Office computers share local network | Route to a distant cloud service | Traffic leaves LAN over wider network
Two processes use same virtual address number | OS maps each address space separately | Same address value can refer to different memory
Server should accept only HTTPS from internet | Firewall permits 443; router forwards traffic | Other filtered ports are unavailable
Application cannot read a config file | Check owner and read permissions | Give only appropriate read access
Requests arrive for shop API | Reverse proxy forwards them to app instances | Client uses one public endpoint
Need recent app log lines | Use tail on the log file | See latest events
Need to copy a release artifact | Transfer with SFTP over SSH | File reaches verified server
An HTTPS request needs reliable transport | Separate HTTP application data from TCP transport in the model | Identify which layer handles each job
Connection has high bandwidth but slow response delay | Measure throughput and round-trip time separately | Distinguish capacity from latency
Upload requires ordered reliable bytes | Choose TCP for the connection | Loss can be recovered and bytes stay ordered`,
`Site is written in source files | Build to deployable assets, then serve them | Build-time and runtime are separate
App needs hosting and relational storage | Choose appropriate Azure compute and database services | Web code and state have managed homes
New checkout version is nearing release | Verify on staging before production | Real users see tested behavior
App and DB need local containers | Build app image and run both with Compose | Services can start together
Production database secret differs from staging | Inject it through secret configuration | Same code uses separate credentials
Team integrates pull requests often | CI builds and tests each change | Only checked changes become release candidates
App on Linux cannot receive traffic | Inspect process, listening port and logs | Identify whether process is running and reachable
A push lands on main | GitHub Actions runs a build workflow | Check status for that commit
Static site and API share a domain | NGINX serves files and proxies API routes | Browser sees one host
Commit is ready | Build, test and deploy the checked artifact | Production corresponds to known revision
Need upload from Windows | WinSCP uses SFTP to verified host | Files reach correct path securely
Errors suddenly increase | Monitor error rate and inspect logs | Alert provides timing and logs offer detail
Custom domain points at app | Set DNS and issue matching TLS certificate | Browser can reach site via HTTPS
New app release has a regression | Roll back to compatible prior deployment | Restore last known good code
Static repository has a build script and output folder | Configure Vercel or Netlify to build on Git push | New commit produces a deployment
Database accidentally loses records | Restore tested backup | Recover within agreed limits
App needs image storage and access rules | Store files in S3 and grant scoped IAM access | App can read only intended objects
Environment needs provisioning | Describe infrastructure in versioned files and review plan | Repeatable changes can be applied deliberately`,
`Traffic doubles and one worker fails | Add capacity and redundant instances | System can handle more demand and keep serving
Booking succeeds | Publish BookingCreated event | Notification worker can act independently
One server reaches CPU limit | Compare a larger instance with two instances behind a balancer | Pick an approach that fits state and load
Requests need shared policy and routing | Gateway routes /bookings and /payments to their services | Clients use one entry point
One app instance fails a health check | Balancer stops routing there | Healthy instances receive traffic
Catalogue update needs to reach replicas | Let replicas converge if immediate agreement is unnecessary | A refresh may show the update later
Popular menu changes only occasionally | Cache with expiry and invalidate after edits | Faster reads with bounded staleness
Email service is unavailable | Queue notifications while preserving booked seats | Users can still book
Images load from far away | Serve cacheable images through CDN | Nearby delivery can reduce latency
Booking request reaches deadline | Retry only if appropriate using same operation key | Avoid repeated uncontrolled work
Recent orders query is slow and readers are numerous | Add an index and evaluate a read replica | Improve lookup and read capacity where suitable
Client repeats a booking operation | Reuse idempotency key | Receive saved result without a second booking
Inventory requires related tables and constraints | Choose a relational design based on access needs | DB enforces important invariants
Bookings slow down | Compare latency metrics, logs and traces | Find the slower boundary
Send confirmation after booking | Put message on queue for worker | Booking response can finish first
Two users choose one seat | Write with a unique slot constraint | Only one booking succeeds`,
`Product card is shared between web and mobile designs | Render DOM elements on web and native views on mobile | Same idea fits each platform
Product page can’t be found by search engines | Fix crawl access and improve page metadata | Discoverable accurate content
New React Native project needs device testing | Run its Expo development workflow | Open and inspect the app on device
Search result identifies a product | Give page unique title and summary | Users can recognize the result
User taps Mango in mobile menu | Navigate with Mango ID | Detail screen displays correct item
Tracking URLs show identical product | Set canonical to clean product URL | Signals preferred address
App needs consistent spacing | Apply NativeWind utilities on supported components | Reuse styling rules
Store adds a product page | Include URL in sitemap and allow suitable crawling | Crawler can discover the page
User saves private order through Appwrite | Apply resource permissions | Other users cannot read it
Product has price and availability | Add matching structured data | Search systems can parse those fields
Flutter app shows a menu | Compose widgets and use Dart for logic | Screen presents ordered items
Product hero image is too large | Serve right-sized image and measure LCP | Main content can load quicker
Mobile loses network while fetching stock | Render error and retry state | User can retry when connection returns
Support chat needs product data | Call model service from server and validate response | Browser receives checked output
Shopify theme shows product title | Use Liquid section with current product data | Each product page shows its own title
Need short support response | Specify question, allowed product facts and answer length | Output is more focused
Products need grouping and a size chart | Use a collection and size-guide metafield | Store can filter products and show extra metadata
Generated reply includes unexpected fields | Validate schema and omit private inputs | Only accepted response data gets shown`,
`Customer selects Pay | Server prepares payment and redirects to provider | Return page can show verified status later
Payment is cancelled | Keep order unpaid and offer appropriate recovery | No fulfilment happens for cancellation
Developer needs a test purchase | Use sandbox credentials and simulated amount | No real funds are charged
Provider reports Rs. 500 in a different currency | Compare amount and currency with order | Refuse incorrect payment match
Order has ID 42 | Save a distinct provider transaction reference | Reports can match provider and store records
Store and provider records disagree | Reconcile by transaction reference and amount | Identify the missing or inconsistent record
Order moves from pending to paid after verification | Enforce allowed transitions | Order cannot become paid from an unverified state
Customer enters card data | Use hosted provider interface | App handles less sensitive payment data
Browser sends a success redirect | Server independently verifies provider record | Only verified order becomes paid
Payment verification needs troubleshooting | Log request ID and state, omit credentials | Team can diagnose without exposing secrets
Customer returns and webhook arrives independently | Use return for navigation; verify provider notification server-side | App handles progress and durable updates separately
Merchant integrates card checkout | Check obligations for their hosted flow | Control scope matches handling of cardholder data
Payment notification arrives | Validate provider authenticity against its requirements | Reject notifications that cannot be trusted
Interviewer asks about LGPS | Walk through reference, verification and handling failure from your real implementation | Explain work you can substantiate
Same verified notification arrives twice | Enforce a unique transaction reference | Store payment only once`,
`Input MANGO | Read characters in reverse order | OGNAM
Sorted [1,4] and [2,3] | Repeatedly take smaller front item | [1,2,3,4]
Input Level | Lowercase and compare to reverse | true
Input ([)] | Pop expected bracket when ) arrives | Reject mismatched nesting
Words listen and silent | Compare normalized letter counts | true
Program schedules Promise and timer | Trace stack, microtask, then later task | start → end → promise → timer
Text mama | Count each character in a map | m:2, a:2
Binary search gives wrong output for missing key | Trace bounds until the range is empty | Correct the stopping condition
Scan [2,1,2] | Keep the first visit to each value | [2,1]
Customer and order rows | Join, group by customer, count paid rows | Count paid orders for each customer
Range contains [1,3,4] | Subtract 8 from expected sum 10 | Missing 2
Several customers share normalized email | Group by email with HAVING COUNT(*) > 1 | Return duplicates
Scores [8,8,5] | Deduplicate before selecting second highest | 5
Phone screen opens login form | Use labels and a container that can shrink | Form remains readable and keyboard usable
Values [2,7], target 9 | Look up 2 when reaching 7 | Return [0,1]
User types lime | Filter React menu using controlled value | Only Lime remains
Input 15 | Check both divisors before single cases | FizzBuzz
Task manager needs write operations | Define CRUD resource endpoints with checked input | Client can manage tasks predictably
Input 29 | Test divisors from 2 through 5 | Prime
Signed-in user opens another user’s booking | Apply server-side authorization after sign-in | Access is denied
Input 5 for factorial and 7 terms for Fibonacci | Multiply for factorial; sum prior pairs for Fibonacci | 120 and 0,1,1,2,3,5,8
Two branches edit same line | Resolve meaning, stage and test | Merge contains an agreed result
Sorted prices [100,150,200], target 150 | Compare midpoint | Found at index 1`,
`Interviewer asks for introduction | Give background, one project and reason for applying | Concise relevant answer
Interviewer asks how Movie Explorer ranks a title | Trace a real title through source data, ranking and tie-break | Explain ranking with evidence
Project involved several teammates | Name the feature you personally implemented | Interviewer can see your specific contribution
Store theme was changed | Show a real section and describe how you checked metadata | Demonstrate Shopify work concretely
Choose MERN or Spring Boot for a small team | Compare iteration needs, validation and deployment | Justify the actual choice
Payment verification succeeded in LGPS project | Explain reference, verification and stored result | Interviewer hears your implemented flow
Interviewer asks for architecture | Draw button to API to database and response | Show how data crosses each boundary
Reverse proxy returned an error | Describe the real config and log check | Show your debugging process
Booking table maps to an endpoint | Identify keys, route and response | Explain storage and API together
A project feature broke in testing | Explain how you isolated cause and verified fix | Show reasoning and result
Medi Track receives a stock update | Explain actual validation and chatbot boundary | Clarify what your work covered
Team reviews a change | Explain checks you ran and one suggestion applied | Show collaboration with evidence
Nature Pulse user selects booking | Explain actual sign-in and booking checks | Show where permissions are enforced
Project could be faster | Name one measured bottleneck and a feasible change | Propose how to verify improvement
UNI Hub checks a token | Explain actual Spring Security configuration and role rule | Distinguish verification from permissions
Topic was studied but never shipped | Describe the concept and say what you actually built | Interviewer can separate study and experience`,
`Asked why you chose engineering | Name a real building or debugging experience | Answer connects motivation to evidence
Client request is ambiguous | Confirm goal and write a clear acceptance condition | Both sides agree on expected result
Applying to a specific company | Connect actual product work to your interests | Answer goes beyond generic praise
Stuck on a bug | Gather evidence and ask a focused question | Teammate can help efficiently
Asked for a weakness | Give a real gap and your improvement habit | Interviewer hears ownership and action
AI suggests a fix | Review code, test it and keep sensitive input out | You understand changes before using them
Need to learn a framework quickly | Build one small feature using docs | Show learning by explaining what works
Asked to explain code without assistance | Trace one input by hand | Explain each choice and edge case
Deadline risk appears | Communicate early and agree on reduced scope | Core delivery remains predictable
Asked about a past challenge | Describe situation, task, action and result | Give a complete answer with your actions
Team disagrees about architecture | Listen, compare criteria and agree on a decision | Show respectful resolution
Interviewer invites questions | Ask what ownership and feedback look like for interns | Learn how the team works
Reviewer says error message is unclear | Improve it and gather feedback again | Demonstrate that advice changed your work
Job description asks for API skills | Match a real endpoint project to that requirement | Bring specific evidence
A change introduced a bug | Take ownership, fix it and add a test | Reduce likelihood of recurrence`,
);

export const topicScenarios = scenarios.map(module=>module.split('\n').map(line=>line.split(' | ')));

// Translated examples that need vocabulary tied to a lesson or a runnable demo.
export const topicScenariosSi = {
  'trees and binary search trees': ['Root 8. වමට 3, දකුණට 12.', '12 අගය 8 ට වඩා වැඩියි. ඒ නිසා දකුණට යන්න.', '12 හම්බ වෙනවා.'],
  'props vs state': ['App එක drink නම Mango juice විදිහට card එකට දෙනවා.', 'Add one ඔබද්දී card එකේ quantity state එක වැඩි වෙනවා.', 'නම Mango juice විදිහටම තියෙනවා. Quantity එක 0 ඉඳන් 1 වෙනවා.'],
  'constructors': ['Nila සහ Sam වෙනුවෙන් අලුත් carts දෙකක් හදනවා.', 'Constructor එක එක් එක් cart එකේ නම සහ quantity 0 set කරනවා. Nila ගේ cart එකට drinks 2ක් දානවා.', 'Nila: 2. Sam: 0.'],
  'primitive and reference types': ['Customer සහ cashier එකම cart එක බලනවා.', 'Cashier juices 2ක් එකතු කරනවා.', 'දෙන්නාටම quantity 3 පේනවා.'],
  'event loop, call stack, tasks and microtasks': ['start print කරලා timer සහ Promise callback එක schedule කරනවා. ඊළඟට end print කරනවා.', 'දැනට තියෙන වැඩ ඉවර වුණාම Promise microtask එක run වෙනවා.', 'Output order එක start → end → promise → timer.'],
  'group by and having': ['Nila ගේ paid orders 2යි. Sam ගේ 1යි.', 'Customer අනුව rows group කර HAVING එකෙන් orders 2ක් හෝ වැඩි groups ගන්නවා.', 'Nila විතරක් result එකට එනවා.'],
};
