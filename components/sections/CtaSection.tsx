'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Shield, Zap } from 'lucide-react';
import WorldMap from '@/components/WorldMap';

export default function CtaSection() {
  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left relative z-10"
          >
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 mb-2">
              <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">Global Scale</span>
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(40px,5vw,64px)] font-black leading-[1.05] tracking-tight mb-6 text-gray-900">
              Built for <br />
              the <span className="text-accent">borderless</span> <br />
              internet.
            </h2>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl font-medium leading-relaxed">
              Full sandbox forever free. <strong className="text-gray-900 border-b border-gray-200 pb-0.5">$10 one-time fee to go live.</strong>
              <br className="hidden md:block" /> No monthly subscriptions. No contracts.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="https://dashboard.zendfi.tech/setup"
                className="group flex items-center justify-center gap-2.5 px-8 py-4 text-white font-semibold rounded-2xl text-base w-full sm:w-auto bg-accent transition-colors hover:-translate-y-0.5"
              >
                Create your account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="https://docs.zendfi.tech"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white border border-gray-200 text-gray-600 font-semibold rounded-2xl text-base w-full sm:w-auto hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all hover:-translate-y-0.5"
              >
                <Code2 className="w-4 h-4 text-gray-400" />
                Read the docs
              </a>
            </div>
          </motion.div>

          {/* Right Map Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center w-full"
          >
            <WorldMap />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
