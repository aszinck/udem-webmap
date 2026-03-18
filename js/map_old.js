
// Create the map
var map = L.map("map", {
  center: [0, 0],   
  zoom: 3
});

// basemap
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

basemap.addTo(map);

// Test marker (lat/lon coordinates automatically reprojected)
L.marker([79, -40])
  .addTo(map)
  .bindPopup("Test location (Greenland area)");