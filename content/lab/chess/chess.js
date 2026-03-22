(function () {
    "use strict";

    const PIECE_IMAGES = {
        K: "pieces/wK.svg", Q: "pieces/wQ.svg", R: "pieces/wR.svg",
        B: "pieces/wB.svg", N: "pieces/wN.svg", P: "pieces/wP.svg",
        k: "pieces/bK.svg", q: "pieces/bQ.svg", r: "pieces/bR.svg",
        b: "pieces/bB.svg", n: "pieces/bN.svg", p: "pieces/bP.svg",
    };

    const DEPTH_MAP = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

    let worker = null;
    let fen = "";
    let playerColor = "w"; // "w" or "b"
    let selectedSquare = null;
    let legalMoves = [];
    let gameOver = false;
    let engineThinking = false;

    const boardEl = document.getElementById("board-container");
    const statusEl = document.getElementById("status");
    const newGameBtn = document.getElementById("new-game");
    const colorSelect = document.getElementById("player-color");
    const difficultySelect = document.getElementById("difficulty");

    function initWorker() {
        if (worker) worker.terminate();
        worker = new Worker("worker.js", { type: "module" });
        worker.onmessage = handleWorkerMessage;
    }

    function handleWorkerMessage(e) {
        const msg = e.data;
        switch (msg.type) {
            case "ready":
                newGame();
                break;
            case "legalmoves":
                legalMoves = msg.moves;
                renderBoard();
                if (!gameOver && legalMoves.length === 0) {
                    // Check if it's checkmate or stalemate
                    worker.postMessage({ type: "makemove", fen: fen, moveUci: "0000" });
                }
                break;
            case "bestmove":
                if (msg.move) {
                    worker.postMessage({ type: "makemove", fen: fen, moveUci: msg.move });
                }
                break;
            case "position":
                if (msg.fen) {
                    fen = msg.fen;
                    selectedSquare = null;
                    engineThinking = false;

                    if (msg.checkmate) {
                        gameOver = true;
                        const winner = sideToMove() === "w" ? "Black" : "White";
                        setStatus("Checkmate! " + winner + " wins.");
                        requestLegalMoves();
                    } else if (msg.stalemate) {
                        gameOver = true;
                        setStatus("Stalemate! Draw.");
                        requestLegalMoves();
                    } else if (msg.inCheck) {
                        setStatus("Check!");
                        requestLegalMoves();
                    } else {
                        setStatus("");
                        requestLegalMoves();
                    }
                }
                break;
        }
    }

    function sideToMove() {
        return fen.split(" ")[1];
    }

    function isPlayerTurn() {
        return sideToMove() === playerColor;
    }

    function requestLegalMoves() {
        worker.postMessage({ type: "legalmoves", fen: fen });
    }

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function newGame() {
        playerColor = colorSelect.value === "1" ? "w" : "b";
        fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        selectedSquare = null;
        gameOver = false;
        engineThinking = false;
        setStatus("");
        requestLegalMoves();
    }

    function squareToAlgebraic(rank, file) {
        return String.fromCharCode(97 + file) + (rank + 1);
    }

    function algebraicToSquare(s) {
        return { file: s.charCodeAt(0) - 97, rank: parseInt(s[1]) - 1 };
    }

    function parseFenBoard(fen) {
        const board = Array(64).fill(null);
        const ranks = fen.split(" ")[0].split("/");
        for (let ri = 0; ri < 8; ri++) {
            const rank = 7 - ri;
            let file = 0;
            for (const c of ranks[ri]) {
                const digit = parseInt(c);
                if (!isNaN(digit)) {
                    file += digit;
                } else {
                    board[rank * 8 + file] = c;
                    file++;
                }
            }
        }
        return board;
    }

    function getMovesFrom(sq) {
        return legalMoves.filter(m => m.substring(0, 2) === sq);
    }

    function getMovesTo(fromSq, toSq) {
        return legalMoves.filter(m => m.substring(0, 2) === fromSq && m.substring(2, 4) === toSq);
    }

    function handleSquareClick(rank, file) {
        if (gameOver || engineThinking || !isPlayerTurn()) return;

        const sq = squareToAlgebraic(rank, file);

        if (selectedSquare) {
            const moves = getMovesTo(selectedSquare, sq);
            if (moves.length > 0) {
                let moveUci;
                if (moves.length > 1) {
                    // Promotion - default to queen
                    moveUci = moves.find(m => m[4] === "q") || moves[0];
                } else {
                    moveUci = moves[0];
                }
                makePlayerMove(moveUci);
                return;
            }
            // Clicked same square - deselect
            if (selectedSquare === sq) {
                selectedSquare = null;
                renderBoard();
                return;
            }
        }

        // Select a piece
        const board = parseFenBoard(fen);
        const piece = board[rank * 8 + file];
        if (piece) {
            const pieceColor = piece === piece.toUpperCase() ? "w" : "b";
            if (pieceColor === playerColor) {
                const moves = getMovesFrom(sq);
                if (moves.length > 0) {
                    selectedSquare = sq;
                    renderBoard();
                    return;
                }
            }
        }
        selectedSquare = null;
        renderBoard();
    }

    function makePlayerMove(moveUci) {
        selectedSquare = null;
        worker.postMessage({ type: "makemove", fen: fen, moveUci: moveUci });
    }

    function maybeEngineMove() {
        if (!gameOver && !isPlayerTurn() && legalMoves.length > 0) {
            engineThinking = true;
            setStatus("Thinking...");
            const depth = DEPTH_MAP[difficultySelect.value] || 3;
            worker.postMessage({ type: "bestmove", fen: fen, depth: depth });
        }
    }

    function renderBoard() {
        const board = parseFenBoard(fen);
        const flipped = playerColor === "b";
        const sqSize = 50;
        const boardSize = sqSize * 8;
        const labelSize = 18;
        const totalSize = boardSize + labelSize;

        const selectedMoves = selectedSquare ? getMovesFrom(selectedSquare) : [];
        const targetSquares = new Set(selectedMoves.map(m => m.substring(2, 4)));

        let svg = `<svg viewBox="0 0 ${totalSize} ${totalSize}" xmlns="http://www.w3.org/2000/svg">`;

        // Draw squares and pieces
        for (let visualRank = 0; visualRank < 8; visualRank++) {
            for (let visualFile = 0; visualFile < 8; visualFile++) {
                const rank = flipped ? visualRank : 7 - visualRank;
                const file = flipped ? 7 - visualFile : visualFile;
                const x = labelSize + visualFile * sqSize;
                const y = visualRank * sqSize;
                const sq = squareToAlgebraic(rank, file);

                const isLight = (rank + file) % 2 === 1;
                let fillColor = isLight ? "#f0d9b5" : "#b58863";

                if (sq === selectedSquare) {
                    fillColor = isLight ? "#f7ec5d" : "#dac334";
                } else if (targetSquares.has(sq)) {
                    fillColor = isLight ? "#cdd26a" : "#aaa23a";
                }

                svg += `<rect x="${x}" y="${y}" width="${sqSize}" height="${sqSize}" fill="${fillColor}"
                    data-rank="${rank}" data-file="${file}" class="sq" style="cursor:pointer"/>`;

                const piece = board[rank * 8 + file];
                if (piece) {
                    const pad = sqSize * 0.05;
                    svg += `<image href="${PIECE_IMAGES[piece]}" x="${x + pad}" y="${y + pad}"
                        width="${sqSize - 2 * pad}" height="${sqSize - 2 * pad}" pointer-events="none"/>`;
                }

                // Draw move indicator dot
                if (targetSquares.has(sq) && !piece) {
                    svg += `<circle cx="${x + sqSize / 2}" cy="${y + sqSize / 2}" r="${sqSize * 0.15}"
                        fill="rgba(0,0,0,0.2)" pointer-events="none"/>`;
                }
            }
        }

        // File labels (a-h)
        for (let visualFile = 0; visualFile < 8; visualFile++) {
            const file = flipped ? 7 - visualFile : visualFile;
            const label = String.fromCharCode(97 + file);
            svg += `<text x="${labelSize + visualFile * sqSize + sqSize / 2}" y="${boardSize + labelSize - 3}"
                text-anchor="middle" font-size="12" fill="#666">${label}</text>`;
        }

        // Rank labels (1-8)
        for (let visualRank = 0; visualRank < 8; visualRank++) {
            const rank = flipped ? visualRank : 7 - visualRank;
            svg += `<text x="${labelSize / 2}" y="${visualRank * sqSize + sqSize / 2 + 1}"
                text-anchor="middle" dominant-baseline="central" font-size="12" fill="#666">${rank + 1}</text>`;
        }

        svg += "</svg>";
        boardEl.innerHTML = svg;

        // Add click handlers
        boardEl.querySelectorAll(".sq").forEach(el => {
            el.addEventListener("click", () => {
                const rank = parseInt(el.dataset.rank);
                const file = parseInt(el.dataset.file);
                handleSquareClick(rank, file);
            });
        });

        // Trigger engine move if it's the engine's turn
        if (!gameOver && !engineThinking) {
            setTimeout(maybeEngineMove, 50);
        }
    }

    newGameBtn.addEventListener("click", newGame);
    initWorker();
})();
