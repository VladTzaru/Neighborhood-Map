// This is our 'Location' class
class Location {
    constructor(data) {
        const self = this;
        this.title = data.title;
        this.geoLoc = data.location;
        this.isVisible = ko.observable(true);
        this.phone;
        this.img;
        this.category;
        this.fullAddress;

        // This is our Foursquare API url
        const foursquareURL = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=${this.geoLoc.lat}%2C%20${this.geoLoc.lng}&query=${this.title}&intent=checkin&client_id=NMNSC2SLOPCO3DYBPGGQSIP3LOYYMZMG2GSBDJ0XFDFZFNKH&client_secret=J12J4HIQYKOJ5M0H2EXIIFJMEWUQ5JANO4IRG15QIFPWEREL`;

        // Google methods
        this.marker = new google.maps.Marker({
            position: self.geoLoc,
            map: map,
            title: self.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: '#F44336',
                strokeWeight: 3,
                fillColor: '#FDD835',
                fillOpacity: 0.8,
                scale: 8
            },
            animation: google.maps.Animation.DROP
        });

        this.showHideMarkers = ko.computed(() => {
            self.isVisible() === true ? self.marker.setMap(map) : self.marker.setMap(null);
        }, this);

        // Bounce a marker in Goggle maps once
        this.toggleBounce = () => {
            if (self.marker.getAnimation() !== null) {
                self.marker.setAnimation(null);
            } else {
                self.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    self.marker.setAnimation(null);
                }, 1400);
            }
        };

        this.openInfowindow = (location) => {
            google.maps.event.trigger(self.marker, 'click');
        };

        this.populateInfoWindow = function(marker, infowindow) {
            // HTML for our infowindow
            const content = `
                <h3 class="infowindow-title">${self.title}</h3>
                <div class="infowindow-streetView">
                    <h4 class="infowindow-category">Street view</h4>
                    <img class="infowindow-img" src="${self.url}" alt="Street view picture">
                </div>
                <p class="infowindow-category">Phone: <span class="infowindow-content">${self.phone}</span></p>
                <p class="infowindow-category">Category: <span class="infowindow-content">${self.category}</span></p>
                <p class="infowindow-category">Address: <span class="infowindow-content">${self.fullAddress}</span></p>`;

            // Check to make sure the infowindow is not already opened on this marker.
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent(content);
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            }
        };

        // Add an onclick event to open infoWindow at each marker
        this.marker.addListener('click', function() {
            self.toggleBounce();

            fetch(foursquareURL)
                .then((response) => {
                    if (response.status !== 200) {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        return;
                    }
                    // Parse the response and update values
                    response.json().then((data) => {
                        let response = data.response.venues[0];

                        if (response === undefined) {
                            alert(`Oops! No data was found for the selected criteria.`);
                            return;
                        }

                        self.phone = response.contact.formattedPhone;
                        self.category = response.categories[0].name;
                        self.fullAddress = response.location.formattedAddress;

                        // Load streetview
                        self.url = `https://maps.googleapis.com/maps/api/streetview?size=1000x300&location=${self.fullAddress}&AIzaSyALk7giHz0T1OXq6R-DOammmrDw1U5taoQ`;

                        // Populate infowindow with updated information
                        self.populateInfoWindow(this, infoWindow);
                    });
                })
                .catch((err) => {
                    console.log('Looks like there was a problem. Status Error:', err);
                    alert(`Looks like there was a problem. Please try again later.`);
                });
        });
    }
}
