

function MapViewModel() {

  <!-- Init the map -->
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    })
  }



  initMap();
}

goggleRequestError = function() {
  alert('hi');
}

// Activates knockout.js
function initApp() {
  ko.applyBindings(new MapViewModel());
}
