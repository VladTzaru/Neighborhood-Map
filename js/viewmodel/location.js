// This is our 'Location' class
class Location {
  constructor(data) {
    const self = this;
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.isVisible = ko.observable(true);
    this.content = `
    <h4>${self.title()}</h4>
    <p>Jebem li ti sunce tvoje.</p>
    `;


    // Google methods
    this.infoWindow = new google.maps.InfoWindow( {content: self.content} );
    this.marker = new google.maps.Marker({
      position: self.location(),
      map: map,
      title: self.title(),
      animation: google.maps.Animation.DROP
    });


    // Foursquare API
    const foursquareURL = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=41.878114%2C%20-87.629798&query=coffee&intent=checkin&client_id=${client_ID}&client_secret=${client_SECRET}`;

    fetch(foursquareURL, {
      method: 'get'
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });


    // Shows/Hides markers
    this.showMarker = ko.computed( () => {
      self.isVisible() === true ? self.marker.setMap(map) : self.marker.setMap(null);
    }, this);


    this.openInfowindow = function (location) {
      google.maps.event.trigger(self.marker, 'click');
    };


    // Add an onclick event to open infoWindow at each marker
    this.marker.addListener('click', function() {
      self.infoWindow.open(map, this);
    });

  }
}
