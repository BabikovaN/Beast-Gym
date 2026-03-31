const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

if (slides.length > 0) {
  function showSlide(index){
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

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
    if(index >= 0 && index < slides.length){
      showSlide(index);
    }
  }

  setInterval(nextSlide, 4000);

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.goToSlide = goToSlide;
}
