# Master-Prompt: Website-Klon für einen neuen Vertreter

Vorlage: Emil-Website (dieses Repo). Das Skelett bleibt 1:1 - Sektionen, Farben (Beige `#F3EDE1` / Navy `#17263A` / Gold `#B8933D`), Animationen, Rechner. Getauscht werden nur: **6 Bild-Slots**, **Texte/Name/Städte** und **Kontaktdaten**.

Hinweis für den Versand an den Vertreter: Die KI-Bilder sind Demo-Platzhalter für den Pitch. Vor Livegang durch echte Fotos ersetzen - die Seite lebt von "echt statt Hochglanz".

---

## Teil 0 · Steckbrief (einmal ausfüllen, dann unten überall einsetzen)

| Platzhalter | Bedeutung | Beispiel |
|---|---|---|
| `[NAME]` | Vorname des Vertreters | Paul |
| `[STADT_1]` | Home Base | Chemnitz |
| `[STADT_2]` | Zweite Stadt / im Aufbau (optional) | Zwickau |
| `[WAHRZEICHEN]` | Bekanntestes Motiv von `[STADT_1]` | Karl-Marx-Monument |
| `[OPTIK]` | 2-3 Sätze Aussehen: Alter, Haare, Bart/Brille, Statur, Kleidungsstil | 27, kurze dunkelblonde Haare, Dreitagebart, schlank, dunkelblauer Anzug ohne Krawatte |

**Referenzfoto:** Für Slot 1 und 2 (die Person) immer ein echtes Foto des Vertreters als Personen-Referenz anhängen (Nano Banana / Gemini, Flux Kontext, Midjourney Omni-Reference, ChatGPT - alle können das) und `[OPTIK]` trotzdem mitgeben. Ohne Referenzfoto die im Slot notierte Ohne-Gesicht-Variante nutzen - ein erfundenes Gesicht wirkt im Pitch schnell falsch.

---

## Teil A · Bild-Prompts (6 Slots)

### Stil-Basis - vor JEDEN Prompt kopieren

```text
Cinematic editorial photograph, quiet premium mood, warm analog film look with subtle 35mm grain. Muted palette: soft warm beige and cream tones, deep navy-blue shadows, golden-amber highlights. Natural directional light, shallow depth of field. Feels like a film still, not a stock photo. No text, no logos, no watermarks, no oversaturation, no corporate stock-photo aesthetic.
```

---

### Slot 1 · Hero-Standbild
**Datei:** `public/assets/video/hero-poster.jpg` · **Format: 16:9, 1920×1080**
Vollbild hinter der Hero-Headline. Wichtig: Person mittig (Mobile schneidet die Seiten weg), ringsum ruhige dunkle Fläche, damit Text darüber lesbar bleibt.

```text
Half-body portrait of [OPTIK] (match the attached reference photo), standing centered against a dark charcoal-navy studio backdrop, arms lightly crossed, calm confident expression with a hint of a smile, looking straight into the camera. Soft warm golden key light from the left edge, subtle cool blue rim light from the right. Dark, moody, high-end. Person fully inside the central third of the frame, plenty of calm dark negative space around them for overlaid headline text. 16:9.
```

Ohne Referenzfoto: `...portrait of a young man in a dark suit, seen from a three-quarter back angle, face turned away into the warm light...` - Rest identisch.

**Video-Variante** (`hero-placeholder.mp4`, per Image-to-Video aus dem Standbild): `Very slow push-in, fine dust drifting in the warm light beam, subtle breathing micro-movement, no camera shake, seamless 6-8 second loop.`

---

### Slot 2 · Porträt "Über [NAME]"
**Datei:** `public/assets/img/founder-smiling.jpg` · **Format: 3:4 hochkant, min. 768×1024**
Der bewusst unperfekte Kontrast zum Hero: wirkt wie ein Schnappschuss, nicht wie ein Shooting.

```text
Candid documentary photo caught mid-laugh: [OPTIK] (match the attached reference photo), standing in a bright Altbau office room with white panelled doors, dark suit worn relaxed, hand at the chin mid-gesture, genuinely laughing, NOT looking at the camera. Warm subdued evening light, ambient available light only, slightly underexposed, visible soft grain - feels like a snapshot a colleague took in a good moment. 3:4 portrait.
```

Ohne Referenzfoto: gleiche Szene, Person im Halbprofil von der Seite, Gesicht durch Lachen/Handbewegung nur teilweise sichtbar.

---

### Slot 3 · Team-Bühne
**Datei:** `public/assets/video/team-poster.jpg` (+ `team-placeholder.mp4`) · **Format: 16:9, 1920×1080**
Läuft unter "Keiner hier wurde als Verkäufer geboren." Die Caption "[Platzhalter - echtes Team-Footage folgt]" bleibt stehen - das Bild darf also atmosphärisch statt dokumentarisch-exakt sein.

```text
Candid documentary scene: four young people in their early twenties, mixed genders, smart-casual, around a wooden table in a warm Altbau office in the evening - laughing during a working session, notebooks and coffee cups on the table, warm practical lamps glowing against dusk-blue windows. Deep navy shadows, golden highlights, nobody looks at the camera. Documentary framing, film-still energy. 16:9.
```

**Video-Variante:** `Subtle handheld documentary feel, people gesturing and laughing in slow natural motion, lamp light flickering softly, 6-10 second loop.`

---

### Slot 4 · Stadt-Ambient (hinter der Deutschland-Karte)
**Datei:** `public/assets/img/ambient-city.jpg` · **Format: 16:9, 1920×1080**
Liegt stark abgedunkelt HINTER der Karte - großflächig ruhig, keine kleinteiligen Details.

```text
Cinematic blue-hour rooftop view over the old town of [STADT_1], Germany: dark tiled roofs, a handful of warmly lit windows, [WAHRZEICHEN] and church towers as soft silhouettes in light mist, deep navy night sky with a faint warm glow at the horizon. Very dark, moody, atmospheric, broad calm areas, subtle tilt-shift miniature feel. 16:9.
```

---

### Slot 5 · Finale-Bühne
**Datei:** `public/assets/video/finale-poster.jpg` (+ `finale-placeholder.mp4`) · **Format: 16:9, 1920×1080**
Metapher "der Platz im Licht ist frei". Personen- und stadtunabhängig - **kann zur Not unverändert aus dem Emil-Skelett übernommen werden.**

```text
Empty dark stage in light haze: a single golden spotlight beam cuts diagonally from the upper right through the darkness and lands as a warm pool of light on the empty floor - the spot is free, someone could step into it. Deep navy-black surroundings, fine dust visible in the beam, cinematic contrast, no people. 16:9.
```

**Video-Variante:** `Dust particles slowly drifting through the static light beam, beam intensity breathing very subtly, 6-8 second seamless loop.`

---

### Slot 6 · Social-Vorschau (WhatsApp/OG-Link-Bild)
**Datei:** `public/assets/img/og-image.jpg` · **Format: 1,91:1, exakt 1200×630**
Das Bild, das beim Verschicken des Links erscheint - muss auch als Mini-Thumbnail lesbar sein.

```text
Golden-hour skyline panorama of [STADT_1], Germany, with [WAHRZEICHEN] recognizable in silhouette, warm low sun and soft haze, calm foreground (river, park or rooftops - whatever is typical for the city), warm amber sky fading into soft beige. Quiet, premium, uncluttered - must read clearly even as a small thumbnail. Landscape 1.91:1.
```

---

### Einfügen ins Skelett

| Slot | Datei überschreiben (Name exakt behalten) |
|---|---|
| 1 | `public/assets/video/hero-poster.jpg` + `hero-placeholder.mp4` |
| 2 | `public/assets/img/founder-smiling.jpg` |
| 3 | `public/assets/video/team-poster.jpg` + `team-placeholder.mp4` |
| 4 | `public/assets/img/ambient-city.jpg` |
| 5 | `public/assets/video/finale-poster.jpg` + `finale-placeholder.mp4` |
| 6 | `public/assets/img/og-image.jpg` |

Videos: aus dem jeweiligen Standbild per Image-to-Video (Kling, Runway, Veo o. Ä.) erzeugen, als H.264-mp4 in 1080p exportieren, Dateinamen exakt übernehmen. Die Seite loopt sie automatisch stumm. **Schnellste Demo ohne Videos:** in `index.html` bei den drei `<video>`-Tags das `data-src`-Attribut entfernen - dann bleibt jeweils das neue Standbild stehen.

Danach `npm install` + `npm run dev` für die Vorschau, `npm run build` für den Versand-Stand (`dist/`).

---

## Teil B · Text-Anpassungs-Prompt (in Claude Code im kopierten Repo-Ordner einfügen)

```text
Nimm dieses Projekt als fertiges Skelett und passe es von "Emil (Dresden/Leipzig)" auf einen neuen Vertreter an. Es ändern sich NUR Texte, Name, Städte und Kontaktdaten - Layout, Sektionen, Farben, Animationen und Bildpfade bleiben unangetastet.

Neuer Vertreter:
- Name: [NAME]
- Städte: [STADT_1] (Home Base), [STADT_2] (im Aufbau; falls leer: Ein-Stadt-Variante, Standorte-Texte entsprechend umformulieren)
- WhatsApp: [+49...], Instagram: [@handle], E-Mail: [mail] (fehlende Werte als Platzhalter lassen)
- Story: [2-3 Sätze: Werdegang, seit wann dabei, was ihn ausmacht]

Konkret:
1. index.html + rechner.html: <title>, Meta-Description, OG-Tags, Nav-Brand "Emil.", alle CTAs ("Schreib Emil", "Nachricht an Emil öffnen"), Hero-Eyebrow "Dresden · Leipzig", die <span class="hero__letter">-Spans buchstabenweise auf [NAME] umbauen, These-/Team-/Standorte-/Ablauf-/Finale-Texte auf Name und Städte anpassen, Interview-Chips (data-ort) auf die neuen Städte.
2. Sektion "Über Emil": komplett auf [NAME] und seine Story umschreiben. Kernbotschaft beibehalten: Umfeld schlägt Talent, Beweis statt Versprechen. Signature anpassen.
3. Stimmen-Sektion: beide Zitate durch neutrale Platzhalter ersetzen ("[Zitat folgt - hier stehen nur echte, freigegebene Stimmen]"). Keine Zitate erfinden.
4. src/config.js: whatsappNumber, instagramHandle, instagramUrl, email, locations mit echten Lon/Lat der neuen Städte ([STADT_1] mit primary: true, den "Bald du?"-Pin behalten).
5. src/js/whatsapp.js: die zwei "Hey Emil!"-Grußzeilen auf [NAME].
6. impressum.html, datenschutz.html, erstinformation.html: "Emil" durch [NAME] ersetzen, alle Adress-/Rechts-Platzhalter als Platzhalter stehen lassen.
7. Footer: ©-Zeile, Städte, Kontakt-Platzhalter.

Tonalität, nicht verhandelbar: konsequent duzen. Ehrlich und leise statt Hype. Keine Einkommenszahlen, keine Versprechen. ERGO taucht auf der Marketing-Oberfläche nicht auf (nur in den Rechtstexten). WhatsApp ist der einzige primäre CTA. Sprachbild der Vorlage halten: kurze Sätze, Bindestriche statt Gedankenstriche.

Zum Schluss: npm run dev starten und die Seite desktop + mobil (375 px) gegenprüfen.
```

---

## Teil C · Check vor dem Versand an den Vertreter

1. Alle 6 Bilder getauscht, Hero mobil geprüft (Person sichtbar, nicht abgeschnitten)?
2. Kein "Emil", "Dresden", "Leipzig" mehr auf der Seite (Strg+F im Browser)?
3. WhatsApp-Button öffnet die richtige Nummer mit "Hey [NAME]!"?
4. Stimmen-Sektion zeigt Platzhalter, keine erfundenen Zitate?
5. Link einmal selbst in WhatsApp schicken: OG-Bild und Titel korrekt?

---

## Teil D · Kickoff-Prompt für eine neue Claude-Session (der Ein-Nachricht-Weg)

**Vorbereitung (einmal, 2 Minuten):** Projektordner kopieren und umbenennen (z. B. `Website-[NAME]`); `node_modules/` und `dist/` dürfen in der Kopie fehlen, `npm install` stellt alles wieder her. Dann Claude Code **in diesem neuen Ordner** öffnen. Der Ordner IST das Skelett - ein Vercel-Link reicht nicht als Ersatz, weil dort nur der minifizierte Build liegt und Claude die Seite daraus nur nachbauen, nicht exakt klonen könnte.

**Dann diese eine Nachricht schicken - Steckbrief ausfüllen, Fotos des Vertreters anhängen:**

```text
Du sitzt in einer Kopie des Emil-Website-Skeletts. Aufgabe: dieselbe Website für einen neuen Vertreter. Lies zuerst PROMPT-NEUER-VERTRETER.md im Projektordner und arbeite sie ab.

Steckbrief:
- Name: [NAME]
- Städte: [STADT_1] (Home Base), [STADT_2] (optional, sonst leer lassen)
- WhatsApp: [+49...] · Instagram: [@handle] · E-Mail: [mail] (Fehlendes als Platzhalter lassen)
- Story: [2-3 Sätze: Werdegang, seit wann dabei, was ihn ausmacht]
- Wahrzeichen von [STADT_1]: [WAHRZEICHEN]

Bilder:
- Angehängt sind echte Fotos von [NAME]. Nutze sie direkt für Slot 1 (Hero, 16:9) und Slot 2 (Porträt, 3:4) - zuschneiden ist besser als generieren. Nur wenn ein Foto fehlt oder nicht taugt: mit den Prompts aus Teil A generieren, Foto als Personen-Referenz.
- Slots 3, 4 und 6 mit den Prompts aus Teil A generieren ([STADT_1]/[WAHRZEICHEN] einsetzen). Slot 5 (Finale-Spotlight) unverändert lassen.
- Videos: die data-src-Schnell-Lösung aus Teil A nutzen, keine Videos generieren.

Texte: Teil B vollständig umsetzen. Danach npm install + npm run dev, Seite desktop und mobil (375 px) prüfen und mir Screenshots zeigen. Zum Schluss Teil C abhaken.
```

Hinweis: Das Generieren der Szenen-Slots klappt in der neuen Session nur, wenn dort ein Bild-Generierungs-Tool verbunden ist (in deinem Setup vorhanden). Falls nicht: Slots 3/4/6 extern mit Teil A erzeugen, Dateien laut Einfüge-Tabelle in den Ordner legen und das in der Kickoff-Nachricht erwähnen.
