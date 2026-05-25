import Link from "next/link";

export default function Home() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <h1 className="landing-title">ChatApp</h1>
        <p className="landing-subtitle">
          Simple, real-time messaging. Sign in and find friends by username.
        </p>
      </div>
      <div className="landing-actions">
        <Link href="/pages/login" className="landing-btn landing-btn-primary">
          Log in
        </Link>
        <Link href="/pages/signup" className="landing-btn landing-btn-secondary">
          Create account
        </Link>
      </div>
    </div>
  );
}
