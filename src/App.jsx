import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'mes-taches-v1'

function readTasks() {
  try {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(tasks) ? tasks.filter(task =>
      task && typeof task.id === 'string' && typeof task.text === 'string' && typeof task.done === 'boolean'
    ) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(readTasks)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  const [storageError, setStorageError] = useState(false)
  const inputRef = useRef(null)
  const remaining = tasks.filter(task => !task.done).length
  const visible = tasks.filter(task => filter === 'all' || (filter === 'done' ? task.done : !task.done))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [tasks])

  function addTask(event) {
    event.preventDefault()
    if (!text.trim()) return
    setTasks(previous => [...previous, { id: crypto.randomUUID(), text: text.trim(), done: false }])
    setText('')
    inputRef.current?.focus()
  }

  return (
    <main className="app">
      <header className="heading">
        <div className="brand"><span aria-hidden="true">✓</span> UN PAS À LA FOIS</div>
        <h1>Mes tâches<span>.</span></h1>
        <p>Un peu d’ordre, l’esprit plus léger.</p>
      </header>

      <section className="card" aria-label="Liste de tâches">
        <form onSubmit={addTask} className="add-form">
          <label htmlFor="new-task">Qu’avez-vous prévu ?</label>
          <div className="input-row">
            <input ref={inputRef} id="new-task" value={text} onChange={event => setText(event.target.value)} placeholder="Ajouter une nouvelle tâche…" maxLength={300} autoComplete="off" />
            <button className="add-button" disabled={!text.trim()} type="submit"><span aria-hidden="true">+</span> Ajouter</button>
          </div>
        </form>

        <div className="list-toolbar">
          <div className="filters" aria-label="Filtrer les tâches">
            {[[ 'all', 'Toutes' ], [ 'active', 'À faire' ], [ 'done', 'Terminées' ]].map(([value, label]) => (
              <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
          <span className="count" aria-live="polite">{tasks.length} tâche{tasks.length !== 1 ? 's' : ''}</span>
        </div>

        {visible.length ? (
          <ul className="task-list">
            {visible.map(task => (
              <li key={task.id} className={task.done ? 'task done' : 'task'}>
                <label className="task-label">
                  <input type="checkbox" checked={task.done} onChange={() => setTasks(previous => previous.map(item => item.id === task.id ? { ...item, done: !item.done } : item))} />
                  <span>{task.text}</span>
                </label>
                <button className="delete-button" type="button" aria-label={`Supprimer : ${task.text}`} onClick={() => setTasks(previous => previous.filter(item => item.id !== task.id))}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <h2>{tasks.length ? 'Tout est en ordre' : 'Place à vos projets'}</h2>
            <p>{tasks.length ? 'Aucune tâche dans cette catégorie.' : 'Ajoutez votre première tâche pour commencer.'}</p>
          </div>
        )}

        <footer className="card-footer" aria-live="polite">
          <span className="status-dot" aria-hidden="true" />
          {remaining === 0 && tasks.length > 0 ? 'Tout est terminé. Bien joué !' : `${remaining} tâche${remaining !== 1 ? 's' : ''} à faire`}
        </footer>
      </section>
      <p className="storage-note">{storageError ? 'La sauvegarde est indisponible. Vos tâches restent disponibles pendant cette session.' : 'Vos tâches sont sauvegardées dans ce navigateur.'}</p>
    </main>
  )
}
