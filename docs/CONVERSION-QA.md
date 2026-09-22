# Umsetzung und Prüfung: Ruben kontaktieren

Lokale Abnahme: 21.09.2026. Veröffentlichung vorbereitet am 22.09.2026. Der abschließende Git-/Vercel-Status und die Prüfung der öffentlichen Website werden im Aufgabenabschluss ausgewiesen.

## Ergebnis

- Bestätigte WhatsApp-Nummer, Instagram-Adresse und E-Mail zentral eingetragen; statische Fallbacks auf Startseite und Rechner passen dazu.
- Vorhandene Textflächen laden zu einem einfachen Gespräch ein. Kontaktüberschrift: „Lass uns sprechen.“ Ort und Nachricht bleiben freiwillig.
- Ausdrücklich mit WhatsApp beschriftete Menü-/Footerlinks führen direkt zum vorbereiteten Entwurf. Kontaktlinks bleiben beim Mini-Interview.
- Der bestehende Rechnerbutton übergibt ausschließlich das feste Thema rechner. Das vorhandene Nachrichtenfeld zeigt den bearbeitbaren Entwurf.
- Eigene oder bewusst geleerte Nachrichten werden beim Zurückgehen und bei Ortsänderungen nicht durch einen neuen Entwurf ersetzt.
- Die vorhandenen zwei Textbereiche pro Rechner-Footerlink bleiben erhalten. Echte Nummer und E-Mail passen auch bei 320 Pixel Breite.
- Kein neuer Speicher, Analysedienst, Formularversand oder UI-Element.

## Designvergleich

Ausgangsstand: Commit 50b8992cb09a5d86bc4ab99a2c29c34677b76bb2 mit der bereits vorhandenen neuen Bildauswahl. Diese Bildauswahl gehört nicht zur Kontaktüberarbeitung.

Styles, Bilder, Videos, Hero-Medienkonfiguration, Alaba-Inszenierung, Navigation und Rechnerberechnung wurden nicht verändert. Tagfolge, Klassen und IDs von Startseite/Rechner sowie der vollständige Schwarzweiß-Abschnitt #story bleiben erhalten. In scroll.js wurde nur die Erkennung interner Sprunglinks abgesichert; Scroll- und Animationseinstellungen bleiben gleich.

Die Texte wurden auf ihre bestehenden Zeilenhöhen abgestimmt. Die überprüften Abschnittsgrößen und Positionen von Überschrift, Einleitung, Formular, Textfeld und WhatsApp-Button stimmen mit dem Ausgangsstand überein. Die Textbreite der kürzeren Ortsbeschriftung ändert sich erwartungsgemäß, ohne andere Elemente zu verschieben.

| Viewport | Horizontaler Überlauf | Kontaktformular und Button gegenüber vorher | Begleittext-Zeilenhöhe |
|---|---|---|---|
| 320 × 844 | Nein | Unverändert | Unverändert |
| 390 × 844 | Nein | Unverändert | Unverändert |
| 768 × 900 | Nein | Unverändert | Unverändert |
| 1440 × 900 | Nein | Unverändert | Unverändert |

Referenzdateien und Schutzmanifest liegen außerhalb des Website-Builds im lokalen QA-Verzeichnis dieser Aufgabe. Keine Testdaten oder Screenshots werden mit der Website veröffentlicht.

## Funktionsprüfung im Browser

1. Leeres Formular erzeugt einen freundlichen Standardentwurf für die bestätigte Nummer.
2. Leipzig ergänzt den Ort; erneutes Anklicken wählt ihn ab.
3. Woanders ergänzt seinen passenden Text, ohne die eigene Nachricht zu verändern.
4. Umlaute, Emoji, & und Zeilenumbrüche erscheinen im decodierten Entwurf korrekt.
5. Vollständiges Löschen der eigenen Nachricht bleibt möglich und erzeugt beim Weitergehen den allgemeinen Gruß.
6. Rechnerbutton erreicht den vorhandenen Kontaktabschnitt mit sichtbarem Rechnerentwurf.
7. Ortswahl erhält den Rechnerentwurf; der Gruß wird nicht doppelt eingefügt.
8. Eigene Nachricht bleibt nach Wegnavigation und Browser-Zurück erhalten.
9. Ein bewusst geleertes Feld bleibt nach Browser-Zurück leer.
10. Ein unbekannter Themenparameter wird ignoriert und ergibt den allgemeinen Einstieg.

Alle zehn Prüfungen bestanden. Auf den geprüften lokalen Wegen keine Browserwarnungen oder -fehler.

Der direkte WhatsApp-Link wurde zusätzlich bis zur offiziellen Übergabeseite geöffnet. Dort wurden die Nummer +49 176 47178532 und der richtige vorbereitete Gruß angezeigt. Keine Nachricht wurde abgesendet. Dies bestätigt die URL-Übergabe, nicht die Anmeldung oder Zustellung innerhalb einer WhatsApp-App.

## Technische Prüfung und Grenzen

- Produktionsbuild erfolgreich; Diff-Prüfung ohne Whitespace-Fehler.
- Schutzvergleich gegen den Arbeitsstand vor der Umsetzung bestanden; nur die erlaubten Kontaktdaten in der Konfiguration ändern sich.
- Die Regeln für reduzierte Bewegung sind unverändert. Die zentrale Einladung steht auch im normalen Kontakttext; eine tatsächlich umgestellte Systemeinstellung wurde hier nicht im Browser emuliert.
- Der tatsächliche Wechsel aus dem Instagram-In-App-Browser in die WhatsApp-App auf einem iPhone und Android-Gerät ist noch offen.
- Zum Zeitpunkt der lokalen Abnahme am 21.09.2026 waren diese Änderungen noch nicht committed, gepusht oder veröffentlicht. Am 22.09.2026 wird der abgegrenzte Kontaktstand über main veröffentlicht; zusätzliche lokale Videoentwürfe unter output/ gehören nicht dazu.
- Weitere vorhandene Identitäts-/Adressplatzhalter auf den Rechtsseiten wurden durch diesen Kontaktumfang nicht vervollständigt.

## Einfache spätere Erfolgskontrolle

Vergleichbare Zeiträume vor und nach Veröffentlichung dokumentieren:

| Zeitraum | Instagram-Linkklicks laut verfügbaren Insights | Neue Gespräche über die Website, von Ruben gezählt | Besonderer Reel-/Story-Anlass |
|---|---|---|---|
| Vor Veröffentlichung | Noch nicht erfasst | Noch nicht erfasst | |
| Nach Veröffentlichung | Noch nicht erfasst | Noch nicht erfasst | |

Dies ist eine grobe Beobachtung ohne eindeutige Zuordnung jedes Besuchers. WhatsApp-Klick und tatsächlich gesendete Nachricht sind unterschiedliche Ereignisse. Aus der lokalen Prüfung wird keine höhere Conversion-Rate behauptet.
