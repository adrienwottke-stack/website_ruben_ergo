/* =========================================================================
   RUBEN · Persönlicher Kontakt
   Baut den wa.me-Link aus dem optionalen Ort und der persönlichen Nachricht.
   Der Nutzer sieht die Nachricht in WhatsApp und entscheidet selbst
   über das Absenden — hier wird nichts übertragen oder gespeichert.
   ========================================================================= */
import { CONFIG } from "../config.js";

const waLink = (text) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

export function initWhatsApp() {
  const form = document.getElementById("interviewForm");
  if (!form) return;

  const ortChips = form.querySelectorAll("[data-ort]");
  const messageInput = form.querySelector("#visionMessage");
  const waButton = document.getElementById("waButton");
  if (!waButton || !messageInput) return;
  let selectedPlace = "";

  const buildMessage = () => {
    const parts = ["Hey Ruben!"];
    if (selectedPlace === "Woanders") parts.push("Ich komme nicht direkt aus Leipzig.");
    else if (selectedPlace) parts.push(`Ich komme aus ${selectedPlace}.`);
    const message = messageInput.value.trim();
    parts.push(message || "Ich würde mich gerne mit dir austauschen.");
    return parts.join("\n\n");
  };

  const refresh = () => {
    waButton.href = waLink(buildMessage());
  };

  // Frage 1: Ort — Einfachauswahl, nochmal tippen wählt ab
  ortChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const ort = chip.dataset.ort;
      const wasActive = chip.classList.contains("is-active");
      ortChips.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      selectedPlace = wasActive ? "" : ort;
      if (!wasActive) {
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
      }
      refresh();
    });
  });

  messageInput.addEventListener("input", refresh);
  form.addEventListener("submit", (event) => event.preventDefault());

  refresh();
}

/** Platzhalter aus der Config in alle data-config-Elemente schreiben */
export function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    switch (el.dataset.config) {
      case "instagramUrl":
        el.href = CONFIG.instagramUrl;
        break;
      case "instagramHandle":
        el.textContent = CONFIG.instagramHandle;
        break;
      case "email":
        el.href = `mailto:${CONFIG.email}`;
        if (el.textContent.includes("[")) el.textContent = CONFIG.email.includes("PLATZHALTER") ? "[E-Mail folgt]" : CONFIG.email;
        break;
      case "waPlain": {
        const isPlaceholder = /X/.test(CONFIG.whatsappNumber);
        el.href = waLink("Hey Ruben! 👋");
        el.textContent = isPlaceholder ? "WhatsApp: [Nummer folgt]" : `WhatsApp: +${CONFIG.whatsappNumber}`;
        break;
      }
    }
  });
}
