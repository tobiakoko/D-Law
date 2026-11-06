import logoMark from '~/assets/images/logo-mark.png';

interface FirmLogoProps {
  /** Rendered size in px (square). The source is 160px, sharp up to 80px on 2x screens. */
  size?: number;
  className?: string;
}

/**
 * The firm's scales emblem (cropped from public/logo-light.png).
 * Decorative: it always sits next to the firm name, which carries the accessible label.
 */
export function FirmLogo({ size = 44, className = '' }: FirmLogoProps) {
  return (
    <img
      src={logoMark}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      decoding="async"
      className={`shrink-0 rounded-full ${className}`}
    />
  );
}
