'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Products', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_16px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="ZendFi" className="h-8 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://dashboard.zendfi.tech/login"
              className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </a>
            <a
              href="https://dashboard.zendfi.tech/setup"
              className="px-4 py-1.5 text-[13px] font-semibold bg-primary hover:bg-primary-hover text-white rounded-lg transition-all shadow-[0_2px_12px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.35)]"
            >
              Get started →
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white border-l border-gray-100 shadow-2xl p-8 flex flex-col gap-6 transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-semibold">Menu</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-900">
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="https://dashboard.zendfi.tech/login"
              className="w-full text-center py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl transition-colors"
            >
              Sign in
            </a>
            <a
              href="https://dashboard.zendfi.tech/setup"
              className="w-full text-center py-3 text-sm font-semibold bg-primary text-white rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:bg-primary-hover transition-all"
            >
              Get started →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
