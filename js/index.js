$( function() {
    var user = firebase.auth().currentUser;

    if(user)
        showMenu();
    else
        hideMenu();

    var dialog,form;
    var email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( email ).add( password );

    function showMenu()
    {
        $( "#navCatalogoCopas" ).show();
    }

    function hideMenu()
    {
        $( "#navCatalogoCopas" ).hide();
    }

    function loginUser(){
      firebase.auth().signInWithEmailAndPassword(email.val(), password.val()).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        alert(errorMessage);
      }).then(function(){
          var currentUser = firebase.auth().currentUser;

          if (currentUser) {
            window.open('./views/admin/catalogocopas.html',"_self");
        }
      });

      
    }

    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 280,
      width: 350,
      modal: true,
      buttons: {
        "Entrar": loginUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[0].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      loginUser();
    });

    $( "#login-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });

  });