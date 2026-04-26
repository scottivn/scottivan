"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";

interface Position {
  fen: string;
  solution: string[];
  title: string;
  year: string;
  description: string;
  whiteToMove: boolean;
}

const POSITIONS: Position[] = [
  {
    fen: "1rb4r/pkPp3p/1b1P3n/1Q6/N3Pp2/8/P1P3PP/7K w - -",
    solution: ["c7c8=N"],
    title: "Kasparov vs. Topalov, 1999",
    year: "1999",
    description:
      "Kasparov's Immortal. A stunning combination capped by an underpromotion to knight.",
    whiteToMove: true,
  },
  {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq -",
    solution: ["h5f7"],
    title: "Scholar's Mate Setup",
    year: "Classic",
    description:
      "The most famous attacking pattern in chess. Can you find the decisive blow?",
    whiteToMove: true,
  },
  {
    fen: "r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq -",
    solution: ["d5f6"],
    title: "Morphy's Opera Game, 1858",
    year: "1858",
    description:
      "Paul Morphy dismantles Duke Karl and Count Isouard at the Paris Opera. Find the attacking move.",
    whiteToMove: true,
  },
  {
    fen: "r1b1k1nr/ppppqppp/2n5/1Bb1P3/8/5N2/PPPP1PPP/RNBQK2R w KQkq -",
    solution: ["b5c6"],
    title: "Ruy Lopez: Noah's Ark Trap",
    year: "Classic",
    description:
      "One of the oldest known traps in chess, dating back centuries. Find the winning continuation.",
    whiteToMove: true,
  },
];

const BOARD_LIGHT = "#F0E6D0";
const BOARD_DARK = "#8B6543";
const HIGHLIGHT = "rgba(200, 155, 60, 0.5)";

interface LichessPerf {
  games?: number;
  runs?: number;
  rating: number;
  prog?: number;
}

interface LichessUser {
  username: string;
  perfs: Record<string, LichessPerf>;
  count: { all: number; win: number; loss: number; draw: number };
}

export default function ChessSection() {
  const [positionIndex, setPositionIndex] = useState(0);
  const [game, setGame] = useState<Chess>(new Chess(POSITIONS[0].fen));
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [lichess, setLichess] = useState<LichessUser | null>(null);

  const position = POSITIONS[positionIndex];

  useEffect(() => {
    fetch("https://lichess.org/api/user/scottivn", {
      headers: { Accept: "application/json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setLichess(d))
      .catch(() => {});
  }, []);

  const resetToPosition = useCallback((idx: number) => {
    const pos = POSITIONS[idx];
    const newGame = new Chess(pos.fen);
    setGame(newGame);
    setStatus("playing");
    setSelectedSquare(null);
    setPositionIndex(idx);
  }, []);

  const tryMove = useCallback(
    (from: string, to: string) => {
      if (status !== "playing") return false;

      const normalizedSolution = position.solution[0]
        .replace(/=[A-Z]/g, "")
        .toLowerCase();
      const normalizedMove = `${from}${to}`.toLowerCase();

      if (normalizedMove === normalizedSolution) {
        try {
          const promotionPiece = position.solution[0]?.includes("=N") ? "n" : "q";
          const newGame = new Chess(game.fen());
          newGame.move({ from: from as Square, to: to as Square, promotion: promotionPiece });
          setGame(newGame);
          setStatus("correct");
          return true;
        } catch {
          setStatus("wrong");
          setTimeout(() => setStatus("playing"), 1200);
          return false;
        }
      } else {
        setStatus("wrong");
        setTimeout(() => setStatus("playing"), 1200);
        return false;
      }
    },
    [game, position, status]
  );

  const onSquareClick = useCallback(
    ({ square }: { piece: { pieceType: string } | null; square: string }) => {
      if (status !== "playing") return;

      if (selectedSquare) {
        tryMove(selectedSquare, square);
        setSelectedSquare(null);
      } else {
        const piece = game.get(square as Square);
        if (piece) {
          setSelectedSquare(square as Square);
        }
      }
    },
    [status, selectedSquare, tryMove, game]
  );

  const onPieceDrop = useCallback(
    ({ sourceSquare, targetSquare }: {
      piece: { isSparePiece: boolean; position: string; pieceType: string };
      sourceSquare: string;
      targetSquare: string | null;
    }) => {
      if (!targetSquare) return false;
      setSelectedSquare(null);
      return tryMove(sourceSquare, targetSquare);
    },
    [tryMove]
  );

  const nextPosition = () => {
    const next = (positionIndex + 1) % POSITIONS.length;
    resetToPosition(next);
  };

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (selectedSquare) {
      styles[selectedSquare] = { backgroundColor: HIGHLIGHT };
    }
    return styles;
  }, [selectedSquare]);

  const ratingFormats = [
    { key: "blitz", label: "Blitz" },
    { key: "rapid", label: "Rapid" },
    { key: "correspondence", label: "Corresp." },
    { key: "puzzle", label: "Puzzles" },
  ];

  return (
    <section
      id="chess"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ backgroundColor: "#1C1610" }}
    >
      {/* Subtle wood grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(139, 101, 67, 0.3) 2px,
            rgba(139, 101, 67, 0.3) 3px
          )`,
          backgroundSize: "20px 100%",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "#C89B3C" }}
          >
            Chess
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4"
            style={{
              color: "#EDE5D8",
              fontFamily: "'Playfair Display', 'DM Sans', serif",
            }}
          >
            Find the Move
          </h2>
          <p className="text-sm max-w-lg" style={{ color: "#8B7355" }}>
            Famous positions from chess history. Drag or tap to make your move.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded-xl overflow-hidden border-2 shadow-2xl w-full aspect-square"
              style={{
                borderColor: "#5C3D2E",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}
            >
              <Chessboard
                options={{
                  position: game.fen(),
                  onPieceDrop,
                  onSquareClick,
                  boardStyle: { borderRadius: "0", width: "100%", height: "100%" },
                  darkSquareStyle: { backgroundColor: BOARD_DARK },
                  lightSquareStyle: { backgroundColor: BOARD_LIGHT },
                  squareStyles: customSquareStyles,
                  animationDurationInMs: 300,
                }}
              />
            </div>

            {/* Status bar */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      status === "correct"
                        ? "#10B981"
                        : status === "wrong"
                        ? "#EF4444"
                        : "#C89B3C",
                  }}
                />
                <span className="text-xs" style={{ color: "#8B7355" }}>
                  {status === "correct"
                    ? "Brilliant!"
                    : status === "wrong"
                    ? "Not quite — try again"
                    : position.whiteToMove
                    ? "White to move"
                    : "Black to move"}
                </span>
              </div>
              <button
                onClick={nextPosition}
                className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-[rgba(200,155,60,0.1)]"
                style={{
                  borderColor: "rgba(200, 155, 60, 0.3)",
                  color: "#C89B3C",
                }}
              >
                Next Position →
              </button>
            </div>
          </motion.div>

          {/* Info panel */}
          <div>
            {/* Position info */}
            <motion.div
              key={positionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <h3
                className="text-xl font-medium mb-1"
                style={{ color: "#EDE5D8" }}
              >
                {position.title}
              </h3>
              <p className="text-xs mb-4" style={{ color: "#5C3D2E" }}>
                {position.year}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8B7355" }}
              >
                {position.description}
              </p>
            </motion.div>

            {/* Lichess stats */}
            {lichess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-10"
              >
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-4"
                  style={{ color: "#5C3D2E" }}
                >
                  Live Ratings
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {ratingFormats.map(({ key, label }) => {
                    const perf = lichess.perfs[key];
                    if (!perf) return null;
                    return (
                      <div
                        key={key}
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: "rgba(92, 61, 46, 0.1)",
                          borderColor: "rgba(92, 61, 46, 0.2)",
                        }}
                      >
                        <p className="text-xs mb-1" style={{ color: "#8B7355" }}>
                          {label}
                        </p>
                        <p
                          className="text-lg font-semibold"
                          style={{ color: "#C89B3C" }}
                        >
                          {perf.rating}
                        </p>
                        <p className="text-xs" style={{ color: "#5C3D2E" }}>
                          {("games" in perf ? perf.games : perf.runs) ?? 0}{" "}
                          {key === "puzzle" ? "puzzles" : "games"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Challenge buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: "#5C3D2E" }}
              >
                Play Me
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://lichess.org/?user=scottivn#friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-5 py-3 rounded-lg text-sm font-medium transition-all hover:shadow-[0_0_30px_rgba(200,155,60,0.3)]"
                  style={{
                    backgroundColor: "#C89B3C",
                    color: "#1C1610",
                  }}
                >
                  Challenge — Correspondence
                </a>
                <a
                  href="https://lichess.org/?user=scottivn#friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center px-5 py-3 rounded-lg text-sm border transition-all hover:bg-[rgba(200,155,60,0.08)]"
                  style={{
                    borderColor: "rgba(200, 155, 60, 0.3)",
                    color: "#C89B3C",
                  }}
                >
                  Quick Game — Blitz
                </a>
              </div>
              <p className="text-xs mt-3" style={{ color: "#5C3D2E" }}>
                Opens on Lichess · scottivn
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
