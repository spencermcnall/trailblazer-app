// popups: https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
// Symbol layer: https://docs.mapbox.com/mapbox-gl-js/example/external-geojson/

// National parks dataset: https://www.nps.gov/maps/tools/npmap.js/examples/geojson-layer/index.html/

// Search bar: https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/



//navigator.geolocation.getCurrentPosition(position => {
//const { longitude, latitude } = position.coords;

mapboxgl.accessToken = 'pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA';
const stPaul = [-93.0900, 44.9537]
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/smcnall1/ckwmrgftc1ey915obmyxl17er', // style URL
    center: stPaul,
    // Mapbox GL JS uses [longitude, latitude] format
    zoom: 12
});

map.on('load', () => {
    map.addSource('parks', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://api.mapbox.com/datasets/v1/smcnall1/ckwmqij727ye627mnh03nfal8/features?access_token=pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA'
    });

    map.addLayer({
        'id': 'national-parks-layer',
        'interactive' : true,
        'type': 'circle',
        'source': 'parks',
        'paint': {
            'circle-radius': 15,
            'circle-stroke-width': 2,
            'circle-color': 'green',
            'circle-stroke-color': 'white'
        }
    });
});

// displays popup on click
map.on('click', 'national-parks-layer', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.Name;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('<p>' + name + '</p>')
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'national-parks-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});
     
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'national-parks-layer', () => {
    map.getCanvas().style.cursor = '';
});

// Add the geocoder control to the map (searchbar)
map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
);



// create the popup
// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//     'Construction on the Washington Monument began in 1848.'
// );

// create DOM element for the marker
// const el = document.createElement('div');
// el.id = 'marker';


function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
