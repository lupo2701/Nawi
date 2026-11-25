/* NaWi – unsere Klassen-App
 * INHALTE: Hier kannst du alles anpassen (Klasse, Pinnwand, Termine, Fakten, Quiz).
 * Nach dem Speichern auf GitHub sehen alle Schüler die neue Version.
 */
// Passwort für die App (Groß-/Kleinschreibung egal). Leer lassen ("") = keine Sperre.
// Hinweis: Das ist nur eine einfache Sperre – der Code auf GitHub ist öffentlich.
const PASSWORT = "nawi";

// Klasse und Lehrkraft
const KLASSE = "Klasse 8.5";
const LEHRER = "Herr Muster";

// Pinnwand – Nachricht an die Klasse (einfach Text ändern)
const PINNWAND = "Unser Thema: Ernährung 🍎 Am 11.12. schreiben wir die Klausur. Lernt mit der Lernapp „Der Weg der Nahrung“ und macht hier jeden Tag das Quiz – gemeinsam packen wir das!";

// Link zur Lernapp (Button auf der Startseite)
const LERNAPP = { name: "Der Weg der Nahrung", url: "https://lupo2701.github.io/Lernapp-Nawi/" };

// Handzeichen-Umfrage (Reiter „Umfrage“)
// Du fragst in der Klasse per Handzeichen ab und tippst die Anzahl ein.
// Die 1. Frage ist dieselbe wie im Wochen-Lern-Check auf der Startseite (beide Stellen zeigen dieselbe Zahl).
// Die Ergebnisse werden nur auf dem Gerät gespeichert, auf dem du sie eingibst (z. B. dein iPad).
const UMFRAGE = {
  fragen: [
    "Wer hat diese Woche für NaWi gelernt?",
    "Wer hat die NaWi-App diese Woche benutzt?",
    "Wer fühlt sich schon sicher für die Klausur?",
    "Wer möchte ein Thema noch einmal wiederholen?",
  ],
};

// Termine für die ganze Klasse (Format: JJJJ-MM-TT) – einfach ändern oder ergänzen
const FESTE_TERMINE = [
  { name: "Klausur: Ernährung", date: "2026-12-11", icon: "📝" },
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

// Quizfragen zum Thema Ernährung (aus der Lernapp „Der Weg der Nahrung“)
// Pro Runde werden 10 zufällige Fragen gezogen. a = Index der richtigen Antwort (0 = erste)
const QUIZ = [
  { q: "In welcher Reihenfolge durchläuft die Nahrung den Körper?", o: ["Mund – Magen – Speiseröhre – Dünndarm – Dickdarm","Mund – Speiseröhre – Magen – Dünndarm – Dickdarm","Mund – Speiseröhre – Magen – Dickdarm – Dünndarm","Mund – Speiseröhre – Dünndarm – Magen – Dickdarm"], a: 1 },
  { q: "Was bedeutet „Verdauung“?", o: ["Nahrung wird im Magen gespeichert","Nahrung wird in kleinste Bausteine zerlegt, die der Körper aufnehmen kann","Nahrung wird direkt ins Blut gegeben","Nahrung wird zu Kot umgewandelt"], a: 1 },
  { q: "Bei welcher künstlichen Ernährung wird die gesamte Verdauung umgangen?", o: ["enteral (Schlauch in den Magen)","parenteral (direkt in die Vene)","bei beiden","bei keiner"], a: 1 },
  { q: "Welche Organe gehören zum Verdauungssystem, obwohl die Nahrung nicht durch sie hindurchwandert?", o: ["Lunge und Herz","Leber und Bauchspeicheldrüse","Nieren und Blase","Milz und Herz"], a: 1 },
  { q: "Was regt die Darmtätigkeit an?", o: ["langes Sitzen","Bewegung","wenig trinken","Weißbrot"], a: 1 },
  { q: "Welches Enzym im Speichel beginnt die Verdauung?", o: ["Pepsin","Amylase","Insulin","Bilirubin"], a: 1 },
  { q: "Warum schmeckt Brot süßlich, wenn man es lange kaut?", o: ["Speichel enthält Zucker","Amylase spaltet Stärke in Malzzucker","Die Zunge wird müde","Brot enthält Honig"], a: 1 },
  { q: "Was verhindert, dass beim Schlucken Essen in die Luftröhre gelangt?", o: ["das Zäpfchen","der Kehldeckel","die Zunge","der Magenpförtner"], a: 1 },
  { q: "Wie viel Speichel bildet ein Mensch etwa pro Tag?", o: ["0,1 Liter","1,5 Liter","5 Liter","10 Liter"], a: 1 },
  { q: "Warum kann man sogar im Liegen schlucken?", o: ["Wegen der Schwerkraft","Die Speiseröhre transportiert aktiv mit Muskelwellen (Peristaltik)","Weil der Magen ansaugt","Das geht gar nicht"], a: 1 },
  { q: "Welche Geschmacksrichtungen nimmt die Zunge wahr?", o: ["nur süß und salzig","süß, sauer, bitter, salzig, umami","alle Aromen","süß, sauer, scharf"], a: 1 },
  { q: "Warum ist gründliches Kauen wichtig?", o: ["Es vergrößert die Oberfläche der Nahrung, Enzyme greifen besser an","Es macht das Essen kälter","Es macht das Essen saurer","Es ist eigentlich unwichtig"], a: 0 },
  { q: "Welche Säure enthält der Magensaft?", o: ["Essigsäure","Zitronensäure","Salzsäure","Milchsäure"], a: 2 },
  { q: "Welche Nährstoffe beginnt der Magen zu verdauen?", o: ["Fette","Proteine (Eiweiße)","Ballaststoffe","Vitamine"], a: 1 },
  { q: "Warum verdaut sich der Magen nicht selbst?", o: ["Er ist aus Knochen","Eine Schleimschicht schützt die Magenwand","Der Magensaft ist neutral","Er verdaut sich doch"], a: 1 },
  { q: "Was ist der Magenpförtner?", o: ["Ein Schließmuskel am Magenausgang","Ein Enzym","Eine Bakterienart","Der Eingang zum Magen"], a: 0 },
  { q: "Wie entsteht Sodbrennen?", o: ["Zu viel Speichel","Saurer Magensaft gelangt in die Speiseröhre","Der Dünndarm ist entzündet","Man hat zu viel Wasser getrunken"], a: 1 },
  { q: "Welches Frühstück eignet sich am besten vor einer Prüfung?", o: ["Nur eine Tasse Tee","Müsli mit Obst und Milch","Rührei mit viel Speck","Gar nichts"], a: 1 },
  { q: "Warum zerfällt ein Gummibärchen in Kiwimus?", o: ["Wegen des Zuckers","Ein Kiwi-Enzym spaltet das Protein Gelatine – wie Pepsin","Wegen der Kälte","Wegen der grünen Farbe"], a: 1 },
  { q: "Wie lang ist der Dünndarm mindestens?", o: ["30 Zentimeter","1 Meter","3 Meter","30 Meter"], a: 2 },
  { q: "Was vergrößert die innere Oberfläche des Dünndarms?", o: ["Darmfalten und Darmzotten","Zähne","Bakterien","Schleim"], a: 0 },
  { q: "Was bedeutet „Resorption“?", o: ["Ausscheidung von Kot","Aufnahme von Stoffen durch die Darmwand","Spaltung von Fett","Bildung von Speichel"], a: 1 },
  { q: "Welches Tuch ist ein gutes Modell für die Dünndarmwand?", o: ["Geschirrtuch","Frotteetuch","Plastiktüte","Alufolie"], a: 1 },
  { q: "Wie heißen die drei Abschnitte des Dünndarms?", o: ["Blinddarm, Grimmdarm, Mastdarm","Zwölffingerdarm, Leerdarm, Krummdarm","Magenmund, Magenpförtner, Magenwand","Leber, Galle, Bauchspeicheldrüse"], a: 1 },
  { q: "In welche kleinsten Bausteine werden Proteine zerlegt?", o: ["Fettsäuren","Einfachzucker","Aminosäuren","Ballaststoffe"], a: 2 },
  { q: "Wie viel Flüssigkeit nimmt der Darm täglich bis zu auf?", o: ["0,5 Liter","2 Liter","8 Liter","20 Liter"], a: 2 },
  { q: "Welches Organ produziert den Gallensaft?", o: ["Gallenblase","Leber","Magen","Bauchspeicheldrüse"], a: 1 },
  { q: "Was bewirkt Gallensaft?", o: ["Er spaltet Stärke","Er emulgiert Fett in feine Tröpfchen","Er tötet Bakterien","Er senkt den Blutzucker"], a: 1 },
  { q: "Was ersetzt im Experiment A11 den Gallensaft?", o: ["Essig","Spülmittel","Salz","Zucker"], a: 1 },
  { q: "Welches Hormon bildet die Bauchspeicheldrüse?", o: ["Adrenalin","Insulin","Pepsin","Amylase"], a: 1 },
  { q: "Warum verdaut sich die Bauchspeicheldrüse nicht selbst?", o: ["Sie bildet ihre Enzyme als inaktive Vorstufen","Sie hat Zähne","Sie bildet gar keine Enzyme","Sie ist mit Fett überzogen"], a: 0 },
  { q: "Woher stammt die braune Farbe des Kots?", o: ["Von der Schokolade","Vom Bilirubin aus dem Gallensaft","Vom Magensaft","Von den Ballaststoffen"], a: 1 },
  { q: "Was macht der Bauchspeichel mit dem sauren Speisebrei?", o: ["Er macht ihn noch saurer","Er neutralisiert ihn","Er macht ihn fester","Nichts"], a: 1 },
  { q: "Was ist die Hauptaufgabe des Dickdarms?", o: ["Proteine spalten","Wasser aus dem Speisebrei zurückgewinnen","Insulin bilden","Stärke spalten"], a: 1 },
  { q: "Wie nennt man die Bakterien im Dickdarm?", o: ["Darmzotten","Darmflora (Mikrobiota)","Enzyme","Lymphe"], a: 1 },
  { q: "Was ist Antiperistaltik?", o: ["Bewegung gegen die Hauptrichtung – hin und her","Erbrechen","Schlucken","Darmlähmung"], a: 0 },
  { q: "Was passiert bei Durchfall?", o: ["Der Brei wandert zu langsam, zu viel Wasser wird entzogen","Der Brei wandert zu schnell, zu wenig Wasser wird entzogen","Der Magen ist leer","Die Leber arbeitet nicht"], a: 1 },
  { q: "Wo kommen Ballaststoffe vor?", o: ["Nur in tierischen Lebensmitteln","Nur in pflanzlichen Lebensmitteln","Vor allem in Getränken","In Süßigkeiten"], a: 1 },
  { q: "Was wird bei einer „Blinddarm-OP“ meist entfernt?", o: ["Der ganze Dickdarm","Der Wurmfortsatz","Der Mastdarm","Der Magen"], a: 1 },
  { q: "Was hilft gegen Verstopfung?", o: ["Weißbrot und Pudding","Viel trinken, Ballaststoffe, Bewegung","Wenig trinken","Viel sitzen"], a: 1 },
  { q: "Nach wie vielen Minuten stellt sich das erste Sättigungsgefühl ein?", o: ["nach 1–2 Minuten","nach 15–20 Minuten","nach 2 Stunden","sofort"], a: 1 },
  { q: "Was ist Appetit?", o: ["Ein leerer Magen","Lust auf etwas Bestimmtes, ausgelöst z. B. durch Duft oder Werbung","Durst","Ein Enzym"], a: 1 },
  { q: "Was misst der Körper, um Sättigung festzustellen?", o: ["Die Dehnung der Magenwand","Die Länge des Darms","Die Zahl der Zähne","Die Körpertemperatur"], a: 0 },
  { q: "Welches Organ empfängt die Sättigungssignale?", o: ["das Herz","das Gehirn","die Lunge","die Niere"], a: 1 },
  { q: "Was sättigt besonders lange?", o: ["Limonade","Gummibärchen","Vollkornbrot mit Käse","Apfelsaft"], a: 2 },
  { q: "Warum isst man vor dem Handy oft mehr als nötig?", o: ["Das Handy macht hungrig","Man überhört die Sättigungssignale","Das Essen schmeckt besser","Man kaut zu gründlich"], a: 1 },
  { q: "Dieselbe Portion auf einem großen Teller wirkt …", o: ["größer","kleiner","genau gleich","bunter"], a: 1 },
  { q: "Welche Faktoren beeinflussen unser Essen? Wähle die vollständigste Antwort.", o: ["Nur Hunger","Innere Signale, äußere Reize und bewusste Entscheidungen","Nur Werbung","Nur die Uhrzeit"], a: 1 },
];
