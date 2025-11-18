import React from 'react'

function IdeaList({ ideas = [], onPick }) {
  if (!ideas.length) return null
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {ideas.map((idea, idx) => (
        <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold">{idea.title}</h3>
          <p className="text-sm text-blue-200 mt-1">{idea.angle}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-blue-300/70">{idea.market} • {idea.niche}</span>
            <button onClick={() => onPick(idea)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-sm">Outline Script</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default IdeaList
