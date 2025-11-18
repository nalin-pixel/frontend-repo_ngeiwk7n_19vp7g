import React from 'react'

function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.18),transparent_35%)]" />
      <div className="relative px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Turn YouTube into your best lead channel
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100">
            We help realtors plan content, script winning videos, and convert viewers into qualified clients — all in one simple workflow.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={onGetStarted} className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors">
              Get Started
            </button>
            <a href="#how" className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur transition-colors">
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
