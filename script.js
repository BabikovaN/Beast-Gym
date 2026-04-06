// =========================
// MENU
// =========================
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
  if (menu) menu.classList.add("active");
  if (menuOverlay) menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (menu) menu.classList.remove("active");
  if (menuOverlay) menuOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function toggleMenu() {
  if (!menu) return;

  if (menu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeMenu();

    if (promoPopup && promoPopup.classList.contains("active")) {
      closePromo();
    }
  }
});

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// =========================
// FIREBASE
// =========================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  projectId: "YOUR_PROJECT_ID"
};

let db = null;

try {
  if (typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
} catch (error) {
  console.error("Firebase init error:", error);
}

// =========================
// TRAINERS
// =========================
function renderTrainerCard(user) {
  const name = user.name || "Тренер";
  const speciality = user.speciality || "Персональні тренування";

  return `
    <div class="trainer-item">
      <div class="trainer-name">${name}</div>
      <div class="trainer-role">${speciality}</div>
    </div>
  `;
}

function loadTrainers() {
  const trainersEl = document.getElementById("trainers");
  if (!trainersEl) return;

  if (!db) {
    trainersEl.innerHTML = `
      <div class="trainer-item">
        <div class="trainer-name">Тренери скоро з'являться</div>
        <div class="trainer-role">Підключи свої дані Firebase</div>
      </div>
    `;
    return;
  }

  db.collection("users")
    .where("role", "==", "trainer")
    .onSnapshot(
      (snap) => {
        if (snap.empty) {
          trainersEl.innerHTML = `
            <div class="trainer-item">
              <div class="trainer-name">Поки немає тренерів</div>
              <div class="trainer-role">Додай тренерів у Firebase</div>
            </div>
          `;
          return;
        }

        let html = "";
        snap.forEach((doc) => {
          html += renderTrainerCard(doc.data());
        });

        trainersEl.innerHTML = html;
      },
      (error) => {
        console.error("Помилка завантаження тренерів:", error);
        trainersEl.innerHTML = `
          <div class="trainer-item">
            <div class="trainer-name">Не вдалося завантажити тренерів</div>
            <div class="trainer-role">Перевір Firebase config і Firestore rules</div>
          </div>
        `;
      }
    );
}

loadTrainers();

// =========================
// PROMO POPUP
// =========================
const promoPopup = document.getElementById("promoPopup");
const promoClose = document.getElementById("promoClose");
const promoReminder = document.getElementById("promoReminder");

function openPromo() {
  if (!promoPopup) return;
  promoPopup.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePromo() {
  if (!promoPopup) return;
  promoPopup.classList.remove("active");
  document.body.style.overflow = "";

  if (promoReminder) {
    promoReminder.classList.add("show");
  }

  localStorage.setItem("promoClosed", "true");
}

if (promoPopup && promoClose && promoReminder) {
  window.addEventListener("load", () => {
    if (!localStorage.getItem("promoClosed")) {
      setTimeout(() => {
        openPromo();
      }, 400);
    } else {
      promoReminder.classList.add("show");
    }
  });

  promoClose.addEventListener("click", closePromo);

  promoPopup.addEventListener("click", (e) => {
    if (e.target === promoPopup) {
      closePromo();
    }
  });

  promoReminder.addEventListener("click", () => {
    openPromo();
  });
}
/* =========================
   SECRET ADMIN
========================= */
let clickCount = 0;
let clickTimer;

const logo = document.getElementById("logoAdmin");

if (logo) {
  logo.addEventListener("click", () => {
    clickCount++;

    clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 800);

    if (clickCount === 3) {
      const password = prompt("Введи пароль адміністратора");

      if (password === "babikova1306") {
        window.location.href = "admin.html";
      } else {
        alert("Невірний пароль ❌");
      }

      clickCount = 0;
    }
  });
}
