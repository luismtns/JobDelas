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

function calculateWidthStars(note){
  const starPercentage = (note / 5) * 100;
  const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
  return starPercentageRounded
}
$( document ).ready(()=>{
  var refUser = firebase.database().ref('usuarios');
  var limtRef = $('.profissional-card-wrap').length;
  refUser.limitToFirst(limtRef).once('value', function(snapshot){
    var i = 0;
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val());
      var element = $('.profissional-card-wrap')[i];
      // do something with the user data]
      var starDiv = $(element).children('.profissional-info').find('.stars-inner');
      var data = childSnapshot.val();
      $(element).find('.profissional-name').html(data.nome);
      if(data.profissao){
        $(element).find('.profissao').html(data.profissao.nome);
        $(element).find('.profissional-description').children('p').html(data.profissao.sobre);
        if(data.profissao.estrelas){
          var rate = calculateWidthStars(data.profissao.estrelas);
          $(starDiv).width(rate);
          $(element).children('.profissional-info').find('.stars-inner').width(rate);
        }
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

})

// let referenceToOldestKey = "";
// if (!referenceToOldestKey) { // if initial fetch
 
//   firebase.database().ref('usuarios')
//    .orderByKey()
//    .limitToLast(6)
//    .once("value")
//    .then((snapshot) => { 
//       // changing to reverse chronological order (latest first)
//       let arrayOfKeys = Object.keys(snapshot.val())
//          .sort()
//          .reverse();
//       // transforming to array
//       let results = arrayOfKeys
//          .map((key) => snapshot.val()[key]);
//       // storing reference
//       referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
 
//       // Do what you want to do with the data, i.e.
//       // append to page or dispatch({ … }) if using redux
//       var i = 0;

//     snapshot.forEach(function(childSnapshot) {
//       var element = $('.profissional-card-wrap')[i];
//       // do something with the user data]
//       var starDiv = $(element).children('.profissional-info').find('.stars-inner');
//       var data = childSnapshot.val();
//       $(element).find('.profissional-name').html(data.nome);
//       if(data.profissao){
//         $(element).find('.profissao').html(data.profissao.nome);
//         $(element).find('.profissional-description').children('p').html(data.profissao.sobre);
//         if(data.profissao.estrelas){
          
//           var rate = calculateWidthStars(data.profissao.estrelas);
//           $(starDiv).width(rate);
//           $(element).children('.profissional-info').find('.stars-inner').width(rate);
//           console.log($(element).children('.profissional-info').find('.stars-inner').width(rate));
          
          
//         }
//       }else{        
//         $(element).find('.profissao').html('Não Informado');
//         $(element).find('.profissional-description').children('p').html('');
//       }
//       if(data.foto){
//         getProfilePhoto(data.foto.split('_')[1]).then((url)=>{
//           $(element).find('.profissional-picture').children('img').prop('src', url);
//         });
//       }else{
//         $(element).find('.profissional-picture').children('img').prop('src', 'images/blank_profile.png');
//       }
//       // ...
//       i++;
//     });
//    })
//    .catch((error) => {} );
 
//  } else {
 
//   firebase.database().ref('usuarios')
//    .orderByKey()
//    .endAt(oldestKeyReference)
//    .limitToLast(6)
//    .once("value")
//    .then((snapshot) => {
//      // changing to reverse chronological order (latest first)
//      // & removing duplicate
//      let arrayOfKeys = Object.keys(snapshot.val())
//          .sort()
//          .reverse()
//          .slice(1);
//       // transforming to array
//       let results = arrayOfKeys
//          .map((key) => snapshot.val()[key]);
//       // updating reference
//       referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
//       // Do what you want to do with the data, i.e.
//       // append to page or dispatch({ … }) if using redux
//    })
//    .catch((error) => { } );
 
//  }