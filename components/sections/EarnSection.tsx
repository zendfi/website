'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

export default function EarnSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShowDetails(true), 1200);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative py-36 px-6 overflow-hidden bg-white"
    >
      {/* Ambient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-50 blur-[120px] rounded-full opacity-70" />
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700 tracking-wide">Earn · Powered by Kamino Finance</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(40px,6vw,76px)] font-extrabold text-gray-900 leading-tight tracking-tight mb-4"
        >
          Your USDC
          <br />
          <span className="text-emerald-500">doesn&apos;t sleep.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 max-w-[520px] leading-relaxed mb-16"
        >
          One click to deposit idle USDC into a battle-tested DeFi vault.
          Earn real yield. Withdraw anytime.
        </motion.p>

        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-sm"
        >
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            {/* APY pill */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Your Earn balance</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                ~7.2% APY
              </span>
            </div>

            {/* Big number */}
            <div className="text-[clamp(40px,8vw,56px)] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
              <AnimatedBalance target={12847.32} prefix="$" />
            </div>
            <div className="text-sm text-gray-400 mb-8">USDC · Kamino vault</div>

            {/* PnL */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between pt-6 border-t border-gray-100"
              >
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total earned</div>
                  <div className="text-lg font-bold text-emerald-400">
                    +<AnimatedBalance target={843.21} prefix="$" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Deposited</div>
                  <div className="text-lg font-bold text-gray-700">$12,004.11</div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-3 mt-4"
            >
              <div className="flex-1 py-3 text-center text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-[0_0_24px_rgba(16,185,129,0.3)] cursor-pointer">
                Deposit
              </div>
              <div className="flex-1 py-3 text-center text-sm font-medium border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-900 rounded-xl transition-all cursor-pointer">
                Withdraw
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-gray-400 max-w-sm">
          Yield generated by Kamino Finance. APY is variable and based on market conditions.
          Your principal is not guaranteed.
        </p>
      </div>
    </section>
  );
}
