var searchInput = document.getElementById('search-input');
var searchIcon = document.getElementById('search-icon');

searchIcon.addEventListener('click', function () {
  if (searchInput.style.display == 'none') {
    searchInput.style.display = '';
    searchInput.focus();
  } else {
    searchInput.style.display = 'none';
    searchInput.value = '';
  }
});

function toggleDropdown() {
  var dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.classList.toggle("show");
}




//side nav js

// document.querySelector(".sidebar .toggle-btn")
// .addEventListener("click",function(){
//     document.querySelector(".sidebar").classList.toggle("active");
// });

document.querySelector(".toggle-btn").addEventListener("click", function() {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".sidebar").classList.remove("deactive");

});
document.querySelector(".x-btn").addEventListener("click", function() {
  document.querySelector(".sidebar").classList.toggle("deactive");
  document.querySelector(".sidebar").classList.remove("active");

});


// rendering a tag based on token
$(document).ready(function() {
  if(document.cookie.includes('token')){
    $('#navbarLog').removeAttr('href', '/');
    $('#navbarLog').html('LogOut');

    //it has logout so add ajax call
    $('#navbarLog').click(function(e) {
      let token = document.cookie.split(';').map(cookie => cookie.trim()).find(item => item.split('=')[0] == 'token').split('=')[1];
      $.ajax({
        type: 'POST',
        url: '/user/logout',
        headers: {
          "Authorization": "Bearer " + JSON.parse(token)
        },
        success: function(res) {
          window.location.reload();
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  }else{
    $('#navbarLog').attr('href', '/login');
    $('#navbarLog').html('LogIn');
  }
});

// rendering a tag based on token
$(document).ready(function() {
  const newAdminPanelChild = $('<a href="/admin">Admin Panel</a>')
  
  if(document.cookie.includes('token') && JSON.parse(sessionStorage.getItem('user')).isAdmin){
    $('.links').append(newAdminPanelChild);
  }
    
});