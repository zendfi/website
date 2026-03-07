'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import { Smartphone, Monitor, QrCode, Bell, Mail, Laptop } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Copy for each phase
// ─────────────────────────────────────────────────────────────────────────────

const phases = [
    {
        label: 'In-Person',
        headline: 'Accept payments\nin person.',
        sub: 'Turn any device into a point-of-sale terminal. Your customer walks in, you type the amount — ZendFi handles the rest.',
    },
    {
        label: 'Transfer',
        headline: 'Customer transfers\nNaira.',
        sub: 'A one-time virtual bank account appears instantly. Any Nigerian bank. Customer transfers the exact amount shown.',
    },
    {
        label: 'Settled',
        headline: 'You receive\nUSDC instantly.',
        sub: 'No card networks. No FX delays. No chargebacks. Pure USDC settles to your Solana wallet the moment transfer confirms.',
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Numpad keys for idle → input animation
// ─────────────────────────────────────────────────────────────────────────────

const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'];

// ─────────────────────────────────────────────────────────────────────────────
// Amount typewriter sequence
// ─────────────────────────────────────────────────────────────────────────────

const typedAmounts = ['', '2', '25', '25,', '25,0', '25,00', '25,000'];

// ─────────────────────────────────────────────────────────────────────────────
// Terminal Mockup — the heart of the section
// ─────────────────────────────────────────────────────────────────────────────

function TerminalMockup({ phase }: { phase: number }) {
    return (
        <div className="relative w-full max-w-[380px] mx-auto">
            {/* Main card */}
            <div className="bg-white rounded-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                {/* Header bar */}
                <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400">
                                <path d="M2 7h20M2 12h20M2 17h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            Terminal
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <span className="text-[10px] font-semibold text-gray-300">Live</span>
                    </div>
                </div>

                {/* ── Phase 0: Numpad + Amount Input ── */}
                <motion.div
                    className="overflow-hidden"
                    animate={{
                        height: phase === 0 ? 'auto' : 0,
                        opacity: phase === 0 ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <NumpadPhase />
                </motion.div>

                {/* ── Phase 1: Bank Details ── */}
                <motion.div
                    className="overflow-hidden"
                    animate={{
                        height: phase === 1 ? 'auto' : 0,
                        opacity: phase === 1 ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <BankDetailsPhase />
                </motion.div>

                {/* ── Phase 2: Success ── */}
                <motion.div
                    className="overflow-hidden"
                    animate={{
                        height: phase === 2 ? 'auto' : 0,
                        opacity: phase === 2 ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <SuccessPhase />
                </motion.div>
            </div>

            {/* ── Floating elements ── */}

            {/* QR badge — appears during bank details phase */}
            <motion.div
                className="absolute -right-5 top-[45%] bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 hidden lg:block"
                animate={{
                    opacity: phase === 1 ? 1 : 0,
                    x: phase === 1 ? 0 : 20,
                    scale: phase === 1 ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, delay: phase === 1 ? 0.3 : 0 }}
            >
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">QR Scan</div>
                <div className="grid grid-cols-5 gap-[2px]" style={{ width: 40, height: 40 }}>
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-[1px]"
                            style={{
                                background: [0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 20, 21, 22, 23, 24].includes(i)
                                    ? '#1e293b'
                                    : '#f1f5f9',
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* USDC settled badge — appears during success phase */}
            <motion.div
                className="absolute -left-5 top-[40%] bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100 hidden lg:block"
                animate={{
                    opacity: phase === 2 ? 1 : 0,
                    x: phase === 2 ? 0 : -20,
                    scale: phase === 2 ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, delay: phase === 2 ? 0.4 : 0 }}
            >
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Settled</div>
                <div className="flex items-center gap-1.5">
                    <img
                        src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                        alt="USDC"
                        className="w-4 h-4 rounded-full"
                    />
                    <span className="text-sm font-bold text-emerald-500">+16.12 USDC</span>
                </div>
            </motion.div>

            {/* Kiosk badge — appears during bank details phase */}
            <motion.div
                className="absolute -left-4 bottom-12 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 hidden lg:block"
                animate={{
                    opacity: phase === 1 ? 1 : 0,
                    x: phase === 1 ? 0 : -16,
                    scale: phase === 1 ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, delay: phase === 1 ? 0.5 : 0 }}
            >
                <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gray-400">
                        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px] font-bold text-gray-500">Kiosk Mode</span>
                </div>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 0 — Numpad
// ─────────────────────────────────────────────────────────────────────────────

function NumpadPhase() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });
    const [amountIndex, setAmountIndex] = useState(0);
    const [showKeys, setShowKeys] = useState(false);

    useEffect(() => {
        if (!inView) {
            setAmountIndex(0);
            setShowKeys(false);
            return;
        }

        // Stagger in numpad keys
        const keyTimer = setTimeout(() => setShowKeys(true), 200);

        // Typewriter amount
        const typeTimer = setInterval(() => {
            setAmountIndex((prev) => {
                if (prev >= typedAmounts.length - 1) {
                    return prev;
                }
                return prev + 1;
            });
        }, 250);

        const startType = setTimeout(() => {
            // already started via interval
        }, 800);

        return () => {
            clearTimeout(keyTimer);
            clearTimeout(startType);
            clearInterval(typeTimer);
        };
    }, [inView]);

    const displayAmount = typedAmounts[amountIndex] || '';

    return (
        <div ref={ref} className="px-6 pb-6">
            {/* Amount display */}
            <div className="text-center py-6">
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3">
                    Charge amount
                </div>
                <div className="text-4xl font-bold text-gray-900 tracking-tight h-12 flex items-center justify-center">
                    {displayAmount ? (
                        <>
                            <span className="text-gray-300">₦</span>
                            {displayAmount}
                            <motion.span
                                className="inline-block w-[2px] h-8 bg-gray-900 ml-0.5"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                            />
                        </>
                    ) : (
                        <span className="text-gray-200">₦0</span>
                    )}
                </div>
            </div>

            {/* Numpad grid */}
            <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
                {numpadKeys.map((key, i) => (
                    <motion.div
                        key={key}
                        className={`h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-colors
                            ${key === 'C' || key === '←' ? 'bg-gray-50 text-gray-400' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={showKeys ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.3,
                            delay: i * 0.035,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        {key}
                    </motion.div>
                ))}
            </div>

            {/* Charge button */}
            <motion.div
                className="mt-4 max-w-[260px] mx-auto"
                initial={{ opacity: 0, y: 8 }}
                animate={showKeys ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <div className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl text-center">
                    Charge ₦25,000
                </div>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1 — Bank Details (with typewriter account number)
// ─────────────────────────────────────────────────────────────────────────────

const accountDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function BankDetailsPhase() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });
    const [visibleDigits, setVisibleDigits] = useState(0);

    useEffect(() => {
        if (!inView) {
            setVisibleDigits(0);
            return;
        }

        let count = 0;
        const timer = setInterval(() => {
            count++;
            setVisibleDigits(count);
            if (count >= accountDigits.length) clearInterval(timer);
        }, 80);

        return () => clearInterval(timer);
    }, [inView]);

    return (
        <div ref={ref} className="px-6 pb-6">
            {/* Amount */}
            <div className="text-center py-4">
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                    Transfer exactly
                </div>
                <div className="text-3xl font-bold text-gray-900 tracking-tight">
                    <span className="text-gray-300">₦</span>25,000
                </div>
            </div>

            {/* Bank card */}
            <div className="bg-gray-50/80 rounded-2xl border border-gray-100 p-5 mt-2">
                {/* Account number with typewriter */}
                <div className="text-center mb-5">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">
                        Account Number
                    </div>
                    <div className="flex items-center justify-center gap-[3px] h-9">
                        {accountDigits.map((digit, i) => (
                            <motion.span
                                key={i}
                                className="text-2xl font-mono font-bold text-gray-900"
                                initial={{ opacity: 0, y: 6 }}
                                animate={
                                    i < visibleDigits
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 6 }
                                }
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                            >
                                {digit}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Bank info */}
                <div className="space-y-2.5 pt-4 border-t border-gray-200/50">
                    <motion.div
                        className="flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={visibleDigits >= 8 ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Bank</span>
                        <span className="text-sm text-gray-900 font-semibold">GTBank</span>
                    </motion.div>
                    <motion.div
                        className="flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={visibleDigits >= 10 ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Name</span>
                        <span className="text-sm text-gray-900 font-semibold">ZendFi / Acme Ltd</span>
                    </motion.div>
                </div>
            </div>

            {/* Listening pulse */}
            <motion.div
                className="flex items-center justify-center gap-2 mt-5"
                initial={{ opacity: 0 }}
                animate={visibleDigits >= 10 ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <motion.div
                    className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-gray-400">Listening for transfer · 0:12</span>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2 — Success (SVG checkmark draw + amount)
// ─────────────────────────────────────────────────────────────────────────────

function SuccessPhase() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <div ref={ref} className="px-6 py-10">
            <div className="flex flex-col items-center text-center">
                {/* Animated checkmark circle */}
                <motion.div
                    className="w-20 h-20 rounded-full border-2 border-emerald-400 flex items-center justify-center mb-7"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                        <motion.path
                            d="M5 13l4 4L19 7"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={inView ? { pathLength: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    </svg>
                </motion.div>

                {/* Text */}
                <motion.div
                    className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    Payment received
                </motion.div>

                <motion.div
                    className="text-4xl font-bold text-gray-900 tracking-tight mb-1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    ₦25,000
                </motion.div>

                <motion.div
                    className="text-sm text-gray-400 mb-6"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.3 }}
                >
                    Confirmed in 0:47
                </motion.div>

                {/* Tx hash */}
                <motion.div
                    className="flex items-center gap-1.5 text-xs font-mono text-gray-300 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.3 }}
                >
                    Tx: 5xAwPq…k9Vm3r
                    <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature chips
// ─────────────────────────────────────────────────────────────────────────────

const features = [
    { label: 'No hardware needed', icon: Smartphone },
    { label: 'Works on any device', icon: Laptop },
    { label: 'Kiosk mode for second screen', icon: Monitor },
    { label: 'QR code for customer phones', icon: QrCode },
    { label: 'Ka-ching sound on payment', icon: Bell },
    { label: 'Email receipts built-in', icon: Mail },
];

// ─────────────────────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────────────────────

export default function TerminalSection() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

    // Track scroll position through the sticky container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Map scroll progress to phase (0, 1, 2)
    const [phase, setPhase] = useState(0);
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v < 0.33) setPhase(0);
        else if (v < 0.66) setPhase(1);
        else setPhase(2);
    });

    // Opacity for text crossfade — each phase gets its own opacity
    const textOpacity0 = useTransform(scrollYProgress, [0, 0.25, 0.3, 0.33], [1, 1, 0.3, 0]);
    const textOpacity1 = useTransform(scrollYProgress, [0.3, 0.35, 0.58, 0.63], [0, 1, 1, 0]);
    const textOpacity2 = useTransform(scrollYProgress, [0.6, 0.67, 1, 1], [0, 1, 1, 1]);
    const textY0 = useTransform(scrollYProgress, [0, 0.25, 0.33], [0, 0, -20]);
    const textY1 = useTransform(scrollYProgress, [0.3, 0.35, 0.63], [20, 0, -20]);
    const textY2 = useTransform(scrollYProgress, [0.6, 0.67, 1], [20, 0, 0]);

    return (
        <section ref={containerRef} className="relative bg-white" style={{ height: '300vh' }}>
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* ── Left: Text narrative ── */}
                        <div className="relative min-h-[340px] flex flex-col justify-center">
                            {/* Section label — stays in document flow at the top */}
                            <motion.div
                                ref={titleRef}
                                initial={{ opacity: 0, y: 16 }}
                                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 w-fit absolute top-0 left-0"
                            >
                                <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">
                                    Terminal
                                </span>
                            </motion.div>

                            {/* Crossfading text layers */}
                            {phases.map((p, i) => {
                                const opacity = [textOpacity0, textOpacity1, textOpacity2][i];
                                const y = [textY0, textY1, textY2][i];
                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute left-0 right-0 top-[48px]"
                                        style={{ opacity, y }}
                                    >
                                        <h2 className="text-[clamp(32px,4.5vw,56px)] font-extrabold text-gray-900 leading-tight tracking-tight mb-5 whitespace-pre-line">
                                            {p.headline.split('\n').map((line, li) => (
                                                <span key={li}>
                                                    {li === 1 ? <span className="text-primary">{line}</span> : line}
                                                    {li === 0 && <br />}
                                                </span>
                                            ))}
                                        </h2>
                                        <p className="text-base text-gray-500 leading-relaxed max-w-md">
                                            {p.sub}
                                        </p>
                                    </motion.div>
                                );
                            })}

                            {/* Phase indicator dots */}
                            <div className="absolute bottom-0 left-0 flex items-center gap-3">
                                {phases.map((p, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                phase === i ? 'bg-primary w-6' : 'bg-gray-200'
                                            }`}
                                        />
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                                phase === i ? 'text-gray-600' : 'text-gray-300'
                                            }`}
                                        >
                                            {p.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Right: Terminal Mockup ── */}
                        <div className="flex justify-center lg:justify-end">
                            <TerminalMockup phase={phase} />
                        </div>
                    </div>

                    {/* Feature chips — visible at phase 2 */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mt-12 lg:mt-16"
                        animate={{
                            opacity: phase === 2 ? 1 : 0,
                            y: phase === 2 ? 0 : 12,
                        }}
                        transition={{ duration: 0.4, delay: phase === 2 ? 0.3 : 0 }}
                    >
                        {features.map((f, i) => (
                            <motion.div
                                key={f.label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-xs font-medium text-gray-500"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={phase === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ delay: phase === 2 ? 0.4 + i * 0.06 : 0, duration: 0.3 }}
                            >
                                <f.icon size={13} className="text-gray-400" />
                                {f.label}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
