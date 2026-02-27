'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
    {
        icon: "1",
        title: 'MPC Wallets',
        sub: 'Lit Protocol + Shamir Secret Sharing. Private keys are split across distributed nodes — no single point of compromise, ever.',
    },
    {
        icon: "2",
        title: 'Passkey Login',
        sub: 'WebAuthn FIDO2 hardware-bound authentication. No passwords stored. No phishing surface. Your device is your identity.',
    },
    {
        icon: "3",
        title: 'Encrypted At Rest',
        sub: 'All keypairs encrypted with AES-256-GCM. Passwords hashed with Argon2. CSRF protection and API audit logs on every request.',
    },
];

export default function SecuritySection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="py-36 px-6 relative overflow-hidden">
            {/* Left accent line */}
            <div className="absolute left-0 top-1/4 w-px h-1/2 bg-violet-200/40" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: big statement */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-4">
                            <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">Security</span>
                        </div>

                        <blockquote className="text-[clamp(32px,4.5vw,54px)] font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
                            &ldquo;Non-custodial
                            <br />
                            <span className="text-accent">by architecture.&rdquo;</span>
                        </blockquote>

                        <p className="text-base text-gray-500 leading-relaxed max-w-md">
                            ZendFi never holds your funds. Merchant wallets are controlled by
                            merchant-owned keys, protected by distributed MPC. You can verify
                            every settlement on-chain.
                        </p>

                        {/* Chain proof */}
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-base">
                                <img src="https://styles.redditmedia.com/t5_bnph4w/styles/communityIcon_m06iocdml74d1.png" alt="Solana" className="w-6 h-6 object-contain" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-gray-900">Verifiable on Solana Explorer</div>
                                <div className="text-xs text-gray-400">Every transaction is public and auditable</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: three pillars */}
                    <div className="flex flex-col gap-8">
                        {pillars.map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, x: 24 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                                className="flex gap-5 items-start"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl border border-accent/20 bg-accent/5 flex items-center justify-center text-base font-bold text-accent shrink-0 mt-0.5"
                                >
                                    {p.icon}
                                </div>
                                <div>
                                    <div className="text-base font-bold text-gray-900 mb-1.5">{p.title}</div>
                                    <p className="text-sm text-gray-500 leading-relaxed">{p.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
