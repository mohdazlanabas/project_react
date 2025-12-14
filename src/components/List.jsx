export default function List({ items, onPick }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {items.map((it) => (
        <button
          key={it.id}
          className="btn"
          onClick={() => onPick(it)}
          style={{ textAlign: "left" }}
        >
          {it.name} <span style={{ opacity: 0.7 }}>({it.type})</span>
        </button>
      ))}
    </div>
  );
}
