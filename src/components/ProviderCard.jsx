import { Link } from 'react-router-dom'
import { Star, MapPin, BadgeCheck } from 'lucide-react'

export default function ProviderCard({ provider }) {
  return (
    <div className="luxury-card bg-surface-container-lowest rounded-2xl overflow-hidden shadow-ambient p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <img src={provider.image} alt={provider.name} className="w-14 h-14 rounded-full object-cover" />
          {provider.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <BadgeCheck size={12} className="text-white fill-white" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-on-surface truncate">{provider.name}</h3>
          <p className="text-xs text-on-surface-variant">{provider.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={10} className="text-on-surface-variant shrink-0" />
            <span className="text-xs text-on-surface-variant truncate">{provider.location}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-on-surface">{provider.rating}</span>
          <span className="text-xs text-on-surface-variant">({provider.reviews})</span>
        </div>
        <span className="text-xs text-on-surface-variant">From <span className="font-semibold text-on-surface">£{provider.startingPrice}</span></span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {provider.services.slice(0, 3).map(s => (
          <span key={s} className="text-[10px] bg-primary-fixed/40 text-on-primary-container px-2 py-0.5 rounded-full font-medium capitalize">{s.replace('-', ' ')}</span>
        ))}
      </div>
      <Link to={`/providers/${provider.id}`}
        className="block w-full text-center border-[1.5px] border-primary text-primary py-2 rounded-full text-xs font-semibold hover:bg-primary hover:text-white transition-all">
        View Profile
      </Link>
    </div>
  )
}
