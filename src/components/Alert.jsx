// Small inline banner for form-level success or error messages.
export default function Alert({ kind = "error", children }) {
  if (!children) return null;
  const styles =
    kind === "success"
      ? "bg-green-50 text-green-800 border-green-200"
      : "bg-red-50 text-red-800 border-red-200";
  return (
    <div className={`mb-4 rounded-md border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}
