'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Store,
    Zap,
    PackageCheck,
    BarChart3,
    Clock,
    Coins,
    ChevronRight,
    ShoppingBag,
    CreditCard,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        title: "Create a simple online store in minutes",
        description: "Launch your shop and start selling without any technical overhead.",
    },
    {
        title: "Publish products and accept payments instantly",
        description: "Accept USDC and other tokens with one-click checkout.",
    },
    {
        title: "Process and fulfill orders end-to-end",
        description: "Manage your inventory and shipping directly from your dashboard.",
    },
    {
        title: "Track sales & analytics",
        description: "Access deep insights for a clearer view of your business growth.",
    },
    {
        title: "Get paid instantly — no settlement delays",
        description: "Access your funds immediately. No 3-7 day waiting periods.",
    },
    {
        title: "Earn on idle balances",
        description: "Your revenue automatically earns DeFi yield while it sits in your account.",
    }
];

export default function ShopSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 px-6 bg-white overflow-hidden border-y border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left side: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6"
                        >
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Commerce</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-[clamp(32px,5vw,56px)] font-extrabold text-gray-900 leading-tight tracking-tight mb-6"
                        >
                            ZendFi Shop is live.
                            <br />
                            <span className="text-accent">Sell online. Get paid instantly.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed"
                        >
                            ZendFi Shop gives you payments, order management, and business insights without the overhead of building a full ecommerce site.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                                    className="flex flex-col"
                                >
                                    <h4 className="text-sm font-bold text-gray-900 mb-1 leading-snug flex items-center gap-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-2xl font-bold transition-all"
                        >
                            <Link href="https://dashboard.zendfi.tech/setup">
                                Create your Shop
                            </Link>
                            <ChevronRight size={18} />
                        </motion.button>
                    </div>

                    {/* Right side: Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main UI Window */}
                        <div className="relative bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                            {/* Browser bar */}
                            <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg px-4 py-1 text-[10px] text-gray-400 font-medium">
                                    shopname.zendfi.app
                                </div>
                                <div className="w-8" />
                            </div>

                            <div className="p-8">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Merchant Dashboard</div>
                                        <h3 className="font-bold text-xl text-gray-900">Store Overview</h3>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-xl">
                                        <ShoppingBag size={20} className="text-accent" />
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className="space-y-3 mb-10">
                                    {[
                                        { name: "Urban Wireless", price: "$75.00", stock: "12 in stock", image: "/images/headphones.png" },
                                        { name: "Smartwatch S5", price: "$120.00", stock: "8 in stock", image: "/images/smartwatch.png" }
                                    ].map((product, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-white group hover:border-accent/20 transition-colors">
                                            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                                <div className="text-[10px] text-gray-400">{product.stock}</div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <div className="text-sm font-bold text-gray-900">{product.price}</div>
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                                                    <ShoppingBag size={10} />
                                                    Add to bag
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Simplified Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl border border-gray-100 bg-white">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Sales</div>
                                        <div className="text-2xl font-black text-gray-900">$2,450.75</div>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-gray-100 bg-white">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Payouts</div>
                                        <div className="text-2xl font-black text-accent">Instant</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Floating Label */}
                        <motion.div
                            className="absolute -right-6 -bottom-6 bg-white py-3 px-5 rounded-2xl shadow-md border border-gray-100 z-10 flex items-center gap-3"
                        >
                            <span className="text-xs font-bold text-gray-900">24/7 Service</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
