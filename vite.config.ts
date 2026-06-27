// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    optimizeDeps: {
      // framer-motion's CJS bundle (dist/cjs/index.js) uses require('motion-dom') and
      // require('motion-utils'). Without pre-bundling, Vite resolves those as ESM module
      // namespace objects — causing "Class extends value [object Module] is not a constructor"
      // at runtime whenever framer-motion tries to subclass MotionValue or VisualElement.
      // Force Vite to pre-bundle all three together so CJS require() gets proper interop.
      include: ["framer-motion", "motion-dom", "motion-utils"],
    },
  },
});