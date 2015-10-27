/**
 * Created by Andres Rama on 9/7/2015.
 */
$(function() {
    getGroupById();

});


L.mapbox.accessToken = 'pk.eyJ1IjoiYXJhbWEiLCJhIjoiY2lmZGFsem1nNTUxOXNlbTdhM3dsdjVpaCJ9.tX_GdsKynI0ioeCkyooSWQ';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([0, 0], 3);

var groupIds = [];

//1. Get the group IDs from AJAX
var getGroupById = function() {
    var getGroupByIdCallBack = {
        success : displayGroup,
        error : onError
    };

    jsRoutes.controllers.Application.getGroupById(5).ajax(getGroupByIdCallBack);
};

function displayGroup(data){
    alert(data)
}

//2. Get the data for each individual in the group
// Add a new line to the map with no points.
var polyline = L.polyline([]).addTo(map);

// Keep a tally of how many points we've added to the map.
var pointsAdded = 0;

// Start drawing the polyline.
add();

function add() {

    // `addLatLng` takes a new latLng coordinate and puts it at the end of the
    // line. You optionally pull points from your data or generate them. Here
    // we make a sine wave with some math.
    polyline.addLatLng(
        L.latLng(
            Math.cos(pointsAdded / 20) * 30,
            pointsAdded)
    );

    // Continue to draw and pan the map by calling `add()`
    // until `pointsAdded` reaches 360.
    if (++pointsAdded < 360) window.setTimeout(add, 100);
}