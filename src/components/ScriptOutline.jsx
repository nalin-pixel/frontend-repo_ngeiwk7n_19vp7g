import React, { useState } from 'react'

function ScriptOutline({ idea }) {
  const [outline, setOutline] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!idea) return
    setError('')
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/script`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: idea.title, market: idea.market, angle: idea.angle, niche: idea.niche })
      })
      if (!res.ok) throw new Error('Failed to generate outline')
      const data = await res.json()
      setOutline(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!idea) return null

  return (
    <div className="mt-6 bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold">Script outline for</h3>
          <p className="text-blue-200">{idea.title}</p>
        </div>
        <button onClick={generate} disabled={loading} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold">
          {loading ? 'Generating…' : 'Generate Outline'}
        </button>
      </div>
      {error && <p className="text-red-300 text-sm mt-3">{error}</p>}
      {outline && (
        <div className="mt-4">
          <p className="text-blue-100 mb-2"><span className="font-semibold text-white">CTA:</span> {outline.call_to_action}</p>
          <ol className="list-decimal list-inside space-y-2 text-blue-100">
            {outline.outline.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default ScriptOutline
