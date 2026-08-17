import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Core Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WebsiteFeedbackModal } from './components/WebsiteFeedbackModal';

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

import { MessageSquare, Sparkles } from 'lucide-react';

import { ErrorBoundary } from './components/ErrorBoundary';

// Scroll to top on route change helper
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white relative">
            <ScrollToTopOnRouteChange />
            <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

            <div>
              {/* Sticky Navbar with Feedback trigger */}
              <Navbar onOpenFeedback={() => setIsFeedbackModalOpen(true)} />

              {/* Application Routes with Error Boundary */}
              <main>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
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
                </ErrorBoundary>
              </main>
            </div>

            {/* FLOATING WEBSITE FEEDBACK BUTTON (Bottom Right, next to ScrollToTop) */}
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 backdrop-blur-md shadow-2xl hover:scale-105 active:scale-95 transition flex items-center gap-2 text-xs font-extrabold border border-slate-700 dark:border-slate-300 cursor-pointer group"
              title="Give Website & Platform Feedback"
            >
              <MessageSquare className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Feedback</span>
              <Sparkles className="w-3 h-3 text-amber-400 fill-current" />
            </button>

            {/* Floating Back to Top Button */}
            <ScrollToTop />

            {/* Footer with Feedback trigger */}
            <Footer onOpenFeedback={() => setIsFeedbackModalOpen(true)} />

            {/* Global Website Feedback Modal */}
            <WebsiteFeedbackModal
              isOpen={isFeedbackModalOpen}
              onClose={() => setIsFeedbackModalOpen(false)}
            />
          </div>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
