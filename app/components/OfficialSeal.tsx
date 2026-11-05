import { useId } from 'react';
import { useTheme } from '~/context/ThemeContext';
import { CONTACT_INFO } from '~/data/firm';

interface OfficialSealProps {
  className?: string;
  size?: number;
  /** Decorative seals (next to visible firm name) should be hidden from AT. */
  decorative?: boolean;
}

export function OfficialSeal({ className = '', size = 120, decorative = false }: OfficialSealProps) {
  const { currentTheme } = useTheme();
  // Unique, URL-safe ids so multiple seals on one page don't collide.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const accentId = `seal-accent-${uid}`;
  const backdropId = `seal-bg-${uid}`;
  const topPathId = `seal-top-${uid}`;
  const bottomPathId = `seal-bottom-${uid}`;
  const accent = `url(#${accentId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...(decorative
        ? { 'aria-hidden': true, focusable: false }
        : { role: 'img', 'aria-label': `Seal of ${CONTACT_INFO.officeName}` })}
    >
      <defs>
        <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentTheme.accentHover} />
          <stop offset="50%" stopColor={currentTheme.accentColor} />
          <stop offset="100%" stopColor={currentTheme.accentInk} />
        </linearGradient>
        <linearGradient id={backdropId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentTheme.primarySurface} />
          <stop offset="100%" stopColor={currentTheme.primaryBg} />
        </linearGradient>
        <path id={topPathId} d="M 28,100 A 72,72 0 1,1 172,100" />
        <path id={bottomPathId} d="M 172,100 A 72,72 0 0,1 28,100" />
      </defs>

      <circle cx="100" cy="100" r="96" fill={`url(#${backdropId})`} stroke={accent} strokeWidth="2.5" />
      <circle cx="100" cy="100" r="91" stroke={accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
      <circle cx="100" cy="100" r="68" fill={currentTheme.primaryBg} stroke={accent} strokeWidth="1.5" />

      <text fill={accent} fontSize="8.2" fontWeight="700" letterSpacing="0.22em" fontFamily="Cinzel, serif">
        <textPath href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
          {CONTACT_INFO.shortName.toUpperCase()}
        </textPath>
      </text>
      <text fill={accent} fontSize="7" fontWeight="600" letterSpacing="0.18em" fontFamily="Cinzel, serif">
        <textPath href={`#${bottomPathId}`} startOffset="50%" textAnchor="middle">
          {`EST. ${CONTACT_INFO.barAdmissionDate.slice(0, 4)} · ${CONTACT_INFO.city.toUpperCase()}, FLORIDA`}
        </textPath>
      </text>

      <g fill={accent}>
        <polygon
          points="26,100 28,95 33,95 29,92 31,87 26,90 21,87 23,92 19,95 24,95"
          transform="translate(4, 5) scale(0.6)"
        />
        <polygon
          points="174,100 176,95 181,95 177,92 179,87 174,90 169,87 171,92 167,95 172,95"
          transform="translate(-14, 5) scale(0.6)"
        />
      </g>

      {/* Scales of justice */}
      <g stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="84" y1="140" x2="116" y2="140" strokeWidth="2.5" />
        <line x1="89" y1="136" x2="111" y2="136" strokeWidth="2" />
        <line x1="100" y1="136" x2="100" y2="68" strokeWidth="2.5" />
        <circle cx="100" cy="65" r="3" fill={accent} />
        <line x1="68" y1="74" x2="132" y2="74" strokeWidth="2" />
        <circle cx="100" cy="74" r="2.5" fill={accent} />
        <line x1="72" y1="74" x2="62" y2="98" strokeWidth="1.2" />
        <line x1="72" y1="74" x2="82" y2="98" strokeWidth="1.2" />
        <path d="M 58,98 Q 72,108 86,98 Z" fill={accent} fillOpacity="0.25" strokeWidth="1.5" />
        <line x1="128" y1="74" x2="118" y2="98" strokeWidth="1.2" />
        <line x1="128" y1="74" x2="138" y2="98" strokeWidth="1.2" />
        <path d="M 114,98 Q 128,108 142,98 Z" fill={accent} fillOpacity="0.25" strokeWidth="1.5" />
      </g>

      <text
        x="100"
        y="126"
        textAnchor="middle"
        fill={accent}
        fontSize="5.5"
        letterSpacing="0.2em"
        fontFamily="Cinzel, serif"
        fontWeight="600"
      >
        LEX · JUSTITIA · VERITAS
      </text>
    </svg>
  );
}
