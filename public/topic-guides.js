// Lines follow the checklist order. The build verifies the counts.
const guides = [
`Variables name values. A const binding cannot be reassigned. Use const menuName and let soldCount.
Scope says where a name is visible. Lifetime says how long its value stays reachable. A callback can retain an outer count.
A number assignment copies the number. An object assignment shares the object. Walk through the juice cart above.
An array holds ordered entries and a string holds text. items[0] reads the first item. JavaScript strings are immutable.
Precedence groups operations. 2 + 3 * 4 is 14, while (2 + 3) * 4 is 20.
A recursive function calls itself on a smaller problem. factorial(1) stops the factorial(3) chain.
Conversion creates a value of another type. Number("12") gives 12. A static type assertion alone does not convert data.
JavaScript passes values, including values that reference objects. Reassigning a parameter leaves the caller's binding alone; editing the object affects shared state.
Input is data the program receives. Output is what it produces. A checkout reads a quantity and returns a total.
Throw or reject when an operation fails. Catch where you can recover or show a helpful error, such as unavailable stock.
A condition picks a branch. If stock is zero, disable purchase. A switch is useful for several discrete statuses.
Call frames track active calls. Allocated objects may outlive those calls. factorial(3) adds frames before returning.
A for loop is useful for known counts, while repeats while true, and do-while always runs once. Use do-while to prompt once before checking.
Mutable values can change in place. An array can push an item; an original string is unchanged by toUpperCase().
A function groups reusable work. Parameters name inputs, such as quantity and price in total(quantity, price).
A compiler translates code before or during execution; an interpreter executes a representation directly. Java compiles to bytecode, and its VM may interpret or JIT-compile it.
return sends a result back and ends the call. Return quantity × unit price so the caller can reuse the total.
Trace inputs and changing values one step at a time. Set a breakpoint before adding a discount and inspect the original total.`,
`A class describes behavior and state; an object is an instance. Two Cart objects can store separate orders.
Access modifiers control whether members are usable outside a class. Make a wallet's balance private and expose a deposit method.
A constructor sets an instance's initial state. new Cart(customerId) starts an order for that customer.
A static member belongs to the class; an instance member belongs to one object. Cart.maxItems versus cart.items.
Encapsulation protects invariants behind methods. addItem can reject a negative quantity before touching the cart.
this refers to the current object in an instance method; super accesses a parent constructor or implementation. ExpressOrder can call super(id).
Abstraction exposes essential behavior. pay(amount) lets checkout operate without knowing how a card is charged.
Association links objects. Aggregation models independent parts, like players on a team. Composition models owned parts, like order lines in a draft.
Inheritance creates a subtype with inherited behavior. ExpressDelivery can extend Delivery if it satisfies the same contract.
A CardPayment is a Payment. A Checkout has a Payment. Prefer the relationship that matches how the objects are used.
Polymorphism lets one interface invoke different implementations. Card and wallet both implement pay(amount).
Pass a dependency in instead of constructing it inside the service. Inject a fake payment provider during a test.
Overloads share a name and vary signatures. Overrides replace inherited behavior. Java print(int) overloads print(String); Dog.speak overrides Animal.speak.
Coupling is dependency between components; cohesion is how related work within a component is. Keep discount rules together and avoid direct UI dependencies.
An interface specifies a contract. An abstract class can also share state and implementation. Define Payment as an interface unless implementations need shared base behavior.`,
`Arrays store ordered elements. Use index 0 for the first item; inserting at the front of a dense array can shift the others.
A binary search tree orders smaller keys left and larger keys right under a chosen duplicate policy. Find 12 by going right from 8.
Strings represent sequences of text. Iterating JavaScript by code point avoids splitting surrogate pairs, but visible characters can still combine several code points.
A heap keeps a highest- or lowest-priority item at the root. A priority queue can serve urgent orders before regular ones.
A linked list connects nodes with pointers. Doubly linked nodes can also point backward, like a browser's back/forward history.
A graph represents relationships with nodes and edges. Stations are nodes; direct train routes are edges.
A stack is last-in, first-out. The most recent undo action is the first one you reverse.
A list stores each node's neighbors; a matrix stores a cell per node pair. Use lists for sparse route networks.
A queue handles first-in, first-out orders. A deque supports adding and removing at either end.
A trie shares word prefixes. Starting from PRE can find prefix matches like PREP and PREVIEW.
A map pairs keys with values; a set stores unique keys. Use a map for stock by SKU and a set for scanned tickets.
Choose based on operations. An array serves indexed reads; a queue serves jobs in arrival order; a map serves lookups by ID.`,
`Big O bounds growth above, Omega below, and Theta tightly. A full pass through every item is Theta(n).
A sliding window updates a contiguous range. For a three-day total, subtract yesterday's outgoing value and add the incoming day.
Time measures growth in work; space measures growth in memory. One array scan with one counter is O(n) time and O(1) extra space.
Use a map to count repeated values. Scanning mango, lime, mango produces mango:2 and lime:1.
Linear search finds a first-position target in one step, an absent target after n steps, and averages over a stated input distribution.
BFS uses a queue to visit layers, ideal for shortest unweighted routes. DFS follows branches using a stack or recursion.
Linear search scans any array. Binary search repeatedly halves a sorted range, such as an ordered list of prices.
A greedy algorithm takes the locally best choice. Picking the meeting that finishes first works for selecting the most non-overlapping meetings.
Bubble swaps neighbors, selection chooses the next minimum, and insertion places the next item into the sorted prefix. Insertion works well for nearly sorted data.
Dynamic programming stores outcomes of repeated subproblems. Count ways to reach step n using the counts for n−1 and n−2.
Merge sort splits and merges in O(n log n). Quicksort partitions around a pivot and can degrade to O(n²) with consistently bad partitions.
Backtracking tries a choice and undoes it on failure. In a Sudoku row, remove a candidate that blocks all later placements.
Recursion needs a stopping case and progress toward it. In factorial, n decreases until 0 or 1.
Dry-run the loop with hand-written intermediate values. Binary search should handle an empty array, one item and a missing target.
Move two indices instead of trying every pair. In a sorted array, increase the left index when the sum is too small.`,
`DOCTYPE selects standards mode. Put metadata in head and visible content in body.
Required and type=email give browser validation. Validate again on the server because requests can arrive without the form.
Elements form a nested tree; attributes configure them. An anchor uses href, and list items belong inside a list.
An id identifies one element in a page. Classes label groups. Use id=email for a label target and class=form-field for repeated styling.
Semantic tags communicate purpose. Use button for actions and nav for a navigation section.
div groups block content by default; span wraps inline text. Use span around one highlighted word.
A block box starts a new line in normal flow. Inline text shares a line with nearby text.
Alt text describes meaningful images. Say “Bus schedule for Monday” if the image conveys that information, and provide the schedule as text when needed.
Use headings for structure, links for navigation, images with alternatives and lists for related items.
Tab through the controls without a mouse. Ensure visible focus and use native buttons so Enter and Space work.
Use tables for data. A schedule has header cells for Route and Time, and data cells for each journey.
ARIA adds accessible roles or state when needed. aria-expanded tells assistive technology whether a disclosure is open.
A form groups inputs for submission. Use email for an address and number for an appropriate numeric input.
Set the character encoding and mobile viewport in head. The viewport setting lets responsive CSS fit the actual device width.
A label names the control; name identifies the submitted field; value is the submitted data. email=nila@example.com is a name/value pair.
The DOM is the browser's tree of nodes for the document. A form element can contain a label and input as children.
GET forms put parameters in the URL for safe requests like search. POST sends submitted fields in the body, such as a new booking.`,
`Inline styles live on an element; internal styles live in a style tag; external CSS is linked and reusable across pages.
Use readable typography and contrast. Yellow text on charcoal needs sufficient contrast at the chosen font size.
A selector picks elements and a combinator describes relationships. nav > a selects direct anchors under nav.
Width and height set preferred sizing; min and max constrain it. width:100% with max-width:640px keeps a form readable.
The cascade ranks declarations by origin, importance, layer, specificity and order where relevant. A child can inherit color from its parent.
Background layers can combine colors, images and gradients. Put a dark gradient over an image so light text remains readable.
Content, padding, border and margin form the box model. Follow the 200px card diagram above.
Overflow controls content outside a box. Use overflow:auto for a code block that needs horizontal scrolling.
Padding gives room inside a border. Margin separates boxes outside their borders. Add padding inside a button and margin between sections.
Static uses normal flow; relative offsets in place; absolute uses a containing block; fixed usually anchors to the viewport; sticky sticks within a scroll area.
border-box includes padding and border in the set width. A 200px card with two 2px borders and two 16px paddings leaves 164px content.
z-index orders layers within a stacking context. A large child z-index cannot escape its parent stacking context.
Block starts a new line; inline stays in text flow; inline-block stays inline but sizes like a block; none removes the element from layout.
A pseudo-class selects a state like :focus-visible. A pseudo-element styles part of an element, such as ::first-line.
visibility:hidden hides the box visually but preserves layout space. display:none removes the box from layout.
Custom properties store reusable tokens and respect the cascade. Define --accent once and use var(--accent) on buttons.
px is a CSS pixel; % depends on the property; em relates to font size; rem to root size; vw and vh to viewport dimensions.`,
`Flexbox has main and cross axes. In a row, the main axis runs along the row.
Use percentages, min/max or clamp for layouts that flex. A reading column can be 100% wide up to 70ch.
justify-content distributes space on the main axis; align-items aligns on the cross axis. In a row, use align-items:center for vertical centering.
Transforms move, rotate or scale rendered boxes without shifting normal layout. translateY(-2px) can lift a hovered button.
Basis is the starting size; grow distributes extra space; shrink handles insufficient space. flex:1 1 200px lets cards adapt from a 200px basis.
A transition interpolates a property change, such as background over 150ms when a button changes state.
Grid tracks are rows and columns. Named areas can place header, main and sidebar in a predictable layout.
Keyframes define intermediate states. Use them sparingly and honor prefers-reduced-motion.
Grid coordinates rows and columns. Flexbox organizes one axis well. Use grid for a catalogue and flex for buttons inside a card.
Use place-items:center in a grid to center a spinner. Use auto inline margins for a fixed-width block.
A media query changes styling when a condition is true. Add a sidebar once the viewport is wide enough.
A reset makes defaults more predictable. Set box-sizing and remove the body margin before styling a layout.
Start with a single-column layout and add enhancements with min-width queries when space allows.
BEM names block, element and modifier, like card, card__title and card--featured.
Use srcset and sizes so a phone can load smaller images. Supply dimensions to prevent layout shifts.
Check supported features and test in target browsers. Provide a flex or simple block fallback when required.`,
`var is function-scoped. let and const are block-scoped. Use let for a changing count and const for a stable binding.
Objects store properties and can inherit via a prototype. Two instances can share the same method on a class prototype.
JavaScript has primitives and objects. typeof 42 is number; typeof null is object for historical reasons.
A JavaScript class defines construction and methods over the prototype system. new Cart() calls the constructor.
undefined commonly means missing or uninitialized. null usually represents an intentionally absent value. Use null for a deliberately empty selected item.
Destructuring binds parts of a value. const { price } = item reads the price property into a local variable.
False, zero, empty string, null, undefined and NaN are falsy. An empty array is truthy, so check length for an empty list.
Spread expands values, while rest collects values. [...items, next] appends to a new array and (...args) gathers arguments.
=== compares without coercion. 0 === "0" is false, but 0 == "0" is true.
Template literals interpolate values using placeholders. Build a receipt line from the item name and amount.
Lexical scope follows where code is written. An inner function can read bindings from the enclosing function.
Optional chaining stops on nullish values. Nullish coalescing supplies a default for null/undefined while keeping zero.
Declarations are processed before execution; reading let or const before initialization hits the temporal dead zone and throws.
map transforms; filter keeps matches; reduce accumulates; find returns the first match; some and every test any or all.
Arrow functions capture this lexically. A normal function can receive this from the caller, useful for object methods.
Spread copies the top level but shares nested references. structuredClone handles supported nested data.
A closure keeps access to its lexical bindings. Two counters built separately each keep their own count.
ES modules use import/export. Put tax calculations in a module and import the function from checkout.
Call shape can set this for normal functions. bind fixes a receiver when passing an instance method as a callback.
Use try/catch around operations you can recover from. Handle a parse failure and explain that the input needs valid JSON.`,
`Use querySelector to find a node and textContent to update plain text. Show the latest cart total in an element.
Fetch is built in. Axios offers conveniences. With fetch, check response.ok for HTTP error status codes.
addEventListener registers a handler for clicks or other events. Remove listeners when a component no longer needs them.
Capture moves from ancestors toward the target; bubbling moves from the target back upward. A parent can handle a button click.
JSON.parse converts valid JSON text into a value. Catch a parsing error if a saved cart contains invalid JSON.
localStorage persists across visits; sessionStorage is scoped to a tab session; cookies can accompany matching requests.
Delegate from a parent to handle many child events. A cart list can handle all remove buttons using the clicked element.
Debounce waits for silence after typing; throttle limits frequency during repeated updates. Debounce searching, throttle scroll work.
preventDefault cancels a default action such as link navigation. stopPropagation stops an event traveling to further nodes.
setTimeout schedules a callback after at least the delay. clearTimeout cancels it if the view closes.
A callback is a function passed for another function to invoke. An input handler runs when the user types.
The browser builds DOM and styles, lays out boxes, paints and composites. Large repeated layout changes can make scrolling choppy.
Promises represent future fulfillment or rejection. A fetch can fulfill with a response or reject on a network error.
Inspect element styles, network requests and console output in DevTools. Check the Network tab when a request fails.
await pauses the current async function until the promise settles. Handle rejection with try/catch.
Origin combines scheme, host and port. Browsers restrict some cross-origin reads unless an appropriate policy permits them.
Synchronous callbacks finish first. Promise microtasks run before the next queued timer task. Try the event loop lab.
Leaks happen when unwanted objects remain reachable. Clear repeating timers when their view is removed.`,
`Use string, number and boolean for ordinary values. A quantity should be number, while a product ID can be string.
Narrow a broad type with a runtime check. After typeof value === "string", trim is available.
Inference derives a type from usage. const price = 500 is initialized with a numeric value, so a string assignment would fail for a mutable number binding.
Enums describe named choices, such as Pending and Paid. String literal unions can express the same states without a runtime enum.
any bypasses checks, unknown requires checks, and never represents impossible values. Use never for exhaustive cases.
Utility types transform types. Partial makes properties optional and Pick selects specified properties for smaller forms.
Arrays hold repeated element types; tuples model positions with distinct types. [string, number] can represent a name and quantity.
An assertion tells the compiler how to treat a value. Use real runtime validation for data from a server.
An interface can be extended and declaration-merged; a type alias also models unions and other type expressions.
A function type describes arguments and results. (quantity: number) => string can type a label formatter.
A union allows either member; an intersection requires all members. A response can be success or error, while an admin user also needs permissions.
Type component props at the boundary and validate API data before using it. ProductCard should require a typed Product.
Optional can be omitted; readonly prohibits writes through that typed property. Use readonly id for a stable identifier.
tsconfig sets compiler options and files. Turn on strict checking and choose a target matching your runtime.
Generics preserve relationships between types. first<Product> returns Product or undefined without losing the element type.`,
`An SPA changes views on the client; an MPA typically navigates to another document. A dashboard can use client routes for tabs.
Handlers respond to user actions. Pass an onClick function to add an item when a button is clicked.
A functional component is a function that returns UI. A ProductCard can be reused for different products.
A controlled field reads its value from React state. An uncontrolled field keeps its current value in the DOM.
JSX describes elements in JavaScript. Braces can show a product's price inside a paragraph.
Track form values and show errors near fields. Still validate a booking request at the server.
Props come from parents; state is data a component owns. Pass product as props and keep selected quantity as state.
Move shared state to the nearest common parent. CartSummary and ProductList can use the same selected items there.
Data flows from parent to children via props. Children can call handlers to request parent updates.
Combine small components to build a feature. A Checkout includes an OrderSummary and PaymentForm.
Updating state schedules rendering. Keep rendering pure so React can compute output predictably.
children lets a wrapper render nested content. A Panel can display any supplied form or message.
React compares rendered element descriptions before committing DOM updates. Browser DOM nodes represent the actual page.
A fragment groups siblings without adding a wrapper element. Return a heading and paragraph together.
Reconciliation matches elements by type and key. Changing a key can reset a component's local state.
Routing maps paths to views. /products/42 selects a product page and exposes 42 as a route parameter.
Use a condition to choose what to render. Show the checkout button only when the cart has items.
Loading means data is pending, error means it failed, and empty means it succeeded with no items. Give each a clear response.
Give lists stable item keys. Use the product ID instead of the index when users can reorder entries.`,
`Call hooks at the top level of React components or custom hooks. Avoid calling useState only in one conditional branch.
Redux centralizes selected shared app state. Redux Toolkit supplies slices and reducers with less boilerplate.
Use functional updates when next state depends on prior state. setCount(n => n + 1) works with queued updates.
Keep field state local, app-wide preferences global when needed, and remote data under a fetching/cache strategy.
An effect handles external synchronization and its cleanup undoes it. Reconnect when roomId changes and close the old connection.
Track loading, errors and success when calling an API. Use a cache or framework fetching where it fits.
useContext reads the nearest provider's value. A theme selector can access a theme without passing it through every level.
If an old request returns after a newer one, it can overwrite fresh data. Cancel outdated work or ignore its result.
useRef retains a mutable value across renders without scheduling one. Use it to focus an input or retain a timer ID.
Components mount, update and unmount. Effects start and stop synchronization around the dependencies that change.
useReducer applies actions to compute the next state. Cart state can handle added, removed and cleared actions together.
An error boundary catches rendering errors below it and shows fallback UI. Handle event or async errors at their own boundary.
useMemo can cache a costly computed result when dependencies are stable. Measure the filter cost before using it.
React.lazy defers loading a component module. Suspense can show fallback UI while the lazy module loads.
useCallback preserves function identity for stable dependencies. It can help a memoized child when other props also remain stable.
Code splitting breaks a bundle into chunks. Load the admin route only when someone visits it.
A custom hook shares behavior across components. useOnlineStatus can subscribe to network events and clean up.
Keep state near its users, pass stable inputs where appropriate, and measure with React Profiler before adding memoization.
React.memo can skip a child render when props are unchanged. Context and state updates can still render that child.
Test behavior through what the user sees and does. Find Add to cart by role, click it and assert the total changed.
Context helps when many distant components need the same value. Passing props is explicit for short paths.`,
`A route follows the file structure in Next.js. An app/products/page file defines the products page.
Angular components pair a class with a template to define behavior and view. A product component receives and renders product data.
App Router supports nested layouts and Server Components. Pages Router remains a separate file-routing model with its own data APIs.
Data binding connects component values to the template. Bind a disabled property to whether a form is invalid.
Layouts share UI across routes. Put common navigation in a parent layout while children change.
Directives change element behavior or template structure. An attribute directive can highlight an active row.
A dynamic route captures a segment. products/[id] can render many pages from one route definition.
Pipes transform values for display. The date pipe renders a stored timestamp in a readable format.
CSR renders in the browser, SSR per request, SSG at build, and ISR updates pre-rendered output as it revalidates.
An Angular service can hold data logic. Inject it into a component instead of constructing it in the view.
Server Components can read server-side data. Client Components add browser state and interactions. A product page can use both.
Angular Router selects components for routes. Route parameters supply identifiers to a detail view.
A Next.js route handler responds to HTTP methods. A GET handler can return JSON for a public product catalogue.
Reactive forms define controls and validators in code. Read the form group's validity before submitting.
Choose data freshness deliberately. A public catalogue can cache data, while user-specific information needs careful request scoping.
An observable supplies values over time. Switch to the latest typed search so obsolete results do not replace current ones.
Metadata conveys titles and descriptions. Generate a specific page title from the product being viewed.
Lifecycle hooks execute at named stages. Set up after initialization and release subscriptions when the component is destroyed.
Optimize image sizes and reserve their layout dimensions. Serve a smaller image for a narrow product card.
A standalone Angular component declares its imports directly, so it can be used without declaring it in an NgModule.`,
`Tailwind utilities map small classes to styles. Stack p-4 and font-semibold to style a card title area.
Vite serves modules during development and bundles production assets. Run its dev server for fast feedback.
Responsive variants apply at a breakpoint. grid-cols-1 md:grid-cols-3 starts with one column and moves to three.
A bundler assembles modules and a transpiler translates syntax. TypeScript converts types away while a bundler collects JS dependencies.
State variants apply styles conditionally. hover changes a pointer state and focus-visible styles keyboard focus.
Environment variables configure builds and processes. Values bundled into the browser are public.
Use flex utilities for a toolbar and grid utilities for aligned card columns.
ESLint checks code rules. Prettier formats source consistently. They serve different jobs in the workflow.
Define theme tokens for repeated colors and spacing. Update the primary color once to affect consistent controls.
Test the browsers people use. If a newer API is absent, choose a supported fallback based on required environments.
Bootstrap supplies responsive columns and reusable components. A col-md-6 can occupy half the grid at medium widths.
UI is what users interact with. UX includes whether the task feels clear and succeeds. A pretty form can still be hard to complete.
package.json names dependencies and scripts. npm install brings package dependencies into a project.
Use consistent action labels, spacing and states. Make destructive actions visually distinct from primary navigation.
A lockfile records dependency resolution. npm ci uses it to install the committed dependency graph.
Lighthouse audits a page. Web Vitals measure loading, responsiveness and visual stability, such as LCP, INP and CLS.
Scripts give repeatable entry points. npm run build invokes the build script declared in package.json.`,
`Clients request work and servers provide data or perform actions. A browser requests products from an API.
Record meaningful events and IDs for debugging. Log a request ID and duration without passwords or tokens.
The client sends a request; the server routes, validates and runs logic; the server returns a response. Follow the seat diagram.
Keep deployment-specific settings outside source code. Read database configuration from runtime environment.
Server-side code runs where trusted resources are available. Use it to verify a user's right to book.
Serialization turns data into a transport format. Convert a product to JSON before sending it.
CRUD means create, read, update and delete. A task API supports each action for task resources.
Validate accepted file types and sizes on the server. Store uploads separately and assign generated filenames.
Routing chooses a handler from method and path. GET /bookings/7 differs from DELETE /bookings/7.
Filter matching rows, sort predictably, then return a page. Include a stable ID as a tie-breaker for cursor pagination.
Middleware handles repeated work like authentication or request logging before reaching the handler.
Cache repeated reads when the allowed staleness is known. Invalidate a cached price after an update.
Controllers deal with HTTP, services apply rules, and repositories access data. Put seat availability rules in the service and database.
Background jobs handle work outside a request. Send a confirmation email from a queue after confirming the booking.
MVC separates model, view and controller. Layered architecture can also separate web, business and persistence responsibilities.
A monolith deploys together; microservices deploy separately and add network and coordination costs. Start with the simpler boundary the team can support.
Validate input types, ranges and business requirements. A quantity must be a permitted positive integer.
Stateless instances can process each request without local session history. Shared stores can hold state needed across instances.
Map expected errors to clear responses and unexpected errors to safe generic failures with diagnostic logs.`,
`HTTPS carries HTTP over a protected connection. TLS encrypts requests and authenticates the server certificate.
Content-Type describes the payload format. application/json signals a JSON body.
Path identifies a resource, path parameters identify a part, and query parameters shape a request. /products/7?locale=si selects product 7.
Version an API when changes break clients. Keep /v1 usable while clients migrate to /v2.
Headers provide metadata such as content type. The body holds transferred data such as booking details.
OpenAPI documents methods, paths, schemas and responses. Show partners a request example and its error responses.
GET reads, POST submits a request, PUT replaces, PATCH partly updates, DELETE removes, and OPTIONS describes communication options.
Postman can send requests with controlled headers and data. Assert that creating a valid task returns 201.
Safe methods are read-oriented. Idempotent methods have the same intended effect if repeated. Repeating a PUT preserves the same final resource state.
Rate limits control request volume per identity or client. Return 429 with retry guidance when appropriate.
200 success; 201 created; 204 no content; 400 invalid; 401 unauthenticated; 403 forbidden; 404 missing; 409 conflict; 429 limited; 500 unexpected failure; 503 unavailable.
A webhook is an HTTP notification to your server when an external event occurs. Verify a payment notification before changing order state.
Use nouns for resource paths and standard HTTP methods. GET /orders/42 reads an order.
WebSockets keep a two-way connection. Polling periodically requests updates. A simple status screen may only need polling.
JSON represents objects, arrays, strings, numbers, booleans and null. Object keys must be double-quoted.
GraphQL lets clients select fields through a typed schema. A product card can request only its title and price.`,
];
guides.push(
`Node runs JavaScript outside the browser. It can read files, listen for HTTP requests and run command-line tools.
dotenv loads local environment configuration into the process. Keep local secret files outside version control.
Asynchronous I/O lets Node serve another request while a file read is pending. CPU-heavy JavaScript can still occupy the event loop.
Allow only intended origins and methods for cross-origin browser access. Apply authentication and authorization independently.
The event loop dispatches ready callbacks after current work finishes. Avoid synchronous CPU-heavy loops in request handlers.
Mongoose maps application models to MongoDB collections. A product schema can constrain name and price.
npm manages packages. CommonJS uses require/module.exports; ESM uses import/export.
Validation checks constraints; sanitization normalizes appropriate input. Trim product names and reject invalid price ranges.
An Express app mounts routes and shared middleware. A router can handle all /products endpoints.
Authentication middleware verifies the session or token and attaches identity for later authorization.
Params come from the route, query from the URL and body from the payload. Compare /orders/42?sort=time with its JSON body.
Use streams for large files, limit upload size and handle cleanup when a transfer fails.
Middleware order matters. Parse the body before validating it and install the error handler after routes.
Log structured details such as request ID, path, status and duration. Leave secrets out.
express.json parses JSON requests with a configurable size limit. The parsed input still needs validation.
Exercise routes through HTTP tests. Confirm invalid quantities return a client error and leave no stored order.
Use async handlers for I/O. Express 5 forwards rejected handler promises to error middleware.
Stop accepting new requests and allow in-flight requests to finish within a deadline before closing connections.
Central error middleware has four parameters. Convert known errors to suitable status codes and log unexpected failures safely.`,
`JDK supplies development tools; JRE refers to runtime components; JVM executes bytecode. javac compiles and the Java launcher runs it.
Checked exceptions must be caught or declared; unchecked ones generally do not. An I/O failure is commonly checked.
Primitive variables hold primitive values. Reference variables identify objects. Assigning a reference can make two variables share one object.
final restricts reassignment, overriding or inheritance depending on use; finally performs cleanup; finalize is obsolete legacy cleanup.
Strings are immutable. Calling toUpperCase returns another value and leaves the original text intact.
public, protected, package-private and private control access. Keep implementation fields private when appropriate.
StringBuilder accumulates text efficiently across repeated appends, such as assembling a receipt line by line.
static belongs to the class. final restricts changes to a declaration. static final is common for constants.
For objects, == compares reference identity; equals can compare logical value. Use equals for two strings with the same text.
Interfaces define contracts and can include default behavior. Abstract classes can also hold instance fields and shared constructors.
Equal objects must have equal hash codes. Use stable equality fields for keys stored in HashMap.
A lambda supplies behavior to a functional interface. A stream can filter paid orders and map them to amounts.
A List preserves order, Set tracks uniqueness, Map links keys to values, and Queue processes entries in its defined order.
Threads allow concurrent execution. Protect shared mutable state with appropriate synchronization or use immutable data.
ArrayList indexes efficiently. LinkedList traverses to an index. Choose ArrayList for frequent random reads.
Garbage collection reclaims unreachable objects. A still-referenced unused cache entry can remain in memory.
HashMap stores key-value entries; HashSet stores unique values. Use a map for quantities and a set for seen IDs.
Maven and Gradle resolve dependencies and automate builds. Use the project wrapper where provided for consistent versions.
Generics parameterize types, such as List<Product>, so code can retain element types and catch invalid additions.`,
`Spring provides application infrastructure. Spring Boot adds starter dependencies, auto-configuration and convenient application setup.
Lazy associations load when accessed. Eager associations are fetched as required by the mapping. Plan queries to avoid repeated loads.
IoC means the framework assembles objects; dependency injection passes their collaborators in. Inject a repository into a service.
A transaction groups related database changes. Place reservation and inventory changes in one correctly configured transaction.
Beans are container-managed objects. Component scanning can discover classes with framework annotations.
An exception handler maps application failures to HTTP responses. A missing booking can return 404 with a clear error body.
Profiles select environment-specific configuration. Use test settings for isolated database tests.
application.properties stores configurable settings, such as a server port. Use environment variables for deployment secrets.
RestController handles HTTP, Service holds business logic and Repository represents persistence components.
Spring Security applies filters to requests. Configure how requests authenticate and what paths or actions are authorized.
Request mappings connect paths and HTTP methods to handlers. GetMapping can expose a product lookup.
Authentication determines identity. Authorization checks access to a specific operation or resource.
DTOs describe transport data, while entities describe persistence mappings. Return a DTO without internal fields.
A configured resource server validates the JWT and maps trusted claims to authorities. Check required audience and permissions.
Bean validation applies rules to objects. Mark a quantity positive and validate the request DTO at the boundary.
Use a password encoder designed for password hashing. Store hashes and verify passwords through its match operation.
Spring Data JPA provides repository abstractions for entity queries. A repository can find bookings for a user ID.
CORS controls selected browser cross-origin requests. CSRF protections address unintended authenticated requests when credentials are ambient.
An ORM maps objects to tables and manages persistence. Hibernate implements JPA in many Spring applications.
Use JUnit to write assertions and Mockito to supply test collaborators. Test that a booking service rejects unavailable seats.
Entity relationships map one-to-one, one-to-many and many-to-many associations. An order can own several order lines.`,
`Python uses lists for ordered mutable collections, tuples for fixed sequences, sets for uniqueness and dictionaries for key-value lookup.
PHP classes group properties and methods. An Order class can expose total() while keeping stored lines private.
Functions package behavior. Classes package behavior and state, such as a Python Cart with add and total methods.
C# supports static types, classes and async methods. A record can model immutable product data.
Handle expected exceptions where you can recover. Catch invalid numeric input and display a usable error.
ASP.NET Core hosts HTTP applications and APIs. Route a JSON booking POST to a controller or minimal API handler.
Comprehensions build collections from iterables. [item.name for item in products] extracts all product names.
Middleware handles shared request work; a controller handles an endpoint. Put request logging before controllers.
A virtual environment isolates Python dependencies. Use pip inside it to install locked or pinned requirements where applicable.
Inject a repository into a service constructor. Replace it in tests without changing business rules.
Flask is lightweight, FastAPI adds typed API-oriented validation, and Django includes an ORM and other full-stack features.
EF Core maps .NET entities to storage. A DbContext tracks changes and saves a newly added order.
PHP form handlers read submitted fields, arrays hold collections and sessions retain user-specific state across requests.
LINQ composes queries. Where selects paid orders and Select projects order numbers.
PDO prepared statements bind parameters separately from SQL. Bind the requested product ID instead of concatenating it.
Servlets process HTTP requests in a Java container. JSP can render server-side views using provided model values.`,
`A database stores data. A DBMS manages it. An RDBMS models relations as tables and supports operations and constraints over them.
INNER joins matches; LEFT and RIGHT preserve unmatched rows on one side; CROSS produces every pair. Combine shirt sizes and colors with CROSS.
Tables represent a relation; rows store records; columns store attributes. Products can contain one row per SKU.
FULL OUTER preserves unmatched rows from both sides. In MySQL, combine a left join with unmatched rows from the right using UNION ALL.
Primary identifies a row; foreign references another row; unique restricts duplicates; composite uses multiple columns. A slot key can combine room and start time.
A self join uses two aliases for the same table. Join employees to employees to find a manager name.
NOT NULL requires a value, CHECK enforces a predicate and DEFAULT supplies omitted values. Set quantity positive with a default of 1.
A subquery is a query nested within another query. Check whether an order has a related payment with EXISTS.
One-to-one pairs single rows, one-to-many connects parent and children, and many-to-many uses a link table such as enrollment.
UNION removes duplicate result rows; UNION ALL keeps them. Combine two branch sales lists with UNION ALL to retain matching purchases.
An ER diagram shows entities and cardinalities. Draw Customer 1 to many Orders and Order 1 to many Order Lines.
A view is a named query. Create a view of paid orders for repeated reporting.
1NF avoids repeating groups, 2NF removes partial dependencies on composite keys and 3NF removes inappropriate transitive dependencies. Move customer details out of order lines.
An index can find matching data with less scanning but costs storage and writes. Index frequently searched customer IDs and measure the query plan.
Denormalization duplicates or precomputes data for reads. Keep an order total as a snapshot and update it consistently.
ACID covers atomicity, consistency, isolation and durability. Debit and credit must commit together in a transfer.
DDL describes schema, DML changes rows, DQL reads, DCL manages access and TCL manages transactions. CREATE and GRANT serve different purposes.
COMMIT finalizes a transaction; ROLLBACK undoes uncommitted work. Roll back when an inventory update fails.
SELECT reads, INSERT adds, UPDATE edits and DELETE removes. Use a WHERE clause when targeting a particular product.
Isolation governs concurrent visibility and anomalies. Serializable aims for a result equivalent to some serial order and can require retries.
WHERE filters rows, ORDER BY sorts them and LIMIT caps results. Find the ten newest paid orders.
Locks coordinate access. A deadlock can occur when transactions wait on each other. Use consistent lock order and handle retryable aborts.
DISTINCT removes duplicate result rows for selected columns. Select distinct city to list each customer city once.
Prepared statements separate values from SQL syntax. Bind the product ID to a placeholder.
LIKE matches a pattern, IN matches a list, BETWEEN includes both ends and IS NULL tests missing SQL values.
EXPLAIN shows the plan chosen by the database. Check whether a lookup scans a table or uses an index.
Aggregates summarize rows. COUNT(*) counts rows, SUM adds amounts and AVG averages non-null inputs.
A stored procedure packages server-side work and a trigger runs on a database event. An audit trigger can record specific row changes.
GROUP BY creates groups and HAVING filters aggregate results. Keep only customers with two or more paid orders.
Backups preserve data for recovery. Run a restore test and record how much work and downtime could be lost.`,
`Relational systems emphasize tables and constraints. Document databases model nested documents. Choose based on invariants and access patterns.
Indexes accelerate selected queries; unique indexes prevent duplicate values under defined rules. Use a unique SKU index.
MongoDB stores BSON documents in collections. An order document can contain an array of lines and typed dates.
Embed bounded data you read together. Reference shared or independently queried records. Keep an order's shipping snapshot embedded.
ObjectId is a commonly used MongoDB identifier type. Convert a validated route ID to the stored type before querying.
Design document shape around reads, writes and growth. Keep a large unbounded event list in a separate collection.
Use insert, find, update and delete operations with a filter. Update the status of one order by its ID.
A Mongoose schema describes structure and rules; a model performs document operations for that schema.
Operators such as greater-than and inclusion express filters. Find orders whose amount exceeds 1,000.
Validate at the application boundary and consider database validation to protect writes from several clients.
Projection limits returned fields. An order list may need only IDs, dates and totals.
Mongoose populate fetches referenced documents. A booking query can load the associated customer name.
Sort by a consistent key, add an ID tie-breaker and paginate. A cursor is useful for a growing results list.
Use a multi-document transaction when changes must succeed together across documents. Prefer atomic single-document changes when possible.
An aggregation pipeline sends documents through stages. Match paid orders and group totals by customer.
Replication copies data for resilience; sharding distributes data across partitions. Choose shard keys for access and distribution.
Match filters, group calculates aggregates and lookup combines related collection data. Use match early when it reduces input.
During a network partition, distributed systems trade consistency against availability for affected operations. Explain which behavior a booking needs.`,
`Authentication proves identity. Authorization checks access to a resource. Signing in alone does not grant all bookings.
XSS happens when untrusted content becomes executable in a page. Render user comments as text and encode content for the output context.
A session stores signed-in state, often with a cookie carrying its identifier. The server verifies the session on each request.
Injection occurs when input changes a query's intended meaning. Bind SQL parameters and validate database filter shapes.
A signed JWT has a header, claims and signature. Verify its signature, expected issuer, audience and expiration.
Validate what enters the system and encode what is rendered. Validate a display name and use text-safe rendering at the output boundary.
Access tokens authorize API calls; refresh tokens obtain new access tokens. Keep access tokens short-lived where practical.
Secure limits cookies to secure transport, HttpOnly limits script access and SameSite controls selected cross-site sending.
Expires claims and session lifetimes limit reuse. Revoke active refresh sessions when signing out or after account changes as appropriate.
Browser-readable tokens face script-access risk; cookies have cross-site request considerations. Choose storage with an explicit threat model.
Passwords need slow one-way hashing. Encryption is reversible for data you must recover, such as an encrypted configuration field.
Limit repeated requests by suitable identities and routes. Apply limits to sign-in attempts and return clear retry guidance.
A unique salt means identical passwords normally produce different hashes. bcrypt and other password hashing schemes manage salting.
Keep credentials out of source, logs and browser bundles. Rotate compromised keys and use scoped permissions.
RBAC grants permissions by role. Apply least privilege, such as letting support staff read only records their work requires.
The OWASP Top 10 highlights common web risk categories. Use it to guide reviews of access control and other defenses.
OAuth delegates access. OpenID Connect adds identity information for sign-in through an ID token.
Check resource ownership for every request. A booking endpoint verifies that the booking belongs to the caller or an authorized role.
TLS protects confidentiality and integrity in transit and authenticates the server. Use HTTPS for sign-in and all authenticated pages.
Track dependency versions and apply tested fixes. Remove unused packages and review advisories for impact.
CORS authorizes specific browser cross-origin reads. Authentication is a separate server-side decision.
MFA requires multiple factor types, such as a password and a device-backed authenticator.
CSRF protections prevent unintended authenticated actions using ambient credentials. Use appropriate token and cookie controls.`,
`Git is version control. GitHub hosts repositories and collaboration. Commit locally, then push to the shared GitHub remote.
A conflict needs a decision about competing edits. Read both changes, resolve the file and test before completing the merge.
The repository stores history and metadata; the working tree contains files you edit. git status compares working, staged and committed changes.
Ignore generated files and local secrets. .gitignore does not automatically remove files already tracked.
Stage only desired changes, inspect the staged diff, and commit that snapshot with a useful message.
Stash temporarily stores uncommitted work. Inspect and apply it when returning to the original task.
init creates a repo; clone copies one; status shows changes; add stages them; commit records the staged snapshot.
Reset moves the current branch and can alter the index or files depending on mode. Revert adds an inverse commit to shared history.
git log shows history and git diff shows changes between states. Inspect a diff before staging a refactor.
Cherry-pick applies an existing commit's patch onto the current branch. Use it selectively for a release fix.
Branches are named commit pointers. git switch feature selects that branch and updates the working tree.
A tag names a particular commit. Tag v1.0.0 and publish release notes describing the shipped changes.
Merge combines histories; rebase replays commits on another base and changes IDs. Coordinate before rewriting shared commits.
Use a short-lived feature branch and review focused changes, or use the branching model your team agreed on.
Fetch updates remote-tracking branches. Pull fetches and integrates based on configuration. Fetch first when you want to inspect.
A README explains purpose, prerequisites and entry points. Include the command to run tests.
A remote names another repository. Push local commits to origin when ready to share them.
Keep credentials in secret storage. If one reaches Git, rotate it promptly because copies may persist.
A pull request proposes changes and starts review. Explain the expected behavior, verification and relevant tradeoffs.`,
`Plan, analyze, design, implement, test, deploy and maintain. Feedback can loop between these stages.
Refactoring changes structure while preserving visible behavior. Extract repeated pricing logic and run the same checkout tests.
A functional requirement defines behavior. A non-functional requirement defines a quality. Reserve a seat versus respond within 300 ms.
Singleton limits instances; Factory creates; Strategy swaps behavior; Observer notifies; Adapter converts interfaces; Repository abstracts persistence.
Waterfall organizes sequential phases. Agile uses iterative delivery and feedback. Choose planning around risk and uncertainty.
MVC splits data/logic, presentation and request coordination. A booking controller selects a view for a booking model.
Scrum defines accountabilities, events and artifacts. A sprint review inspects the increment with stakeholders.
Layers organize dependencies and responsibilities. Route and persistence concerns sit outside domain rules.
Kanban visualizes flow and limits work in progress. Cap in-progress items to make blocked work visible.
Give each part a clear responsibility. Keep payment verification out of UI rendering.
A user story names a user goal. Acceptance criteria make it testable, such as rejecting a booking when a seat is already reserved.
Class diagrams show structure, sequence diagrams show interactions over time and use cases show actor goals.
SOLID covers single responsibility, open-closed, substitution, interface segregation and dependency inversion. Use a small interchangeable payment contract.
Technical debt is a design or process shortcut with future costs. Track a manual release step that repeatedly delays fixes.
DRY avoids duplicated knowledge; KISS favors simple solutions; YAGNI delays unnecessary features. Build the booking flow before inventing plugins.
Review behavior, readability and tests. Ask about unclear decisions and propose concrete changes with reasons.
Use clear names and coherent boundaries. A reader should recognize which function validates or stores a booking.`,
`Unit tests isolate behavior; integration tests combine components; system and end-to-end tests check broad flows. Test a purchase at each useful boundary.
Coverage measures what code tests execute. High line coverage still needs meaningful assertions, such as checking rejected duplicate bookings.
Functional tests check behavior. Non-functional tests check qualities like performance, accessibility and reliability.
TDD starts with a failing test, then passes it and refactors. Write the test for rejecting a negative quantity first.
Regression tests catch old bugs; smoke checks basic readiness; sanity checks a focused change. Verify checkout opens before deep tests.
Jest and JUnit run tests in JS and Java. Testing Library checks rendered behavior; Mockito provides Java test doubles.
Black-box tests use visible behavior. White-box tests draw on implementation knowledge to exercise internal branches.
Send an API request and assert status, response schema and intended effects. Verify that posting a valid order returns its new ID.
A test case specifies input, steps and expected result. A bug report records steps, actual behavior, environment and evidence.
Use console, Network and Elements panels to find client errors, slow requests and wrong layout rules.
Boundary tests probe edges. For quantity 1–10, test 0, 1, 10 and 11. Partition similar valid and invalid inputs.
Pause at a breakpoint and inspect values and call frames. Read a stack trace from the error location to its calling context.
Positive cases exercise expected success. Negative cases verify handling of invalid conditions, like a request for a reserved seat.
Log events with timestamps, context and request IDs. Follow one failing request across services.
Stubs return controlled data; mocks check interactions. Stub a price and verify a confirmation request recorded the paid total.
Find reliable reproduction steps, vary one factor at a time and reduce to the smallest failing scenario.`,
`A process owns an address space; its threads share that space but have individual execution state. Coordinate shared memory updates.
An IP identifies a network endpoint, and a port identifies a service endpoint on a host and transport. HTTPS commonly uses TCP 443.
Concurrency manages overlapping tasks. Parallelism executes multiple tasks simultaneously. One thread can interleave I/O without running two instructions at once.
DNS resolves names to records, often including IP addresses. A browser finds a server address before opening a connection when needed.
The OS saves and restores execution state to switch tasks. Frequent switching can add overhead.
Resolve the host, establish the transport and security connection as needed, send the HTTP request and receive a response.
A race depends on timing. A deadlock is a standstill between waiting participants. Use consistent lock ordering and protect shared updates.
TLS negotiates a secure connection and verifies identity using certificates. Check certificate validity and hostname in HTTPS.
Memory management allocates and reclaims storage. Monitor unnecessary retained objects and large allocations.
A LAN connects nearby devices. A WAN links wider regions. An office network can reach an external cloud across a WAN.
Virtual memory gives processes address-space abstractions and maps pages to physical memory or backing storage.
Routers forward packets between networks. Firewalls enforce traffic rules, such as allowing only expected service ports.
File systems organize paths and metadata. Permissions determine which identities can read, write or execute.
A forward proxy serves client requests outward. A reverse proxy receives incoming requests before forwarding to a service.
Use pwd and ls to navigate, cat or less to read, and tail for recent logs. Check the current directory before changing files.
SSH provides secure remote sessions. SFTP transfers files through an SSH connection.
OSI describes seven conceptual layers. TCP/IP groups related functions more broadly. HTTP operates at the application layer.
Latency is time to deliver or respond; bandwidth is capacity per interval. A high-bandwidth connection can still have high latency.
TCP gives a reliable ordered byte stream. UDP provides datagrams without built-in ordering or retransmission guarantees.`,
`Build creates deployable artifacts. Runtime executes them. Client-side build values can be visible in delivered files.
Azure provides compute, storage, databases and identity among other services. A managed app can use a managed database.
Development is for changes, staging for production-like checks and production for actual users. Give each environment its own credentials.
An image packages files; a container runs from an image; Dockerfile builds it; Compose defines cooperating services for an environment.
Configure deployments with environment variables and store privileged values securely. Client bundle variables cannot remain secret.
CI integrates and tests changes. Continuous delivery keeps releases deployable; continuous deployment automates production release.
Check processes, permissions, ports and logs when diagnosing a Linux-hosted service.
GitHub Actions runs defined jobs on events. A push can trigger installation, tests and a static build.
NGINX can serve generated files or reverse proxy requests to an app. Define routes and inspect its logs when an endpoint fails.
A pipeline checks source, builds once, tests artifacts and deploys the approved result. Record the deployed commit.
WinSCP can transfer files via SFTP. Verify the server identity and target path before transferring build files.
Logs provide event detail; monitoring measures service health. Alert on an increase in error rate or latency.
A domain is a name, DNS routes it to the service, and a TLS certificate verifies the name in HTTPS.
Roll back to a known-good deployment and consider database compatibility. Verify the earlier code can still read the current schema.
Vercel and Netlify can build deployments from Git. Check build command, output directory and environment variables.
Back up important data and validate restore procedures. Define how much data loss and downtime are acceptable.
IAM handles access, EC2 supplies virtual servers, S3 stores objects and RDS manages relational databases.
Infrastructure as code declares infrastructure in versioned files. Review a plan before applying changes.`,
`Scalability handles increasing load. Availability keeps a service usable. Redundancy can support both depending on design.
Event-driven systems react to facts like BookingCreated. A notification worker can subscribe independently of the booking API.
Scale vertically with a larger instance or horizontally with more instances. Horizontal replicas benefit from stateless request handling.
An API gateway is a shared entry point for routing, policy and cross-cutting concerns. It can route bookings to one service and payments to another.
A load balancer distributes requests across healthy instances. Remove failed instances from rotation using health checks.
Strong consistency offers specified agreement guarantees; eventual consistency allows temporary disagreement that converges under suitable conditions.
A cache saves repeated work. Use Redis for frequently read catalogue summaries with explicit expiry and invalidation.
Fault tolerance limits the impact of failures. A temporary email outage can delay confirmation without losing bookings.
A CDN serves content near users. Cache static assets with versioned filenames so old and new files coexist safely.
Set deadlines and retry transient failures selectively. Backoff and jitter prevent synchronized retries.
Indexes speed selected reads. Replication copies data for resilience or read scaling, sometimes with replication lag.
Repeated application of an idempotent operation has the same intended effect. A stable key protects booking retries from duplicates.
SQL often helps relational invariants and joins. NoSQL can fit document-shaped access. Choose from workload and integrity needs.
Logs explain events, metrics quantify trends and traces connect work across services. Track booking latency and conflicts.
Queues buffer background work. Handle duplicate delivery and retries in a confirmation worker.
Define requirements, sketch UI, API and storage, then protect the main invariant. Use a unique slot key in a booking system.`,
`React Native uses native views; React web uses browser DOM elements. A mobile screen may use View where web uses div.
On-page SEO improves page content and metadata. Technical SEO addresses crawlability, indexing and performance.
Expo supplies tooling and services for React Native projects. Start and test a mobile app with its development workflow.
Titles identify pages and descriptions summarize them. Give each product page accurate metadata.
Navigation maps routes and back transitions. Pass the selected product ID into a detail screen.
A canonical URL signals a preferred URL for substantially duplicate content. Use the clean product URL for tracking variants.
NativeWind brings utility-style classes to React Native. Use consistent spacing and colors across compatible components.
Sitemaps list discoverable URLs. robots.txt gives crawl instructions and does not protect private pages.
Appwrite can provide authentication and databases. Set permissions on resources for the intended user or role.
Structured data describes content in machine-readable form. Use supported schema fields for product details.
Flutter builds UI by combining widgets. Dart holds application logic, types and asynchronous operations.
Improve page speed by reducing oversized assets and unnecessary work. Serve a right-sized product image and measure LCP.
A mobile client needs loading, error and retry states. Handle poor connections and store sensitive credentials appropriately.
A chatbot calls a model service with messages. Keep the provider secret on the server and validate requests and responses.
Shopify themes render storefronts with Liquid templates and sections. A product section can display data from the current product.
A prompt should specify task, context and desired output. Request a short support answer based on approved product data.
Collections group products; metafields add structured custom data. A product metafield can hold a size guide reference.
Treat generated responses as untrusted data. Validate schema and remove unnecessary private information before sending prompts.`,
`The server creates a payment request and redirects the customer to the provider. Confirm the result independently after return.
Distinguish failed, cancelled and pending payments. Keep unpaid orders recoverable according to your workflow.
Sandbox simulates transactions with separate credentials. Production charges real funds and uses production settings.
Compare verified amount and currency with the order's expected values before marking it paid.
A stable transaction reference connects provider and order records. Save it before payment begins where supported.
Reconciliation compares provider records with internal transactions. Investigate expected payments missing from either side.
A payment moves through states such as pending, paid, failed or refunded. Define which transitions are valid.
Reduce direct handling of payment details by using a provider-hosted flow. Restrict access and avoid logging sensitive values.
Check payment status with trusted provider information on the server. A browser redirect alone has insufficient authority.
Log request IDs and safe state transitions. Keep payment credentials, signatures and sensitive payment details out of logs.
A customer return callback supports navigation; a webhook independently informs your server. Use verified provider data for fulfillment.
PCI DSS sets security requirements for cardholder data environments. Confirm the specific obligations of your integration.
Follow provider requirements to verify authenticity with the appropriate key and input bytes before trusting notifications.
Describe the actual LGPS fields, verification and failure cases you handled. Use project evidence where available.
Use a unique provider transaction reference and an atomic status update. A repeated verified delivery can return success without recording payment twice.`,
`Reverse a sequence by reading it from end to start. For ordinary ASCII, "MANGO" becomes "OGNAM".
With sorted arrays [1,4] and [2,3], repeatedly take the smaller front item. Result: [1,2,3,4].
Normalize the text and compare it with its reverse. "Level" matches after case normalization.
Push opening brackets, and pop and compare for each closing bracket. ([)] fails because ) does not match [.
Count normalized letters in both strings. "listen" and "silent" share the same counts.
Write down each variable change and the print order. In the event loop lab, synchronous lines print before Promise and timer callbacks.
Scan the text and increment each character's count in a map. "mama" gives m:2 and a:2.
Reproduce the failure, inspect the first incorrect value and fix the smallest cause. Use an absent target to test binary-search bounds.
Use a set for seen values and keep first occurrences. [2,1,2] becomes [2,1].
Join orders to customers by customer ID, group by customer then filter counts with HAVING. Try the SQL lab.
For a complete range 1–n with exactly one missing value, subtract the actual sum from n(n+1)/2. [1,3,4] is missing 2.
Group records by the duplicate key and use HAVING COUNT(*) > 1. Group by normalized email when that is the business key.
Track the largest and second-largest distinct values. For [8,8,5], the second-largest distinct value is 5.
Build a labeled HTML form with width up to a readable maximum. Use Tab to check focus and let fields shrink on small screens.
Check target minus the current value in a map of earlier items. [2,7] with target 9 returns indices [0,1].
Keep the typed query as state and derive a filtered list from it. Use stable IDs for results.
Test divisibility by both 3 and 5 first, then the single cases. 15 is FizzBuzz.
Define endpoints for create, read, update and delete. Validate payloads and return appropriate statuses.
Try divisors from 2 through the square root. 29 has no divisor in that range and is prime.
Use a standard sign-in flow and enforce access on each protected server request. Check that another user cannot read your record.
Factorial multiplies descending factors to 1. Fibonacci combines two prior values. Iteration avoids repeating Fibonacci subproblems.
Read competing changes, edit the agreed final file, stage it and run tests before completing the merge.
Find the midpoint of the current sorted range, discard the impossible half and handle an absent target. Try the binary search lab.`,
`Give a short introduction with your background, relevant project work and why this internship fits your current interests.
Describe Movie Explorer's real data source, ranking rule, tie-breaking and what you built. Walk through one example movie.
Name the user problem, architecture and your own contribution. Point to a concrete component or endpoint.
Explain the Shopify theme sections and SEO changes you actually implemented. Mention the checks you ran.
Compare stack choices for the actual project's needs, such as validation, iteration speed and deployment constraints.
Describe the LGPS payment request, server verification and stored outcome you worked on. Use real implementation details.
Draw user action to frontend, API route to service, database query and response back to UI. Label the data at each boundary.
Describe the NGINX configuration, deployment target and one real debugging step such as checking proxy logs.
Explain two related tables, their keys and one API endpoint that uses them. Mention constraints and response shape.
Choose a real technical problem. Show how you isolated its cause, considered options and verified your fix.
Describe the Medi Track inventory workflow, chatbot boundary and your contributions. Explain how inventory changes are validated.
Explain what you tested yourself, how the team reviewed changes and an example of feedback you applied.
Explain the Nature Pulse authentication and booking flow with the actual access rules and storage choices.
Pick one practical improvement. Explain what problem it solves and how you would verify the benefit.
Explain how UNI Hub checked credentials or tokens and enforced roles. Separate actual configuration from ideas you studied.
Separate things you built, things your team built and concepts you only studied. Use examples and honest uncertainty.`,
`Describe what you enjoy building or debugging and give a specific experience that led you toward software engineering.
Explain how you clarify a client's goal and confirm decisions. Describe one example of reducing ambiguity.
Name a specific product, engineering practice or domain at the company and connect it to genuine interests.
Show what you tried, give a short reproduction and ask a focused question. Mention how you used the help.
Give a strength with evidence and a genuine weakness with a concrete improvement habit.
Use AI for learning or drafting within team rules. Verify suggestions, protect sensitive inputs and understand any code used.
Choose a small project to learn the core workflow, read official docs, and test what you can explain.
Explain inputs, outputs, decisions and edge cases without reading an AI answer. Dry-run a small example from memory.
Prioritize critical scope, communicate risks early and agree on tradeoffs. State what shipped and what moved.
Tell the situation and task briefly, describe your actions in detail and finish with a result.
Discuss the disagreement respectfully, show how you listened and explain how the team decided.
Ask how interns receive feedback, what ownership looks like and which project outcomes matter.
Explain the feedback, what changed afterward and how you checked improvement.
Match the job requirements to genuine examples. Prepare one question about the team's actual stack or work.
Describe a mistake without blaming others, explain the fix and identify the habit that reduced repeat risk.`
);
export const topicGuides = guides.map(guide=>guide.split('\n'));
