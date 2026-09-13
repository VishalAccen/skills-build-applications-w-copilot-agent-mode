import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const LEADERBOARD_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetchCollection(LEADERBOARD_ENDPOINT).then(setLeaders).then(() => setStatus('ready')).catch(() => setStatus('error')) }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Team pulse</span><h1>Leaderboard</h1><p>Consistency turns into momentum.</p></div></div>{status === 'loading' && <p className="empty-state">Loading leaderboard...</p>}{status === 'error' && <p className="empty-state">Leaderboard could not be loaded.</p>}{status === 'ready' && <div className="leaderboard">{leaders.map((leader, index) => <article className={`leader-row rank-${index + 1}`} key={leader.userId || leader._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="leader-avatar">{leader.displayName?.charAt(0) || '?'}</div><div className="leader-name"><h2>{leader.displayName || leader.username}</h2><p>{leader.activities} activities</p></div><strong>{leader.points}<small> pts</small></strong></article>)}</div>}</section>
}

export default Leaderboard
