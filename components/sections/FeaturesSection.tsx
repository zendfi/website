'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
    {
        num: '01',
        title: 'Subscriptions',
        color: '#a78bfa',
        desc: 'Daily, weekly, or monthly billing with configurable trial periods. Customers can subscribe, pause, and cancel — all on-chain.',
        detail: ['Automatic renewal', 'Trial periods', 'Customer portal'],
    },
    {
        num: '02',
        title: 'Revenue Splits',
        color: '#34d399',
        desc: 'Split payments automatically across multiple wallets at settlement time. Set percentages or fixed amounts per recipient.',
        detail: ['Percentage splits', 'Fixed amounts', 'Multi-wallet'],
    },
    {
        num: '03',
        title: 'Installments',
        color: '#a78bfa',
        desc: 'Let customers pay over time in crypto. Set a schedule, configure late fees and grace periods — we enforce it automatically.',
        detail: ['Custom schedules', 'Late fee enforcement', 'Auto-reminders'],
    },
    {
        num: '04',
        title: 'Invoices',
        color: '#a78bfa',
        desc: 'Send professional PDF invoices via email with line items, due dates, and tracked payment status. Paid receipts auto-generated.',
        detail: ['PDF generation', 'Email delivery', 'Payment tracking'],
    },
    {
        num: '05',
        title: 'Payment Intents',
        color: '#a78bfa',
        desc: 'Stripe-like two-phase flow: create an intent, then capture when ready. Perfect for reservations, pre-orders, and escrow flows.',
        detail: ['Two-phase capture', 'Expiry controls', 'Intent lifecycle'],
    },
    {
        num: '06',
        title: 'Webhooks',
        color: '#a78bfa',
        desc: 'HMAC-signed events delivered reliably with automatic retry, dead-letter queuing, and exponential backoff. Never miss a payment event.',
        detail: ['HMAC-SHA256', 'Dead-letter queue', 'Auto-retry'],
    },
    {
        num: '07',
        title: 'Session Keys',
        color: '#a78bfa',
        desc: 'Issue delegated, scoped, short-lived keys for your customers or systems. Minimal trust surface for embedded checkout flows.',
        detail: ['Delegated access', 'Expiry controls', 'Scope binding'],
    },
    {
        num: '08',
        title: 'API Key Scopes',
        color: '#94a3b8',
        desc: 'Granular permissions per key: payments only, read-only analytics, subscription management. Lock down exactly what each integration can do.',
        detail: ['Fine-grained scopes', 'Key rotation', 'Audit log'],
    },
];

function FeatureRow({
    feature,
    index,
    colIndex,
}: {
    feature: (typeof features)[0];
    index: number;
    colIndex: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.55,
                delay: colIndex * 0.1 + index * 0.07,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group relative border-t border-gray-100 py-7 flex items-start gap-5 cursor-default"
        >
            {/* Hover accent bar */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-px origin-top"
                style={{ background: feature.color }}
                initial={{ scaleY: 0, opacity: 0 }}
                whileHover={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
            />

            {/* Step number */}
            <span className="text-[11px] font-mono text-gray-300 group-hover:text-gray-400 transition-colors duration-300 flex-shrink-0 w-7 pt-0.5 select-none">
                {feature.num}
            </span>

            {/* Text content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors duration-200 tracking-tight leading-snug mb-2">
                    {feature.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                    {feature.desc}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3.5">
                    {feature.detail.map((tag, i) => (
                        <span
                            key={tag}
                            className="text-[11px] font-medium flex items-center gap-1.5"
                            style={{ color: `${feature.color}70` }}
                        >
                            {i > 0 && (
                                <span
                                    className="inline-block w-0.5 h-0.5 rounded-full"
                                    style={{ background: `${feature.color}70` }}
                                />
                            )}
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function FeaturesSection() {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

    const col1 = features.slice(0, 4);
    const col2 = features.slice(4, 8);

    return (
        <section id="features" className="py-10 sm:py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-4">
                            <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">Platform features</span>
                        </div>
                        <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold text-gray-900 leading-tight tracking-tight">
                            Everything you need
                            <br />
                            to <span className="text-accent">move money on-chain.</span>
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 max-w-xs lg:text-right leading-relaxed">
                        Eight primitives. One API. Composable in any order — from a simple checkout link to a fully programmable payment system.
                    </p>
                </motion.div>

                {/* Two-column indexed list */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
                    <div className="border-b border-gray-100">
                        {col1.map((f, i) => (
                            <FeatureRow key={f.title} feature={f} index={i} colIndex={0} />
                        ))}
                    </div>
                    <div className="border-b border-gray-100">
                        {col2.map((f, i) => (
                            <FeatureRow key={f.title} feature={f} index={i} colIndex={1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
