'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-36 px-6 overflow-hidden bg-white">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-100/60 blur-[140px] rounded-full" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-200 bg-violet-50 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-semibold text-violet-700 tracking-wide">Start building today</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(40px,6.5vw,80px)] font-extrabold text-gray-900 leading-tight tracking-tight mb-6"
        >
          Start building
          <br />
          <span className="text-violet-600">in minutes.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed"
        >
          Full sandbox forever free. <strong className="text-gray-700">$10 one-time fee to go live.</strong>
          {' '}No monthly subscriptions. No contracts.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://dashboard.zendfi.tech/setup"
            className="group flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl text-base transition-all hover:-translate-y-0.5"
          >
            Create your account
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="https://docs.zendfi.tech"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 px-8 py-4 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-medium rounded-2xl text-base transition-all hover:bg-gray-50"
          >
            Read the docs
          </a>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-xs text-gray-400"
        >
          Non-custodial · Solana Mainnet · WebAuthn secured · No credit card required
        </motion.p>
      </div>
    </section>
  );
}
