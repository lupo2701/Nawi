/* NaWi – unsere Klassen-App
 * INHALTE: Hier kannst du alles anpassen (Klasse, Pinnwand, Termine, Fakten, Quiz).
 * Nach dem Speichern auf GitHub sehen alle Schüler die neue Version.
 */
// Klasse und Lehrkraft
const KLASSE = "Klasse 7b";
const LEHRER = "Herr Muster";

// Pinnwand – Nachricht an die Klasse (einfach Text ändern)
const PINNWAND = "Diese Woche nehmen wir uns die Zelle vor 🦠 Bringt bitte am Donnerstag eure Hefte mit – wir mikroskopieren gemeinsam!";

// Termine für die ganze Klasse (Format: JJJJ-MM-TT) – einfach ändern oder ergänzen
const FESTE_TERMINE = [
  { name: "NaWi-Test: Die Zelle", date: "2026-12-03", icon: "📝" },
  { name: "Referat abgeben",      date: "2026-12-10", icon: "📊" },
  { name: "Weihnachtsferien 🎄",  date: "2026-12-23", icon: "🎉" },
];

// Fakten – jede Woche kommt automatisch der nächste dran
const FAKTEN = [
  "Ein Blitz ist rund 30.000 °C heiß – etwa fünfmal heißer als die Oberfläche der Sonne.",
  "Wasser dehnt sich beim Gefrieren aus. Deshalb schwimmt Eis oben.",
  "Dein Körper besteht zu etwa 60 % aus Wasser.",
  "Das Licht der Sonne braucht ungefähr 8 Minuten bis zur Erde.",
  "Bananen sind ganz leicht radioaktiv – wegen des Kaliums, das sie enthalten.",
  "Ein Oktopus hat drei Herzen und blaues Blut.",
  "Diamant und Bleistiftmine (Graphit) bestehen beide nur aus Kohlenstoff.",
  "Schall ist im Wasser etwa viermal so schnell wie in der Luft.",
  "Die DNA aus einer einzigen menschlichen Zelle wäre ausgerollt etwa 2 Meter lang.",
  "Honig verdirbt praktisch nie – selbst jahrtausendealter Honig ist noch essbar.",
  "Auf der Venus dauert ein Tag länger als ein ganzes Jahr.",
  "Etwa die Hälfte unseres Sauerstoffs stammt von winzigen Algen im Meer.",
  "Aus 1 Gramm Gold kann man einen Draht von mehreren Kilometern Länge ziehen.",
  "Dein Herz schlägt ungefähr 100.000 Mal am Tag.",
  "Helium ist nach Wasserstoff das häufigste Element im Universum.",
  "Ein Teelöffel Material aus einem Neutronenstern würde Milliarden Tonnen wiegen.",
  "Fledermäuse 'sehen' mit Ultraschall – das nennt man Echoortung.",
  "Auf dem Mount Everest kocht Wasser schon bei etwa 70 °C.",
  "Bärtierchen sind so robust, dass sie sogar einen Ausflug ins Weltall überlebt haben.",
  "Ein Regenbogen ist eigentlich ein ganzer Kreis – vom Boden aus sieht man nur einen Teil.",
  "Pflanzen 'atmen' durch winzige Öffnungen in ihren Blättern, die Spaltöffnungen.",
  "Der Mensch hat über 200 Knochen – ein Baby kommt mit noch mehr auf die Welt.",
];

// Quizfragen – a = Index der richtigen Antwort (0 = erste)
const QUIZ = [
  { q: "Was ist die kleinste Einheit des Lebens?", o: ["Atom","Zelle","Organ","Molekül"], a: 1 },
  { q: "Wo findet die Fotosynthese statt?", o: ["Mitochondrien","Zellkern","Chloroplasten","Vakuole"], a: 2 },
  { q: "Bei wie viel °C siedet Wasser (auf Meereshöhe)?", o: ["90 °C","100 °C","120 °C","80 °C"], a: 1 },
  { q: "Was ist das chemische Zeichen für Sauerstoff?", o: ["S","Sa","O","Ox"], a: 2 },
  { q: "Welcher Planet ist der Sonne am nächsten?", o: ["Venus","Mars","Erde","Merkur"], a: 3 },
  { q: "Welches Gas atmen wir aus?", o: ["Kohlenstoffdioxid","Stickstoff","Helium","Wasserstoff"], a: 0 },
  { q: "In welcher Einheit misst man Kraft?", o: ["Watt","Newton","Joule","Volt"], a: 1 },
  { q: "Was ist H₂O?", o: ["Salz","Wasserstoff","Wasser","Sauerstoff"], a: 2 },
  { q: "Welches Organ pumpt das Blut durch den Körper?", o: ["Lunge","Leber","Niere","Herz"], a: 3 },
  { q: "Was passiert beim Schmelzen?", o: ["fest → flüssig","flüssig → gasförmig","gasförmig → fest","flüssig → fest"], a: 0 },
];
