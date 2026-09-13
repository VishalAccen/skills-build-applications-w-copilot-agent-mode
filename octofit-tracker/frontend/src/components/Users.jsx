import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .then(() => setStatus('ready'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading">
        <div><span className="eyebrow">Community</span><h1>Members</h1><p>Everyone showing up for their next strong habit.</p></div>
        <span className="count-pill">{users.length} members</span>
      </div>
      {status === 'loading' && <p className="empty-state">Loading members...</p>}
      {status === 'error' && <p className="empty-state">Members could not be loaded.</p>}
      {status === 'ready' && <div className="member-grid">{users.map((user) => <article className="member-card" key={user._id}><div className="avatar">{user.displayName?.charAt(0) || '?'}</div><div><h2>{user.displayName}</h2><p>@{user.username}</p><span className="tag">{user.fitnessLevel}</span></div></article>)}</div>}
    </section>
  )
}

export default Users
