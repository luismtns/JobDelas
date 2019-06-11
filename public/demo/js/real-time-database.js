//Inputs

//Dispalys
var displayName = $('#displayName');

//create instance of User in userDatabase
$('#submitButton').on('click', () => {
	var verify = firebase.auth().currentUser;
	if(!verify){
		return alert('Usuário não logado!')
	}else{
		var uid = firebase.auth().currentUser.uid;
		console.log(uid);
	}

	//Inputs
	var name = $('#nomeInput').val();
	var sexo = $('#sexoInput').val();
	var estrelas = $('#EstrelasInput').val();
	var cep = $('#cepInput').val();

	var nomeProfissao = $('#nomeProfissaoInput').val();
	var sobreProfissao = $('#sobreProfissaoInput').val();

	var fotoProjetoInput = $('#fotoProjetoInputInput').val();
	var tituloProjetoInput = $('#tituloProjetoInputInput').val();
	var descricaoProjetoInput = $('#descricaoProjetoInputInput').val();

	var NomeAvaliadoraInput = $('#NomeAvaliadoraInput').val();
	var NotaAvalicaoInput = $('#NotaAvalicaoInput').val();
	var ComentarioAvalicaoInput = $('#ComentarioAvalicaoInput').val();

	var TituloConquistaInput = $('#TituloConquistaInput').val();
	var ImagemConquistaInput = $('#ImagemConquistaInput').val();
	var QuantidadeConquistaInput = $('#QuantidadeConquistaInput').val();

	//Storage
	if($('#fotoPerfilInput').prop('files').length > 0){
		var storageRef = storage.ref(`perfis/${uid}/profile_${uid}`);
		var file = $('#fotoPerfilInput').prop('files')[0];
		storageRef.put(file)
	}

	//User DB
	var userJson = {
		"nome": name,
		"sexo": sexo,
		"foto": "profile_"+uid,
		"profissao":{
			"nome": nomeProfissao,
			"sobre": sobreProfissao
		}
	}

	//Increment CEP
	if(cep.length > 7){
		getCEP(cep).then((e)=>{
			userJson.endereco = {
				"cep": cep,
				"bairro": e.bairro,
				"logradouro": e.logradouro,
				"estado": e.uf,
				"cidade": e.localidade
			};
		})
	}
	console.log(userJson);
	
	updateUserByUid(uid, userJson).then(()=>{
		alert('Dados Atualizados com Sucesso!');
		// window.location.reload();
	}, (e)=>{
		alert('Falha ao atualizar dados');
		// window.location.reload();
	})
});

//Update User in DB 
function updateUserByUid(uid, data) {
	return new Promise(function name(resolve, reject) {

		firebase.database().ref('usuarios').child(uid).update(data, (error) => {
			if (error) {
				reject(error);
			} else {
				// Data saved successfully!
				resolve();
			}
		});

	})
}
//Set User andress in DB 
function updateAndressUserByUid(uid, data) {
	return new Promise(function name(resolve, reject) {

		firebase.database().ref('usuarios').ref('endereco').child(uid).set(data, (error) => {
			if (error) {
				reject(error);
			} else {
				// Data saved successfully!
				resolve();
			}
		});

	})
}

function displayAlertUserStage(user){
  if (user) {
    displayName.html(`Você está autenticado com o e-mail ${user.email}`);
    displayName.addClass('alert-success');
    displayName.removeClass('alert-danger');
  } else {
    // User is signed out.
    console.log('signOut');
    displayName.html('Você não esta autenticado.');
    displayName.addClass('alert-danger');
    displayName.removeClass('alert-sucess');
  }
}

function userAuth() {
	return new Promise(function name(resolve, reject) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				resolve(user);
				displayAlertUserStage(user);
			} else {
				// No user is signed in.
				reject(false);
				displayAlertUserStage(false);
				window.location.href = "./index.html"
			}
		});

	});
}

//Get Profile Photo By UID
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

userAuth().then((e)=>{
	displayAlertUserStage(e);

	//create MyData from userDatabase
	var userId = firebase.auth().currentUser.uid;
	userDatabase.child(userId).once('value').then(function(snapshot) {
	
		var data = snapshot.val();
		if(!data){
			return alert('Preencha seus dados!')
		}
		//Debug
		$('#userDebug').val(JSON.stringify(data));
		if(data.nome){
			$('#nomeInput').val(data.nome);
		}
		if(data.sexo){
			$('#sexoInput').val(data.sexo);
		}
		if(data.estrelas){
			$('#EstrelasInput').val(data.estrelas);
		}
	
		if(data.foto){
			getProfilePhoto(userId).then((url)=>{
				$('#fotoPerfilImg').prop('src', url);
				$("#fotoPerfilImg").removeClass('hidden');
			}).catch((e)=>{
				console.log(e);
				$("#fotoPerfilImg").addClass('hidden');
				$("#divFotoPerfil").removeClass('hidden');
			});
		}else{
			$("#fotoPerfilImg").addClass('hidden');
			$("#divFotoPerfil").removeClass('hidden');
		}
		// console.log(snapshot.val());
	});
}, (e)=>{
	console.log(e)//false
});


//create UserList from userDatabase
var userList = document.getElementById('userList');
userDatabase.on('value', function(snapshot) {
		userList.innerHTML = '';
		snapshot.forEach( (item) => {
			var data = item.val();
			var txt = `
				User JSON: ${JSON.stringify(data)}
			`;

			let li = document.createElement('li');
			li.appendChild(document.createTextNode(txt));
			userList.appendChild(li);
		})
});

//logout user
$('#signOutUser').on('click', ()=>{

  firebase.auth().signOut()
  .then(function(e) {
    alert('Deslogado');
    window.location.reload();
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