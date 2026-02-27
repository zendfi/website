'use client';

import DottedMap from 'dotted-map';
import { useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function WorldMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth 3D rotation
    const springConfig = { damping: 20, stiffness: 100 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate mouse position relative to center (-0.5 to 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        // Return to center when mouse leaves
        mouseX.set(0);
        mouseY.set(0);
    };

    const svgMap = useMemo(() => {
        // Create a DottedMap instance with diagonal grid and nice resolution
        const map = new DottedMap({ height: 50, grid: 'diagonal' });

        // Add some brighter "active region" pins to make it feel alive

        // North America (New York)
        map.addPin({
            lat: 40.7128,
            lng: -74.0060,
            svgOptions: { color: '#ffffff', radius: 0.5 }
        });

        // Europe (London)
        map.addPin({
            lat: 51.5074,
            lng: -0.1278,
            svgOptions: { color: '#ffffff', radius: 0.5 }
        });

        // Africa (Lagos)
        map.addPin({
            lat: 6.5244,
            lng: 3.3792,
            svgOptions: { color: '#ffffff', radius: 0.5 }
        });

        // Asia (Singapore)
        map.addPin({
            lat: 1.3521,
            lng: 103.8198,
            svgOptions: { color: '#ffffff', radius: 0.5 }
        });

        // Generate the SVG string
        return map.getSVG({
            radius: 0.25,
            color: '#a78bfa', // violet-400 (obvious purple)
            shape: 'circle',
            backgroundColor: 'transparent',
        });
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center relative perspective-[1000px] cursor-crosshair"
            // onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-full h-full flex items-center justify-center"
            >
                <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                    alt="Global Dotted World Map"
                    className="w-full max-w-[650px] h-auto object-contain select-none pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
}
