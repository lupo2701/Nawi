# 🔬 NaWi – unsere Klassen-App

Lern-App für den NaWi-Unterricht: Pinnwand, Fakt der Woche, Wochen-Lern-Check mit Serie 🔥, Wochen-Umfrage, Termine mit Countdown, Lern-Timer und Quiz.
Läuft komplett im Browser, ohne Anmeldung und ohne Server. Die Lern-Serie wird nur lokal auf dem Gerät gespeichert.

**App öffnen:** https://lupo2701.github.io/Nawi/

## Online stellen mit GitHub Pages (einmalig)

1. Im Repository auf **Settings → Pages** gehen.
2. Unter *Build and deployment* → *Source*: **Deploy from a branch**.
3. Branch **main** und Ordner **/ (root)** wählen → **Save**.
4. Nach ca. 1–2 Minuten ist die App unter dem Link oben erreichbar.

## Auf dem iPad / iPhone installieren

1. Link in **Safari** öffnen
2. Teilen-Symbol (□↑) → **„Zum Home-Bildschirm“**
3. NaWi startet dann wie eine App im Vollbild

## Aufbau

```
index.html        Grundgerüst
css/style.css     Gestaltung
js/data.js        Alle Inhalte: Klasse, Lehrkraft, Pinnwand, Termine, Fakten, Quiz – hier anpassen
js/app.js         App-Logik (Navigation, Lern-Check, Timer, Quiz)
manifest.json     App-Einstellungen für den Home-Bildschirm
```

## Lokal starten

`index.html` im Browser öffnen – oder im Ordner `python3 -m http.server` ausführen und `http://localhost:8000` aufrufen.
