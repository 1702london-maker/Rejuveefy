import { useApp } from '../context/AppContext'
import { CheckCircle, Info, AlertCircle } from 'lucide-react'

const icons = { success: CheckCircle, info: Info, error: AlertCircle }
const colors = {
  success: 'bg-surface-container-lowest border-primary/30 text-on-surface',
  info: 'bg-surface-container-lowest border-outline-variant text-on-surface',
  error: 'bg-error-container border-error/30 text-on-error-container',
}

export default function Toast() {
  const { toasts } = useApp()
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 pointer-events-none">
      {toasts.map(t => {
        const Icon = icons[t.type] || CheckCircle
        return (
          <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-modal border text-sm font-medium fade-up ${colors[t.type]}`}>
            <Icon size={16} className="shrink-0 text-primary" />
            {t.message}
          </div>
        )
      })}
    </div>
  )
}
