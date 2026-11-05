import { ArrowRight, Calendar, CheckCircle, FileText, Phone, X } from 'lucide-react';
import { Modal } from '~/components/Modal';
import { CONTACT_INFO } from '~/data/firm';
import type { PracticeArea } from '~/types';

interface PracticeAreaModalProps {
  practiceArea: PracticeArea | null;
  onClose: () => void;
  onBookConsultation: (practiceAreaId: string) => void;
}

const TITLE_ID = 'practice-modal-title';
const DESC_ID = 'practice-modal-desc';

export function PracticeAreaModal({ practiceArea, onClose, onBookConsultation }: PracticeAreaModalProps) {
  return (
    <Modal
      open={practiceArea !== null}
      onClose={onClose}
      labelledBy={TITLE_ID}
      describedBy={DESC_ID}
      panelClassName="max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
    >
      {practiceArea && (
        <>
          <div className="relative bg-brand p-6 text-stone-100 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-hover">Practice Area</p>
            <h2 id={TITLE_ID} className="pr-12 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {practiceArea.title}
            </h2>
            <p id={DESC_ID} className="mt-2 text-sm leading-relaxed text-stone-300">
              {practiceArea.shortDesc}
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded border border-accent-hover/30 bg-accent-hover/15 px-3 py-1 font-mono text-xs font-medium text-accent-hover">
              {practiceArea.casesCount}
            </p>
          </div>

          <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6 text-stone-800 sm:p-8">
            <div>
              <h3 className="mb-2 font-sans text-xs font-bold uppercase tracking-wider text-stone-600">Our Approach</h3>
              <p className="text-sm leading-relaxed text-stone-700">{practiceArea.overview}</p>
            </div>

            <div>
              <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-stone-600">
                Key Matters We Handle
              </h3>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {practiceArea.keyServices.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-2.5 rounded-xl border border-stone-200/80 bg-stone-50 p-3 text-xs leading-snug text-stone-800"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-cream-200 bg-cream-100 p-4">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-900">
                    Client Outcomes
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-700">{practiceArea.clientOutcomes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-stone-200 bg-stone-50 p-4 sm:flex-row sm:p-6">
            <a
              href={`tel:${CONTACT_INFO.phoneTel}`}
              className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink sm:w-auto"
            >
              <Phone className="h-4 w-4 text-accent-ink" aria-hidden="true" />
              <span>Call {CONTACT_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => onBookConsultation(practiceArea.id)}
              className="flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-brand-surface hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 sm:w-auto"
            >
              <Calendar className="h-4 w-4 text-accent-hover" aria-hidden="true" />
              <span>Request {practiceArea.title} Consultation</span>
              <ArrowRight className="h-4 w-4 text-accent-hover" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
