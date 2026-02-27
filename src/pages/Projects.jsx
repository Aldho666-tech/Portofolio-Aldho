import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import CircularGallery from '../components/circulargallery';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.18 } } };

const graphicImages = [
    { title: 'Cyberpunk Vision', year: '2023', url: 'https://images.unsplash.com/photo-1563240619-44ce0ceeb0cb?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Minimalist Branding', year: '2024', url: 'https://images.unsplash.com/photo-1618585934665-27663e804f85?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Abstract Geometry', year: '2023', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Digital Synthesis', year: '2024', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Vibrant Identity', year: '2023', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Brand', year: '2025', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Geometric Landscapes', year: '2024', url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Neon Nights', year: '2023', url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Brutalist Space', year: '2024', url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2072&auto=format&fit=crop' },
    { title: 'Modern Typography', year: '2022', url: 'https://images.unsplash.com/photo-1552083165-276662e7f338?q=80&w=2069&auto=format&fit=crop' },
    { title: 'Flowing Liquids', year: '2024', url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop' },
    { title: 'Optical Illusion', year: '2023', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Gradient Dreams', year: '2024', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Aura Blur', year: '2025', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' },
    { title: 'Holographic Foil', year: '2023', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Retro Futurism', year: '2024', url: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=2000&auto=format&fit=crop' }
];

const projects = {
    web: [
        {
            id: 1, title: 'Lumina Dashboard', category: 'Web Development',
            description: 'A modern, dark-mode analytics dashboard with real-time data visualization.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            link: '#',
            tags: ['React', 'D3.js', 'Firebase']
        },
        {
            id: 2, title: 'E-Commerce Redefined', category: 'Web Development',
            description: 'Headless storefront with ultra-fast performance and minimalist UI.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
            link: '#',
            tags: ['Next.js', 'Stripe', 'Tailwind']
        },
        {
            id: 3, title: 'Nova AI Platform', category: 'Web Development',
            description: 'AI-powered content generation platform with a sleek, glassmorphic interface.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
            link: '#',
            tags: ['React', 'OpenAI', 'Node.js']
        },
    ],
    video: [
        {
            id: 5, title: 'Distortion & The Void', category: 'Video Editing',
            description: 'Avante-garde music video mixing datamoshing, generative glitch art, and raw cinematic shots.',
            videoSrc: 'https://cdn.coverr.co/videos/coverr-a-person-walking-in-a-dark-hallway-2516/1080p.mp4',
            link: '#',
            tags: ['Premiere Pro', 'After Effects']
        },
        {
            id: 6, title: 'Echoes of Silence', category: 'Video Editing',
            description: 'A short documentary exploring brutalist architecture with intense sound design and monochrome aesthetic.',
            videoSrc: 'https://cdn.coverr.co/videos/coverr-looking-up-at-a-tall-modern-building-3733/1080p.mp4',
            link: '#',
            tags: ['DaVinci Resolve', 'Sound Design']
        },
        {
            id: 7, title: 'Urban Pulse', category: 'Video Editing',
            description: 'Fast-paced rhythmic edit capturing the energy of nightlife with dynamic transitions.',
            videoSrc: 'https://cdn.coverr.co/videos/coverr-street-at-night-with-city-lights-in-motion-5161/1080p.mp4',
            link: '#',
            tags: ['After Effects', 'Foley']
        },
    ],
};

function ProjectCard({ project, isVideo }) {
    return (
        <motion.div
            variants={fadeIn}
            className="project-card"
            whileHover="hover"
        >
            <div className="project-image-container">
                {isVideo ? (
                    <video
                        src={project.videoSrc}
                        className="project-image"
                        autoPlay loop muted playsInline
                    />
                ) : (
                    <img src={project.image} alt={project.title} className="project-image" />
                )}
                <motion.div
                    className="project-overlay"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.3 }}
                >
                    <a href={project.link} className="btn-icon">
                        <ExternalLink size={22} color="var(--bg)" />
                    </a>
                </motion.div>
            </div>
            <div className="project-content">
                <div className="project-header">
                    <p className="project-category">{project.category}</p>
                    <div className="project-tags">
                        {project.tags?.map((tag, i) => (
                            <span key={i} className="project-mini-tag">{tag}</span>
                        ))}
                    </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
            </div>
        </motion.div>
    );
}

function CategorySection({ title, children, count, layout = 'grid' }) {
    return (
        <div className="project-category-section">
            <motion.div variants={fadeIn} className="category-heading-row">
                <div className="category-title-wrap">
                    <h3 className="category-heading">{title}</h3>
                    {count && <span className="category-count">{count}</span>}
                </div>
                <span className="category-line" />
            </motion.div>
            <div className={
                layout === 'bento' ? 'projects-bento'
                    : layout === 'list' ? 'projects-list'
                        : 'projects-grid'
            }>
                {children}
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="page-section">
            <div className="container">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
                    <motion.p variants={fadeIn} className="subtitle text-center" style={{ marginBottom: '1rem' }}>Portfolio</motion.p>
                    <motion.h2 variants={fadeIn} className="section-title">Selected Works</motion.h2>

                    <motion.div variants={fadeIn}>
                        <CategorySection title="Web Development" layout="grid" count={projects.web.length}>
                            {projects.web.map(p => <ProjectCard key={p.id} project={p} />)}
                        </CategorySection>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <CategorySection title="Graphic Design" layout="grid" count={graphicImages.length}>
                            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                                <CircularGallery items={graphicImages} />
                            </div>
                        </CategorySection>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <CategorySection title="Video Editing" layout="list" count={projects.video.length}>
                            {projects.video.map(p => <ProjectCard key={p.id} project={p} isVideo />)}
                        </CategorySection>
                    </motion.div>

                    <motion.div variants={fadeIn} className="text-center" style={{ marginTop: '4rem' }}>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="btn">
                            More on GitHub <ExternalLink size={16} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
