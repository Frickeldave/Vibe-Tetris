# Lektion 1: Einstieg und erster Block

In dieser Lektion lernst du, wie du ein einfaches HTML‑Dokument mit einer Zeichenfläche (`canvas`) erstellst und mit JavaScript einen farbigen Block malst. Das ist der erste Schritt, um später Tetris zu programmieren.

Diese Lektion dauert etwa 1‑2 Stunden. Nimm dir Zeit, um die Beispiele zu verstehen und auszuprobieren. Am Ende dieser Lektion solltest du eine schwarze Spielfläche mit einem grünen Quadrat sehen.

## 1. Ordner für die Lektion anlegen

Lege in deinem lokalen Repository einen Ordner für diese Lektion an:

```
lessons/lesson-01/
```

Alle Dateien der Lektion kommen in diesen Ordner. Das hilft dir, den Überblick zu behalten, welche Dateien zu welcher Lektion gehören.

## 2. Die Datei `index.html` erstellen

Erstelle in `lessons/lesson-01/` die Datei `index.html` und füge den folgenden Inhalt ein:

```html
<!doctype html>
<html>
<head>
  <meta charset='utf-8' />
  <title>Mein erstes Tetris</title>
  <style>
    body { margin: 0; background: #000; color: #fff; font-family: sans-serif; }
    #game { display: block; margin: 2rem auto; background: #111; }
  </style>
</head>
<body>
  <h1>Tetris – Lektion 1</h1>
  <canvas id='game' width='300' height='600'></canvas>
  <script src='script.js'></script>
</body>
</html>
```

**Was passiert hier?**

- Das `<canvas>`‑Element mit der ID `game` dient als Zeichenfläche.
- Die `<style>`‑Sektion färbt den Hintergrund schwarz und gibt der Spielfläche eine dunkelgraue Farbe.

## 3. Die Datei `script.js` erstellen

Erstelle im selben Ordner die Datei `script.js` und füge folgenden Code ein:

```js
// Wir holen uns das Canvas-Element aus dem HTML
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Breite und Höhe der Spielfläche
const width = canvas.width;
const height = canvas.height;

// Hintergrund zeichnen
function drawBackground() {
  ctx.fillStyle = '#111';      // dunkelgraue Farbe
  ctx.fillRect(0, 0, width, height);
}

// Einen Block zeichnen
function drawBlock(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

// Hauptfunktion, in der wir alles zeichnen
function draw() {
  drawBackground();
  // grüner Block in der Mitte
  drawBlock(width/2 - 15, height/2 - 15, 30, '#4CAF50');
}

// Animationsschleife starten
function loop() {
  draw();
  requestAnimationFrame(loop); // ruft sich selbst immer wieder auf
}

loop();
```

**Erklärungen**

- `getContext('2d')` liefert uns den sogenannten „Zeichenkontext“. Damit können wir auf dem Canvas malen.
- `fillRect(x, y, breite, höhe)` zeichnet ein gefülltes Rechteck an die Position `(x, y)`.
- `requestAnimationFrame` ruft die angegebene Funktion (hier `loop`) immer wieder auf, sodass später Animationen möglich sind.

## 4. Ausprobieren

Öffne `index.html` in deinem Browser (Doppelklick oder über die VS Code‑Erweiterung „Live Server“). Du solltest eine schwarze Fläche und in der Mitte ein grünes Quadrat sehen. Probiere, die Farbe oder Position des Quadrats zu ändern. Was passiert?

## 5. Änderungen sichern (Commit)

Wenn alles funktioniert, kannst du deine Arbeit mit Git sichern:

```bash
git add lessons/lesson-01/index.html lessons/lesson-01/script.js
git commit -m 'Lektion 1: Canvas einrichten und ersten Block zeichnen'
git push
```

Gut gemacht! In der nächsten Lektion baust du auf diesem Grundgerüst auf und programmierst ein Spielfeld für Tetris.
