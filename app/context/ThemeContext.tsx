import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { ACTIVE_THEME_ID, THEME_CONFIGS } from '~/data/firm';
import type { ThemeConfig, ThemePreset } from '~/types';

interface ThemeContextValue {
  currentThemeId: ThemePreset;
  currentTheme: ThemeConfig;
}

/**
 * The theme engine is kept (components read colors via `useTheme()`), but the
 * site ships exactly ONE theme: `ACTIVE_THEME_ID` in `~/data/firm`. There is no
 * public switcher and nothing is persisted. To re-skin, change ACTIVE_THEME_ID
 * or add a preset to THEME_CONFIGS.
 */
const FROZEN_THEME: ThemeContextValue = {
  currentThemeId: ACTIVE_THEME_ID,
  currentTheme: THEME_CONFIGS[ACTIVE_THEME_ID],
};

const ThemeContext = createContext<ThemeContextValue>(FROZEN_THEME);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={FROZEN_THEME}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/**
 * CSS custom properties for a theme. Set on <html> in root.tsx so they are in
 * the prerendered HTML (no flash) and reach portaled modals. Tailwind tokens in
 * app.css (`bg-brand`, `text-accent`, `text-accent-ink`, ...) read these.
 */
export function themeCssVars(theme: ThemeConfig): CSSProperties {
  return {
    '--theme-primary-bg': theme.primaryBg,
    '--theme-primary-surface': theme.primarySurface,
    '--theme-badge-bg': theme.badgeBg,
    '--theme-accent': theme.accentColor,
    '--theme-accent-hover': theme.accentHover,
    '--theme-accent-ink': theme.accentInk,
    '--theme-body-canvas': theme.bodyCanvas,
  } as CSSProperties;
}
