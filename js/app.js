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
function streak(){
  const days = new Set(learnedDays()); let n = 0; const d = today();
  if (!days.has(localKey(d))) d.setDate(d.getDate()-1); // heute zählt noch nicht als verpasst
  while (days.has(localKey(d))) { n++; d.setDate(d.getDate()-1); }
  return n;
}
function renderLearn(){
  const days = new Set(learnedDays()); const done = days.has(localKey(today()));
  const card = document.getElementById("remCard");
  card.classList.toggle("done", done);
  document.getElementById("remText").innerHTML = done
    ? "Stark, heute schon gelernt! 🎉 Deine Serie: <b>" + streak() + " Tag(e)</b>"
    : "Habt ihr heute schon NaWi gelernt? 🤔 Ein paar Minuten reichen!";
  document.getElementById("remBtns").style.display = done ? "none" : "flex";
  document.getElementById("streak").textContent = streak();
  const names = ["So","Mo","Di","Mi","Do","Fr","Sa"]; let html = "";
  for (let i = 6; i >= 0; i--) {
    const d = today(); d.setDate(d.getDate()-i); const on = days.has(localKey(d));
    html += `<div class="day"><div class="dot ${on?"on":""}">${on?"✓":""}</div>${i===0?"Heute":names[d.getDay()]}</div>`;
  }
  document.getElementById("week").innerHTML = html;
}

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
      markLearned(); document.getElementById("timer").textContent = "Fertig! 🎉"; }
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

// --- Start ---
renderLearn(); renderTermine(); startQuiz(); showTime();
