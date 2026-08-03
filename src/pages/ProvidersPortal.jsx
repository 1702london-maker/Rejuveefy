import { Link } from 'react-router-dom'
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  Plus,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const tabs = ['Overview', 'Bookings', 'Services', 'Calendar', 'Payouts', 'Profile']

function EmptyPanel({ icon: Icon, title, body, action }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
        <Icon size={20} />
      </div>
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-2xl">{body}</p>
      {action}
    </div>
  )
}

export default function ProvidersPortal() {
  const { user, userDisplay } = useApp()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Provider Portal</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Sign in to manage your Rejuveefy provider application, services, calendar, bookings and payouts.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="bg-pink-500 text-white rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register?type=provider" className="border border-pink-200 text-pink-600 rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-50 transition-colors">
              Create Provider Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-pink-500 text-lg">Rejuveefy</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-sm font-semibold">Provider Portal</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={16} className="text-pink-500" />
            {userDisplay?.name || user.email}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="flex gap-1 mb-8 bg-white border border-gray-100 rounded-xl p-1 w-fit overflow-x-auto max-w-full">
          {tabs.map(tab => (
            <button key={tab} className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap text-gray-500 hover:text-gray-700">
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold">Provider setup</p>
            <p className="text-pink-100 text-sm mt-1">
              Your live dashboard will populate once the provider profile, services and booking tables are connected in Supabase.
            </p>
          </div>
          <Link to="/contact" className="bg-white text-pink-600 rounded-full px-5 py-2.5 text-sm font-bold hover:bg-pink-50 transition-colors">
            Contact Rejuveefy
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <EmptyPanel
            icon={FileText}
            title="Application"
            body="No approved provider profile is attached to this account yet. Once approved, this panel will show your verification status and profile completeness."
            action={<Link to="/register?type=provider" className="inline-flex items-center gap-2 text-pink-600 text-sm font-semibold">Start or update application <CheckCircle size={15} /></Link>}
          />
          <EmptyPanel
            icon={Calendar}
            title="Bookings"
            body="No bookings are displayed until real client appointments are saved against your provider profile."
            action={<span className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold"><Clock size={15} /> Waiting for booking data</span>}
          />
          <EmptyPanel
            icon={Settings}
            title="Services"
            body="Services should be added from your approved provider profile, not from placeholder data."
            action={<button className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold cursor-not-allowed"><Plus size={15} /> Add service after approval</button>}
          />
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent provider activity</h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No live provider activity yet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
