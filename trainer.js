firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  projectId: "YOUR_PROJECT_ID"
});

const db = firebase.firestore();

let user = null;

auth.onAuthStateChanged(u => {
  if (!u) {
    window.location = "login.html";
    return;
  }

  user = u;

  loadProfile();
  loadMyTrainings();
  loadPosts();
});

  loadProfile();
  loadMyTrainings();
  loadPosts();
});


/* ================= PROFILE ================= */
function saveProfile() {
  db.collection("users").doc(user.uid).set({
    name: document.getElementById("name").value,
    photo: document.getElementById("photo").value,
    speciality: document.getElementById("speciality").value,
    role: "trainer"
  }, { merge: true });
}

function loadProfile() {
  db.collection("users").doc(user.uid)
  .get().then(doc => {
    if (!doc.exists) return;

    const d = doc.data();

    document.getElementById("name").value = d.name || "";
    document.getElementById("photo").value = d.photo || "";
    document.getElementById("speciality").value = d.speciality || "";
  });
}


/* ================= TRAININGS ================= */
function loadMyTrainings() {
  db.collection("trainings")
  .where("trainerId", "==", user.uid)
  .onSnapshot(snap => {

    let html = "";

    snap.forEach(doc => {
      const d = doc.data();

      html += `
        <div class="card">
          📅 ${d.date}<br>
          👤 ${d.uid}<br>
          💪 ${d.muscle || ""}
        </div>
      `;
    });

    document.getElementById("myTrainings").innerHTML = html;
  });
}


/* ================= POSTS (INSTAGRAM) ================= */
function loadPosts() {
  db.collection("posts")
  .where("userId", "==", user.uid)
  .onSnapshot(snap => {

    let html = "";

    snap.forEach(d => {
      let p = d.data();

      html += `
        <div class="card">
          <img src="${p.image}" style="width:100%; border-radius:10px">

          <div>❤️ ${p.likes || 0}</div>
        </div>
      `;
    });

    document.getElementById("myPosts").innerHTML = html;
  });
}


/* ================= LIKE ================= */
function likePost(id) {
  db.collection("posts").doc(id).update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}
