import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobepremierepro,
    SiAdobeaftereffects,
    SiFigma,
    SiReact,
    SiVite,
    SiTailwindcss,
    SiTypescript,
    SiBlender,
    SiDavinciresolve
} from 'react-icons/si';
import './logoloop.css';

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Menyesuaikan rentang wrap agar loop mulus
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax">
            <motion.div className="scroller" style={{ x }}>
                <div className="scroller-inner">
                    {children}
                    {children}
                    {children}
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

const tools = [
    { icon: <SiAdobephotoshop />, name: "Photoshop" },
    { icon: <SiAdobeillustrator />, name: "Illustrator" },
    { icon: <SiAdobepremierepro />, name: "Premiere" },
    { icon: <SiAdobeaftereffects />, name: "After Effects" },
    { icon: <SiDavinciresolve />, name: "DaVinci" },
    { icon: <SiFigma />, name: "Figma" },
    { icon: <SiBlender />, name: "Blender" },
    { icon: <SiReact />, name: "React" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiTypescript />, name: "TypeScript" },
];

export default function LogoLoop() {
    return (
        <section className="logo-loop-section">
            <ParallaxText baseVelocity={-1}>
                {tools.map((tool, i) => (
                    <div key={i} className="loop-item">
                        <span className="tool-icon">{tool.icon}</span>
                        <span className="tool-name">{tool.name}</span>
                    </div>
                ))}
            </ParallaxText>
            <ParallaxText baseVelocity={1}>
                {[...tools].reverse().map((tool, i) => (
                    <div key={i} className="loop-item">
                        <span className="tool-icon">{tool.icon}</span>
                        <span className="tool-name">{tool.name}</span>
                    </div>
                ))}
            </ParallaxText>
        </section>
    );
}
