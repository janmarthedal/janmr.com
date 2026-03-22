(function () {
  'use strict';

  var EMPTY = 0, BLACK = 1, WHITE = 2;
  var DIRS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var DEPTH_MAP = [0, 1, 2, 3, 5, 7];

  var NS = 'http://www.w3.org/2000/svg';
  var BOARD_COLOR = '#2e7d32';
  var LINE_COLOR = '#256427';

  var state;

  // ==================== Game Logic ====================

  function createBoard(size) {
    var board = new Array(size * size);
    for (var i = 0; i < board.length; i++) board[i] = EMPTY;
    var mid = size / 2;
    board[(mid - 1) * size + (mid - 1)] = WHITE;
    board[(mid - 1) * size + mid] = BLACK;
    board[mid * size + (mid - 1)] = BLACK;
    board[mid * size + mid] = WHITE;
    return board;
  }

  function opponent(player) {
    return player === BLACK ? WHITE : BLACK;
  }

  function getFlips(board, size, player, row, col) {
    if (board[row * size + col] !== EMPTY) return null;
    var opp = opponent(player);
    var allFlips = [];
    for (var d = 0; d < DIRS.length; d++) {
      var dr = DIRS[d][0], dc = DIRS[d][1];
      var flips = [];
      var r = row + dr, c = col + dc;
      while (r >= 0 && r < size && c >= 0 && c < size && board[r * size + c] === opp) {
        flips.push(r * size + c);
        r += dr;
        c += dc;
      }
      if (flips.length > 0 && r >= 0 && r < size && c >= 0 && c < size && board[r * size + c] === player) {
        for (var i = 0; i < flips.length; i++) allFlips.push(flips[i]);
      }
    }
    return allFlips.length > 0 ? allFlips : null;
  }

  function getValidMoves(board, size, player) {
    var moves = [];
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        var flips = getFlips(board, size, player, r, c);
        if (flips) moves.push({ row: r, col: c, flips: flips });
      }
    }
    return moves;
  }

  function applyMove(board, size, player, row, col, flips) {
    var newBoard = board.slice();
    newBoard[row * size + col] = player;
    for (var i = 0; i < flips.length; i++) newBoard[flips[i]] = player;
    return newBoard;
  }

  function countPieces(board) {
    var b = 0, w = 0;
    for (var i = 0; i < board.length; i++) {
      if (board[i] === BLACK) b++;
      else if (board[i] === WHITE) w++;
    }
    return { black: b, white: w };
  }

  // ==================== AI ====================

  function evaluate(board, size, aiPlayer) {
    var opp = opponent(aiPlayer);
    var counts = countPieces(board);
    var myCount = aiPlayer === BLACK ? counts.black : counts.white;
    var oppCount = aiPlayer === BLACK ? counts.white : counts.black;

    // Piece difference
    var total = myCount + oppCount;
    var pieceDiff = total > 0 ? (myCount - oppCount) / total : 0;

    // Corner control
    var corners = [0, size - 1, (size - 1) * size, size * size - 1];
    var myCorners = 0, oppCorners = 0;
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === aiPlayer) myCorners++;
      else if (board[corners[i]] === opp) oppCorners++;
    }
    var cornerDiff = myCorners - oppCorners;

    // Mobility
    var myMoves = getValidMoves(board, size, aiPlayer).length;
    var oppMoves = getValidMoves(board, size, opp).length;
    var mobilityTotal = myMoves + oppMoves;
    var mobilityDiff = mobilityTotal > 0 ? (myMoves - oppMoves) / mobilityTotal : 0;

    return pieceDiff + 25 * cornerDiff + 5 * mobilityDiff;
  }

  function minimax(board, size, player, aiPlayer, depth, alpha, beta, maximizing) {
    var moves = getValidMoves(board, size, player);
    var oppMoves = getValidMoves(board, size, opponent(player));

    if (depth === 0 || (moves.length === 0 && oppMoves.length === 0)) {
      return { score: evaluate(board, size, aiPlayer), move: null };
    }

    if (moves.length === 0) {
      // Pass
      var result = minimax(board, size, opponent(player), aiPlayer, depth, alpha, beta, !maximizing);
      return { score: result.score, move: null };
    }

    var bestMove = moves[0];
    var bestScore;

    if (maximizing) {
      bestScore = -Infinity;
      for (var i = 0; i < moves.length; i++) {
        var m = moves[i];
        var newBoard = applyMove(board, size, player, m.row, m.col, m.flips);
        var s = minimax(newBoard, size, opponent(player), aiPlayer, depth - 1, alpha, beta, false).score;
        if (s > bestScore) {
          bestScore = s;
          bestMove = m;
        }
        alpha = Math.max(alpha, s);
        if (beta <= alpha) break;
      }
    } else {
      bestScore = Infinity;
      for (var i = 0; i < moves.length; i++) {
        var m = moves[i];
        var newBoard = applyMove(board, size, player, m.row, m.col, m.flips);
        var s = minimax(newBoard, size, opponent(player), aiPlayer, depth - 1, alpha, beta, true).score;
        if (s < bestScore) {
          bestScore = s;
          bestMove = m;
        }
        beta = Math.min(beta, s);
        if (beta <= alpha) break;
      }
    }

    return { score: bestScore, move: bestMove };
  }

  function chooseBestMove(board, size, player, difficulty) {
    var depth = DEPTH_MAP[difficulty] || 3;
    var result = minimax(board, size, player, player, depth, -Infinity, Infinity, true);
    return result.move;
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

    var size = state.size;
    var svg = createSvgElement('svg', {
      viewBox: '0 0 ' + size + ' ' + size
    });

    // Background
    svg.appendChild(createSvgElement('rect', {
      x: 0, y: 0, width: size, height: size, fill: BOARD_COLOR
    }));

    // Grid lines
    for (var i = 0; i <= size; i++) {
      svg.appendChild(createSvgElement('line', {
        x1: i, y1: 0, x2: i, y2: size, stroke: LINE_COLOR, 'stroke-width': 0.03
      }));
      svg.appendChild(createSvgElement('line', {
        x1: 0, y1: i, x2: size, y2: i, stroke: LINE_COLOR, 'stroke-width': 0.03
      }));
    }

    // Valid moves (translucent dots)
    var validMoves = state.gameOver || state.currentPlayer !== state.humanColor
      ? [] : getValidMoves(state.board, size, state.humanColor);

    for (var i = 0; i < validMoves.length; i++) {
      var vm = validMoves[i];
      var dot = createSvgElement('circle', {
        cx: vm.col + 0.5, cy: vm.row + 0.5, r: 0.12,
        fill: state.humanColor === BLACK ? '#000' : '#fff',
        opacity: 0.3
      });
      svg.appendChild(dot);
    }

    // Click targets for valid moves
    for (var i = 0; i < validMoves.length; i++) {
      (function (move) {
        var target = createSvgElement('rect', {
          x: move.col, y: move.row, width: 1, height: 1,
          fill: 'transparent', cursor: 'pointer'
        });
        target.addEventListener('click', function () {
          humanMove(move);
        });
        svg.appendChild(target);
      })(validMoves[i]);
    }

    // Pieces
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        var cell = state.board[r * size + c];
        if (cell === EMPTY) continue;
        var attrs = {
          cx: c + 0.5, cy: r + 0.5, r: 0.38
        };
        if (cell === BLACK) {
          attrs.fill = '#222';
        } else {
          attrs.fill = '#f0f0f0';
          attrs.stroke = '#999';
          attrs['stroke-width'] = '0.03';
        }
        var piece = createSvgElement('circle', attrs);

        // Highlight last move
        if (state.lastMove && state.lastMove.row === r && state.lastMove.col === c) {
          piece.setAttribute('stroke', '#e8c317');
          piece.setAttribute('stroke-width', '0.06');
        }

        svg.appendChild(piece);
      }
    }

    container.appendChild(svg);
    updateScore();
  }

  function updateScore() {
    var counts = countPieces(state.board);
    var scoreEl = document.getElementById('score');
    scoreEl.innerHTML =
      '<span>\u25CF Black: ' + counts.black + '</span>' +
      '<span>\u25CB White: ' + counts.white + '</span>';
  }

  function setStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  // ==================== Game Controller ====================

  function startGame() {
    var size = parseInt(document.getElementById('board-size').value, 10);
    var humanColor = parseInt(document.getElementById('player-color').value, 10);
    var difficulty = parseInt(document.getElementById('difficulty').value, 10);

    state = {
      size: size,
      board: createBoard(size),
      currentPlayer: BLACK,
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
    }
  }

  function humanMove(move) {
    if (state.gameOver || state.currentPlayer !== state.humanColor) return;

    state.board = applyMove(state.board, state.size, state.humanColor, move.row, move.col, move.flips);
    state.lastMove = { row: move.row, col: move.col };
    state.currentPlayer = opponent(state.currentPlayer);

    render();

    if (checkGameOver()) return;
    nextTurn();
  }

  function aiTurn() {
    if (state.gameOver) return;

    var aiMoves = getValidMoves(state.board, state.size, state.aiColor);
    if (aiMoves.length === 0) {
      // AI must pass
      setStatus('Computer passes.');
      state.currentPlayer = opponent(state.currentPlayer);
      setTimeout(function () {
        if (!checkGameOver()) {
          render();
          setStatus('Your turn.');
        }
      }, 800);
      return;
    }

    setStatus('Computer is thinking\u2026');
    setTimeout(function () {
      var move = chooseBestMove(state.board, state.size, state.aiColor, state.difficulty);
      if (!move) return;

      state.board = applyMove(state.board, state.size, state.aiColor, move.row, move.col, move.flips);
      state.lastMove = { row: move.row, col: move.col };
      state.currentPlayer = opponent(state.currentPlayer);

      render();

      if (checkGameOver()) return;
      nextTurn();
    }, 50);
  }

  function nextTurn() {
    if (state.currentPlayer === state.aiColor) {
      aiTurn();
    } else {
      // Check if human has moves
      var humanMoves = getValidMoves(state.board, state.size, state.humanColor);
      if (humanMoves.length === 0) {
        setStatus('You have no valid moves. Passing\u2026');
        state.currentPlayer = opponent(state.currentPlayer);
        setTimeout(function () {
          if (!checkGameOver()) {
            aiTurn();
          }
        }, 800);
      } else {
        setStatus('Your turn.');
      }
    }
  }

  function checkGameOver() {
    var blackMoves = getValidMoves(state.board, state.size, BLACK);
    var whiteMoves = getValidMoves(state.board, state.size, WHITE);
    if (blackMoves.length === 0 && whiteMoves.length === 0) {
      state.gameOver = true;
      render();
      var counts = countPieces(state.board);
      if (counts.black > counts.white) {
        setStatus('Game over. Black wins ' + counts.black + '\u2013' + counts.white + '!');
      } else if (counts.white > counts.black) {
        setStatus('Game over. White wins ' + counts.white + '\u2013' + counts.black + '!');
      } else {
        setStatus('Game over. It\u2019s a tie!');
      }
      return true;
    }
    return false;
  }

  // ==================== Init ====================

  document.getElementById('new-game').addEventListener('click', startGame);
  startGame();
})();
