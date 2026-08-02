import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Core Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { BookingPage } from './pages/BookingPage';
import { ProfilePage } from './pages/ProfilePage';
import { ListItemPage } from './pages/ListItemPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';


// Scroll to top on route change helper
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white">
            <ScrollToTopOnRouteChange />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <div>
              {/* Sticky Navbar */}
              <Navbar onOpenAI={() => setIsAIOpen(true)} />

              {/* Application Routes */}
              <main>
                <Routes>
                  <Route path="/" element={<LandingPage onOpenAI={() => setIsAIOpen(true)} />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/item/:id" element={<ItemDetailPage />} />
                  <Route path="/book/:id" element={<BookingPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/list-item" element={<ListItemPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>

            {/* AI Assistant Modal */}
            <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

            {/* Floating Back to Top Button */}
            <ScrollToTop />

            {/* Footer */}
            <Footer />
          </div>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
