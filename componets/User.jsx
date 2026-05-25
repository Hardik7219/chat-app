import React from "react";
import Link from "next/link";

function User({ name, id, subtitle }) {
  const initial = (name || "?").charAt(0).toUpperCase();

  const content = (
    <div className="user-row">
      <div className="user-avatar">{initial}</div>
      <div>
        <p className="user-name">{name}</p>
        {subtitle && <p className="user-meta">{subtitle}</p>}
      </div>
    </div>
  );

  if (id) {
    return (
      <Link href={`/pages/chatPage?id=${id}&name=${encodeURIComponent(name)}`}>
        {content}
      </Link>
    );
  }

  return content;
}

export default User;
