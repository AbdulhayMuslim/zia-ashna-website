export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: "1rem" }}>
      <ol
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: 0,
          margin: 0,
          listStyle: "none",
          color: "#64748b",
        }}
      >
        {items.map((item, index) => (
          <li
            key={item}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>{item}</span>
            {index < items.length - 1 ? <span>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
