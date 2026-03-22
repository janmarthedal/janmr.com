import init, { get_best_move, get_legal_moves, make_move, is_in_check, is_checkmate, is_stalemate } from "./pkg/chess_engine.js";

let ready = false;

async function initialize() {
    await init();
    ready = true;
    postMessage({ type: "ready" });
}

initialize();

onmessage = function (e) {
    if (!ready) return;
    const { type, fen, depth, moveUci } = e.data;

    switch (type) {
        case "bestmove": {
            const move = get_best_move(fen, depth);
            postMessage({ type: "bestmove", move });
            break;
        }
        case "legalmoves": {
            const moves = get_legal_moves(fen);
            postMessage({ type: "legalmoves", moves });
            break;
        }
        case "makemove": {
            const newFen = make_move(fen, moveUci);
            const inCheck = is_in_check(newFen);
            const checkmate = is_checkmate(newFen);
            const stalemate = is_stalemate(newFen);
            postMessage({ type: "position", fen: newFen, inCheck, checkmate, stalemate });
            break;
        }
    }
};
