<!--(логін)-->
window.recaptchaVerifier =
  new firebase.auth.RecaptchaVerifier('recaptcha');

function login(){
  const phone = document.getElementById("phone").value;

  firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(result=>{
      const code = prompt("Код SMS:");
      return result.confirm(code);
    })
    .then(()=>{
      window.location = "profile.html";
    })
    .catch(e=>alert(e.message));
}
