'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    headline: 'Customer checks out in Naira.',
    sub: 'No crypto wallet required. No prior knowledge of USDC. Just a familiar price in ₦.',
    accent: '#a78bfa',
    visual: <NairaVisual />,
  },
  {
    num: '02',
    headline: 'Just their email. That\'s it.',
    sub: 'No app download, no wallet setup, no KYC. One email is all it takes to start the transfer.',
    accent: '#60a5fa',
    visual: <EmailVisual />,
  },
  {
    num: '03',
    headline: 'A virtual bank account appears.',
    sub: 'GTBank, Access, Zenith, UBA — any Nigerian bank. They transfer the exact NGN amount.',
    accent: '#34d399',
    visual: <BankVisual />,
  },
  {
    num: '04',
    headline: 'You receive USDC. Instantly.',
    sub: 'No forex delays. No card failures. No Stripe. Pure USDC lands on your Solana wallet.',
    accent: '#fbbf24',
    visual: <SuccessVisual />,
  },
];

function NairaVisual() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-80 overflow-hidden ring-1 ring-gray-100">
      <div className="px-7 pt-7 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5 mb-6">
          <img src="/logo.png" alt="ZendFi" className="h-6 w-auto object-contain" />
          <span className="text-sm font-semibold text-gray-500">Checkout</span>
        </div>
        <div className="text-4xl font-extrabold text-gray-900 tracking-tight">₦25,000</div>
        <div className="text-base text-gray-400 mt-1.5">≈ 16.12 USDC</div>
      </div>
      <div className="px-7 py-5">
        <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Pay with</div>
        <div className="flex items-center gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Building2 size={20} className="text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-800">Bank Transfer</div>
            <div className="text-xs text-emerald-500 mt-0.5">Pay in Naira</div>
          </div>
          <div className="ml-auto">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg viewBox="0 0 8 6" fill="none" className="w-3 h-3"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">Total: ₦25,000 + ₦625 fee</div>
      </div>
    </div>
  );
}

function EmailVisual() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-80 overflow-hidden ring-1 ring-gray-100">
      <div className="px-7 pt-7 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5 mb-6">
          <img src="/logo.png" alt="ZendFi" className="h-6 w-auto object-contain" />
          <span className="text-sm font-semibold text-gray-500">Checkout</span>
        </div>
        <p className="text-base font-semibold text-gray-900 mb-1">Enter your email</p>
        <p className="text-sm text-gray-400">We&apos;ll send your receipt here</p>
      </div>
      <div className="px-7 py-5 space-y-3.5">
        <div className="flex items-center gap-3 px-4 py-3 border-2 border-violet-300 rounded-2xl bg-violet-50/40">
          <svg className="w-5 h-5 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="text-sm text-gray-900 font-medium">abiodun@gmail.com</span>
          <span className="ml-auto w-2 h-5 bg-violet-400 rounded-sm animate-pulse" />
        </div>
        <button className="w-full py-3 bg-gray-900 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2">
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
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
    <div className="bg-white rounded-3xl shadow-2xl w-80 p-7 ring-1 ring-gray-100">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Transfer to</span>
        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Active 14:52</span>
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gray-50 rounded-2xl">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Account Number</div>
          <div className="font-mono font-bold text-gray-900 text-xl tracking-wider">0123 456 789</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Bank Name</div>
          <div className="font-semibold text-gray-900 text-base">GTBank</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Exact Amount</div>
          <div className="font-extrabold text-gray-900 text-2xl">₦25,625</div>
        </div>
      </div>
      <p className="text-xs text-center text-gray-400 mt-4">Transfer the exact amount shown</p>
    </div>
  );
}

function SuccessVisual() {
  return (
    <div className="bg-gray-950 rounded-3xl shadow-2xl w-80 p-8 ring-1 ring-emerald-500/20">
      <div className="flex flex-col items-center text-center">
        <div className="w-18 h-18 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mb-6" style={{ width: 72, height: 72 }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-emerald-400" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Payment received</div>
        <div className="text-5xl font-extrabold text-emerald-400 tracking-tight">+16.12</div>
        <div className="text-lg font-semibold text-emerald-500/70 mt-1">USDC</div>
        <div className="text-white/30 text-sm mt-1">≈ ₦25,000</div>
        <div className="mt-6 w-full h-px bg-white/6" />
        <div className="mt-5 text-xs font-mono text-white/25">Tx: 5xAwPq…k9Vm3r</div>
        <div className="mt-1.5 text-xs text-emerald-500/60 font-medium">Confirmed · Solana Mainnet</div>
      </div>
    </div>
  );
}

function StepDot({ scrollYProgress, index, total }: { scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']; index: number; total: number }) {
  const stepOpacity = useTransform(
    scrollYProgress,
    [index / total - 0.1, index / total, (index + 1) / total, (index + 1) / total + 0.1],
    [0.3, 1, 1, 0.3]
  );
  return (
    <motion.div style={{ opacity: stepOpacity }} className="text-gray-400 text-xs font-mono px-2">
      {steps[index].num}
    </motion.div>
  );
}

export default function OnrampSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 4 slides × 100vw → track is 400vw. Move from 0 to -300vw.
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw']);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    // Tall outer container — drives the vertical scroll
    <div ref={containerRef} style={{ height: '500vh' }}>
      {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-white">
        {/* Section header */}
        <motion.div
          style={{ opacity }}
          className="absolute top-0 inset-x-0 z-10 px-6 pt-24 pb-8 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-emerald-700 tracking-wide">NGN · USDC Bridge</span>
            </div>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-extrabold text-gray-900 leading-tight tracking-tight max-w-lg">
              The Nigeria bridge
              <br />
              <span className="text-violet-600">everyone needed.</span>
            </h2>
          </div>
        </motion.div>

        {/* Scroll progress indicator */}
        <motion.div style={{ opacity }} className="absolute bottom-8 inset-x-0 z-10 flex justify-center pointer-events-none">
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <StepDot key={i} scrollYProgress={scrollYProgress} index={i} total={steps.length} />
            ))}
          </div>
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex h-full items-center"
          // Each child is 100vw wide
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-full flex items-center justify-center px-6"
              style={{ width: '100vw' }}
            >
              <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-32">
                {/* Text — alternates sides */}
                <div className={`flex flex-col ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div
                    className="text-[clamp(72px,10vw,120px)] font-extrabold leading-none mb-6 opacity-10"
                    style={{ color: step.accent }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-tight tracking-tight text-gray-900 mb-5"
                  >
                    {step.headline}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed max-w-sm">
                    {step.sub}
                  </p>
                </div>

                {/* Visual */}
                <div className={`flex justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {step.visual}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
