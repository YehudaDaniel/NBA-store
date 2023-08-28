function enableCheckbox() {
    var termsCheckbox = document.getElementById("termsCheckbox");
    termsCheckbox.disabled = false;
  }
function validateRegistrationForSignIn() {
    var usernameInput = document.getElementById("usernameInput");
    var passwordInput = document.getElementById("passwordInput");
    var username = usernameInput.value;
    var password = passwordInput.value;
    var termsCheckbox = document.getElementById("termsCheckbox");
    var usernameErrorMessage = document.getElementById("usernameErrorMessage");
    var passwordErrorMessage = document.getElementById("passwordErrorMessage");
    var emailInput = document.getElementById("emailInput");
    var email = emailInput.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var emailErrorMessage = document.getElementById("emailErrorMessage");
  
    if (username.trim() === "") {
      usernameErrorMessage.textContent = "Please enter a username.";
      usernameInput.style.borderColor = "red";
    } else {
      usernameErrorMessage.textContent = "";
      usernameInput.style.borderColor = "";
    }
    if (password.trim() === "") {
        passwordErrorMessage.textContent = "Please enter a password.";
        passwordInput.style.borderColor = "red";
      } else {
        passwordErrorMessage.textContent = "";
        passwordInput.style.borderColor = "";
    }
    if (emailRegex.test(email)) {
      emailErrorMessage.textContent = "";
      emailInput.style.borderColor = "";
    } else {
      emailErrorMessage.textContent = "Please enter a valid email address.";
      emailInput.style.borderColor = "red";
    }
    if (!termsCheckbox.checked) {
      termsErrorMessage.textContent = "Please accept the terms and conditions.";
      termsCheckbox.style.borderColor = "red";
    } else {
      termsErrorMessage.textContent = "";
      termsCheckbox.style.borderColor="";
    }
  }
  
  function clearError(elementId) {
    var errorMessage = document.getElementById(elementId);
    var inputElement = document.getElementById(elementId.replace("ErrorMessage", "Input"));
    if (elementId === "termsErrorMessage") {
        termsCheckbox.style.borderColor="";
        errorMessage.textContent = "";
    }
    inputElement.style.borderColor = "";
    errorMessage.textContent = "";
  }

  function validateRegistrationForLogIn() {
    var usernameInput = document.getElementById("usernameInput1");
    var passwordInput = document.getElementById("passwordInput1");
    var username = usernameInput.value;
    var password = passwordInput.value;
    var usernameErrorMessage = document.getElementById("usernameErrorMessage1");
    var passwordErrorMessage = document.getElementById("passwordErrorMessage1");
  
    if (username.trim() === "") {
      usernameErrorMessage.textContent = "Please enter a username.";
      usernameInput.style.borderColor = "red";
    } else {
      usernameErrorMessage.textContent = "";
      usernameInput.style.borderColor = "";
    }

    if (password.trim() === "") {
      passwordErrorMessage.textContent = "Please enter a password.";
      passwordInput.style.borderColor = "red";
    } else {
      passwordErrorMessage.textContent = "";
      passwordInput.style.borderColor = "";
    }
    if (passwordInput.value.length < 6) {
        passwordErrorMessage.textContent = "Password must be at least 6 characters long.";
        passwordInput.style.borderColor = "red";
      } else {
        passwordErrorMessage.textContent = "";
        passwordInput.style.borderColor = "";
    }

    if (username.trim() !== "" && password.length>5 &&password.length<20) {
        alert("Logged in successful");
        // Additional form submission logic here
      }
}