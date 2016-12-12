$( function() {

var storageRef = firebase.storage().ref();
var user = firebase.auth().currentUser;
    if(user)
        window.open('../../index.html',"_self");

DownloadImages();

$( "#btnGuardarImagen" ).click(function() {
  var file = document.getElementById('fileItem').files[0];

  var uploadTask = storageRef.child('images/copas/' + file.name).put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // See below for more detail
    }, function(error) {
    // Handle unsuccessful uploads
    }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var downloadURL = uploadTask.snapshot.downloadURL;
        alert(downloadURL);
    });
});

function DownloadImages()
{
    var storageRef = firebase.storage().ref();

    // Create a reference to the file we want to download

    var copasRef = storageRef.child('images/copas/IMG_2181.JPG');

    // Get the download URL
    copasRef.getDownloadURL().then(function(url) {
       var img = "<img src='" + url +"' alt='' style='width:200px'>"
       $('#images').append(img);
    }).catch(function(error) {
    switch (error.code) {
        case 'storage/object_not_found':
        // File doesn't exist
        break;

        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
    });
}

});



