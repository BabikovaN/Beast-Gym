function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}


// 🔥 SAFE SLIDER
let index = 0;

setInterval(() => {
  const slides = document.getElementById("slides");

  if (!slides) return; // якщо немає слайдера — нічого не робимо

  const total = slides.children.length;

  if (total === 0) return;

  index++;

  if (index >= total) index = 0;

  slides.style.transform = `translateX(-${index * 100}%)`;
}, 3000);
