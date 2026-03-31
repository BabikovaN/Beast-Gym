// 🔥 Firebase INIT
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  projectId: "YOUR_PROJECT_ID"
});

const db = firebase.firestore();

/* ================= ТРЕНЕРИ ================= */
function loadTrainers(){
  db.collection("users")
  .where("role","==","trainer")
  .onSnapshot(snap=>{

    let html="";

    snap.forEach(doc=>{
      const u = doc.data();

      html += `
        <div class="card">
          👨‍🏫 <b>${u.name}</b><br>
          💪 ${u.speciality || ""}
        </div>
      `;
    });

    const el = document.getElementById("trainers");
    if(el) el.innerHTML = html;

  });
}

/* ================= MENU ================= */
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

/* ================= START ================= */
loadTrainers();
