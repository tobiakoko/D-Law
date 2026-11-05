import { CONTACT_INFO } from '~/data/firm';
import { useSiteActions } from '~/routes/layout';
import { AboutAttorney } from '~/sections/AboutAttorney';
import { FaqSection } from '~/sections/FaqSection';
import { FeeTransparency } from '~/sections/FeeTransparency';
import { Hero } from '~/sections/Hero';
import { PracticeAreas } from '~/sections/PracticeAreas';
import { QuickAssessment } from '~/sections/QuickAssessment';
import { Testimonials } from '~/sections/Testimonials';
import { VerdictsTicker } from '~/sections/VerdictsTicker';
import type { Route } from './+types/home';

const TITLE = `${CONTACT_INFO.attorneyName}, P.A. — Attorney, Mediator & Counselor at Law | ${CONTACT_INFO.city}, FL`;
const DESCRIPTION = `${CONTACT_INFO.officeName} in ${CONTACT_INFO.city}, Florida: immigration, personal injury, international business, family law, contract disputes and criminal defense. Call ${CONTACT_INFO.phone} to request a consultation.`;

export function meta(_: Route.MetaArgs) {
  return [
    { title: TITLE },
    { name: 'description', content: DESCRIPTION },
    { tagName: 'link', rel: 'canonical', href: `${CONTACT_INFO.siteUrl}/` },

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: CONTACT_INFO.officeName },
    { property: 'og:url', content: `${CONTACT_INFO.siteUrl}/` },
    { property: 'og:title', content: TITLE },
    { property: 'og:description', content: DESCRIPTION },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: TITLE },
    { name: 'twitter:description', content: DESCRIPTION },
  ];
}

export default function Home() {
  const { openConsultation, openPracticeDetail } = useSiteActions();
  const openGeneral = () => openConsultation();

  return (
    <>
      <Hero onOpenConsultation={openGeneral} />
      <VerdictsTicker onOpenConsultation={openConsultation} />
      <QuickAssessment onSelectPracticeAndBook={openConsultation} />
      <PracticeAreas onSelectPractice={openPracticeDetail} onBookConsultation={openConsultation} />
      <AboutAttorney />
      <FeeTransparency onOpenConsultation={openConsultation} />
      <Testimonials />
      <FaqSection onOpenConsultation={openGeneral} />
    </>
  );
}
