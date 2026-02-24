'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const rows = [
  {
    label: 'Sandbox',
    price: 'Free',
    sub: 'Free forever',
    note: 'Full devnet access. Test every feature. No time limit.',
    highlight: false,
    color: '#a78bfa',
  },
  {
    label: 'Go live',
    price: '$10',
    sub: 'One-time setup fee',
    note: 'Unlock mainnet. Deploy your payment infrastructure permanently.',
    highlight: true,
    color: '#7c3aed',
  },
  {
    label: 'Per transaction',
    price: '~1%',
    sub: 'Per confirmed payment',
    note: 'Only charged when you get paid. No monthly subscription.',
    highlight: false,
    color: '#34d399',
  },
  {
    label: 'Earn yield',
    price: '85%',
    sub: 'Of generated yield to you',
    note: 'We keep 15%. You keep 85% of all DeFi yield earned by your balance.',
    highlight: false,
    color: '#fbbf24',
  },
];

export default function PricingPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 mb-4">
              <span className="text-xs font-medium text-violet-600 tracking-wide">Pricing</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-gray-900 leading-tight tracking-tight">
              Simple. Transparent.
              <br />
              <span className="text-violet-600">No surprises.</span>
            </h2>
          </div>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            Full pricing details →
          </Link>
        </motion.div>

        {/* Pricing rows */}
        <div className="rounded-3xl overflow-hidden border border-gray-100">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 px-7 py-6 border-b border-gray-100 last:border-0 transition-colors ${
                row.highlight
                  ? 'bg-violet-50/70 hover:bg-violet-50'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {/* Label */}
              <div className="w-36 shrink-0">
                <div className="text-sm font-semibold text-gray-700">{row.label}</div>
              </div>

              {/* Price */}
              <div className="w-28 shrink-0">
                <div
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: row.color }}
                >
                  {row.price}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">{row.sub}</div>
              </div>

              {/* Note */}
              <div className="flex-1">
                <p className="text-sm text-gray-500 leading-relaxed">{row.note}</p>
              </div>

              {row.highlight && (
                <div className="shrink-0">
                  <a
                    href="https://dashboard.zendfi.tech/setup"
                    className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap"
                  >
                    Go live →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-5 text-center text-xs text-gray-400"
        >
          NGN onramp service charge: max(₦30, 2.5% of transfer amount) — shown transparently to payer.
        </motion.p>
      </div>
    </section>
  );
}
