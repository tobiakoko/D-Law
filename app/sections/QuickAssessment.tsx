import { useState } from 'react';
import { ArrowRight, Calendar, Check, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { ASSESSMENT_TOPICS, CONTACT_INFO, URGENCY_OPTIONS, type UrgencyId } from '~/data/firm';

interface QuickAssessmentProps {
  onSelectPracticeAndBook: (practiceAreaId: string) => void;
}

export function QuickAssessment({ onSelectPracticeAndBook }: QuickAssessmentProps) {
  const [selectedTopic, setSelectedTopic] = useState(ASSESSMENT_TOPICS[0].id);
  const [urgency, setUrgency] = useState<UrgencyId>('immediate');

  const topicLabel = ASSESSMENT_TOPICS.find((t) => t.id === selectedTopic)?.label;

  const optionClass = (selected: boolean) =>
    `flex cursor-pointer flex-col justify-center rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink ${
      selected
        ? 'border-accent bg-stone-50 shadow-xs ring-1 ring-accent'
        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
    }`;

  return (
    <section aria-labelledby="assessment-title" className="border-b border-stone-200 bg-stone-50 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-ink">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Case Navigator</span>
          </p>
          <h2 id="assessment-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            How Can We Assist You Today?
          </h2>
          <p className="mt-2 text-sm font-light text-stone-600">
            Select your legal matter to request a consultation with Attorney Prempeh.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs sm:p-8">
          <fieldset className="mb-6">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-600">
              Step 1: Select Your Legal Area
            </legend>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {ASSESSMENT_TOPICS.map((t) => {
                const isSelected = selectedTopic === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTopic(t.id)}
                    className={`min-h-[58px] ${optionClass(isSelected)}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-900">{t.label}</span>
                      {isSelected && <Check className="h-4 w-4 text-accent-ink" aria-hidden="true" />}
                    </span>
                    <span className="mt-0.5 line-clamp-1 text-[11px] text-stone-600">{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mb-8 border-t border-stone-100 pt-4">
            <legend className="mb-3 pt-4 text-xs font-semibold uppercase tracking-wider text-stone-600">
              Step 2: Urgency & Timing
            </legend>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {URGENCY_OPTIONS.map((u) => {
                const isSelected = urgency === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setUrgency(u.id)}
                    className={`min-h-[52px] ${optionClass(isSelected)}`}
                  >
                    <span className="text-xs font-semibold text-stone-900">{u.label}</span>
                    <span className="mt-0.5 text-[11px] text-stone-600">{u.sub}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-brand p-4 text-stone-100 sm:flex-row sm:p-5">
            <div className="flex items-start gap-3 text-center sm:text-left">
              <ShieldCheck className="mt-0.5 hidden h-5 w-5 shrink-0 text-accent sm:block" aria-hidden="true" />
              <div aria-live="polite">
                <div className="text-sm font-semibold text-white">
                  Attorney Prempeh is accepting new {topicLabel} matters.
                </div>
                <div className="mt-0.5 text-xs text-stone-300">
                  {urgency === 'immediate'
                    ? `Have a deadline or court date? Calling ${CONTACT_INFO.phone} is the fastest way to reach the office.`
                    : 'Request a consultation and the office will follow up to confirm a time.'}
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-2.5 sm:w-auto">
              <button
                type="button"
                onClick={() => onSelectPracticeAndBook(selectedTopic)}
                className="flex min-h-[46px] flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] sm:flex-initial"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Request Case Review</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneTel}`}
                className="flex min-h-[46px] min-w-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-700 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-stone-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Call the office at ${CONTACT_INFO.phone}`}
              >
                <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span className="hidden md:inline">Call Directly</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
