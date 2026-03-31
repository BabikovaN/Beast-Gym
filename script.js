// меню
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

// slider
let index = 0;

setInterval(()=>{
  const slides = document.getElementById("slides");
  const total = slides.children.length;

  index++;
  if(index >= total) index = 0;

  slides.style.transform = `translateX(-${index * 100}%)`;
},3000);
