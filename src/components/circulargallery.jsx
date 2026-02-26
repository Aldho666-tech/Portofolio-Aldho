import React from 'react';
import { motion } from 'framer-motion';

export default function CircularGallery({ items = [] }) {
    if (!items || items.length === 0) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666', border: '1px dashed #333', borderRadius: '20px' }}>
                Galeri kosong atau sedang dimuat...
            </div>
        );
    }

    return (
        <div
            className="circular-gallery-container"
            style={{
                width: '100%',
                minHeight: '520px',
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                padding: '3rem 0',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
        >
            <div style={{
                display: 'flex',
                gap: '2.5rem',
                padding: '0 10vw',
            }}>
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className="gallery-item-wrapper"
                        initial={{ opacity: 0, scale: 0.8, rotateY: i % 2 === 0 ? -15 : 15 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotateY: i % 2 === 0 ? -8 : 8,
                            transition: { duration: 0.8, ease: "easeOut" }
                        }}
                        whileHover="hover"
                        viewport={{ once: false, margin: "-50px" }}
                        style={{
                            flex: '0 0 320px',
                            height: '420px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: '#111',
                            cursor: 'grab',
                            perspective: '1000px',
                            position: 'relative'
                        }}
                    >
                        <motion.img
                            src={item.url || item}
                            alt={item.title || `Design ${i + 1}`}
                            variants={{
                                hover: { scale: 1.1, filter: 'grayscale(0)' }
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'grayscale(0.5)',
                                transition: 'filter 0.5s ease'
                            }}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/320x420/222/fff?text=Design+' + (i + 1); }}
                        />

                        <motion.div
                            className="gallery-item-overlay"
                            variants={{
                                initial: { opacity: 0, y: 20 },
                                hover: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'end',
                                padding: '2rem',
                                pointerEvents: 'none'
                            }}
                        >
                            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.title || 'Untitled Project'}</h4>
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', opacity: 0.8 }}>{item.year || '2024'}</span>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <div style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 600
            }}>
                Drag horizontally to explore
            </div>
        </div>
    );
}
