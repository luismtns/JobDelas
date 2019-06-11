//Inputs
var uploader = $('#uploader');
var fileButton = $('#fileButton');

fileButton.on('change', (e)=>{
  //Get File
  var file = e.target.files[0];
  console.log(file);
  
  // Create a storage reference from our storage service
  var storageRef = storage.ref('arquivos/' + file.name);

  //Enviar Arquivo
  var task = storageRef.put(file);

  task.on('state_changed',
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.val(percentage);
    },
    function error(err) {
      console.log(err);
      
    },
    function complete() {
      alert('Envio Completo!')
    }
  )

})