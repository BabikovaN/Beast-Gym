<!-- логін тренера-->
db.collection("users").onSnapshot(snap=>{
  let html="";

  snap.forEach(u=>{
    const data = u.data();

    if(data.trainer){
      html += `
        <div class="card">
          <p>${data.name || "Без імені"}</p>
          <p>Твій клієнт</p>
        </div>`;
    }
  });

  clients.innerHTML = html;
});
