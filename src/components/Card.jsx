export default function Card({ title, children, right }) {
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h4>{title}</h4>
        {right}
      </div>
      {children}
    </div>
  );
}
