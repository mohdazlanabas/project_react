export default function Table({ rows }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Name</th>
          <th style={{ textAlign: "left" }}>Type</th>
          <th style={{ textAlign: "right" }}>Score</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.type}</td>
            <td style={{ textAlign: "right" }}>{r.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
