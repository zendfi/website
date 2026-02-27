'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveMatrix() {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!container.current) return;
        const dots = container.current.querySelectorAll('.matrix-dot');

        // Scroll trigger wave effect
        const mm = gsap.matchMedia();

        mm.add("(min-width: 640px)", () => {
            gsap.fromTo(dots,
                { scale: 0.2, opacity: 0.2 },
                {
                    scale: 0.7,
                    opacity: 0.6,
                    stagger: {
                        grid: [4, 15],
                        from: "center",
                        amount: 1.5,
                    },
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 90%",
                        end: "bottom center",
                        scrub: true,
                    }
                }
            );
        });

        // Interactive mouse move
        const handleMouseMove = (e: MouseEvent) => {
            if (!container.current) return;
            const rect = container.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            dots.forEach(dot => {
                const dotEl = dot as HTMLElement;
                const dotRect = dotEl.getBoundingClientRect();
                const dotX = dotRect.left - rect.left + dotRect.width / 1;
                const dotY = dotRect.top - rect.top + dotRect.height / 1;

                const dist = Math.sqrt(Math.pow(x - dotX, 2) + Math.pow(y - dotY, 2));

                if (dist < 80) {
                    gsap.to(dotEl, {
                        scale: 1.05,
                        opacity: 1,
                        backgroundColor: '#8b5cf6', // violet-500
                        duration: 0.3,
                        ease: "back.out(2)"
                    });
                } else {
                    gsap.to(dotEl, {
                        scale: 1,
                        opacity: 0.4,
                        backgroundColor: '#c4b5fd', // violet-300
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        };

        const handleMouseLeave = () => {
            gsap.to(dots, {
                scale: 0.8,
                opacity: 0.4,
                backgroundColor: '#c4b5fd',
                duration: 1,
                ease: "power2.out"
            });
        };

        const currentContainer = container.current;
        currentContainer.addEventListener('mousemove', handleMouseMove);
        currentContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            mm.revert();
            if (currentContainer) {
                currentContainer.removeEventListener('mousemove', handleMouseMove);
                currentContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={container} className="relative h-full w-full flex flex-col justify-center gap-4 cursor-crosshair">
            {/* Absolute invisible overlay to capture overall mouse movement evenly */}
            <div className="absolute inset-0 z-10" />

            {Array.from({ length: 10 }).map((_, row) => (
                <div key={row} className="flex justify-between w-full">
                    {Array.from({ length: 25 }).map((_, col) => (
                        <div key={col} className="matrix-dot w-1.5 h-1.5 rounded-full bg-violet-300 opacity-40 transition-shadow" />
                    ))}
                </div>
            ))}
        </div>
    );
}
