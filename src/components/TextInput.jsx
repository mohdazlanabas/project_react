export default function TextInput({ label, value, onChange, inputRef }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input ref={inputRef} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
