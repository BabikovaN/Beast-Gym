<!--логін користуача-->
let user;
let unsubscribeTrainings = null;

auth.onAuthStateChanged((u) => {
  if (!u) {
    window.location = "login.html";
    return;
  }

  user = u;
  load();
});


// 💾 ЗБЕРЕГТИ ІМ'Я
function save() {
  const nameInput = document.getElementById("name");

  db.collection("users").doc(user.uid).set({
    name: nameInput.value
  }, { merge: true });
}


// ➕ ДОДАТИ ТРЕНУВАННЯ
function add() {
  const dateInput = document.getElementById("date");

  db.collection("trainings").add({
    uid: user.uid,
    date: dateInput.value,
    createdAt: Date.now()
  });
}


// 📥 ЗАВАНТАЖЕННЯ ТРЕНУВАНЬ
function load() {
  const list = document.getElementById("list");

  if (unsubscribeTrainings) {
    unsubscribeTrainings();
  }

  unsubscribeTrainings = db.collection("trainings")
    .where("uid", "==", user.uid)
    .onSnapshot((snap) => {
      let html = "";

      snap.forEach((d) => {
        html += `<p>📅 ${d.data().date}</p>`;
      });

      list.innerHTML = html;
    });
}


// 🧑‍🏫 ВИБІР ТРЕНЕРА
function setTrainer() {
  const trainerInput = document.getElementById("trainer");

  db.collection("users").doc(user.uid).set({
    trainer: trainerInput.value
  }, { merge: true });
}
