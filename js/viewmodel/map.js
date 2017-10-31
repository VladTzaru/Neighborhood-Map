// Global variables
let map;
const markers = [];


 // Create a map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.260792, lng: 19.813940},
      zoom: 13
  });

  const largeInfoWindow = new google.maps.InfoWindow();

  // Create markers
  for (let location of locations) {
      let position = location.location;
      let title = location.title;

      let marker = new google.maps.Marker({
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
  }
}
