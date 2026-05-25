'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Search, User as UserIcon } from 'lucide-react'
import User from '@/componets/User'
import Link from 'next/link'
import { useUser } from "@/context/UserContext"
import Loading from '@/componets/Loading'

function Dashboard() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [contacts, setContacts] = useState([])
  const [msg, setMsg] = useState('')
  const [searching, setSearching] = useState(false)
  const abortRef = useRef(null)
  const { user, loading } = useUser()

  const loadContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/contacts')
      if (!res.ok) return
      const data = await res.json()
      setContacts(data.contacts || [])
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!loading && user) loadContacts()
  }, [loading, user, loadContacts])

  const runSearch = useCallback(async (term) => {
    const trimmed = term.trim()
    if (trimmed.length < 2) {
      setResults([])
      setMsg(trimmed.length === 0 ? '' : 'Type at least 2 characters')
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setSearching(true)
    setMsg('')

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
        signal: controller.signal,
      })
      const data = await res.json()

      if (!res.ok) {
        setResults([])
        setMsg(data.message || 'Search failed')
        return
      }

      setResults(data.users || [])
      if (!data.users?.length) {
        setMsg(data.message || 'No users found')
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMsg('Something went wrong. Try again.')
        setResults([])
      }
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        runSearch(query)
      } else {
        setResults([])
        setMsg(query.trim().length === 0 ? '' : 'Type at least 2 characters')
      }
    }, 350)

    return () => clearTimeout(timer)
  }, [query, runSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    runSearch(query)
  }

  const showResults = query.trim().length >= 2

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
      <div className="app-shell">
        <header className="app-header">
          <span className="app-logo">ChatApp</span>
          <Link href="/pages/profile" className="btn btn-ghost">
            <UserIcon size={16} />
            {user?.userName || 'Profile'}
          </Link>
        </header>

        <main className="app-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-bar">
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search by username..."
                autoComplete="off"
              />
              <button
                type="submit"
                className="search-btn"
                disabled={searching || query.trim().length < 2}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
            {searching && <p className="search-hint">Searching...</p>}
            {msg && !searching && <p className="search-error">{msg}</p>}
            {!msg && !searching && query.trim().length === 0 && (
              <p className="search-hint">Find people by username — partial matches work</p>
            )}
          </form>

          {showResults && results.length > 0 && (
            <section>
              <h2 className="section-title">Results</h2>
              {results.map((u) => (
                <User key={u.id} id={u.id} name={u.name} subtitle="Start a chat" />
              ))}
            </section>
          )}

          {contacts.length > 0 && (
            <section style={{ marginTop: showResults && results.length ? '1.5rem' : 0 }}>
              <h2 className="section-title">Recent chats</h2>
              {contacts.map((c) => (
                <User key={c.id} id={c.id} name={c.name} subtitle="Continue conversation" />
              ))}
            </section>
          )}

          {!showResults && contacts.length === 0 && !loading && (
            <div className="empty-state">
              <p>No conversations yet.</p>
              <p>Search for someone to start chatting.</p>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Dashboard
