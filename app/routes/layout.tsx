import { useCallback, useMemo, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router';
import { ConsultationModal } from '~/components/ConsultationModal';
import { MobileBottomBar } from '~/components/MobileBottomBar';
import { PracticeAreaModal } from '~/components/PracticeAreaModal';
import { Footer } from '~/sections/Footer';
import { Navbar } from '~/sections/Navbar';
import type { PracticeArea } from '~/types';

export interface SiteActions {
  openConsultation: (practiceAreaId?: string) => void;
  openPracticeDetail: (practice: PracticeArea) => void;
}

/** Child routes call this to open the shared modals hosted by the layout. */
export function useSiteActions() {
  return useOutletContext<SiteActions>();
}

interface ConsultationState {
  open: boolean;
  practiceAreaId?: string;
  /** Bumped on every open so the form remounts with fresh state. */
  session: number;
}

export default function Layout() {
  const [consultation, setConsultation] = useState<ConsultationState>({ open: false, session: 0 });
  const [practiceDetail, setPracticeDetail] = useState<PracticeArea | null>(null);

  const openConsultation = useCallback((practiceAreaId?: string) => {
    setPracticeDetail(null);
    setConsultation((s) => ({ open: true, practiceAreaId, session: s.session + 1 }));
  }, []);
  const openGeneralConsultation = useCallback(() => openConsultation(), [openConsultation]);
  const closeConsultation = useCallback(() => setConsultation((s) => ({ ...s, open: false })), []);
  const closePracticeDetail = useCallback(() => setPracticeDetail(null), []);

  const actions = useMemo<SiteActions>(
    () => ({ openConsultation, openPracticeDetail: setPracticeDetail }),
    [openConsultation],
  );

  return (
    <div id="top" className="flex min-h-screen flex-col bg-canvas font-sans text-stone-900">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-stone-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>

      <Navbar onOpenConsultation={openGeneralConsultation} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet context={actions} />
      </main>

      <Footer onOpenConsultation={openConsultation} />
      <MobileBottomBar onOpenConsultation={openGeneralConsultation} />

      <ConsultationModal
        key={consultation.session}
        isOpen={consultation.open}
        onClose={closeConsultation}
        initialPracticeArea={consultation.practiceAreaId}
      />
      <PracticeAreaModal
        practiceArea={practiceDetail}
        onClose={closePracticeDetail}
        onBookConsultation={openConsultation}
      />
    </div>
  );
}
