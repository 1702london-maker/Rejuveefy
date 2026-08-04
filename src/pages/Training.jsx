import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Mail,
  ShieldCheck,
  Users,
} from 'lucide-react'

const tracks = [
  {
    title: 'Braiding Foundations',
    category: 'Braiding',
    level: 'Beginner to Intermediate',
    duration: 'One-day format planned',
    status: 'Register interest',
    topics: ['Sectioning and tension control', 'Feed-in technique', 'Finishing and aftercare'],
  },
  {
    title: 'Wig Construction and Installation',
    category: 'Wig Making',
    level: 'Intermediate',
    duration: 'Workshop format planned',
    status: 'Register interest',
    topics: ['Cap measurements', 'Lace application', 'Hairline customisation'],
  },
  {
    title: 'Loc Starter and Maintenance',
    category: 'Locs',
    level: 'All Levels',
    duration: 'Practical format planned',
    status: 'Register interest',
    topics: ['Starting methods', 'Retwist technique', 'Loc care guidance'],
  },
  {
    title: 'Natural Hair Care for Professionals',
    category: 'Natural Hair',
    level: 'All Levels',
    duration: 'Short course planned',
    status: 'Register interest',
    topics: ['Hair porosity', 'Product selection', 'Protective styling'],
  },
]

const principles = [
  'Course details will be confirmed before enrolment opens.',
  'Training content is reviewed before public release.',
  'Group, salon and academy enquiries are open now.',
  'Certificates and pricing will be shown clearly before booking.',
]

const enquiryTypes = [
  { icon: Users, title: 'Salon Teams', body: 'Group sessions for teams that need consistent techniques and service standards.' },
  { icon: GraduationCap, title: 'New Stylists', body: 'Foundation training for learners building confidence before taking clients.' },
  { icon: Award, title: 'Professional Upskill', body: 'Focused practical sessions for stylists adding new services.' },
]

function TrackCard({ track }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card">
      <div className="h-36 bg-gradient-to-br from-pink-50 via-white to-gray-50 flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white border border-pink-100 text-pink-400 flex items-center justify-center shadow-sm">
          <BookOpen size={23} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">{track.category}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preparing</span>
        </div>
        <h3 className="font-display text-lg font-bold text-gray-900 leading-tight mb-2">{track.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            <GraduationCap size={11} /> {track.level}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            <Clock size={11} /> {track.duration}
          </span>
        </div>
        <ul className="space-y-2 mb-5">
          {track.topics.map(topic => (
            <li key={topic} className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
              <CheckCircle size={13} className="text-pink-400 shrink-0 mt-0.5" />
              {topic}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs font-semibold text-gray-400">{track.status}</span>
          <Link to="/contact" className="text-xs font-bold text-pink-500 hover:text-pink-600">
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Training() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 via-white to-gray-50 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
          <p className="text-xs text-gray-400 mb-4">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-600">Training</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-white border border-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 shadow-sm">
            <GraduationCap size={13} /> Training enquiries open
          </div>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-end">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Professional beauty training, built with care.
              </h1>
              <p className="text-gray-500 max-w-2xl leading-relaxed mb-8">
                Rejuveefy training will cover practical hair and beauty skills for stylists, salons and learners. Register your interest now and receive details when dates, pricing and enrolment open.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#tracks" className="bg-pink-500 text-white font-bold px-7 py-3.5 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                  View Planned Tracks <ArrowRight size={16} />
                </a>
                <Link to="/contact" className="border border-pink-200 text-pink-600 font-semibold px-7 py-3.5 rounded-full hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
                  <Mail size={16} /> Enquire About Training
                </Link>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
            <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-4">Training Pathway</p>
              <div className="space-y-3">
                {[
                  { icon: BookOpen, label: 'Tracks', value: `${tracks.length} planned` },
                  { icon: Calendar, label: 'Dates', value: 'Register interest' },
                  { icon: Award, label: 'Certificates', value: 'Planned' },
                  { icon: ShieldCheck, label: 'Review', value: 'In progress' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <span className="flex items-center gap-2 text-sm text-gray-500"><Icon size={15} className="text-pink-400" /> {label}</span>
                    <span className="text-sm font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-[360px_1fr] gap-10">
          <div>
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">How this will launch</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Clear details before enrolment</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Training should feel trustworthy from the start. That means confirmed course details, clear enrolment steps, and no checkout until the programme information is ready.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map(item => (
              <div key={item} className="bg-pink-50 rounded-2xl p-5">
                <CheckCircle size={18} className="text-pink-500 mb-3" />
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tracks" className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">Planned Tracks</p>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Training Areas</h2>
            </div>
            <Link to="/contact" className="text-sm font-semibold text-pink-500 hover:text-pink-600">
              Ask about group training
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tracks.map(track => <TrackCard key={track.title} track={track} />)}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-stretch">
          <div className="grid sm:grid-cols-3 gap-4">
            {enquiryTypes.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <GraduationCap size={38} className="mb-4 opacity-80" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">Interested in training?</h2>
              <p className="text-pink-100 leading-relaxed mb-6">
                Send your training interest, location, group size and preferred topic. The team can follow up when the right programme is ready.
              </p>
            </div>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-pink-500 font-bold px-6 py-3.5 rounded-full hover:bg-pink-50 transition-colors">
              Contact Rejuveefy <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
