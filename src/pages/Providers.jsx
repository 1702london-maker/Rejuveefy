import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search, Star, MapPin, BadgeCheck, Filter } from 'lucide-react'
import { providers, serviceCategories } from '../data/mockData'
import ProviderCard from '../components/ProviderCard'

export function ProviderProfile() {
  const { id } = useParams()
  const provider = providers.find(p => p.id === parseInt(id)) || providers[0]
  const [activeTab, setActiveTab] = useState('services')

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/providers" className="text-sm text-on-surface-variant hover:text-primary mb-6 inline-block">← Back to Providers</Link>

        {/* Profile Header */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden mb-6">
          <div className="h-40 bg-gradient-to-r from-primary-fixed/60 to-primary-container/40" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start -mt-12">
              <div className="relative">
                <img src={provider.image} alt={provider.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-surface-container-lowest shadow-ambient" />
                {provider.verified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                    <BadgeCheck size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 mt-14 sm:mt-0 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-on-surface">{provider.name}</h1>
                    <p className="text-on-surface-variant mb-1">{provider.title}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /><span className="font-semibold text-sm text-on-surface">{provider.rating}</span><span className="text-xs text-on-surface-variant">({provider.reviews} reviews)</span></div>
                      <div className="flex items-center gap-1"><MapPin size={12} className="text-on-surface-variant" /><span className="text-xs text-on-surface-variant">{provider.location}</span></div>
                    </div>
                  </div>
                  <Link to={`/book?provider=${provider.id}`} className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shrink-0">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl mb-6 w-fit">
          {['services', 'portfolio', 'reviews', 'availability'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-surface-container-lowest shadow-ambient text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {provider.services.map(cat => (
              <div key={cat} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
                <h3 className="font-semibold text-on-surface mb-3 capitalize">{cat.replace('-', ' ')}</h3>
                <p className="text-sm text-on-surface-variant mb-3">{provider.bio.slice(0, 80)}...</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">From £{provider.startingPrice}</span>
                  <Link to={`/book/${cat}`} className="text-xs border border-primary text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all">Book</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {provider.portfolio.length ? provider.portfolio.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden"><img src={img} alt="" className="w-full h-full object-cover" /></div>
              )) : <p className="col-span-3 text-center py-10 text-on-surface-variant">No portfolio images yet.</p>}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {[
              { name: 'Ngozi A.', rating: 5, text: 'Absolutely amazing work! My knotless braids lasted 8 weeks. She is so professional and gentle.', date: '2 weeks ago' },
              { name: 'Blessing O.', rating: 5, text: 'Best experience ever. Very clean setup, listened to exactly what I wanted.', date: '1 month ago' },
              { name: 'Fatima K.', rating: 4, text: 'Great service, very skilled. Took a little longer than quoted but the result was perfect.', date: '2 months ago' },
            ].map((review, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-on-surface">{review.name}</span>
                  <span className="text-xs text-on-surface-variant">{review.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'} />)}</div>
                <p className="text-sm text-on-surface-variant">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
            <h3 className="font-semibold text-on-surface mb-4">Weekly Availability</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className={`text-center py-3 rounded-xl text-xs font-medium ${provider.availability.includes(day) ? 'bg-primary-container/40 text-primary' : 'bg-surface-container text-on-surface-variant/40'}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Providers() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')

  const filtered = providers.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase())) &&
    (!catFilter || p.services.includes(catFilter))
  )

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Find a Provider</h1>
          <p className="text-on-surface-variant mb-6">Verified hair and beauty professionals across the UK</p>
          <div className="flex gap-2 max-w-lg">
            <div className="flex items-center gap-2 flex-1 bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant/30 shadow-ambient">
              <Search size={16} className="text-on-surface-variant" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search providers..." className="flex-1 bg-transparent text-sm outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <button onClick={() => setCatFilter('')} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${!catFilter ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed/30'}`}>All</button>
          {serviceCategories.map(cat => (
            <button key={cat.id} onClick={() => setCatFilter(cat.id)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${catFilter === cat.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed/30'}`}>{cat.label}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {filtered.map(p => <ProviderCard key={p.id} provider={p} />)}
        </div>

        {filtered.length === 0 && <div className="text-center py-16 text-on-surface-variant">No providers found.</div>}

        {/* Become Provider CTA */}
        <div className="bg-gradient-to-r from-primary-fixed/40 to-primary-container/20 rounded-3xl p-8 text-center mt-8 border border-primary-container/30">
          <h2 className="font-display text-xl font-bold text-on-surface mb-2">Are you a hair professional?</h2>
          <p className="text-on-surface-variant text-sm mb-4">Join Rejuveefy and connect with thousands of clients.</p>
          <Link to="/become-provider" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90">Apply to Join</Link>
        </div>
      </div>
    </div>
  )
}
