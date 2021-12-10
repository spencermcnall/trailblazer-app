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
        data: 'https://api.mapbox.com/datasets/v1/smcnall1/ckwzr39re5ui725pdwgddwg9n/features?access_token=pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA'
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

// Opens sidebar
map.on('click', 'national-parks-layer', (e) => {   
    const name = e.features[0].properties.Name;
    openSidebar(name);
});

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false})

// Change the cursor to a pointer when the mouse is over the places layer.
// Also displays the popup on hover
map.on('mouseenter', 'national-parks-layer', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.Name;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

    popup.setLngLat(coordinates).setHTML('<p>' + name + '</p>').addTo(map);
});
     
// Change it back to a pointer when it leaves.
//Remove popup
map.on('mouseleave', 'national-parks-layer', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

// Add the geocoder control to the map (searchbar)
// map.addControl(
//     new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//     })
// );

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function openSidebar(name) {
    //changes name of sidebar
    form_title = document.getElementById("location_name");
    form_title.innerText = name;

    //changes name on form
    form_loc_name = document.getElementById("form_loc_name");
    form_loc_name.value = name;
    
    // updates sidebar with reviews for clicked location
    list = document.getElementById("review_list_ul");
    $(document).ready(function(){
        var reviewCount = 0;
        var starNum = 0;
        $("#review_list_ul li").each(function(){
            var item = $(this).find("#park_name").text();
            var rating = $(this).find("#park_rating").text().length;
            if(item == name){
                $(this).removeAttr("hidden");
                reviewCount++;
                starNum += rating;
            }
            else{
                $(this).attr('hidden','');
            }

            var avgStar = 0;
            if (reviewCount != 0) {
                var avgStar = (starNum / reviewCount).toFixed();
            }
            $("#review_number").html(reviewCount.toString() + " Reviews<br>" + " Average Rating: " + avgStar.toString() + " Stars");
        });

       
    });

    document.getElementById("sidebar").style.width="25%";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width="0";
}
