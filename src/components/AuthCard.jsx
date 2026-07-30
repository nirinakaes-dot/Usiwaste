import Logo from "./Logo";

/**
 * The grey panel from the Figma, centred on the page. Every auth screen sits
 * inside this so they share one consistent frame.
 */
export default function AuthCard({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-lg bg-panel p-8 shadow-md sm:p-10">
        <Logo />
        {children}
      </div>
    </div>
  );
}
