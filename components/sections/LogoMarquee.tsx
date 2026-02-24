'use client';

import type { ReactNode } from 'react';
import { CircleDot, Flame, Zap, DollarSign, KeyRound, Code2, QrCode, Banknote } from 'lucide-react';

const logos = [
  { name: 'Solana', icon: <CircleDot size={18} color="#a78bfa" /> },
  { name: 'Lit Protocol', icon: <Flame size={18} color="#a78bfa" /> },
  { name: 'Kamino Finance', icon: <Zap size={18} color="#a78bfa" /> },
  { name: 'USDC · Circle', icon: <DollarSign size={18} color="#a78bfa" /> },
  { name: 'WebAuthn / FIDO2', icon: <KeyRound size={18} color="#a78bfa" /> },
  { name: 'TypeScript SDK', icon: <Code2 size={18} color="#a78bfa" /> },
  { name: 'Solana Pay', icon: <QrCode size={18} color="#a78bfa" /> },
  { name: 'PAJ Ramp · Naira', icon: <Banknote size={18} color="#a78bfa" /> },
];

function LogoItem({ name, icon }: { name: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-3 shrink-0">
      <span className="leading-none flex items-center">
        {icon}
      </span>
      <span className="text-sm font-medium text-gray-400 whitespace-nowrap tracking-wide">
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  const items = [...logos, ...logos]; // double for seamless loop

  return (
    <div className="relative py-5 overflow-hidden border-y border-gray-100">


      <div className="flex marquee-track">
        {items.map((logo, i) => (
          <LogoItem key={i} {...logo} />
        ))}
      </div>
    </div>
  );
}
