// Global variables
let map;

function initMap() {
  // https://snazzymaps.com/style/61/blue-essence
  const styles = [
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#B0BEC5"
        }
      ]
    },
    {
      "featureType": 'administrative',
      "elementType": 'labels.text.stroke',
      "stylers": [
        { "color": '#ECEFF1' },
        { "weight": 6 }
      ]
    },
    {
      "featureType": 'administrative',
      "elementType": 'labels.text.fill',
      "stylers": [
        { "color": '#37474F' }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "hue": "#1900ff"
        },
        {
          "color": "#ECEFF1"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "lightness": 100
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "lightness": 700
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#455A64"
        }
      ]
    }
  ];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.255529, lng: 19.843903},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
}
