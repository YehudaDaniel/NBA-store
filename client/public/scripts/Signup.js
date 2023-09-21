//check if is email - returns bool
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

function validateFullName($fullName) {
    var fullname = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
    return fullname.test($fullName);
}

function validateZipcode($zipcode) {
    var zipcode = /^[0-9]*$/;
    return zipcode.test($zipcode);
}

// event listeners
$(document).ready(function () {
    //click event handler to the submit button
    $('.signup-form').submit(function (e) {
        e.preventDefault();

        if(!validateFullName($('#fullName').val()) || $('#fullName').val().length < 3) {
            $('#errorMsg').html('Please enter a valid fullname.');
            return;
        }
        if (!validateEmail($('#email').val()) || $('#email').val().length < 3) {
            $('#errorMsg').html('Please enter a valid email address.');
            return;
        } else if ($('#password').val().length < 6) {
            $('#errorMsg').html('Please enter a valid password.');
            return;
        } else if ($('#password').val() != $('#sndPassword').val()) {
            $('#errorMsg').html('Passwords do not match.');
            return;
        }else if($('#address').val().length < 3) {
            $('#errorMsg').html('Please enter a valid address.');
            return;
        }else if($('#city').val().length < 3) {
            $('#errorMsg').html('Please enter a valid city.');
            return;
        }else if($('#country').val().length < 3) {
            $('#errorMsg').html('Please enter a valid country.');
            return;
        }else if(!validateZipcode($('#zipcode').val())) {
            $('#errorMsg').html('Please enter a valid zipcode.');
            return;
        }
            

        let formData = $(this).serialize();
        let errorMsg = $('#errorMsg');

        //sending ajax request
        $.ajax({
            type: 'POST',
            url: '/user/register',
            data: formData,
            success: function (res) {
                errorMsg.html('');
                //saving user data in the session
                sessionStorage.setItem('user', JSON.stringify(res.user));
                document.cookie = `token=${JSON.stringify(res.token)}`;
                window.location.href = '/';
            },
            error: function (error) {
                let errorMsg = $('#errorMsg');
                if (error.status == 500) {
                    errorMsg.html('Something went wrong, try again.');
                } else if (error.status == 400) {
                    errorMsg.html('Make sure all fields are filled correctly and try again!');
                }
            }
        });
    });
});
