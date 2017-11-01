// Global variables
let map;


// This is our main viewmodel
function MapViewModel() {
  const self = this;


  // Initiate map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.260792, lng: 19.813940},
    zoom: 13
  });


  // DATA
  this.locations = ko.observableArray([]);


  // Push our default locations to the 'locations' array
  defaultLocations.forEach(function (location) {
    self.locations.push( new Location (location) );
  });

};
// Our view model ends here


goggleRequestError = function() {
  alert('hi');
}


// Activates knockout.js
function initApp() {
  ko.applyBindings(new MapViewModel());
}
