'use client';

import { useState } from 'react';

type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'resolved_merchant_favor'
  | 'resolved_customer_favor'
  | 'closed';

type DisputeType = 'duplicate' | 'unauthorized' | 'product_not_received' | 'other';

type StatusPayload = {
  id: string;
  payment_id: string;
  dispute_type: DisputeType;
  status: DisputeStatus;
  opened_at: string;
  resolved_at?: string | null;
  resolution_notes?: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.zendfi.tech';

function prettyType(value: DisputeType) {
  return value.replaceAll('_', ' ');
}

function prettyStatus(value: DisputeStatus) {
  return value.replaceAll('_', ' ');
}

function statusPill(status: DisputeStatus) {
  if (status === 'resolved_customer_favor') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (status === 'resolved_merchant_favor') return 'bg-slate-100 text-slate-700 border-slate-200';
  if (status === 'under_review') return 'bg-amber-100 text-amber-700 border-amber-200';
  if (status === 'closed') return 'bg-gray-100 text-gray-700 border-gray-200';
  return 'bg-violet-100 text-violet-700 border-violet-200';
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function DisputeStatusLookup() {
  const [disputeId, setDisputeId] = useState('');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [otpRequested, setOtpRequested] = useState(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState<string | null>(null);
  const [statusData, setStatusData] = useState<StatusPayload | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestOtp = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!disputeId.trim()) {
      setErrorMessage('Dispute reference is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Email is required.');
      return;
    }

    setIsSubmitting(true);
    setStatusData(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/disputes/status/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dispute_id: disputeId.trim(),
          customer_email: email.trim(),
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || payload.message || 'Failed to send verification code');
      }

      setOtpRequested(true);
      setOtpExpiresAt(payload.expires_at || null);
      setSuccessMessage('Verification code sent. Enter it below to view status.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Failed to send verification code'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyStatus = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!otpCode.trim()) {
      setErrorMessage('Verification code is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/disputes/status/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dispute_id: disputeId.trim(),
          customer_email: email.trim(),
          otp_code: otpCode.trim(),
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || payload.message || 'Failed to verify dispute status');
      }

      setStatusData(payload);
      setSuccessMessage('Dispute status retrieved successfully.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Failed to verify dispute status'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 md:p-8 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.35)]">
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold">Secure status lookup</p>
        <h2 className="text-xl font-bold text-gray-900 mt-1">Dispute status verification</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Dispute Reference</span>
          <input
            value={disputeId}
            onChange={(e) => setDisputeId(e.target.value)}
            placeholder="Dispute ID"
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

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={requestOtp}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : otpRequested ? 'Resend code' : 'Send verification code'}
        </button>
      </div>

      {otpRequested && (
        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-3 text-xs text-violet-700">
            {otpExpiresAt
              ? `Verification code expires at ${new Date(otpExpiresAt).toLocaleString()}.`
              : 'Enter your verification code to continue.'}
          </div>

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

          <button
            onClick={verifyStatus}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Verifying...' : 'Verify and view status'}
          </button>
        </div>
      )}

      {statusData && (
        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-gray-900">Dispute {statusData.id}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusPill(statusData.status)}`}>
              {prettyStatus(statusData.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p className="text-gray-600">Payment: <span className="font-mono text-gray-800">{statusData.payment_id}</span></p>
            <p className="text-gray-600">Type: <span className="capitalize text-gray-800">{prettyType(statusData.dispute_type)}</span></p>
            <p className="text-gray-600">Opened: <span className="text-gray-800">{new Date(statusData.opened_at).toLocaleString()}</span></p>
            <p className="text-gray-600">Resolved: <span className="text-gray-800">{statusData.resolved_at ? new Date(statusData.resolved_at).toLocaleString() : 'Not yet resolved'}</span></p>
          </div>

          {statusData.resolution_notes && (
            <div className="rounded-xl border border-gray-200 bg-white px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Resolution Notes</p>
              <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{statusData.resolution_notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
