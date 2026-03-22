(function () {
  'use strict';

  var ROWS = 6, COLS = 7;
  var EMPTY = 0, RED = 1, YELLOW = 2;
  var DEPTH_MAP = [0, 1, 2, 3, 5, 7];

  var NS = 'http://www.w3.org/2000/svg';
  var BOARD_COLOR = '#1565c0';
  var RED_COLOR = '#e53935';
  var YELLOW_COLOR = '#fdd835';
  var HOLE_COLOR = '#e8e8e8';

  var state;

  // ==================== Game Logic ====================

  function createBoard() {
    var board = new Array(ROWS * COLS);
    for (var i = 0; i < board.length; i++) board[i] = EMPTY;
    return board;
  }

  function opponent(player) {
    return player === RED ? YELLOW : RED;
  }

  function getLowestRow(board, col) {
    for (var r = ROWS - 1; r >= 0; r--) {
      if (board[r * COLS + col] === EMPTY) return r;
    }
    return -1;
  }

  function getValidColumns(board) {
    var cols = [];
    for (var c = 0; c < COLS; c++) {
      if (board[c] === EMPTY) cols.push(c);
    }
    return cols;
  }

  function dropPiece(board, col, player) {
    var row = getLowestRow(board, col);
    if (row < 0) return null;
    var newBoard = board.slice();
    newBoard[row * COLS + col] = player;
    return { board: newBoard, row: row };
  }

  function checkWinAt(board, row, col, player) {
    var dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (var d = 0; d < dirs.length; d++) {
      var dr = dirs[d][0], dc = dirs[d][1];
      var count = 1;
      // Forward
      var r = row + dr, c = col + dc;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r * COLS + c] === player) {
        count++;
        r += dr;
        c += dc;
      }
      // Backward
      r = row - dr;
      c = col - dc;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r * COLS + c] === player) {
        count++;
        r -= dr;
        c -= dc;
      }
      if (count >= 4) return true;
    }
    return false;
  }

  function isBoardFull(board) {
    for (var c = 0; c < COLS; c++) {
      if (board[c] === EMPTY) return false;
    }
    return true;
  }

  // ==================== AI ====================

  function scoreWindow(cells, aiPlayer) {
    var opp = opponent(aiPlayer);
    var my = 0, op = 0, empty = 0;
    for (var i = 0; i < 4; i++) {
      if (cells[i] === aiPlayer) my++;
      else if (cells[i] === opp) op++;
      else empty++;
    }
    if (my === 4) return 10000;
    if (op === 4) return -10000;
    if (my === 3 && empty === 1) return 5;
    if (my === 2 && empty === 2) return 2;
    if (op === 3 && empty === 1) return -4;
    return 0;
  }

  function evaluate(board, aiPlayer) {
    var score = 0;

    // Center column preference
    var centerCol = Math.floor(COLS / 2);
    var centerCount = 0;
    for (var r = 0; r < ROWS; r++) {
      if (board[r * COLS + centerCol] === aiPlayer) centerCount++;
    }
    score += centerCount * 3;

    // Horizontal windows
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c <= COLS - 4; c++) {
        var cells = [board[r * COLS + c], board[r * COLS + c + 1], board[r * COLS + c + 2], board[r * COLS + c + 3]];
        score += scoreWindow(cells, aiPlayer);
      }
    }

    // Vertical windows
    for (var c = 0; c < COLS; c++) {
      for (var r = 0; r <= ROWS - 4; r++) {
        var cells = [board[r * COLS + c], board[(r + 1) * COLS + c], board[(r + 2) * COLS + c], board[(r + 3) * COLS + c]];
        score += scoreWindow(cells, aiPlayer);
      }
    }

    // Diagonal (down-right) windows
    for (var r = 0; r <= ROWS - 4; r++) {
      for (var c = 0; c <= COLS - 4; c++) {
        var cells = [board[r * COLS + c], board[(r + 1) * COLS + c + 1], board[(r + 2) * COLS + c + 2], board[(r + 3) * COLS + c + 3]];
        score += scoreWindow(cells, aiPlayer);
      }
    }

    // Diagonal (down-left) windows
    for (var r = 0; r <= ROWS - 4; r++) {
      for (var c = 3; c < COLS; c++) {
        var cells = [board[r * COLS + c], board[(r + 1) * COLS + c - 1], board[(r + 2) * COLS + c - 2], board[(r + 3) * COLS + c - 3]];
        score += scoreWindow(cells, aiPlayer);
      }
    }

    return score;
  }

  // Order columns: center first for better pruning
  function orderedColumns() {
    var center = Math.floor(COLS / 2);
    var cols = [center];
    for (var d = 1; d <= center; d++) {
      if (center - d >= 0) cols.push(center - d);
      if (center + d < COLS) cols.push(center + d);
    }
    return cols;
  }

  var ORDERED_COLS = orderedColumns();

  function minimax(board, player, aiPlayer, depth, alpha, beta, maximizing) {
    var validCols = getValidColumns(board);
    var full = isBoardFull(board);

    if (depth === 0 || full || validCols.length === 0) {
      return { score: evaluate(board, aiPlayer), col: -1 };
    }

    var bestCol = validCols[0];

    if (maximizing) {
      var maxScore = -Infinity;
      for (var i = 0; i < ORDERED_COLS.length; i++) {
        var c = ORDERED_COLS[i];
        var result = dropPiece(board, c, player);
        if (!result) continue;
        // Check for immediate win
        if (checkWinAt(result.board, result.row, c, player)) {
          return { score: player === aiPlayer ? 100000 + depth : -100000 - depth, col: c };
        }
        var s = minimax(result.board, opponent(player), aiPlayer, depth - 1, alpha, beta, false).score;
        if (s > maxScore) {
          maxScore = s;
          bestCol = c;
        }
        alpha = Math.max(alpha, s);
        if (beta <= alpha) break;
      }
      return { score: maxScore, col: bestCol };
    } else {
      var minScore = Infinity;
      for (var i = 0; i < ORDERED_COLS.length; i++) {
        var c = ORDERED_COLS[i];
        var result = dropPiece(board, c, player);
        if (!result) continue;
        if (checkWinAt(result.board, result.row, c, player)) {
          return { score: player === aiPlayer ? 100000 + depth : -100000 - depth, col: c };
        }
        var s = minimax(result.board, opponent(player), aiPlayer, depth - 1, alpha, beta, true).score;
        if (s < minScore) {
          minScore = s;
          bestCol = c;
        }
        beta = Math.min(beta, s);
        if (beta <= alpha) break;
      }
      return { score: minScore, col: bestCol };
    }
  }

  function chooseBestMove(board, player, difficulty) {
    var depth = DEPTH_MAP[difficulty] || 3;
    var result = minimax(board, player, player, depth, -Infinity, Infinity, true);
    return result.col;
  }

  // ==================== Rendering ====================

  function createSvgElement(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  }

  function render() {
    var container = document.getElementById('board-container');
    container.innerHTML = '';

    var padding = 0.5;
    var totalW = COLS + 2 * padding;
    var totalH = ROWS + 2 * padding;

    var svg = createSvgElement('svg', {
      viewBox: '0 0 ' + totalW + ' ' + totalH
    });

    // Board background
    svg.appendChild(createSvgElement('rect', {
      x: 0, y: 0, width: totalW, height: totalH, fill: BOARD_COLOR, rx: 0.3
    }));

    // Cells
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var cell = state.board[r * COLS + c];
        var cx = padding + c + 0.5;
        var cy = padding + r + 0.5;
        var fill = HOLE_COLOR;
        if (cell === RED) fill = RED_COLOR;
        else if (cell === YELLOW) fill = YELLOW_COLOR;

        var piece = createSvgElement('circle', {
          cx: cx, cy: cy, r: 0.42, fill: fill
        });

        // Highlight last move
        if (state.lastMove && state.lastMove.row === r && state.lastMove.col === c) {
          piece.setAttribute('stroke', '#333');
          piece.setAttribute('stroke-width', '0.06');
        }

        svg.appendChild(piece);
      }
    }

    // Column click targets and hover highlights
    if (!state.gameOver && state.currentPlayer === state.humanColor) {
      var validCols = getValidColumns(state.board);
      for (var i = 0; i < validCols.length; i++) {
        (function (col) {
          var target = createSvgElement('rect', {
            x: padding + col, y: 0, width: 1, height: totalH,
            fill: 'transparent', cursor: 'pointer'
          });
          target.addEventListener('mouseenter', function () {
            target.setAttribute('fill', 'rgba(255,255,255,0.1)');
          });
          target.addEventListener('mouseleave', function () {
            target.setAttribute('fill', 'transparent');
          });
          target.addEventListener('click', function () {
            humanMove(col);
          });
          svg.appendChild(target);
        })(validCols[i]);
      }
    }

    container.appendChild(svg);
  }

  function setStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  // ==================== Game Controller ====================

  function startGame() {
    var humanColor = parseInt(document.getElementById('player-color').value, 10);
    var difficulty = parseInt(document.getElementById('difficulty').value, 10);

    state = {
      board: createBoard(),
      currentPlayer: RED,
      humanColor: humanColor,
      aiColor: opponent(humanColor),
      difficulty: difficulty,
      gameOver: false,
      lastMove: null
    };

    render();
    setStatus('');

    if (state.currentPlayer === state.aiColor) {
      aiTurn();
    } else {
      setStatus('Your turn.');
    }
  }

  function humanMove(col) {
    if (state.gameOver || state.currentPlayer !== state.humanColor) return;

    var result = dropPiece(state.board, col, state.humanColor);
    if (!result) return;

    state.board = result.board;
    state.lastMove = { row: result.row, col: col };
    state.currentPlayer = opponent(state.currentPlayer);

    render();

    if (checkWinAt(state.board, result.row, col, state.humanColor)) {
      state.gameOver = true;
      render();
      setStatus('You win!');
      return;
    }
    if (isBoardFull(state.board)) {
      state.gameOver = true;
      render();
      setStatus('It\u2019s a draw!');
      return;
    }

    aiTurn();
  }

  function aiTurn() {
    if (state.gameOver) return;

    setStatus('Computer is thinking\u2026');
    setTimeout(function () {
      var col = chooseBestMove(state.board, state.aiColor, state.difficulty);
      var result = dropPiece(state.board, col, state.aiColor);
      if (!result) return;

      state.board = result.board;
      state.lastMove = { row: result.row, col: col };
      state.currentPlayer = opponent(state.currentPlayer);

      render();

      if (checkWinAt(state.board, result.row, col, state.aiColor)) {
        state.gameOver = true;
        render();
        setStatus('Computer wins!');
        return;
      }
      if (isBoardFull(state.board)) {
        state.gameOver = true;
        render();
        setStatus('It\u2019s a draw!');
        return;
      }

      setStatus('Your turn.');
    }, 50);
  }

  // ==================== Init ====================

  document.getElementById('new-game').addEventListener('click', startGame);
  startGame();
})();
