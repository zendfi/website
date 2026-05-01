'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Wallet, Smartphone, Building2, Lock, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.1 },
  }),
};

function CheckoutMockup() {
  return (
    <div className="relative w-full max-w-[400px]">
      {/* Card */}
      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100">
        {/* Header bar */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="/zendfi_logo_gg.png" alt="ZendFi" className="h-5 w-auto object-contain filter [filter:invert(39%)_sepia(87%)_saturate(5833%)_hue-rotate(253deg)_brightness(97%)_contrast(92%)]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              14:58
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 tracking-tight">₦25,000</div>
          <div className="text-[13px] text-gray-400 mt-0.5 flex items-center gap-1.5 font-medium">
            <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" className="w-3.5 h-3.5 rounded-full" />
            ≈ 16.12 USDC · DevCon Lagos Ticket
          </div>
        </div>

        {/* Payment methods */}
        <div className="px-5 py-4 space-y-2">
          {/* Selected method */}
          <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl cursor-default">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900">Browser Wallet</div>
              <div className="text-xs text-primary font-medium">Phantom detected</div>
            </div>
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 8 6" fill="none" className="w-2.5 h-2.5">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <Smartphone size={16} className="text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700">QR Code</div>
              <div className="text-xs text-gray-400">Solana Pay standard</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Building2 size={16} className="text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700">Bank Transfer</div>
              <div className="text-xs text-emerald-500 font-medium">Pay in Naira · get USDC</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 pb-5">
          <button className="w-full py-3 bg-primary text-white text-sm font-semibold rounded-xl">
            Pay with Phantom &rarr;
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-3 font-medium flex items-center justify-center gap-1">
            <Lock size={10} /> Gasless · Secured by ZendFi
          </p>
        </div>
      </div>

    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden w-full flex flex-col bg-white">
      <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 sm:px-0 pt-12 pb-20 gap-16 lg:gap-12 w-full">
        {/* Left — text */}
        <div className="flex-1 flex flex-col items-start max-w-5xl text-left">
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[clamp(40px,6vw,88px)] font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-6"
          >
            Get paid globally
            <br />
            <span className="text-primary">from one smart link.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg font-medium text-gray-500 leading-relaxed mb-10 max-w-[480px]"
          >
            ZendFi is a simple way to get paid worldwide. One link can detect where the payer is, then show the right local payment rail for that country.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-sm font-medium text-gray-400 leading-relaxed mb-10 max-w-[520px]"
          >
            Use zdfi.me/username for a main pay link, or zdfi.me/username/request_id when the amount is already set.
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-sm font-medium text-gray-400 leading-relaxed mb-10 max-w-[520px]"
          >
            Example: a merchant creates one link in Nigeria. A payer in the US sees US payment details, a payer in Mexico sees Mexican payment details, and a payer in the UK sees faster payment details, all from the same link.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://dashboard.zendfi.tech/setup"
              className="group flex items-center gap-2 px-7 py-3.5 bg-primary hover:brightness-110 text-white font-bold rounded-xl text-[15px] transition-all hover:-translate-y-0.5"
            >
              Get your own link
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://docs.zendfi.tech"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2 px-7 py-3.5 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-bold rounded-xl text-[15px] transition-all hover:bg-gray-50"
            >
              View docs
              <ExternalLink size={14} className="opacity-40" />
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[13px] font-bold text-gray-300"
          >
            <span className="flex items-center gap-2 whitespace-nowrap"><Check size={14} className="text-emerald-500" /> No monthly fees</span>
            <span className="flex items-center gap-2 whitespace-nowrap"><Check size={14} className="text-emerald-500" /> Free sandbox forever</span>
            <span className="flex items-center gap-2 whitespace-nowrap"><Check size={14} className="text-emerald-500" /> $10 to go live</span>
          </motion.div>
        </div>

        {/* Right — mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-lg"
        >
          <CheckoutMockup />
        </motion.div>
      </div>
    </section>
  );
}
