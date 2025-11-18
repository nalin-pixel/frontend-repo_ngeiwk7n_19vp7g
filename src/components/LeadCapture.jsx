import React, { useState } from 'react'

function LeadCapture() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [niche, setNiche] = useState('buyers')
  const [channel, setChannel] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('')
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, niche, channel_url: channel, source: 'website' })
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('Thanks! We will reach out shortly.')
      setName(''); setEmail(''); setPhone(''); setChannel('')
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold">Get a free content plan for your market</h3>
      <p className="text-blue-100 text-sm mt-1">Tell us a bit about you — we’ll send 10 video ideas and a sample script.</p>
      <form onSubmit={submit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" className="px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone (optional)" className="px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input value={channel} onChange={(e)=>setChannel(e.target.value)} placeholder="YouTube channel URL (optional)" className="px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <select value={niche} onChange={(e)=>setNiche(e.target.value)} className="px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="buyers">Buyers</option>
          <option value="sellers">Sellers</option>
          <option value="investors">Investors</option>
          <option value="luxury">Luxury</option>
        </select>
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold">
          {loading ? 'Submitting…' : 'Get My Plan'}
        </button>
        {status && <p className="sm:col-span-2 text-blue-100">{status}</p>}
      </form>
    </div>
  )
}

export default LeadCapture
