// Runs synchronously in <head> before the page paints to set data-theme on <html>.
// Prevents the dark-mode flash on first paint when the user has chosen dark previously.
(function () {
  try {
    var stored = localStorage.getItem("local-shop-theme");
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  } catch (e) {
    // Fail open — light is the default.
  }
})();
