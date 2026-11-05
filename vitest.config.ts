import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// Separate from vite.config.ts so unit tests don't load the React Router plugin.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['app/**/*.test.{ts,tsx}'],
    css: false,
  },
});
