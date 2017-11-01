// Global variables
let map;
const client_ID = 'OZFEKVMOWR3DTGEKP4O5VHYI32AZ3Z2VMUHB42SIIAWPIHJO';
const client_SECRET = 'DEHOWAYUUYOY1IPW343TNPDS5IYHO0LWTY4CE13FJEF2VTH1';


// This is our main viewmodel
function MapViewModel() {
  const self = this;


  // Initiate map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.255529, lng: 19.843903},
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
