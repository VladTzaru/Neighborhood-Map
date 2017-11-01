// Global variables
let map;

// These are our default locations
const defaultLocations = [
  { title: 'Merkur Shopping Center', location: {lat: 45.265013, lng: 19.817400} },
  { title: 'Novi Sad Fair', location: {lat: 45.255629, lng: 19.822341} },
  { title: 'Amusement Park', location:{lat: 45.260970, lng: 19.818285} },
  { title: 'Bossi Pizza', location: {lat: 45.261419, lng: 19.816066 } },
  { title: 'Futoski park', location: {lat: 45.250660, lng: 19.826607} },
  { title: 'Sajam Hotel', location: {lat: 45.254753, lng: 19.819443} }
];


// This is our 'Location' class
class Location {
  constructor(data) {
    const self = this;
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);


    // Google methods
    this.infoWindow = new google.maps.InfoWindow();
    this.marker = new google.maps.Marker({
      position: self.location(),
      map: map,
      title: self.title(),
      animation: google.maps.Animation.DROP
    });


    this.populateInfoWindow = (marker, infowindow) => {
      if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent(`<h4>${marker.title}</h4>`);
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
          infowindow.setMarker(null);
        });
      }
    }


    // Event listeners
    // Add an onclick event to open infoWindow at each marker
    this.marker.addListener('click', function() {
      self.populateInfoWindow(this, self.largeInfoWindow);
    });
  }
}


// This is our main viewmodel
function MapViewModel() {

  const self = this;

  // DATA
  this.locations = ko.observableArray([]);

  // Push default locations to the 'markers' array
  defaultLocations.forEach(function (location) {
    self.locations.push( new Location (location) );
  });

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.260792, lng: 19.813940},
      zoom: 13
    });
  }



  // Behaviours


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
