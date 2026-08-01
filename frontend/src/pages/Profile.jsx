import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="page">
        <div className="empty-state">
          <h3>Not logged in</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Your profile</h2>
      <div className="detail-card" style={{ marginTop: 16 }}>
        <p><strong>Name:</strong> {session.identity.name}</p>
        <p><strong>Email:</strong> {session.identity.email}</p>
        <p><strong>Role:</strong> {session.role}</p>
        {session.identity.address && <p><strong>Address:</strong> {session.identity.address}</p>}
        {session.identity.phone && <p><strong>Phone:</strong> {session.identity.phone}</p>}
      </div>
    </div>
  );
}
