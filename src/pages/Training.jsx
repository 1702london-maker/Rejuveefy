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
    duration: 'One-day practical',
    status: 'Register interest',
    topics: ['Sectioning and clean parting', 'Tension control and client comfort', 'Feed-in technique and finishing', 'Aftercare guidance for clients'],
  },
  {
    title: 'Wig Construction and Installation',
    category: 'Wig Making',
    level: 'Intermediate',
    duration: 'Workshop format',
    status: 'Register interest',
    topics: ['Cap measurements and preparation', 'Lace application fundamentals', 'Hairline customisation', 'Maintenance and client handover'],
  },
  {
    title: 'Loc Starter and Maintenance',
    category: 'Locs',
    level: 'All Levels',
    duration: 'Practical format',
    status: 'Register interest',
    topics: ['Starter method selection', 'Retwist technique and sectioning', 'Loc health checks', 'Home-care guidance'],
  },
  {
    title: 'Natural Hair Care for Professionals',
    category: 'Natural Hair',
    level: 'All Levels',
    duration: 'Short course',
    status: 'Register interest',
    topics: ['Hair and scalp assessment', 'Porosity and product selection', 'Protective styling standards', 'Client consultation notes'],
  },
]

const principles = [
  'Every course page will show level, format, learning outcomes and learner requirements before enrolment.',
  'Training is designed around practical demonstration, supervised practice and clear client-care standards.',
  'Group, salon and academy enquiries can be reviewed before dates are released publicly.',
  'Pricing, certificate details and cancellation terms are provided before any booking is accepted.',
]

const enquiryTypes = [
  { icon: Users, title: 'Salon Teams', body: 'Group sessions for teams that need consistent techniques and service standards.' },
  { icon: GraduationCap, title: 'New Stylists', body: 'Foundation training for learners building confidence before taking clients.' },
  { icon: Award, title: 'Professional Upskill', body: 'Focused practical sessions for stylists adding new services.' },
]

const learnerOutcomes = [
  'A structured skills checklist for the selected training track.',
  'Practical technique guidance with hygiene, consultation and aftercare standards.',
  'A certificate of attendance or completion where the course criteria are met.',
  'Follow-up instructions so learners know what to practise after the session.',
]

const enquirySteps = [
  'Choose the training area that matches your goal.',
  'Send your preferred topic, location, learner level and group size.',
  'The team reviews suitability, availability and any kit requirements.',
  'Confirmed details are shared before enrolment or payment is requested.',
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
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Interest Open</span>
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
                Practical hair and beauty training for learners, stylists and salon teams who want stronger technique, cleaner client-care standards and a clear route into professional service delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#tracks" className="bg-pink-500 text-white font-bold px-7 py-3.5 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                  View Training Tracks <ArrowRight size={16} />
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
                  { icon: BookOpen, label: 'Tracks', value: `${tracks.length} areas` },
                  { icon: Calendar, label: 'Dates', value: 'By enquiry' },
                  { icon: Award, label: 'Certificates', value: 'Course based' },
                  { icon: ShieldCheck, label: 'Standards', value: 'Reviewed' },
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
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">Training Standards</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Clear details before enrolment</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Training should feel trustworthy from the first enquiry. Learners should understand what they will practise, what they need to bring, how certificates work and what happens after they register interest.
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
              <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">Training Tracks</p>
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
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">What Learners Get</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-5">Practical training with a professional standard</h2>
            <div className="space-y-3">
              {learnerOutcomes.map(item => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <CheckCircle size={18} className="text-pink-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">Enquiry Flow</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-5">How training enquiries are handled</h2>
            <div className="space-y-3">
              {enquirySteps.map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                  <span className="w-8 h-8 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                  <p className="text-sm text-gray-600 leading-relaxed pt-1">{item}</p>
                </div>
              ))}
            </div>
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
                Send your training interest, location, learner level, group size and preferred topic. The team can follow up with the most suitable route.
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
