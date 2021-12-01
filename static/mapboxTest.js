





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
        'type': 'circle',
        'source': 'parks',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }
    });
});


// create the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    'Construction on the Washington Monument began in 1848.'
);

// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';


function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
