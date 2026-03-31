let user;

// 🔥 поточний тренер
firebase.auth().onAuthStateChanged(u => {
  if (!u) return (window.location = "login.html");

  user = u;

  loadClients();
  loadSchedule();
  loadHistory();
});


// 👥 1. КЛІЄНТИ (авто з Firestore)
function loadClients() {
  firebase.firestore()
    .collection("users")
    .where("role", "==", "client")
    .onSnapshot(snap => {

      let html = "";

      snap.forEach(doc => {
        const d = doc.data();

        html += `
          <div class="card">
            <p>👤 ${d.name || "Без імені"}</p>
            <p>ID: ${doc.id}</p>
            <button onclick="setClient('${doc.id}')">Вибрати</button>
          </div>
        `;
      });

      document.getElementById("clients").innerHTML = html;
    });
}


// 📌 вибір клієнта
function setClient(id) {
  document.getElementById("clientId").value = id;
}


// ➕ 2. ДОДАТИ ТРЕНУВАННЯ
function addTraining() {
  firebase.firestore().collection("trainings").add({
    uid: document.getElementById("clientId").value,
    date: document.getElementById("date").value,
    muscle: document.getElementById("muscle").value,
    trainerId: user.uid,
    createdAt: Date.now()
  });
}


// 📅 3. РОЗКЛАД
function loadSchedule() {
  firebase.firestore()
    .collection("trainings")
    .orderBy("date")
    .onSnapshot(snap => {

      let html = "";

      snap.forEach(doc => {
        const d = doc.data();

        html += `
          <div class="card">
            <p>📅 ${d.date}</p>
            <p>💪 ${d.muscle}</p>
            <p>👤 ${d.uid}</p>
          </div>
        `;
      });

      document.getElementById("schedule").innerHTML = html;
    });
}


// 📜 4. ІСТОРІЯ (тільки цього тренера)
function loadHistory() {
  firebase.firestore()
    .collection("trainings")
    .where("trainerId", "==", user.uid)
    .onSnapshot(snap => {

      let html = "";

      snap.forEach(doc => {
        const d = doc.data();

        html += `
          <div class="card">
            <p>📅 ${d.date}</p>
            <p>💪 ${d.muscle}</p>
          </div>
        `;
      });

      document.getElementById("history").innerHTML = html;
    });
}
