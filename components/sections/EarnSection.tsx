'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function AnimatedBalance({ target, prefix }: { target: number; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const raw = useMotionValue(0);
    const spring = useSpring(raw, { mass: 0.4, stiffness: 40, damping: 15 });

    useEffect(() => {
        if (inView) raw.set(target);
    }, [inView, target, raw]);

    const display = useTransform(spring, (v) =>
        `${prefix ?? ''}${v.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`
    );

    return (
        <span ref={ref}>
            <motion.span>{display}</motion.span>
        </span>
    );
}

// Clean, performant, truly seamless marquee row (Framer Motion scroll-driven)
function MarqueeRow({
    text,
    direction = 1,
    speed = 1.0,
    className = '',
}: {
    text: string;
    direction?: number;
    speed?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Dramatic, tuned travel distance with per-row speed variation
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        direction > 0 ? [-460 * speed, 460 * speed] : [460 * speed, -460 * speed]
    );

    return (
        <div ref={ref} className="overflow-hidden py-[2px]">
            <motion.div
                className={`inline-flex text-[11.9vw] font-black leading-none whitespace-nowrap select-none pointer-events-none tracking-[-0.04em] ${className}`}
                style={{ x, willChange: 'transform' }}
            >
                {`${text}  `.repeat(9)}
            </motion.div>
        </div>
    );
}

export default function EarnSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const inView = useInView(contentRef, { once: true, margin: '-80px' });
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (inView) {
            const t = setTimeout(() => setShowDetails(true), 1100);
            return () => clearTimeout(t);
        }
    }, [inView]);

    // GSAP only for gentle entrance/exit opacity (keeps marquee buttery)
    useGSAP(() => {
        const rows = containerRef.current?.querySelectorAll('.marquee-row') || [];

        // Fade in
        gsap.fromTo(
            rows,
            { opacity: 0.9 },
            {
                opacity: 0.97,
                stagger: 0.03,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    end: 'top 32%',
                    scrub: 1,
                },
            }
        );

        // Fade out
        gsap.to(rows, {
            opacity: 0.9,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'bottom 68%',
                end: 'bottom 22%',
                scrub: 1,
            },
        });
    }, { scope: containerRef });

    const ROW_TEXTS = [
        'EARN DEFI YIELD',
        'APY OPTIMIZED · AUTO-COMPOUND',
        '7.2% APY · KAMINO VAULT',
        'YOUR USDC NEVER SLEEPS',
        'EARN DEFI YIELD · SOLANA',
    ];

    const rowVariants = [
        'text-transparent [paint-order:stroke_fill] [-webkit-text-stroke:2.1px_#e5e7eb]',
        'text-accent/50',
        'text-transparent [paint-order:stroke_fill] [-webkit-text-stroke:1.5px_#e5e7ef]',
        'text-transparent [paint-order:stroke_fill] [-webkit-text-stroke:1.9px_#f1f5f9]',
        'text-accent/5',
    ];

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-white py-10 sm:py-24 pb-32 lg:py-40"
        >
            <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 sm:px-0 flex flex-col lg:flex-row items-center justify-between mb-5 gap-16 lg:gap-8">

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-4"
                    >
                        <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">Earn Protocol</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-[clamp(40px,7vw,88px)] font-extrabold text-gray-900 leading-[0.95] tracking-tight mb-6"
                    >
                        Your USDC
                        <br />
                        <span className="text-accent">doesn&apos;t sleep.</span>
                    </motion.h2>
                    {/* Label */}

                    {/* Sub */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg font-medium text-gray-500 max-w-[500px] leading-relaxed mb-8 lg:mb-16"
                    >
                        Put your idle balances to work. Venezuelan customers pay in local,
                        you earn automated DeFi yield on USDC.
                    </motion.p>
                </div>

                {/* Balance card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 24 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full max-w-md lg:max-w-lg"
                >
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm shadow-gray-200/50">
                        {/* APY pill */}
                        <div className="flex items-center justify-between mb-10">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Your Earn balance</span>
                            <span className="text-[12px] font-bold text-emerald-500 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full">
                                ~7.2% APY
                            </span>
                        </div>

                        {/* Big number */}
                        <div className="text-[clamp(48px,10vw,64px)] font-extrabold text-gray-900 tracking-tighter leading-none mb-3">
                            <AnimatedBalance target={12847.32} prefix="$" />
                        </div>
                        <div className="text-sm text-gray-400 mb-10 font-medium">Auto-compounding Kamino vault</div>

                        {/* PnL */}
                        {showDetails && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center justify-between pt-8 border-t border-gray-50"
                            >
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total earned</div>
                                    <div className="text-xl font-extrabold text-emerald-500 tracking-tight">
                                        +<AnimatedBalance target={843.21} prefix="$" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deposited</div>
                                    <div className="text-xl font-bold text-gray-900 tracking-tight">$12,004.11</div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Actions */}
                    {/* {showDetails && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex gap-4 mt-6"
                        >
                            <div className="flex-1 py-4 text-center text-sm font-bold bg-emerald-500 hover:brightness-110 text-white rounded-2xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-[0.98]">
                                Deposit
                            </div>
                            <div className="flex-1 py-4 text-center text-sm font-bold bg-white border border-gray-100 hover:border-gray-200 text-gray-900 rounded-2xl transition-all cursor-pointer active:scale-[0.98]">
                                Withdraw
                            </div>
                        </motion.div>
                    )} */}
                </motion.div>
            </div>
            <div
                className="relative inset-0 flex flex-col justify-center gap-[3px] overflow-hidden pointer-events-none"
                aria-hidden
                style={{ zIndex: 0 }}
            >
                <MarqueeRow
                    text={ROW_TEXTS[0]}
                    direction={1}
                    speed={0.88}
                    className={`${rowVariants[0]} marquee-row`}
                />
                <MarqueeRow
                    text={ROW_TEXTS[1]}
                    direction={-1}
                    speed={1.28}
                    className={`${rowVariants[1]} marquee-row`}
                />
                <MarqueeRow
                    text={ROW_TEXTS[2]}
                    direction={1}
                    speed={0.79}
                    className={`${rowVariants[2]} marquee-row`}
                />
                {/* <MarqueeRow
                    text={ROW_TEXTS[3]}
                    direction={-1}
                    speed={1.12}
                    className={`${rowVariants[3]} marquee-row`}
                /> */}
                {/* <MarqueeRow
                    text={ROW_TEXTS[4]}
                    direction={1}
                    speed={0.94}
                    className={`${rowVariants[4]} marquee-row`}
                /> */}
            </div>

            {/* ── Frosted vignette (stronger than before) ── */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background:
                        'radial-gradient(ellipse 72% 68% at 50% 49%, rgba(255, 255, 255, 0) 46%, rgba(255, 255, 255, 0.34) 77%, #fff 100%)',
                }}
            />

            <p className="relative z-20 mt-12 px-6 text-[11px] text-gray-400 max-w-sm leading-relaxed font-medium w-full mx-auto text-center">
                Powered by Kamino Finance. APY is variable.
                Principal is protected by Solana&apos;s battle-tested smart contracts.
            </p>
        </section>
    );
}