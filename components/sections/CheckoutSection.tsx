'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wallet, Smartphone, Building2 } from 'lucide-react';
import InteractiveMatrix from '@/components/InteractiveMatrix';

const methods = [
    {
        id: 'wallet',
        icon: <Wallet size={20} className="text-accent" />,
        label: 'Browser Wallet',
        tag: 'Fastest',
        tagColor: '#a78bfa',
        headline: 'Pay with Phantom, Solflare, or any Solana wallet.',
        sub: 'We auto-detect installed wallets. One tap to confirm. 0 SOL gas — ZendFi sponsors every fee.',
        visual: <WalletVisual />,
    },
    {
        id: 'qr',
        icon: <Smartphone size={20} className="text-accent" />,
        label: 'QR Code',
        tag: 'Mobile-first',
        tagColor: '#a78bfa',
        headline: 'Scan with any Solana Pay wallet.',
        sub: 'Open standard. Works with Phantom mobile, Solflare, Backpack. Perfect for point-of-sale.',
        visual: <QRVisual />,
    },
    {
        id: 'bank',
        icon: <Building2 size={20} className="text-emerald-600" />,
        label: 'Bank Transfer',
        tag: 'NGN Onramp',
        tagColor: '#34d399',
        headline: 'Customer pays in Naira. You get USDC.',
        sub: 'Powered by PAJ Ramp. Works with every major Nigerian bank. Merchant receives USDC instantly on confirmation.',
        visual: <BankPassVisual />,
    },
];

function WalletVisual() {
    const wallets = [
        { name: 'Phantom', logo: '/svg/phantom.svg' },
        { name: 'Solflare', logo: '/svg/solfare.svg' },
        { name: 'Backpack', logo: '/svg/backpack.svg' },
        { name: 'Coinbase', logo: '/svg/coinbase.svg' },
        { name: 'Trust', logo: '/svg/trust.svg' },
    ];

    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-7 w-80">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                Detected wallets
            </div>
            <div className="space-y-2">
                {wallets.map((w, i) => (
                    <div key={w.name} className={`flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer group transition-all ${i === 0
                        ? 'bg-violet-50 border border-violet-200'
                        : 'hover:bg-gray-50 border border-transparent'
                        }`}>
                        <img
                            src={w.logo}
                            alt={w.name}
                            className="w-10 h-10 rounded-full flex-shrink-0 object-contain"
                        />
                        <span className={`text-base transition-colors ${i === 0 ? 'text-violet-700 font-semibold' : 'text-gray-500 group-hover:text-gray-700'
                            }`}>{w.name}</span>
                        {i === 0 ? (
                            <div className="ml-auto w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                                <svg viewBox="0 0 8 6" fill="none" className="w-2.5 h-2.5">
                                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        ) : (
                            <svg className="ml-auto w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function QRVisual() {
    // Stylized QR code pattern using CSS grid
    const pattern = [
        [1, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1],
    ];

    return (
        <div className="bg-white rounded-3xl p-7 shadow-sm w-72 ring-1 ring-gray-100">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center mb-5">
                Scan to pay
            </div>
            {/* QR art */}
            <div className="grid mb-5" style={{ gridTemplateColumns: `repeat(9, 1fr)`, gap: '3px' }}>
                {pattern.flat().map((cell, i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-[2px]"
                        style={{ background: cell ? '#1a1035' : 'transparent' }}
                    />
                ))}
            </div>
            <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100">
                    {/* <span className="text-violet-600 text-sm font-bold">◎</span> */}
                    <span className="text-xs font-semibold text-violet-600">Solana Pay</span>
                </div>
            </div>
        </div>
    );
}

function BankPassVisual() {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm w-80">
            <div className="flex items-center justify-between mb-8">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Virtual Account</div>
                <div className="text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full">Active</div>
            </div>
            <div className="mb-6">
                <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Recipient</div>
                <div className="font-mono font-bold text-2xl tracking-widest text-gray-900">0123 456 789</div>
            </div>
            <div className="flex flex-col gap-4 mb-7">
                <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Bank</div>
                    <div className="font-semibold text-base text-gray-900">GTBank</div>
                </div>
                <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Amount</div>
                    <div className="font-bold text-2xl text-gray-900">₦25,625</div>
                </div>
            </div>
            <div className="flex items-center gap-2 pt-5 border-t border-gray-100">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-400">Expires in 14:52</span>
            </div>
        </div>
    );
}



export default function CheckoutSection() {
    const [active, setActive] = useState(0);

    const prev = () => setActive((a) => (a - 1 + methods.length) % methods.length);
    const next = () => setActive((a) => (a + 1) % methods.length);

    const method = methods[active];

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000); // Auto-rotate every 5 seconds

        return () => clearInterval(interval);
    }, [active]); // Re-bind interval so manual clicks reset the timer

    return (
        <section className="pt-32 px-6 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto relative">
                {/* Section label */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-4">
                            <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">Checkout</span>
                        </div>
                        <h2 className="text-[clamp(32px,4.5vw,56px)] font-extrabold text-gray-900 leading-tight tracking-tight">
                            One link.
                            <br />
                            <span className="text-primary">Three ways to pay.</span>
                        </h2>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex gap-1.5">
                            {methods.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Slide content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
                    >
                        <div className="flex flex-col justify-between">
                            {/* Left: text */}
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center">{method.icon}</span>
                                    <span
                                        className="text-[10px] font-bold px-3 py-1 rounded-full  uppercase tracking-widest"
                                        style={{ color: method.tagColor, borderColor: `${method.tagColor}30`, }}
                                    >
                                        {method.tag}
                                    </span>
                                </div>

                                <h3 className="text-[clamp(24px,3vw,38px)] font-extrabold text-gray-900 leading-tight tracking-tight">
                                    {method.headline}
                                </h3>

                                <p className="text-base text-gray-500 leading-relaxed max-w-md">
                                    {method.sub}
                                </p>

                                {/* Method pills */}
                                <div className="flex gap-2 mt-2">
                                    {methods.map((m, i) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setActive(i)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${i === active
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-100'
                                                }`}
                                        >
                                            {/* <span className="text-base leading-none">{m.icon}</span> */}
                                            <span className="hidden sm:inline">{m.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: visual */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="relative">
                                    {method.visual}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
