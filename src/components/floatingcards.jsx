import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Each card has: src (image or video), type, rotate, x%, y%, width, delay
const CARDS = [
    { src: '/videos/reel-1.mp4', type: 'video', rotate: -18, x: 72, y: 5,  w: 140, delay: 0 },
    { src: '/videos/reel-2.mp4', type: 'video', rotate: 12,  x: 84, y: 38, w: 130, delay: 0.15 },
    { src: '/cmsschool-preview.png', type: 'image', rotate: -8, x: 65, y: 55, w: 230, delay: 0.25 },
    { src: '/videos/reel-3.mp4', type: 'video', rotate: 22,  x: 88, y: 62, w: 120, delay: 0.1 },
    { src: '/design/ig batara.PNG', type: 'image', rotate: -15, x: 58, y: 10, w: 160, delay: 0.3 },
    { src: '/raalfatin-preview.png', type: 'image', rotate: 6,  x: 78, y: 78, w: 210, delay: 0.2 },
    { src: '/design/ig kota cakra.PNG', type: 'image', rotate: -25, x: 92, y: 20, w: 140, delay: 0.35 },
];

// Floating animation params per card, so they all move independently
const floatParams = CARDS.map(() => ({
    yAmt: 12 + Math.random() * 14,
    dur:  3.5 + Math.random() * 2.5,
    dly:  Math.random() * 2,
}));

export default function FloatingCards() {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 0,
                perspective: '1200px',
            }}
        >
            {CARDS.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6, rotate: card.rotate - 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: card.rotate }}
                    transition={{ delay: 0.4 + card.delay, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        left: `${card.x}%`,
                        top: `${card.y}%`,
                        width: `${card.w}px`,
                        transformOrigin: 'center center',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}
                >
                    {/* Perpetual floating up/down motion */}
                    <motion.div
                        animate={{ y: [0, -floatParams[i].yAmt, 0] }}
                        transition={{
                            duration: floatParams[i].dur,
                            delay: floatParams[i].dly,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {card.type === 'video' ? (
                            <video
                                src={card.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: '100%', display: 'block', aspectRatio: '9/16', objectFit: 'cover' }}
                            />
                        ) : (
                            <img
                                src={card.src}
                                alt="portfolio card"
                                style={{
                                    width: '100%',
                                    display: 'block',
                                    aspectRatio: card.src.includes('preview') ? '16/9' : '1/1',
                                    objectFit: 'cover',
                                    objectPosition: 'top center',
                                }}
                            />
                        )}
                        {/* Subtle glass sheen overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
                            borderRadius: '16px',
                            pointerEvents: 'none',
                        }} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
