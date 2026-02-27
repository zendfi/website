'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    {
        value: '< 1s',
        label: 'Solana finality',
        sub: 'Transactions confirm in under a second — faster than any card network.',
    },
    {
        value: '0 SOL',
        label: 'Gas cost for payers',
        sub: 'ZendFi sponsors every transaction fee. Your customers just pay.',
    },
    {
        value: '~7%',
        label: 'APY on idle USDC',
        sub: 'Merchant balances earn Kamino DeFi yield automatically. Withdraw anytime.',
    },
];

export default function ProofSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-gray-100 rounded-3xl overflow-hidden border border-gray-100">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-white px-8 py-10 flex flex-col gap-4"
                        >
                            <div
                                className="text-[clamp(44px,5vw,64px)] font-extrabold leading-none tracking-tight text-accent"
                            >
                                {s.value}
                            </div>
                            <div className="text-gray-900 font-semibold text-lg">{s.label}</div>
                            <p className="text-sm text-gray-500 leading-relaxed">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
