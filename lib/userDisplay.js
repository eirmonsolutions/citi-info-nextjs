export function getUserDisplayName(user) {
  return user?.name || user?.display_name || "User";
}

export function getUserInitials(user) {
  if (user?.avatar) return "";

  const name = getUserDisplayName(user);
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";

  return (
    (parts[0][0] || "U").toUpperCase() +
    (parts[1]?.[0] || "").toUpperCase()
  );
}
