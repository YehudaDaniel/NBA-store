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


function showNotification(cart, heart) {
  var cartNotification = document.getElementById('cart-notification');
  var cartCount = document.getElementById('cart-count');
  var heartNotificatoin = document.getElementById('heart-notification');
  var heartCount = document.getElementById('heart-count');

  if (cart > 0) {
    cartCount.textContent = cart;
    cartNotification.style.display = 'block';
  }
  if (cart == 0) {
    cartNotification.style.display = 'none';
  }
  if (heart > 0) {
    heartCount.textContent = heart;
    heartNotificatoin.style.display = 'block';
  }
  if (heart == 0) {
    heartNotificatoin.style.display = 'none';
  }
}

var notificationCount = 4;
var heartCount = 7;
showNotification(notificationCount, heartCount);