import { Calendar, Mail, Phone } from 'lucide-react';
import { CONTACT_INFO } from '~/data/firm';

interface MobileBottomBarProps {
  onOpenConsultation: () => void;
}

/** Sticky mobile action bar (hidden ≥ md). Kept under ~15% of viewport height. */
export function MobileBottomBar({ onOpenConsultation }: MobileBottomBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        <a
          href={`tel:${CONTACT_INFO.phoneTel}`}
          className="flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-semibold text-stone-200 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          aria-label={`Call the office at ${CONTACT_INFO.phone}`}
        >
          <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>Call Office</span>
        </a>

        <a
          href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent('Legal Inquiry from Website')}`}
          className="flex min-h-[46px] min-w-[46px] items-center justify-center rounded-xl border border-white/10 bg-black/40 px-3 text-stone-300 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          aria-label={`Email the office at ${CONTACT_INFO.email}`}
        >
          <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex min-h-[46px] flex-[1.5] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-accent text-xs font-bold uppercase tracking-wider text-stone-900 shadow-md transition-transform hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>Book Consult</span>
        </button>
      </div>
    </div>
  );
}
