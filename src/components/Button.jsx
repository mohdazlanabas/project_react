export default function Button({ variant = "default", onClick, children, ...rest }) {
  const cls = ["btn", variant === "primary" ? "primary" : "", variant === "danger" ? "danger" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
