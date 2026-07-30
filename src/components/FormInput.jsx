/**
 * Labelled input matching the Figma: pale label above a dark filled field.
 *
 * Controlled component - the page owns the value in state and passes value +
 * onChange. `error` shows a red message beneath when validation fails.
 */
export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required = true,
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`w-full rounded-md bg-ink px-4 py-3 text-white placeholder-gray-500 outline-none ring-2 ring-transparent transition focus:ring-brand ${
          error ? "ring-red-500" : ""
        }`}
      />
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
