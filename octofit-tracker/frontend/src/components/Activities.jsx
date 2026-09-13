import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => { fetchCollection('activities').then(setActivities).then(() => setStatus('ready')).catch(() => setStatus('error')) }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Movement log</span><h1>Activities</h1><p>Recent sessions across the OctoFit crew.</p></div><span className="count-pill">{activities.length} sessions</span></div>{status === 'loading' && <p className="empty-state">Loading activities...</p>}{status === 'error' && <p className="empty-state">Activities could not be loaded.</p>}{status === 'ready' && <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><div className={`activity-mark ${activity.type}`}>{activity.type?.charAt(0).toUpperCase()}</div><div className="activity-main"><h2>{activity.user?.displayName || 'OctoFit member'}</h2><p>{activity.type} <span>•</span> {activity.notes || 'Completed session'}</p></div><strong>{activity.durationMinutes} min</strong>{activity.distanceKm && <span className="distance">{activity.distanceKm} km</span>}</article>)}</div>}</section>
}

export default Activities
