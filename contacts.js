const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");

function toggleMenu(){
  menu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
}

menuOverlay.addEventListener("click", toggleMenu);
