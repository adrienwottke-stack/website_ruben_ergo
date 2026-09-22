/* =========================================================================
   RUBEN · Persönlicher Kontakt
   Baut den wa.me-Link aus dem optionalen Ort und der persönlichen Nachricht.
   Eingaben bleiben auf der Seite, ohne eigenen Speicher oder Versand.
   Erst der Link übergibt den Entwurf an WhatsApp; dort entscheidet der
   Nutzer selbst über das Absenden.
   ========================================================================= */
import { CONFIG } from "../config.js";

const DEFAULT_MESSAGE = "Hey Ruben! Ich bin über deine Website hier und würde gern mehr über deinen Alltag erfahren.";
const CALCULATOR_MESSAGE = "Hey Ruben! Ich habe deinen Zinsrechner ausprobiert und habe eine Frage dazu.";
const messageForTopic = (topic) => topic === "rechner" ? CALCULATOR_MESSAGE : DEFAULT_MESSAGE;

const waLink = (text) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

export function initWhatsApp() {
  const form = document.getElementById("interviewForm");
  if (!form) return;

  const ortChips = form.querySelectorAll("[data-ort]");
  const messageInput = form.querySelector("#visionMessage");
  const waButton = document.getElementById("waButton");
  if (!waButton || !messageInput) return;

  // Seed only a fresh visit. History restoration may bring back an intentionally
  // empty field, so neither back/forward nor reload should insert another draft.
  const navigation = performance.getEntriesByType("navigation")[0];
  const isFreshVisit = !navigation || navigation.type === "navigate";
  const topic = new URLSearchParams(location.search).get("thema");
  if (isFreshVisit && topic === "rechner" && !messageInput.value) {
    messageInput.value = CALCULATOR_MESSAGE;
  }

  const buildMessage = () => {
    // An edited message is already complete; do not prepend a second greeting.
    const parts = [messageInput.value.trim() || DEFAULT_MESSAGE];
    const selectedPlace = Array.from(ortChips)
      .find((chip) => chip.getAttribute("aria-pressed") === "true")?.dataset.ort;
    if (selectedPlace === "Woanders") parts.push("Ich komme nicht direkt aus Leipzig.");
    else if (selectedPlace) parts.push(`Ich komme aus ${selectedPlace}.`);
    return parts.join("\n\n");
  };

  const refresh = () => {
    waButton.href = waLink(buildMessage());
  };

  // Frage 1: Ort — Einfachauswahl, nochmal tippen wählt ab
  ortChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const wasActive = chip.classList.contains("is-active");
      ortChips.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      if (!wasActive) {
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
      }
      refresh();
    });
  });

  messageInput.addEventListener("input", refresh);
  form.addEventListener("submit", (event) => event.preventDefault());
  // Refresh restored form values without ever reseeding or rewriting the field.
  window.addEventListener("pageshow", refresh);
  waButton.addEventListener("click", refresh);

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
      case "email": {
        el.href = `mailto:${CONFIG.email}`;
        const value = el.querySelector('[data-config-value="email"]');
        const label = CONFIG.email.includes("PLATZHALTER") ? "[E-Mail folgt]" : CONFIG.email;
        if (value) value.textContent = label;
        else if (!el.children.length && el.textContent.includes("[")) el.textContent = label;
        break;
      }
      case "waDirect":
        el.href = waLink(messageForTopic(el.dataset.waTopic));
        break;
      case "waPlain": {
        const isPlaceholder = !/^[1-9]\d{6,14}$/.test(CONFIG.whatsappNumber);
        const label = isPlaceholder ? "[Nummer folgt]" : `+${CONFIG.whatsappNumber}`;
        el.href = waLink(messageForTopic(el.dataset.waTopic));
        const value = el.querySelector('[data-config-value="whatsapp"]');
        if (value) value.textContent = label;
        else if (!el.children.length) el.textContent = `WhatsApp: ${label}`;
        break;
      }
    }
  });
}
