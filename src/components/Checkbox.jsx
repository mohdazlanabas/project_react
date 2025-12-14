export default function Checkbox({ label, checked, onChange }) {
  return (
    <div className="row" style={{ marginTop: 6 }}>
      <input
        id="cb"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="cb" style={{ opacity: 0.85 }}>
        {label}
      </label>
    </div>
  );
}
