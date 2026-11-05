import { useState } from 'react';
import { Calendar, ChevronDown, HelpCircle, Phone, Search } from 'lucide-react';
import { CONTACT_INFO, FAQ_CATEGORIES, FAQ_ITEMS, type FaqFilterId } from '~/data/firm';
import type { FaqItem } from '~/types';

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export function filterFaqs(items: FaqItem[], query: string, category: FaqFilterId): FaqItem[] {
  const q = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      (q === '' || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)),
  );
}

export function FaqSection({ onOpenConsultation }: FaqSectionProps) {
  // Single-open accordion.
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FaqFilterId>('all');

  const filteredFaqs = filterFaqs(FAQ_ITEMS, searchQuery, activeCategory);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b border-cream-200 bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-ink">Clear & Honest Answers</p>
          <h2 id="faq-title" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
            Answers to common questions about consultations, fees, and timelines.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <label htmlFor="faq-search" className="sr-only">
              Search frequently asked questions
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-500"
              aria-hidden="true"
            />
            <input
              id="faq-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. fees, remote consultation, documents)"
              className="min-h-[46px] w-full rounded-xl border border-stone-300 bg-white pr-4 pl-10 text-sm text-stone-900 transition-all placeholder:text-stone-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent-ink"
            />
          </div>

          <div
            role="group"
            aria-label="Filter questions by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-cream-200 bg-cream-100 p-1"
          >
            {FAQ_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`min-h-[36px] cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink ${
                    active ? 'bg-white text-ink shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} shown
        </p>

        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <p className="rounded-xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
              No matching questions found for &ldquo;{searchQuery}&rdquo;. Call our office at{' '}
              <a href={`tel:${CONTACT_INFO.phoneTel}`} className="font-semibold text-accent-ink underline">
                {CONTACT_INFO.phone}
              </a>
              .
            </p>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              const buttonId = `faq-button-${item.id}`;
              const panelId = `faq-panel-${item.id}`;
              return (
                <div key={item.id} className="overflow-hidden rounded-xl border border-cream-200 bg-white">
                  <h3 className="font-sans">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-ink"
                    >
                      <span className="font-serif text-base font-bold text-ink sm:text-lg">{item.question}</span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                          isOpen ? 'rotate-180 bg-accent text-stone-950' : 'bg-cream-100 text-stone-600'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="border-t border-stone-100 bg-cream-50/60 px-5 pt-1 pb-5 text-sm leading-relaxed text-stone-700"
                  >
                    {item.answer}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-brand p-6 text-center text-stone-100 sm:p-8">
          <div className="mx-auto max-w-xl space-y-3">
            <HelpCircle className="mx-auto mb-1 h-8 w-8 text-accent-hover" aria-hidden="true" />
            <h3 className="text-xl font-bold text-white sm:text-2xl">Still Have Questions About Your Case?</h3>
            <p className="text-xs font-light leading-relaxed text-stone-300 sm:text-sm">
              Every legal circumstance has unique facts. Contact Attorney Prempeh directly to discuss your options.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-md transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] sm:w-auto"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Schedule Consultation
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneTel}`}
                className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-stone-700 bg-white/5 px-5 py-2.5 text-xs font-semibold text-stone-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
              >
                <Phone className="h-4 w-4 text-accent-hover" aria-hidden="true" />
                Call {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
