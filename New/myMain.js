"use strict";

var layerStyle = {};

layerStyle.addPopups = function (feature, layer) {
    //Project
    if (feature.properties && feature.properties.Railroad && feature.properties.JobCreation && feature.properties.JobRetention && feature.properties.Grant && feature.properties.TotalAmount) {
        layer.bindPopup("<b>Project: </b>" + feature.properties.NAME +
            "<br><b>Entity: </b>" + feature.properties.Entity +
            "<br><b>Railroad: </b>" + feature.properties.Railroad +
            "<br><b>Job Creation: </b>" + feature.properties.JobCreation +
            "<br><b>Job Retention: </b>" + feature.properties.JobRetention +
            "<br><b>Grant Amount: </b>" + feature.properties.Grant +
            "<br><b>Total Project Amount: </b>" +feature.properties.TotalAmount +
            "<br><b>Year: </b>" + feature.properties.Year)
    }
    //Intermodal Terminal
    else if (feature.properties && feature.properties.Status) {
        layer.bindPopup("<b>Intermodal Terminal: </b>" + feature.properties.NAME +
            "<br><b>Entity: </b>" + feature.properties.Entity +
            "<br><b>City: </b>" + feature.properties.City +
            "<br><b>Status: </b>" + feature.properties.Status);
    } //Transload Facility
    else if (feature.properties && feature.properties.Steel) {
        layer.bindPopup("<b>Transload Operator: </b>" + feature.properties.NAME +
            "<br><b>Entity: </b>" + feature.properties.Entity +
            "<br><b>City: </b>" + feature.properties.City);
    } //Major Yard 
    else if (feature.properties && feature.properties.NAME) {
        layer.bindPopup("<b>Major Yard: </b>" + feature.properties.NAME +
            "<br><b>Entity: </b>" + feature.properties.Entity +
            "<br><b>City: </b>" + feature.properties.City +
            "<br><b>Status: </b>" + feature.properties.Status);
    } //County
    else if (feature.properties && feature.properties.COUNTY) {
        layer.bindPopup("<b>County: </b>" + feature.properties.NAME);
    }
    //Rail Lines
    else if (feature.properties && feature.properties.LENGTH_MIL){
        layer.bindPopup("<b>Railroad Name: </b>"+ feature.properties.Name +  
        "<br><b>Freight Volume: </b>" + feature.properties.FREIGHT_VO +
        "<br><b>Amtrak: </b>"+feature.properties.AMTRAK_SER +
        "<br><b>Operator: </b>"+feature.properties.RR_OPERATO +
        "<br><b>Clearance: </b>"+ feature.properties.CLEARANCE)
    }
}

layerStyle.yellowCircleMarker = function (feature, latlng) {
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
layerStyle.blueCircleMarker = function (feature, latlng) {
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "blue",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    return circleMarker;
}
layerStyle.greenCircleMarker = function (feature, latlng) {
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "green",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    return circleMarker;
}
layerStyle.purpleCircleMarker = function (feature, latlng) {
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "purple",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    return circleMarker;
}
//Help box
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
//execute only when window is fully loaded
window.onload = function () {
    var maxBounds = [
        [38, -84.4], //Southwest
        [44, -81]  //Northeast
    ];

    var mapObject = L.map('mapDivId', {
        'center': [39.955411, -83.001287],
        'zoom': 7,
        'maxBounds': maxBounds
    });

    var baseMap = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapObject);

    //Zoom
    // mapObject.fitBounds(overlayLayers.getBounds());  

    //Counties
    var countiesGroup = L.geoJSON(counties, {
        filter: function (feature, layer) {
            return true;
        }
    }).setStyle({ fillColor: 'white', color: "grey", fillOpacity: 0.1, "weight":2 }).addTo(mapObject);
    
    //Rail
    var railStyle = {
        "color": "black",
        "weight": 1,
        "opacity": .5
    };
    var railGroup = L.geoJSON(Rail, {
        style: railStyle,
        filter: function (feature, layer) {
            return true;
        }
    }).addTo(mapObject);

    // Yard
    var yardLayerGroup = L.geoJSON(Yards, {
        onEachFeature: layerStyle.addPopups,
        pointToLayer: layerStyle.purpleCircleMarker,
        filter: function (feature, layer) {
            return true;
        }
    })

    // Intermodal
    var intermodalLayerGroup = L.geoJSON(Intermodal, {
        onEachFeature: layerStyle.addPopups,
        pointToLayer: layerStyle.blueCircleMarker
    })

    // Transload
    var transloadLayerGroup = L.geoJSON(Transload, {
        onEachFeature: layerStyle.addPopups,
        pointToLayer: layerStyle.greenCircleMarker
    })

    // Projects
    var projectsLayerGroup = L.geoJSON(Projects, {
        onEachFeature: layerStyle.addPopups,
        pointToLayer: layerStyle.yellowCircleMarker
    }).addTo(mapObject);

    //Search
    mapObject.addControl(new L.Control.Search({ layer: countiesGroup }));

    //Layer Controls
    var overlayLayers = {
        "Major Yards": yardLayerGroup,
        "Intermodal Yards": intermodalLayerGroup,
        "Transload Facilities": transloadLayerGroup,
        "Development Projects": projectsLayerGroup
    };
    L.control.layers(null, overlayLayers).addTo(mapObject);

    //Reset Zoom
    (function () {
        var control = new L.Control({ position: 'bottomleft' });
        control.onAdd = function (mapObject) {
            var azoom = L.DomUtil.create('a', 'resetzoom');
            azoom.innerHTML = "<button>Reset Zoom</button>";
            L.DomEvent
                .disableClickPropagation(azoom)
                .addListener(azoom, 'click', function () {
                    mapObject.setView(mapObject.options.center, mapObject.options.zoom);
                }, azoom);
            return azoom;
        };
        return control;
    }())
        .addTo(mapObject);

    //Print
    L.control.browserPrint().addTo(mapObject);

    //Legend
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (mapObject) {
        var div = L.DomUtil.create('div', 'info legend');

        div.innerHTML +=
            '<img src="legend.png" alt="legend" width="134" height="125">';

        return div;
    };
    legend.addTo(mapObject);
};

