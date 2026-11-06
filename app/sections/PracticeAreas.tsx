import { useState } from 'react';
import { ArrowRight, Check, Gavel, Globe, Scale, Shield, ShieldAlert, Users, type LucideIcon } from 'lucide-react';
import { PRACTICE_AREAS, PRACTICE_FILTERS, type PracticeFilterId } from '~/data/firm';
import type { PracticeArea } from '~/types';

interface PracticeAreasProps {
  onSelectPractice: (practice: PracticeArea) => void;
  onBookConsultation: (practiceAreaId: string) => void;
}

const ICONS: Record<string, LucideIcon> = { Globe, Shield, Scale, Users, Gavel, ShieldAlert };

export function filterPracticeAreas(filterId: PracticeFilterId): PracticeArea[] {
  const filter = PRACTICE_FILTERS.find((f) => f.id === filterId);
  const ids: readonly string[] | null = filter?.areaIds ?? null;
  return ids ? PRACTICE_AREAS.filter((p) => ids.includes(p.id)) : PRACTICE_AREAS;
}

export function PracticeAreas({ onSelectPractice, onBookConsultation }: PracticeAreasProps) {
  const [activeFilter, setActiveFilter] = useState<PracticeFilterId>('all');
  const filteredAreas = filterPracticeAreas(activeFilter);

  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-title"
      className="border-b border-stone-200 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-ink">
              Comprehensive Legal Representation
            </p>
            <h2 id="practice-areas-title" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Our Practice Areas
            </h2>
            <p className="mt-3 text-base font-light leading-relaxed text-stone-600">
              Attorney Osei K. Prempeh provides focused, experienced legal representation across core disciplines,
              tailoring litigation and mediation strategies to protect your family, freedom, and business ventures.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter practice areas"
            className="flex flex-wrap items-center gap-1.5 self-start rounded-xl border border-stone-200 bg-stone-100 p-1 md:self-auto"
          >
            {PRACTICE_FILTERS.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-[36px] cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink ${
                    active ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAreas.map((practice, index) => {
            const isMarquee = index === 0 && activeFilter === 'all';
            const Icon = ICONS[practice.iconName] ?? Scale;
            return (
              <li
                key={practice.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:shadow-xl focus-within:shadow-xl sm:p-7 ${
                  isMarquee
                    ? 'border-stone-300 bg-gradient-to-br from-white via-stone-50/60 to-stone-100/40 lg:col-span-2'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 bg-accent opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                      <Icon className="h-5 w-5 text-accent-ink" aria-hidden="true" />
                    </div>
                    {practice.casesCount && (
                      <span className="font-mono text-xs font-medium tracking-tight text-stone-600">
                        {practice.casesCount}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-ink sm:text-2xl">{practice.title}</h3>
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-stone-600">{practice.shortDesc}</p>

                  <ul className="mt-5 space-y-1.5 border-t border-stone-100 pt-4">
                    {practice.keyServices.slice(0, isMarquee ? 4 : 3).map((service) => (
                      <li key={service} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="h-3.5 w-3.5 shrink-0 text-accent-ink" aria-hidden="true" />
                        <span className="line-clamp-1">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectPractice(practice)}
                    className="flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm text-xs font-semibold text-accent-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
                    aria-label={`View details: ${practice.title}`}
                  >
                    <span>View Details</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookConsultation(practice.id)}
                    className="min-h-[44px] cursor-pointer rounded-lg bg-brand px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2"
                    aria-label={`Request a ${practice.title} consultation`}
                  >
                    Consult
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
