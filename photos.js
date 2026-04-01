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
// GALLERY DATA
// ДОДАВАЙ ФОТО СЮДИ ВРУЧНУ
// =========================

const gymPhotos = [
  // приклад:
  // { src: "zal1.jpg", title: "Зона тренажерів", text: "Сучасний простір для силових тренувань" }
];

const trainerPhotos = [
  // { src: "trainer1.jpg", title: "Тренер Олег", text: "Персональні та силові тренування" }
];

const youPhotos = [
  // { src: "client1.jpg", title: "Результат клієнта", text: "Прогрес і мотивація" }
];

// =========================
// RENDER
// =========================
function createCard(item, placeholderTitle, placeholderText){
  if(item.src){
    return `
      <div class="gallery-item">
        <img src="${item.src}" alt="${item.title}" class="gallery-photo">
        <div class="gallery-caption">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="gallery-item">
      <div class="placeholder-box">${placeholderTitle}</div>
      <div class="gallery-caption">
        <h3>${placeholderTitle}</h3>
        <p>${placeholderText}</p>
      </div>
    </div>
  `;
}

function renderGallery(list, containerId, emptyTitle, emptyText){
  const container = document.getElementById(containerId);
  if(!container) return;

  if(list.length === 0){
    container.innerHTML = `
      ${createCard({}, emptyTitle, emptyText)}
      ${createCard({}, emptyTitle, "Сюди ти зможеш додати фото вручну пізніше.")}
      ${createCard({}, emptyTitle, "Галерея буде виглядати сучасно та акуратно.")}
    `;
    return;
  }

  container.innerHTML = list.map(item =>
    createCard(item, item.title, item.text)
  ).join("");
}

renderGallery(
  gymPhotos,
  "gymGallery",
  "Фото залу",
  "Тут будуть фото тренажерної зали та обладнання."
);

renderGallery(
  trainerPhotos,
  "trainersGallery",
  "Фото тренерів",
  "Тут будуть фото команди Beast Gym."
);

renderGallery(
  youPhotos,
  "youGallery",
  "Ваші фото",
  "Тут будуть фото клієнтів, результатів та атмосфери."
);

// =========================
// TABS
// =========================
const tabButtons = document.querySelectorAll(".tab-btn");
const sections = {
  gym: document.getElementById("gymSection"),
  trainers: document.getElementById("trainersSection"),
  you: document.getElementById("youSection")
};

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    Object.values(sections).forEach(section => {
      if(section) section.classList.remove("active");
    });

    if(tab === "gym" && sections.gym) sections.gym.classList.add("active");
    if(tab === "trainers" && sections.trainers) sections.trainers.classList.add("active");
    if(tab === "you" && sections.you) sections.you.classList.add("active");
  });
});
