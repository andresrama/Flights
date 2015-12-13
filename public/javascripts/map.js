/**
 * Created by Andres Rama on 9/7/2015.
 */
"use strict";
$(function() {
    getUsersByGroupId("1");

});

L.mapbox.accessToken = 'pk.eyJ1IjoiYXJhbWEiLCJhIjoiY2lmZGFsem1nNTUxOXNlbTdhM3dsdjVpaCJ9.tX_GdsKynI0ioeCkyooSWQ';
var mapOptions = {
    worldCopyJump: true,
    bounceAtZoomLimits: true
}
var map = L.mapbox.map('map', 'mapbox.streets', mapOptions);


function record(data){
    alert(data)
}

//1. Get the group IDs from AJAX
var getUsersByGroupId = function() {
    var getUsersByGroupIdCallBack = {
        success : getFlightsByUserIds(3),
        error : record
    };

    jsRoutes.controllers.Application.getUsersByGroupId(5).ajax(getUsersByGroupIdCallBack);
};

//2. Get the data for each individual in the group
function getFlightsByUserIds(data) {
    var getFlightsByUserIds = {
        success : plotRoute,
        error : record
    };

    jsRoutes.controllers.Application.getFlightsByUserIds(data).ajax(getFlightsByUserIds);
}
function plotRoute(data) {
    var runtime = 5000;
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

function MoveMarkerAndAddLine(params){
    params.line.addLatLng(L.latLng(params.y, params.x));
    params.line.addTo(map);
    params.marker.setLatLng(L.latLng(params.y,params.x));
}

function FadeLine(params){
    var line = params.line;
    var lineOptions = line.options;
    lineOptions.opacity = params.opacity;
    var fadedLine = L.polyline(line._latlngs, lineOptions);
    line.spliceLatLngs(0, line._latlngs.length);
    line.addTo(map);
    fadedLine.addTo(map);
}

function AddFlightsToEvents(events, flight, precision){
    var greatCircle = routeToArc(flight.route);
    var arc = greatCircle.Arc(precision, { offset: 10 });
    var start = flight.departureTime/1;
    var flightTime = (flight.arrivalTime - flight.departureTime);
    var interval = flightTime/precision;
    var marker =  L.marker([0, 0], {
        icon: L.mapbox.marker.icon({
            'marker-color': '#f86767'
        })
    }).addTo(map);
    var lineOptions = {
        clickable: false,
        color: '#000',
        opacity: 0.8,
        smoothFactor: 1.0
    };
    var line = L.polyline([], lineOptions).addTo(map);
    console.log(line);
    for(var i = 0; i < arc.geometries[0].coords.length; ++i){
        var addParams = {};
        addParams.marker = marker;
        addParams.line = line;
        addParams.x = arc.geometries[0].coords[i][0];
        addParams.y = arc.geometries[0].coords[i][1];
        var addEvent = new MapEvent(start + i*interval,MoveMarkerAndAddLine, addParams);
        events.push(addEvent);
    }
    var removeParams = {};
    removeParams.line = line;
    removeParams.opacity = 0.15;
    var removeEvent = new MapEvent(start+flightTime+100, FadeLine, removeParams);
    events.push(removeEvent);
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