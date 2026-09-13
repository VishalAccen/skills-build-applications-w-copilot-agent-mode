import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetchCollection('teams').then(setTeams).then(() => setStatus('ready')).catch(() => setStatus('error')) }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Find your people</span><h1>Teams</h1><p>Small circles make big goals easier to keep.</p></div><span className="count-pill">{teams.length} teams</span></div>{status === 'loading' && <p className="empty-state">Loading teams...</p>}{status === 'error' && <p className="empty-state">Teams could not be loaded.</p>}{status === 'ready' && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-banner"><span>{team.name?.slice(0, 2).toUpperCase()}</span></div><div className="team-copy"><h2>{team.name}</h2><p>{team.description}</p><div className="member-stack">{(team.members || []).slice(0, 4).map((member) => <span title={member.displayName} key={member._id}>{member.displayName?.charAt(0) || '?'}</span>)}<small>{team.members?.length || 0} members</small></div></div></article>)}</div>}</section>
}

export default Teams
