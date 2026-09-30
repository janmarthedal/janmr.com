(function () {
  'use strict';

  var TWO_PI = 2 * Math.PI;
  var SAMPLES = 2048;
  var BASE_OMEGA = 0.8; // radians per second at speed 1

  var COLORS = {
    arm: '#337ab7',
    rhombus: '#5b9bd5',
    crank: '#555',
    guide: '#ccc',
    inversion: '#aaa',
    trace: '#c9302c',
    fullPath: 'rgba(201, 48, 44, 0.25)',
    joint: '#fff',
    jointStroke: '#333',
    label: '#333'
  };

  var canvas = document.getElementById('linkage');
  var ctx = canvas.getContext('2d');
  var msgEl = document.getElementById('linkage-msg');
  var infoEl = document.getElementById('pl-info');
  var playBtn = document.getElementById('pl-play');
  var clearBtn = document.getElementById('pl-clear');
  var lockEl = document.getElementById('pl-lock');
  var fullEl = document.getElementById('pl-full');

  var sliders = {};
  ['L', 's', 'r', 'd', 'speed'].forEach(function (name) {
    sliders[name] = {
      input: document.getElementById('pl-' + name),
      output: document.getElementById('pl-' + name + '-out')
    };
  });

  // ==================== State ====================

  var params = { L: 4, s: 1.5, r: 2, d: 2, speed: 1 };
  var range = { mode: 'none', lo: 0, hi: 0 }; // mode: 'rotate' | 'swing' | 'none'
  var theta = 0;
  var dir = 1;
  var traceLo = 0;
  var traceHi = 0;
  var playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dragging = false;
  var view = null;       // current view {x, y, scale} (world center + world size)
  var targetView = null;
  var lastTime = null;

  // ==================== Geometry ====================

  function crankPoint(th) {
    return { x: params.d + params.r * Math.cos(th), y: params.r * Math.sin(th) };
  }

  function isValid(th) {
    if (params.L <= params.s) return false;
    var P = crankPoint(th);
    var rho = Math.hypot(P.x, P.y);
    return rho > 1e-9 && rho >= params.L - params.s && rho <= params.L + params.s;
  }

  // Positions of all joints for crank angle th, or null if the linkage
  // cannot be assembled.
  function configuration(th) {
    var L = params.L, s = params.s;
    var P = crankPoint(th);
    var rho = Math.hypot(P.x, P.y);
    if (L <= s || rho < 1e-9) return null;
    if (rho < L - s - 1e-9 || rho > L + s + 1e-9) return null;
    var ux = P.x / rho, uy = P.y / rho;
    var a = (L * L - s * s + rho * rho) / (2 * rho);
    var h = Math.sqrt(Math.max(0, L * L - a * a));
    var k = (L * L - s * s) / (rho * rho);
    return {
      O: { x: 0, y: 0 },
      C: { x: params.d, y: 0 },
      P: P,
      A: { x: a * ux - h * uy, y: a * uy + h * ux },
      B: { x: a * ux + h * uy, y: a * uy - h * ux },
      Q: { x: k * P.x, y: k * P.y }
    };
  }

  // Bisect for the boundary between a valid angle and an invalid one.
  function refine(validTh, invalidTh) {
    for (var i = 0; i < 40; i++) {
      var mid = (validTh + invalidTh) / 2;
      if (isValid(mid)) validTh = mid; else invalidTh = mid;
    }
    return validTh;
  }

  // Determine the range of crank angles for which the linkage can move,
  // preferring the connected range containing the current angle.
  function computeRange() {
    var step = TWO_PI / SAMPLES;
    var valid = [];
    var i, count = 0;
    for (i = 0; i < SAMPLES; i++) {
      valid.push(isValid(i * step));
      if (valid[i]) count++;
    }
    if (count === SAMPLES) return { mode: 'rotate', lo: 0, hi: TWO_PI };
    if (count === 0) return { mode: 'none', lo: 0, hi: 0 };

    // Walk once around the circle, starting just after an invalid sample.
    var start = valid.indexOf(false);
    var runs = [];
    var runStart = null;
    for (var j = 1; j <= SAMPLES; j++) {
      var idx = start + j;
      if (valid[idx % SAMPLES]) {
        if (runStart === null) runStart = idx;
      } else if (runStart !== null) {
        runs.push({ first: runStart, last: idx - 1 });
        runStart = null;
      }
    }

    var current = normalize(theta);
    var best = null;
    runs.forEach(function (run) {
      var lo = refine(run.first * step, (run.first - 1) * step);
      var hi = refine(run.last * step, (run.last + 1) * step);
      var r = { mode: 'swing', lo: lo, hi: hi };
      r.contains = inRange(r, current);
      if (!best || (r.contains && !best.contains) ||
          (r.contains === best.contains && hi - lo > best.hi - best.lo)) {
        best = r;
      }
    });
    // Stay clear of the singular end positions.
    var eps = Math.min(1e-6, (best.hi - best.lo) / 4);
    return { mode: 'swing', lo: best.lo + eps, hi: best.hi - eps };
  }

  function normalize(th) {
    th %= TWO_PI;
    return th < 0 ? th + TWO_PI : th;
  }

  function inRange(r, th) {
    var t = r.lo + normalize(th - r.lo);
    return t <= r.hi;
  }

  // Map an angle into the current range, clamping to the nearest end.
  function fitAngle(th) {
    if (range.mode !== 'swing') return th;
    var t = range.lo + normalize(th - range.lo);
    if (t <= range.hi) return t;
    return (t - range.hi < range.lo + TWO_PI - t) ? range.hi : range.lo;
  }

  // ==================== Parameter changes ====================

  function readParams() {
    Object.keys(sliders).forEach(function (name) {
      params[name] = parseFloat(sliders[name].input.value);
    });
  }

  function updateOutputs() {
    Object.keys(sliders).forEach(function (name) {
      sliders[name].output.value = params[name].toFixed(2);
    });
  }

  function onParamsChanged() {
    readParams();
    updateOutputs();
    range = computeRange();
    if (range.mode === 'swing') {
      theta = fitAngle(theta);
    } else if (range.mode === 'rotate') {
      theta = normalize(theta);
    }
    clearTrace();
    targetView = computeView();
    if (!view) view = targetView;
    updateInfo();
  }

  function clearTrace() {
    traceLo = theta;
    traceHi = theta;
  }

  function fmt(x) {
    return (Math.round(x * 100) / 100).toFixed(2);
  }

  function updateInfo() {
    var L = params.L, s = params.s, r = params.r, d = params.d;
    msgEl.hidden = true;
    if (L <= s) {
      msgEl.textContent = 'The long arms must be longer than the rhombus sides (L > s).';
      msgEl.hidden = false;
      infoEl.textContent = '';
      return;
    }
    if (range.mode === 'none') {
      msgEl.textContent = 'The linkage cannot be assembled: |OP| never lies between L − s and L + s.';
      msgEl.hidden = false;
      infoEl.textContent = '';
      return;
    }
    var k = L * L - s * s;
    var text = '|OP| · |OQ| = L² − s² = ' + fmt(k) + '. ';
    var diff = d * d - r * r;
    if (Math.abs(d - r) < 1e-9) {
      text += 'Since d = r, Q moves on the straight line x = ' + fmt(k / (2 * r)) + '.';
    } else {
      text += 'Since d ≠ r, Q moves on a circle with center (' + fmt(d * k / diff) +
        ', 0) and radius ' + fmt(r * k / Math.abs(diff)) + '.';
    }
    if (range.mode === 'swing') {
      text += ' The crank can turn ' + Math.round((range.hi - range.lo) * 180 / Math.PI) + '°.';
    } else {
      text += ' The crank can turn all the way around.';
    }
    infoEl.textContent = text;
  }

  // ==================== View ====================

  function computeView() {
    var minX = Math.min(0, params.d - params.r), maxX = Math.max(0, params.d);
    var minY = 0, maxY = 0;
    function add(p) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    if (range.mode !== 'none') {
      var n = 300;
      for (var i = 0; i <= n; i++) {
        var c = configuration(range.lo + (range.hi - range.lo) * i / n);
        if (c) { add(c.P); add(c.A); add(c.B); add(c.Q); }
      }
    } else {
      add({ x: params.d + params.r, y: params.r });
      add({ x: params.d - params.r, y: -params.r });
    }
    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      w: Math.max(maxX - minX, 0.5),
      h: Math.max(maxY - minY, 0.5)
    };
  }

  function lerpView(dt) {
    var t = 1 - Math.exp(-dt * 8);
    ['x', 'y', 'w', 'h'].forEach(function (key) {
      view[key] += (targetView[key] - view[key]) * t;
    });
  }

  var transform = { scale: 1, ox: 0, oy: 0 };

  function updateTransform(width, height) {
    var pad = 30;
    var scale = Math.min((width - 2 * pad) / view.w, (height - 2 * pad) / view.h);
    transform.scale = scale;
    transform.ox = width / 2 - view.x * scale;
    transform.oy = height / 2 + view.y * scale;
  }

  function toScreen(p) {
    return { x: transform.ox + p.x * transform.scale, y: transform.oy - p.y * transform.scale };
  }

  function toWorld(sx, sy) {
    return { x: (sx - transform.ox) / transform.scale, y: (transform.oy - sy) / transform.scale };
  }

  function resizeCanvas() {
    var width = canvas.clientWidth;
    var height = Math.max(260, Math.min(560, Math.round(width * 0.7)));
    var ratio = window.devicePixelRatio || 1;
    canvas.style.height = height + 'px';
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  // ==================== Drawing ====================

  function line(a, b, color, width) {
    var p = toScreen(a), q = toScreen(b);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
  }

  function circle(center, radius, color, width, dash) {
    var c = toScreen(center);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    ctx.arc(c.x, c.y, radius * transform.scale, 0, TWO_PI);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function path(lo, hi, color, width) {
    var n = Math.max(2, Math.ceil(Math.abs(hi - lo) / TWO_PI * 720));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    var started = false;
    for (var i = 0; i <= n; i++) {
      var c = configuration(lo + (hi - lo) * i / n);
      if (!c) { started = false; continue; }
      var p = toScreen(c.Q);
      if (started) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
      started = true;
    }
    ctx.stroke();
  }

  function ground(p) {
    var c = toScreen(p);
    var size = 10;
    ctx.fillStyle = '#ddd';
    ctx.strokeStyle = COLORS.jointStroke;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x - size, c.y + size * 1.4);
    ctx.lineTo(c.x + size, c.y + size * 1.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    for (var i = -size; i < size; i += 4) {
      ctx.moveTo(c.x + i, c.y + size * 1.4 + 5);
      ctx.lineTo(c.x + i + 4, c.y + size * 1.4);
    }
    ctx.stroke();
  }

  function joint(p, radius) {
    var c = toScreen(p);
    ctx.fillStyle = COLORS.joint;
    ctx.strokeStyle = COLORS.jointStroke;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(c.x, c.y, radius || 4, 0, TWO_PI);
    ctx.fill();
    ctx.stroke();
  }

  function label(p, text, dx, dy) {
    var c = toScreen(p);
    ctx.fillStyle = COLORS.label;
    ctx.font = 'italic 15px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, c.x + dx, c.y + dy);
  }

  // Place a label on the far side of a joint, away from a reference point.
  function labelAway(p, from, text) {
    var dx = p.x - from.x, dy = p.y - from.y;
    var len = Math.hypot(dx, dy) || 1;
    label(p, text, 14 * dx / len, -14 * dy / len);
  }

  function draw() {
    var width = canvas.clientWidth, height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    updateTransform(width, height);

    var O = { x: 0, y: 0 };
    var C = { x: params.d, y: 0 };

    circle(C, params.r, COLORS.guide, 1);
    if (params.L > params.s) {
      circle(O, Math.sqrt(params.L * params.L - params.s * params.s), COLORS.inversion, 1, [4, 4]);
    }

    if (range.mode !== 'none') {
      if (fullEl.checked) path(range.lo, range.hi, COLORS.fullPath, 2);
      path(traceLo, traceHi, COLORS.trace, 2.5);
    }

    var c = range.mode !== 'none' ? configuration(theta) : null;
    if (c) {
      line(c.O, c.A, COLORS.arm, 4);
      line(c.O, c.B, COLORS.arm, 4);
      line(c.A, c.P, COLORS.rhombus, 3);
      line(c.P, c.B, COLORS.rhombus, 3);
      line(c.B, c.Q, COLORS.rhombus, 3);
      line(c.Q, c.A, COLORS.rhombus, 3);
      line(c.C, c.P, COLORS.crank, 3);
    }

    ground(O);
    ground(C);

    if (c) {
      joint(c.A);
      joint(c.B);
      joint(c.P, 5.5);
      joint(c.Q, 5.5);
    }
    joint(O);
    joint(C);

    label(O, 'O', -14, -8);
    label(C, 'C', 14, -8);
    if (c) {
      var mid = { x: (c.P.x + c.Q.x) / 2, y: (c.P.y + c.Q.y) / 2 };
      labelAway(c.A, mid, 'A');
      labelAway(c.B, mid, 'B');
      labelAway(c.P, c.A, 'P');
      labelAway(c.Q, c.A, 'Q');
    }
  }

  // ==================== Animation ====================

  function advance(dt) {
    if (range.mode === 'none') return;
    var omega = BASE_OMEGA * params.speed;
    if (range.mode === 'rotate') {
      theta += omega * dt;
    } else {
      var half = (range.hi - range.lo) / 2;
      var u = (theta - (range.lo + half)) / half;
      // Slow down towards the ends of the swing.
      var f = 0.15 + 0.85 * Math.sqrt(Math.max(0, 1 - u * u));
      theta += dir * omega * f * dt;
      if (theta >= range.hi) { theta = range.hi; dir = -1; }
      if (theta <= range.lo) { theta = range.lo; dir = 1; }
    }
    extendTrace();
  }

  function extendTrace() {
    if (theta < traceLo) traceLo = theta;
    if (theta > traceHi) traceHi = theta;
    if (traceHi - traceLo > TWO_PI) {
      traceLo = theta - TWO_PI;
      traceHi = theta;
    }
  }

  function frame(time) {
    var dt = lastTime === null ? 0 : Math.min(0.1, (time - lastTime) / 1000);
    lastTime = time;
    if (playing && !dragging) advance(dt);
    lerpView(dt);
    draw();
    requestAnimationFrame(frame);
  }

  // ==================== Interaction ====================

  function pointerWorld(event) {
    var rect = canvas.getBoundingClientRect();
    return toWorld(event.clientX - rect.left, event.clientY - rect.top);
  }

  function dragTo(event) {
    var w = pointerWorld(event);
    var th = Math.atan2(w.y, w.x - params.d);
    if (range.mode === 'swing') {
      th = fitAngle(th);
    } else {
      // Keep the angle continuous with the current one.
      th = theta + ((normalize(th - theta) + Math.PI) % TWO_PI) - Math.PI;
    }
    theta = th;
    extendTrace();
  }

  canvas.addEventListener('pointerdown', function (event) {
    if (range.mode === 'none') return;
    var c = configuration(theta);
    if (!c) return;
    var rect = canvas.getBoundingClientRect();
    var p = toScreen(c.P);
    if (Math.hypot(event.clientX - rect.left - p.x, event.clientY - rect.top - p.y) > 20) return;
    dragging = true;
    canvas.setPointerCapture(event.pointerId);
    dragTo(event);
  });

  canvas.addEventListener('pointermove', function (event) {
    if (dragging) {
      dragTo(event);
      return;
    }
    var c = range.mode !== 'none' ? configuration(theta) : null;
    var near = false;
    if (c) {
      var rect = canvas.getBoundingClientRect();
      var p = toScreen(c.P);
      near = Math.hypot(event.clientX - rect.left - p.x, event.clientY - rect.top - p.y) <= 20;
    }
    canvas.style.cursor = near ? 'grab' : '';
  });

  function endDrag() {
    dragging = false;
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  function updatePlayButton() {
    playBtn.textContent = playing ? 'Pause' : 'Play';
  }

  playBtn.addEventListener('click', function () {
    playing = !playing;
    updatePlayButton();
  });

  clearBtn.addEventListener('click', clearTrace);

  lockEl.addEventListener('change', function () {
    if (lockEl.checked) {
      sliders.d.input.value = sliders.r.input.value;
      onParamsChanged();
    }
  });

  Object.keys(sliders).forEach(function (name) {
    sliders[name].input.addEventListener('input', function () {
      if (lockEl.checked) {
        if (name === 'r') sliders.d.input.value = sliders.r.input.value;
        if (name === 'd') sliders.r.input.value = sliders.d.input.value;
      }
      if (name === 'speed') {
        readParams();
        updateOutputs();
      } else {
        onParamsChanged();
      }
    });
  });

  window.addEventListener('resize', resizeCanvas);

  // ==================== Start ====================

  theta = Math.PI / 2;
  resizeCanvas();
  onParamsChanged();
  updatePlayButton();
  requestAnimationFrame(frame);
})();
