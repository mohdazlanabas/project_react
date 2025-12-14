import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Card from "./components/Card.jsx";
import Button from "./components/Button.jsx";
import Modal from "./components/Modal.jsx";
import Tabs from "./components/Tabs.jsx";
import Accordion from "./components/Accordion.jsx";
import Toast from "./components/Toast.jsx";
import Table from "./components/Table.jsx";
import List from "./components/List.jsx";
import Pagination from "./components/Pagination.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Form from "./components/Form.jsx";

function InnerApp() {
  const { isLight } = useTheme();

  // Nav (useState)
  const [nav, setNav] = useState("Dashboard");

  // “Busy” demo (useEffect)
  const [isBusy, setIsBusy] = useState(false);
  useEffect(() => {
    setIsBusy(true);
    const t = setTimeout(() => setIsBusy(false), 450);
    return () => clearTimeout(t);
  }, [nav]);

  // Data model + pagination/search (useMemo)
  const seed = useMemo(
    () => [
      { id: 1, name: "Ops Schedule", type: "Feature", score: 78 },
      { id: 2, name: "Dashboard Cards", type: "Feature", score: 88 },
      { id: 3, name: "Search Filter", type: "Chore", score: 65 },
      { id: 4, name: "Modal Close Bug", type: "Bug", score: 52 },
      { id: 5, name: "Toast UX", type: "Feature", score: 73 },
      { id: 6, name: "Table Sorting", type: "Chore", score: 60 },
      { id: 7, name: "Pagination", type: "Feature", score: 70 },
      { id: 8, name: "Accordion Copy", type: "Chore", score: 49 },
      { id: 9, name: "Theme Toggle", type: "Feature", score: 92 },
      { id: 10, name: "Form Validation", type: "Bug", score: 41 },
      { id: 11, name: "Data Export", type: "Feature", score: 67 },
      { id: 12, name: "Spinner Polish", type: "Chore", score: 55 },
    ],
    []
  );

  // useReducer: manage items list
  function itemsReducer(state, action) {
    switch (action.type) {
      case "init":
        return action.payload;
      case "add":
        return [{ ...action.payload, id: Date.now() }, ...state];
      default:
        return state;
    }
  }
  const [items, dispatch] = useReducer(itemsReducer, []);
  useEffect(() => {
    dispatch({ type: "init", payload: seed });
  }, [seed]);

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((x) => (x.name + " " + x.type).toLowerCase().includes(q));
  }, [items, query]);

  const pageSize = 5;
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [query]);

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Modal + Toasts
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // useCallback: stable handlers
  const pushToast = useCallback((msg) => {
    const id = Date.now();
    setToasts((t) => [{ id, msg }, ...t]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  // Form state
  const [form, setForm] = useState({ name: "", type: "Feature", priority: false });

  const submitForm = useCallback(() => {
    const name = form.name.trim();
    if (!name) return pushToast("Name is required.");
    const score = form.priority ? 90 : 60;
    dispatch({ type: "add", payload: { name, type: form.type, score } });
    pushToast(`Added "${name}" (${form.type})`);
    setForm({ name: "", type: "Feature", priority: false });
    setNav("Data");
  }, [form, pushToast]);

  // useMemo: derived stats for sidebar
  const stats = useMemo(
    () => ({ total: items.length, filtered: filtered.length, page }),
    [items.length, filtered.length, page]
  );

  // Tabs inside Dashboard
  const dashboardTabs = ["Overview", "Accordion", "Actions"];
  const [dashTab, setDashTab] = useState("Overview");

  return (
    <div className={isLight ? "themeLightApp shell" : "shell"}>
      <Header active={nav} onNav={setNav} />

      <div className="container">
        <Sidebar isBusy={isBusy} stats={stats} />

        <main className="main">
          {nav === "Dashboard" && (
            <div className="grid">
              <Card title="#1 Card + #7 Tabs + #8 Accordion" right={<span style={{ opacity: 0.7 }}>useState</span>}>
                <Tabs tabs={dashboardTabs} active={dashTab} onChange={setDashTab} />
                {dashTab === "Overview" && (
                  <div style={{ opacity: 0.9 }}>
                    This app intentionally shows lots of "small components" working together.
                    Search + pagination + table are wired with <b>useMemo</b>.
                  </div>
                )}
                {dashTab === "Accordion" && (
                  <Accordion
                    items={[
                      { id: "a", title: "Why components?", body: "Reuse, separation, testability, clarity." },
                      { id: "b", title: "Why hooks?", body: "State + effects + memoization without classes." },
                      { id: "c", title: "Where next?", body: "Add routing, API fetch, and form validation." },
                    ]}
                  />
                )}
                {dashTab === "Actions" && (
                  <div className="row">
                    <Button variant="primary" onClick={() => setModalOpen(true)}>
                      #6 Open Modal
                    </Button>
                    <Button onClick={() => pushToast("Hello from Toast!")}>Push Toast</Button>
                  </div>
                )}
              </Card>

              <Card title="#11 List + #13 SearchBar + #12 Pagination">
                <SearchBar value={query} onChange={setQuery} />
                <List
                  items={pageRows}
                  onPick={(it) => {
                    pushToast(`Picked: ${it.name}`);
                  }}
                />
                <Pagination
                  page={page}
                  pages={pages}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => Math.min(pages, p + 1))}
                />
              </Card>
            </div>
          )}

          {nav === "Data" && (
            <div className="grid">
              <Card title="#10 Table + #12 Pagination">
                <div style={{ opacity: 0.85, marginBottom: 10 }}>
                  Filtered rows: <b>{filtered.length}</b>
                </div>
                <Table rows={pageRows} />
                <Pagination
                  page={page}
                  pages={pages}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => Math.min(pages, p + 1))}
                />
              </Card>

              <Card title="#6 Modal + #9 Toast + #2 Button">
                <div className="row">
                  <Button variant="primary" onClick={() => setModalOpen(true)}>
                    Open Modal
                  </Button>
                  <Button onClick={() => pushToast("Data page toast fired.")}>Fire Toast</Button>
                </div>
                <div style={{ marginTop: 10, opacity: 0.85 }}>
                  Modal uses <b>useEffect</b> for ESC-to-close. Toasts auto-expire.
                </div>
              </Card>
            </div>
          )}

          {nav === "Form" && (
            <div className="grid">
              <Card title="#14 Form + #15 TextInput + #16 Select + #17 Checkbox">
                <Form value={form} onChange={setForm} onSubmit={submitForm} />
              </Card>

              <Card title="#2 Button (with variants) + useReducer Demo">
                <div style={{ opacity: 0.9 }}>
                  Items are managed by <b>useReducer</b> to demonstrate the "state machine-ish" approach.
                  It's nice once state starts to sprawl across many actions.
                </div>
                <hr />
                <div className="row">
                  <Button onClick={() => pushToast(`Total items: ${items.length}`)}>Show count</Button>
                  <Button
                    variant="danger"
                    onClick={() => pushToast("Try adding an item above (no delete in this demo).")}
                  >
                    Danger button
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {nav === "About" && (
            <Card title="About this demo - All 20 Components">
              <div style={{ opacity: 0.9, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 12, fontWeight: 600 }}>Component List:</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px", fontSize: "13px" }}>
                  <div>#1 Card</div>
                  <div>#2 Button</div>
                  <div>#3 Header</div>
                  <div>#4 Footer</div>
                  <div>#5 Sidebar</div>
                  <div>#6 Modal</div>
                  <div>#7 Tabs</div>
                  <div>#8 Accordion</div>
                  <div>#9 Toast</div>
                  <div>#10 Table</div>
                  <div>#11 List</div>
                  <div>#12 Pagination</div>
                  <div>#13 SearchBar</div>
                  <div>#14 Form</div>
                  <div>#15 TextInput</div>
                  <div>#16 Select</div>
                  <div>#17 Checkbox</div>
                  <div>#18 Spinner</div>
                  <div>#19 ThemeToggle</div>
                  <div>#20 Navbar</div>
                </div>
                <hr />
                <ul style={{ margin: "12px 0 0", paddingLeft: 18 }}>
                  <li>Separate files per component</li>
                  <li>Hooks: useState/useEffect/useContext/useRef/useMemo/useCallback/useReducer</li>
                  <li>Custom hook: useLocalStorage (persists theme)</li>
                </ul>
              </div>
            </Card>
          )}

          {nav === "Guide" && (
            <div className="grid">
              <Card title="Component Guide - Part 1 (Components #1-10)">
                <div style={{ fontSize: "13px", lineHeight: 1.8, opacity: 0.95 }}>
                  <div style={{ marginBottom: 8 }}><b>1. To see #1 Card:</b> You're looking at one right now! Cards are container components visible on every page (Dashboard, Data, Form, About, Guide).</div>

                  <div style={{ marginBottom: 8 }}><b>2. To see #2 Button:</b> Go to Dashboard → click "Actions" tab → see buttons like "Open Modal" and "Push Toast". Also in Data and Form pages. Buttons have variants (primary, danger, default).</div>

                  <div style={{ marginBottom: 8 }}><b>3. To see #3 Header:</b> Look at the top of this page - the header is always visible with the title, description, and theme toggle.</div>

                  <div style={{ marginBottom: 8 }}><b>4. To see #4 Footer:</b> Look at the bottom of this page - shows developer info (net1io.com), live time/date, timezone, and copyright. Updates every second!</div>

                  <div style={{ marginBottom: 8 }}><b>5. To see #5 Sidebar:</b> Look at the left side of the screen - shows live stats (total items, filtered count, current page). Watch the spinner when switching pages.</div>

                  <div style={{ marginBottom: 8 }}><b>6. To see #6 Modal:</b> Go to Dashboard → click "Actions" tab → click "Open Modal" button. Or go to Data page → click "Open Modal". Press ESC or click outside to close.</div>

                  <div style={{ marginBottom: 8 }}><b>7. To see #7 Tabs:</b> Go to Dashboard → see tabs at top of left card ("Overview", "Accordion", "Actions"). Click each tab to switch content.</div>

                  <div style={{ marginBottom: 8 }}><b>8. To see #8 Accordion:</b> Go to Dashboard → click "Accordion" tab → click on accordion items to expand/collapse them (▸/▾ arrows).</div>

                  <div style={{ marginBottom: 8 }}><b>9. To see #9 Toast:</b> Go to Dashboard → click "Actions" tab → click "Push Toast" button. Toasts appear in bottom-right corner and auto-dismiss after 2.6 seconds.</div>

                  <div style={{ marginBottom: 8 }}><b>10. To see #10 Table:</b> Go to Data page → see the data table showing items with Name, Type, and Score columns. Styled with borders and proper formatting.</div>
                </div>
              </Card>

              <Card title="Component Guide - Part 2 (Components #11-20)">
                <div style={{ fontSize: "13px", lineHeight: 1.8, opacity: 0.95 }}>
                  <div style={{ marginBottom: 8 }}><b>11. To see #11 List:</b> Go to Dashboard → see the right card with a list of items. Click any item to trigger a toast notification showing what you picked.</div>

                  <div style={{ marginBottom: 8 }}><b>12. To see #12 Pagination:</b> Go to Dashboard or Data page → look at bottom of the list/table → use "Previous" and "Next" buttons to navigate pages. Shows current page number.</div>

                  <div style={{ marginBottom: 8 }}><b>13. To see #13 SearchBar:</b> Go to Dashboard → see search input above the list → type keywords like "modal", "bug", or "feature" to filter items in real-time. Watch pagination reset to page 1!</div>

                  <div style={{ marginBottom: 8 }}><b>14. To see #14 Form:</b> Go to Form page → see the form with multiple input fields (Name, Type, Priority checkbox) and Submit button.</div>

                  <div style={{ marginBottom: 8 }}><b>15. To see #15 TextInput:</b> Go to Form page → see the "Name" field with label → type text to see it update in real-time.</div>

                  <div style={{ marginBottom: 8 }}><b>16. To see #16 Select:</b> Go to Form page → see "Type" dropdown → click to see options (Feature, Bug, Chore) and select different values.</div>

                  <div style={{ marginBottom: 8 }}><b>17. To see #17 Checkbox:</b> Go to Form page → see "High Priority" checkbox → click to toggle it on/off.</div>

                  <div style={{ marginBottom: 8 }}><b>18. To see #18 Spinner:</b> Look at the Sidebar (left side) → switch between different nav items (Dashboard, Data, Form) → watch the spinner appear briefly while content loads.</div>

                  <div style={{ marginBottom: 8 }}><b>19. To see #19 ThemeToggle:</b> Look at top-right corner of Header → click the sun/moon icon to switch between light and dark themes. Theme persists using localStorage!</div>

                  <div style={{ marginBottom: 8 }}><b>20. To see #20 Navbar:</b> Look at the navigation pills in the Header (Dashboard, Data, Form, About, Guide). Click any to navigate. Active page is highlighted.</div>
                </div>
              </Card>

              <Card title="React Hooks Usage Guide">
                <div style={{ fontSize: "13px", lineHeight: 1.8, opacity: 0.95 }}>
                  <div style={{ marginBottom: 8 }}><b>To see useState:</b> Switch between any nav items → tabs change, form inputs update. Used everywhere for component state (nav, modal open/close, form values, etc.).</div>

                  <div style={{ marginBottom: 8 }}><b>To see useEffect:</b> Watch the Sidebar spinner when switching pages (isBusy state). Check Footer's live time updates. Open Modal and press ESC key to close (ESC listener added via useEffect).</div>

                  <div style={{ marginBottom: 8 }}><b>To see useContext:</b> Toggle theme (top-right) → entire app updates using ThemeContext. All components consume theme state without prop drilling.</div>

                  <div style={{ marginBottom: 8 }}><b>To see useRef:</b> Components like Modal use refs for focusing elements and managing DOM references without re-renders.</div>

                  <div style={{ marginBottom: 8 }}><b>To see useMemo:</b> Go to Dashboard → type in SearchBar → filtering is memoized for performance. Pagination calculations are also memoized. Check console for no unnecessary recalculations.</div>

                  <div style={{ marginBottom: 8 }}><b>To see useCallback:</b> Click "Push Toast" button → the pushToast function is memoized with useCallback to prevent unnecessary re-renders. Same with submitForm function.</div>

                  <div style={{ marginBottom: 8 }}><b>To see useReducer:</b> Go to Form page → add an item → items list is managed with useReducer (init and add actions). Click "Show count" to see total items managed by reducer.</div>

                  <div style={{ marginBottom: 8 }}><b>To see useLocalStorage (Custom Hook):</b> Toggle theme → refresh the page → your theme choice persists! This custom hook saves theme preference to localStorage.</div>
                </div>
              </Card>

              <Card title="Advanced Interactions Guide">
                <div style={{ fontSize: "13px", lineHeight: 1.8, opacity: 0.95 }}>
                  <div style={{ marginBottom: 8 }}><b>Test Search + Pagination:</b> Dashboard → type "feature" in search → see filtered results → navigate pages → clear search → see full list return.</div>

                  <div style={{ marginBottom: 8 }}><b>Test Form Submission:</b> Form page → fill in Name (required) → select Type → check Priority → click Submit → see toast confirmation → item added to Data page table!</div>

                  <div style={{ marginBottom: 8 }}><b>Test Modal ESC Close:</b> Dashboard → Actions tab → click "Open Modal" → press ESC key → modal closes (useEffect ESC listener).</div>

                  <div style={{ marginBottom: 8 }}><b>Test Toast Auto-Dismiss:</b> Click any "Push Toast" button → watch toast appear in bottom-right → count to 2.6 seconds → toast automatically disappears.</div>

                  <div style={{ marginBottom: 8 }}><b>Test List Click:</b> Dashboard → click any item in the list → see toast showing which item you picked.</div>

                  <div style={{ marginBottom: 8 }}><b>Test Live Stats:</b> Dashboard → watch Sidebar → use search to filter → see "filtered" count update → navigate pages → see "page" number update in real-time.</div>

                  <div style={{ marginBottom: 8 }}><b>Test Theme Persistence:</b> Click theme toggle → switch to light/dark → refresh page (F5) → see theme remains! Stored in localStorage via useLocalStorage hook.</div>

                  <div style={{ marginBottom: 8 }}><b>Test Responsive Design:</b> Resize your browser window → at 900px width, layout switches from 2-column grid to single column (check CSS media query).</div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Modal */}
      <Modal open={modalOpen} title="Modal Dialog" onClose={() => setModalOpen(false)}>
        <div style={{ opacity: 0.9 }}>
          Click outside or press <b>ESC</b> to close.
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            OK
          </Button>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>

      {/* Toasts */}
      <div className="toastHost">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.msg} onClose={() => setToasts((x) => x.filter((y) => y.id !== t.id))} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
}
