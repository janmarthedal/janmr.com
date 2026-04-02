use crate::board::{Board, Color, PieceType};

// Piece values in centipawns
const PAWN_VALUE: i32 = 100;
const KNIGHT_VALUE: i32 = 320;
const BISHOP_VALUE: i32 = 330;
const ROOK_VALUE: i32 = 500;
const QUEEN_VALUE: i32 = 900;

// Piece-square tables (from White's perspective, rank 0 at bottom)
// Values are centipawns bonus/penalty for piece placement

#[rustfmt::skip]
const PAWN_TABLE: [i32; 64] = [
     0,  0,  0,  0,  0,  0,  0,  0,
     5, 10, 10,-20,-20, 10, 10,  5,
     5, -5,-10,  0,  0,-10, -5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5,  5, 10, 25, 25, 10,  5,  5,
    10, 10, 20, 30, 30, 20, 10, 10,
    50, 50, 50, 50, 50, 50, 50, 50,
     0,  0,  0,  0,  0,  0,  0,  0,
];

#[rustfmt::skip]
const KNIGHT_TABLE: [i32; 64] = [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50,
];

#[rustfmt::skip]
const BISHOP_TABLE: [i32; 64] = [
    -20,-10,-10,-10,-10,-10,-10,-20,
    -10,  5,  0,  0,  0,  0,  5,-10,
    -10, 10, 10, 10, 10, 10, 10,-10,
    -10,  0, 10, 10, 10, 10,  0,-10,
    -10,  5,  5, 10, 10,  5,  5,-10,
    -10,  0,  5, 10, 10,  5,  0,-10,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -20,-10,-10,-10,-10,-10,-10,-20,
];

#[rustfmt::skip]
const ROOK_TABLE: [i32; 64] = [
     0,  0,  0,  5,  5,  0,  0,  0,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
     5, 10, 10, 10, 10, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0,
];

#[rustfmt::skip]
const QUEEN_TABLE: [i32; 64] = [
    -20,-10,-10, -5, -5,-10,-10,-20,
    -10,  0,  5,  0,  0,  0,  0,-10,
    -10,  5,  5,  5,  5,  5,  0,-10,
      0,  0,  5,  5,  5,  5,  0, -5,
     -5,  0,  5,  5,  5,  5,  0, -5,
    -10,  0,  5,  5,  5,  5,  0,-10,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -20,-10,-10, -5, -5,-10,-10,-20,
];

#[rustfmt::skip]
const KING_MIDDLEGAME_TABLE: [i32; 64] = [
     20, 30, 10,  0,  0, 10, 30, 20,
     20, 20,  0,  0,  0,  0, 20, 20,
    -10,-20,-20,-20,-20,-20,-20,-10,
    -20,-30,-30,-40,-40,-30,-30,-20,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
];

fn piece_square_value(piece_type: PieceType, sq_index: usize, color: Color) -> i32 {
    let index = if color == Color::White {
        sq_index
    } else {
        // Mirror vertically for black
        let rank = sq_index / 8;
        let file = sq_index % 8;
        (7 - rank) * 8 + file
    };

    match piece_type {
        PieceType::Pawn => PAWN_TABLE[index],
        PieceType::Knight => KNIGHT_TABLE[index],
        PieceType::Bishop => BISHOP_TABLE[index],
        PieceType::Rook => ROOK_TABLE[index],
        PieceType::Queen => QUEEN_TABLE[index],
        PieceType::King => KING_MIDDLEGAME_TABLE[index],
    }
}

pub fn evaluate(board: &Board) -> i32 {
    let mut score: i32 = 0;

    for i in 0..64 {
        if let Some(piece) = board.squares[i] {
            let material = match piece.piece_type {
                PieceType::Pawn => PAWN_VALUE,
                PieceType::Knight => KNIGHT_VALUE,
                PieceType::Bishop => BISHOP_VALUE,
                PieceType::Rook => ROOK_VALUE,
                PieceType::Queen => QUEEN_VALUE,
                PieceType::King => 0,
            };

            let positional = piece_square_value(piece.piece_type, i, piece.color);

            match piece.color {
                Color::White => score += material + positional,
                Color::Black => score -= material + positional,
            }
        }
    }

    // Return score relative to side to move
    if board.side_to_move == Color::White {
        score
    } else {
        -score
    }
}
