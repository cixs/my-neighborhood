// map styles from https://snazzymaps.com
let mapStyles = {

    nightlife: [
        // https://snazzymaps.com/style/40700/blue-version-2
        // by Becky Allison
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "color": "#15e0c5"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 13
                },
                {
                    "weight": "0.01"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#144b53"
                },
                {
                    "lightness": 14
                },
                {
                    "weight": 1.4
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#0f3944"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#0c4152"
                },
                {
                    "lightness": 5
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#0b434f"
                },
                {
                    "lightness": 25
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#0b3d51"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "color": "#146474"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "color": "#0f3944"
                },
                {
                    "lightness": "-38"
                }
            ]
        }
    ],

    parks: [
        // https://snazzymaps.com/style/59/light-green
        // by Anonymous
        {
            "stylers": [{
                    "hue": "#baf4c4"
                },
                {
                    "saturation": 10
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [{
                "color": "#effefd"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }
    ],

    food_and_drink: [
        // https://snazzymaps.com/style/134242/epic
        // by Nick
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "saturation": 36
                },
                {
                    "color": "#333333"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#edbb85"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "hue": "#ff0000"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#edbb85"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#edbb85"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "visibility": "simplified"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ],

    history: [
        // https://snazzymaps.com/style/43231/gold-%C3%A9l%C3%A9gant-syle
        // by  Memory Slash Vision studios(  http://memoryslashvision.com )
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{
                "color": "#b7a86d"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "gamma": 0.01
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "saturation": -31
                },
                {
                    "lightness": -33
                },
                {
                    "weight": 2
                },
                {
                    "gamma": 0.8
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                    "lightness": 30
                },
                {
                    "saturation": 30
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "all",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ffb700"
                },
                {
                    "saturation": "-50"
                },
                {
                    "lightness": "34"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "saturation": 20
            }]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "all",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "weight": "1.84"
                },
                {
                    "lightness": "11"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                    "lightness": 20
                },
                {
                    "saturation": -20
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                    "lightness": 10
                },
                {
                    "saturation": -30
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "saturation": 25
                },
                {
                    "lightness": 25
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "lightness": "-11"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#d5b57f"
                },
                {
                    "weight": "0.70"
                },
                {
                    "lightness": "9"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "lightness": -20
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ],

    art: [
        // https://snazzymaps.com/style/46707/abstract-band-w
        // by Alejandro
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "saturation": "-100"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "lightness": "-62"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "lightness": "100"
                },
                {
                    "gamma": "10.00"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "lightness": "70"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
                "lightness": "-100"
            }]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.government",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi.medical",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.school",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "lightness": "-100"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "weight": "0.1"
                },
                {
                    "lightness": "-100"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "weight": "1"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                    "weight": "0.60"
                },
                {
                    "lightness": "26"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                    "weight": "0.38"
                },
                {
                    "saturation": "0"
                },
                {
                    "lightness": "75"
                },
                {
                    "gamma": "0.92"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [{
                    "visibility": "off"
                },
                {
                    "weight": "1"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "transit.station",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "71"
                }
            ]
        }
    ],
    accommodation: [
        // https://snazzymaps.com/style/27846/geo1
        // by hugo
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "lightness": "-23"
                },
                {
                    "saturation": "100"
                },
                {
                    "weight": "8.21"
                },
                {
                    "color": "#f0730e"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "weight": "3.67"
                },
                {
                    "saturation": "64"
                },
                {
                    "lightness": "100"
                },
                {
                    "visibility": "on"
                },
                {
                    "gamma": "1.60"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                    "lightness": "70"
                },
                {
                    "saturation": "-4"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#d3d3d3"
                },
                {
                    "lightness": "60"
                },
                {
                    "saturation": "0"
                },
                {
                    "gamma": "2.00"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry.fill",
            "stylers": [{
                "saturation": "80"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#c8e354"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                    "hue": "#ff9700"
                },
                {
                    "saturation": "43"
                },
                {
                    "lightness": "-10"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#0025bc"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "weight": "5"
                },
                {
                    "gamma": "1.85"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "hue": "#00b3ff"
                },
                {
                    "saturation": "69"
                },
                {
                    "lightness": "-38"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "lightness": "-97"
                },
                {
                    "saturation": "93"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "weight": "3.5"
                },
                {
                    "lightness": "100"
                },
                {
                    "saturation": "0"
                },
                {
                    "gamma": "1.02"
                },
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                }
            ]
        }
    ],

    all: [
        // https://snazzymaps.com/style/70/unsaturated-browns
        // by Anonymous
        {
            "elementType": "geometry",
            "stylers": [{
                    "hue": "#ff4400"
                },
                {
                    "saturation": -68
                },
                {
                    "lightness": -4
                },
                {
                    "gamma": 0.72
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon"
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [{
                    "hue": "#0077ff"
                },
                {
                    "gamma": 3.1
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [{
                    "hue": "#00ccff"
                },
                {
                    "gamma": 0.44
                },
                {
                    "saturation": -33
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [{
                    "hue": "#44ff00"
                },
                {
                    "saturation": -23
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "hue": "#007fff"
                },
                {
                    "gamma": 0.77
                },
                {
                    "saturation": 65
                },
                {
                    "lightness": 99
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "gamma": 0.11
                },
                {
                    "weight": 5.6
                },
                {
                    "saturation": 99
                },
                {
                    "hue": "#0091ff"
                },
                {
                    "lightness": -86
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                    "lightness": -48
                },
                {
                    "hue": "#ff5e00"
                },
                {
                    "gamma": 1.2
                },
                {
                    "saturation": -23
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "saturation": -64
                },
                {
                    "hue": "#ff9100"
                },
                {
                    "lightness": 16
                },
                {
                    "gamma": 0.47
                },
                {
                    "weight": 2.7
                }
            ]
        }
    ]
}
export default mapStyles;