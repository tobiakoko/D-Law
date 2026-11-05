import { CONTACT_INFO, PRACTICE_AREAS } from '~/data/firm';

export const OG_IMAGE = {
  // TODO(attorney): supply a 1200×630 share image; this is the firm's 500×500 logo.
  url: `${CONTACT_INFO.siteUrl}/og-image.png`,
  width: 500,
  height: 500,
  alt: `${CONTACT_INFO.officeName} logo`,
};

/** JSON-LD for the firm (schema.org LegalService + Attorney). */
export function firmJsonLd() {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.address,
    addressLocality: CONTACT_INFO.city,
    addressRegion: CONTACT_INFO.region,
    postalCode: CONTACT_INFO.postalCode,
    addressCountry: 'US',
  };
  const firmId = `${CONTACT_INFO.siteUrl}/#firm`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': firmId,
        name: CONTACT_INFO.officeName,
        url: `${CONTACT_INFO.siteUrl}/`,
        logo: OG_IMAGE.url,
        image: OG_IMAGE.url,
        telephone: CONTACT_INFO.phoneTel,
        email: CONTACT_INFO.email,
        address,
        // TODO(attorney): keep in sync with CONTACT_INFO.hours once confirmed.
        openingHours: 'Mo-Sa 08:00-20:00',
        areaServed: [
          { '@type': 'City', name: 'Tampa' },
          { '@type': 'AdministrativeArea', name: 'Hillsborough County, FL' },
          { '@type': 'AdministrativeArea', name: 'Pinellas County, FL' },
          { '@type': 'State', name: 'Florida' },
        ],
        knowsAbout: PRACTICE_AREAS.map((p) => p.title),
      },
      {
        '@type': 'Attorney',
        '@id': `${CONTACT_INFO.siteUrl}/#attorney`,
        name: CONTACT_INFO.attorneyName,
        url: `${CONTACT_INFO.siteUrl}/`,
        telephone: CONTACT_INFO.phoneTel,
        address,
        parentOrganization: { '@id': firmId },
      },
    ],
  };
}
