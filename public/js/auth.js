//Inputs
var loginForm = $('#loginForm');
var authUser = $('#authUser');

var authFacebook = $('#authFacebook');


//create user instance
authUser.submit((e)=>{
  e.preventDefault();
  var email = $('#emailAuthInput');
  var password = $('#passwordAuthInput');

  firebase.auth().createUserWithEmailAndPassword(email.val(), password.val())
  .then(function(e) {
    setUserEmailByUid(e.user.uid, e.user.email).then(()=>{
      console.log(e.user);
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});

//Set User user in DB 
function setUserEmailByUid(uid, email) {
	return new Promise(function name(resolve, reject) {
		firebase.database().ref('usuarios').child(uid).set({
      "email": email
    }, (error) => {
			if (error) {
				reject(error);
			} else {
				// Data saved successfully!
				resolve();
			}
		});

	})
}


//auth user instance
loginForm.submit((e)=>{
  e.preventDefault();
  var email = $('#emailAuthInput');
  var password = $('#passwordAuthInput');
  if(!email.hasClass('is-valid') && !password.hasClass('is-valid')){
    return false
  }

  firebase.auth().signInWithEmailAndPassword(email.val(), password.val())
  .then(function(e) {
    console.log(e);    
    window.location.href = "./index.html"
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});
//Validate Login
$('#emailAuthInput').on('input', (e)=>{
  emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if(e.target.value.length < 1){
    $(e.target).removeClass('is-invalid');
    $(e.target).removeClass('is-valid');
  }else if(emailRegex.test(e.target.value)){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});
$('#passwordAuthInput').on('input', (e)=>{
  if(e.target.value.length < 1){
    $(e.target).removeClass('is-invalid');
    $(e.target).removeClass('is-valid');
  }else if(e.target.value.length > 5){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});

// Event Listener Auth Stage
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    window.location.href = "./index.html"
  }
});

//Sign Social Sites Function
function singInPopup(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    var uid = user.uid;
    var email = user.email;
    setUserEmailByUid(uid, email).then(()=>{
      alert('Bem Vindo ' + email);
    });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode);
    console.log(errorMessage);
    // console.log(email); //undefined
    // console.log(credential); //undefined
  });
};

//Facebook Login
authFacebook.on('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('user_gender');
  singInPopup(provider)
});