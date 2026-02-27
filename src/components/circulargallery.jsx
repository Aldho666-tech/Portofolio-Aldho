import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CircularGallery({ items = [] }) {
    const scrollRef = useRef(null);

    // ── Mouse drag — desktop ──────────────────────────────
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const onMouseDown = (e) => {
        if (isMobile) return;
        setIsDragging(true);
        dragStartX.current = e.pageX;
        dragScrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
    };
    const onMouseUp = () => {
        if (isMobile) return;
        setIsDragging(false);
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };
    const onMouseLeave = () => {
        if (isMobile) return;
        if (isDragging) {
            setIsDragging(false);
            if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
        }
    };
    const onMouseMove = (e) => {
        if (!isDragging || isMobile) return;
        e.preventDefault();
        scrollRef.current.scrollLeft = dragScrollLeft.current - (e.pageX - dragStartX.current);
    };

    if (!items || items.length === 0) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666', border: '1px dashed #333', borderRadius: '20px' }}>
                Galeri kosong atau sedang dimuat...
            </div>
        );
    }

    return (
        <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            className="circular-gallery-container"
            style={{
                width: '100%',
                minHeight: isMobile ? 'auto' : '520px',
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '1rem 0 2rem' : '3rem 0',
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch', // Explicitly enable native iOS smooth scrolling
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                cursor: isMobile ? 'pan-x' : (isDragging ? 'grabbing' : 'grab'),
                scrollSnapType: isMobile ? 'x mandatory' : 'none',
                pointerEvents: 'auto',
                touchAction: 'pan-x' // Important for mobile browsers to allow horizontal scroll
            }}
        >
            <div
                className="circular-gallery-track"
                style={{
                    display: 'flex',
                    gap: isMobile ? '1.5rem' : '2.5rem',
                    flexShrink: 0,
                    padding: isMobile ? '0 5vw' : '0 10vw',
                }}
            >
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className="gallery-item-wrapper"
                        initial={{ opacity: 0, scale: 0.8, rotateY: i % 2 === 0 ? -15 : 15 }}
                        whileInView={isMobile ? { opacity: 1, scale: 1 } : {
                            opacity: 1,
                            scale: 1,
                            rotateY: i % 2 === 0 ? -8 : 8,
                            transition: { duration: 0.8, ease: 'easeOut' }
                        }}
                        whileHover={isMobile ? undefined : "hover"}
                        viewport={{ once: false, margin: '-50px' }}
                        style={{
                            flex: isMobile ? '0 0 260px' : '0 0 320px',
                            width: isMobile ? '260px' : '320px',
                            height: isMobile ? '360px' : '420px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: '#111',
                            perspective: '1000px',
                            position: 'relative',
                            userSelect: 'none',
                            flexShrink: 0,
                            scrollSnapAlign: isMobile ? 'center' : 'none'
                        }}
                    >
                        <motion.img
                            src={item.url || item}
                            alt={item.title || `Design ${i + 1}`}
                            draggable={false}
                            variants={isMobile ? undefined : { hover: { scale: 1.05, filter: 'grayscale(0)' } }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: isMobile ? 'grayscale(0)' : 'grayscale(0.5)',
                                transition: 'filter 0.5s ease',
                                pointerEvents: 'none',
                            }}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/320x420/222/fff?text=Design+' + (i + 1);
                            }}
                        />

                        <motion.div
                            className="gallery-item-overlay"
                            variants={isMobile ? undefined : {
                                initial: { opacity: 0, y: 20 },
                                hover: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: isMobile ? '1.5rem' : '2rem',
                                pointerEvents: 'none',
                                opacity: isMobile ? 1 : undefined,
                            }}
                        >
                            <h4 style={{ color: '#fff', fontSize: isMobile ? '1.1rem' : '1.2rem', marginBottom: '0.2rem' }}>
                                {item.title || 'Untitled Project'}
                            </h4>
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', opacity: 0.8 }}>
                                {item.year || '2024'}
                            </span>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <div style={{
                position: 'absolute',
                bottom: 5,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
            }}>
                {isMobile ? 'Swipe horizontally' : 'Drag to explore'}
            </div>
        </div>
    );
}
