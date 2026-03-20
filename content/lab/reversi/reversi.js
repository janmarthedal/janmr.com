const { useState, useEffect, useCallback } = React;

const EMPTY = 0, BLACK = 1, WHITE = 2;
const DIRS = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

function initBoard() {
  const b = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
  b[3][3] = WHITE; b[3][4] = BLACK;
  b[4][3] = BLACK; b[4][4] = WHITE;
  return b;
}

function getFlips(board, row, col, player) {
  if (board[row][col] !== EMPTY) return [];
  const opp = player === BLACK ? WHITE : BLACK;
  const flips = [];
  for (const [dr, dc] of DIRS) {
    let r = row + dr, c = col + dc;
    const line = [];
    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opp) {
      line.push([r, c]);
      r += dr; c += dc;
    }
    if (line.length > 0 && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === player) {
      flips.push(...line);
    }
  }
  return flips;
}

function getLegalMoves(board, player) {
  const moves = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (getFlips(board, r, c, player).length > 0)
        moves.push([r, c]);
  return moves;
}

function countDiscs(board) {
  let black = 0, white = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === BLACK) black++;
      else if (board[r][c] === WHITE) white++;
    }
  return { black, white };
}

function applyMove(board, row, col, player) {
  const flips = getFlips(board, row, col, player);
  if (flips.length === 0) return null;
  const nb = board.map(r => [...r]);
  nb[row][col] = player;
  for (const [r, c] of flips) nb[r][c] = player;
  return nb;
}

function aiMove(board, player) {
  const moves = getLegalMoves(board, player);
  if (moves.length === 0) return null;
  const corners = moves.filter(([r,c]) => (r===0||r===7) && (c===0||c===7));
  if (corners.length > 0) return corners[0];
  const edges = moves.filter(([r,c]) => r===0||r===7||c===0||c===7);
  if (edges.length > 0) return edges[Math.floor(Math.random()*edges.length)];
  let best = null, bestScore = -1;
  for (const [r,c] of moves) {
    const score = getFlips(board, r, c, player).length;
    if (score > bestScore) { bestScore = score; best = [r,c]; }
  }
  return best;
}

function ScoreCard({ label, count, active, isYou }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "10px 20px",
      border: active ? "1px solid #d4af6a" : "1px solid #2a2a3a",
      borderRadius: "3px",
      background: active ? "rgba(212,175,106,0.06)" : "transparent",
      transition: "all 0.3s",
      boxShadow: active ? "0 0 20px rgba(212,175,106,0.15)" : "none",
    }}>
      <div style={{
        width: "28px", height: "28px",
        borderRadius: "50%",
        background: label === "Black"
          ? "radial-gradient(circle at 35% 35%, #555, #111)"
          : "radial-gradient(circle at 35% 35%, #fff, #ccc)",
        margin: "0 auto 6px",
        boxShadow: "1px 2px 6px rgba(0,0,0,0.6)",
      }} />
      <div style={{ color: "#d4af6a", fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 700 }}>{count}</div>
      <div style={{ color: "#5a5a6a", fontFamily: "'Crimson Text', serif", fontSize: "0.8rem", fontStyle: "italic" }}>
        {isYou ? "you" : label.toLowerCase()}
      </div>
    </div>
  );
}

function Reversi() {
  const [board, setBoard] = useState(initBoard);
  const [current, setCurrent] = useState(BLACK);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [lastPlaced, setLastPlaced] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [vsAI, setVsAI] = useState(true);

  const legalMoves = getLegalMoves(board, current);
  const legalSet = new Set(legalMoves.map(([r,c]) => `${r},${c}`));

  const handleClick = useCallback((row, col) => {
    if (gameOver || current !== BLACK) return;
    const nb = applyMove(board, row, col, current);
    if (!nb) return;
    const f = getFlips(board, row, col, current);
    setFlipped(f.map(([r,c]) => `${r},${c}`));
    setLastPlaced(`${row},${col}`);
    setBoard(nb);
    const next = WHITE;
    const nextMoves = getLegalMoves(nb, next);
    if (nextMoves.length === 0) {
      const myMoves = getLegalMoves(nb, BLACK);
      if (myMoves.length === 0) { endGame(nb); return; }
      setMessage("White has no moves. Your turn again!");
      setCurrent(BLACK);
    } else {
      setCurrent(next);
      setMessage("");
    }
  }, [board, current, gameOver]);

  function endGame(b) {
    const { black, white } = countDiscs(b);
    setGameOver(true);
    if (black > white) setMessage(`You win! ${black} – ${white} 🎉`);
    else if (white > black) setMessage(`AI wins! ${white} – ${black}`);
    else setMessage(`Draw! ${black} – ${white}`);
  }

  useEffect(() => {
    if (!vsAI || current !== WHITE || gameOver) return;
    const timer = setTimeout(() => {
      const move = aiMove(board, WHITE);
      if (!move) {
        const myMoves = getLegalMoves(board, BLACK);
        if (myMoves.length === 0) { endGame(board); return; }
        setMessage("AI has no moves. Your turn!");
        setCurrent(BLACK);
        return;
      }
      const [r, c] = move;
      const nb = applyMove(board, r, c, WHITE);
      const f = getFlips(board, r, c, WHITE);
      setFlipped(f.map(([fr,fc]) => `${fr},${fc}`));
      setLastPlaced(`${r},${c}`);
      setBoard(nb);
      const nextMoves = getLegalMoves(nb, BLACK);
      if (nextMoves.length === 0) {
        const aiMoves2 = getLegalMoves(nb, WHITE);
        if (aiMoves2.length === 0) { endGame(nb); return; }
        setMessage("You have no moves. AI plays again!");
        setCurrent(WHITE);
      } else {
        setCurrent(BLACK);
        setMessage("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [current, board, gameOver, vsAI]);

  function restart() {
    setBoard(initBoard());
    setCurrent(BLACK);
    setGameOver(false);
    setMessage("");
    setLastPlaced(null);
    setFlipped([]);
  }

  const { black, white } = countDiscs(board);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .cell { transition: background 0.15s; cursor: pointer; }
        .cell:hover .hint { opacity: 1 !important; }
        .disc { transition: transform 0.25s cubic-bezier(.4,2,.6,1), background 0.3s; }
        .disc.flip { animation: flipDisc 0.3s ease; }
        @keyframes flipDisc {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .new-disc { animation: placeDisc 0.25s cubic-bezier(.4,2,.6,1); }
        @keyframes placeDisc {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        button { cursor: pointer; transition: all 0.2s; }
        button:hover { opacity: 0.85; transform: translateY(-1px); }
      `}</style>

      <h1 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        color: "#d4af6a",
        letterSpacing: "0.15em",
        marginBottom: "4px",
        textShadow: "0 0 30px rgba(212,175,106,0.4)",
      }}>REVERSI</h1>
      <p style={{ color: "#5a5a6a", fontFamily: "'Crimson Text', serif", fontStyle: "italic", marginBottom: "24px", fontSize: "1rem" }}>
        {vsAI ? "You play Black · AI plays White" : "Black vs White"}
      </p>

      <div style={{ display: "flex", gap: "40px", marginBottom: "20px", alignItems: "center" }}>
        <ScoreCard label="Black" count={black} active={current === BLACK && !gameOver} isYou={vsAI} />
        <div style={{ color: "#3a3a4a", fontSize: "1.2rem" }}>vs</div>
        <ScoreCard label="White" count={white} active={current === WHITE && !gameOver} isYou={false} />
      </div>

      <div style={{
        background: "linear-gradient(135deg, #1a3a2a 0%, #0f2a1a 100%)",
        border: "3px solid #2a5a3a",
        borderRadius: "4px",
        padding: "8px",
        boxShadow: "0 0 60px rgba(0,80,30,0.3), inset 0 0 30px rgba(0,0,0,0.4)",
      }}>
        {board.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => {
              const key = `${r},${c}`;
              const isLegal = legalSet.has(key) && current === BLACK && !gameOver;
              const isLast = lastPlaced === key;
              const isFlipped = flipped.includes(key);
              return (
                <div
                  key={c}
                  className="cell"
                  onClick={() => handleClick(r, c)}
                  style={{
                    width: "clamp(44px, 8vw, 60px)",
                    height: "clamp(44px, 8vw, 60px)",
                    border: "1px solid #2a4a30",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    background: isLegal ? "rgba(255,255,255,0.04)" : "transparent",
                  }}
                >
                  {cell !== EMPTY && (
                    <div
                      className={`disc${isLast ? " new-disc" : ""}${isFlipped ? " flip" : ""}`}
                      style={{
                        width: "80%", height: "80%",
                        borderRadius: "50%",
                        background: cell === BLACK
                          ? "radial-gradient(circle at 35% 35%, #555, #111)"
                          : "radial-gradient(circle at 35% 35%, #fff, #ccc)",
                        boxShadow: cell === BLACK
                          ? "2px 3px 8px rgba(0,0,0,0.7), inset -1px -1px 3px rgba(0,0,0,0.5)"
                          : "2px 3px 8px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(200,200,200,0.3)",
                      }}
                    />
                  )}
                  {cell === EMPTY && isLegal && (
                    <div className="hint" style={{
                      width: "30%", height: "30%",
                      borderRadius: "50%",
                      background: "rgba(212,175,106,0.35)",
                      opacity: 0.6,
                      pointerEvents: "none",
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", minHeight: "32px", textAlign: "center" }}>
        {message && (
          <p style={{
            color: gameOver ? "#d4af6a" : "#8ab89a",
            fontFamily: "'Crimson Text', serif",
            fontSize: "1.15rem",
            fontStyle: "italic",
          }}>{message}</p>
        )}
        {!gameOver && !message && (
          <p style={{ color: "#5a6a5a", fontFamily: "'Crimson Text', serif", fontSize: "1rem", fontStyle: "italic" }}>
            {current === BLACK ? "Your turn" : "AI is thinking…"}
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <button onClick={restart} style={{
          background: "transparent",
          border: "1px solid #2a5a3a",
          color: "#8ab89a",
          padding: "8px 24px",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          borderRadius: "2px",
        }}>NEW GAME</button>
        <button onClick={() => { setVsAI(v => !v); restart(); }} style={{
          background: "transparent",
          border: "1px solid #3a3a5a",
          color: "#7a7a9a",
          padding: "8px 24px",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          borderRadius: "2px",
        }}>{vsAI ? "2 PLAYERS" : "VS AI"}</button>
      </div>
    </div>
  );
}
