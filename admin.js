const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ================= MENU ================= */
function addMenu(){
  let text = document.getElementById("linkText").value;
  let url = document.getElementById("linkUrl").value;

  if(!text || !url){
    alert("Заповни всі поля!");
    return;
  }

  db.collection("menu").add({ text, url });

  alert("Меню додано!");
}

/* ================= TRAINERS ================= */
function addTrainer(){
  let name = document.getElementById("trainerName").value;
  let desc = document.getElementById("trainerDesc").value;

  if(!name || !desc){
    alert("Заповни всі поля!");
    return;
  }

  db.collection("trainers").add({ name, desc });

  alert("Тренера додано!");
}

/* ================= PHOTOS ================= */
function addPhoto(){
  let url = document.getElementById("photoUrl").value;

  if(!url){
    alert("Встав URL фото!");
    return;
  }

  db.collection("photos").add({ url });

  alert("Фото додано!");
}
