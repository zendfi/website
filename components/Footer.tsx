import Link from 'next/link';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/#changelog' },
      { label: 'Status', href: '/#status' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: 'https://docs.zendfi.tech', external: true },
      { label: 'SDK Reference', href: 'https://docs.zendfi.tech/sdk', external: true },
      { label: 'CLI', href: 'https://docs.zendfi.tech/cli', external: true },
      { label: 'GitHub', href: 'https://github.com/zendfi', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Dispute Center', href: '/disputes' },
      { label: 'Blog', href: 'https://blog.zendfi.tech', external: true },
      { label: 'X', href: 'https://x.com/zendfi_', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/60 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/zendfi_logo_gg.png" alt="ZendFi" className="h-7 w-auto object-contain filter [filter:invert(39%)_sepia(87%)_saturate(5833%)_hue-rotate(253deg)_brightness(97%)_contrast(92%)]" />
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed max-w-[180px]">
              Crypto payments for the borderless economy.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {col.title}
              </h4>
              <nav className="flex flex-col gap-3">
                {col.links.map((l) =>
                  'external' in l && l.external ? (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {l.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-gray-400">
            © {new Date().getFullYear()} ZendFi. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <span>Built on</span>
            <span className="text-accent font-semibold">Solana</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
