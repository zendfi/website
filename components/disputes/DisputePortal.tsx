'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type DisputeType = 'duplicate' | 'unauthorized' | 'product_not_received' | 'other';

type PortalStep = 'request-otp' | 'submit-dispute' | 'submitted';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.zendfi.tech';

const disputeTypeOptions: Array<{ value: DisputeType; label: string; help: string }> = [
  { value: 'duplicate', label: 'Duplicate charge', help: 'You were charged more than once for the same payment.' },
  { value: 'unauthorized', label: 'Unauthorized payment', help: 'You did not authorize this payment.' },
  { value: 'product_not_received', label: 'Product/service not received', help: 'You paid but did not receive the promised item or service.' },
  { value: 'other', label: 'Other issue', help: 'Any issue not covered by the options above.' },
];

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function DisputePortal() {
  const searchParams = useSearchParams();

  const prefilledPaymentId = useMemo(
    () => searchParams.get('payment_id') || searchParams.get('paymentId') || '',
    [searchParams]
  );

  const [step, setStep] = useState<PortalStep>('request-otp');

  const [paymentId, setPaymentId] = useState(prefilledPaymentId);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [disputeType, setDisputeType] = useState<DisputeType>('duplicate');
  const [description, setDescription] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedDisputeId, setSubmittedDisputeId] = useState<string | null>(null);

  const selectedType = disputeTypeOptions.find((t) => t.value === disputeType);

  const requestOtp = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!paymentId.trim()) {
      setErrorMessage('Payment reference is required.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Email is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/payments/${paymentId.trim()}/dispute/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_email: email.trim() }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || payload.message || 'Failed to send verification code');
      }

      setOtpExpiresAt(payload.expires_at || null);
      setSuccessMessage('Verification code sent. Check your inbox and continue below.');
      setStep('submit-dispute');
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Failed to send verification code'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitDispute = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!paymentId.trim()) {
      setErrorMessage('Payment reference is required.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Email is required.');
      return;
    }

    if (!otpCode.trim()) {
      setErrorMessage('Verification code is required.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Please describe what happened.');
      return;
    }

    setIsSubmitting(true);
    try {
      const evidence: Record<string, string> = {};
      if (evidenceNotes.trim()) evidence.notes = evidenceNotes.trim();
      if (evidenceUrl.trim()) evidence.url = evidenceUrl.trim();

      const res = await fetch(`${API_BASE}/api/v1/payments/${paymentId.trim()}/dispute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: email.trim(),
          customer_wallet: wallet.trim() || undefined,
          dispute_type: disputeType,
          description: description.trim(),
          evidence,
          otp_code: otpCode.trim(),
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || payload.message || 'Failed to submit dispute');
      }

      setSubmittedDisputeId(payload.id || null);
      setStep('submitted');
      setSuccessMessage('Dispute submitted successfully. Our team and the merchant have been notified.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Failed to submit dispute'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const restart = () => {
    setStep('request-otp');
    setWallet('');
    setOtpCode('');
    setDisputeType('duplicate');
    setDescription('');
    setEvidenceNotes('');
    setEvidenceUrl('');
    setOtpExpiresAt(null);
    setSuccessMessage(null);
    setErrorMessage(null);
    setSubmittedDisputeId(null);
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 md:p-8 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.35)]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold">Step {step === 'request-otp' ? '1' : step === 'submit-dispute' ? '2' : '3'} of 3</p>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            {step === 'request-otp' && 'Verify your email'}
            {step === 'submit-dispute' && 'Submit dispute details'}
            {step === 'submitted' && 'Dispute received'}
          </h2>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          Public portal
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-600">
        Already have a dispute reference?{' '}
        <Link href="/disputes/status" className="font-semibold text-primary hover:underline">
          Check dispute status
        </Link>
      </div>

      {successMessage && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      )}

      {step !== 'submitted' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Reference</span>
              <input
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                placeholder="e.g. 57f7..."
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </div>

          {step === 'request-otp' && (
            <div className="pt-2">
              <button
                onClick={requestOtp}
                disabled={isSubmitting}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl text-sm font-bold bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Sending code...' : 'Send verification code'}
              </button>
            </div>
          )}

          {step === 'submit-dispute' && (
            <>
              <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-3 text-xs text-violet-700">
                {otpExpiresAt
                  ? `Verification code expires at ${new Date(otpExpiresAt).toLocaleString()}.`
                  : 'Enter the code sent to your email to continue.'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Verification Code</span>
                  <input
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit code"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Wallet Address (optional)</span>
                  <input
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="Solana wallet"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Dispute Type</span>
                <select
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value as DisputeType)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {disputeTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">{selectedType?.help}</p>
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">What happened?</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe the issue, timeline, and what resolution you expect."
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Evidence Notes (optional)</span>
                  <textarea
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                    rows={3}
                    placeholder="Receipt notes, conversation references, etc."
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Evidence URL (optional)</span>
                  <input
                    value={evidenceUrl}
                    onChange={(e) => setEvidenceUrl(e.target.value)}
                    placeholder="https://..."
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={submitDispute}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit dispute'}
                </button>
                <button
                  onClick={requestOtp}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
                >
                  Resend code
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === 'submitted' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-800 font-medium">Your dispute has been filed.</p>
            {submittedDisputeId && (
              <p className="mt-2 text-xs text-emerald-700">
                Reference: <span className="font-mono font-bold">{submittedDisputeId}</span>
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
            We sent a confirmation to your email. Keep your dispute reference for follow-up.
          </div>

          <button
            onClick={restart}
            className="px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Open another dispute
          </button>
        </div>
      )}
    </div>
  );
}
