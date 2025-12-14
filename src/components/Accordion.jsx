import { useState } from "react";
import Button from "./Button.jsx";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(items[0]?.id ?? null);

  return (
    <div>
      {items.map((it) => (
        <div className="accordionItem" key={it.id}>
          <Button
            className="accordionBtn"
            onClick={() => setOpen((v) => (v === it.id ? null : it.id))}
          >
            {open === it.id ? "▾" : "▸"} {it.title}
          </Button>
          {open === it.id && <div style={{ marginTop: 8, opacity: 0.9 }}>{it.body}</div>}
        </div>
      ))}
    </div>
  );
}
