// Global variables
let map;


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


  // BEHAVIOURS
  this.searchQuery = ko.observable('');
  this.isFocused = ko.observable(true);

  /*
  Filter list
  A cool article regarding Utility Functions in KnockoutJS
  http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  */
  this.filteredLocations = ko.computed(() => {
    const filter = self.searchQuery();
    if (!filter) {
      self.locations().forEach((location) => location.isVisible(true));
      return self.locations();
    } else {
      const search = self.searchQuery().toLowerCase();
      return ko.utils.arrayFilter(self.locations(), (location) => {
        const selectedLocation = location.title().toLowerCase().indexOf(search) >= 0;
        location.isVisible(selectedLocation);
        return selectedLocation;
      });
    }
  }, this);

};


// Google map error handler
function goggleRequestError() {
  alert('hi');
}


// Activates knockout.js
function initApp() {
  ko.applyBindings(new MapViewModel());
}
