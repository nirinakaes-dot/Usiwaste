/**
 * Customer / Business switch.
 *
 * The backend has two separate login tables, so every login and register call
 * must say which one. This toggle sets that account_type.
 */
export default function AccountTypeToggle({ value, onChange }) {
  const options = [
    { key: "user", label: "Customer" },
    { key: "business", label: "Business" },
  ];
  return (
    <div className="mb-6 flex rounded-md bg-ink/10 p-1">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={`flex-1 rounded px-4 py-2 text-sm font-medium transition ${
            value === opt.key
              ? "bg-brand text-white shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
