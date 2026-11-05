import { useRef, useState, type KeyboardEvent } from 'react';
import { Award, Compass, GraduationCap, HeartHandshake, MapPin, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, CREDENTIALS, FIRM_MOTTO, JOURNEY_MILESTONES } from '~/data/firm';

export const ABOUT_TABS = [
  { id: 'journey', label: 'The Journey & Background' },
  { id: 'credentials', label: 'Credentials & Licenses' },
  { id: 'philosophy', label: 'Practice Philosophy' },
] as const;

type TabId = (typeof ABOUT_TABS)[number]['id'];

const VALUES = [
  { id: 'compassion', Icon: HeartHandshake, title: 'Compassion', text: 'Deeply understanding the human and family stakes behind every court filing and visa petition.' },
  { id: 'integrity', Icon: ShieldCheck, title: 'Integrity', text: 'Honest, transparent assessments from day one with no inflated promises or hidden billing surprises.' },
  { id: 'precision', Icon: Compass, title: 'Precision', text: 'Meticulous legal research, rigorous contract drafting, and trial-ready preparation.' },
];

const CREDENTIAL_ICONS = { education: GraduationCap, license: Award, location: MapPin } as const;

export function AboutAttorney() {
  const [activeTab, setActiveTab] = useState<TabId>('journey');
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ journey: null, credentials: null, philosophy: null });

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = ABOUT_TABS.findIndex((t) => t.id === activeTab);
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = (index + 1) % ABOUT_TABS.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + ABOUT_TABS.length) % ABOUT_TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = ABOUT_TABS.length - 1;
    if (next === null) return;
    event.preventDefault();
    const id = ABOUT_TABS[next].id;
    setActiveTab(id);
    tabRefs.current[id]?.focus();
  };

  const panelProps = (id: TabId) => ({
    id: `about-panel-${id}`,
    role: 'tabpanel' as const,
    'aria-labelledby': `about-tab-${id}`,
    tabIndex: 0,
    hidden: activeTab !== id,
  });

  return (
    <section id="about-attorney" aria-labelledby="about-title" className="border-b border-stone-200 bg-stone-50/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-ink">The Advocate Behind Your Rights</p>
          <h2 id="about-title" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Attorney {CONTACT_INFO.attorneyName}
          </h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-stone-600">{CONTACT_INFO.attorneyTitle}</p>
          <p className="mt-4 text-base font-light leading-relaxed text-stone-600">
            Combining over two decades of courtroom depth with firsthand understanding of the immigrant and working-family
            experience. A legal practice founded on respect, honest communication, and tireless preparation.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <div
            role="tablist"
            aria-label="About Attorney Prempeh"
            className="inline-flex flex-wrap justify-center rounded-xl border border-stone-200 bg-stone-100 p-1"
          >
            {ABOUT_TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  id={`about-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`about-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={onTabKeyDown}
                  className={`min-h-[44px] cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink sm:px-6 sm:text-sm ${
                    selected ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div {...panelProps('journey')} className="mx-auto max-w-4xl rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink">
          <ol className="relative space-y-8 border-l-2 border-accent/50 pl-6 sm:space-y-10 sm:pl-8">
            {JOURNEY_MILESTONES.map((m) => (
              <li key={m.id} className="group relative">
                <span
                  className="absolute top-1 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-accent shadow-xs transition-transform group-hover:scale-125 sm:-left-[39px]"
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-stone-200 bg-white p-5 transition-all hover:shadow-md sm:p-6">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">{m.period}</span>
                    <span className="rounded bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">{m.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink sm:text-xl">{m.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-stone-600">{m.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div {...panelProps('credentials')} className="mx-auto max-w-4xl rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink">
          <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {CREDENTIALS.map((cred) => {
              const Icon = CREDENTIAL_ICONS[cred.type];
              return (
                <li key={`${cred.institution}-${cred.degree}`} className="flex flex-col rounded-xl border border-stone-200 bg-white p-6 transition-all hover:shadow-md">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {cred.year && <span className="font-mono text-xs font-semibold text-stone-600">{cred.year}</span>}
                  </div>
                  <h3 className="text-base font-bold text-ink sm:text-lg">{cred.degree}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-ink">{cred.institution}</p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600">{cred.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div {...panelProps('philosophy')} className="mx-auto max-w-3xl space-y-6 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink">
          <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand p-8 text-stone-100 sm:p-10">
            <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-accent opacity-20 blur-3xl" aria-hidden="true" />
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">Core Commitment</p>
            <blockquote className="font-serif text-xl italic leading-relaxed text-white sm:text-2xl">&ldquo;{FIRM_MOTTO}&rdquo;</blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-wider text-stone-400">— {CONTACT_INFO.officeName}</figcaption>
          </figure>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {VALUES.map(({ id, Icon, title, text }) => (
              <li key={id} className="rounded-xl border border-stone-200 bg-white p-5">
                <Icon className="mb-3 h-6 w-6 text-accent-ink" aria-hidden="true" />
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
