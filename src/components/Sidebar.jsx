import Spinner from "./Spinner.jsx";

export default function Sidebar({ isBusy, stats }) {
  return (
    <aside className="sidebar">
      <h3>Sidebar</h3>
      <div className="meta">
        <div>Quick stats:</div>
        <ul>
          <li>Items: {stats.total}</li>
          <li>Filtered: {stats.filtered}</li>
          <li>Page: {stats.page}</li>
        </ul>
        <hr />
        <div className="row">
          <span>Status:</span>
          {isBusy ? (
            <span className="row">
              <Spinner /> Loading…
            </span>
          ) : (
            <span>Idle</span>
          )}
        </div>
      </div>
    </aside>
  );
}
