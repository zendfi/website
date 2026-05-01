'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const cards = [
    {
        num: '01',
        headline: 'Customer checks out in Naira.',
        sub: 'No crypto wallet required. No prior knowledge of USDC. Just a familiar price in ₦.',
        accent: '#8b5cf6',
        bg: '#E6E1F9',
        visual: <NairaVisual />,
    },
    {
        num: '02',
        headline: 'Just their email. That\'s it.',
        sub: 'No app download, no wallet setup, no KYC. One email is all it takes to start the transfer.',
        accent: '#f97316',
        bg: '#F2D8C9',
        visual: <EmailVisual />,
    },
    {
        num: '03',
        headline: 'A virtual bank account appears.',
        sub: 'GTBank, Access, Zenith, UBA — any Nigerian bank. They transfer the exact NGN amount.',
        accent: '#10b981',
        bg: '#D1FAE5',
        visual: <BankVisual />,
    },
    {
        num: '04',
        headline: 'You receive USDC. Instantly.',
        sub: 'No forex delays. No card failures. No Stripe. Pure USDC lands on your Solana wallet.',
        accent: '#0ea5e9',
        bg: '#E1F5F9',
        visual: <SuccessVisual />,
    },
];

function NairaVisual() {
    return (
        <div className="bg-white rounded-3xl shadow-sm w-80 overflow-hidden ring-1 ring-gray-100 transition-all duration-500 hover:-translate-y-1">
            <div className="px-7 pt-7 pb-5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2.5 mb-6">
                    <img src="/zendfi_logo_gg.png" alt="ZendFi" className="h-6 w-auto object-contain transition-transform hover:scale-105 duration-500" />
                    <span className="text-[10px] font-bold text-gray-400 bg-white shadow-sm border border-gray-100 rounded-md px-2 py-0.5 uppercase tracking-wider">Checkout</span>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl font-extrabold text-gray-900 tracking-tight">₦25,000</motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-base text-gray-400 mt-1.5">≈ 16.12 USDC</motion.div>
            </div>
            <div className="px-7 py-5">
                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Pay with</div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 p-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm group hover:border-emerald-200 transition-colors cursor-pointer"
                >
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                        <Building2 size={20} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-emerald-800 transition-colors">Bank Transfer</div>
                        <div className="text-xs text-gray-500 mt-0.5 group-hover:text-emerald-600 transition-colors">Pay in Naira</div>
                    </div>
                    <div className="ml-auto">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                            <svg viewBox="0 0 8 6" fill="none" className="w-3 h-3"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </motion.div>
                <div className="mt-4 text-center text-xs text-gray-400">Total: ₦25,000 + ₦625 fee</div>
            </div>
        </div>
    );
}

function EmailVisual() {
    return (
        <div className="bg-white rounded-3xl shadow-sm w-80 overflow-hidden ring-1 ring-gray-100 transition-all duration-500 hover:-translate-y-1">
            <div className="px-7 pt-7 pb-5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2.5 mb-6">
                    <img src="/zendfi_logo_gg.png" alt="ZendFi" className="h-6 w-auto object-contain transition-transform hover:scale-105 duration-500" />
                    <span className="text-[10px] font-bold text-gray-400 bg-white shadow-sm border border-gray-100 rounded-md px-2 py-0.5 uppercase tracking-wider">Checkout</span>
                </div>
                <p className="text-base font-semibold text-gray-900 mb-1">Enter your email</p>
                <p className="text-sm text-gray-400">We&apos;ll send your receipt here</p>
            </div>
            <div className="px-7 py-5 space-y-3.5">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm"
                >
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span className="text-sm text-gray-900 font-medium">user@example.com</span>
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="ml-auto w-px h-5 bg-blue-500"
                    />
                </motion.div>
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full py-3 bg-gray-900 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                    Continue
                    <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </motion.svg>
                </motion.button>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span className="text-xs text-gray-400">No wallet or app required</span>
                </div>
            </div>
        </div>
    );
}

function BankVisual() {
    return (
        <div className="bg-white rounded-3xl shadow-lg w-80 p-7 ring-1 ring-gray-100 transition-all duration-500 relative overflow-hidden hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-500" />
            <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Transfer to</span>
                <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Awaiting
                </motion.span>
            </div>
            <div className="space-y-3">
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group/item hover:border-emerald-200 transition-colors cursor-pointer">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">Account Number <span className="opacity-0 lg:group-hover/item:opacity-100 text-emerald-500">Copy</span></div>
                    <div className="font-mono font-bold text-gray-900 text-xl tracking-wider">0123 456 789</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group/item hover:border-emerald-200 transition-colors cursor-pointer">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">Bank Name <span className="opacity-0 lg:group-hover/item:opacity-100 text-emerald-500">Copy</span></div>
                    <div className="font-semibold text-gray-900 text-base">GTBank</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="p-4 bg-gray-50 rounded-2xl border border-emerald-100 bg-emerald-50/30">
                    <div className="text-[11px] text-emerald-600 uppercase tracking-wider mb-1.5">Exact Amount</div>
                    <div className="font-extrabold text-gray-900 text-2xl">₦25,625</div>
                </motion.div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-4">Transfer the exact amount shown</p>
        </div>
    );
}

function SuccessVisual() {
    return (
        <div className="bg-white rounded-3xl shadow-lg w-80 p-8 ring-1 ring-gray-100 transition-all duration-500 overflow-hidden relative hover:-translate-y-1">
            <div className="flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-18 h-18 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6" style={{ width: 72, height: 72 }}
                >
                    <motion.svg
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-emerald-500" stroke="currentColor" strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </motion.svg>
                </motion.div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">Payment received</div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-extrabold text-gray-900 tracking-tight"
                >
                    +16.12
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg font-semibold text-gray-500 mt-1">USDC</motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-400 text-sm mt-1 bg-gray-50 px-3 py-1 rounded-full text-[11px] font-medium border border-gray-100">≈ ₦25,000</motion.div>
                <div className="mt-6 w-full h-px bg-gray-100" />
                <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-gray-400 bg-gray-50/80 px-2 py-1 rounded">
                    Tx: 5xAwPq…k9Vm3r
                    <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function OnrampSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    useGSAP(() => {
        gsap.fromTo(".onramp-header > *",
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                duration: 1.2,
                stagger: 0.15,
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-white relative">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24 onramp-header">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6">
                        <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">The Bridge</span>
                    </div>
                    <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold text-gray-900 leading-[1.1] tracking-tighter">
                        Naira to USDC.
                        <br />
                        <span className="text-accent">
                            The NG lane.
                        </span>
                    </h2>
                    <p className="mt-5 text-sm text-gray-500 max-w-2xl mx-auto">
                        This section shows the NG local-transfer route. Outside NG, checkout follows Bridge rails based on country.
                    </p>
                </div>

                {/* Stacked Cards Container */}
                <div className="relative pb-32 flex flex-col gap-8 md:gap-16">
                    {cards.map((card, idx) => {
                        const targetScale = 1 - ((cards.length - idx) * 0.04);
                        const scale = useTransform(
                            scrollYProgress,
                            [idx / cards.length, 1],
                            [1, targetScale]
                        );

                        return (
                            <motion.div
                                key={idx}
                                className="sticky w-full min-h-[80vh] flex items-center justify-center rounded-[32px] p-8 md:p-16 lg:p-24 overflow-hidden border border-white/40"
                                style={{
                                    backgroundColor: card.bg,
                                    top: `calc(15vh + ${idx * 40}px)`,
                                    zIndex: idx * 10,
                                    scale
                                }}
                            >
                                {/* Inner Layout (Two columns) */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full items-center">
                                    {/* Text Column (swaps order on second card) */}
                                    <div className={`flex flex-col items-center lg:items-start text-center lg:text-left ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div
                                            className="text-[60px] lg:text-[80px] font-black leading-none mb-4 opacity-20 select-none"
                                            style={{ color: card.accent }}
                                        >
                                            {card.num}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                                            {card.headline}
                                        </h3>
                                        <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                            {card.sub}
                                        </p>
                                    </div>

                                    {/* Visual Column */}
                                    <div className={`flex justify-center w-full ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="relative group">
                                            {card.visual}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
