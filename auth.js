auth.onAuthStateChanged(async user => {

  if (!user) {
    if (!location.href.includes("login")) {
      window.location = "login.html";
    }
    return;
  }

  const ref = db.collection("users").doc(user.uid);
  const doc = await ref.get();

  if (!doc.exists) {
    await ref.set({
      role: "client",
      name: "New user"
    });
  }

  const role = (await ref.get()).data().role;

  if (role === "admin") window.location = "admin.html";
  if (role === "trainer") window.location = "trainer-profile.html";
  if (role === "client") window.location = "profile.html";
});
