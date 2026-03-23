'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { label: 'Products', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Disputes', href: '/disputes' },
  { label: 'Docs', href: 'https://docs.zendfi.tech', external: true },
  { label: 'Blog', href: 'https://blog.zendfi.tech', external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Main bar */}
      <header
        className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.02)] py-2'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/zendfi_logo_gg.png"
              alt="ZendFi"
              className="h-7 w-auto object-contain transition-transform group-hover:scale-[1.02] filter [filter:invert(39%)_sepia(87%)_saturate(5833%)_hue-rotate(255deg)_brightness(97%)_contrast(92%)]"
            />
          </Link>

          {/* Center: Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-all rounded-lg hover:bg-gray-100/50"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-all rounded-lg hover:bg-gray-100/50"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://dashboard.zendfi.tech/login"
              className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              Log in
            </a>
            <a
              href="https://dashboard.zendfi.tech/setup"
              className="px-5 py-2.5 text-[13px] font-bold bg-primary hover:brightness-110 text-white rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              Get started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-white/80 backdrop-blur-md transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white border-l border-gray-100 shadow-2xl p-8 flex flex-col gap-10 transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between">
            <img src="/zendfi_logo_gg.png" alt="ZendFi" className="h-6 w-auto filter [filter:invert(39%)_sepia(87%)_saturate(5833%)_hue-rotate(253deg)_brightness(97%)_contrast(92%)]" />
            <button onClick={() => setOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-900 hover:bg-gray-50 rounded-2xl transition-all active:scale-[0.98]"
              >
                {l.label}
                <ArrowRight size={18} className="text-gray-300" />
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="https://dashboard.zendfi.tech/login"
              className="w-full text-center py-4 text-[15px] font-bold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-[0.98]"
            >
              Log in
            </a>
            <a
              href="https://dashboard.zendfi.tech/setup"
              className="w-full text-center py-4 text-[15px] font-bold bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Create free account
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
