const setup = "import { createRoot } from 'react-dom/client';\n";
const make = (title, en, si, output, source) => ({
  title, en, si, output, lang:'React JSX',
  code: setup + source + "\n\ncreateRoot(document.getElementById('root')).render(<App />);",
});
export const reactExamples = {
  'props-state': make('Juice card with props and state','Pass a drink name from App, store the local quantity in JuiceCard, then update it from the button.','App එකෙන් drink name එක pass කරන්න. JuiceCard එකේ quantity state තියාගෙන button එකෙන් update කරන්න.','Mango juice stays the same. Add one changes 0 → 1 → 2.',`import { useState } from 'react';

function JuiceCard({ name }) {
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <h2>{name}</h2>
      <p>Quantity: {quantity}</p>
      <button onClick={() => setQuantity(previous => previous + 1)}>
        Add one
      </button>
    </>
  );
}

function App() {
  return <JuiceCard name="Mango juice" />;
}`),
  'search-form': make('Search a menu and save an order note','Keep the query in React and derive filtered results. Let the browser hold the note until the form is submitted.','Search query එක React state එකේ තියාගන්න. Note එක submit කරන තුරු DOM එකේ තියාගන්න.','Type lime to keep only Lime juice. Save a note to see it below the form.',`import { useState } from 'react';

const menu = [
  { id: 'mango', name: 'Mango juice' },
  { id: 'lime', name: 'Lime juice' },
];

function App() {
  const [query, setQuery] = useState('');
  const [note, setNote] = useState('');
  const visible = menu.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  function saveNote(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setNote(data.get('note').trim());
  }

  return (
    <>
      <label>Search <input value={query} onChange={event => setQuery(event.target.value)} /></label>
      {visible.length ? (
        <ul>{visible.map(item => <li key={item.id}>{item.name}</li>)}</ul>
      ) : <p>No drinks match.</p>}
      <form onSubmit={saveNote}>
        <label>Order note <input name="note" defaultValue="" required /></label>
        <button>Save note</button>
      </form>
      {note && <p>Saved: {note}</p>}
    </>
  );
}`),
  'shared-order': make('Share one order between sibling components','Move quantity into App. Pass the add callback and count down to separate children.','Quantity එක common parent App එකට ගන්න. Callback එක සහ count එක වෙන වෙනම children වලට pass කරන්න.','Adding from the menu updates the separate receipt.',`import { useState } from 'react';

function Panel({ children }) {
  return <section>{children}</section>;
}
function Menu({ onAdd }) {
  return <button onClick={onAdd}>Add one</button>;
}
function Receipt({ quantity }) {
  return <p>Receipt: {quantity} drinks</p>;
}
function App() {
  const [quantity, setQuantity] = useState(0);
  return (
    <Panel>
      <Menu onAdd={() => setQuantity(current => current + 1)} />
      <Receipt quantity={quantity} />
    </Panel>
  );
}`),
  'render-keys': make('Keep the right quantity when cards move','Render cards from a list and key each card by its product ID so React can keep its local state attached to the right product.','Product ID එක key විදිහට යොදන්න. List order එක මාරු වුණත් state එක අදාළ card එකේම තියෙනවා.','Add one to Mango, then reverse the list. Mango keeps its quantity.',`import { useState } from 'react';

function Drink({ name }) {
  const [quantity, setQuantity] = useState(0);
  return <li><button onClick={() => setQuantity(n => n + 1)}>{name}: {quantity}</button></li>;
}

function App() {
  const [drinks, setDrinks] = useState([
    { id: 'mango', name: 'Mango' },
    { id: 'lime', name: 'Lime' },
  ]);

  return (
    <>
      <button onClick={() => setDrinks(list => [...list].reverse())}>Reverse list</button>
      <ul>{drinks.map(drink => <Drink key={drink.id} name={drink.name} />)}</ul>
    </>
  );
}`),
  'route-drinks': make('Choose a drink with a route parameter','Keep a shared app shell, define a dynamic route and read its ID through useParams.','App shell එක තියාගෙන dynamic route එකක් හදන්න. useParams වලින් ID එක කියවන්න.','Click a link to switch drink details inside the same page.',`import { MemoryRouter, Link, Route, Routes, useParams } from 'react-router-dom';

function DrinkDetails() {
  const { drinkId } = useParams();
  return <p>Selected drink: {drinkId}</p>;
}

function App() {
  return (
    <MemoryRouter>
      <nav><Link to="/drinks/mango">Mango</Link> · <Link to="/drinks/lime">Lime</Link></nav>
      <Routes>
        <Route path="/" element={<p>Select a drink.</p>} />
        <Route path="/drinks/:drinkId" element={<DrinkDetails />} />
      </Routes>
    </MemoryRouter>
  );
}`),
  'effect-fetch': make('Load store stock while selections change','Start a request for the selected store and abort it when the selection changes. This preview uses a simulated API.','තෝරපු store එකට request එකක් පටන් ගන්න. Selection වෙනස් වුණාම පරණ request එක abort කරන්න. Demo එක simulated API එකක්.', 'Choose Town, Empty or Unavailable to see loading, success, empty and error states.',`import { useEffect, useState } from 'react';

function fetchStock(store, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (store === 'unavailable') reject(new Error('Store unavailable'));
      else resolve(store === 'empty' ? [] : ['Mango', 'Lime']);
    }, 500);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Cancelled', 'AbortError'));
    }, { once: true });
  });
}

function useStock(store) {
  const [result, setResult] = useState({ status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    setResult({ status: 'loading' });
    fetchStock(store, controller.signal)
      .then(drinks => setResult({ status: 'success', drinks }))
      .catch(error => {
        if (error.name !== 'AbortError') setResult({ status: 'error', error });
      });
    return () => controller.abort();
  }, [store]);
  return result;
}

function App() {
  const [store, setStore] = useState('town');
  const result = useStock(store);
  return (
    <>
      <label>Store <select value={store} onChange={event => setStore(event.target.value)}>
        <option value="town">Town</option>
        <option value="empty">Empty</option>
        <option value="unavailable">Unavailable</option>
      </select></label>
      {result.status === 'loading' && <p>Loading…</p>}
      {result.status === 'error' && <p>{result.error.message}</p>}
      {result.status === 'success' && <p>{result.drinks.join(', ') || 'No stock'}</p>}
    </>
  );
}`),
  'shared-context': make('Share a theme and focus the order field','Read the theme from the closest context provider. Use a ref for the input, and reducer actions to update an order count.','Theme එක provider එකෙන් කියවන්න. Input එක focus කරන්න ref එකක් සහ order count එකට reducer actions යොදන්න.','Focus the label field, then add or reset drinks.',`import { createContext, useContext, useReducer, useRef } from 'react';

const Theme = createContext('classic');

function orderReducer(quantity, action) {
  if (action.type === 'add') return quantity + 1;
  if (action.type === 'reset') return 0;
  return quantity;
}

function OrderControls() {
  const theme = useContext(Theme);
  const name = useRef(null);
  const [quantity, dispatch] = useReducer(orderReducer, 0);
  return (
    <>
      <p>Theme: {theme} · Quantity: {quantity}</p>
      <label>Order label <input ref={name} /></label>
      <button onClick={() => name.current.focus()}>Focus label</button>
      <button onClick={() => dispatch({ type: 'add' })}>Add</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}

function App() {
  return <Theme.Provider value="tropical"><OrderControls /></Theme.Provider>;
}`),
  'memo-menu': make('Memoize menu work with stable inputs','Memoize a filtered list by its query, and keep the child callback stable. Toggle an unrelated update to compare the behavior.','Query එක අනුව filtered list එක memoize කරන්න. Child callback එක stable තියාගන්න. Unrelated update එකක් toggle කරලා බලන්න.','Search filters the menu. Toggle receipt updates a separate value without changing the menu props.',`import { memo, useCallback, useMemo, useState } from 'react';

const drinks = ['Mango', 'Lime', 'Orange'];

const Menu = memo(function Menu({ items, onSelect }) {
  return <ul>{items.map(item =>
    <li key={item}><button onClick={() => onSelect(item)}>{item}</button></li>
  )}</ul>;
});

function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('None');
  const [receipt, setReceipt] = useState(false);
  const items = useMemo(
    () => drinks.filter(drink => drink.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const select = useCallback(drink => setSelected(drink), []);

  return (
    <>
      <label>Search <input value={query} onChange={event => setQuery(event.target.value)} /></label>
      <Menu items={items} onSelect={select} />
      <button onClick={() => setReceipt(value => !value)}>Toggle receipt</button>
      <p>{receipt ? 'Receipt open' : 'Receipt closed'} · Selected: {selected}</p>
    </>
  );
}`),
  'error-boundary': make('Keep checkout usable when a receipt fails','Wrap the receipt in an error boundary. Trigger a render error and leave the rest of the app on screen.','Receipt එක error boundary එකකින් wrap කරන්න. Render error එකක් ආවත් app එකේ අනිත් කොටස පේනවා.','Click Simulate error to show a receipt fallback. Reset receipt remounts the boundary.',`import { Component, useState } from 'react';

class ReceiptBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <p>Receipt unavailable.</p> : this.props.children;
  }
}

function Receipt({ broken }) {
  if (broken) throw new Error('Receipt could not render');
  return <p>Receipt ready.</p>;
}

function App() {
  const [broken, setBroken] = useState(false);
  const [revision, setRevision] = useState(0);
  return (
    <>
      <button onClick={() => setBroken(true)}>Simulate error</button>
      <button onClick={() => { setBroken(false); setRevision(n => n + 1); }}>Reset receipt</button>
      <ReceiptBoundary key={revision}><Receipt broken={broken} /></ReceiptBoundary>
    </>
  );
}`),
  'lazy-receipt': make('Load the receipt only when it is opened','Wrap a dynamic import in lazy and show a Suspense fallback if loading takes time. The Receipt module is listed below.','Dynamic import එක lazy වලින් wrap කරන්න. Module එක load වෙද්දී Suspense fallback එක පෙන්වන්න.','Click Open receipt to load and show the receipt module.',`import { lazy, Suspense, useState } from 'react';

const Receipt = lazy(() => import('./Receipt.jsx'));

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open receipt</button>
      {open && <Suspense fallback={<p>Loading the receipt…</p>}><Receipt /></Suspense>}
    </>
  );
}`),
};

reactExamples['lazy-receipt'].files = {
  'Receipt.jsx': 'export default function Receipt() {\n  return <p>Receipt loaded.</p>;\n}',
};

reactExamples['redux-cart'] = make('Keep a cart count in a Redux Toolkit store','Create a slice, configure the store, then read and update it through React Redux hooks.','Slice එකක් හදලා store එක configure කරන්න. Hooks වලින් count එක කියවා update කරන්න.','Add one updates the shared store and the separate receipt.',`import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

const cart = createSlice({
  name: 'cart',
  initialState: { quantity: 0 },
  reducers: {
    addOne(state) {
      state.quantity += 1;
    },
  },
});
const store = configureStore({ reducer: { cart: cart.reducer } });

function AddButton() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(cart.actions.addOne())}>Add one</button>;
}

function Receipt() {
  const quantity = useSelector(state => state.cart.quantity);
  return <p>Receipt: {quantity} drinks</p>;
}

function App() {
  return <Provider store={store}><AddButton /><Receipt /></Provider>;
}`);

reactExamples['props-state'].files = {
  'App.test.jsx': `// Testing Library + Vitest with a jsdom environment.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import App from './App.jsx';

test('adds one juice without changing its name', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Add one' }));
  expect(screen.getByText('Quantity: 1')).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'Mango juice' })).toBeTruthy();
});`,
};
reactExamples['props-state'].testApp = reactExamples['props-state'].code
  .split('\n').slice(1,-2).join('\n').replace('function App()', 'export default function App()');
