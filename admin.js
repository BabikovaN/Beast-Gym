const db = firebase.firestore();

/* =====================
   NAV
===================== */
function show(type){
  if(type==="users") loadUsers();
  if(type==="trainers") loadTrainers();
  if(type==="trainings") loadTrainings();
}

/* =====================
   USERS
===================== */
function loadUsers(){
  db.collection("users").onSnapshot(snap=>{
    let html = "<h2>👤 USERS</h2>";

    snap.forEach(doc=>{
      let u = doc.data();

      html += `
        <div class="card">
          <b>${u.name || "No name"}</b><br>
          Role: ${u.role || "user"}<br>

          <button onclick="deleteUser('${doc.id}')">🗑 Delete</button>
        </div>
      `;
    });

    document.getElementById("panel").innerHTML = html;
  });
}

/* =====================
   TRAINERS + CREATE
===================== */
function loadTrainers(){
  db.collection("users")
  .where("role","==","trainer")
  .onSnapshot(snap=>{
    let html = "<h2>💪 TRAINERS</h2>";

    snap.forEach(doc=>{
      let t = doc.data();

      html += `
        <div class="card">
          <b>${t.name}</b><br>
          ${t.speciality || ""}<br>

          <button onclick="deleteUser('${doc.id}')">🗑 Delete</button>
        </div>
      `;
    });

    html += `
      <div class="card">
        <h3>➕ Create Trainer</h3>
        <input id="t_name" placeholder="Name">
        <input id="t_spec" placeholder="Speciality">
        <button onclick="createTrainer()">Create</button>
      </div>
    `;

    document.getElementById("panel").innerHTML = html;
  });
}

function createTrainer(){
  db.collection("users").add({
    name: document.getElementById("t_name").value,
    speciality: document.getElementById("t_spec").value,
    role: "trainer",
    rating: 5
  });

  alert("✅ Trainer created");
}

/* =====================
   TRAININGS (CRM CORE)
===================== */
function loadTrainings(){
  db.collection("trainings").onSnapshot(snap=>{
    let html = "<h2>📅 TRAININGS</h2>";

    let p=0,a=0,r=0;

    snap.forEach(doc=>{
      let t = doc.data();

      if(t.status==="pending") p++;
      if(t.status==="approved") a++;
      if(t.status==="rejected") r++;

      html += `
        <div class="card">
          👤 ${t.uid}<br>
          💪 ${t.trainerId}<br>
          📅 ${t.date}<br>
          Status: ${t.status || "pending"}<br>

          <button onclick="approve('${doc.id}')">✅ Approve</button>
          <button onclick="reject('${doc.id}')">❌ Reject</button>
        </div>
      `;
    });

    html =
    `<div class="card">
      <h3>📊 STATS</h3>
      Pending: ${p}<br>
      Approved: ${a}<br>
      Rejected: ${r}
    </div>` + html;

    document.getElementById("panel").innerHTML = html;
  });
}

/* =====================
   ACTIONS
===================== */
function approve(id){
  db.collection("trainings").doc(id).update({
    status:"approved"
  });
}

function reject(id){
  db.collection("trainings").doc(id).update({
    status:"rejected"
  });
}

function deleteUser(id){
  db.collection("users").doc(id).delete();
}
