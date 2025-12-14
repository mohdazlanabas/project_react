import Button from "./Button.jsx";

export default function Pagination({ page, pages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <Button onClick={onPrev} disabled={page <= 1}>
        ◀ Prev
      </Button>
      <div style={{ opacity: 0.85 }}>
        Page <b>{page}</b> / {pages}
      </div>
      <Button onClick={onNext} disabled={page >= pages}>
        Next ▶
      </Button>
    </div>
  );
}
