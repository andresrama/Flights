/**
 * Created by Andres Rama on 12/5/2015.
 */


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

function PlayMapEvents(events, i){
    events[i].action(events[i].params);
    var delay = events[i+1].time - events[i].time;
    console.log(delay);
    if(delay > 2000)delay = 2000;
    if(!(events[i+1] === 'undefined'))setTimeout(PlayMapEvents, delay, events, i+1)
}

