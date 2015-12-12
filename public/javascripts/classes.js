/**
 * Created by Andres Rama on 12/5/2015.
 */
"use strict";

function Airline(airline) {
    console.log("airline constructor");
    this.dbId = airline["dbId"];
    this.airlineId = airline["airlineId"];
    this.name = airline["name"];
    this.alias = airline["alias"];
    this.iataCode = airline["iataCode"];
    this.icaoCode = airline["icaoCode"];
    this.callsign = airline["callsign"];
    this.country = airline["country"];
    this.active = airline["active"];
}

function Airport(airport) {
    console.log("airport constructor");
    this.name = airport["name"];
    this.city = airport["city"];
    this.country = airport["country"];
    this.code = airport["code"];
    this.codeType = airport["codeType"];
    this.latitude = airport["latitude"];
    this.longitude = airport["longitude"];
    this.altitude = airport["altitude"];
    this.timeOffsetFromUTC = airport["timeOffsetFromUTC"];
}


function Route(route){
    console.log("route constructor");
    this.airline = new Airline(route["airline"]);
    this.sourceAirport = new Airport(route["sourceAirport"]);
    this.destinationAirport = new Airport(route["destinationAirport"]);
    this.codeshare = route["codeshare"];
    this.stops = route["stops"];
    this.equipment = route["equipment"];
}

function Flight(flight) {
    console.log("flight constructor");
    this.route = new Route(flight["route"]);
    this.departureTime = new Date(flight["departureTime"]);
    this.arrivalTime = new Date(flight["arrivalTime"]);
}

function UserGroup() {

}


function MapEvent(time, action, params){
    this.time = time;
    this.action = action;
    this.params = params;
}

/**
 * Compares two MapEvents by time attribute
 * @param a {MapEvent}
 * @param b {MapEvent}
 * @returns {number}
 */
function MapEventComparator(a,b){
    if(b.time < a.time)return 1;
    if(a.time < b.time)return -1;
    return 0;
}

/**
 * Sorts and normalizes events based on time
 * @param events {[Event]}
 * @param runtime {number}
 */
function PrepareEvents(events, runtime){
    events.sort(MapEventComparator);
    var range = events[events.length-1].time-events[0].time;
    var min = events[0].time;
    for(var i = 0; i<events.length; i++){
        events[i].time -= min;
        events[i].time /= range;
        events[i].time *= runtime;
    }
}

/**
 * Animates an array of events on the map.
 * @param events: {[Event]}
 * @param i the event to animate next. set it to 0 to start at the first event
 */
function PlayMapEvents(events, i){
    events[i].action(events[i].params);
    if(events[i+1] !== 'undefined'){
        var delay = events[i+1].time - events[i].time;
        if(delay > 2000)delay = 2000;
        setTimeout(PlayMapEvents, delay, events, i+1)
    }
}

