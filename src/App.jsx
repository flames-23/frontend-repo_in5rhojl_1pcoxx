import { useState, useEffect } from 'react'
import { Instagram, Mail, Send, CheckCircle, ArrowRight } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-60" />
      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1 rounded-full text-sm text-gray-700 mb-6">
          <Instagram className="w-4 h-4 text-pink-600" />
          <span>Instagram Expert</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Valerio Riccio
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Cresco brand e creator su Instagram con strategie data-driven, contenuti che performano e funnel che convertono.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#contatti" className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-3 rounded-lg transition">
            Parliamo del tuo progetto
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#servizi" className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-gray-800 font-semibold px-5 py-3 rounded-lg transition border border-white">
            Scopri i servizi
          </a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const items = [
    {
      title: 'Strategia Instagram',
      desc: 'Analisi, posizionamento, piano editoriale e crescita organica basata sui dati.',
    },
    {
      title: 'Content & Reels',
      desc: 'Format efficaci, hook ad alto CTR, storytelling e produzione ottimizzata per la reach.',
    },
    {
      title: 'Mentoring 1:1',
      desc: 'Sessioni private per creator e brand: audit profilo, roadmap e action plan chiari.'
    },
  ]
  return (
    <section id="servizi" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Cosa posso fare per te</h2>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="bg-white/80 backdrop-blur rounded-xl p-6 shadow border border-white">
            <h3 className="text-xl font-semibold text-gray-900">{it.title}</h3>
            <p className="mt-2 text-gray-700">{it.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600"/> Approccio pratico</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600"/> Focus su obiettivi</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600"/> Report chiari</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function SocialProof() {
  const proofs = [
    'Oltre 100 profili ottimizzati',
    'Campagne UGC e partnership brand',
    'CTR medio Reels > 8% su hook testati',
  ]
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">
        {proofs.map((p, i) => (
          <div key={i} className="p-6 rounded-xl border bg-gray-50 text-gray-800 text-center font-semibold">{p}</div>
        ))}
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '', budget: '' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok && data.status === 'ok') setStatus('ok')
      else if (data.status === 'exists') setStatus('exists')
      else setStatus('error')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contatti" className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Raccontami il tuo progetto</h2>
        <p className="mt-2 text-gray-700 text-center">Rispondo in 24-48h. Solo richieste serie.</p>
        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input className="border rounded-lg p-3" placeholder="Nome e cognome" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
            <input type="email" className="border rounded-lg p-3" placeholder="Email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          </div>
          <input className="border rounded-lg p-3" placeholder="Azienda (opzionale)" value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
          <input className="border rounded-lg p-3" placeholder="Budget indicativo (opzionale)" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})}/>
          <textarea className="border rounded-lg p-3" rows="5" placeholder="Messaggio" required value={form.message} onChange={e=>setForm({...form, message:e.target.value})}></textarea>
          <button className="inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-3 rounded-lg transition">
            <Send className="w-4 h-4"/> Invia richiesta
          </button>
          {status === 'sending' && <p className="text-sm text-gray-600">Invio in corso...</p>}
          {status === 'ok' && <p className="text-sm text-green-700">Richiesta inviata! Ti ricontatterò a breve.</p>}
          {status === 'error' && <p className="text-sm text-red-700">Errore nell'invio. Riprova più tardi.</p>}
        </form>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const subscribe = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${BACKEND_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (data.status === 'ok') setStatus('ok')
      else if (data.status === 'exists') setStatus('exists')
      else setStatus('error')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 pb-16">
      <div className="bg-white rounded-2xl p-6 shadow flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Tips & case study su Instagram</h3>
          <p className="text-gray-700">Iscriviti per ricevere strategie e aggiornamenti.</p>
        </div>
        <form onSubmit={subscribe} className="flex w-full md:w-auto gap-2">
          <input type="email" required placeholder="La tua email" value={email} onChange={e=>setEmail(e.target.value)} className="border rounded-lg p-3 w-full md:w-72"/>
          <button className="bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-lg">Iscrivimi</button>
        </form>
        {status === 'ok' && <span className="text-green-700 text-sm">Iscritto!</span>}
        {status === 'exists' && <span className="text-gray-700 text-sm">Sei già iscritto.</span>}
        {status === 'error' && <span className="text-red-700 text-sm">Errore, riprova.</span>}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-500"/>
          <span className="font-semibold">@valerioriccio</span>
        </div>
        <a href="#contatti" className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
          <Mail className="w-4 h-4"/> Contatti
        </a>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900">
      <Hero/>
      <Services/>
      <SocialProof/>
      <Newsletter/>
      <ContactForm/>
      <Footer/>
    </div>
  )
}

export default App
