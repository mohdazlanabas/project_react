import Button from "./Button.jsx";

export default function Toast({ message, onClose }) {
  return (
    <div className="toast">
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Toast</div>
      <div style={{ opacity: 0.9 }}>{message}</div>
      <div style={{ marginTop: 8 }}>
        <Button onClick={onClose}>Dismiss</Button>
      </div>
    </div>
  );
}
