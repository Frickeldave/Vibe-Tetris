# Lektion 5: Zufällige Steine und Rotation

In dieser Lektion erweitert ihr euer Spiel um alle sieben klassischen Tetris‑Steine und wählt bei jedem neuen Stein zufällig aus. Außerdem sorgt ihr dafür, dass jede Figur eine eigene Farbe hat.

Diese Lektion dauert etwa 1–2 Stunden und baut auf Lektion 4 auf.

## 1. Ordner kopieren

Legt einen neuen Ordner an und kopiert die Dateien aus Lektion 4 hinein:

```
lessons/lesson-05/
```

```bash
cp -r lessons/lesson-04/. lessons/lesson-05/
```

## 2. Steine und Farben definieren

Erstellt am Anfang von `script.js` zwei Arrays mit Formen und Farben:

```js
const SHAPES = [
  [[1,1,1,1]],             // I‑Stein
  [[1,1],[1,1]],           // O‑Stein
  [[0,1,0],[1,1,1]],       // T‑Stein
  [[1,0,0],[1,1,1]],       // L‑Stein
  [[0,0,1],[1,1,1]],       // J‑Stein
  [[0,1,1],[1,1,0]],       // S‑Stein
  [[1,1,0],[0,1,1]],       // Z‑Stein
];

const COLORS = ['#5ef', '#fd5', '#c5f', '#fa6', '#6af', '#6f8', '#f66'];
```

## 3. Random‑Shape‑Funktion

Schreibt eine Funktion, die eine zufällige Figur auswählt und `currentShape` sowie `currentColor` setzt:

```js
let currentColor = '#6cf';

function getRandomShape() {
  const index = Math.floor(Math.random() * SHAPES.length);
  currentShape = SHAPES[index].map(row => row.slice()); // Kopie
  currentColor = COLORS[index];
  currentX = 3;
  currentY = 0;
}
```

Ruft `getRandomShape()` einmal ganz am Anfang auf, damit das Spiel mit einer zufälligen Figur startet.

## 4. Zeichenfunktionen anpassen

Passe `drawBoard()` und `drawShape()` an, damit sie die gespeicherten Farben verwenden:

```js
function drawBoard() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (cell !== 0) {
        ctx.fillStyle = cell;
        ctx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
      }
    }
  }
}

function drawShape() {
  for (let r = 0; r < currentShape.length; r++) {
    for (let c = 0; c < currentShape[r].length; c++) {
      if (currentShape[r][c] !== 0) {
        ctx.fillStyle = currentColor;
        ctx.fillRect((currentX + c) * BLOCK_SIZE, (currentY + r) * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
      }
    }
  }
}
```

Beim Zusammenfügen speicherst du die Farbe im Brett:

```js
board[currentY + r][currentX + c] = currentColor;
```

## 5. Neuen Stein spawnen

Wenn der aktuelle Stein nicht weiter nach unten kann, rufe `merge()`, `clearLines()` und dann `getRandomShape()` auf:

```js
merge();
clearLines();
getRandomShape();
```

## 6. Testen und Commit

Jetzt fallen zufällig alle Tetris‑Steine in unterschiedlichen Farben. Probiert das Drehen und Stapeln aus!

Speichere und committe deine Änderungen:

```bash
git add lessons/lesson-05/script.js lessons/lesson-05/index.html
git commit -m "Lektion 5: Zufällige Steine und Rotation"
git push
```

---

In der letzten Lektion kümmerst du dich um den Feinschliff und machst das Spiel als Progressive Web App installierbar.
