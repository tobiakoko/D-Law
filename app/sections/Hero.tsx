import { ArrowRight, Award, Calendar, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { OfficialSeal } from '~/components/OfficialSeal';
import { useTheme } from '~/context/ThemeContext';
import { CONTACT_INFO, FIRM_MOTTO, FIRM_STATS, HERO_HIGHLIGHTS } from '~/data/firm';

interface HeroProps {
  onOpenConsultation: () => void;
}

export function Hero({ onOpenConsultation }: HeroProps) {
  const { currentTheme } = useTheme();

  return (
    <section
      aria-labelledby="hero-title"
      className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-b pt-10 pb-14 text-stone-100 sm:pt-16 sm:pb-20 ${currentTheme.heroGradient}`}
    >
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[550px] w-[550px] rounded-full bg-accent opacity-15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-100px] h-[450px] w-[450px] rounded-full bg-blue-900 opacity-20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest">
              <span className="text-accent">{CONTACT_INFO.officeName}</span>
              <span aria-hidden="true" className="text-stone-500">
                ·
              </span>
              <span className="text-stone-300">{CONTACT_INFO.city}, Florida</span>
            </p>

            <h1
              id="hero-title"
              className="text-3xl font-bold leading-[1.1] tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-[3.6rem]"
            >
              Uncompromising Legal Advocacy. Over Two Decades of Trial Experience.
            </h1>

            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-stone-300 sm:text-lg">
              Attorney {CONTACT_INFO.attorneyName} brings seasoned courtroom depth and compassionate insight to
              individuals, families, and commercial ventures throughout Florida and across international borders. We
              protect your rights, your business, and your future.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 text-xs text-stone-300 sm:grid-cols-2 sm:text-sm">
              {HERO_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-xl transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand active:scale-[0.98]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Schedule Consultation</span>
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneTel}`}
                className="flex min-h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-stone-700 bg-white/5 px-6 py-3.5 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-500 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>Call {CONTACT_INFO.phone}</span>
              </a>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-stone-400">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>
                In-Person Consultations in {CONTACT_INFO.city} · Video & Phone Across Florida and Internationally
              </span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-brand-surface p-6 shadow-2xl sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4 rounded-full border border-white/15 bg-brand p-2 shadow-inner">
                  <OfficialSeal size={130} />
                </div>

                <p className="font-brand text-2xl font-bold tracking-wider text-white sm:text-3xl">
                  {CONTACT_INFO.attorneyName.toUpperCase()}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  Attorney, Mediator & Counselor at Law
                </p>

                <p className="mt-3 max-w-sm text-xs italic text-stone-300">&ldquo;{FIRM_MOTTO}&rdquo;</p>

                <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-stone-800 pt-5 text-left">
                  <div className="rounded-xl border border-stone-800 bg-black/30 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <Award className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span>Bar Admission</span>
                    </div>
                    <div className="mt-1 font-mono text-xs font-semibold text-stone-200">
                      Florida Bar · {CONTACT_INFO.barAdmissionDate.slice(0, 4)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-black/30 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span>Postgraduate Degree</span>
                    </div>
                    <div className="mt-1 font-mono text-xs font-semibold text-stone-200">Stetson Law LL.M.</div>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-between rounded-xl border border-accent/30 bg-accent/10 p-3 text-xs">
                  <div className="text-left">
                    <div className="font-semibold text-stone-200">Speak With the Office</div>
                    <div className="text-[11px] text-stone-400">{CONTACT_INFO.hours}</div>
                  </div>
                  <a
                    href={`tel:${CONTACT_INFO.phoneTel}`}
                    className="flex min-h-[36px] items-center gap-1 rounded-lg bg-accent px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-950 transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Call now: ${CONTACT_INFO.phone}`}
                  >
                    <span>Call Now</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-stone-800/80 pt-8 text-center sm:mt-18 md:grid-cols-4 md:text-left">
          {FIRM_STATS.map((stat, i) => (
            <div
              key={stat.id}
              className={`flex flex-col pr-4 ${i < FIRM_STATS.length - 1 ? 'md:border-r md:border-stone-800/80' : ''}`}
            >
              <dt className="order-2 mt-1 text-xs font-medium text-stone-200 sm:text-sm">{stat.label}</dt>
              <dd className="order-1 font-serif text-3xl font-bold tabular-nums text-accent sm:text-4xl">
                {stat.value}
              </dd>
              <dd className="order-3 mt-0.5 text-xs text-stone-400">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
