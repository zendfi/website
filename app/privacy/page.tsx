import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — ZendFi',
  description:
    'ZendFi Privacy Policy. Learn what data we collect, how we use it, who we share it with, and your rights.',
};

const sections = [
  {
    number: '00',
    title: 'Overview',
    heading: 'Who We Are',
    body: [
      'ZendFi ("we", "us", "our") is a cross-border payments infrastructure platform that enables merchants to accept multi-currency payments and settle in USDC or local currency. Our service is accessible at zendfi.tech.',
      'This Privacy Policy explains what data we collect when you use ZendFi, how we use it, who we share it with, and your rights over it. By using our services, you agree to the practices described here.',
    ],
  },
  {
    number: '01',
    title: 'Collection',
    heading: 'Information We Collect',
    intro: 'We collect information necessary to provide payment infrastructure services:',
    items: [
      'Identity data — full name, business name, email address, phone number',
      'Account data — login credentials (stored as hashed values), account preferences',
      'Payment data — wallet addresses, transaction amounts, currencies, payment status',
      'Business data — merchant category, country of operation, settlement preferences',
      'Technical data — IP address, device type, browser, API usage logs, timestamps',
      'Communication data — messages sent via WhatsApp OTP, support correspondence',
    ],
    note: 'We do not collect or store full card numbers, CVVs, or unencrypted financial credentials.',
  },
  {
    number: '02',
    title: 'Use',
    heading: 'How We Use Your Information',
    intro: 'We use collected data strictly to operate and improve our services:',
    items: [
      'Verifying your identity during onboarding and login (OTP authentication)',
      'Processing and settling cross-border payments on your behalf',
      'Communicating transaction statuses, receipts, and account notifications',
      'Detecting and preventing fraud, security breaches, and unauthorized access',
      'Complying with applicable financial regulations and legal obligations',
      'Improving platform reliability, performance, and features',
    ],
    note: 'We do not use your data for advertising. We do not sell your data to third parties.',
  },
  {
    number: '03',
    title: 'Sharing',
    heading: 'Who We Share Data With',
    intro:
      'To deliver our services, we work with the following infrastructure partners. Each partner processes only the data necessary for their specific function:',
    partners: [
      { name: 'Bridge', detail: 'Stablecoin issuance and USDC settlement infrastructure' },
      { name: 'Flipeet', detail: 'Local currency onramp and offramp payment processing' },
      { name: 'Paj Cash', detail: 'Payment processing and corridor-specific transaction routing' },
      { name: 'Meta (WhatsApp)', detail: 'OTP delivery via WhatsApp Business API during onboarding' },
      { name: 'AWS', detail: 'Cloud hosting and infrastructure (ECS, ALB, Secrets Manager)' },
    ],
    note:
      'We may also disclose your data to law enforcement or regulatory bodies when required by law, or to protect the rights and safety of ZendFi and its users.',
  },
  {
    number: '04',
    title: 'Retention',
    heading: 'How Long We Keep Your Data',
    body: [
      'We retain your data for as long as your account is active or as required to provide our services. Transaction records are retained for a minimum of 5 years to comply with financial regulations. OTP codes are invalidated immediately after use or upon expiry (10 minutes), and are never stored in plaintext.',
      'Upon account deletion, we will anonymize or delete personal data within 30 days, except where retention is required by law.',
    ],
  },
  {
    number: '05',
    title: 'Security',
    heading: 'How We Protect Your Data',
    intro: 'We implement industry-standard security measures including:',
    items: [
      'TLS encryption for all data in transit',
      'Encrypted storage for sensitive credentials via AWS Secrets Manager',
      'Hashed OTP codes — never stored in plaintext',
      'Role-based access controls on all internal systems',
      'Continuous monitoring and alerting via AWS CloudWatch',
    ],
    note:
      'No system is completely immune to breaches. In the event of a data breach that affects your personal information, we will notify you promptly in accordance with applicable law.',
  },
  {
    number: '06',
    title: 'Your Rights',
    heading: 'Your Rights Over Your Data',
    intro: 'Regardless of where you are located, you have the right to:',
    items: [
      'Access the personal data we hold about you',
      'Request correction of inaccurate or incomplete data',
      'Request deletion of your account and associated personal data',
      'Withdraw consent for data processing where consent is the legal basis',
      'Lodge a complaint with your local data protection authority',
    ],
    note: 'To exercise any of these rights, contact us at the address below. We will respond within 30 days.',
  },
  {
    number: '07',
    title: 'Cookies',
    heading: 'Cookies & Tracking',
    body: [
      'Our platform uses minimal cookies strictly necessary for session management and security. We do not use tracking cookies, advertising pixels, or third-party analytics that profile your behaviour across other websites.',
    ],
  },
  {
    number: '08',
    title: 'Changes',
    heading: 'Updates to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page and notify active users via email or in-app notice where the changes are material. Continued use of ZendFi after any update constitutes acceptance of the revised policy.',
    ],
  },
  {
    number: '09',
    title: 'Contact',
    heading: 'Get in Touch',
    body: [
      'For any privacy-related questions, data requests, or concerns:',
    ],
    contact: true,
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="bg-bg min-h-screen relative">
      <Navbar />

      <section className="relative overflow-hidden px-6 pt-24 pb-14 md:pt-28 md:pb-18">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_42%),linear-gradient(180deg,rgba(249,248,255,0.9),rgba(255,255,255,0.95))]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-violet-200/70 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700 shadow-sm backdrop-blur">
              <span>ZendFi.tech</span>
              <span className="text-violet-300">•</span>
              <span>Legal</span>
            </div>

            <div className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-gray-400">
              Privacy Policy
            </div>

            <h1 className="mt-5 text-[clamp(44px,7vw,84px)] font-extrabold tracking-tight leading-[0.94] text-gray-950">
              Your data,
              <br />
              <span className="text-accent">handled honestly.</span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                Effective: April 30, 2026
              </span>
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                Last updated: April 30, 2026
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
              We keep this policy focused on what matters: what we collect, why we use it, who can access it, and how you can control it.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.2)]">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Scope</div>
              <div className="mt-3 text-lg font-bold text-gray-950">Payments, onboarding, security, and account support.</div>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.2)]">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Retention</div>
              <div className="mt-3 text-lg font-bold text-gray-950">Transaction records: minimum 5 years. OTPs: expire in 10 minutes.</div>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.2)]">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Contact</div>
              <div className="mt-3 text-lg font-bold text-gray-950">privacy@zendfi.tech</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <article className="space-y-5">
            {sections.map((section) => (
              <section
                key={section.number}
                className="rounded-[28px] border border-gray-100 bg-white p-6 md:p-8 shadow-[0_12px_50px_-38px_rgba(15,23,42,0.18)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet-500">
                      {section.number} — {section.title}
                    </div>
                    <h2 className="mt-3 text-2xl md:text-[28px] font-extrabold tracking-tight text-gray-950">
                      {section.heading}
                    </h2>
                  </div>
                </div>

                {'body' in section && section.body && (
                  <div className="mt-5 space-y-4 text-sm md:text-[15px] leading-7 text-gray-600">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {'intro' in section && section.intro && (
                  <p className="mt-5 text-sm md:text-[15px] leading-7 text-gray-600">
                    {section.intro}
                  </p>
                )}

                {'items' in section && section.items && (
                  <ul className="mt-5 grid gap-3 md:grid-cols-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3 text-sm leading-6 text-gray-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {'partners' in section && section.partners && (
                  <div className="mt-5 grid gap-3">
                    {section.partners.map((partner) => (
                      <div
                        key={partner.name}
                        className="flex flex-col gap-1 rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-4"
                      >
                        <div className="font-semibold text-gray-950">{partner.name}</div>
                        <div className="text-sm leading-6 text-gray-600 md:text-right">{partner.detail}</div>
                      </div>
                    ))}
                  </div>
                )}

                {'note' in section && section.note && (
                  <p className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/70 px-4 py-3 text-sm leading-6 text-gray-700">
                    {section.note}
                  </p>
                )}

                {'contact' in section && section.contact && (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <a
                      href="mailto:privacy@zendfi.tech"
                      className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-4 text-sm font-semibold text-gray-900 transition-colors hover:border-violet-200 hover:bg-violet-50/60"
                    >
                      privacy@zendfi.tech
                    </a>
                    <a
                      href="https://zendfi.tech"
                      className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-4 text-sm font-semibold text-gray-900 transition-colors hover:border-violet-200 hover:bg-violet-50/60"
                    >
                      https://zendfi.tech
                    </a>
                  </div>
                )}
              </section>
            ))}
          </article>

          <div className="mt-6 rounded-[28px] border border-gray-100 bg-gray-950 px-6 py-8 text-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] md:px-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet-300">
              ZendFi
            </div>
            <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-gray-300">
              © 2026 ZendFi. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-400">zendfi.tech</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}