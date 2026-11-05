import { createContext, useContext, type ReactNode } from 'react';
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
