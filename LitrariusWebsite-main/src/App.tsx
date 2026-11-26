import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy-loaded route components to reduce initial bundle size
// Swiper (used on Home/Australia) is code-split so it's not in every route's initial bundle
const Home = lazy(() => import('./pages/Home'));
const Australia = lazy(() => import('./pages/Australia'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Credits = lazy(() => import('./pages/Credits'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

// useDocumentTitle: sets document.title per page
function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Branded skeleton/spinner that respects reduced motion
const Skeleton = () => {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      mq.addEventListener('change', (e) => setReducedMotion(e.matches));
    }
  }, []);

  if (reducedMotion) {
    return <div className="min-h-[60svh] flex items-center justify-center px-6 color-charcoal/60" />;
  }

  return (
    <div className="min-h-[60svh] flex items-center justify-center">
      <div className="spinner border-2 border-emerald-500 rounded-full w-16 h-16 border-t-2 animate-spin" />
    </div>
  );
}

function Layout() {
  return (
    <>
      {/* Skip link: first focusable element, targets main content */}
      <a
        href="#main-content"
        className="skip-link visually-hidden focus:focus-not visually-hidden-focus"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Suspense fallback={<Skeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/australia" element={<Australia />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}