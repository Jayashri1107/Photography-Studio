import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackToTop, Footer, Navbar, ScrollProgress } from './components/Layout';
import Home from './pages/Home';
import { About, CategoryPage, Contact, Faq, NotFound, Portfolio, Services, Story } from './pages/Pages';
import { categories } from './data/categories';

function Page({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.main
      id="main"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-olive focus:px-5 focus:py-3 focus:text-warm">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // New page: start at the top (or at the #section) and recalculate scroll effects.
          const id = location.hash.slice(1);
          const el = id && document.getElementById(id);
          if (el) el.scrollIntoView();
          else window.scrollTo(0, 0);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/portfolio" element={<Page><Portfolio /></Page>} />
          <Route path="/services" element={<Page><Services /></Page>} />
          {categories.map((c) => (
            <Route key={c.slug} path={c.path} element={<Page><CategoryPage slug={c.slug} /></Page>} />
          ))}
          <Route path="/stories/:slug" element={<Page><Story /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/book" element={<Page><Contact /></Page>} />
          <Route path="/faq" element={<Page><Faq /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  );
}
