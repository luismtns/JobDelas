
//logout user
$('#signOutUser').on('click', ()=>{

  firebase.auth().signOut()
  .then(function(e) {
    window.location.href = "./landing-informacoes.html";
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // console.log(errorCode);
    // console.log(errorMessage);
    // ...
  });
});

//Event Listener Session
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    firebase.database().ref('usuarios').child(user.uid).once('value', function(snapshot){
      var json = snapshot.val()
      // console.log("Logado Como" + JSON.stringify(json));
      displayUserName(json.nome.split(' ')[0])

    });
  }else{
    window.location.href = "./landing-informacoes.html"
    // console.log("Deslogado");
  }
});

function displayUserName(name){
  if(name){
    $('#displayName').html(name);
  }
}

$('#yourProfile').click(()=>{
  window.location.href = "./profile-page-profissional.html"
});

$('#yourConfigs').click(()=>{
  window.location.href = "./configuracoes.html"
});
