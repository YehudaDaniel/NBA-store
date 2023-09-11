
//check if is email - returns bool
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

if(sessionStorage.getItem('user')) {
  window.location.href = '/';
}

// event listeners
$(document).ready(function() {
  //click event handler to the submit button
  $('#loginForm').submit(function(e) {
    e.preventDefault();

    if(!validateEmail($('#usernameInput').val())) {
      $('#errorMsg').html('Please enter a valid email address.');
      return;
    }else if($('#passwordInput').val().length < 6){
      $('#errorMsg').html('Please enter a valid password.');
      return;
    }else if($('#usernameInput').val().length < 3){
      $('#errorMsg').html('Please enter a valid email.');
      return;
    }

    let formData = $(this).serialize();
    let errorMsg = $('#errorMsg');

    //sending ajax request
    $.ajax({
      type: 'POST',
      url: '/user/login',
      data: formData,
      success: function(res) {
        errorMsg.html('');
        //saving user data in the session
        sessionStorage.setItem('user', JSON.stringify(res.user));
        sessionStorage.setItem('token', JSON.stringify(res.token));
        window.location.href = '/';
      },
      error: function(error) {
        if(error.status == 404){
          errorMsg.html('UserName or Password Incorrect, Please try again.');
        }else if(error.status == 400){
          errorMsg.html('Something went wrong, Please try again.');
        }
      }
    });
  });
});
