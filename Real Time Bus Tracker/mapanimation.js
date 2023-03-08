var colArray = [
    "#C41E3A",
    "#CC5500",
    "#FFDB58",
    "#228B22",
    "#000080",
    "7F00FF",
    "#964B00",
    "#87CEEB"

];
var busToggle = 0;

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzbWtuaWdodCIsImEiOiJjbGVuOW5ya28xY3NnM3RyMDQ2ZnNkYWozIn0.ecaejiZKLI8krjs8N6yIxA';

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.104081, 42.365554],
  zoom: 14
});

// const setColor = ()=>{
//     const randomColor = 
//     Math.floor(Math.random()*16777215).toString(16);
//     colArray[0] = `"#" + ${randomColor}`
// }


async function addMarkers(){
    // clearMarkers();
    var url = "https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip";
    var response = await fetch(url);
    var json = await response.json();
    var locations = await json.data;
    //do all have to be awaited?
    console.log(locations);
    var lat = locations[busToggle].attributes.latitude;
    var long = locations[busToggle].attributes.longitude;
    console.log(lat);
    console.log(long);
    //match color to the id of the bus
    var marker = new mapboxgl.Marker({
        color: colArray[busToggle],
        draggable: false
    }).setLngLat([long, lat])
        .addTo(map);
    map.flyTo({
            center: [long, lat]
        });
    markers.push(marker);
    // setTimeout(setColor, 10);
    }

// var clearMarkers = ()=>{
//     markers = [];
// }

async function toggleBus() {
    var url = "https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip";
    var response = await fetch(url);
    var json = await response.json();
    var locations = await json.data;
    if(busToggle < locations.length){
    busToggle +=1;
    } else{
        busToggle = 0;
    }
    addMarkers();

}


