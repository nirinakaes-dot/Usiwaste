export function formatRemaining(deadline) {
  const diffMs = new Date(deadline) - new Date();
  if (diffMs <= 0) return { label: "closed", urgent: false, expired: true };

  const totalMin = Math.floor(diffMs / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const label = h > 0 ? `${h}h ${m}m left` : `${m}m left`;
  return { label, urgent: totalMin <= 60, expired: false };
}
