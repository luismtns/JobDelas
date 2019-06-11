
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyByOvQPg6j8snpk2k3B8RYeWOz7zfOauqQ",
    authDomain: "jobdelas-62306.firebaseapp.com",
    databaseURL: "https://jobdelas-62306.firebaseio.com",
    projectId: "jobdelas-62306",
    storageBucket: "jobdelas-62306.appspot.com",
    messagingSenderId: "1013054938950",
    appId: "1:1013054938950:web:e39df96862a34bc5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Lang Firebase
firebase.auth().useDeviceLanguage();

// Initialize Database
var userDatabase = firebase.database().ref('usuarios');
var projectDatabase = firebase.database().ref('projetos');
var achievementsDatabase = firebase.database().ref('conquistas');

// Initialize Storage
var storage = firebase.app().storage("gs://jobdelas-62306.appspot.com");


// Facebook API
window.fbAsyncInit = function() {
  FB.init({
    appId      : '2274892702602996',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.3'
  });
    
  FB.AppEvents.logPageView();   
    
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));