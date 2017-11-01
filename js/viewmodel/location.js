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


    // Shows/Hides markers
    this.showMarker = ko.computed( () => {
      self.isVisible() === true ? self.marker.setMap(map) : self.marker.setMap(null);
    }, this);


    // Event listeners
    // Add an onclick event to open infoWindow at each marker
    this.marker.addListener('click', function() {
      if (self.infoWindow.marker !== this) {
        self.infoWindow.open(map, this);
      }
    });
  }
}
