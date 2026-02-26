import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Linkedin, Github } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };

export default function Contact() {
    return (
        <section id="contact" className="page-section">
            <div className="container">
                <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
                    <motion.p variants={fadeIn} className="subtitle" style={{ marginBottom: '1rem' }}>Say Hello</motion.p>
                    <motion.h2 variants={fadeIn} className="section-title">Get In Touch</motion.h2>
                    <motion.p variants={fadeIn} style={{ color: 'var(--secondary-text)', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.8 }}>
                        Have a project in mind? Let's collaborate. Whether it's crafting a website, designing a brand identity, or editing a video — I'm ready to bring your vision to life.
                    </motion.p>

                    <motion.div variants={fadeIn} className="contact-card glass-card">
                        <Phone size={28} color="var(--accent-color)" />
                        <div>
                            <p className="contact-label">WhatsApp / Phone</p>
                            <a
                                href="https://wa.me/6285714230010"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-number"
                            >
                                +62 857 1423 0010
                            </a>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="social-row">
                        <a href="#" className="social-btn" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="social-btn" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="social-btn" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
