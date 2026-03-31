const db = firebase.firestore();

// FULL DAY
db.collection("prices").doc("fullDay").get().then(doc=>{
  const d = doc.data();

  document.getElementById("full_oneTime").innerText = d.oneTime + " грн";
  document.getElementById("full_month").innerText = d.month + " грн";
  document.getElementById("full_3month").innerText = d["3month"] + " грн";
  document.getElementById("full_6month").innerText = d["6month"] + " грн";
});

// MORNING
db.collection("prices").doc("morning").get().then(doc=>{
  const d = doc.data();

  document.getElementById("morning_1").innerText = d.month + " грн";
  document.getElementById("morning_3").innerText = d["3month"] + " грн";
  document.getElementById("morning_6").innerText = d["6month"] + " грн";
});

// STUDENT
db.collection("prices").doc("student").get().then(doc=>{
  const d = doc.data();

  document.getElementById("student_1").innerText = d.month + " грн";
  document.getElementById("student_3").innerText = d["3month"] + " грн";
  document.getElementById("student_6").innerText = d["6month"] + " грн";
});

// FAMILY
db.collection("prices").doc("family").get().then(doc=>{
  const d = doc.data();

  document.getElementById("family_1").innerText = d.month + " грн";
  document.getElementById("family_3").innerText = d["3month"] + " грн";
  document.getElementById("family_6").innerText = d["6month"] + " грн";
});

// PERSONAL
db.collection("prices").doc("personal").get().then(doc=>{
  const d = doc.data();

  document.getElementById("personal_1session").innerText = d.session + " грн";
  document.getElementById("personal_6").innerText = d["6sessions"] + " грн";
  document.getElementById("personal_12").innerText = d["12sessions"] + " грн";
  document.getElementById("personal_program").innerText = d.program + " грн";
});
