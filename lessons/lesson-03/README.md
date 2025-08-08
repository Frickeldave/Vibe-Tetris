# Lektion 3: Steuerung und Kollision

In dieser Lektion fügst du Tastatursteuerung hinzu. Du kannst den fallenden Stein nach links und rechts bewegen, nach unten beschleunigen und ihn drehen. Außerdem verhinderst du, dass der Stein außerhalb des Spielfelds verschwindet.

Diese Lektion dauert etwa 1–2 Stunden. Baue auf Lektion 2 auf – du solltest schon ein Brett und einen automatisch fallenden Stein haben.

## 1. Ordner kopieren

Lege einen neuen Ordner für diese Lektion an und kopiere die Dateien von Lektion 2 hinein:

```
lessons/lesson-03/
```

Kopieren mit dem Terminal:

```bash
cp -r lessons/lesson-02/. lessons/lesson-03/
```

## 2. Hilfsfunktion `collision`

Öffne `lessons/lesson-03/script.js` und definiere eine Funktion, die prüft, ob der Stein mit den Grenzen kollidiert:

```js
function collision(offsetX, offsetY, shape) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] === 0) continue;
      const newX = currentX + c + offsetX;
      const newY = currentY + r + offsetY;
      if (newX < 0 || newX >= COLS || newY >= ROWS) {
        return true;
      }
      // Ab Lektion 4 prüfen wir hier auch board[newY][newX] != 0
    }
  }
  return false;
}
```

## 3. Bewegung implementieren

Schreibe eine Funktion, die den Stein verschiebt – aber nur, wenn keine Kollision droht:

```js
function move(dx, dy) {
  if (!collision(dx, dy, currentShape)) {
    currentX += dx;
    currentY += dy;
  }
}
```

## 4. Tastatursteuerung

Jetzt brauchst du einen Event‑Listener, der auf Pfeiltasten reagiert:

```js
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      move(-1, 0);
      break;
    case 'ArrowRight':
      move(1, 0);
      break;
    case 'ArrowDown':
      move(0, 1); // schneller runter
      dropCounter = 0;
      break;
    case 'ArrowUp':
      rotateShape();
      break;
  }
});
```

### Rotationsfunktion

Eine einfache Drehung im Uhrzeigersinn bekommst du mit einer Matrix‑Funktion:

```js
function rotateShape() {
  const rows = currentShape.length;
  const cols = currentShape[0].length;
  const rotated = [];
  for (let c = 0; c < cols; c++) {
    rotated[c] = [];
    for (let r = rows - 1; r >= 0; r--) {
      rotated[c][rows - 1 - r] = currentShape[r][c];
    }
  }
  if (!collision(0, 0, rotated)) {
    currentShape = rotated;
  }
}
```

## 5. Kollision am unteren Rand

Passe deine `update()`‑Funktion an. Wenn der Stein unten angekommen ist, setze ihn wieder nach oben:

```js
function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > dropInterval) {
    if (!collision(0, 1, currentShape)) {
      currentY++;
    } else {
      // Stein erreicht den Boden – starte neu
      currentX = 3;
      currentY = 0;
    }
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(update);
}
```

## 6. Testen und Commit

Starte deine Seite im Browser. Bewege den Stein mit den Pfeiltasten. Er sollte nicht über den Rand hinaus gehen und nach einer Kollision von oben neu starten.

Speichere und committe deine Änderungen:

```bash
git add lessons/lesson-03/script.js lessons/lesson-03/index.html
git commit -m "Lektion 3: Steuerung und Kollision"
git push
```

---

In der nächsten Lektion stapeln wir die Steine auf dem Brett und löschen vollständige Linien.
