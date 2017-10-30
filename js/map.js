// Default locations
const locations = [
  { title: 'Merkur Shopping Center', location: {lat: 45.265013, lng: 19.817400} },
  { title: 'Novi Sad Fair', location: {lat: 45.255629, lng: 19.822341} },
  { title: 'Amusement Park', location:{lat: 45.260970, lng: 19.818285} },
  { title: 'Bossi Pizza', location: {lat: 45.261419, lng: 19.816066 } },
  { title: 'Futoski park', location: {lat: 45.250660, lng: 19.826607} }
];


function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.260792, lng: 19.813940},
    zoom: 13
  });


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
  }
}
