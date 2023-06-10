var searchInput = document.getElementById('search-input');
var searchIcon = document.getElementById('search-icon');

searchIcon.addEventListener('click', function() {
  if (searchInput.style.display == 'none') {
    searchInput.style.display = 'block';
    searchInput.focus();
  } else {
    searchInput.style.display = 'none';
    searchInput.value = '';
  }
});

