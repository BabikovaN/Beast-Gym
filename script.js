// 🔥 МЕНЮ (відкриття/закриття)
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

/* ESC закриває меню */
document.addEventListener("keydown", e=>{
  if(e.key==="Escape"){
    document.getElementById("menu").classList.remove("active");
  }
});
