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
};

var map = L.mapbox.map('map', 'mapbox.streets', mapOptions);


function record(data){
    alert(data)
}

/*1. Get the group IDs from AJAX
var getUsersByGroupId = function() {
    var getUsersByGroupIdCallBack = {
        success : getFlightsByUserIds(3),
        error : record
    };

    jsRoutes.controllers.Application.getUsersByGroupId(5).ajax(getUsersByGroupIdCallBack);
};*/

var getUsersByGroupId = function() {
    jsRoutes.controllers.Application.getUsersByGroupId(5).ajax()
        .done(function(data){
            getFlightsByUserIds(3);
        })
        .fail(record);
};

//2. Get the data for each individual in the group
function getFlightsByUserIds(data) {
    jsRoutes.controllers.Application.getFlightsByUserIds(data).ajax({
        success : plotRoute,
        error : record
    });
}

function plotRoute(data) {
    var runtime = 5000;
    var precision = 5000;
    var flights = [];
    var animationData = {};
    animationData.events = [];
    animationData.index = 0;
    var totalTime = 0;
    var durations = [];
    for(var i = 0; i < data.length; i++){
        var flight = new Flight(data[i]);
        flights.push(flight);
        var duration = flight.arrivalTime-flight.departureTime;
        durations.push(duration);
        totalTime += duration;
    }
    for(var i = 0; i < flights.length; i++){ // I refuse to acknowledge that i is outside the scope of the for loop
        addFlightsToEvents(animationData.events, flights[i], Math.floor((durations[i]/totalTime)*precision));
    }
    prepareEvents(animationData.events, runtime);
    var oldPlay = true;  // TODO: Figure out why the animation frames thing is only rendering a single flight WTF
    if(oldPlay){
        globalAnimationState.events = animationData.events;
        globalAnimationState.iteration = 0;
        globalAnimationState.paused = false;
        playMapEvents();
    }else{
        requestAnimationFrame(function(timestamp) {
            animateEvent(timestamp, animationData);
        });
    }
}

function animateEvent(timestamp, animationData) {
    // TODO: Add ability to pause in this eventually better version
    while (
        typeof(animationData.events[animationData.index]) !== 'undefined'
        && timestamp > animationData.events[animationData.index].time
        ) {
        animationData.events[animationData.index].action(animationData.events[animationData.index].params);
        animationData.index++;
        if(timesToLog>0){
            console.log(animationData.events[animationData.index]);
            timesToLog--;
        }
    }
    if (typeof(animationData.events[animationData.index]) !== 'undefined') {
        requestAnimationFrame(function (timestamp) {
            animateEvent(timestamp, animationData);
        });
    }
}

function moveMarkerAndAddLine(params){
    if(typeof(params) === 'undefined')console.log("undefined params");
    //console.log(params.marker._leaflet_id);
    params.line.addLatLng(L.latLng(params.y, params.x));
    params.line.addTo(map);
    params.marker.setLatLng(L.latLng(params.y,params.x));
    params.marker.options.angle = params.angle
}

function removeMarkerAndFadeLine(params){
    var line = params.line;
    var lineOptions = line.options;
    lineOptions.opacity = params.opacity;
    var fadedLine = L.polyline(line._latlngs, lineOptions);
    line.spliceLatLngs(0, line._latlngs.length);
    line.addTo(map);
    fadedLine.addTo(map);
    map.removeLayer(params.marker);
}

function appearMarker(params) {
    params.marker.setOpacity(1.0);
}
function addFlightsToEvents(events, flight, precision){
    var greatCircle = routeToArc(flight.route);
    var arc = greatCircle.Arc(precision, { offset: 10 });
    var start = flight.departureTime/1;
    var flightTime = (flight.arrivalTime - flight.departureTime);
    var interval = flightTime/precision;
    var marker =  L.rotatedMarker( [arc.geometries[0].coords[0][1], arc.geometries[0].coords[0][0]], {
        icon: L.icon({
            iconUrl: 'https://www.mapbox.com/maki/renders/airport-24@2x.png',
            iconSize: [20, 20],

        }),
        opacity: 0
    }).addTo(map);
    var lineOptions = {
        clickable: false,
        color: '#000',
        opacity: 0.8,
        smoothFactor: 1.0
    };

    var line = L.polyline([], lineOptions).addTo(map);

    var addParams = {};
    addParams.marker = marker;
    var addEvent = new MapEvent(start, appearMarker, addParams);
    events.push(addEvent);
    for(var i = 0; i < arc.geometries[0].coords.length; ++i){
        var moveParams = {};
        moveParams.marker = marker;
        moveParams.line = line;
        moveParams.x = arc.geometries[0].coords[i][0];
        moveParams.y = arc.geometries[0].coords[i][1];
        if(typeof(arc.geometries[0].coords[i-1]) !== 'undefined'){
            moveParams.angle = Math.atan2(
                arc.geometries[0].coords[i][0]-arc.geometries[0].coords[i-1][0],
                arc.geometries[0].coords[i][1]-arc.geometries[0].coords[i-1][1]
            )*(180 / Math.PI);
        }else{
            moveParams.angle = 0;
        }
        var moveEvent = new MapEvent(start + i*interval, moveMarkerAndAddLine, moveParams);
        events.push(moveEvent);
    }
    var removeParams = {};
    removeParams.line = line;
    removeParams.marker = marker;
    removeParams.opacity = 0.15;
    var removeEvent = new MapEvent(start+flightTime+100, removeMarkerAndFadeLine, removeParams);
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