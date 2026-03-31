window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  'recaptcha',
  {
    size: "normal",
    callback: function(response) {
      console.log("reCAPTCHA OK");
    }
  }
);

function login(){
  const phone = document.getElementById("phone").value;

  const appVerifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phone, appVerifier)
    .then(function(result){

      const code = prompt("Введи SMS код:");

      return result.confirm(code);
    })
    .then(function(userCredential){
      console.log("Успішний логін:", userCredential.user);
      window.location = "profile.html";
    })
    .catch(function(error){
      alert(error.message);
    });
}
