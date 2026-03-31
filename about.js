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

/* ================= SLIDER ================= */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index){
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

function nextSlide(){
  let next = currentSlide + 1;
  if(next >= slides.length) next = 0;
  showSlide(next);
}

function prevSlide(){
  let prev = currentSlide - 1;
  if(prev < 0) prev = slides.length - 1;
  showSlide(prev);
}

function goToSlide(index){
  showSlide(index);
}

setInterval(() => {
  if(slides.length > 0){
    nextSlide();
  }
}, 4000);
