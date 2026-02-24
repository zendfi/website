'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Wallet, Smartphone, Building2, Lock, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.1 },
  }),
};

function CheckoutMockup() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      {/* Purple glow behind */}
      <div className="absolute inset-8 bg-violet-400/10 blur-3xl rounded-full glow-pulse pointer-events-none" />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
        {/* Header bar */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ZendFi" className="h-5 w-auto object-contain" />
              <span className="text-xs font-semibold text-gray-800">Checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              14:58
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 tracking-tight">₦25,000</div>
          <div className="text-sm text-gray-400 mt-0.5 flex items-center gap-1.5">
            <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" className="w-4 h-4 rounded-full" />
            ≈ 16.12 USDC · DevConf Lagos Ticket
          </div>
        </div>

        {/* Payment methods */}
        <div className="px-5 py-4 space-y-2">
          {/* Selected method */}
          <div className="flex items-center gap-3 p-3 bg-violet-50 border border-violet-200 rounded-xl cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <Wallet size={16} className="text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-violet-900">Browser Wallet</div>
              <div className="text-xs text-violet-500">Phantom detected</div>
            </div>
            <div className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center">
              <svg viewBox="0 0 8 6" fill="none" className="w-2.5 h-2.5">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-gray-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <Smartphone size={16} className="text-violet-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700">QR Code</div>
              <div className="text-xs text-gray-400">Solana Pay standard</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-gray-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Building2 size={16} className="text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700">Bank Transfer</div>
              <div className="text-xs text-emerald-500 font-medium">Pay in Naira · get USDC</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 pb-5">
          <button className="w-full py-3 bg-violet-600 text-white text-sm font-semibold rounded-xl shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:bg-violet-700 transition-all">
            Pay with Phantom →
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-2.5">
            <Lock size={10} className="inline mr-0.5" /> Gas-free · Secured by ZendFi
          </p>
        </div>
      </div>

      {/* Floating USDC badge */}
      <div className="absolute -right-4 top-1/3 bg-white border border-emerald-100 rounded-2xl px-3.5 py-2.5 shadow-lg">
        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Received</div>
        <div className="text-sm font-bold text-emerald-600">+16.12 USDC</div>
      </div>

      {/* Floating wallet tag */}
      <div className="absolute -left-4 bottom-1/4 bg-white border border-violet-100 rounded-2xl px-3.5 py-2.5 shadow-lg">
        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Wallet</div>
        <div className="text-[11px] font-mono text-violet-600">7xKm…4fVz</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col bg-white">
      {/* Radial glow — centered */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-100/50 blur-[160px] rounded-full" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-violet-50/80 blur-[100px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 pt-32 pb-20 gap-16 lg:gap-8 w-full">
        {/* Left — text */}
        <div className="flex-1 flex flex-col items-start max-w-2xl">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-200 bg-violet-50/80 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-violet-700 tracking-wide">Mainnet Live · Built on Solana</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[clamp(44px,6vw,80px)] font-extrabold leading-[1.02] tracking-tight text-gray-900 mb-6"
          >
            Accept payments
            <br />
            <span className="text-violet-600">across borders.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg text-gray-500 leading-relaxed mb-10 max-w-[480px]"
          >
            One link. Nigerian customers pay in Naira — you receive USDC.
            {' '}Gasless for your customers. Your idle USDC earns DeFi yield.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://dashboard.zendfi.tech/setup"
              className="group flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-all shadow-[0_0_28px_rgba(124,58,237,0.35)] hover:shadow-[0_0_40px_rgba(124,58,237,0.55)] hover:-translate-y-0.5"
            >
              Create free account
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://docs.zendfi.tech"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-medium rounded-xl text-sm transition-all hover:bg-gray-50"
            >
              View docs
              <ExternalLink size={13} className="opacity-60" />
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-xs text-gray-400"
          >
            <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> No monthly fees</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> Free sandbox forever</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> $10 to go live</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> Non-custodial</span>
          </motion.div>
        </div>

        {/* Right — mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none"
        >
          <CheckoutMockup />
        </motion.div>
      </div>

      {/* Bottom fade */}

    </section>
  );
}
