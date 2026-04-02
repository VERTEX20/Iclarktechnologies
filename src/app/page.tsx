'use client'

import Header from '@/components/marketplace/Header'
import Footer from '@/components/marketplace/Footer'
import CartDrawer from '@/components/marketplace/CartDrawer'
import ChatBot from '@/components/marketplace/ChatBot'
import HomePage from '@/components/marketplace/HomePage'
import ProductCatalog from '@/components/marketplace/ProductCatalog'
import ProductDetail from '@/components/marketplace/ProductDetail'
import CheckoutPage from '@/components/marketplace/CheckoutPage'
import LoginPage from '@/components/marketplace/LoginPage'
import RegisterPage from '@/components/marketplace/RegisterPage'
import ProfilePage from '@/components/marketplace/ProfilePage'
import VendorDashboard from '@/components/marketplace/VendorDashboard'
import AdminDashboard from '@/components/marketplace/AdminDashboard'
import ConsultationPage from '@/components/marketplace/ConsultationPage'
import SolarCalculator from '@/components/marketplace/SolarCalculator'
import BlogPage from '@/components/marketplace/BlogPage'
import BlogDetail from '@/components/marketplace/BlogDetail'
import AboutPage from '@/components/marketplace/AboutPage'
import OrdersPage from '@/components/marketplace/OrdersPage'
import { useAppStore } from '@/lib/store'

export default function Home() {
  const { currentPage, selectedProductId } = useAppStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'products':
        return <ProductCatalog />
      case 'product-detail':
        return <ProductDetail key={selectedProductId || 'none'} />
      case 'checkout':
        return <CheckoutPage />
      case 'login':
        return <LoginPage />
      case 'register':
        return <RegisterPage />
      case 'vendor-register':
        return <RegisterPage />
      case 'profile':
        return <ProfilePage />
      case 'vendor-dashboard':
        return <VendorDashboard />
      case 'admin-dashboard':
        return <AdminDashboard />
      case 'consultation':
        return <ConsultationPage />
      case 'calculator':
        return <SolarCalculator />
      case 'blog':
        return <BlogPage />
      case 'blog-detail':
        return <BlogDetail />
      case 'about':
        return <AboutPage />
      case 'orders':
        return <OrdersPage />
      case 'wishlist':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <ChatBot />
    </div>
  )
}
