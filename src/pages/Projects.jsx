import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import CircularGallery from '../components/circulargallery';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.18 } } };

const projects = {
    web: [
        {
            id: 1, title: 'CMS School', category: 'Web Development',
            description: 'A modern landing page and informational website for an educational institution.',
            image: '/cmsschool-preview.png',
            link: 'https://cmsschooll.netlify.app/',
            tags: ['React', 'Website']
        },
        {
            id: 2, title: 'RA Al Fatin', category: 'Web Development',
            description: 'Islamic preschool profile website with a clean, welcoming interface.',
            image: '/raalfatin-preview.png',
            link: 'https://raalfatinn.netlify.app/',
            tags: ['React', 'Website']
        }
    ],
    video: [
        {
            id: 3, title: 'Instagram Reel - Automotive 1', category: 'Video Editing',
            description: 'Dynamic automotive content creation and review for Instagram Reels.',
            videoSrc: '/videos/reel-1.mp4',
            link: 'https://www.instagram.com/reel/DNRy_sgBPz5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'CapCut']
        },
        {
            id: 4, title: 'Instagram Reel - Automotive 2', category: 'Video Editing',
            description: 'High-energy motorcycle performance edit.',
            videoSrc: '/videos/reel-2.mp4',
            link: 'https://www.instagram.com/reel/DJ_r68_Jpt3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'CapCut']
        },
        {
            id: 5, title: 'Instagram Reel - Automotive 3', category: 'Video Editing',
            description: 'Engaging content creation focusing on automotive aesthetics.',
            videoSrc: '/videos/reel-3.mp4',
            link: 'https://www.instagram.com/reel/DIswRXvJXYt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'CapCut']
        },
        {
            id: 6, title: 'Instagram Reel - Event 1', category: 'Video Editing',
            description: 'Event coverage and highlight reel tailored for social media.',
            videoSrc: '/videos/reel-4.mp4',
            link: 'https://www.instagram.com/reel/DVApwMECUpx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'Premiere Pro']
        },
        {
            id: 7, title: 'Instagram Reel - Event 2', category: 'Video Editing',
            description: 'Fast-paced rhythmic edit capturing the energy of the moment.',
            videoSrc: '/videos/reel-5.mp4',
            link: 'https://www.instagram.com/reel/DVsEUvXkXOo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'After Effects']
        },
        {
            id: 8, title: 'Instagram Reel - Cinematic 1', category: 'Video Editing',
            description: 'Cinematic shots and smooth transitions for professional branding.',
            videoSrc: '/videos/reel-6.mp4',
            link: 'https://www.instagram.com/reel/DMfWWTHR0a6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'CapCut']
        },
        {
            id: 9, title: 'Instagram Reel - Cinematic 2', category: 'Video Editing',
            description: 'Promotional video content designed for maximum engagement.',
            videoSrc: '/videos/reel-7.mp4',
            link: 'https://www.instagram.com/reel/DVyznKSEr8N/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            tags: ['Instagram', 'Premiere Pro']
        }
    ],
    design: [
        {
            id: 10, title: 'Instagram Post - Batara Parkview', category: 'Graphic Design',
            description: 'Social media post design for Batara Parkview real estate.',
            image: '/design/ig batara.PNG',
            link: '#',
            tags: ['Photoshop', 'Social Media']
        },
        {
            id: 11, title: 'Instagram Post - Kota Cakra', category: 'Graphic Design',
            description: 'Engaging Instagram content design for Kota Cakra.',
            image: '/design/ig kota cakra.PNG',
            link: '#',
            tags: ['Photoshop', 'Social Media']
        },
        {
            id: 12, title: 'Instagram Post - Triraksa Village', category: 'Graphic Design',
            description: 'Promotional graphic design for Triraksa Village.',
            image: '/design/ig triraksa.PNG',
            link: '#',
            tags: ['Photoshop', 'Social Media']
        }
    ]
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
                    <img src={project.image} alt={project.title} className="project-image" style={{ objectPosition: project.category === 'Web Development' ? 'top center' : 'center' }} />
                )}
                <motion.div
                    className="project-overlay"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.3 }}
                >
                    <a href={project.link} target="_blank" rel="noreferrer" className="btn-icon">
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
                        <CategorySection title="Video Editing" layout="grid" count={projects.video.length}>
                            {projects.video.map(p => <ProjectCard key={p.id} project={p} isVideo />)}
                        </CategorySection>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <CategorySection title="Web Development" layout="grid" count={projects.web.length}>
                            {projects.web.map(p => <ProjectCard key={p.id} project={p} />)}
                        </CategorySection>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <CategorySection title="Graphic Design" layout="full" count={projects.design.length}>
                            <div style={{ width: '100%', overflow: 'hidden', padding: '1rem 0' }}>
                                <CircularGallery items={projects.design} />
                            </div>
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
