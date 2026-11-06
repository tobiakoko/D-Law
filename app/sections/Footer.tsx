import { ArrowUp, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { OfficialSeal } from '~/components/OfficialSeal';
import { CONTACT_INFO, LEGAL_NOTICES, PRACTICE_AREAS, PUBLISHED_CASE_RESULTS } from '~/data/firm';

interface FooterProps {
  onOpenConsultation: (practiceAreaId?: string) => void;
}

const FIRM_LINKS = [
  { label: 'About Attorney Prempeh', href: '#about-attorney' },
  ...(PUBLISHED_CASE_RESULTS.length > 0 ? [{ label: 'Notable Case Results', href: '#case-results' }] : []),
  { label: 'Fee Transparency', href: '#fee-transparency' },
  { label: 'Client Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const linkClass =
  'rounded-sm text-stone-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export function Footer({ onOpenConsultation }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-brand pt-16 pb-28 text-stone-300 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-stone-800 pb-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="flex items-center gap-3">
              <OfficialSeal size={50} decorative />
              <div>
                <p className="font-brand text-lg font-bold tracking-wider text-white">
                  {CONTACT_INFO.shortName.toUpperCase()}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {CONTACT_INFO.attorneyTitle}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-xs font-light leading-relaxed text-stone-400 sm:text-sm">
              Providing legal representation with integrity, seasoned expertise, and commitment to individuals,
              families, and enterprises.
            </p>

            <address className="space-y-2 pt-2 text-xs not-italic text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {CONTACT_INFO.address}, {CONTACT_INFO.cityStateZip}
                  <br />
                  <span className="text-stone-400">{CONTACT_INFO.poBox}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${CONTACT_INFO.phoneTel}`} className={linkClass}>
                  Office: {CONTACT_INFO.phone}
                </a>
                {CONTACT_INFO.cell && CONTACT_INFO.cellTel && (
                  <a href={`tel:${CONTACT_INFO.cellTel}`} className={linkClass}>
                    · Cell: {CONTACT_INFO.cell}
                  </a>
                )}
                {CONTACT_INFO.fax && <span>· Fax: {CONTACT_INFO.fax}</span>}
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${CONTACT_INFO.email}`} className={linkClass}>
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </address>
          </div>

          <nav aria-labelledby="footer-practice-title" className="space-y-3 lg:col-span-3">
            <h2 id="footer-practice-title" className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Practice Areas
            </h2>
            <ul className="space-y-2 text-xs">
              {PRACTICE_AREAS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(p.id)}
                    className={`${linkClass} cursor-pointer text-left`}
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-firm-title" className="space-y-3 lg:col-span-2">
            <h2 id="footer-firm-title" className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              The Firm
            </h2>
            <ul className="space-y-2 text-xs">
              {FIRM_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 lg:col-span-2">
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Quick Action</h2>
            <p className="text-xs text-stone-400">Request a consultation with Attorney Prempeh.</p>
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="min-h-[44px] w-full cursor-pointer rounded-lg bg-accent px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
            >
              Consultation
            </button>
            <a
              href="#top"
              className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-stone-800 px-3 py-2 text-xs text-stone-400 transition-colors hover:border-stone-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Top</span>
            </a>
          </div>
        </div>

        <div className="my-6 space-y-2 rounded-xl border border-stone-800 bg-stone-900/80 p-4 text-xs leading-relaxed text-stone-400">
          <p className="flex items-center gap-1.5 font-semibold text-stone-200">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>Legal Advertising Notice</span>
          </p>
          <p>{LEGAL_NOTICES.advertising}</p>
          <p>{LEGAL_NOTICES.resultsDisclaimer}</p>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 pt-2 text-center text-xs text-stone-400 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {CONTACT_INFO.officeName} All rights reserved.
          </p>
          <p className="text-[11px]">{CONTACT_INFO.licenseNotice}</p>
        </div>
      </div>
    </footer>
  );
}
