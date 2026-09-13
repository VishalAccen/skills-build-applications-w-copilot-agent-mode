import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { to: '/teams', label: 'Teams', icon: '◌' },
  { to: '/users', label: 'Members', icon: '◎' },
  { to: '/workouts', label: 'Workouts', icon: '▣' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities"><img src="/octofitapp-small.png" alt="" /><span>octofit<em>+</em></span></NavLink>
        <p className="nav-label">Workspace</p>
        <nav>{navigation.map((item) => <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} key={item.to} to={item.to}><span>{item.icon}</span>{item.label}</NavLink>)}</nav>
        <div className="sidebar-note"><span className="pulse-dot" />API connected<p>{API_BASE_URL.replace('/api', '')}</p></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><span className="topbar-kicker">Saturday, September 13</span><strong>Good morning, athlete.</strong></div><div className="profile-chip"><span>AR</span><b>Alex Runner</b><small>Intermediate</small></div></header>
        <Routes><Route path="/" element={<Navigate to="/activities" replace />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes>
      </main>
    </div>
  )
}

export default App
