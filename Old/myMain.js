"use strict";

var myFunctionHolder = {};

//declaring function 1
myFunctionHolder.addPopups = function (feature, layer) {
    if (feature.properties && feature.properties.Railroad) {
        layer.bindPopup("<b>Railroad:</b>" + feature.properties.Railroad);
    }
}

//declaring function 2
myFunctionHolder.pointToCircle = function (feature, latlng) {
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "yellow",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    return circleMarker;
}

//execute only when window is fully loaded
window.onload = function () {
    var mapObject = L.map('mapDivId');
    //Replace the basemap link with your own
    var baseMap = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapObject);

    // Intermodal is the variable name we difined in Bike_Thefts_2011.js file. 
    var projectsGroup = L.geoJSON(Projects, {
        onEachFeature: myFunctionHolder.addPopups,
        pointToLayer: myFunctionHolder.pointToCircle
    });

    var clusters = L.markerClusterGroup();
    clusters.addLayer(projectsGroup);
    mapObject.addLayer(clusters);

    //mapObject.addLayer(intermodalGroup);
    mapObject.fitBounds(projectsGroup.getBounds());
};