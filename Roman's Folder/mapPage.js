
var transformRequest = (url, resourceType) => {
    var isMapboxRequest =
        url.slice(8, 22) === "api.mapbox.com" ||
        url.slice(10, 26) === "tiles.mapbox.com";
    return {
        url: isMapboxRequest
            ? url.replace("?", "?pluginName=sheetMapper&")
            : url
    };
};

mapboxgl.accessToken = 'pk.eyJ1IjoicmJhY3RvbCIsImEiOiJja2d5MDJzenYwMHEzMnhtbGxmYW1yZzVhIn0.E0cHmApH4e2C193UPCh-aA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/rbactol/ckgy0fsr97kwu19pgm12vfcuk', // style URL
    center: [-93.0900, 44.9537], // starting position [lng, lat]
    zoom: 9 // starting zoom
});



    //https://docs.google.com/spreadsheets/d/1FEQEHV5x8LER2zBlY1qhI8neUKNya001afn0NvNuIWU/gviz/tq?tqx=out:csv&sheet=mapData1




// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
    },
    showUserLocation: true,
    })
);






// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
