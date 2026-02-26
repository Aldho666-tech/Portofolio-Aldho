import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Linkedin, Github, Send, MessageSquare, MapPin } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        alert("Thanks for reaching out! This is a demo form.");
    };

    return (
        <section id="contact" className="page-section contact-wrapper">
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                >
                    <div className="contact-grid">
                        {/* Left Side: Info */}
                        <motion.div className="contact-info-panel" variants={fadeInLeft}>
                            <p className="subtitle">Let's Talk</p>
                            <h2 className="contact-main-title">GET IN <span className="accent-text">TOUCH</span></h2>
                            <p className="contact-subtext">
                                Whether you're interested in a new project, a collaboration, or just want to say hi, feel free to drop a message.
                            </p>

                            <div className="contact-methods">
                                <div className="method-item">
                                    <div className="method-icon"><Mail size={20} /></div>
                                    <div className="method-details">
                                        <p className="method-label">Email Me</p>
                                        <a href="mailto:aldolega666@gmail.com" className="method-link">aldolega666@gmail.com</a>
                                    </div>
                                </div>

                                <div className="method-item">
                                    <div className="method-icon"><Phone size={20} /></div>
                                    <div className="method-details">
                                        <p className="method-label">WhatsApp</p>
                                        <a href="https://wa.me/6285714230010" target="_blank" rel="noreferrer" className="method-link">+62 857 1423 0010</a>
                                    </div>
                                </div>

                                <div className="method-item">
                                    <div className="method-icon"><MapPin size={20} /></div>
                                    <div className="method-details">
                                        <p className="method-label">Location</p>
                                        <span className="method-link">Tangerang, Indonesia</span>
                                    </div>
                                </div>
                            </div>

                            <div className="social-connect">
                                <p className="social-label">Follow Me</p>
                                <div className="social-icons">
                                    {[
                                        { icon: <Instagram size={20} />, link: "#", label: "Instagram" },
                                        { icon: <Linkedin size={20} />, link: "#", label: "LinkedIn" },
                                        { icon: <Github size={20} />, link: "#", label: "GitHub" }
                                    ].map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.link}
                                            className="contact-social-btn"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Form */}
                        <motion.div className="contact-form-panel glass-card" variants={fadeIn}>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-head">
                                    <MessageSquare size={24} className="accent-icon" />
                                    <h3>Send a Message</h3>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <span className="input-focus-line"></span>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <span className="input-focus-line"></span>
                                </div>

                                <div className="input-group">
                                    <textarea
                                        placeholder="How can I help you?"
                                        rows="5"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                    <span className="input-focus-line"></span>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="contact-submit-btn"
                                    whileHover={{ gap: '15px' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    SEND MESSAGE <Send size={18} />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
