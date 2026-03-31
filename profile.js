<!--логін користуача-->
let user;

auth.onAuthStateChanged(u=>{
  if(!u) window.location="login.html";
  user = u;
  load();
});

function save(){
  db.collection("users").doc(user.uid).set({
    name: name.value
  }, {merge:true});
}

function add(){
  db.collection("trainings").add({
    uid: user.uid,
    date: date.value
  });
}

function load(){
  db.collection("trainings")
  .where("uid","==",user.uid)
  .onSnapshot(snap=>{
    let html="";
    snap.forEach(d=>{
      html += `<p>${d.data().date}</p>`;
    });
    list.innerHTML = html;
  });
}

function setTrainer(){
  db.collection("users").doc(user.uid).update({
    trainer: trainer.value
  });
}
