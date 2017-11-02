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
    const foursquareURL = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=${this.geoLoc().lat}%2C%20${this.geoLoc().lng}&query=${this.title()}&intent=checkin&client_id=OZFEKVMOWR3DTGEKP4O5VHYI32AZ3Z2VMUHB42SIIAWPIHJO&client_secret=DEHOWAYUUYOY1IPW343TNPDS5IYHO0LWTY4CE13FJEF2VTH1`;

    fetch(foursquareURL)
    .then( (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        // Parse the response and update values
        response.json().then( (data) => {
          let response = data.response.venues[0];
          self.phone = response.contact.formattedPhone;
          self.category = response.categories[0].name;
          self.fullAddress = response.location.address;
          self.website = response.url;
        });
      }
    )
    .catch( (err) => console.log('Looks like there was a problem. Status Error:', err) );


    // Google methods
    this.infoWindow = new google.maps.InfoWindow();
    this.marker = new google.maps.Marker({
      position: self.geoLoc(),
      map: map,
      title: self.title(),
      animation: google.maps.Animation.DROP
    });

    this.showHideMarkers = ko.computed( () => {
      self.isVisible() === true ? self.marker.setMap(map) : self.marker.setMap(null);
    }, this);

    // Bounce a marker in Goggle maps once
    this.toggleBounce = () => {
      if (self.marker.getAnimation() !== null) {
        self.marker.setAnimation(null);
      } else {
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout( () => { self.marker.setAnimation(null); }, 750);
      }
    }

    this.openInfowindow = (location) => {
      google.maps.event.trigger(self.marker, 'click');
    };


    // Add an onclick event to open infoWindow at each marker
    this.marker.addListener('click', function() {
      // Bounce marker
      self.toggleBounce();
      // HTML for our infowindow
      const content = `
        <h4>${self.title()}</h4>
        <p>Phone: ${self.phone}</p>
        <p>Category: ${self.category}</p>
        <p>Address: ${self.fullAddress}</p>
        <a href="${self.website}" target="_blank">Website</a>`;

      self.infoWindow.setContent(content);
      self.infoWindow.open(map, this);
    });

  }
}
