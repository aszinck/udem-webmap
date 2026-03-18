// Global variables
let viewer;
let radarpath = "data/Muller_ground_based_radar_GPS.csv";



// Access cesium
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMWU2ODYxMC1hMjY2LTQxMGUtODZhNy05ODY3YmVmODgzYjIiLCJpZCI6NDA1NTQ1LCJpYXQiOjE3NzM4MjU3NzJ9._OJrEKdLITX4NOq3Yf7xwtYpLIcJnvFo-vhyprJTxco";

// initialize
$( document ).ready(function() {
    createMap();
    readCSV();
});

// create the map
function createMap(){
	viewer = new Cesium.Viewer('map', {
            terrain: Cesium.Terrain.fromWorldTerrain(),

            animation: false,
            timeline: false,
            baseLayerPicker: false
        });
    
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-80, 78, 2000000)
    });
}


// function to read csv data
function readCSV() {
    Papa.parse(radarpath, {
        header: true,
        download: true,
        complete: function (results) {
            console.log(results);
            console.log("CSV loaded");
            console.log("Number of rows:", results.data.length);
            console.log("First row:", results.data[0]);
            mapCSV(results.data);
        }
    });
}



function mapCSV(data) {

    // Get min/max elevation first
    const elevations = data.map(d => parseFloat(d.MSL_alt));
    const minAlt = Math.min(...elevations);
    const maxAlt = Math.max(...elevations);

    data.forEach(function (item) {

        const lon = parseFloat(item.lon);
        const lat = parseFloat(item.lat);
        const alt = parseFloat(item.MSL_alt);

        const position = Cesium.Cartesian3.fromDegrees(lon, lat, alt);

        const color = getColor(alt, minAlt, maxAlt);

        viewer.entities.add({
            position: position,
            point: {
                pixelSize: 8,
                color: color
            }
        });

    });

    viewer.zoomTo(viewer.entities);

    
}

function getColor(value, min, max) {
    const t = (value - min) / (max - min);

    if (t < 0.25) return Cesium.Color.BLUE;
    if (t < 0.5)  return Cesium.Color.CYAN;
    if (t < 0.75) return Cesium.Color.YELLOW;
    return Cesium.Color.RED;
}
