import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).then(() => setStatus('ready')).catch(() => setStatus('error')) }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Your next session</span><h1>Workouts</h1><p>Thoughtful sessions, ready when you are.</p></div><span className="count-pill">{workouts.length} plans</span></div>{status === 'loading' && <p className="empty-state">Loading workouts...</p>}{status === 'error' && <p className="empty-state">Workouts could not be loaded.</p>}{status === 'ready' && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-meta"><span className="tag">{workout.fitnessLevel}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><ul>{(workout.exercises || []).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div>}</section>
}

export default Workouts
