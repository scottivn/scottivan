"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { THEME_STORAGE_KEY } from "@/components/ThemeBoot";

type Theme = "light" | "dark";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export function DarkModeToggle() {
  // Mounted gate avoids the icon flickering during hydration; the actual
  // data-theme is set by ThemeBoot before paint, so the page is correct.
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — toggle still works for the session.
    }
  }

  return (
    <IconButton
      label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      size="md"
      className="text-ink-2 hover:text-accent"
    >
      {!mounted ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : theme === "dark" ? (
        <Sun className="h-5 w-5 transition-transform duration-normal" aria-hidden />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-normal" aria-hidden />
      )}
    </IconButton>
  );
}
