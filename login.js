window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  'recaptcha',
  {
    size: "normal"
  }
);

function login(){
  const phone = document.getElementById("phone").value;

  firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(result => {

      const code = prompt("Введи SMS код:");

      return result.confirm(code);
    })
    .then(userCredential => {
      window.location = "profile.html";
    })
    .catch(err => alert(err.message));
}
