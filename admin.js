const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ================= MENU ================= */
function addMenu(){
  let text = document.getElementById("linkText").value;
  let url = document.getElementById("linkUrl").value;

  db.collection("menu").add({
    text:text,
    url:url
  });

  alert("Меню додано!");
}

/* ================= TRAINERS ================= */
function addTrainer(){
  let name = document.getElementById("trainerName").value;
  let desc = document.getElementById("trainerDesc").value;

  db.collection("trainers").add({
    name:name,
    desc:desc
  });

  alert("Тренера додано!");
}

/* ================= PHOTOS ================= */
function addPhoto(){
  let url = document.getElementById("photoUrl").value;

  db.collection("photos").add({
    url:url
  });

  alert("Фото додано!");
}
