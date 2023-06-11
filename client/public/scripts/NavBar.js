var searchInput = document.getElementById('search-input');
var searchIcon = document.getElementById('search-icon');

searchIcon.addEventListener('click', function () {
  if (searchInput.style.display == 'none') {
    searchInput.style.display = 'block';
    searchInput.focus();
  } else {
    searchInput.style.display = 'none';
    searchInput.value = '';
  }
});


function showNotification(count) {
  var notification = document.getElementById('notification');
  var countElement = document.getElementById('count');

  if (count > 0) {
    countElement.textContent = count;
    notification.style.display = 'block';
  } else {
    notification.style.display = 'none';
  }
}

var notificationCount = 2; 
showNotification(notificationCount);