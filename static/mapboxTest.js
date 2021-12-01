
//navigator.geolocation.getCurrentPosition(position => {
//const { longitude, latitude } = position.coords;

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF5bGV5aGFkZ2VzIiwiYSI6ImNrdzB5M2docTd2eXkzMXMxcHAxcXV1NmMifQ.RpqjqIW44lhJYhcCr8fvIg';
const stPaul = [-93.0900, 44.9537]
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/hayleyhadges/ckw1009py0qw314qtoha4yzun', // style URL
    center: stPaul,
    // Mapbox GL JS uses [longitude, latitude] format
    zoom: 12
});
//});

// create the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    'Construction on the Washington Monument began in 1848.'
);

// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';


const marker = new mapboxgl.Marker({
    color: "#000000",
    draggable: false
}).setLngLat([-93.0900, 44.9537]).setPopup(popup).addTo(map);


// create the marker
// new mapboxgl.Marker(el)
// .setLngLat(stPaul)
// .setPopup(popup) // sets a popup on this marker
// .addTo(map);


function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
