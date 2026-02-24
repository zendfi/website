'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Copy, Check, Code2, Zap } from 'lucide-react';

const tabs = [
  {
    id: 'install',
    label: 'Install',
    lang: 'bash',
    code: `# Install the ZendFi SDK
npm install @zendfi/sdk

# Or use the CLI scaffold
npx @zendfi/cli init my-store`,
  },
  {
    id: 'create',
    label: 'Create payment',
    lang: 'typescript',
    code: `import { zendfi } from '@zendfi/sdk';

// Reads ZENDFI_API_KEY from env — zero config
const payment = await zendfi.createPayment({
  amount: 50,               // USD
  description: 'Pro Plan',
  customer_email: 'user@example.com',
  redirect_url: 'https://myapp.com/success',
});

console.log(payment.payment_url);
// → https://checkout.zendfi.tech/pay/abc123
//   Send this to your customer`,
  },
  {
    id: 'embedded',
    label: 'Embedded checkout',
    lang: 'typescript',
    code: `import { ZendFiEmbeddedCheckout } from '@zendfi/sdk';

// Drop-in widget — no redirect needed
const checkout = new ZendFiEmbeddedCheckout({
  linkCode: 'abc123xyz',
  containerId: 'checkout-widget',
  mode: 'live',
  onSuccess: (payment) => {
    console.log('Paid!', payment.id);
    router.push('/thank-you');
  },
  onError: (err) => {
    toast.error(err.message);
  },
});

checkout.mount();`,
  },
  {
    id: 'webhook',
    label: 'Webhook handler',
    lang: 'typescript',
    code: `// app/api/zendfi/route.ts  (Next.js App Router)
import { createNextWebhookHandler } from '@zendfi/sdk/nextjs';

export const POST = createNextWebhookHandler({
  secret: process.env.ZENDFI_WEBHOOK_SECRET!,
  handlers: {
    'payment.confirmed': async (payment) => {
      await db.orders.update({
        where: { id: payment.metadata.orderId },
        data: { status: 'paid' },
      });
      await sendReceiptEmail(payment.customer_email);
    },
    'payment.failed': async (payment) => {
      await notifyMerchant(payment);
    },
  },
});`,
  },
];

function highlight(code: string, lang: string): string {
  // Escape raw text so unmatched characters don't inject HTML
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Single-pass regex — order is critical: comments first, then strings,
  // then keywords. Each match is consumed so later groups never re-scan
  // already-processed text, preventing class names from leaking as content.
  const TOKEN_RE =
    lang === 'bash'
      ? /(#[^\n]*)|(\b(?:npm|npx|install)\b)/g
      : /((?:\/\/)[^\n]*)|(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b(?:import|export|const|let|await|async|from|return|new|true|false|null)\b)|([A-Z][A-Za-z0-9]*(?=\s*[({<]))|([a-z][a-zA-Z0-9]+(?=\s*\())/g;

  let out = '';
  let cursor = 0;

  for (const m of code.matchAll(TOKEN_RE)) {
    // Escaped plain text before this token
    out += esc(code.slice(cursor, m.index));
    cursor = (m.index ?? 0) + m[0].length;

    if (lang === 'bash') {
      if (m[1]) out += `<span class="token-comment">${esc(m[1])}</span>`;
      else if (m[2]) out += `<span class="token-keyword">${esc(m[2])}</span>`;
    } else {
      if (m[1])      out += `<span class="token-comment">${esc(m[1])}</span>`;
      else if (m[2]) out += `<span class="token-string">${esc(m[2])}</span>`;
      else if (m[3]) out += `<span class="token-keyword">${esc(m[3])}</span>`;
      else if (m[4]) out += `<span class="token-type">${esc(m[4])}</span>`;
      else if (m[5]) out += `<span class="token-function">${esc(m[5])}</span>`;
    }
  }
  out += esc(code.slice(cursor));
  return out;
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Mac chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Terminal size={11} />
          <span className="text-[11px] font-mono">{lang}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
        >
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre className="px-5 py-5 text-[13px] font-mono leading-[1.8] overflow-x-auto h-scroll-hide bg-white">
        <code
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: highlight(code, lang) }}
        />
      </pre>
    </div>
  );
}

const features = [
  { icon: <Code2 size={16} className="text-violet-500" />, label: 'TypeScript native', sub: 'Branded IDs, full type inference' },
  { icon: <Terminal size={16} className="text-violet-500" />, label: 'CLI scaffolding', sub: 'npx @zendfi/cli init' },
  { icon: <Zap size={16} className="text-violet-400" />, label: 'Next.js & Express', sub: 'Framework route adapters' },
];

export default function DevSection() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-6 lg:sticky lg:top-28"
        >
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
            <span className="text-xs font-medium text-gray-500 tracking-wide">Developer SDK</span>
          </div>

          <h2 className="text-[clamp(32px,4vw,50px)] font-extrabold text-gray-900 leading-tight tracking-tight">
            Zero to payment
            <br />
            <span className="text-violet-600">in 60 seconds.</span>
          </h2>

          <p className="text-base text-gray-500 leading-relaxed">
            The{' '}
            <code className="text-violet-600 font-mono text-sm bg-violet-50 px-1.5 py-0.5 rounded-md">@zendfi/sdk</code>
            {' '}is a zero-config TypeScript library. Set your API key, call one function, send the URL to your customer.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3 mt-2">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-base shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{f.label}</div>
                  <div className="text-xs text-gray-400">{f.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://docs.zendfi.tech"
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit items-center gap-2 mt-4 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Read the full docs →
          </a>
        </motion.div>

        {/* Right: code */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-3"
        >
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-50 rounded-xl border border-gray-100 overflow-x-auto h-scroll-hide">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  i === activeTab
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <CodeBlock code={tabs[activeTab].code} lang={tabs[activeTab].lang} />
        </motion.div>
      </div>
    </section>
  );
}
