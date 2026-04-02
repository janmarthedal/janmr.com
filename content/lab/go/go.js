(function () {
  'use strict';

  var EMPTY = 0, BLACK = 1, WHITE = 2;

  var NS = 'http://www.w3.org/2000/svg';
  var BOARD_COLOR = '#DCB35C';
  var LINE_COLOR = '#4a3728';

  var KOMI = { 9: 6.5, 13: 6.5, 19: 7.5 };

  // Star points (hoshi): [row, col] in 0-indexed board coordinates
  var STAR_POINTS = {
    9: [[2, 2], [2, 6], [4, 4], [6, 2], [6, 6]],
    13: [[3, 3], [3, 9], [6, 6], [9, 3], [9, 9]],
    19: [[3, 3], [3, 9], [3, 15], [9, 3], [9, 9], [9, 15], [15, 3], [15, 9], [15, 15]]
  };

  var state;

  // ==================== Helpers ====================

  function opponent(player) {
    return player === BLACK ? WHITE : BLACK;
  }

  function getNeighbors(row, col, size) {
    var result = [];
    if (row > 0) result.push((row - 1) * size + col);
    if (row < size - 1) result.push((row + 1) * size + col);
    if (col > 0) result.push(row * size + (col - 1));
    if (col < size - 1) result.push(row * size + (col + 1));
    return result;
  }

  // ==================== Go Rules ====================

  function getGroup(board, size, index) {
    var color = board[index];
    var n = board.length;
    var inGroup = new Uint8Array(n);
    var inLib = new Uint8Array(n);
    var stones = [];
    var liberties = [];
    var queue = [index];
    inGroup[index] = 1;
    stones.push(index);

    while (queue.length > 0) {
      var cur = queue.pop();
      var r = (cur / size) | 0;
      var c = cur % size;
      var neighbors = getNeighbors(r, c, size);
      for (var i = 0; i < neighbors.length; i++) {
        var nb = neighbors[i];
        if (board[nb] === EMPTY && !inLib[nb]) {
          inLib[nb] = 1;
          liberties.push(nb);
        } else if (board[nb] === color && !inGroup[nb]) {
          inGroup[nb] = 1;
          stones.push(nb);
          queue.push(nb);
        }
      }
    }
    return { stones: stones, liberties: liberties };
  }

  function playMove(board, size, player, index, koPoint) {
    if (board[index] !== EMPTY) return null;
    if (index === koPoint) return null;

    var newBoard = board.slice();
    newBoard[index] = player;
    var opp = opponent(player);
    var r = (index / size) | 0;
    var c = index % size;
    var neighbors = getNeighbors(r, c, size);

    var captured = [];
    var seen = new Uint8Array(newBoard.length);

    for (var i = 0; i < neighbors.length; i++) {
      var nb = neighbors[i];
      if (newBoard[nb] === opp && !seen[nb]) {
        var group = getGroup(newBoard, size, nb);
        for (var j = 0; j < group.stones.length; j++) seen[group.stones[j]] = 1;
        if (group.liberties.length === 0) {
          for (var j = 0; j < group.stones.length; j++) {
            newBoard[group.stones[j]] = EMPTY;
            captured.push(group.stones[j]);
          }
        }
      }
    }

    // Check suicide (own group has no liberties after captures)
    var ownGroup = getGroup(newBoard, size, index);
    if (ownGroup.liberties.length === 0) return null;

    // Ko detection: single stone captured, placed stone is also single with one liberty
    var newKoPoint = -1;
    if (captured.length === 1 && ownGroup.stones.length === 1 && ownGroup.liberties.length === 1) {
      newKoPoint = captured[0];
    }

    return { newBoard: newBoard, captures: captured.length, newKoPoint: newKoPoint };
  }

  function getAllLegalMoves(board, size, player, koPoint) {
    var moves = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== EMPTY) continue;
      if (playMove(board, size, player, i, koPoint) !== null) moves.push(i);
    }
    return moves;
  }

  function computeScore(board, size, komi) {
    var blackScore = 0;
    var whiteScore = 0;
    var visited = new Uint8Array(board.length);

    for (var i = 0; i < board.length; i++) {
      if (board[i] === BLACK) { blackScore++; continue; }
      if (board[i] === WHITE) { whiteScore++; continue; }
      if (visited[i]) continue;

      // Flood-fill empty region to determine ownership
      var region = [];
      var queue = [i];
      visited[i] = 1;
      var touchesBlack = false;
      var touchesWhite = false;

      while (queue.length > 0) {
        var cur = queue.pop();
        region.push(cur);
        var r = (cur / size) | 0;
        var c = cur % size;
        var neighbors = getNeighbors(r, c, size);
        for (var j = 0; j < neighbors.length; j++) {
          var nb = neighbors[j];
          if (board[nb] === BLACK) touchesBlack = true;
          else if (board[nb] === WHITE) touchesWhite = true;
          else if (!visited[nb]) { visited[nb] = 1; queue.push(nb); }
        }
      }

      if (touchesBlack && !touchesWhite) blackScore += region.length;
      else if (touchesWhite && !touchesBlack) whiteScore += region.length;
      // neutral (dame) territory counts for neither side
    }

    return { black: blackScore, white: whiteScore + komi };
  }

  // ==================== AI ====================

  function isEye(board, size, player, index) {
    var r = (index / size) | 0;
    var c = index % size;
    var neighbors = getNeighbors(r, c, size);
    for (var i = 0; i < neighbors.length; i++) {
      if (board[neighbors[i]] !== player) return false;
    }
    return true;
  }

  function randomPlayout(board, size, startPlayer, koPoint) {
    var b = board.slice();
    var player = startPlayer;
    var ko = koPoint;
    var passes = 0;
    var maxMoves = size * size * 2;
    var n = b.length;

    for (var m = 0; m < maxMoves && passes < 2; m++) {
      var moved = false;
      // Try random positions (up to 30 attempts) rather than scanning all empty cells
      var maxAttempts = 30;
      for (var a = 0; a < maxAttempts; a++) {
        var idx = (Math.random() * n) | 0;
        if (b[idx] !== EMPTY) continue;
        if (isEye(b, size, player, idx)) continue;
        var result = playMove(b, size, player, idx, ko);
        if (result) {
          b = result.newBoard;
          ko = result.newKoPoint;
          moved = true;
          passes = 0;
          break;
        }
      }
      if (!moved) { passes++; ko = -1; }
      player = opponent(player);
    }

    var score = computeScore(b, size, KOMI[size] || 6.5);
    return score.black > score.white ? BLACK : WHITE;
  }

  function chooseAiMove(board, size, player, difficulty) {
    // Scale down playout count for larger boards to keep computation tractable
    var basePlys = [0, 15, 40, 100][difficulty] || 40;
    var baseCands = [0, 15, 25, 40][difficulty] || 25;
    var scale = Math.max(1, (size * size) / 81);
    var playouts = Math.max(5, Math.round(basePlys / scale));
    var maxCands = Math.max(10, Math.round(baseCands / Math.sqrt(scale)));

    var koPoint = state.koPoint;
    var legalMoves = getAllLegalMoves(board, size, player, koPoint);
    if (legalMoves.length === 0) return null;

    // Randomly sample candidates if too many
    var candidates = legalMoves;
    if (candidates.length > maxCands) {
      var shuffled = candidates.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = (Math.random() * (i + 1)) | 0;
        var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
      }
      candidates = shuffled.slice(0, maxCands);
    }

    var bestMove = candidates[0];
    var bestWins = -1;

    for (var i = 0; i < candidates.length; i++) {
      var move = candidates[i];
      var result = playMove(board, size, player, move, koPoint);
      if (!result) continue;

      var wins = 0;
      for (var p = 0; p < playouts; p++) {
        if (randomPlayout(result.newBoard, size, opponent(player), result.newKoPoint) === player) {
          wins++;
        }
      }

      if (wins > bestWins) {
        bestWins = wins;
        bestMove = move;
      }
    }

    // Pass if win rate is very low and board is substantially occupied
    var stoneCount = 0;
    for (var i = 0; i < board.length; i++) if (board[i] !== EMPTY) stoneCount++;
    if (playouts > 0 && bestWins / playouts < 0.15 && stoneCount > board.length * 0.55) {
      return null;
    }

    return bestMove;
  }

  // ==================== Rendering ====================

  function createSvgElement(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var key in attrs) el.setAttribute(key, attrs[key]);
    return el;
  }

  function render() {
    var container = document.getElementById('board-container');
    container.innerHTML = '';

    var size = state.size;
    var svgSize = size + 1;
    var svg = createSvgElement('svg', { viewBox: '0 0 ' + svgSize + ' ' + svgSize });

    // Wooden board background
    svg.appendChild(createSvgElement('rect', {
      x: 0, y: 0, width: svgSize, height: svgSize, fill: BOARD_COLOR
    }));

    // Grid lines (intersections at coordinates 1..size)
    for (var i = 1; i <= size; i++) {
      svg.appendChild(createSvgElement('line', {
        x1: 1, y1: i, x2: size, y2: i, stroke: LINE_COLOR, 'stroke-width': 0.03
      }));
      svg.appendChild(createSvgElement('line', {
        x1: i, y1: 1, x2: i, y2: size, stroke: LINE_COLOR, 'stroke-width': 0.03
      }));
    }

    // Star points (hoshi)
    var stars = STAR_POINTS[size] || [];
    for (var i = 0; i < stars.length; i++) {
      svg.appendChild(createSvgElement('circle', {
        cx: stars[i][1] + 1, cy: stars[i][0] + 1, r: 0.1, fill: LINE_COLOR
      }));
    }

    // Stones: placed at intersection (col+1, row+1)
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        var cell = state.board[r * size + c];
        if (cell === EMPTY) continue;
        var isLast = (state.lastMove === r * size + c);
        var attrs = { cx: c + 1, cy: r + 1, r: 0.46 };
        if (cell === BLACK) {
          attrs.fill = '#111';
          if (isLast) { attrs.stroke = '#e0e0e0'; attrs['stroke-width'] = '0.07'; }
        } else {
          attrs.fill = '#f4f4f4';
          attrs.stroke = isLast ? '#c8102e' : '#888';
          attrs['stroke-width'] = isLast ? '0.07' : '0.03';
        }
        svg.appendChild(createSvgElement('circle', attrs));
      }
    }

    // Transparent click targets over empty intersections when it is a human's turn
    if (!state.gameOver && isHumanTurn()) {
      for (var r = 0; r < size; r++) {
        (function (row) {
          for (var c = 0; c < size; c++) {
            (function (col) {
              if (state.board[row * size + col] !== EMPTY) return;
              var t = createSvgElement('rect', {
                x: col + 0.5, y: row + 0.5, width: 1, height: 1,
                fill: 'transparent', cursor: 'pointer'
              });
              t.addEventListener('click', function () { handleHumanMove(row, col); });
              svg.appendChild(t);
            })(c);
          }
        })(r);
      }
    }

    container.appendChild(svg);
    updateScore();
    updatePassButton();
  }

  function updateScore() {
    var komi = KOMI[state.size] || 6.5;
    var score = computeScore(state.board, state.size, komi);
    document.getElementById('score').innerHTML =
      '<span>\u25CF Black: ' + score.black + '</span>' +
      '<span>\u25CB White: ' + score.white.toFixed(1) + '</span>' +
      '<span style="font-size:0.85em;color:#666">(komi\u00a0' + komi + ')</span>';
  }

  function updatePassButton() {
    document.getElementById('pass-btn').style.visibility =
      (!state.gameOver && isHumanTurn()) ? '' : 'hidden';
  }

  function setStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  // ==================== Game Controller ====================

  function isHumanTurn() {
    return state.mode === 'hvh' || state.currentPlayer === state.humanColor;
  }

  function handleHumanMove(row, col) {
    if (state.gameOver || !isHumanTurn()) return;
    var index = row * state.size + col;
    var result = playMove(state.board, state.size, state.currentPlayer, index, state.koPoint);
    if (!result) return; // illegal move — ignore click
    applyMoveToState(index, result);
    render();
    if (state.gameOver) { showFinalScore(); return; }
    nextTurn();
  }

  function handlePass() {
    if (state.gameOver || !isHumanTurn()) return;
    var playerName = state.currentPlayer === BLACK ? 'Black' : 'White';
    state.consecutivePasses++;
    state.lastMove = -1;
    state.koPoint = -1;
    state.currentPlayer = opponent(state.currentPlayer);

    if (state.consecutivePasses >= 2) {
      state.gameOver = true;
      render();
      showFinalScore();
      return;
    }

    render();
    setStatus(playerName + ' passes.');
    setTimeout(nextTurn, 500);
  }

  function applyMoveToState(index, result) {
    state.board = result.newBoard;
    state.koPoint = result.newKoPoint;
    state.lastMove = index;
    state.consecutivePasses = 0;
    if (state.currentPlayer === BLACK) state.blackCaptures += result.captures;
    else state.whiteCaptures += result.captures;
    state.currentPlayer = opponent(state.currentPlayer);
  }

  function nextTurn() {
    if (state.gameOver) return;
    if (state.mode === 'hvc' && state.currentPlayer === state.aiColor) {
      aiTurn();
    } else {
      var playerName = state.currentPlayer === BLACK ? 'Black' : 'White';
      setStatus(state.consecutivePasses === 1
        ? playerName + ' to play (or pass to end the game).'
        : playerName + ' to play.');
    }
  }

  function aiTurn() {
    if (state.gameOver) return;
    setStatus('Computer is thinking\u2026');
    setTimeout(function () {
      var move = chooseAiMove(state.board, state.size, state.aiColor, state.difficulty);

      if (move === null) {
        // AI passes
        state.consecutivePasses++;
        state.lastMove = -1;
        state.koPoint = -1;
        state.currentPlayer = opponent(state.currentPlayer);
        if (state.consecutivePasses >= 2) {
          state.gameOver = true;
          render();
          showFinalScore();
          return;
        }
        render();
        setStatus(state.consecutivePasses === 1
          ? 'Computer passes. Your turn (or pass to end the game).'
          : 'Computer passes. Your turn.');
        return;
      }

      var result = playMove(state.board, state.size, state.aiColor, move, state.koPoint);
      if (!result) { render(); setStatus('Your turn.'); return; } // shouldn't happen
      applyMoveToState(move, result);
      render();
      if (state.gameOver) { showFinalScore(); return; }
      setStatus('Your turn.');
    }, 50);
  }

  function showFinalScore() {
    var komi = KOMI[state.size] || 6.5;
    var score = computeScore(state.board, state.size, komi);
    var msg;
    if (score.black > score.white) {
      msg = 'Game over. Black wins ' + score.black + '\u2013' + score.white.toFixed(1) + ' (Chinese scoring).';
    } else if (score.white > score.black) {
      msg = 'Game over. White wins ' + score.white.toFixed(1) + '\u2013' + score.black + ' (Chinese scoring).';
    } else {
      msg = 'Game over. It\u2019s a tie!';
    }
    setStatus(msg);
  }

  function startGame() {
    var size = parseInt(document.getElementById('board-size').value, 10);
    var mode = document.getElementById('game-mode').value;
    var humanColor = parseInt(document.getElementById('player-color').value, 10);
    var difficulty = parseInt(document.getElementById('difficulty').value, 10);

    state = {
      size: size,
      board: new Uint8Array(size * size),
      currentPlayer: BLACK,
      mode: mode,
      humanColor: humanColor,
      aiColor: opponent(humanColor),
      difficulty: difficulty,
      koPoint: -1,
      blackCaptures: 0,
      whiteCaptures: 0,
      consecutivePasses: 0,
      gameOver: false,
      lastMove: -1
    };

    render();

    if (mode === 'hvh' || state.currentPlayer === state.humanColor) {
      setStatus('Black to play.');
    } else {
      aiTurn();
    }
  }

  function updateModeUI() {
    var mode = document.getElementById('game-mode').value;
    var hvcLabels = document.querySelectorAll('.hvc-only');
    for (var i = 0; i < hvcLabels.length; i++) {
      hvcLabels[i].style.display = mode === 'hvc' ? '' : 'none';
    }
  }

  // ==================== Init ====================

  document.getElementById('new-game').addEventListener('click', startGame);
  document.getElementById('pass-btn').addEventListener('click', handlePass);
  document.getElementById('game-mode').addEventListener('change', updateModeUI);

  updateModeUI();
  startGame();
})();
