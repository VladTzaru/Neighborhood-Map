function MapViewModel() {

  const self = this;


  // INVOKE STUFF
  initMap();

  self.markers = ko.observableArray(locations);
  console.log(self.markers());


}


goggleRequestError = function() {
  alert('hi');
}


// Activates knockout.js
function initApp() {
  ko.applyBindings(new MapViewModel());
}
