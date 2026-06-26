import { useApp } from '../context/AppContext'
import { CheckCircle, Info, X } from 'lucide-react'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 z-[200] fade-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-modal text-sm font-medium text-white
        ${toast.type === 'info' ? 'bg-gray-700' : 'bg-green-600'}`}>
        {toast.type === 'info' ? <Info size={16} /> : <CheckCircle size={16} />}
        {toast.msg}
      </div>
    </div>
  )
}
