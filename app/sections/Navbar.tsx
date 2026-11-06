import { useState } from 'react';
import { ArrowRight, Calendar, Menu, Phone, X } from 'lucide-react';
import { FirmLogo } from '~/components/FirmLogo';
import { Modal } from '~/components/Modal';
import { CONTACT_INFO } from '~/data/firm';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const NAV_LINKS = [
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Case Results', href: '#case-results' },
  { label: 'Attorney Profile', href: '#about-attorney' },
  { label: 'Fees', href: '#fee-transparency' },
  { label: 'FAQ', href: '#faq' },
] as const;

const DRAWER_TITLE_ID = 'mobile-nav-title';

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-brand/95 text-stone-100 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="group flex items-center gap-3 rounded-sm py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
            aria-label={`${CONTACT_INFO.officeName} — home`}
          >
            <FirmLogo
              size={44}
              className="shadow-sm ring-2 ring-accent-hover/40 transition-shadow group-hover:ring-accent-hover"
            />
            <span className="flex flex-col">
              <span className="whitespace-nowrap font-brand text-lg font-bold tracking-wider text-stone-100 transition-colors group-hover:text-accent-hover sm:text-xl">
                {CONTACT_INFO.attorneyName.toUpperCase()}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-stone-400">Attorney & Mediator at Law</span>
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm font-medium text-stone-300 lg:flex lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-sm py-1 transition-colors hover:text-accent-hover focus-visible:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 shadow-md transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] sm:inline-flex"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Schedule Consultation
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:bg-white/20 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'mobile-nav' : undefined}
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <Modal
        open={mobileMenuOpen}
        onClose={closeMenu}
        labelledBy={DRAWER_TITLE_ID}
        variant="drawer"
        panelClassName="border-l border-white/10 bg-brand text-stone-100 shadow-2xl"
      >
        <div id="mobile-nav" className="flex min-h-full flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-6">
              <div className="flex items-center gap-2.5">
                <FirmLogo size={36} className="ring-2 ring-accent/60" />
                <div>
                  <h2 id={DRAWER_TITLE_ID} className="font-brand text-base font-bold tracking-wide text-white">
                    {CONTACT_INFO.attorneyName}
                  </h2>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">Counselor at Law</div>
                </div>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-[48px] items-center justify-between rounded-lg px-3 text-base font-medium text-stone-200 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-stone-400" aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-3 border-t border-stone-800 pt-6 text-xs text-stone-400">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-stone-200">Office Location</div>
              <address className="not-italic text-stone-300">
                {CONTACT_INFO.address}
                <br />
                {CONTACT_INFO.cityStateZip}
              </address>
              <p>{CONTACT_INFO.poBox}</p>
              <p className="pt-2 font-medium text-accent">{CONTACT_INFO.licenseNotice}</p>
            </div>
          </div>

          <div className="mt-8 space-y-3 border-t border-stone-800 pt-6">
            <a
              href={`tel:${CONTACT_INFO.phoneTel}`}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900/80 text-sm font-medium text-stone-200 transition-colors hover:border-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              Call Office: {CONTACT_INFO.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenConsultation();
              }}
              className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Schedule Consultation
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
