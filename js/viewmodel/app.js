<<<<<<< HEAD
// Global variables
let map;
let infoWindow;


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.255529,
            lng: 19.843903
        },
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();

    // Init our ViewModel
    ko.applyBindings(new MapViewModel());
}


// This is our main viewmodel
function MapViewModel() {
    const self = this;
=======
// This is our main viewmodel
function MapViewModel() {
  const self = this;

  // Initiate map
  initMap();
>>>>>>> 180710b365d77c16b581fe66fd84453ffab50828

    // DATA
    this.locations = ko.observableArray([]);

<<<<<<< HEAD
    // Push our default locations to the 'locations' array
    defaultLocations.forEach(function(location) {
        self.locations.push(new Location(location));
    });

    // BEHAVIOURS
    this.searchQuery = ko.observable('');
    this.isFocused = ko.observable(true);
    this.isMenuClosed = ko.observable(false);

    // Opens/Closes menu
    this.toggleMenu = function() {
        self.isMenuClosed(!this.isMenuClosed());
    };
=======
  // Push our default locations to the 'locations' array
  defaultLocations.forEach(function (location) {
    self.locations.push( new Location (location) );
  });


  // BEHAVIOURS
  this.searchQuery = ko.observable('');
  this.isFocused = ko.observable(true);
  this.isMenuClosed = ko.observable(false);

  // Opens/Closes menu
  this.toggleMenu = function () {
    self.isMenuClosed(!this.isMenuClosed());
  }

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
>>>>>>> 180710b365d77c16b581fe66fd84453ffab50828

    // Filter list
    this.filteredLocations = ko.computed(() => {
        const filter = self.searchQuery();
        if (!filter) {
            self.locations().forEach((location) => location.isVisible(true));
            return self.locations();
        } else {
            const search = self.searchQuery().toLowerCase();
            return ko.utils.arrayFilter(self.locations(), (location) => {
                const selectedLocation = location.title.toLowerCase().indexOf(search) >= 0;
                location.isVisible(selectedLocation);
                return selectedLocation;
            });
        }
    }, this);

<<<<<<< HEAD
=======
// Google map error handler
function goggleRequestError() {
  const message = `
    <div class="google-error">
      <img class="google-error-icon" src="img/error.svg">
      <p>Oops! Something went wrong. This page didn’t load Google Maps correctly. <br> Please try again later.</p>
    </div>`
  document.getElementById('map').innerHTML = message;
>>>>>>> 180710b365d77c16b581fe66fd84453ffab50828
}


// Google map error handler
function goggleRequestError() {
    const message = `
        <div class="google-error">
            <img class="google-error-icon" src="img/error.svg">
            <p>Oops! Something went wrong. This page didn’t load Google Maps correctly. <br> Please try again later.</p>
        </div>`;
    document.getElementById('map').innerHTML = message;
}
