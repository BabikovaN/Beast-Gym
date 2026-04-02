function toggle(el){
  const desc = el.parentElement.nextElementSibling;

  if(desc.classList.contains("active")){
    desc.classList.remove("active");
  }else{
    desc.classList.add("active");
  }
}
