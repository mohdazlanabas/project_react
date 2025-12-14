import Navbar from "./Navbar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ active, onNav }) {
  return (
    <div className="header">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700 }}>React Top 20 Components Demo</div>
          <div style={{ opacity: 0.8, fontSize: 12 }}>
            Hooks: useState / useEffect / useContext / useRef / useMemo / useCallback / useReducer
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ marginTop: 10 }}>
        <Navbar active={active} onNav={onNav} />
      </div>
    </div>
  );
}
