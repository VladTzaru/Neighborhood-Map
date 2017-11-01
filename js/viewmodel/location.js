// This is our 'Location' class
class Location {
  constructor(data) {
    const self = this;
    this.title = ko.observable(data.title);
    this.geoLoc = ko.observable(data.location);
    this.isVisible = ko.observable(true);
    this.phone;
    this.website;
    this.category;
    this.fullAddress;


    // Foursquare API
    const foursquareURL = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=${this.geoLoc().lat}%2C%20${this.geoLoc().lng}&query=${this.title()}&intent=checkin&client_id=${client_ID}&client_secret=${client_SECRET}`;

    fetch(foursquareURL)
    .then(function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }

        // Parse the response
        response.json().then(function(data) {
          let response = data.response.venues[0];
          // Update values
          self.phone = response.contact.formattedPhone;
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });



    // Infowindow HTML
    this.content = `
        <ul>
          <li>${self.phone}</li>
        </ul>
    `;

    // Google methods
    this.infoWindow = new google.maps.InfoWindow( {content: self.content} );
    this.marker = new google.maps.Marker({
      position: self.geoLoc(),
      map: map,
      title: self.title(),
      animation: google.maps.Animation.DROP
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
