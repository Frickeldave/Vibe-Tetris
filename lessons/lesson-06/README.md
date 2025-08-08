# Lektion 6: Feinschliff und PWA

In dieser letzten Lektion polierst du dein Spiel und machst daraus eine Progressive Web App (PWA), die sich wie eine App auf dem Smartphone installieren lässt.

Diese Lektion dauert ca. 1–2 Stunden und baut auf Lektion 5 auf.

## 1. Ordner kopieren

Erstelle einen neuen Ordner für diese Lektion und kopiere den Inhalt von Lektion 5 hinein:

```
lessons/lesson-06/
```

```bash
cp -r lessons/lesson-05/. lessons/lesson-06/
```

## 2. Punktezähler anzeigen

Du hast bereits einen `score` implementiert. Jetzt soll dieser auch auf der Seite sichtbar sein:

- Öffne `lessons/lesson-06/index.html` und füge oberhalb des `<canvas>` folgenden Absatz ein:

```html
<p>Punkte: <span id="score">0</span></p>
```

- Ergänze in `script.js` nach jeder Änderung des Punktestands:

```js
document.getElementById('score').textContent = score;
```

So wird der angezeigte Wert aktualisiert.

## 3. Spielgeschwindigkeit anpassen

Erhöhe den Schwierigkeitsgrad, indem du das Spiel schneller machst, je mehr Reihen du löschst. Ändere in `clearLines()` oder direkt nach dem Erhöhen des Scores:

```js
dropInterval = Math.max(200, dropInterval - 50);
```

Dadurch verkürzt sich das Zeitintervall (mindestens bis 200 ms).

## 4. Manifest und Service Worker anlegen

Um das Spiel als PWA installierbar zu machen, benötigst du zwei Dateien im Ordner `lesson-06`.

### manifest.webmanifest

Lege eine Datei `manifest.webmanifest` mit folgendem Inhalt an:

```json
{
  "name": "Tetris",
  "short_name": "Tetris",
  "start_url": ".",
  "display": "fullscreen",
  "background_color": "#111111",
  "theme_color": "#111111",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Du kannst einfache farbige Quadrate als Icons speichern, z. B. `icon-192.png` und `icon-512.png`. Diese legst du im selben Ordner ab.

### sw.js

Erstelle eine Datei `sw.js` mit folgendem Inhalt:

```js
const CACHE = "tetris-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/script.js",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
```

## 5. HTML anpassen und Service Worker registrieren

Öffne `index.html` und füge im `<head>` diese Zeilen ein:

```html
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#111111">
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
</script>
```

Diese Einbindung sorgt dafür, dass das Manifest erkannt und der Service Worker registriert wird.

## 6. Testen und installieren

Starte dein Spiel aus `lesson-06` in einem lokalen Server (z. B. mit der VS‑Code‑Erweiterung „Live Server“). Im Browser solltest du nun die Möglichkeit haben, die App zu installieren (Desktop: Symbol in der Adressleiste, Android: „Zum Startbildschirm hinzufügen“). Probiere es aus!

## 7. Commit

Sichere all deine Änderungen und neuen Dateien:

```bash
git add lessons/lesson-06
git commit -m "Lektion 6: Feinschliff und PWA"
git push
```

Gratulation! Du hast dein Tetris fertiggestellt und als installierbare Web‑App veröffentlicht.
