import { CheckCircle, DollarSign } from 'lucide-react';
import { FEE_PLANS } from '~/data/firm';

interface FeeTransparencyProps {
  onOpenConsultation: (practiceAreaId?: string) => void;
}

export function FeeTransparency({ onOpenConsultation }: FeeTransparencyProps) {
  return (
    <section id="fee-transparency" aria-labelledby="fees-title" className="border-b border-stone-200 bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-ink">
            <DollarSign className="h-4 w-4" aria-hidden="true" />
            <span>Straightforward Retainers</span>
          </p>
          <h2 id="fees-title" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Transparent Fee Philosophy
          </h2>
          <p className="mt-3 text-base font-light leading-relaxed text-stone-600">
            Every fee is explained upfront in a written agreement, so you know what to expect before work begins.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {FEE_PLANS.map((plan) => (
            <li
              key={plan.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md sm:p-7"
            >
              {plan.featured && <div className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />}
              <div>
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                    plan.featured ? 'bg-accent/20 text-accent-ink' : 'border border-stone-200 bg-stone-100 text-stone-800'
                  }`}
                  aria-hidden="true"
                >
                  {plan.badge}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">{plan.eyebrow}</p>
                <h3 className="mt-1 text-xl font-bold text-stone-900">{plan.title}</h3>
                <p className="mt-3 text-xs font-light leading-relaxed text-stone-600 sm:text-sm">{plan.description}</p>

                <ul className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-xs text-stone-700">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-stone-100 pt-4">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(plan.practiceAreaId)}
                  className={`min-h-[44px] w-full cursor-pointer rounded-xl py-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 ${
                    plan.featured
                      ? 'bg-brand font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-surface'
                      : 'border border-stone-300 font-semibold text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-stone-600">
          Fee arrangements are confirmed in writing after a consultation. Clients may remain responsible for case costs
          as described in the written agreement.
        </p>
      </div>
    </section>
  );
}
