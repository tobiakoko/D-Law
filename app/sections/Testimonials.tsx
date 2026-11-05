import { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { LEGAL_NOTICES, TESTIMONIALS, TESTIMONIAL_HIGHLIGHTS } from '~/data/firm';

const pad = (n: number) => String(n).padStart(2, '0');

/** Manual-only carousel (no auto-rotate). */
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = TESTIMONIALS.length;
  const prev = () => setActiveIndex((i) => (i === 0 ? count - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === count - 1 ? 0 : i + 1));
  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="border-b border-white/10 bg-brand py-16 text-stone-100 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Client Voices</p>
              <h2 id="testimonials-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trusted by Families & Businesses Across Florida
              </h2>
            </div>

            <p className="text-sm font-light leading-relaxed text-stone-300 sm:text-base">
              We measure success by the peace of mind and restored dignity our clients experience.
            </p>

            <ul className="space-y-3 border-t border-stone-800 pt-4">
              {TESTIMONIAL_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-xs text-stone-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={prev}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-stone-700 bg-black/30 text-stone-300 transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="px-2 font-mono text-xs text-stone-400">
                <span className="sr-only">Review </span>
                {pad(activeIndex + 1)} / {pad(count)}
              </p>
              <button
                type="button"
                onClick={next}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-stone-700 bg-black/30 text-stone-300 transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure aria-live="polite" className="relative rounded-2xl border border-white/10 bg-brand-surface p-7 shadow-2xl sm:p-10">
              <Quote className="mb-6 h-10 w-10 text-accent opacity-30" aria-hidden="true" />

              <div className="mb-4 flex items-center gap-1" role="img" aria-label={`Rated ${current.rating} out of 5`}>
                {Array.from({ length: current.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-accent" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="font-serif text-lg italic leading-relaxed text-white sm:text-xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800/80 pt-6">
                <div>
                  <div className="text-base font-bold text-stone-100">{current.clientName}</div>
                  <div className="mt-0.5 text-xs font-semibold text-accent">{current.caseType ?? 'Former Client'}</div>
                </div>
                {current.outcome && (
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-stone-400">Result</div>
                    <div className="font-mono text-xs font-semibold text-emerald-400">{current.outcome}</div>
                  </div>
                )}
              </figcaption>
            </figure>

            <div className="mt-4 flex items-center justify-center gap-1 sm:justify-start">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="group flex h-6 cursor-pointer items-center px-1 focus-visible:outline-none"
                  aria-label={`Show review ${i + 1} of ${count}`}
                  aria-current={activeIndex === i ? 'true' : undefined}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand ${
                      activeIndex === i ? 'w-8 bg-accent' : 'w-2 bg-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="mt-4 text-[11px] italic text-stone-400">{LEGAL_NOTICES.testimonialsDisclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
