/**
 * Loads /theme-boot.js synchronously in <head> before the page paints so that
 * `data-theme` is on <html> before any styled element renders. Prevents the
 * dark-mode flash on reload.
 *
 * The actual boot logic lives in /public/theme-boot.js (kept out of the React
 * tree so it can run before hydration).
 */
export function ThemeBoot() {
  // eslint-disable-next-line @next/next/no-sync-scripts
  return <script src="/theme-boot.js" />;
}

export const THEME_STORAGE_KEY = "local-shop-theme";
