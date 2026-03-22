use serde::Serialize;

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum Color {
    White,
    Black,
}

impl Color {
    pub fn opposite(self) -> Color {
        match self {
            Color::White => Color::Black,
            Color::Black => Color::White,
        }
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum PieceType {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King,
}

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub struct Piece {
    pub color: Color,
    pub piece_type: PieceType,
}

impl Piece {
    pub fn to_char(self) -> char {
        let c = match self.piece_type {
            PieceType::Pawn => 'p',
            PieceType::Knight => 'n',
            PieceType::Bishop => 'b',
            PieceType::Rook => 'r',
            PieceType::Queen => 'q',
            PieceType::King => 'k',
        };
        if self.color == Color::White {
            c.to_ascii_uppercase()
        } else {
            c
        }
    }

    pub fn from_char(c: char) -> Option<Piece> {
        let color = if c.is_ascii_uppercase() {
            Color::White
        } else {
            Color::Black
        };
        let piece_type = match c.to_ascii_lowercase() {
            'p' => PieceType::Pawn,
            'n' => PieceType::Knight,
            'b' => PieceType::Bishop,
            'r' => PieceType::Rook,
            'q' => PieceType::Queen,
            'k' => PieceType::King,
            _ => return None,
        };
        Some(Piece { color, piece_type })
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Debug, Serialize)]
pub struct Square(pub u8);

impl Square {
    pub fn new(rank: u8, file: u8) -> Square {
        Square(rank * 8 + file)
    }
    pub fn rank(self) -> u8 {
        self.0 / 8
    }
    pub fn file(self) -> u8 {
        self.0 % 8
    }
    pub fn to_algebraic(self) -> String {
        let file_char = (b'a' + self.file()) as char;
        let rank_char = (b'1' + self.rank()) as char;
        format!("{}{}", file_char, rank_char)
    }
    pub fn from_algebraic(s: &str) -> Option<Square> {
        let bytes = s.as_bytes();
        if bytes.len() < 2 {
            return None;
        }
        let file = bytes[0].wrapping_sub(b'a');
        let rank = bytes[1].wrapping_sub(b'1');
        if file < 8 && rank < 8 {
            Some(Square::new(rank, file))
        } else {
            None
        }
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Debug, Serialize)]
pub struct Move {
    pub from: Square,
    pub to: Square,
    pub promotion: Option<char>,
}

impl Move {
    pub fn to_uci(self) -> String {
        let mut s = format!("{}{}", self.from.to_algebraic(), self.to.to_algebraic());
        if let Some(p) = self.promotion {
            s.push(p);
        }
        s
    }

    pub fn from_uci(s: &str) -> Option<Move> {
        if s.len() < 4 {
            return None;
        }
        let from = Square::from_algebraic(&s[0..2])?;
        let to = Square::from_algebraic(&s[2..4])?;
        let promotion = if s.len() > 4 {
            Some(s.as_bytes()[4] as char)
        } else {
            None
        };
        Some(Move {
            from,
            to,
            promotion,
        })
    }
}

#[derive(Clone, Copy, Debug)]
pub struct CastlingRights {
    pub white_kingside: bool,
    pub white_queenside: bool,
    pub black_kingside: bool,
    pub black_queenside: bool,
}

#[derive(Clone, Debug)]
pub struct Board {
    pub squares: [Option<Piece>; 64],
    pub side_to_move: Color,
    pub castling: CastlingRights,
    pub en_passant: Option<Square>,
    pub halfmove_clock: u32,
    pub fullmove_number: u32,
}

impl Board {
    pub fn from_fen(fen: &str) -> Option<Board> {
        let parts: Vec<&str> = fen.split_whitespace().collect();
        if parts.len() < 4 {
            return None;
        }

        let mut squares = [None; 64];
        let ranks: Vec<&str> = parts[0].split('/').collect();
        if ranks.len() != 8 {
            return None;
        }

        for (ri, rank_str) in ranks.iter().enumerate() {
            let rank = 7 - ri as u8;
            let mut file: u8 = 0;
            for c in rank_str.chars() {
                if let Some(digit) = c.to_digit(10) {
                    file += digit as u8;
                } else if let Some(piece) = Piece::from_char(c) {
                    squares[(rank * 8 + file) as usize] = Some(piece);
                    file += 1;
                } else {
                    return None;
                }
            }
        }

        let side_to_move = match parts[1] {
            "w" => Color::White,
            "b" => Color::Black,
            _ => return None,
        };

        let castling = CastlingRights {
            white_kingside: parts[2].contains('K'),
            white_queenside: parts[2].contains('Q'),
            black_kingside: parts[2].contains('k'),
            black_queenside: parts[2].contains('q'),
        };

        let en_passant = if parts[3] == "-" {
            None
        } else {
            Square::from_algebraic(parts[3])
        };

        let halfmove_clock = parts.get(4).and_then(|s| s.parse().ok()).unwrap_or(0);
        let fullmove_number = parts.get(5).and_then(|s| s.parse().ok()).unwrap_or(1);

        Some(Board {
            squares,
            side_to_move,
            castling,
            en_passant,
            halfmove_clock,
            fullmove_number,
        })
    }

    pub fn to_fen(&self) -> String {
        let mut fen = String::new();

        for rank in (0..8).rev() {
            let mut empty = 0;
            for file in 0..8 {
                match self.squares[rank * 8 + file] {
                    Some(piece) => {
                        if empty > 0 {
                            fen.push(char::from_digit(empty, 10).unwrap());
                            empty = 0;
                        }
                        fen.push(piece.to_char());
                    }
                    None => empty += 1,
                }
            }
            if empty > 0 {
                fen.push(char::from_digit(empty, 10).unwrap());
            }
            if rank > 0 {
                fen.push('/');
            }
        }

        fen.push(' ');
        fen.push(match self.side_to_move {
            Color::White => 'w',
            Color::Black => 'b',
        });

        fen.push(' ');
        let mut castling_str = String::new();
        if self.castling.white_kingside {
            castling_str.push('K');
        }
        if self.castling.white_queenside {
            castling_str.push('Q');
        }
        if self.castling.black_kingside {
            castling_str.push('k');
        }
        if self.castling.black_queenside {
            castling_str.push('q');
        }
        if castling_str.is_empty() {
            fen.push('-');
        } else {
            fen.push_str(&castling_str);
        }

        fen.push(' ');
        match self.en_passant {
            Some(sq) => fen.push_str(&sq.to_algebraic()),
            None => fen.push('-'),
        }

        fen.push_str(&format!(
            " {} {}",
            self.halfmove_clock, self.fullmove_number
        ));

        fen
    }

    pub fn piece_at(&self, sq: Square) -> Option<Piece> {
        self.squares[sq.0 as usize]
    }

    pub fn find_king(&self, color: Color) -> Option<Square> {
        for i in 0..64 {
            if let Some(p) = self.squares[i] {
                if p.color == color && p.piece_type == PieceType::King {
                    return Some(Square(i as u8));
                }
            }
        }
        None
    }

    pub fn is_square_attacked(&self, sq: Square, by_color: Color) -> bool {
        let rank = sq.rank() as i8;
        let file = sq.file() as i8;

        // Knight attacks
        for &(dr, df) in &[
            (-2, -1),
            (-2, 1),
            (-1, -2),
            (-1, 2),
            (1, -2),
            (1, 2),
            (2, -1),
            (2, 1),
        ] {
            let r = rank + dr;
            let f = file + df;
            if r >= 0 && r < 8 && f >= 0 && f < 8 {
                let s = Square::new(r as u8, f as u8);
                if let Some(p) = self.piece_at(s) {
                    if p.color == by_color && p.piece_type == PieceType::Knight {
                        return true;
                    }
                }
            }
        }

        // King attacks
        for dr in -1..=1 {
            for df in -1..=1 {
                if dr == 0 && df == 0 {
                    continue;
                }
                let r = rank + dr;
                let f = file + df;
                if r >= 0 && r < 8 && f >= 0 && f < 8 {
                    let s = Square::new(r as u8, f as u8);
                    if let Some(p) = self.piece_at(s) {
                        if p.color == by_color && p.piece_type == PieceType::King {
                            return true;
                        }
                    }
                }
            }
        }

        // Pawn attacks
        let pawn_dir: i8 = if by_color == Color::White { -1 } else { 1 };
        for &df in &[-1i8, 1] {
            let r = rank + pawn_dir;
            let f = file + df;
            if r >= 0 && r < 8 && f >= 0 && f < 8 {
                let s = Square::new(r as u8, f as u8);
                if let Some(p) = self.piece_at(s) {
                    if p.color == by_color && p.piece_type == PieceType::Pawn {
                        return true;
                    }
                }
            }
        }

        // Sliding pieces: bishop/queen (diagonals)
        for &(dr, df) in &[(-1, -1), (-1, 1), (1, -1), (1, 1)] {
            let mut r = rank + dr;
            let mut f = file + df;
            while r >= 0 && r < 8 && f >= 0 && f < 8 {
                let s = Square::new(r as u8, f as u8);
                if let Some(p) = self.piece_at(s) {
                    if p.color == by_color
                        && (p.piece_type == PieceType::Bishop || p.piece_type == PieceType::Queen)
                    {
                        return true;
                    }
                    break;
                }
                r += dr;
                f += df;
            }
        }

        // Sliding pieces: rook/queen (ranks/files)
        for &(dr, df) in &[(-1, 0), (1, 0), (0, -1), (0, 1)] {
            let mut r = rank + dr;
            let mut f = file + df;
            while r >= 0 && r < 8 && f >= 0 && f < 8 {
                let s = Square::new(r as u8, f as u8);
                if let Some(p) = self.piece_at(s) {
                    if p.color == by_color
                        && (p.piece_type == PieceType::Rook || p.piece_type == PieceType::Queen)
                    {
                        return true;
                    }
                    break;
                }
                r += dr;
                f += df;
            }
        }

        false
    }

    pub fn in_check(&self, color: Color) -> bool {
        if let Some(king_sq) = self.find_king(color) {
            self.is_square_attacked(king_sq, color.opposite())
        } else {
            false
        }
    }

    pub fn make_move(&self, mv: Move) -> Board {
        let mut new_board = self.clone();
        let piece = self.squares[mv.from.0 as usize];
        let from_rank = mv.from.rank();
        let to_rank = mv.to.rank();

        // Move piece
        new_board.squares[mv.to.0 as usize] = piece;
        new_board.squares[mv.from.0 as usize] = None;

        if let Some(p) = piece {
            // Handle promotion
            if let Some(promo_char) = mv.promotion {
                let promo_type = match promo_char {
                    'q' => PieceType::Queen,
                    'r' => PieceType::Rook,
                    'b' => PieceType::Bishop,
                    'n' => PieceType::Knight,
                    _ => PieceType::Queen,
                };
                new_board.squares[mv.to.0 as usize] = Some(Piece {
                    color: p.color,
                    piece_type: promo_type,
                });
            }

            // Handle en passant capture
            if p.piece_type == PieceType::Pawn {
                if Some(mv.to) == self.en_passant {
                    let captured_rank = if p.color == Color::White {
                        mv.to.rank() - 1
                    } else {
                        mv.to.rank() + 1
                    };
                    new_board.squares[Square::new(captured_rank, mv.to.file()).0 as usize] = None;
                }
            }

            // Set en passant square
            if p.piece_type == PieceType::Pawn
                && ((from_rank == 1 && to_rank == 3) || (from_rank == 6 && to_rank == 4))
            {
                let ep_rank = (from_rank + to_rank) / 2;
                new_board.en_passant = Some(Square::new(ep_rank, mv.from.file()));
            } else {
                new_board.en_passant = None;
            }

            // Handle castling move
            if p.piece_type == PieceType::King {
                let file_diff = mv.to.file() as i8 - mv.from.file() as i8;
                if file_diff.abs() == 2 {
                    // Castling
                    let rank = mv.from.rank();
                    if file_diff > 0 {
                        // Kingside
                        new_board.squares[Square::new(rank, 7).0 as usize] = None;
                        new_board.squares[Square::new(rank, 5).0 as usize] = Some(Piece {
                            color: p.color,
                            piece_type: PieceType::Rook,
                        });
                    } else {
                        // Queenside
                        new_board.squares[Square::new(rank, 0).0 as usize] = None;
                        new_board.squares[Square::new(rank, 3).0 as usize] = Some(Piece {
                            color: p.color,
                            piece_type: PieceType::Rook,
                        });
                    }
                }
            }

            // Update castling rights
            if p.piece_type == PieceType::King {
                match p.color {
                    Color::White => {
                        new_board.castling.white_kingside = false;
                        new_board.castling.white_queenside = false;
                    }
                    Color::Black => {
                        new_board.castling.black_kingside = false;
                        new_board.castling.black_queenside = false;
                    }
                }
            }
            if p.piece_type == PieceType::Rook {
                if mv.from.0 == 0 {
                    new_board.castling.white_queenside = false;
                }
                if mv.from.0 == 7 {
                    new_board.castling.white_kingside = false;
                }
                if mv.from.0 == 56 {
                    new_board.castling.black_queenside = false;
                }
                if mv.from.0 == 63 {
                    new_board.castling.black_kingside = false;
                }
            }
            // Also update castling if a rook is captured
            if mv.to.0 == 0 {
                new_board.castling.white_queenside = false;
            }
            if mv.to.0 == 7 {
                new_board.castling.white_kingside = false;
            }
            if mv.to.0 == 56 {
                new_board.castling.black_queenside = false;
            }
            if mv.to.0 == 63 {
                new_board.castling.black_kingside = false;
            }

            // Update halfmove clock
            if p.piece_type == PieceType::Pawn || self.squares[mv.to.0 as usize].is_some() {
                new_board.halfmove_clock = 0;
            } else {
                new_board.halfmove_clock = self.halfmove_clock + 1;
            }
        }

        // Update fullmove number
        if self.side_to_move == Color::Black {
            new_board.fullmove_number = self.fullmove_number + 1;
        }

        new_board.side_to_move = self.side_to_move.opposite();
        new_board
    }

    pub fn generate_legal_moves(&self) -> Vec<Move> {
        let pseudo_moves = self.generate_pseudo_legal_moves();
        pseudo_moves
            .into_iter()
            .filter(|mv| {
                let new_board = self.make_move(*mv);
                !new_board.in_check(self.side_to_move)
            })
            .collect()
    }

    fn generate_pseudo_legal_moves(&self) -> Vec<Move> {
        let mut moves = Vec::with_capacity(64);
        let color = self.side_to_move;

        for i in 0..64 {
            if let Some(piece) = self.squares[i] {
                if piece.color != color {
                    continue;
                }
                let sq = Square(i as u8);
                match piece.piece_type {
                    PieceType::Pawn => self.gen_pawn_moves(sq, color, &mut moves),
                    PieceType::Knight => self.gen_knight_moves(sq, color, &mut moves),
                    PieceType::Bishop => {
                        self.gen_sliding_moves(sq, color, &BISHOP_DIRS, &mut moves)
                    }
                    PieceType::Rook => self.gen_sliding_moves(sq, color, &ROOK_DIRS, &mut moves),
                    PieceType::Queen => {
                        self.gen_sliding_moves(sq, color, &BISHOP_DIRS, &mut moves);
                        self.gen_sliding_moves(sq, color, &ROOK_DIRS, &mut moves);
                    }
                    PieceType::King => self.gen_king_moves(sq, color, &mut moves),
                }
            }
        }
        moves
    }

    fn add_move(&self, from: Square, to: Square, promotion: Option<char>, moves: &mut Vec<Move>) {
        moves.push(Move {
            from,
            to,
            promotion,
        });
    }

    fn gen_pawn_moves(&self, sq: Square, color: Color, moves: &mut Vec<Move>) {
        let rank = sq.rank() as i8;
        let file = sq.file() as i8;
        let dir: i8 = if color == Color::White { 1 } else { -1 };
        let start_rank: i8 = if color == Color::White { 1 } else { 6 };
        let promo_rank: i8 = if color == Color::White { 7 } else { 0 };

        // Single push
        let new_rank = rank + dir;
        if new_rank >= 0 && new_rank < 8 {
            let to = Square::new(new_rank as u8, file as u8);
            if self.piece_at(to).is_none() {
                if new_rank == promo_rank {
                    for p in &['q', 'r', 'b', 'n'] {
                        self.add_move(sq, to, Some(*p), moves);
                    }
                } else {
                    self.add_move(sq, to, None, moves);
                    // Double push
                    if rank == start_rank {
                        let double_to = Square::new((rank + 2 * dir) as u8, file as u8);
                        if self.piece_at(double_to).is_none() {
                            self.add_move(sq, double_to, None, moves);
                        }
                    }
                }
            }
        }

        // Captures
        for &df in &[-1i8, 1] {
            let nf = file + df;
            if new_rank >= 0 && new_rank < 8 && nf >= 0 && nf < 8 {
                let to = Square::new(new_rank as u8, nf as u8);
                let is_capture = self
                    .piece_at(to)
                    .map_or(false, |p| p.color != color);
                let is_ep = Some(to) == self.en_passant;
                if is_capture || is_ep {
                    if new_rank == promo_rank {
                        for p in &['q', 'r', 'b', 'n'] {
                            self.add_move(sq, to, Some(*p), moves);
                        }
                    } else {
                        self.add_move(sq, to, None, moves);
                    }
                }
            }
        }
    }

    fn gen_knight_moves(&self, sq: Square, color: Color, moves: &mut Vec<Move>) {
        let rank = sq.rank() as i8;
        let file = sq.file() as i8;
        for &(dr, df) in &[
            (-2, -1),
            (-2, 1),
            (-1, -2),
            (-1, 2),
            (1, -2),
            (1, 2),
            (2, -1),
            (2, 1),
        ] {
            let r = rank + dr;
            let f = file + df;
            if r >= 0 && r < 8 && f >= 0 && f < 8 {
                let to = Square::new(r as u8, f as u8);
                if self.piece_at(to).map_or(true, |p| p.color != color) {
                    self.add_move(sq, to, None, moves);
                }
            }
        }
    }

    fn gen_sliding_moves(
        &self,
        sq: Square,
        color: Color,
        dirs: &[(i8, i8)],
        moves: &mut Vec<Move>,
    ) {
        let rank = sq.rank() as i8;
        let file = sq.file() as i8;
        for &(dr, df) in dirs {
            let mut r = rank + dr;
            let mut f = file + df;
            while r >= 0 && r < 8 && f >= 0 && f < 8 {
                let to = Square::new(r as u8, f as u8);
                match self.piece_at(to) {
                    None => self.add_move(sq, to, None, moves),
                    Some(p) => {
                        if p.color != color {
                            self.add_move(sq, to, None, moves);
                        }
                        break;
                    }
                }
                r += dr;
                f += df;
            }
        }
    }

    fn gen_king_moves(&self, sq: Square, color: Color, moves: &mut Vec<Move>) {
        let rank = sq.rank() as i8;
        let file = sq.file() as i8;
        for dr in -1..=1 {
            for df in -1..=1 {
                if dr == 0 && df == 0 {
                    continue;
                }
                let r = rank + dr;
                let f = file + df;
                if r >= 0 && r < 8 && f >= 0 && f < 8 {
                    let to = Square::new(r as u8, f as u8);
                    if self.piece_at(to).map_or(true, |p| p.color != color) {
                        self.add_move(sq, to, None, moves);
                    }
                }
            }
        }

        // Castling
        let enemy = color.opposite();
        if !self.in_check(color) {
            let (kingside, queenside, base_rank) = match color {
                Color::White => (
                    self.castling.white_kingside,
                    self.castling.white_queenside,
                    0u8,
                ),
                Color::Black => (
                    self.castling.black_kingside,
                    self.castling.black_queenside,
                    7u8,
                ),
            };

            if kingside {
                let f_sq = Square::new(base_rank, 5);
                let g_sq = Square::new(base_rank, 6);
                if self.piece_at(f_sq).is_none()
                    && self.piece_at(g_sq).is_none()
                    && !self.is_square_attacked(f_sq, enemy)
                    && !self.is_square_attacked(g_sq, enemy)
                {
                    self.add_move(sq, g_sq, None, moves);
                }
            }

            if queenside {
                let d_sq = Square::new(base_rank, 3);
                let c_sq = Square::new(base_rank, 2);
                let b_sq = Square::new(base_rank, 1);
                if self.piece_at(d_sq).is_none()
                    && self.piece_at(c_sq).is_none()
                    && self.piece_at(b_sq).is_none()
                    && !self.is_square_attacked(d_sq, enemy)
                    && !self.is_square_attacked(c_sq, enemy)
                {
                    self.add_move(sq, c_sq, None, moves);
                }
            }
        }
    }
}

const BISHOP_DIRS: [(i8, i8); 4] = [(-1, -1), (-1, 1), (1, -1), (1, 1)];
const ROOK_DIRS: [(i8, i8); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

pub const START_FEN: &str = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
