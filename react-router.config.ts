import type { Config } from '@react-router/dev/config';

export default {
  // Static site: no runtime server. `prerender` emits fully-rendered HTML for
  // "/" at build time so crawlers get real content, not an empty SPA shell.
  ssr: false,
  prerender: ['/'],
} satisfies Config;
