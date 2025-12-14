const items = ["Dashboard", "Data", "Form", "About", "Guide"];

export default function Navbar({ active, onNav }) {
  return (
    <div className="nav">
      {items.map((name) => (
        <a
          key={name}
          className={`pill ${active === name ? "active" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNav(name);
          }}
        >
          {name}
        </a>
      ))}
    </div>
  );
}
