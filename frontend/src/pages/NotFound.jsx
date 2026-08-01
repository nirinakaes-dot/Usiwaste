import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty-state">
        <h3>Page not found</h3>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 12 }}>Back to browse</Link>
      </div>
    </div>
  );
}
