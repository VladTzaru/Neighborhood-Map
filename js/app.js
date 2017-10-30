// Global variables
let map;
const markers = [];


function MapViewModel() {


  // INVOKE STUFF
  initMap();
  console.log(markers);
}


goggleRequestError = function() {
  alert('hi');
}


// Activates knockout.js
function initApp() {
  ko.applyBindings(new MapViewModel());
}
