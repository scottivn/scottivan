"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  lines: string[];
  speed?: number;
  className?: string;
}

export default function Typewriter({ lines, speed = 45, className = "" }: TypewriterProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Move to next line after a short pause
      const pause = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(pause);
    }
  }, [currentLine, currentChar, lines, speed]);

  return (
    <div className={`font-mono ${className}`}>
      {displayedLines.map((line, i) => (
        <div key={i} className="min-h-[1.5em]">
          {i < currentLine || done ? (
            <span>{line}</span>
          ) : (
            <span>
              {line}
              {i === currentLine && !done && (
                <span className="inline-block w-2 h-5 bg-[#00ff88] ml-0.5 animate-blink align-middle" />
              )}
            </span>
          )}
        </div>
      ))}
      {done && (
        <span className="inline-block w-2 h-5 bg-[#00ff88] ml-0.5 animate-blink align-middle" />
      )}
    </div>
  );
}
