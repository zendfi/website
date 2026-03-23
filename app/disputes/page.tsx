import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DisputePortal from '@/components/disputes/DisputePortal';

export const metadata: Metadata = {
  title: 'Disputes — ZendFi',
  description:
    'Open a payment dispute with ZendFi. Verify your email with OTP, submit evidence, and receive a dispute reference instantly.',
};

export default function DisputesPage() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
            ZendFi Dispute Center
          </p>
          <h1 className="mt-5 text-[clamp(34px,5vw,58px)] font-extrabold tracking-tight leading-[1.04] text-gray-900">
            Report a payment issue,
            <br />
            <span className="text-accent">without support back-and-forth.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed">
            Enter your payment reference, verify your email with a one-time code, and submit your dispute in minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <DisputePortal />
        </div>
      </section>

      <Footer />
    </main>
  );
}
