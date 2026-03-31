let user;

firebase.auth().onAuthStateChanged(u => {
  if (!u) return window.location = "login.html";

  user = u;

  loadMyTrainings();
  loadProfile();
});


// 💾 зберегти профіль
function saveProfile() {
  firebase.firestore().collection("users").doc(user.uid).set({
    name: document.getElementById("name").value,
    photo: document.getElementById("photo").value,
    speciality: document.getElementById("speciality").value,
    role: "trainer"
  }, { merge: true });
}


// 📥 завантажити профіль
function loadProfile() {
  firebase.firestore().collection("users").doc(user.uid)
    .get().then(doc => {
      if (!doc.exists) return;

      const d = doc.data();

      document.getElementById("name").value = d.name || "";
      document.getElementById("photo").value = d.photo || "";
      document.getElementById("speciality").value = d.speciality || "";
    });
}


// 📅 мої тренування
function loadMyTrainings() {
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
            <p>👤 ${d.uid}</p>
            <p>💪 ${d.muscle}</p>
          </div>
        `;
      });

      document.getElementById("myTrainings").innerHTML = html;
    });
}
