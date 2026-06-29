import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import FloatingWidgets from './components/FloatingWidgets'

// Pages
import Home from './pages/Home'
import Book from './pages/Book'
import Providers, { ProviderProfile, BookingFlow, BookingConfirmation } from './pages/Providers'
import Shop, { ShopCategory, ProductDetail } from './pages/Shop'
import Cart, { Checkout, OrderSuccess } from './pages/Cart'
import AIHairAnalysis, { AISkinAnalysis } from './pages/AIAnalyzer'
import MyBookings, { DashboardHome, ReferAndEarn, ReviewsRatings } from './pages/Dashboard'
import { AboutUs, ContactUs, FAQ, BookingHelp, ReturnsRefunds, TrackOrder, Careers } from './pages/InfoPages'
import Login, { Register, ForgotPassword } from './pages/Auth'
import Wishlist from './pages/Wishlist'
import Affiliate from './pages/Affiliate'
import AffiliatePortal from './pages/AffiliatePortal'
import ProvidersPortal from './pages/ProvidersPortal'
import Training from './pages/Training'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const noLayoutRoutes = ['/login', '/register', '/forgot-password']

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function Layout({ children }) {
  const { pathname } = useLocation()
  const bare = noLayoutRoutes.some(r => pathname.startsWith(r))
  if (bare) return children
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toast />
    </>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <AppProvider>
      <ScrollToTop />
      <FloatingWidgets />
      <Layout>
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Core */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/book" element={<PageWrapper><Book /></PageWrapper>} />

          {/* Providers */}
          <Route path="/providers" element={<PageWrapper><Providers /></PageWrapper>} />
          <Route path="/providers/:slug" element={<PageWrapper><ProviderProfile /></PageWrapper>} />
          <Route path="/providers/:slug/book" element={<PageWrapper><BookingFlow /></PageWrapper>} />
          <Route path="/booking-confirmation" element={<PageWrapper><BookingConfirmation /></PageWrapper>} />

          {/* Shop */}
          <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
          <Route path="/shop/:category" element={<PageWrapper><ShopCategory /></PageWrapper>} />
          <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
          <Route path="/order-success" element={<PageWrapper><OrderSuccess /></PageWrapper>} />

          {/* AI Analyzer */}
          <Route path="/ai-beauty" element={<PageWrapper><AIHairAnalysis /></PageWrapper>} />
          <Route path="/ai-beauty/hair" element={<PageWrapper><AIHairAnalysis /></PageWrapper>} />
          <Route path="/ai-beauty/skin" element={<PageWrapper><AISkinAnalysis /></PageWrapper>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<PageWrapper><DashboardHome /></PageWrapper>} />
          <Route path="/bookings" element={<PageWrapper><MyBookings /></PageWrapper>} />
          <Route path="/referrals" element={<PageWrapper><ReferAndEarn /></PageWrapper>} />
          <Route path="/reviews" element={<PageWrapper><ReviewsRatings /></PageWrapper>} />

          {/* Info pages */}
          <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
          <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
          <Route path="/booking-help" element={<PageWrapper><BookingHelp /></PageWrapper>} />
          <Route path="/returns-refunds" element={<PageWrapper><ReturnsRefunds /></PageWrapper>} />
          <Route path="/track-order" element={<PageWrapper><TrackOrder /></PageWrapper>} />
          <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />

          {/* Wishlist */}
          <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />

          {/* Affiliate */}
          <Route path="/affiliate" element={<PageWrapper><Affiliate /></PageWrapper>} />
          <Route path="/affiliate-portal" element={<PageWrapper><AffiliatePortal /></PageWrapper>} />

          {/* Training */}
          <Route path="/training" element={<PageWrapper><Training /></PageWrapper>} />

          {/* Providers Portal */}
          <Route path="/providers-portal" element={<PageWrapper><ProvidersPortal /></PageWrapper>} />

          {/* Auth */}
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />

          {/* 404 fallback */}
          <Route path="*" element={
            <PageWrapper>
              <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
                <p className="font-display text-8xl font-bold text-pink-100 mb-4">404</p>
                <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
                <p className="text-sm text-gray-500 mb-6">This page doesn't exist or has been moved.</p>
                <a href="/" className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">Go Home</a>
              </div>
            </PageWrapper>
          } />
        </Routes>
        </AnimatePresence>
      </Layout>
    </AppProvider>
  )
}
