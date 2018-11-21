var token = "";

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var newUser = {
        id: id_token
    };
    $.post("/api/google-auth", newUser, function(data){
        console.log("Authenticated User");
        console.log(data);
        token = data;
        $("#sign-in-modal").modal("open");
    })
}

$("#create-username-form").on("submit", function(event){
    event.preventDefault();
    $("#sign-in-modal").modal("close");
    var newUsername = $("#username-input").val();
    console.log(newUsername);
    var newUser = {
        username: newUsername,
        token: token
    }
    $.post("/api/user", newUser, function(data){
        console.log("added user");
        console.log(data);
    });
});

$(document).ready(function(){
    $(".tabs").tabs();
    $(".collapsible").collapsible();
    $(".modal").modal();
});