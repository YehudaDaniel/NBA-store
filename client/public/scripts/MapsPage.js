var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() { // נקודת התחלה במפה - ישראל
  var israel = { lat: 32.109333, lng: 34.855499 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: israel,
    zoom: 11,
    mapTypeId: 'roadmap',
  });

  infoWindow = new google.maps.InfoWindow();

  showStoreMarkers();
}

function showStoreMarkers() {    // קוארדינטות
  stores.forEach(function(store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    );
    var name = store.name;
    var address = store.addressLines[0];
    var hours = store.hours;
    var phoneNumber=store.phoneNumber;

    createMarker(latlng, name, address, hours,phoneNumber);
  });
}

function createMarker(latlng, name, address, hours,phoneNumber) {   // תצוגה של שם, כתובת , שעות פעילות
  var html =
    "<b>" + name + "</b><br/>" +
    "Address: " + address + "<br/>" +
    "Hours: " + hours  
    + "<br> phone: " +phoneNumber;

  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });

  markers.push(marker);

  var storeListContainer = document.getElementById('store-list-container');
  var listItem = document.createElement('div');
  listItem.className = 'store-item';
  listItem.innerHTML = html;
  listItem.addEventListener('click', function() {
    map.setCenter(latlng);
    map.setZoom(15);
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  storeListContainer.appendChild(listItem);
}




