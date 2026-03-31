firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  projectId: "YOUR_PROJECT_ID"
});

const db = firebase.firestore();

/* ================= USERS ================= */
function loadTrainers(){
  db.collection("users")
  .where("role","==","trainer")
  .onSnapshot(snap=>{
    let html="";
    snap.forEach(d=>{
      let u=d.data();

      html+=`
        <div class="card">
          👨‍🏫 ${u.name}<br>
          💪 ${u.speciality || ""}
        </div>
      `;
    });

    const el=document.getElementById("trainers");
    if(el) el.innerHTML=html;
  });
}

/* ================= POSTS (INSTAGRAM) ================= */
function loadPosts(){
  db.collection("posts")
  .orderBy("time","desc")
  .onSnapshot(snap=>{
    let html="";
    snap.forEach(d=>{
      let p=d.data();

      html+=`
        <div class="card">
          <b>${p.user}</b><br><br>

          <img src="${p.image}" style="width:100%;border-radius:10px"><br>

          ❤️ ${p.likes || 0}
          <button onclick="likePost('${d.id}')">Like</button>
        </div>
      `;
    });

    const el=document.getElementById("posts");
    if(el) el.innerHTML=html;
  });
}

function likePost(id){
  db.collection("posts").doc(id).update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}

/* ================= CHAT ================= */
function loadChat(){
  db.collection("messages")
  .orderBy("time")
  .onSnapshot(snap=>{
    let html="";

    snap.forEach(d=>{
      let m=d.data();
      html+=`<div>💬 <b>${m.from}</b>: ${m.text}</div>`;
    });

    const el=document.getElementById("chatBox");
    if(el) el.innerHTML=html;
  });
}

function sendMsg(){
  const input=document.getElementById("msg");

  db.collection("messages").add({
    from:"client",
    text:input.value,
    time:Date.now()
  });

  input.value="";
}

/* ================= SLOTS ================= */
function loadSlots(){
  db.collection("slots")
  .onSnapshot(snap=>{
    let html="";

    snap.forEach(d=>{
      let s=d.data();

      html+=`
        <div class="card">
          📅 ${s.date} ${s.time}<br>
          Status: ${s.status || "free"}
        </div>
      `;
    });

    const el=document.getElementById("slots");
    if(el) el.innerHTML=html;
  });
}

/* ================= INIT ================= */
loadTrainers();
loadPosts();
loadChat();
loadSlots();
