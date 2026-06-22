import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactWidget from './components/ContactWidget'
import Toast from './components/Toast'

import Home from './pages/Home'
import Book from './pages/Book'
import Providers, { ProviderProfile } from './pages/Providers'
import Shop, { ProductDetail } from './pages/Shop'
import Cart, { Checkout, OrderSuccess } from './pages/Cart'
import AIAnalyzer from './pages/AIAnalyzer'
import { Login, Register, ForgotPassword } from './pages/Auth'
import Dashboard, { MyBookings, MyOrders, Wishlist, Account, Referrals } from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import {
  About, Contact, FAQ, BookingHelp, Returns, TrackOrder, Careers,
  BecomeProvider, ProviderApplication, ProviderDashboard,
} from './pages/InfoPages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children, noFooter }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {!noFooter && <Footer />}
      <ContactWidget />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/book" element={<Layout><Book /></Layout>} />
          <Route path="/book/:category" element={<Layout><Book /></Layout>} />
          <Route path="/providers" element={<Layout><Providers /></Layout>} />
          <Route path="/providers/:id" element={<Layout><ProviderProfile /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/shop/:category" element={<Layout><Shop /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/ai-analyzer" element={<Layout><AIAnalyzer /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/booking-help" element={<Layout><BookingHelp /></Layout>} />
          <Route path="/returns" element={<Layout><Returns /></Layout>} />
          <Route path="/track-order" element={<Layout><TrackOrder /></Layout>} />
          <Route path="/careers" element={<Layout><Careers /></Layout>} />
          <Route path="/become-provider" element={<Layout><BecomeProvider /></Layout>} />
          <Route path="/provider-application" element={<Layout><ProviderApplication /></Layout>} />
          {/* Shop flow */}
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout noFooter><Checkout /></Layout>} />
          <Route path="/order-success" element={<Layout><OrderSuccess /></Layout>} />
          <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
          {/* Auth */}
          <Route path="/login" element={<Layout noFooter><Login /></Layout>} />
          <Route path="/register" element={<Layout noFooter><Register /></Layout>} />
          <Route path="/forgot-password" element={<Layout noFooter><ForgotPassword /></Layout>} />
          {/* Customer */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/bookings" element={<Layout><MyBookings /></Layout>} />
          <Route path="/orders" element={<Layout><MyOrders /></Layout>} />
          <Route path="/account" element={<Layout><Account /></Layout>} />
          <Route path="/referrals" element={<Layout><Referrals /></Layout>} />
          {/* Provider */}
          <Route path="/provider-dashboard" element={<Layout noFooter><ProviderDashboard /></Layout>} />
          {/* Admin */}
          <Route path="/admin" element={<Layout noFooter><AdminDashboard /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
