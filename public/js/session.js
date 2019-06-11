
//logout user
$('#signOutUser').on('click', ()=>{

  firebase.auth().signOut()
  .then(function(e) {
    window.location.href = "./login.html";
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

//Event Listener Session
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    console.log("Logado Como" + JSON.stringify(user.displayName));
    displayUserName(user.displayName.split(' ')[0])
  }else{
    
    console.log("Deslogado");
  }
});

function displayUserName(name){
  if(name){
    $('#displayName').html(name);
  }
}

