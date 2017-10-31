function MapViewModel() {
  'use strict';
  const self = this;
  
  let map;
  const markers = [];
  let marker;

  const largeInfoWindow = new google.maps.InfoWindow();

  // initMap() starts here
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.260792, lng: 19.813940},
      zoom: 13
    });

    // Create markers
    for (let location of locations) {
      let position = location.location;
      let title = location.title;

      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP
      });

      // Push marker to the 'markers' array
      markers.push(marker);

      // Add an onclick event to open infoWindow at each marker
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfoWindow);
      });
    }
  }
  // Our initMap() ends here


  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<h4>${marker.title}</h4>`);
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker(null);
      });
    }
  }



  // DATA
  this.markers = ko.observableArray(locations);


  // INVOKE STUFF
  initMap();

}
// Our view model ends here


goggleRequestError = function() {
  alert('hi');
}


// Activates knockout.js
function initApp() {
  ko.applyBindings(new MapViewModel());
}
