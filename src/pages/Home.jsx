import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Code2, Palette, Film, Sparkles, User, Download, MapPin, X } from 'lucide-react';
import LogoLoop from '../components/logoloop';
import ProfileCard from '../components/profilecard';

const Lanyard = lazy(() => import('../components/Lanyard'));

const fadeIn = {
    hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -70, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.7, rotateX: 10 },
    visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};
const slideUp = {
    hidden: { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.0 } } };

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
    { icon: <Film size={16} />, label: 'Video Editor' },
    { icon: <Code2 size={16} />, label: 'Web Developer' },
    { icon: <Palette size={16} />, label: 'Graphic Designer' },
];

// Split text letter-by-letter animation
function AnimatedText({ text, className, style, delay = 0 }) {
    const letters = text.split('');
    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } }
    };
    const letter = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };
    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            style={{ display: 'inline-block', perspective: '800px', ...style }}
        >
            {letters.map((char, i) => (
                <motion.span
                    key={i}
                    variants={letter}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block', transformOrigin: 'top center' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Count-up number component
function CountUp({ target, suffix = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const num = parseInt(target);
        let start = 0;
        const duration = 1500;
        const step = Math.ceil(num / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= num) { setCount(num); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);
    return <span ref={ref}>{count}{suffix}</span>;
}

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

const experiences = [
    {
        company: 'Badak Perkasa Group',
        type: 'Full-time · 2 yrs',
        location: 'Tigaraksa, Banten, Indonesia · On-site',
        roles: [
            {
                title: 'Marketing Communications Officer',
                date: 'Jan 2025 - Present · 1 yr 3 mos',
                description: 'Fully responsible for visual creation, video production, and digital content strategy, from concept to finalization, to support company marketing and branding strategies.',
                skills: ['Adobe Photoshop', 'Adobe Premiere Pro', '+6 skills']
            },
            {
                title: 'Graphic Designer & Video Editor',
                date: 'Apr 2024 - Jan 2025 · 10 mos',
                description: 'Fully responsible for visual creation and digital content strategy, from concept to finalization, to support company marketing and branding strategies.',
                skills: ['Adobe Photoshop']
            }
        ]
    },
    {
        company: 'Rossy Creatives',
        type: 'Part-time',
        location: 'Bali, Indonesia · Remote',
        roles: [
            {
                title: 'Video Editor',
                date: 'Feb 2026 - Present · 2 mos',
                description: 'Editing and producing high-quality video content for various creative projects.',
                skills: ['Adobe Premiere Pro', 'After Effects', 'CapCut']
            }
        ]
    },
    {
        company: 'Instagram (@dirtymarshal_)',
        type: 'Self-employed',
        location: 'Indonesia · On-site',
        roles: [
            {
                title: 'Content Creator',
                date: 'Sep 2023 - Present · 2 yrs 7 mos',
                description: 'Automotive Content Creator & Video Editor on Instagram (@dirtymarshal_). Fully responsible from concept to post-production for personal motorcycle review content, including performance details.',
                skills: ['Video Editing', 'CapCut', 'Content Creation']
            }
        ]
    },
    {
        company: 'Esi Kabupaten Tangerang',
        type: 'Freelance',
        location: 'Tangerang Regency, Banten, Indonesia · Remote',
        roles: [
            {
                title: 'Freelance Graphic Designer',
                date: 'Jun 2022 - Dec 2022 · 7 mos',
                description: 'Played a key role in esports event operations, broadcasting, and branding. Managed smooth tournaments, hosted engaging live streams, and designed promotional graphics and broadcast overlays.',
                skills: ['Adobe Photoshop', 'OBS Studio']
            }
        ]
    }
];

const education = [
    {
        school: 'Universitas Pamulang',
        degree: '',
        date: '2022 - 2026',
        description: '',
        skills: []
    },
    {
        school: 'SMKN 9 Kabupaten Tangerang',
        degree: 'Bachelor of Arts - BA, Intermedia/Multimedia',
        date: 'Jun 2019 - Jun 2024',
        description: 'Activities and societies: Scout',
        skills: ['Adobe Premiere Pro', 'Adobe Photoshop']
    }
];

const videoCollection = [
    { type: 'video', src: '/videos/reel-1.mp4', link: 'https://www.instagram.com/reel/DNRy_sgBPz5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
    { type: 'video', src: '/videos/reel-2.mp4', link: 'https://www.instagram.com/reel/DJ_r68_Jpt3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
    { type: 'video', src: '/videos/reel-3.mp4', link: 'https://www.instagram.com/reel/DIswRXvJXYt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
    { type: 'video', src: '/videos/reel-4.mp4', link: 'https://www.instagram.com/reel/DVApwMECUpx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
    { type: 'video', src: '/videos/reel-5.mp4', link: 'https://www.instagram.com/reel/DVsEUvXkXOo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
    { type: 'video', src: '/videos/reel-6.mp4', link: 'https://www.instagram.com/reel/DMfWWTHR0a6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
    { type: 'video', src: '/videos/reel-7.mp4', link: 'https://www.instagram.com/reel/DVyznKSEr8N/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', platform: 'Instagram' },
];

const webCollection = [
    { type: 'image', src: '/cmsschool-preview.png', link: 'https://cmsschooll.netlify.app/', platform: 'Website' },
    { type: 'image', src: '/raalfatin-preview.png', link: 'https://raalfatinn.netlify.app/', platform: 'Website' },
];

const designCollection = [
    { type: 'image', src: '/design/ig batara.PNG' },
    { type: 'image', src: '/design/ig kota cakra.PNG' },
    { type: 'image', src: '/design/ig triraksa.PNG' },
];

const ProjectCollection = ({ title, items, link }) => {
    const scrollRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDown(false);
    };

    const onMouseUp = () => {
        setIsDown(false);
    };

    const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <motion.div variants={fadeIn} className="project-collection">
            <div className="project-collection-header">
                <h3 className="collection-title">{title}</h3>
                {link && (
                    <a href={link} className="btn secondary-btn btn-sm">
                        See my project more <ArrowRight size={14} />
                    </a>
                )}
            </div>
            <div
                className={`project-collection-scroll ${isDown ? 'active' : ''}`}
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className={`collection-card ${title === 'Website' ? 'website-card' : title === 'Design' ? 'design-card' : ''}`}
                        whileHover={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                            const walk = Math.abs((e.pageX - scrollRef.current.offsetLeft) - startX);
                            if (walk < 5 && item.link) {
                                window.open(item.link, '_blank');
                            }
                        }}
                    >
                        {item.type === 'video' ? (
                            <video src={item.src} autoPlay loop muted playsInline className="collection-media" draggable="false" />
                        ) : (
                            <img src={item.src} alt="project" className="collection-media" draggable="false" style={{ objectPosition: item.platform === 'Website' ? 'top center' : 'center' }} />
                        )}

                        {item.link && (
                            <div className="collection-card-overlay">
                                <span>Watch on {item.platform || 'Link'} <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /></span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div >
    );
};

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    const [isCertModalOpen, setIsCertModalOpen] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const typeWords = ['I edit videos.', 'I design brands.', 'I build websites.'];

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

                {/* Floating background particles */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                    {[...Array(18)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.35)',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30 - Math.random() * 40, 0],
                                opacity: [0, 0.8, 0],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                delay: Math.random() * 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                <div className="container hero-layout" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Left Column - Text Content */}
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="hero-content">

                        <motion.div
                            variants={fadeInLeft}
                            className="intro-badge"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                        >
                            <Sparkles size={14} className="badge-icon" />
                            <span>Available for work</span>
                        </motion.div>

                        <motion.div variants={stagger} className="hero-name-block">
                            <AnimatedText text="Hi, I'm ALDHO" className="hero-greeting" delay={0.1} />
                            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.2 }}>
                                <Typewriter words={typeWords} />
                            </h1>
                        </motion.div>

                        <motion.div variants={fadeIn} className="skills-pills">
                            {skills.map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="skill-pill"
                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.8 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -5, scale: 1.07, borderColor: 'rgba(255,255,255,0.5)', boxShadow: '0 0 15px rgba(255,255,255,0.15)' }}
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
                                whileHover={{ scale: 1.06, boxShadow: '0 10px 30px rgba(255,255,255,0.2)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                See My Projects
                            </motion.a>
                        </motion.div>

                        {/* Stats Row - Desktop Only */}
                        {!isMobile && (
                            <motion.div variants={fadeIn} className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number"><CountUp target="3" suffix="+" /></span>
                                    <span className="stat-label">Years Experience</span>
                                </div>
                                <div className="stat-divider" />
                                <div className="stat-item">
                                    <span className="stat-number"><CountUp target="100" suffix="+" /></span>
                                    <span className="stat-label">Projects Done</span>
                                </div>
                                <div className="stat-divider" />
                                <div className="stat-item">
                                    <span className="stat-number"><CountUp target="100" suffix="+" /></span>
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
                                { num: '100+', label: 'Projects' },
                                { num: '100+', label: 'Clients' },
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
                                <motion.div
                                    whileHover={{ scale: 1.03, rotate: 1 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                >
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
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right — Content */}
                        <motion.div variants={fadeIn} className="about-content-col">
                            <motion.p variants={fadeIn} className="subtitle">Who I Am,</motion.p>
                            <motion.h2 variants={fadeIn} className="section-title" style={{ marginBottom: '1.5rem' }}>
                                About <span className="accent-text">Me</span>
                            </motion.h2>

                            <motion.p variants={fadeIn} className="about-bio">
                                I'm <strong>Aldho Lega Dharmawan</strong>, a creative digital enthusiast from Tangerang.
                                I specialize in <span className="accent-text">Video Editing</span>,{' '}
                                <span className="accent-text">Graphic Design</span>, and{' '}
                                <span className="accent-text">Web Development</span> — turning ideas into polished digital experiences.
                            </motion.p>
                            <motion.p variants={fadeIn} className="about-bio" style={{ marginTop: '1rem' }}>
                                With 3+ years of hands-on experience, I enjoy crafting compelling motion stories,
                                bold visuals, and clean interfaces that leave a lasting impression.
                            </motion.p>

                            {/* Skill bars */}
                            <motion.div variants={fadeIn} className="about-skills">
                                {[
                                    { label: 'Video Editing', pct: 95 },
                                    { label: 'Graphic Design', pct: 90 },
                                    { label: 'Web Development', pct: 85 },
                                ].map((s, idx) => (
                                    <div key={s.label} className="skill-bar-row">
                                        <div className="skill-bar-label">
                                            <span>{s.label}</span>
                                            <span className="accent-text">{s.pct}%</span>
                                        </div>
                                        <div className="skill-bar-track">
                                            <motion.div
                                                className="skill-bar-fill"
                                                initial={{ width: 0, opacity: 0 }}
                                                whileInView={{ width: `${s.pct}%`, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
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

            {/* ─── Experience Section ─── */}
            <section id="experience" className="page-section experience-section">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                    >
                        <motion.p variants={fadeIn} className="subtitle text-center">My Journey</motion.p>
                        <motion.h2 variants={fadeIn} className="section-title" style={{ marginBottom: '3rem' }}>
                            Work <span className="accent-text">Experience</span>
                        </motion.h2>

                        <div className="timeline">
                            {experiences.map((exp, i) => (
                                <motion.div key={i} variants={fadeInLeft} className="timeline-item">
                                    <div className="timeline-dot" />
                                    <div className="timeline-content">
                                        <h3 className="timeline-company">{exp.company}</h3>
                                        <div className="timeline-meta">
                                            <span>{exp.type}</span>
                                            <span>{exp.location}</span>
                                        </div>

                                        <div className="timeline-roles">
                                            {exp.roles.map((role, idx) => (
                                                <div key={idx} className="timeline-role">
                                                    <h4 className="timeline-role-title">{role.title}</h4>
                                                    <div className="timeline-role-date">{role.date}</div>
                                                    {role.description && (
                                                        <p className="timeline-role-desc">{role.description}</p>
                                                    )}
                                                    {role.skills && role.skills.length > 0 && (
                                                        <div className="timeline-skills">
                                                            {role.skills.map((skill, sIdx) => (
                                                                <span key={sIdx} className="timeline-skill">
                                                                    <Sparkles size={10} style={{ marginRight: '4px', display: 'inline' }} />
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Education & Certification Section ─── */}
            <section id="education" className="page-section experience-section">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                    >
                        <motion.p variants={fadeIn} className="subtitle text-center">Academic Background</motion.p>
                        <motion.h2 variants={fadeIn} className="section-title" style={{ marginBottom: '3rem' }}>
                            Education & <span className="accent-text">Certification</span>
                        </motion.h2>

                        <div className="timeline">
                            {education.map((edu, i) => (
                                <motion.div key={i} variants={fadeInLeft} className="timeline-item">
                                    <div className="timeline-dot" />
                                    <div className="timeline-content">
                                        <h3 className="timeline-company">{edu.school}</h3>
                                        {edu.degree && (
                                            <div className="timeline-meta" style={{ marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text)' }}>{edu.degree}</span>
                                            </div>
                                        )}
                                        <div className="timeline-meta">
                                            <span>{edu.date}</span>
                                        </div>

                                        <div className="timeline-roles">
                                            <div className="timeline-role">
                                                {edu.description && (
                                                    <p className="timeline-role-desc" style={{ marginTop: '0.5rem' }}>{edu.description}</p>
                                                )}
                                                {edu.skills && edu.skills.length > 0 && (
                                                    <div className="timeline-skills">
                                                        {edu.skills.map((skill, sIdx) => (
                                                            <span key={sIdx} className="timeline-skill">
                                                                <Sparkles size={10} style={{ marginRight: '4px', display: 'inline' }} />
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Certificate Image */}
                        <motion.div variants={fadeIn} style={{ marginTop: '4rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Professional Certification</h3>
                            <div 
                                style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', display: 'inline-block', border: '1px solid rgba(255, 255, 255, 0.1)', cursor: 'zoom-in', transition: 'transform 0.3s ease' }}
                                onClick={() => setIsCertModalOpen(true)}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img src="/BNSP.jpg" alt="BNSP Certificate" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', maxHeight: '400px', objectFit: 'contain' }} />
                                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--accent)' }}>Click to zoom <Sparkles size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Projects Collections Section ─── */}
            <section className="collections-section">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                    >
                        <motion.p variants={fadeIn} className="subtitle text-center">My Work</motion.p>
                        <motion.h2 variants={fadeIn} className="section-title" style={{ marginBottom: '3rem' }}>
                            Port<span className="accent-text">folio</span>
                        </motion.h2>
                        <ProjectCollection
                            title="Video Editor"
                            items={videoCollection}
                            link="https://drive.google.com/drive/folders/1k74NUn8MW6Nbn7hwzw-kBqjUycZa50bz?usp=sharing"
                        />
                        <ProjectCollection
                            title="Website"
                            items={webCollection}
                            link="#"
                        />
                        <ProjectCollection
                            title="Design"
                            items={designCollection}
                            link="#"
                        />
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
                        className="glass-card text-center cta-video-card"
                        style={{ padding: 'clamp(3rem, 5vw, 5rem) 1rem', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Video Background */}
                        <video
                            src="/videos/aldo.MP4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.6,
                                zIndex: 0,
                                pointerEvents: 'none'
                            }}
                        />
                        {/* Dark Overlay for better text readability */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))', zIndex: 0 }} />

                        {/* Content */}
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)', margin: 0 }}>
                                Have a project in mind?
                            </h2>
                            <p style={{ color: '#eaeaea', maxWidth: '550px', margin: '0 auto', fontSize: '1.05rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontWeight: 500 }}>
                                Whether you need a new website, a brand identity, or a video edit, I'm here to bring your vision to life.
                            </p>
                            <motion.a
                                href="/contact"
                                className="btn primary-btn"
                                style={{ marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-top' }} /> Let's Work Together
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Certificate Modal ─── */}
            {isCertModalOpen && (
                <div 
                    style={{ 
                        position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' 
                    }}
                    onClick={() => setIsCertModalOpen(false)}
                >
                    <button 
                        style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setIsCertModalOpen(false)}
                    >
                        <X size={24} />
                    </button>
                    <motion.img 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src="/BNSP.jpg" 
                        alt="BNSP Certificate Full" 
                        style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }} 
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
