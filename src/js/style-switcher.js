/* =========================================================================
   RUBEN · Stil-Umschalter — drei Design-Richtungen zum Anklicken
   Farben/Typo laufen über data-style + Token-Overrides (variants.css),
   die Bildwelt wird pro Stil getauscht. Auswahl bleibt im localStorage.
   ========================================================================= */

const KEY = "ruben-style";

const STYLES = [
  { id: "klassik", label: "Klassik", dot: "#B8933D" },
  { id: "wallstreet", label: "Wall Street", dot: "#E0BC72" },
  { id: "klar", label: "Klar", dot: "#16B57F" },
];

const V = "/assets/variants";
const IMAGES = {
  klassik: {
    hero: "/assets/video/hero-poster.jpg",
    founder: "/assets/img/founder-smiling.jpg",
    team: "/assets/video/team-poster.jpg",
    ambient: "/assets/img/ambient-city.jpg",
    founderAlt: "Ruben im Anzug, lachend am Mikrofon - Augenzwinkern Richtung Wall Street",
  },
  wallstreet: {
    hero: V + "/ws-hero.jpg",
    founder: V + "/ws-founder.jpg",
    team: V + "/ws-team.jpg",
    ambient: V + "/ws-ambient.jpg",
    founderAlt: "Ruben lachend am Schreibtisch, Abendlicht und Messinglampe",
  },
  klar: {
    hero: V + "/kl-hero.jpg",
    founder: V + "/kl-founder.jpg",
    team: V + "/kl-team.jpg",
    ambient: V + "/kl-ambient.jpg",
    founderAlt: "Ruben lachend am hellen Schreibtisch, Tageslicht",
  },
};

const SLOTS = [
  { key: "hero", sel: "#hero video.scrub-video", attr: "poster" },
  { key: "hero", sel: "#hero img.scrub-poster", attr: "src" },
  { key: "founder", sel: ".portrait img", attr: "src" },
  { key: "team", sel: ".team__stage video.scrub-video", attr: "poster" },
  { key: "team", sel: ".team__stage img.scrub-poster", attr: "src" },
  { key: "ambient", sel: ".standorte__ambient", attr: "src" },
];

function apply(styleId) {
  document.documentElement.setAttribute("data-style", styleId);
  try { localStorage.setItem(KEY, styleId); } catch { /* privat/inkognito */ }

  const map = IMAGES[styleId] || IMAGES.klassik;
  SLOTS.forEach(({ key, sel, attr }) => {
    const el = document.querySelector(sel);
    if (el && map[key]) el.setAttribute(attr, map[key]);
  });
  const portrait = document.querySelector(".portrait img");
  if (portrait && map.founderAlt) portrait.setAttribute("alt", map.founderAlt);

  // Videos gehören zur Klassik-Bildwelt — in anderen Stilen pausieren (CSS blendet sie aus)
  document.querySelectorAll("video.scrub-video").forEach((v) => {
    if (styleId !== "klassik") v.pause();
  });

  document.querySelectorAll(".styleswitch__btn").forEach((b) => {
    const active = b.dataset.styleId === styleId;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", String(active));
  });

  // Stil-Sektionen ändern die Seitenhöhe — ScrollTrigger neu vermessen
  window.dispatchEvent(new Event("resize"));
}

export function initStyleSwitcher() {
  const host = document.querySelector(".nav__actions");
  if (!host) return;

  const wrap = document.createElement("div");
  wrap.className = "styleswitch";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Design-Stil wählen");

  STYLES.forEach((s) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "styleswitch__btn";
    b.dataset.styleId = s.id;
    b.setAttribute("aria-pressed", "false");
    b.title = "Stil: " + s.label;
    const dot = document.createElement("i");
    dot.style.background = s.dot;
    dot.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = s.label;
    b.append(dot, label);
    b.addEventListener("click", () => apply(s.id));
    wrap.appendChild(b);
  });
  host.prepend(wrap);

  let saved = "klassik";
  try { saved = localStorage.getItem(KEY) || "klassik"; } catch { /* egal */ }
  apply(STYLES.some((s) => s.id === saved) ? saved : "klassik");
}
