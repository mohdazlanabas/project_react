export default function SearchBar({ value, onChange }) {
  return (
    <div className="field">
      <label>Search</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Try: solar, waste, data, ops…"
      />
    </div>
  );
}
