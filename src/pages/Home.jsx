import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, Film, Sparkles, User, Download, MapPin } from 'lucide-react';
import LogoLoop from '../components/logoloop';
import ProfileCard from '../components/profilecard';

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

function Typewriter({ words }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    // Blinking cursor
    useEffect(() => {
        const timeout2 = setTimeout(() => setBlink(!blink), 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => setReverse(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 50)));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="typewriter-text outline-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', display: 'block', marginTop: '0.5rem' }}>
            {words[index].substring(0, subIndex)}
            <span style={{
                display: 'inline-block',
                width: '4px',
                height: '1em',
                backgroundColor: 'var(--accent)',
                marginLeft: '6px',
                verticalAlign: 'text-bottom',
                opacity: blink ? 1 : 0,
                transition: 'opacity 0.1s'
            }}></span>
        </span>
    );
}

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const typeWords = ['I build websites.', 'I design brands.', 'I edit videos.'];

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
                            <span className="hero-greeting">Hi, I'm ALDHO</span>
                            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.2 }}>
                                <Typewriter words={typeWords} />
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

            {/* ─── About Me Section ─── */}
            <section id="about" className="page-section about-section">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="about-grid"
                    >
                        {/* Left — Photo card */}
                        <motion.div variants={scaleIn} className="about-photo-col">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ProfileCard
                                    name="ALDHO LEGA"
                                    title="Software Engineer"
                                    avatarUrl="/foto.png"
                                    showUserInfo={false}
                                    enableTilt={true}
                                    behindGlowColor="rgba(40, 60, 255, 0.6)"
                                    innerGradient="linear-gradient(180deg, rgba(20, 25, 45, 0.9) 0%, rgba(10, 12, 25, 0.95) 100%)"
                                    iconUrl="/logo.png"
                                />
                            </div>
                        </motion.div>

                        {/* Right — Content */}
                        <motion.div variants={fadeIn} className="about-content-col">
                            <motion.p variants={fadeIn} className="subtitle">Who I Am</motion.p>
                            <motion.h2 variants={fadeIn} className="section-title" style={{ marginBottom: '1.5rem' }}>
                                About <span className="accent-text">Me</span>
                            </motion.h2>

                            <motion.p variants={fadeIn} className="about-bio">
                                I'm <strong>Aldho Lega Dharmawan</strong>, a creative digital enthusiast from Tangerang.
                                I specialize in <span className="accent-text">Web Development</span>,{' '}
                                <span className="accent-text">Graphic Design</span>, and{' '}
                                <span className="accent-text">Video Editing</span> — turning ideas into polished digital experiences.
                            </motion.p>
                            <motion.p variants={fadeIn} className="about-bio" style={{ marginTop: '1rem' }}>
                                With 3+ years of hands-on experience, I enjoy crafting clean interfaces,
                                bold visuals, and compelling motion stories that leave a lasting impression.
                            </motion.p>

                            {/* Skill bars */}
                            <motion.div variants={fadeIn} className="about-skills">
                                {[
                                    { label: 'Web Development', pct: 85 },
                                    { label: 'Graphic Design', pct: 90 },
                                    { label: 'Video Editing', pct: 80 },
                                ].map((s) => (
                                    <div key={s.label} className="skill-bar-row">
                                        <div className="skill-bar-label">
                                            <span>{s.label}</span>
                                            <span className="accent-text">{s.pct}%</span>
                                        </div>
                                        <div className="skill-bar-track">
                                            <motion.div
                                                className="skill-bar-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${s.pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div variants={fadeIn} className="about-actions">
                                <motion.a
                                    href="/contact"
                                    className="btn primary-btn"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Hire Me
                                </motion.a>
                                <motion.a
                                    href="/cv.pdf"
                                    download
                                    className="btn ghost-btn"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Download size={16} /> Download CV
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Call To Action Section ─── */}
            <section className="page-section cta-section" style={{ padding: '4rem 0 8rem' }}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={scaleIn}
                        className="glass-card text-center"
                        style={{ padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#fff' }}>
                            Have a project in mind?
                        </h2>
                        <p style={{ color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontSize: '1rem' }}>
                            Whether you need a new website, a brand identity, or a video edit, I'm here to bring your vision to life.
                        </p>
                        <motion.a
                            href="/contact"
                            className="btn primary-btn"
                            style={{ marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.1rem' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Sparkles size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-top' }} /> Let's Work Together
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
