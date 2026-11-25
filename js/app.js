/* NaWi – unsere Klassen-App
 * App-Logik. Reines HTML/CSS/JS, keine Abhängigkeiten.
 * Fortschritt (Lern-Serie, Quiz-Bestwert) wird nur lokal im Browser gespeichert.
 */
// --- Speicher (sicher, falls localStorage nicht geht) ---
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const key = d => d.toISOString().slice(0,10).replace(/T.*/,"") ;
const localKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

// --- Navigation ---
function go(p){
  document.querySelectorAll(".page").forEach(s => s.classList.toggle("active", s.id === "p-"+p));
  document.querySelectorAll("nav button").forEach(b => b.classList.toggle("active", b.dataset.p === p));
  window.scrollTo({top:0, behavior:"smooth"});
}

// --- Begrüßung ---
(function(){
  const h = new Date().getHours();
  const g = h < 11 ? "Guten Morgen ☀️" : h < 17 ? "Hallo zusammen 👋" : "Guten Abend 🌙";
  document.getElementById("greeting").textContent = g + " Auf geht’s mit NaWi!";
  document.getElementById("klasse").textContent = KLASSE;
  document.getElementById("lehrer").textContent = LEHRER;
  document.getElementById("pinnwand").textContent = PINNWAND;
  const l = document.getElementById("lernapp");
  if (typeof LERNAPP !== "undefined" && LERNAPP.url) { l.href = LERNAPP.url; l.querySelector("b").textContent = LERNAPP.name; } else l.style.display = "none";
})();

// --- Fakt der Woche ---
function weekNumber(d){
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = new Date(Date.UTC(t.getUTCFullYear(),0,1));
  return Math.ceil(((t - y) / 86400000 + 1) / 7);
}
const kw = weekNumber(new Date());
document.getElementById("kw").textContent = "KW " + kw;
document.getElementById("fact").textContent = FAKTEN[kw % FAKTEN.length];
function randomFact(){
  const el = document.getElementById("fact");
  let f; do { f = FAKTEN[Math.floor(Math.random()*FAKTEN.length)]; } while (f === el.textContent && FAKTEN.length > 1);
  el.textContent = f;
}

// --- Lern-Check & Serie ---
function learnedDays(){ return store.get("nawi_learned", []); }
function markLearned(){
  const days = learnedDays(); const k = localKey(today());
  if (!days.includes(k)) { days.push(k); store.set("nawi_learned", days); confetti(); }
  renderLearn();
}
// Wochen-Logik: eine Woche gilt als „gelernt“, wenn in ihr mindestens einmal gelernt wurde
function mondayOf(d){ const m = new Date(d); m.setHours(0,0,0,0); m.setDate(m.getDate() - (m.getDay()+6)%7); return m; }
function learnedWeeks(){ return new Set(learnedDays().map(k => localKey(mondayOf(new Date(k+"T00:00:00"))))); }
function streak(){
  const weeks = learnedWeeks(); let n = 0; const d = mondayOf(today());
  if (!weeks.has(localKey(d))) d.setDate(d.getDate()-7); // diese Woche zählt noch nicht als verpasst
  while (weeks.has(localKey(d))) { n++; d.setDate(d.getDate()-7); }
  return n;
}
// Persönliche Serie (Lern-Timer) – wird im Reiter „Lernen“ angezeigt
function renderLearn(){ document.getElementById("streak").textContent = streak(); }

// Wochen-Lern-Check: Lehrkraft trägt ein, wie viele mit der Lernapp gelernt haben (= 1. Frage der Umfrage)
function weekKeyOf(m){ const t = new Date(m); t.setDate(t.getDate()+3); return t.getFullYear() + "-KW" + String(weekNumber(m)).padStart(2,"0"); }
function renderLernCheck(){
  const data = store.get("nawi_hands", {}); const thisMon = mondayOf(today());
  const cur = data[weekKeyOf(thisMon)];
  const keys = Object.keys(data).sort(); const last = keys[keys.length-1];
  document.getElementById("lcKw").textContent = "KW " + kw;
  document.getElementById("lcAnw").value = cur ? cur.anw : (last ? data[last].anw : "");
  document.getElementById("lcGel").value = cur && cur.werte[0] != null ? cur.werte[0] : "";
  document.getElementById("lcSave").textContent = cur ? "💾 KW " + kw + " aktualisieren" : "💾 Für KW " + kw + " speichern";
  document.getElementById("remCard").classList.toggle("done", !!cur);
  // Diagramm der letzten 6 Wochen (Anteil in %)
  const cols = []; for (let i = 5; i >= 0; i--) { const m = new Date(thisMon); m.setDate(m.getDate()-7*i); const e = data[weekKeyOf(m)];
    const g = e ? Number(e.werte[0]) || 0 : null, n = e ? Number(e.anw) || 0 : 0;
    cols.push({ lbl: i === 0 ? "Diese" : "KW " + weekNumber(m), g, n, pc: e && n ? Math.round(g/n*100) : (e ? 0 : null), now: i === 0 }); }
  document.getElementById("lcChart").innerHTML = cols.map(c => `<div class="lccol ${c.g != null ? "has" : ""} ${c.now && c.g != null ? "now" : ""}">
      <div class="val">${c.g != null ? c.g + (c.n ? "/" + c.n : "") : ""}</div>
      <div class="bar" style="height:${c.pc != null ? Math.max(4, Math.min(c.pc,100)) : 4}%"></div>
      <div class="lbl">${c.lbl}</div></div>`).join("");
  // Trend: aktuelle Woche mit der letzten gespeicherten Woche davor vergleichen
  const tr = document.getElementById("lcTrend");
  const prevKey = keys.filter(k => k < weekKeyOf(thisMon)).pop();
  if (cur && prevKey) {
    const a = Number(cur.werte[0]) || 0, b = Number(data[prevKey].werte[0]) || 0, d = a - b;
    tr.textContent = d > 0 ? `📈 ${d} mehr als ${prevKey.split("-")[1].replace("KW","KW ")} – super, weiter so!`
      : d < 0 ? `📉 ${-d} weniger als ${prevKey.split("-")[1].replace("KW","KW ")} – nächste Woche packen wir das!`
      : `➡️ Genauso viele wie ${prevKey.split("-")[1].replace("KW","KW ")}.`;
  } else tr.textContent = cur ? "" : "Noch nicht eingetragen – kurz per Handzeichen abfragen ✋";
}
document.getElementById("remCard").addEventListener("click", e => {
  const b = e.target.closest("[data-lc]"); if (!b) return;
  const inp = document.getElementById(b.dataset.lc); inp.value = Math.max(0, (Number(inp.value) || 0) + Number(b.dataset.d));
});
document.getElementById("lcSave").addEventListener("click", () => {
  const num = id => { const v = document.getElementById(id).value; return v === "" ? 0 : Math.max(0, Math.round(Number(v))); };
  const data = store.get("nawi_hands", {}); const k = weekKeyOf(mondayOf(today()));
  const e = data[k] || { werte: UMFRAGE.fragen.map(() => null), fragen: UMFRAGE.fragen.slice() };
  e.anw = num("lcAnw"); e.werte[0] = num("lcGel"); e.datum = today().toLocaleDateString("de-DE");
  data[k] = e; store.set("nawi_hands", data);
  renderLernCheck(); renderUmfrage();
  const msg = document.getElementById("lcSaved");
  msg.textContent = "✅ Gespeichert für KW " + kw + (e.anw && e.werte[0] > e.anw ? " – Achtung: mehr als anwesend." : "");
  msg.hidden = false; setTimeout(() => msg.hidden = true, 4000);
});

// --- Termine ---
function allTermine(){
  return [...FESTE_TERMINE]
    .map(t => ({...t, d: new Date(t.date+"T00:00:00")}))
    .filter(t => t.d >= today())
    .sort((a,b) => a.d - b.d);
}
function terminHTML(t){
  const diff = Math.round((t.d - today()) / 86400000);
  const label = diff === 0 ? "Heute!" : diff === 1 ? "Morgen" : "in " + diff + " Tagen";
  const mon = t.d.toLocaleDateString("de-DE",{month:"short"});
  return `<div class="termin">
    <div class="datebox"><b>${t.d.getDate()}</b><small>${mon}</small></div>
    <div class="t"><div>${t.icon||""} ${escapeHTML(t.name)}</div><span class="muted">${t.d.toLocaleDateString("de-DE",{weekday:"long"})}</span></div>
    <span class="count ${diff<=3?"soon":""}">${label}</span>
    ${t.own ? `<button class="del" title="Löschen" onclick="delTermin('${t.date}','${encodeURIComponent(t.name)}')">✕</button>` : ""}
  </div>`;
}
function renderTermine(){
  const list = allTermine();
  const empty = `<p class="muted">Gerade stehen keine Termine an 😎</p>`;
  document.getElementById("nextTermine").innerHTML = list.slice(0,3).map(terminHTML).join("") || empty;
  document.getElementById("allTermine").innerHTML = list.map(terminHTML).join("") || empty;
}
function addTermin(){
  const name = document.getElementById("tName").value.trim();
  const date = document.getElementById("tDate").value;
  if (!name || !date) { alertBox("Bitte Name und Datum eingeben."); return; }
  const t = store.get("nawi_termine", []); t.push({name, date}); store.set("nawi_termine", t);
  document.getElementById("tName").value = ""; document.getElementById("tDate").value = "";
  renderTermine();
}
function delTermin(date, name){
  name = decodeURIComponent(name);
  store.set("nawi_termine", store.get("nawi_termine", []).filter(t => !(t.date===date && t.name===name)));
  renderTermine();
}
function escapeHTML(s){ return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function alertBox(msg){ const n = document.getElementById("tName"); n.placeholder = msg; n.focus(); }

// --- Lern-Timer ---
let total = 15*60, left = total, iv = null;
function showTime(){ document.getElementById("timer").textContent =
  String(Math.floor(left/60)).padStart(2,"0") + ":" + String(left%60).padStart(2,"0"); }
function setTimer(m){ resetTimer(); total = left = m*60; showTime(); }
function toggleTimer(){
  const b = document.getElementById("tBtn");
  if (iv) { clearInterval(iv); iv = null; b.textContent = "▶️ Weiter"; return; }
  b.textContent = "⏸️ Pause";
  iv = setInterval(() => {
    left--; showTime();
    if (left <= 0) { clearInterval(iv); iv = null; b.textContent = "▶️ Start"; left = total; showTime();
      logEvent("timer", Math.round(total/60)); markLearned(); document.getElementById("timer").textContent = "Fertig! 🎉"; }
  }, 1000);
}
function resetTimer(){ clearInterval(iv); iv = null; left = total; showTime(); document.getElementById("tBtn").textContent = "▶️ Start"; }

// --- Quiz ---
let qi = 0, score = 0, order = [];
function startQuiz(){ order = [...QUIZ].sort(() => Math.random()-0.5).slice(0,10); qi = 0; score = 0; renderQuiz(); }
function renderQuiz(){
  const c = document.getElementById("quizCard");
  if (qi >= order.length) {
    const best = Math.max(store.get("nawi_best",0), score); store.set("nawi_best", best);
    logEvent("quiz", 1);
    const msg = score === order.length ? "Perfekt! Ein echter NaWi-Profi 🏆" : score >= order.length/2 ? "Gut gemacht – weiter so! 👍" : "Dranbleiben, das kriegen wir hin! 💪";
    if (score === order.length) confetti();
    c.innerHTML = `<h2>🧠 Ergebnis</h2><p class="streak" style="text-align:center">${score} / ${order.length}</p>
      <p style="text-align:center">${msg}</p><p class="muted" style="text-align:center;margin-top:6px">Bestwert: ${best}</p>
      <div class="row" style="justify-content:center"><button class="btn" onclick="startQuiz()">Nochmal</button></div>`;
    return;
  }
  const q = order[qi];
  c.innerHTML = `<div class="progress"><div style="width:${qi/order.length*100}%"></div></div>
    <h2>🧠 Frage ${qi+1} von ${order.length}</h2><p class="fact">${q.q}</p>
    ${q.o.map((o,i) => `<button class="opt" onclick="answer(this,${i})">${o}</button>`).join("")}`;
}
function answer(btn, i){
  const q = order[qi]; const opts = document.querySelectorAll(".opt");
  opts.forEach(o => o.disabled = true);
  opts[q.a].classList.add("right");
  if (i === q.a) score++; else btn.classList.add("wrong");
  setTimeout(() => { qi++; renderQuiz(); }, 900);
}

// --- Konfetti ---
function confetti(){
  const e = ["🧪","⚗️","🔬","🧬","⚡","🌱","⭐"];
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("div"); s.className = "confetti";
    s.textContent = e[i % e.length]; s.style.left = Math.random()*100 + "vw";
    s.style.animationDelay = Math.random()*0.5 + "s";
    document.body.appendChild(s); setTimeout(() => s.remove(), 2200);
  }
}

// --- Wochen-Statistik & Umfrage ---
function weekStart(){ const d = today(); const wd = (d.getDay()+6)%7; d.setDate(d.getDate()-wd); return d; }
function logEvent(type, n){
  const log = store.get("nawi_log", []); log.push({ t:type, n, d: localKey(today()) });
  store.set("nawi_log", log.slice(-500));
}
// Handzeichen-Umfrage: Lehrkraft tippt pro Frage die Anzahl ein, gespeichert pro KW
const uKey = () => weekKeyOf(mondayOf(today()));
function uData(){ return store.get("nawi_hands", {}); }
function renderUmfrage(){
  if (typeof UMFRAGE === "undefined") return;
  const data = uData(), cur = data[uKey()];
  document.getElementById("uKw").textContent = "KW " + kw;
  const last = Object.keys(data).sort().pop();
  document.getElementById("uAnw").value = cur ? cur.anw : (last ? data[last].anw : "");
  document.getElementById("uFragen").innerHTML = UMFRAGE.fragen.map((f,i) => `
    <div class="urow"><label for="uQ${i}">${escapeHTML(f)}</label>
      <div class="stepper"><button class="btn sec" data-step="${i}" data-d="-1">−</button><input id="uQ${i}" type="number" inputmode="numeric" min="0" max="99" value="${cur && cur.werte[i] != null ? cur.werte[i] : ""}" placeholder="0"><button class="btn sec" data-step="${i}" data-d="1">+</button></div></div>`).join("");
  document.getElementById("uSave").textContent = cur ? "💾 KW " + kw + " aktualisieren" : "💾 Für KW " + kw + " speichern";
  renderVerlauf();
}
function renderVerlauf(){
  const data = uData(); const keys = Object.keys(data).sort().reverse();
  document.getElementById("uCopyRow").hidden = !keys.length;
  document.getElementById("uVerlauf").innerHTML = keys.length ? keys.map(k => {
    const e = data[k]; const n = Number(e.anw) || 0;
    return `<div class="ukw"><div class="ukw-head">${escapeHTML(k.split("-")[1].replace("KW","KW "))} <span class="muted">· ${escapeHTML(e.datum)} · ${n} anwesend</span>
      <button class="del" style="margin-left:auto" title="Löschen" onclick="delUmfrage('${k}')">✕</button></div>
      ${UMFRAGE.fragen.map((f,i) => { const v = Number(e.werte[i]) || 0; if (e.werte[i] == null) return ""; const pc = n ? Math.round(v/n*100) : 0;
        return `<div class="ubar"><span>${escapeHTML(f)}</span><b>${v}${n ? " von " + n + " · " + pc + " %" : ""}</b><div class="track"><div style="width:${Math.min(pc,100)}%"></div></div></div>`; }).join("")}
    </div>`; }).join("") : `<p class="muted">Noch keine Ergebnisse gespeichert.</p>`;
}
function delUmfrage(k){ const d = uData(); delete d[k]; store.set("nawi_hands", d); renderUmfrage(); renderLernCheck(); }
document.getElementById("p-umfrage").addEventListener("click", e => {
  const b = e.target.closest("[data-step]"); if (!b) return;
  const inp = document.getElementById(b.dataset.step === "anw" ? "uAnw" : "uQ" + b.dataset.step);
  inp.value = Math.max(0, (Number(inp.value) || 0) + Number(b.dataset.d));
});
document.getElementById("uSave").addEventListener("click", () => {
  const num = id => { const v = document.getElementById(id).value; return v === "" ? 0 : Math.max(0, Math.round(Number(v))); };
  const anw = num("uAnw");
  const werte = UMFRAGE.fragen.map((_,i) => num("uQ" + i));
  const d = uData();
  d[uKey()] = { anw, werte, fragen: UMFRAGE.fragen.slice(), datum: today().toLocaleDateString("de-DE") };
  store.set("nawi_hands", d);
  renderUmfrage(); renderLernCheck();
  const msg = document.getElementById("uSaved");
  msg.textContent = "✅ Gespeichert für KW " + kw + (werte.some(v => anw && v > anw) ? " – Achtung: eine Zahl ist größer als die Anwesenden." : "");
  msg.hidden = false; setTimeout(() => msg.hidden = true, 4000);
});
document.getElementById("uCopy").addEventListener("click", () => {
  const data = uData();
  const txt = Object.keys(data).sort().map(k => { const e = data[k];
    return k + " (" + e.datum + ", " + e.anw + " anwesend)\n" + (e.fragen || UMFRAGE.fragen).map((f,i) => "- " + f + " " + e.werte[i]).join("\n"); }).join("\n\n");
  const b = document.getElementById("uCopy");
  try { navigator.clipboard.writeText(txt).then(() => b.textContent = "✅ Kopiert!", () => b.textContent = "Kopieren nicht möglich"); }
  catch(e){ b.textContent = "Kopieren nicht möglich"; }
  setTimeout(() => b.textContent = "📋 Ergebnisse kopieren", 2500);
});
(function(){ const o = store.get("nawi_opened", []); const k = localKey(today()); if (!o.includes(k)) { o.push(k); store.set("nawi_opened", o.slice(-120)); } })();

// --- Passwort-Sperre ---
(function(){
  if (typeof PASSWORT === "undefined" || !PASSWORT) return;
  const ok = () => store.get("nawi_pw", "") === PASSWORT.toLowerCase();
  if (ok()) return;
  const lock = document.getElementById("lock"); lock.hidden = false;
  document.getElementById("lockForm").addEventListener("submit", e => {
    e.preventDefault();
    const v = document.getElementById("lockPw").value.trim().toLowerCase();
    if (v === PASSWORT.toLowerCase()) { store.set("nawi_pw", v); lock.hidden = true; }
    else { document.getElementById("lockErr").hidden = false; document.getElementById("lockPw").select(); }
  });
})();

// --- Start ---
renderLearn(); renderLernCheck(); renderTermine(); renderUmfrage(); startQuiz(); showTime();
