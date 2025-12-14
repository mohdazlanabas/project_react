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
              <Card title="Tabs (component #9)" right={<span style={{ opacity: 0.7 }}>useState</span>}>
                <Tabs tabs={dashboardTabs} active={dashTab} onChange={setDashTab} />
                {dashTab === "Overview" && (
                  <div style={{ opacity: 0.9 }}>
                    This app intentionally shows lots of “small components” working together.
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
                      Open Modal
                    </Button>
                    <Button onClick={() => pushToast("Hello from Toast!")}>Push Toast</Button>
                  </div>
                )}
              </Card>

              <Card title="List (component #18) + Search (component #20)">
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
              <Card title="Table (component #17)">
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

              <Card title="Modal (component #8) + Toast (component #15)">
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
              <Card title="Form (component #11) with TextInput/Select/Checkbox (#12/13/14)">
                <Form value={form} onChange={setForm} onSubmit={submitForm} />
              </Card>

              <Card title="Reducer state (useReducer) notes">
                <div style={{ opacity: 0.9 }}>
                  Items are managed by <b>useReducer</b> to demonstrate the “state machine-ish” approach.
                  It’s nice once state starts to sprawl across many actions.
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
            <Card title="About this demo">
              <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
                <li>Separate files per component</li>
                <li>Hooks: useState/useEffect/useContext/useRef/useMemo/useCallback/useReducer</li>
                <li>Custom hook: useLocalStorage (persists theme)</li>
              </ul>
            </Card>
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
