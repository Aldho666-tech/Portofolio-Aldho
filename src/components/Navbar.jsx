import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GooeyNav from './gooeynav';

const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setOpen(false);
    }, [location]);

    // Prevent body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <>
            <nav className="navbar">
                <div className="container nav-content">
                    <NavLink to="/" className="logo">
                        <img src="/logo.png" alt="AL Logo" className="nav-logo-img" />
                    </NavLink>

                    {/* Desktop Links with Gooey Effect */}
                    <div className="desktop-nav">
                        <GooeyNav items={links} />
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className="hamburger-btn"
                        onClick={() => setOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={28} color="#f5f5f5" /> : <Menu size={28} color="#f5f5f5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <ul className="mobile-nav-links">
                            {links.map((l, i) => (
                                <motion.li
                                    key={l.to}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                >
                                    <NavLink
                                        to={l.to}
                                        end={l.to === '/'}
                                        className={({ isActive }) => isActive ? 'mobile-nav-link mobile-active' : 'mobile-nav-link'}
                                        onClick={() => setOpen(false)}
                                    >
                                        {l.label}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
