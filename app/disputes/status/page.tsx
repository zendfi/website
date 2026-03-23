import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DisputeStatusLookup from '../../../components/disputes/DisputeStatusLookup';

export const metadata: Metadata = {
  title: 'Dispute Status — ZendFi',
  description:
    'Check the status of your ZendFi dispute using your dispute reference and email verification code.',
};

export default function DisputeStatusPage() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
            ZendFi Dispute Center
          </p>
          <h1 className="mt-5 text-[clamp(34px,5vw,58px)] font-extrabold tracking-tight leading-[1.04] text-gray-900">
            Check your dispute status,
            <br />
            <span className="text-accent">securely with OTP.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed">
            Enter your dispute reference and email. We will send a one-time verification code before showing case status.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <DisputeStatusLookup />
        </div>
      </section>

      <Footer />
    </main>
  );
}
