import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — ZendFi',
  description: 'Simple, transparent pricing. Free sandbox forever. $10 to go live. No monthly subscriptions.',
};

const tiers = [
  {
    name: 'Sandbox',
    headline: 'Build without limits.',
    price: 'Free',
    priceSub: 'forever',
    highlight: false,
    color: '#a78bfa',
    features: [
      'Full Solana devnet access',
      'Every feature unlocked',
      'Unlimited test payments',
      'SDK + CLI included',
      'Test payment links',
      'Test webhooks',
      'Dashboard access',
      'Community support',
    ],
    cta: 'Start for free',
    ctaHref: 'https://dashboard.zendfi.tech/setup',
  },
  {
    name: 'Live',
    headline: 'Ship to production.',
    price: '$10',
    priceSub: 'one-time setup · then pay-as-you-go',
    highlight: true,
    color: '#7c3aed',
    features: [
      'Everything in Sandbox',
      'Solana mainnet access',
      '~1% per confirmed payment',
      'NGN onramp (max(₦30, 2.5%) service charge)',
      'Earn: 85% of yield to you',
      'Subscriptions & installments',
      'Revenue splits',
      'Webhook dead-letter queue',
      'PDF receipts by email',
      'MPC wallet security',
      'Priority support',
    ],
    cta: 'Go live for $10 →',
    ctaHref: 'https://dashboard.zendfi.tech/setup',
  },
];

const faq = [
  {
    q: 'What does the $10 setup fee cover?',
    a: "The $10 one-time fee unlocks your mainnet slot on ZendFi. It's a one-time activation, not a subscription. Once live, you only pay per confirmed transaction.",
  },
  {
    q: 'Is there a monthly fee?',
    a: 'No. ZendFi has no monthly or annual subscription. You pay the $10 setup fee once, and then a small per-transaction fee only when you receive a confirmed payment.',
  },
  {
    q: 'How does the Earn yield work?',
    a: 'Idle USDC in your ZendFi wallet can be deposited into Kamino Finance vaults. The yield generated is split 85% to you and 15% to ZendFi. You can withdraw at any time.',
  },
  {
    q: 'What is the NGN onramp service charge?',
    a: 'For Nigerian Naira bank transfer payments, a service charge of max(₦30, 2.5% of the transfer amount) is applied. This charge is shown transparently to the payer before they complete the transfer. You receive 100% of the USDC equivalent of the base amount.',
  },
  {
    q: 'What counts as a "confirmed payment"?',
    a: "A payment is confirmed when the on-chain Solana transaction is finalized (typically < 1 second). Only successful payment transactions incur the per-transaction fee — failed or expired payments are free.",
  },
  {
    q: 'What is the per-transaction fee exactly?',
    a: 'The exact rate is applied at settlement. It is designed to be competitive with Web2 payment gateways — with the added benefit of instant settlement, no chargebacks, and Solana-speed finality.',
  },
];

export default function PricingPage() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-200/40 blur-[120px] rounded-full" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-200 bg-violet-50 mb-6">
            <span className="text-xs font-semibold text-violet-600 tracking-wide">Pricing</span>
          </div>
          <h1 className="text-[clamp(36px,5.5vw,68px)] font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
            Simple &amp; transparent.
            <br />
            <span className="text-violet-600">No surprises.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Free sandbox forever. $10 to ship to mainnet. Pay-as-you-go after that.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-6 pb-28 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border p-8 flex flex-col gap-7 ${
                tier.highlight
                  ? 'border-violet-200 bg-violet-50/60 shadow-[0_4px_32px_rgba(124,58,237,0.08)]'
                  : 'border-gray-100 bg-white shadow-sm'
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color: tier.color, background: `${tier.color}15` }}
                  >
                    {tier.name}
                  </span>
                  {tier.highlight && (
                    <span className="text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Recommended
                    </span>
                  )}
                </div>
                <div
                  className="text-[clamp(40px,6vw,56px)] font-extrabold tracking-tight leading-none mb-1"
                  style={{ color: tier.highlight ? '#7c3aed' : tier.color }}
                >
                  {tier.price}
                </div>
                <div className="text-sm text-gray-400 mt-2">{tier.priceSub}</div>
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 mt-0.5 shrink-0">
                      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 5" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-500">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.ctaHref}
                className={`w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all ${
                  tier.highlight
                    ? 'bg-primary hover:bg-primary-hover text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_36px_rgba(124,58,237,0.5)]'
                    : 'border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-xs text-gray-400 mt-8">
          All prices in USD. NGN onramp service charge shown transparently to payers.
          Yield is variable and not guaranteed.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-32 max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-10 tracking-tight text-center">
          Frequently asked
        </h2>
        <div className="flex flex-col gap-6">
          {faq.map((item, i) => (
            <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
