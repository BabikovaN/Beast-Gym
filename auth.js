auth.onAuthStateChanged(async user => {

  if (!user) {
    if (!location.href.includes("login")) {
      window.location = "login.html";
    }
    return;
  }

  const doc = await db.collection("users").doc(user.uid).get();
  const role = doc.data()?.role;

  if (role === "admin") window.location = "admin.html";
  if (role === "trainer") window.location = "trainer-profile.html";
  if (role === "client") window.location = "profile.html";

});
