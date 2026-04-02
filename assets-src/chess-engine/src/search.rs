use crate::board::{Board, Move, PieceType};
use crate::eval::evaluate;

const MATE_SCORE: i32 = 100_000;

fn move_ordering_score(board: &Board, mv: &Move) -> i32 {
    let mut score = 0;

    // Captures: MVV-LVA (Most Valuable Victim - Least Valuable Attacker)
    if let Some(captured) = board.piece_at(mv.to) {
        let victim_val = piece_value(captured.piece_type);
        let attacker_val = board
            .piece_at(mv.from)
            .map_or(0, |p| piece_value(p.piece_type));
        score += 10 * victim_val - attacker_val;
    }

    // Promotions
    if mv.promotion.is_some() {
        score += 800;
    }

    score
}

fn piece_value(pt: PieceType) -> i32 {
    match pt {
        PieceType::Pawn => 1,
        PieceType::Knight => 3,
        PieceType::Bishop => 3,
        PieceType::Rook => 5,
        PieceType::Queen => 9,
        PieceType::King => 100,
    }
}

fn alpha_beta(board: &Board, depth: u32, mut alpha: i32, beta: i32) -> i32 {
    if depth == 0 {
        return quiesce(board, alpha, beta);
    }

    let mut moves = board.generate_legal_moves();

    if moves.is_empty() {
        if board.in_check(board.side_to_move) {
            return -MATE_SCORE - depth as i32; // Checkmate (prefer shorter mates)
        }
        return 0; // Stalemate
    }

    // Sort moves for better pruning
    moves.sort_by(|a, b| {
        move_ordering_score(board, b).cmp(&move_ordering_score(board, a))
    });

    for mv in moves {
        let new_board = board.make_move(mv);
        let score = -alpha_beta(&new_board, depth - 1, -beta, -alpha);

        if score >= beta {
            return beta;
        }
        if score > alpha {
            alpha = score;
        }
    }

    alpha
}

fn quiesce(board: &Board, mut alpha: i32, beta: i32) -> i32 {
    let stand_pat = evaluate(board);

    if stand_pat >= beta {
        return beta;
    }
    if stand_pat > alpha {
        alpha = stand_pat;
    }

    let moves = board.generate_legal_moves();
    let mut captures: Vec<Move> = moves
        .into_iter()
        .filter(|mv| board.piece_at(mv.to).is_some() || mv.promotion.is_some())
        .collect();

    captures.sort_by(|a, b| {
        move_ordering_score(board, b).cmp(&move_ordering_score(board, a))
    });

    for mv in captures {
        let new_board = board.make_move(mv);
        let score = -quiesce(&new_board, -beta, -alpha);

        if score >= beta {
            return beta;
        }
        if score > alpha {
            alpha = score;
        }
    }

    alpha
}

pub fn find_best_move(board: &Board, depth: u32) -> Option<Move> {
    let mut moves = board.generate_legal_moves();
    if moves.is_empty() {
        return None;
    }

    moves.sort_by(|a, b| {
        move_ordering_score(board, b).cmp(&move_ordering_score(board, a))
    });

    let mut best_move = moves[0];
    let mut best_score = i32::MIN + 1;

    for mv in &moves {
        let new_board = board.make_move(*mv);
        let score = -alpha_beta(&new_board, depth - 1, i32::MIN + 1, -best_score);

        if score > best_score {
            best_score = score;
            best_move = *mv;
        }
    }

    Some(best_move)
}
