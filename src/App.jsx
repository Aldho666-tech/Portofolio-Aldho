import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import DarkVeil from './components/darkveil';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './index.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const el = e.target;
      setHov(
        el.matches('a, button, .glass-card, .project-card, .service-card') ||
        !!el.closest('a, button, .glass-card, .project-card, .service-card')
      );
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hov ? 0 : 1 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: pos.x - 16, y: pos.y - 16,
          scale: hov ? 1.6 : 1,
          backgroundColor: hov ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.12 }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Background Layer */}
      <div className="darkveil-bg">
        <DarkVeil speed={0.4} resolutionScale={0.7} />
      </div>

      <CustomCursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Aldho Lega Dharmawan. All Rights Reserved.</p>
      </footer>
    </BrowserRouter>
  );
}
