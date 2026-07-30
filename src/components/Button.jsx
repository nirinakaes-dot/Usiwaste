// The mustard action button. `loading` disables it and shows a spinner label
// so a user can't double-submit a form while a request is in flight.
export default function Button({ children, loading, type = "button", ...rest }) {
  return (
    <button
      type={type}
      disabled={loading || rest.disabled}
      className="w-full rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      {...rest}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
