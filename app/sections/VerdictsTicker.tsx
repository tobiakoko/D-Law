import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Scale } from 'lucide-react';
import { CASE_RESULTS, LEGAL_NOTICES } from '~/data/firm';

interface VerdictsTickerProps {
  onOpenConsultation: (practiceAreaId?: string) => void;
}

const ALL = 'all';
const CATEGORIES = [ALL, ...new Set(CASE_RESULTS.map((r) => r.category))];

export function VerdictsTicker({ onOpenConsultation }: VerdictsTickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);

  const filtered =
    selectedCategory === ALL ? CASE_RESULTS : CASE_RESULTS.filter((r) => r.category === selectedCategory);

  return (
    <section
      id="case-results"
      aria-labelledby="case-results-title"
      className="border-b border-stone-200 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-stone-200 pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-ink">
              <Scale className="h-4 w-4" aria-hidden="true" />
              <span>Representative Matters</span>
            </p>
            <h2 id="case-results-title" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Notable Outcomes & Settlements
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-light text-stone-600">
              Results in Florida circuit courts, federal administrative agencies, and mediation.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter case results by practice area"
            className="flex flex-wrap items-center gap-1.5 self-start rounded-xl border border-stone-200 bg-stone-100 p-1 md:self-auto"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[36px] cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink ${
                    active ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat === ALL ? 'All Results' : cat}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((result) => (
            <li
              key={result.id}
              className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-stone-50/70 p-6 transition-all duration-200 hover:border-stone-400 hover:bg-white hover:shadow-lg focus-within:border-stone-400 focus-within:bg-white"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[11px] text-stone-500">
                  <span className="font-semibold uppercase tracking-wider text-stone-700">{result.category}</span>
                  <span className="text-right">{result.courtOrAgency}</span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">{result.headline}</h3>
                <p className="mt-2.5 text-xs font-light leading-relaxed text-stone-600 sm:text-sm">{result.matter}</p>

                <div className="mt-4 flex items-start gap-2 border-t border-stone-200 pt-3 text-xs font-medium text-stone-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>{result.outcome}</span>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(result.practiceAreaId)}
                  className="flex min-h-[44px] cursor-pointer items-center gap-1 rounded-sm text-xs font-semibold text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
                >
                  <span>Discuss a Similar Matter</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic text-stone-600">
          * {LEGAL_NOTICES.resultsDisclaimer}
        </p>
      </div>
    </section>
  );
}
