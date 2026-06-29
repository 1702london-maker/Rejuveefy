import { Link } from 'react-router-dom'
import { GraduationCap, CheckCircle, Star, Clock, Users, ArrowRight, Award, BookOpen, Play } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Knotless Braids Masterclass',
    category: 'Braiding',
    level: 'Beginner to Intermediate',
    duration: '6 hours',
    students: 12,
    rating: 4.9,
    price: 149,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    topics: ['Sectioning and tension control', 'Feed-in technique', 'Finishing and edges', 'Client aftercare advice'],
    instructor: 'Amara K.',
  },
  {
    id: 2,
    title: 'Wig Construction & Installation',
    category: 'Wig Making',
    level: 'Intermediate',
    duration: '8 hours',
    students: 8,
    rating: 5.0,
    price: 199,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=400&fit=crop',
    topics: ['Cap construction and measurements', 'Lace frontal application', 'Customising hairlines', 'Wig maintenance and care'],
    instructor: 'Silk & Crown',
  },
  {
    id: 3,
    title: 'Loc Starter & Maintenance',
    category: 'Locs',
    level: 'All Levels',
    duration: '5 hours',
    students: 6,
    rating: 4.8,
    price: 129,
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=400&fit=crop',
    topics: ['Starting locs on different hair types', 'Retwisting techniques', 'Loc health and moisture', 'Common mistakes to avoid'],
    instructor: 'Naturelle Beauty',
  },
  {
    id: 4,
    title: 'Natural Hair Care for Professionals',
    category: 'Natural Hair',
    level: 'All Levels',
    duration: '4 hours',
    students: 15,
    rating: 4.9,
    price: 99,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop',
    topics: ['Understanding hair porosity and density', 'Product selection for 4C hair', 'Wash day routines', 'Protective styling for growth'],
    instructor: 'Amara K.',
  },
]

const benefits = [
  'Learn from verified UK beauty professionals',
  'Lifetime access to course materials',
  'Certificate of completion for every course',
  'Community support from fellow learners',
  'Practical, hands-on techniques you can apply immediately',
  'Courses designed for both beginners and experienced stylists',
]

function Stars({ val }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11} className={i <= Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

export default function Training() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
          <p className="text-xs text-gray-400 mb-4">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">›</span>
            <span className="text-gray-600">Training</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <GraduationCap size={13} /> Professional Beauty Training
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Master Your Craft.<br /><span className="text-pink-500">Grow Your Business.</span>
          </h1>
          <p className="text-gray-500 max-w-xl leading-relaxed mb-8">
            Learn from the best stylists and beauty professionals in the UK. Our courses cover braiding, wig installation, locs, natural hair and more — with practical techniques you can use straight away.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#courses" className="bg-pink-500 text-white font-bold px-7 py-3.5 rounded-full hover:bg-pink-600 transition-colors flex items-center gap-2">
              Browse Courses <ArrowRight size={16} />
            </a>
            <Link to="/contact" className="border border-gray-300 text-gray-700 font-semibold px-7 py-3.5 rounded-full hover:border-pink-400 hover:text-pink-500 transition-colors">
              Enquire About Custom Training
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Why Train with Rejuveefy?
            </h2>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={17} className="text-pink-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, label: 'Courses Available', value: `${courses.length}` },
              { icon: Users, label: 'Students Enrolled', value: '40+' },
              { icon: Award, label: 'Certificates Issued', value: '30+' },
              { icon: Star, label: 'Average Rating', value: '4.9' },
            ].map((s) => (
              <div key={s.label} className="bg-pink-50 rounded-2xl p-5 text-center">
                <s.icon size={22} className="text-pink-500 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Available Courses</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative overflow-hidden h-44">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play size={18} className="text-pink-500 ml-0.5" />
                    </div>
                  </button>
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{course.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">by {course.instructor}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Stars val={course.rating} />
                    <span className="text-xs font-semibold text-gray-700">{course.rating}</span>
                    <span className="text-xs text-gray-400">({course.students} students)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><GraduationCap size={11} /> {course.level}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {course.topics.slice(0, 2).map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <CheckCircle size={11} className="text-pink-400 shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-pink-500">£{course.price}</span>
                    <Link to="/contact"
                      className="bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                      Enrol Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom training CTA */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 lg:p-12 text-white text-center">
          <GraduationCap size={40} className="mx-auto mb-4 opacity-80" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">Looking for Custom or Group Training?</h2>
          <p className="text-pink-100 max-w-xl mx-auto mb-6 leading-relaxed">
            We offer bespoke training sessions for salons, academies and groups. Get in touch and we will put together a programme tailored to your team.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-white text-pink-500 font-bold px-8 py-3.5 rounded-full hover:bg-pink-50 transition-colors shadow-lg">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
