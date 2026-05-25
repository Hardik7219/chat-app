'use client'
import { useUser } from "@/context/UserContext"
import Loading from '@/componets/Loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

function Profile() {
  const { user, loading, setUser } = useUser()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/logout')
    setUser(null)
    router.push('/')
  }

  const initial = (user?.userName || '?').charAt(0).toUpperCase()

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
      <div className="app-shell">
        <header className="app-header">
          <Link href="/pages/dashboard" className="chat-back">
            <ArrowLeft size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Back
          </Link>
          <span className="app-logo">Profile</span>
          <span style={{ width: 48 }} />
        </header>

        <main className="app-content">
          <div className="profile-card">
            <div className="profile-avatar-lg">{initial}</div>
            <p className="profile-name">{user?.userName}</p>
            <p className="profile-email">{user?.email}</p>
          </div>

          <button onClick={logout} className="btn btn-danger" style={{ width: '100%' }}>
            Log out
          </button>
        </main>
      </div>
    </>
  )
}

export default Profile
