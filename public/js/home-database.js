function getProfilePhoto(uid) {
	return new Promise(function name(resolve, reject) {
		storage.ref(`perfis/${uid}/profile_${uid}`).getDownloadURL().then(function(url) {
			// `url` is the download URL for 'images/stars.jpg'
		
			// This can be downloaded directly:
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function(event) {
				var blob = xhr.response;
			};
			xhr.open('GET', url);
			xhr.send();
			resolve(url);
		}).catch(function(error) {
			reject(error);
			// Handle any errors
		});

	})
};

var refUser = firebase.database().ref('usuarios');
var limtRef = $('.profissional-card-wrap').length;
refUser.limitToFirst(limtRef).once('value', function(snapshot){
  var i = 0;
  snapshot.forEach(function(childSnapshot) {
    var element = $('.profissional-card-wrap')[i]
    // do something with the user data]
    console.log(childSnapshot.val());
    var data = childSnapshot.val();
    $(element).find('.profissional-name').html(data.nome);
    if(data.profissao){
      $(element).find('.profissao').html(data.profissao.nome);
      $(element).find('.profissional-description').children('p').html(data.profissao.sobre);
      
    }else{        
      $(element).find('.profissao').html('Não Informado');
      $(element).find('.profissional-description').children('p').html('');
    }
    if(data.foto){
      getProfilePhoto(data.foto.split('_')[1]).then((url)=>{
        $(element).find('.profissional-picture').children('img').prop('src', url);
      });
    }else{
      $(element).find('.profissional-picture').children('img').prop('src', 'images/blank_profile.png');
    }
    // ...
    i++;
  });
});