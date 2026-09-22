/* =========================================================================
   RUBEN · Zentrale Kontakt-Konfiguration
   Bestätigte Kontaktdaten; dynamische Links beziehen ihre Werte von hier.
   Statische HTML-Fallbacks bei Änderungen der Kontaktdaten mit aktualisieren.
   ========================================================================= */
export const CONFIG = {
  // WhatsApp im internationalen Format ohne "+" und ohne Leerzeichen,
  // Bestätigte Nummer: +49 176 47178532
  whatsappNumber: "4917647178532",

  // Instagram
  instagramHandle: "@ruben.khr",
  instagramUrl: "https://www.instagram.com/ruben.khr/",

  // Kontakt
  email: "ruben_koehler04@yahoo.com",

  // Standorte für Karte + Liste (echte Lon/Lat — Pins werden automatisch
  // auf die Bundesländer-Karte projiziert; einfach Städte ergänzen).
  // primary = Home Base (Puls + Label immer sichtbar) · above/below/labelDx/
  // labelDy steuern die Label-Position · soon = gestrichelter Zukunfts-Pin.
  // Konzept „Eine Stadt. Der Rest ist Platz.": nur echte Standorte zeigen —
  // neue Städte erst eintragen, wenn es sie wirklich gibt.
  locations: [
    { name: "Leipzig", sub: "Home Base", lon: 12.3731, lat: 51.3397, primary: true, above: true },
    { name: "Bald du?", sub: "dein Standort", lon: 12.1405, lat: 54.0924, soon: true, above: true },
  ],
};

/* Bestehender Hero-Slot: echtes Ruben-/Team-Material später als Drop-in einsetzen.
   Desktop: hero.mp4 + passender hero-poster.jpg; gleicher Container und Ausschnitt.
   Optional separate Mobilfassung samt Poster eintragen (bis einschließlich 900px,
   entsprechend der vorhandenen Maske). null verwendet die Desktop-Dateien.
   Bei Austausch unter gleichen Namen einen Versionsparameter an beiden Pfaden
   und am Poster-Preload in index.html ergänzen, damit keine alten Medien bleiben.
   Schnitt: natürlicher, sauberer Loop; Gesichter innerhalb der vorhandenen Masken. */
export const MEDIA = {
  hero: {
    video: "/media/hero.mp4",
    poster: "/media/hero-poster.jpg",
    mobileVideo: null,
    mobilePoster: null,
  },
};
