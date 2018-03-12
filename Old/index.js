"use strict";

var myFunctionHolder = {};

//declaring function 1
myFunctionHolder.addPopups = function (feature, layer) {
    if (feature.properties && feature.properties.ProjectName) {
        layer.bindPopup("Project: " + feature.properties.ProjectName + "<br>Entity: " + feature.properties.Entity + "<br>Railroad: " + feature.properties.Railroad);
    }
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup("Intermodal Terminal: " + feature.properties.Name + "<br>Entity: " + feature.properties.Entity + "<br>City: " + feature.properties.City + "<br>Status: " + feature.properties.Status);
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
    //var map = L.map('mapDivId').setView([40.417287, -82.907123], 7);

    // var projectGroup = L.geoJSON(Projects, {
    //     onEachFeature: myFunctionHolder.addPopups,
    // });
    var intermodalGroup = L.geoJSON(Intermodal, {
        onEachFeature: myFunctionHolder.addPopups,
        pointToLayer: myFunctionHolder.pointToCircle
    });

    var clusters = L.markerClusterGroup();
    // clusters.addLayer(projectGroup);
    clusters.addLayer(intermodalGroup);
    mapObject.addLayer(clusters);

    // mapObject.fitBounds(projectGroup.getBounds());
    mapObject.fitBounds(intermodalGroup.getBounds());

    //window.alert("Welcome to the Ohio Rail Project Map. Toggle projects and filter by date, cost, etc.");
};