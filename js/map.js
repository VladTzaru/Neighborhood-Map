let map;

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.260792, lng: 19.813940},
    zoom: 13
  });

  const locations = {lat: 45.265013, lng: 19.817400};

  const marker = new google.maps.Marker({
    position: locations,
    map: map,
    title: 'First Marker!'
  });
}
