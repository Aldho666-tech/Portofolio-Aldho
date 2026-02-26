import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, PenTool, Video } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };

const services = [
    {
        icon: Laptop,
        title: 'Web Developer',
        description: 'Crafting interactive, high-performance web applications with a focus on seamless user experiences, modern frontend architectures, and responsive designs.',
        tags: ['React', 'JavaScript', 'CSS', 'Node.js']
    },
    {
        icon: PenTool,
        title: 'Graphic Designer',
        description: 'Translating complex branding ideas into elegant, minimalistic visual identities. Creating stunning assets that communicate effectively across digital mediums.',
        tags: ['Photoshop', 'Illustrator', 'Figma', 'Branding']
    },
    {
        icon: Video,
        title: 'Video Editor',
        description: 'Producing cinematic and engaging video content, utilizing advanced editing techniques, motion graphics, and crisp audio engineering to tell compelling stories.',
        tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve']
    },
];

export default function Services() {
    return (
        <section id="services" className="page-section">
            <div className="container">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.p variants={fadeIn} className="subtitle text-center" style={{ marginBottom: '1rem' }}>
                        What I Do
                    </motion.p>
                    <motion.h2 variants={fadeIn} className="section-title">My Expertise</motion.h2>

                    <div className="services-grid">
                        {services.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeIn}
                                    className="service-card glass-card"
                                    whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.2)' }}
                                >
                                    <div className="service-icon-wrap">
                                        <Icon size={36} />
                                    </div>
                                    <h3 className="service-title">{s.title}</h3>
                                    <p className="service-desc">{s.description}</p>
                                    <div className="service-tags">
                                        {s.tags.map(t => (
                                            <span key={t} className="service-tag">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
