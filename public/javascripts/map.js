/**
 * Created by Andres Rama on 9/7/2015.
 */
"use strict";
$(function() {
    getUsersByGroupId("1");

});

var verbose = true;

L.mapbox.accessToken = 'pk.eyJ1IjoiYXJhbWEiLCJhIjoiY2lmZGFsem1nNTUxOXNlbTdhM3dsdjVpaCJ9.tX_GdsKynI0ioeCkyooSWQ';
var map = L.mapbox.map('map', 'mapbox.streets');


function record(data){
    alert(data)
}

//1. Get the group IDs from AJAX
var getUsersByGroupId = function() {
    if(verbose)console.log("getUsersByGroupId");
    var getUsersByGroupIdCallBack = {
        success : getFlightsByUserIds(3),
        error : record
    };

    jsRoutes.controllers.Application.getUsersByGroupId(5).ajax(getUsersByGroupIdCallBack);
};

//2. Get the data for each individual in the group
function getFlightsByUserIds(data) {
    if(verbose)console.log("getFlightsByUserId");
    var getFlightsByUserIds = {
        success : plotRoute,
        error : record
    };

    jsRoutes.controllers.Application.getFlightsByUserIds(data).ajax(getFlightsByUserIds);
}
function plotRoute(data) {
    var runtime = 10000;
    var precision = 5000;
    var flights = [];
    var events = [];
    var totalTime = 0;
    var durations = [];
    for(var i = 0; i < data.length; i++){
        var flight = new Flight(data[i]);
        flights.push(flight);
        var duration = flight.arrivalTime-flight.departureTime;
        durations.push(duration);
        totalTime += duration;
    }
    for(var i = 0; i < flights.length; i++){
        AddFlightsToEvents(events, flights[i], (durations[i]/totalTime)*precision);
    }
    PrepareEvents(events, runtime);
    PlayMapEvents(events, 0);
}

function moveMarker(params){
    params.marker.setLatLng(L.latLng(params.y,params.x));
}

function AddFlightsToEvents(events, flight, precision){
    var greatCircle = routeToArc(flight.route);
    var line = greatCircle.Arc(precision, { offset: 10 });
    var start = flight.departureTime/1;
    console.log(start);
    var interval = (flight.arrivalTime - flight.departureTime)/precision;
    console.log(interval);
    var marker =  L.marker([0, 0], {
        icon: L.mapbox.marker.icon({
            'marker-color': '#f86767'
        })
    }).addTo(map);
    L.geoJson(line.json()).addTo(map);                    //TODO: Dynamic lines
    for(var i = 0; i < line.geometries[0].coords.length; ++i){
        var params = {};
        params.marker = marker;
        params.x = line.geometries[0].coords[i][0];
        params.y = line.geometries[0].coords[i][1];
        var event = new MapEvent(start + i*interval,moveMarker, params);
        events.push(event)
    }
}

function routeToArc(route) {
    var source = { x: route.sourceAirport.longitude, y: route.sourceAirport.latitude };
    var destination = { x: route.destinationAirport.longitude, y: route.destinationAirport.latitude };
    var properties = {name: route.sourceAirport.code + " -> " + route.destinationAirport.code};
    return new arc.GreatCircle(source, destination, properties);
}



function addUser(user) {
    if(verbose)alert("addUser");
    var addUser = {
        success: record,
        error: record
    };
    jsRoutes.controllers.Application.addUser(user).ajax(addUser)
}