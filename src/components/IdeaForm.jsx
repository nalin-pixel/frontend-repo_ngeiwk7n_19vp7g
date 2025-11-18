import React, { useState } from 'react'

function IdeaForm({ onIdeas }) {
  const [market, setMarket] = useState('Austin, TX')
  const [niche, setNiche] = useState('buyers')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market, niche, goal: 'leads' })
      })
      if (!res.ok) throw new Error('Failed to generate ideas')
      const data = await res.json()
      onIdeas(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 sm:p-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Market</label>
          <input value={market} onChange={(e)=>setMarket(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City, State" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Niche</label>
          <select value={niche} onChange={(e)=>setNiche(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="buyers">Buyers</option>
            <option value="sellers">Sellers</option>
            <option value="investors">Investors</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div className="flex items-end">
          <button disabled={loading} className="w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold">
            {loading ? 'Generating…' : 'Generate Ideas'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
    </form>
  )
}

export default IdeaForm
