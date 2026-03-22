mod board;
mod eval;
mod search;

use board::{Board, Move, START_FEN};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_start_fen() -> String {
    START_FEN.to_string()
}

#[wasm_bindgen]
pub fn get_legal_moves(fen: &str) -> JsValue {
    let board = match Board::from_fen(fen) {
        Some(b) => b,
        None => return JsValue::from_str("[]"),
    };

    let moves = board.generate_legal_moves();
    let move_strings: Vec<String> = moves.iter().map(|m| m.to_uci()).collect();

    serde_wasm_bindgen::to_value(&move_strings).unwrap_or(JsValue::from_str("[]"))
}

#[wasm_bindgen]
pub fn make_move(fen: &str, move_uci: &str) -> String {
    let board = match Board::from_fen(fen) {
        Some(b) => b,
        None => return String::new(),
    };

    let mv = match Move::from_uci(move_uci) {
        Some(m) => m,
        None => return String::new(),
    };

    // Verify move is legal
    let legal_moves = board.generate_legal_moves();
    let legal_mv = legal_moves.iter().find(|lm| lm.from == mv.from && lm.to == mv.to && lm.promotion == mv.promotion);

    match legal_mv {
        Some(m) => board.make_move(*m).to_fen(),
        None => String::new(),
    }
}

#[wasm_bindgen]
pub fn get_best_move(fen: &str, depth: u32) -> String {
    let board = match Board::from_fen(fen) {
        Some(b) => b,
        None => return String::new(),
    };

    match search::find_best_move(&board, depth) {
        Some(mv) => mv.to_uci(),
        None => String::new(),
    }
}

#[wasm_bindgen]
pub fn is_in_check(fen: &str) -> bool {
    let board = match Board::from_fen(fen) {
        Some(b) => b,
        None => return false,
    };
    board.in_check(board.side_to_move)
}

#[wasm_bindgen]
pub fn is_checkmate(fen: &str) -> bool {
    let board = match Board::from_fen(fen) {
        Some(b) => b,
        None => return false,
    };
    board.generate_legal_moves().is_empty() && board.in_check(board.side_to_move)
}

#[wasm_bindgen]
pub fn is_stalemate(fen: &str) -> bool {
    let board = match Board::from_fen(fen) {
        Some(b) => b,
        None => return false,
    };
    board.generate_legal_moves().is_empty() && !board.in_check(board.side_to_move)
}
