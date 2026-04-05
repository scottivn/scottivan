"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
