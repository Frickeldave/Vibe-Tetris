# Lektion 2: Spielfeld und L‑Stein mit automatischem Fallen

In dieser Lektion baust du das Spielbrett als Gitter auf und lässt einen L‑förmigen Stein automatisch von oben nach unten fallen.

Diese Lektion dauert etwa 1–2 Stunden. Sie knüpft an Lektion 1 an – du solltest also bereits eine `index.html` mit einem `<canvas>` und ein leeres `script.js` haben.

## 1. Neuen Ordner anlegen

Lege im Repository einen neuen Ordner für diese Lektion an. In VS Code kannst du eine neue Struktur anlegen:

```
lessons/lesson-02/
```

Kopiere die Dateien aus Lektion 1 in diesen Ordner, damit du nicht bei Null anfangen musst (`index.html` und `script.js`):

```bash
cp -r lessons/lesson-01/. lessons/lesson-02/
```

## 2. Grid‑Konstanten definieren

Öffne `lessons/lesson-02/script.js`. Ganz oben legst du ein paar Konstanten fest:

```js
const COLS = 10;      // Spalten des Spielfelds
const ROWS = 20;      // Zeilen des Spielfelds
const BLOCK_SIZE = 30; // Größe der Blöcke in Pixeln
```

## 3. Spielfeld als Array anlegen

Ein Tetris‑Brett ist ein zweidimensionales Array. Jede Zelle kann leer (`0`) oder belegt sein (z. B. `1`).

```js
const board = [];
for (let r = 0; r < ROWS; r++) {
  board[r] = [];
  for (let c = 0; c < COLS; c++) {
    board[r][c] = 0;
  }
}
```

## 4. L‑Stein definieren

Definiere einen einfachen L‑förmigen Stein. Er besteht aus einer Matrix aus 1 und 0 (für leer).

```js
let currentShape = [
  [1, 0],
  [1, 0],
  [1, 1],
];

let currentX = 3;  // Startspalte
let currentY = 0;  // Startzeile
```

## 5. Zeichenfunktionen

Jetzt schreiben wir zwei Funktionen, um das Brett und den aktuellen Stein zu zeichnen.

```js
function drawBoard() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== 0) {
        ctx.fillStyle = '#444';
        ctx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
      }
    }
  }
}

function drawShape() {
  for (let r = 0; r < currentShape.length; r++) {
    for (let c = 0; c < currentShape[r].length; c++) {
      if (currentShape[r][c] !== 0) {
        ctx.fillStyle = '#6cf'; // Farbe für den L‑Stein
        ctx.fillRect((currentX + c) * BLOCK_SIZE, (currentY + r) * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawShape();
}
```

Rufe `draw()` am Ende von `script.js` auf, um dein Brett zu sehen:

```js
draw();
```

## 6. Automatisches Fallen

Damit der Stein nach unten rutscht, brauchen wir einen kleinen Timer. Wir nutzen `requestAnimationFrame` genau wie in Lektion 1.

```js
let dropCounter = 0;
let dropInterval = 1000; // Alle 1000 ms fällt der Stein eine Zeile
let lastTime = 0;

function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > dropInterval) {
    currentY++;
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(update);
}

update();
```

## 7. Testen und Commit

Öffne deine `index.html` im Browser. Du solltest sehen, wie der L‑Stein jede Sekunde nach unten rutscht. Probiere ruhig, `currentShape` oder `currentX` zu verändern, um zu verstehen, wie sich der Stein bewegt.

Sichere deine Arbeit mit Git:

```bash
git add lessons/lesson-02/index.html lessons/lesson-02/script.js
git commit -m "Lektion 2: Spielfeld und L‑Stein mit automatischem Fallen"
git push
```

---

In der nächsten Lektion fügst du Steuerungstasten hinzu, damit du den Stein nach links und rechts bewegen kannst.
