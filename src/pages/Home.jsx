import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, Film, Sparkles } from 'lucide-react';
import LogoLoop from '../components/logoloop';

const Lanyard = lazy(() => import('../components/Lanyard'));

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

class LanyardErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.error("Lanyard 3D Error:", error, info);
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

const skills = [
    { icon: <Code2 size={16} />, label: 'Web Developer' },
    { icon: <Palette size={16} />, label: 'Graphic Designer' },
    { icon: <Film size={16} />, label: 'Video Editor' },
];

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <>
            <section id="home" className="page-section hero-section">
                {/* 3D Lanyard */}
                {!isMobile && (
                    <LanyardErrorBoundary>
                        <Suspense fallback={null}>
                            <Lanyard />
                        </Suspense>
                    </LanyardErrorBoundary>
                )}

                <div className="container hero-layout">
                    {/* Left Column - Text Content */}
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="hero-content">

                        <motion.div variants={fadeInLeft} className="intro-badge">
                            <Sparkles size={14} className="badge-icon" />
                            <span>Available for work</span>
                        </motion.div>

                        <motion.div variants={fadeInLeft} className="hero-name-block">
                            <span className="hero-greeting">Hi, I'm</span>
                            <h1 className="hero-title">
                                ALDHO<br />
                                <span className="outline-text">LEGA DHARMAWAN.</span>
                            </h1>
                        </motion.div>

                        <motion.div variants={fadeIn} className="skills-pills">
                            {skills.map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="skill-pill"
                                    whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.3)' }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    {s.icon}
                                    {s.label}
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeIn} className="hero-actions">
                            <motion.a
                                href="/projects"
                                className="btn primary-btn"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                See My Projects
                            </motion.a>
                        </motion.div>

                        {/* Stats Row - Desktop Only */}
                        {!isMobile && (
                            <motion.div variants={fadeIn} className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">3+</span>
                                    <span className="stat-label">Years Experience</span>
                                </div>
                                <div className="stat-divider" />
                                <div className="stat-item">
                                    <span className="stat-number">20+</span>
                                    <span className="stat-label">Projects Done</span>
                                </div>
                                <div className="stat-divider" />
                                <div className="stat-item">
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Happy Clients</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Mobile Stats */}
                    {isMobile && (
                        <motion.div
                            initial="hidden" animate="visible" variants={stagger}
                            className="hero-stats-mobile"
                        >
                            {[
                                { num: '3+', label: 'Years Exp.' },
                                { num: '20+', label: 'Projects' },
                                { num: '10+', label: 'Clients' },
                            ].map((s, i) => (
                                <motion.div key={i} variants={scaleIn} className="stat-card-mobile">
                                    <span className="stat-number">{s.num}</span>
                                    <span className="stat-label">{s.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <LogoLoop />
        </>
    );
}
