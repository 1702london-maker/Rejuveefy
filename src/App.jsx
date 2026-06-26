import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'

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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const noLayoutRoutes = ['/login', '/register', '/forgot-password']

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
  return (
    <AppProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />

          {/* Providers */}
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/:slug" element={<ProviderProfile />} />
          <Route path="/providers/:slug/book" element={<BookingFlow />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />

          {/* Shop */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<ShopCategory />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* AI Analyzer */}
          <Route path="/ai-beauty" element={<AIHairAnalysis />} />
          <Route path="/ai-beauty/hair" element={<AIHairAnalysis />} />
          <Route path="/ai-beauty/skin" element={<AISkinAnalysis />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/referrals" element={<ReferAndEarn />} />
          <Route path="/reviews" element={<ReviewsRatings />} />

          {/* Info pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/booking-help" element={<BookingHelp />} />
          <Route path="/returns-refunds" element={<ReturnsRefunds />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/careers" element={<Careers />} />

          {/* Wishlist */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Affiliate */}
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/affiliate-portal" element={<AffiliatePortal />} />

          {/* Providers Portal */}
          <Route path="/providers-portal" element={<ProvidersPortal />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 404 fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
              <p className="font-display text-8xl font-bold text-pink-100 mb-4">404</p>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
              <p className="text-sm text-gray-500 mb-6">This page doesn't exist or has been moved.</p>
              <a href="/" className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">Go Home</a>
            </div>
          } />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
