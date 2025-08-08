# Lektion 4: Stapeln und Linien löschen

In dieser Lektion lässt du den fallenden Stein auf dem Brett liegen, sobald er landet. Du erkennst volle Reihen und löschst sie – damit entsteht das typische Tetris‑Gefühl und ein Punktesystem.

Diese Lektion dauert ca. 1–2 Stunden und baut auf Lektion 3 auf.

## 1. Ordner kopieren

Lege einen neuen Ordner für diese Lektion an und kopiere die Dateien von Lektion 3 hinein:

```
lessons/lesson-04/
```

Kopieren mit dem Terminal:

```bash
cp -r lessons/lesson-03/. lessons/lesson-04/
```

## 2. Kollision mit bestehenden Blöcken

Erweitere deine Funktion `collision()` so, dass sie auch belegte Zellen im `board` berücksichtigt. Füge am Ende der Schleifen folgende Zeile ein:

```js
if (board[newY][newX] !== 0) {
  return true;
}
```

Damit erkennt dein Spiel, wenn der Stein auf andere Steine trifft.

## 3. Stein ins Brett einfügen

Wenn der Stein nicht weiter nach unten kann, soll er ins Spielfeld integriert werden. Schreibe eine Funktion `merge()`:

```js
function merge() {
  for (let r = 0; r < currentShape.length; r++) {
    for (let c = 0; c < currentShape[r].length; c++) {
      if (currentShape[r][c] !== 0) {
        board[currentY + r][currentX + c] = currentShape[r][c];
      }
    }
  }
}
```

## 4. Reihen löschen und Punkte zählen

Schreibe eine Funktion `clearLines()`, die jede vollständige Zeile löscht und leere Zeilen oben einfügt. Zähle einen Punktestand mit:

```js
let score = 0;

function clearLines() {
  for (let r = ROWS - 1; r >= 0; r--) {
    let full = true;
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] === 0) {
        full = false;
        break;
      }
    }
    if (full) {
      board.splice(r, 1);                     // Zeile entfernen
      board.unshift(new Array(COLS).fill(0)); // neue leere Zeile oben
      score += 100;
      r++; // Prüfe dieselbe Zeile noch einmal
    }
  }
}
```

Tipp: Gib den aktuellen Punktestand mit `console.log(score)` aus oder verwende `ctx.fillText`, um ihn im Canvas anzuzeigen.

## 5. Update‑Funktion anpassen

Ändere den Teil in `update()`, der ausgeführt wird, wenn der Stein den Boden oder andere Steine berührt:

```js
if (!collision(0, 1, currentShape)) {
  currentY++;
} else {
  merge();
  clearLines();
  // neuen Stein starten (wir verwenden noch den L‑Stein)
  currentX = 3;
  currentY = 0;
  currentShape = [
    [1, 0],
    [1, 0],
    [1, 1],
  ];
}
```

## 6. Testen und Commit

Starte das Spiel und beobachte, wie die Steine sich stapeln und komplette Reihen verschwinden. Kontrolliere den Punktestand in der Konsole.

Sichere deine Änderungen:

```bash
git add lessons/lesson-04/script.js lessons/lesson-04/index.html
git commit -m "Lektion 4: Stapeln und Linien löschen"
git push
```

---

In der nächsten Lektion lernst du, verschiedene Steine zufällig zu erzeugen und sie zu drehen.
