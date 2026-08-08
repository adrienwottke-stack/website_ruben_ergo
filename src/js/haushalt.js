/* =========================================================================
   RUBEN · Haushaltsrechner (Stil "Klar")
   Rechnet live im Browser - nichts wird übertragen oder gespeichert.
   ========================================================================= */

export function initHaushalt() {
  const form = document.getElementById("haushaltForm");
  if (!form) return;

  const el = (id) => document.getElementById(id);
  const inputs = [el("hhIncome"), el("hhWohnen"), el("hhFix"), el("hhLeben")];
  const fmt = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });

  const render = () => {
    const [inc, wohnen, fix, leben] = inputs.map((i) => Number(i.value) || 0);
    const free = inc - wohnen - fix - leben;
    const quote = inc > 0 ? Math.round((free / inc) * 100) : 0;

    el("hhFree").textContent = fmt.format(free) + " €";
    el("hhQuote").textContent = Math.max(quote, 0) + " %";
    el("hhYear").textContent = fmt.format(free * 12) + " €";

    const hint = el("hhHint");
    if (free < 0) {
      hint.textContent = "Da läuft gerade mehr raus als rein. Kein Grund zur Panik - aber ein guter Grund für ein ehrliches Gespräch.";
    } else if (quote < 10) {
      hint.textContent = "Es bleibt etwas übrig - nur noch nicht viel. Oft steckt in den Fixkosten mehr Spielraum, als man denkt.";
    } else if (quote < 25) {
      hint.textContent = "Solide Basis. Die spannende Frage ist jetzt: Was macht dieser Betrag in zehn Jahren?";
    } else {
      hint.textContent = "Stark. Bei dir geht es weniger ums Sparen - sondern darum, was dein Überschuss arbeiten kann.";
    }
    form.classList.toggle("is-negative", free < 0);
  };

  form.addEventListener("input", render);
  form.addEventListener("submit", (e) => e.preventDefault());
  render();
}
