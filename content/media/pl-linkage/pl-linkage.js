// <pl-linkage> — animation of the Peaucellier–Lipkin linkage, with P' moving up and down a straight line.
// Any content inside the element (e.g. a fallback image) is replaced when the element is upgraded.

const STYLE = `
pl-linkage { display: block; position: relative; width: fit-content; max-width: 100%; margin: 0 auto; }
pl-linkage svg { display: block; max-width: 100%; height: auto; cursor: pointer; }
pl-linkage button {
  /* bottom aligned with the end of the dashed line: (375 - 335.4) / 370 of the viewBox height */
  position: absolute; left: 8px; bottom: 10.7%; width: 32px; height: 32px; padding: 0;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  color: #333; background: rgba(255, 255, 255, 0.85); border: 1px solid #ddd; border-radius: 50%;
}
pl-linkage button:hover { border-color: #999; }
pl-linkage button:focus-visible { outline: 2px solid #337ab7; outline-offset: 2px; }
pl-linkage button svg { width: 14px; height: 14px; }
`;

const TEMPLATE = `
<svg width="380" height="370" viewBox="30 5 380 370" role="img" aria-label="Animation of the Peaucellier–Lipkin linkage, with P' moving up and down a straight line">
  <path d="M400 44.6 L400 335.4" stroke="#bbb" stroke-width="1" stroke-dasharray="6 4" fill="none"/>
  <g stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path data-part="arms" stroke="#333"/>
    <path data-part="rhombus" stroke="#2a6fb0"/>
    <path data-part="driver" stroke="#2e9a4b"/>
  </g>
  <g fill="#000">
    <circle data-part="a" r="3.5"/>
    <circle data-part="b" r="3.5"/>
    <circle data-part="p" r="3.5"/>
    <circle data-part="pp" r="3.5"/>
  </g>
  <g fill="#fff" stroke="#000" stroke-width="2">
    <circle cx="40" cy="190" r="5"/>
    <circle cx="145" cy="190" r="5"/>
  </g>
</svg>
<button type="button"></button>
`;

const ICONS = {
  pause: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>`,
  play: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M4 2.2v11.6a.8.8 0 0 0 1.2.7l9.4-5.8a.8.8 0 0 0 0-1.4L5.2 1.5a.8.8 0 0 0-1.2.7z"/></svg>`,
};

// Units as in the figures: long arms 5, rhombus side 2, driving arm 1.75 (60 px/unit).
// O=(0,0), C=(1.75,0); P moves on the circle through O centered at C.
const S = 60, OX = 40, OY = 190, MAX = 22 * Math.PI / 180, PERIOD = 6000;
const px = ([x, y]) => [OX + S * x, OY - S * y];
const pt = ([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`;

class PLLinkage extends HTMLElement {
  connectedCallback() {
    if (this.parts) return;
    if (!document.getElementById("pl-linkage-style")) {
      const style = document.createElement("style");
      style.id = "pl-linkage-style";
      style.textContent = STYLE;
      document.head.append(style);
    }
    this.innerHTML = TEMPLATE;
    this.parts = {};
    for (const el of this.querySelectorAll("[data-part]")) this.parts[el.dataset.part] = el;
    this.btn = this.querySelector("button");
    // Clicking anywhere on the animation, including the button, toggles it.
    this.addEventListener("click", () => { this.running = !this.running; this.update(); });
    this.t = 0;
    this.last = null;
    this.raf = null;
    this.running = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.frame = this.frame.bind(this);
    this.draw(0);
    this.update();
  }

  place(name, p) {
    this.parts[name].setAttribute("cx", p[0].toFixed(2));
    this.parts[name].setAttribute("cy", p[1].toFixed(2));
  }

  draw(alpha) {
    const c = Math.cos(alpha), s = Math.sin(alpha);
    const r = 3.5 * c;                     // |OP|
    const h = (r * r + 21) / (2 * r);      // distance from O to AB along OP
    const k = Math.sqrt(25 - h * h);       // half of |AB|
    const P = px([r * c, r * s]), Pp = px([21 / r * c, 21 / r * s]);
    const A = px([h * c - k * s, h * s + k * c]), B = px([h * c + k * s, h * s - k * c]);
    const O = [OX, OY], C = px([1.75, 0]);
    this.parts.arms.setAttribute("d", `M${pt(O)} L${pt(A)} M${pt(O)} L${pt(B)}`);
    this.parts.driver.setAttribute("d", `M${pt(C)} L${pt(P)}`);
    this.parts.rhombus.setAttribute("d", `M${pt(P)} L${pt(A)} L${pt(Pp)} L${pt(B)} Z`);
    this.place("a", A); this.place("b", B); this.place("p", P); this.place("pp", Pp);
  }

  frame(now) {
    this.raf = null;
    if (!this.running || !this.isConnected) { this.last = null; return; }
    if (this.last !== null) this.t += now - this.last;
    this.last = now;
    this.draw(MAX * Math.sin(2 * Math.PI * this.t / PERIOD));
    this.raf = requestAnimationFrame(this.frame);
  }

  update() {
    this.btn.innerHTML = this.running ? ICONS.pause : ICONS.play;
    this.btn.setAttribute("aria-label", this.running ? "Pause animation" : "Play animation");
    if (this.running && this.raf === null) this.raf = requestAnimationFrame(this.frame);
  }
}

customElements.define("pl-linkage", PLLinkage);
