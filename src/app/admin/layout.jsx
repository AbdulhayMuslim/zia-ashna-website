export const metadata = {
  title: "Admin Dashboard | Zia Ashna",
};

export default function AdminLayout({ children }) {
  return (
    <div
      style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}
    >
      <header
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #e2e8f0",
          background: "#ffffff",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Admin Dashboard</h1>
      </header>
      <main style={{ padding: "1.5rem" }}>{children}</main>
    </div>
  );
}
