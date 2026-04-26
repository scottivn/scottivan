"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "bjj", label: "BJJ", color: "#D4740A" },
  { id: "chess", label: "Chess", color: "#C89B3C" },
  { id: "k8s", label: "K8s", color: "#22D3EE" },
];

export default function LabNav() {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);

      const scrollY = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollY >= el.offsetTop) {
          setActive(sections[i].id);
          return;
        }
      }
      setActive("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const activeSection = sections.find((s) => s.id === active);
  const activeColor = activeSection?.color ?? "#52525B";

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(9, 9, 11, 0.85)",
          borderColor: `${activeColor}25`,
          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${activeColor}10`,
        }}
      >
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative px-4 py-2 rounded-full text-xs font-medium transition-colors"
              style={{
                color: isActive ? section.color : "#52525B",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLabPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: `${section.color}12`,
                    border: `1px solid ${section.color}30`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
