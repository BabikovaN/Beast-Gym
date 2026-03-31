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
  menu.classList.contains("active") ? closeMenu() : openMenu();
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

window.toggleMenu = toggleMenu;
