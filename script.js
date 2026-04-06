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

      (error) => {
        console.error("Помилка завантаження тренерів:", error);
        trainersEl.innerHTML = `
          <div class="trainer-item">
            <div class="trainer-name">Не вдалося завантажити тренерів</div>
            <div class="trainer-role">Перевір Firebase config і Firestore rules</div>
          </div>
        `;
      }
const popup = document.getElementById("promoPopup");
const closeBtn = document.querySelector(".close-btn");

// показ тільки 1 раз
if (!localStorage.getItem("promoShown")) {
  setTimeout(() => {
    popup.classList.add("active");
  }, 1500);
}

// закриття
closeBtn.onclick = () => {
  popup.classList.remove("active");
  localStorage.setItem("promoShown", "true");
};

// клік поза вікном
popup.onclick = (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
    localStorage.setItem("promoShown", "true");
  }
};
