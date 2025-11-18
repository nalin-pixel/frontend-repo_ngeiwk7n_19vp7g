import { useState } from 'react'
import Hero from './components/Hero'
import IdeaForm from './components/IdeaForm'
import IdeaList from './components/IdeaList'
import ScriptOutline from './components/ScriptOutline'
import LeadCapture from './components/LeadCapture'

function App() {
  const [ideas, setIdeas] = useState([])
  const [picked, setPicked] = useState(null)

  const handleGetStarted = () => {
    const el = document.getElementById('planner')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_45%)] pointer-events-none" />
      <div className="relative">
        <Hero onGetStarted={handleGetStarted} />

        <section id="planner" className="px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold">Plan your next video</h2>
            <p className="text-blue-200 mt-1">Enter your market to get tailored video ideas and a ready-to-record outline.</p>

            <div className="mt-6">
              <IdeaForm onIdeas={(list)=>{ setIdeas(list); setPicked(null); }} />
              <IdeaList ideas={ideas} onPick={setPicked} />
              <ScriptOutline idea={picked} />
            </div>

            <LeadCapture />
          </div>
        </section>

        <footer className="py-10 text-center text-blue-300/70">
          <p>Built for realtors who want consistent, qualified leads from YouTube.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
