# Vibe‑Tetris

Dies ist ein einfaches Tetris‑Spiel mit JavaScript (Canvas) und einer Progressive Web App (PWA). Ideal zum Lernen von HTML, JavaScript, Git und GitHub. Das Spiel läuft komplett im Browser und kann sogar offline auf dem Smartphone installiert werden („Zum Startbildschirm hinzufügen“).

## Projektstruktur

- **index.html** – Grundgerüst der Webseite mit `<canvas>`‑Element, Einbindung von `script.js`, `manifest.webmanifest` und Registrierung des Service Workers (`sw.js`).
- **script.js** – Enthält die komplette Tetris‑Logik: Spielfeld, Figuren, Bewegung, Rotation, Kollisionen, Punktberechnung, 7‑Bag‑Randomizer, einfache Wall‑Kicks sowie Tastatur‑ und Touch‑Steuerung.
- **manifest.webmanifest** – Beschreibt die PWA (Name, Start‑URL, Farben, Icons).
- **sw.js** – Service Worker, der alle Assets cached und das Spiel offline lauffähig macht.

## Voraussetzungen

- **VS Code** (oder ein anderer Editor), optional die Erweiterung **Live Server** zum lokalen Testen.
- **Git** und ein GitHub‑Account.
- Ein moderner Browser (Chrome, Edge, Firefox).

## Einstieg

1. Das Repository klonen:  
   `git clone https://github.com/Frickeldave/Vibe-Tetris.git`
2. Den Ordner in VS Code öffnen.
3. Die Datei `index.html` im Browser öffnen oder über die Live‑Server‑Erweiterung starten.
4. Das Spiel ist sofort spielbar: Pfeiltasten bewegen das Teil, `ArrowUp` rotiert, `ArrowDown` lässt das Teil schneller fallen, `Space` lässt es sofort fallen, `R` startet ein neues Spiel.

## Git‑Workflow (Basics)

- Status anzeigen: `git status`
- Änderungen zur Aufnahme vormerken: `git add <Dateiname>`
- Commit mit Nachricht erstellen: `git commit -m "Kurz beschreiben, was geändert wurde"`
- Änderungen ins GitHub‑Repo hochladen: `git push`
- Neueste Änderungen vom Server holen: `git pull --rebase`

## Deployment als GitHub Pages

1. Im GitHub‑Repo auf **Settings → Pages** gehen.
2. Unter „Source“ die Branch `main` und den Ordner `/ (root)` auswählen.
3. Speichern – nach wenigen Minuten ist das Spiel unter  
   `https://Frickeldave.github.io/Vibe-Tetris/` erreichbar und als PWA installierbar.

## Vier‑Abend‑Roadmap zum Weiterentwickeln

**Abend 1 – Verstehen & Anpassen**
- Projekt klonen, `index.html` öffnen und spielen.
- `script.js` durchsehen und Kommentare lesen.  
  Suche nach den Konstanten `W` (Breite), `H` (Höhe) und `S` (Zellgröße) und passe sie spaßeshalber an.
- Erste Änderungen: Hintergrundfarbe in `index.html` oder `script.js` ändern, Spieltitel anpassen.

**Abend 2 – Punkte & Bedienoberfläche**
- Eine Punktanzeige im HUD integrieren (`ctx.fillText(...)`).
- Highscore über `localStorage` speichern und beim Start laden.
- Einfache Menülogik: Start‑Bildschirm, Pause und Neustart.

**Abend 3 – Fortgeschrittene Features**
- Eine „Ghost Piece“ implementieren: Berechne, wo das aktuelle Teil landen würde und zeichne es transparent.
- Eine Vorschau der nächsten drei Steine anzeigen (`bag`‑Array verwenden).
- Optional: „Hold Piece“ (Taste `C`) einbauen, das erlaubt, ein Teil zu speichern und später zu tauschen.

**Abend 4 – PWA & Feinschliff**
- PWA testen: Überprüfe, ob `manifest.webmanifest` und `sw.js` funktionieren, indem du das Spiel zu deinem Startbildschirm hinzufügst.
- Eigene Icons (`icon-192.png`, `icon-512.png`) erstellen und im Manifest referenzieren.
- Musik oder Soundeffekte über die HTML5‑Audio‑API einbauen.
- Spiel mit GitHub Pages veröffentlichen und auf dem Handy installieren.

## Kurz‑Überblick zu JavaScript im Projekt

- **Variablen & Konstanten:** `let` und `const` werden benutzt, um Werte zu speichern (z. B. Positionen, Farben).
- **Arrays:** das Spielfeld ist ein zweidimensionales Array (`board`), und die Schlange der zufälligen Steine liegt in `bag`.
- **Funktionen:** kapseln wiederverwendbaren Code, z. B. `spawn()`, `rot()` oder `collide()`.
- **Events:** per `addEventListener` reagieren wir auf Tastendrücke (`keydown`) und Touch‑Events.
- **Canvas‑API:** `ctx.fillRect`, `ctx.clearRect` und `ctx.fillText` zeichnen das Spielfeld und den Text.

Durch das Experimentieren mit diesen Konzepten lernst du nicht nur, wie Tetris funktioniert, sondern auch die Grundlagen von JavaScript und Web‑Programmierung.

Viel Spaß beim Coden und Tüfteln! 🎮
