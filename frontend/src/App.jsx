import AppRoutes from "./routes";

// App just renders the route table now. Router, auth provider and toaster are
// set up in main.jsx so they wrap the whole tree.
export default function App() {
  return <AppRoutes />;
}
