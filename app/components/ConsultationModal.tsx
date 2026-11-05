import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Calendar, Mail, MapPin, Phone, Send, Video, X } from 'lucide-react';
import { Modal } from '~/components/Modal';
import {
  CONSULTATION_TIME_SLOTS,
  CONTACT_INFO,
  DEFAULT_PRACTICE_AREA_ID,
  LEGAL_NOTICES,
  PRACTICE_AREAS,
} from '~/data/firm';
import type { ConsultationRequest, ConsultationType } from '~/types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPracticeArea?: string;
}

type Step = 1 | 2 | 3;
export type ConsultationStatus = 'editing' | 'sent' | 'error';

const TITLE_ID = 'consultation-title';
const NOTES_MAX = 1000;

const FORMAT_OPTIONS: { id: ConsultationType; label: string; sub: string; Icon: typeof MapPin }[] = [
  { id: 'in-person', label: `${CONTACT_INFO.city} Office`, sub: CONTACT_INFO.address, Icon: MapPin },
  { id: 'video', label: 'Video Call', sub: 'Link sent by the office', Icon: Video },
  { id: 'phone', label: 'Phone Call', sub: 'Office calls you back', Icon: Phone },
];

const FORMAT_LABELS: Record<ConsultationType, string> = {
  'in-person': `In person (${CONTACT_INFO.city} office)`,
  video: 'Video call',
  phone: 'Phone call',
};

const STEPS: { step: Step; label: string }[] = [
  { step: 1, label: 'Matter & Format' },
  { step: 2, label: 'Date & Time' },
  { step: 3, label: 'Your Details' },
];

/** yyyy-mm-dd in the visitor's local time zone (toISOString would use UTC). */
function localIsoDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function practiceTitle(id: string): string {
  return PRACTICE_AREAS.find((p) => p.id === id)?.title ?? id;
}

/**
 * Build the mailto: link that hands the request to the visitor's own mail app,
 * addressed to the firm. Nothing is sent by this site.
 */
export function buildConsultationMailto(data: ConsultationRequest, to: string = CONTACT_INFO.email): string {
  const area = practiceTitle(data.practiceArea);
  const subject = `Consultation request: ${area} — ${data.fullName.trim()}`;
  const body = [
    'Hello,',
    '',
    'I would like to request a consultation.',
    '',
    `Name: ${data.fullName.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Email: ${data.email.trim()}`,
    `Practice area: ${area}`,
    `Preferred date: ${data.preferredDate}`,
    `Preferred time: ${data.preferredTime} (Eastern)`,
    `Format: ${FORMAT_LABELS[data.consultationType]}`,
    '',
    'Brief description:',
    data.briefNotes.trim() || '(none provided)',
    '',
    '— Sent from the request form at oseiprempeh.com',
  ].join('\r\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  'w-full min-h-[46px] rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-accent-ink';
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700';
const primaryBtn =
  'flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
const secondaryBtn =
  'min-h-[48px] cursor-pointer rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink';
const choiceClass =
  'flex cursor-pointer rounded-xl border p-3 transition-all hover:bg-stone-50 has-[:checked]:border-accent has-[:checked]:bg-cream-50 has-[:checked]:ring-1 has-[:checked]:ring-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-ink border-stone-200';

export function ConsultationModal({ isOpen, onClose, initialPracticeArea }: ConsultationModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<ConsultationStatus>('editing');
  const [mailtoHref, setMailtoHref] = useState('');
  const [formData, setFormData] = useState<ConsultationRequest>(() => ({
    fullName: '',
    phone: '',
    email: '',
    practiceArea: initialPracticeArea ?? DEFAULT_PRACTICE_AREA_ID,
    preferredDate: localIsoDate(2),
    preferredTime: CONSULTATION_TIME_SLOTS[1],
    consultationType: 'in-person',
    briefNotes: '',
  }));

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const lastView = useRef(`${step}:${status}`);

  // Move focus to the new step's heading so screen-reader users hear the change.
  // Compare with the last view (not "first render") so StrictMode re-runs are no-ops.
  useEffect(() => {
    const view = `${step}:${status}`;
    if (view === lastView.current) return;
    lastView.current = view;
    (status === 'editing' ? stepHeadingRef : resultHeadingRef).current?.focus();
  }, [step, status]);

  const update = <K extends keyof ConsultationRequest>(key: K, value: ConsultationRequest[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step !== 3) return;
    const href = buildConsultationMailto(formData);
    setMailtoHref(href);
    try {
      window.location.href = href;
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const contactFallbacks = (
    <div className="flex flex-col gap-2 border-t border-stone-200 bg-stone-50 px-6 py-4 text-xs text-stone-700 sm:flex-row sm:items-center sm:justify-between">
      <span>Prefer to reach us directly?</span>
      <span className="flex flex-wrap gap-x-4 gap-y-1">
        <a href={`tel:${CONTACT_INFO.phoneTel}`} className="inline-flex min-h-[32px] items-center gap-1.5 rounded-sm font-semibold text-accent-ink underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {CONTACT_INFO.phone}
        </a>
        <a href={`mailto:${CONTACT_INFO.email}`} className="inline-flex min-h-[32px] items-center gap-1.5 rounded-sm font-semibold text-accent-ink underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink">
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          {CONTACT_INFO.email}
        </a>
      </span>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      labelledBy={TITLE_ID}
      panelClassName="max-w-xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
    >
      <div className="relative border-b border-brand-surface bg-brand p-6 text-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close consultation request"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
        <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-hover">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Consultation Request</span>
        </p>
        <h2 id={TITLE_ID} className="pr-12 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Schedule a Consultation
        </h2>
        <p className="mt-1 text-xs text-stone-300">
          Your request opens as a pre-filled email to our office. The office will reply to confirm a time.
        </p>
      </div>

      {status === 'editing' ? (
        <form onSubmit={handleSubmit} className="space-y-5 p-6 text-stone-800">
          <ol className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3 text-xs">
            {STEPS.map(({ step: s, label }) => (
              <li
                key={s}
                aria-current={step === s ? 'step' : undefined}
                className={`font-semibold ${step >= s ? 'text-ink' : 'text-stone-500'}`}
              >
                {s}. {label}
              </li>
            ))}
          </ol>

          {step === 1 && (
            <div className="space-y-4">
              <h3 ref={stepHeadingRef} tabIndex={-1} className="sr-only">
                Step 1 of 3: Matter and format
              </h3>
              <div>
                <label htmlFor="consult-practice" className={labelClass}>
                  Practice Area
                </label>
                <select
                  id="consult-practice"
                  value={formData.practiceArea}
                  onChange={(e) => update('practiceArea', e.target.value)}
                  className={inputClass}
                >
                  {PRACTICE_AREAS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className={labelClass}>Consultation Format</legend>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {FORMAT_OPTIONS.map(({ id, label, sub, Icon }) => (
                    <label key={id} className={`${choiceClass} min-h-[50px] flex-col justify-center`}>
                      <input
                        type="radio"
                        name="consultationType"
                        value={id}
                        checked={formData.consultationType === id}
                        onChange={() => update('consultationType', id)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                        <Icon className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                        {label}
                      </span>
                      <span className="mt-0.5 text-[11px] text-stone-600">{sub}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button type="button" onClick={() => setStep(2)} className={`${primaryBtn} w-full`}>
                <span>Continue to Date & Time</span>
                <ArrowRight className="h-4 w-4 text-accent-hover" aria-hidden="true" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 ref={stepHeadingRef} tabIndex={-1} className="sr-only">
                Step 2 of 3: Preferred date and time
              </h3>
              <div>
                <label htmlFor="consult-date" className={labelClass}>
                  Preferred Date
                </label>
                <input
                  id="consult-date"
                  type="date"
                  required
                  min={localIsoDate()}
                  value={formData.preferredDate}
                  onChange={(e) => update('preferredDate', e.target.value)}
                  className={inputClass}
                />
              </div>

              <fieldset>
                <legend className={labelClass}>Preferred Time (Eastern)</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CONSULTATION_TIME_SLOTS.map((time) => (
                    <label key={time} className={`${choiceClass} min-h-[42px] items-center justify-center text-xs font-medium text-stone-700`}>
                      <input
                        type="radio"
                        name="preferredTime"
                        value={time}
                        checked={formData.preferredTime === time}
                        onChange={() => update('preferredTime', time)}
                        className="sr-only"
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </fieldset>
              <p className="text-[11px] text-stone-600">
                This is a preference, not a booking. The office will confirm availability.
              </p>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setStep(1)} className={`${secondaryBtn} w-1/3`}>
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.preferredDate}
                  className={`${primaryBtn} w-2/3`}
                >
                  <span>Continue to Your Details</span>
                  <ArrowRight className="h-4 w-4 text-accent-hover" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 ref={stepHeadingRef} tabIndex={-1} className="sr-only">
                Step 3 of 3: Your contact details
              </h3>
              <div>
                <label htmlFor="consult-name" className={labelClass}>
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="consult-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="consult-phone" className={labelClass}>
                    Phone <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="consult-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="consult-email" className={labelClass}>
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="consult-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="consult-notes" className={labelClass}>
                  Brief Description (optional)
                </label>
                <textarea
                  id="consult-notes"
                  rows={3}
                  maxLength={NOTES_MAX}
                  aria-describedby="consult-notice"
                  placeholder="General type of matter and any upcoming deadline or court date"
                  value={formData.briefNotes}
                  onChange={(e) => update('briefNotes', e.target.value)}
                  className={`${inputClass} p-3`}
                />
              </div>

              <p id="consult-notice" className="rounded-lg bg-cream-100 p-3 text-[11px] leading-relaxed text-stone-700">
                {LEGAL_NOTICES.formNotice}
              </p>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setStep(2)} className={`${secondaryBtn} w-1/3`}>
                  Back
                </button>
                <button
                  type="submit"
                  className="flex min-h-[48px] w-2/3 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent text-xs font-bold uppercase tracking-wider text-stone-950 shadow-md transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Open Email to Send</span>
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-5 p-6 text-center sm:p-8" role="status">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cream-200 bg-cream-50 text-accent-ink">
            <Mail className="h-7 w-7" aria-hidden="true" />
          </div>

          {status === 'sent' ? (
            <div>
              <h3 ref={resultHeadingRef} tabIndex={-1} className="text-2xl font-bold text-ink focus:outline-none">
                One more step: press Send
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone-700">
                Your email app should have opened with your request addressed to{' '}
                <strong>{CONTACT_INFO.email}</strong>. Your request is <strong>not delivered</strong> until you press{' '}
                <strong>Send</strong> in your mail app. The office will reply to confirm a time.
              </p>
            </div>
          ) : (
            <div>
              <h3 ref={resultHeadingRef} tabIndex={-1} className="text-2xl font-bold text-ink focus:outline-none">
                We couldn&rsquo;t open your email app
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone-700">
                Please call the office or email us directly using the details below.
              </p>
            </div>
          )}

          <p className="text-xs text-stone-600">
            Didn&rsquo;t see an email draft? Your device may not have a mail app set up.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {mailtoHref && (
              <a
                href={mailtoHref}
                className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold text-stone-800 shadow-xs hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink sm:w-auto"
              >
                <Mail className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                <span>Open Email Again</span>
              </a>
            )}
            <button type="button" onClick={onClose} className={`${primaryBtn} w-full px-6 sm:w-auto`}>
              Done
            </button>
          </div>
        </div>
      )}

      {contactFallbacks}
    </Modal>
  );
}
