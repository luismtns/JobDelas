//Inputs
var loginForm = $('#loginForm');
var cadastroForm = $('#cadastroForm');

var authFacebook = $('#authFacebook');

//create user instance
cadastroForm.submit((e)=>{
  e.preventDefault();
  if(
  !$('#nameCadastroInput').hasClass('is-valid') ||
  !$('#cpfCadastroInput').hasClass('is-valid') ||
  !$('#phoneCadastroInput').hasClass('is-valid') ||
  !$('#cepCadastroInput').hasClass('is-valid') ||
  !$('#emailCadastroInput').hasClass('is-valid') ||
  !$('#passwordCadastroInput').hasClass('is-valid')
  ){
    return console.log('Falta dados')
  }
  var email = $('#emailCadastroInput').val();
  var password = $('#passwordCadastroInput').val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(e) {
    var profissao = $('#profissaoCadastroInput').val();
    var foto = $('#fotoCadastroPerfil');
    var name = $('#nameCadastroInput').val();
    var cpf = $('#cpfCadastroInput').val();
    var phone = $('#phoneCadastroInput').val();
    var cep = $('#cepCadastroInput').val();
    if(foto.prop('files').length > 0){
      var storageRef = storage.ref(`perfis/${e.user.uid}/profile_${e.user.uid}`);
      var file = foto.prop('files')[0];
      storageRef.put(file)
    }
    var userJson = {
      "nome": name,
      "sexo": "F",
      "email": email,
      "foto": "profile_"+e.user.uid,
      "cpf": cpf,
      "phone": phone,
      "profissao":{
        "nome": profissao,
        "sobre": ""
      },
      "cep": cep
    }

    console.log(userJson);    
    setUserByUid(e.user.uid, userJson).then(()=>{
      console.log(e.user);
      window.location.href = "./index.html"
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
//Validate Register
$('#nameCadastroInput').on('input', (e)=>{
  if(e.target.value.length > 1){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});
$('#cpfCadastroInput').on('input', (e)=>{
  if(e.target.value.length > 1){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});
$('#phoneCadastroInput').on('input', (e)=>{
  if(e.target.value.length > 1){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});
$('#cepCadastroInput').on('input', (e)=>{
  if(e.target.value.length > 7){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});
$('#emailCadastroInput').on('input', (e)=>{
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
$('#passwordCadastroInput').on('input', (e)=>{
  if(e.target.value.length > 7){
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
  }else{
    $(e.target).removeClass('is-valid');
    $(e.target).addClass('is-invalid');
  }
});

//Set User user in DB 
function setUserByUid(uid, userJson) {
	return new Promise(function name(resolve, reject) {
		firebase.database().ref('usuarios').child(uid).set(userJson, (error) => {
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
// firebase.auth().onAuthStateChanged(function(user) {
//   if(user){
//   }
// });

//Sign Social Sites Function
function singInPopup(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    var uid = user.uid;
    var email = user.email;
    // setUserByUid(uid, email).then(()=>{
    //   alert('Bem Vindo ' + email);
    // });
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

//Get CEP

function getCEP(cep){
	return new Promise(function name(resolve, reject) {
		
		$.getJSON('https://viacep.com.br/ws/' + cep +'/json/')
			.done((data) =>{
				resolve(data)
			})
			.fail((erro) =>{
				reject(erro);
			})

	});
}